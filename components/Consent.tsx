"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";

const GA_ID = "G-YZ399FC9TC";
const KEY = "analytics-consent";
type Choice = "granted" | "denied" | null;
const CHANGE = "consent-change";

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readChoice(): Choice {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function saveChoice(v: "granted" | "denied") {
  try {
    window.localStorage.setItem(KEY, v);
  } catch {
    // storage blocked: nothing is remembered, so the banner asks again next visit
  }
  window.dispatchEvent(new Event(CHANGE));
}

/** Reopens the banner from anywhere (the footer's "Cookie settings" link). */
export function openConsent() {
  window.dispatchEvent(new Event("open-consent"));
}

/**
 * UK PECR consent: Google Analytics is not loaded, and sets no cookies, until
 * the visitor accepts. Rejecting is one click, as easy as accepting.
 */
export default function Consent() {
  // "unknown" on the server and during hydration, so nothing renders until the browser knows
  const choice = useSyncExternalStore<Choice | "unknown">(subscribe, readChoice, () => "unknown");
  const [reopened, setReopened] = useState(false);
  const open = choice === null || reopened;

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener("open-consent", reopen);
    return () => window.removeEventListener("open-consent", reopen);
  }, []);

  function decide(v: "granted" | "denied") {
    const withdrawn = choice === "granted" && v === "denied";
    saveChoice(v);
    setReopened(false);
    // GA is already running in this tab; a reload is the clean way to stop it and its cookies
    if (withdrawn) {
      document.cookie.split(";").forEach((c) => {
        const name = c.split("=")[0].trim();
        if (name.startsWith("_ga")) document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, "")}`;
      });
      location.reload();
    }
  }

  return (
    <>
      {choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}

      {open && (
        <section
          role="region"
          aria-label="Cookie choice"
          className="fixed right-3 bottom-3 left-3 z-50 border-[6px] border-ink bg-cream p-4 text-ink sm:left-auto sm:max-w-[26rem] lg:right-6 lg:bottom-6"
        >
          <p className="label">Analytics cookies</p>
          <p className="mt-2 text-[0.95rem] leading-snug">
            May I use Google Analytics to see which pages get read? Nothing is tracked unless you say yes, and you
            can change your mind from the footer.{" "}
            <Link href="/privacy" className="font-bold underline" onClick={() => setReopened(false)}>
              Privacy notice
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" className="btn px-4 py-3 text-sm" onClick={() => decide("granted")}>
              Accept analytics
            </button>
            <button type="button" className="btn btn-mustard px-4 py-3 text-sm" onClick={() => decide("denied")}>
              Reject
            </button>
          </div>
        </section>
      )}
    </>
  );
}
