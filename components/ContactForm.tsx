"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { TOPICS, validateContact, type FieldErrors, type Topic } from "@/lib/contact";
import { person } from "@/lib/content";
import { ArrowRight, Alert, Spinner } from "./icons";

type Status = "idle" | "sending" | "sent" | "error";

const SERVER_MESSAGES: Record<string, string> = {
  "rate-limited": "That’s a few messages in a short time. Wait a few minutes and try again, or email me directly.",
  "not-configured": `The form isn’t connected to email yet. Please email me directly at ${person.email}.`,
  "send-failed": "Your message didn’t go through on my side. Try again in a moment, or email me directly.",
};

/** A field error: ink tag with a brick alert mark, distinct from the decorative mustard plates. */
function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex w-fit items-start gap-2 border-[3px] border-ink bg-cream py-1.5 pr-3 pl-2.5 font-semibold text-ink">
      <Alert className="mt-[0.15em] size-4 shrink-0 text-brick" />
      <span>{children}</span>
    </p>
  );
}

type Field = keyof FieldErrors;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const statusRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [announcement, setAnnouncement] = useState("");
  // true while the visitor has typed something not yet sent
  const dirty = useRef(false);

  useEffect(() => {
    function warn(e: BeforeUnloadEvent) {
      if (!dirty.current) return;
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  function trackDirty() {
    const form = formRef.current;
    if (!form) return;
    const data = new FormData(form);
    dirty.current = ["name", "email", "message"].some((k) => String(data.get(k) ?? "").trim() !== "");
  }

  /** Re-check one field as the visitor fixes it, so its error clears straight away. */
  function recheck(field: Field) {
    if (!errors[field] || !formRef.current) return;
    const data = new FormData(formRef.current);
    const found = validateContact({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      topic: String(data.get("topic") ?? "") as Topic,
      message: String(data.get("message") ?? ""),
    });
    if (!found[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const input = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      topic: String(data.get("topic") ?? "") as Topic,
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
    };

    const found = validateContact(input);
    setErrors(found);
    setServerError("");
    const count = Object.keys(found).length;
    // announced politely as well as moving focus, for screen readers
    setAnnouncement(count ? `${count} ${count === 1 ? "field needs" : "fields need"} attention before sending.` : "");
    if (count) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        dirty.current = false;
        setStatus("sent");
        form.reset();
      } else if (json.fields) {
        setErrors(json.fields);
        setStatus("idle");
      } else {
        setServerError(SERVER_MESSAGES[json.error] ?? SERVER_MESSAGES["send-failed"]);
        setStatus("error");
      }
    } catch {
      setServerError("You seem to be offline. Check your connection and try again.");
      setStatus("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status === "sent") {
    return (
      <div className="border-[6px] border-ink bg-cream p-6 text-ink sm:p-8" role="status">
        <p ref={statusRef} tabIndex={-1} className="display text-[2.75rem] sm:text-[3.5rem]">
          Message sent.
        </p>
        <p className="mt-3 max-w-[44ch]">
          Thanks — it’s in my inbox. I’ll reply to the email address you gave.
        </p>
        <button type="button" className="link-arrow mt-5" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  const field =
    "mt-2 block w-full border-[3px] border-ink bg-cream px-3.5 py-3 text-ink placeholder:text-[#5c5348] outline-none focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-cream aria-[invalid=true]:border-brick aria-[invalid=true]:border-[5px]";

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} onInput={trackDirty} className="grid gap-5" aria-describedby="form-required form-note">
      <p className="sr-only" aria-live="polite">{announcement}</p>
      <p id="form-required" className="text-cream">All fields are needed.</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label text-cream">Your name</label>
          <input id="name" name="name" required autoComplete="name" className={field} onChange={() => recheck("name")}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name && <FieldError id="name-error">{errors.name}</FieldError>}
        </div>
        <div>
          <label htmlFor="email" className="label text-cream">Email</label>
          <input id="email" name="email" required type="email" autoComplete="email" inputMode="email" spellCheck={false} autoCapitalize="none" className={field}
            onChange={() => recheck("email")}
            aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && <FieldError id="email-error">{errors.email}</FieldError>}
        </div>
      </div>

      {/* the fieldset's legend names the group; no extra radiogroup role, so it's announced once */}
      <fieldset aria-describedby={errors.topic ? "topic-error" : undefined}>
        <legend className="label text-cream">
          I’m getting in touch about <span className="font-semibold normal-case">(choose one)</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <label key={t.value} className="group cursor-pointer">
              <input type="radio" name="topic" value={t.value} className="peer sr-only"
                onChange={() => recheck("topic")} />
              <span className="label inline-flex min-h-11 items-center border-[3px] border-cream px-3.5 text-cream underline-offset-4 group-hover:underline peer-checked:bg-cream peer-checked:text-ink peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cream peer-checked:peer-focus-visible:outline-cream">
                {t.label}
              </span>
            </label>
          ))}
        </div>
        {errors.topic && <FieldError id="topic-error">{errors.topic}</FieldError>}
      </fieldset>

      <div>
        <label htmlFor="message" className="label text-cream">Message</label>
        <textarea id="message" name="message" required rows={6} className={`${field} resize-y`}
          placeholder="e.g. A front-end role on your team, starting in March…"
          onChange={() => recheck("message")} maxLength={5000}
          aria-invalid={!!errors.message} aria-describedby={`message-hint${errors.message ? " message-error" : ""}`} />
        <p id="message-hint" className="mt-2 text-sm text-cream">A sentence or two is plenty — up to 5,000 characters.</p>
        {errors.message && <FieldError id="message-error">{errors.message}</FieldError>}
      </div>

      {/* honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="submit" className="btn btn-mustard text-[1.05rem]" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              Sending… <Spinner className="size-4 animate-spin motion-reduce:animate-none" />
            </>
          ) : (
            <>
              Send message <ArrowRight className="size-4" />
            </>
          )}
        </button>
        <p id="form-note" className="text-cream">I usually reply within two working days.</p>
      </div>

      <p ref={statusRef} tabIndex={-1} aria-live="polite">
        {status === "error" && (
          <span className="flex items-start gap-2.5 border-[3px] border-ink bg-cream px-4 py-3 font-semibold text-ink">
            <Alert className="mt-[0.15em] size-4 shrink-0 text-brick" />
            <span>{serverError}</span>
          </span>
        )}
      </p>
    </form>
  );
}
