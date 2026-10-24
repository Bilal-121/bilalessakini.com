import Link from "next/link";
import type { ReactNode } from "react";
import { person } from "@/lib/content";
import { ArrowLeft, ArrowRight } from "./icons";

// Shared pieces of the case-study pages, so every case study reads as one set:
// title-card top row, ruled spec sheet, numbered openers, the Decision and
// Trade-off list, and the closing actions.

export type CaseSection = { id: string; label: string; number: string };
export type TechnicalItem = { title: string; decision: string; tradeoff: string };

/** "All work" back link and the world's project stamp, in one row at the top of a title card. */
export function TitleCardTop({ backHref, number, name }: { backHref: string; number: string; name: string }) {
  return (
    <div className="relative flex items-start justify-between gap-6">
      <Link href={backHref} className="link-arrow">
        <ArrowLeft className="size-3.5" /> All work
      </Link>
      <p className="text-right" aria-hidden="true">
        <span className="label block">Project</span>
        <span className="display block text-[clamp(3rem,5vw,4.75rem)] leading-[0.8]">{number}</span>
        <span className="label mt-1.5 inline-block border-t-[5px] border-current pt-1">{name}</span>
      </p>
    </div>
  );
}

/** One row of the ruled spec sheet. */
export function SpecRow({ term, children, tight = false }: { term: string; children: ReactNode; tight?: boolean }) {
  return (
    <div className={`grid gap-x-10 gap-y-2 border-b-[3px] border-ink md:grid-cols-[12rem_1fr] ${tight ? "py-4" : "py-5"}`}>
      <dt className={`label ${tight ? "pt-3" : "pt-1"}`}>{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}

/** The ruled spec sheet: the skim, answered before the story. */
export function SpecSheet({ children }: { children: ReactNode }) {
  return (
    <section aria-label="At a glance" className="field field-cream px-[var(--gutter)] pt-[clamp(2.5rem,5vw,4rem)]">
      <dl className="border-t-[6px] border-ink">{children}</dl>
    </section>
  );
}

export function StackChips({ items }: { items: string[] }) {
  return (
    <ul translate="no" className="flex flex-wrap gap-2" aria-label="Built with">
      {items.map((s) => (
        <li key={s} className="chip">{s}</li>
      ))}
    </ul>
  );
}

export function RuleList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-1.5">
      {items.map((d) => (
        <li key={d} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.6em] h-[3px] w-4 shrink-0 bg-brick" />
          {d}
        </li>
      ))}
    </ul>
  );
}

/** A section opener: number and title in display caps over a heavy rule that floods when the section is active. */
export function Opener({ id, number, children }: { id: string; number: string; children: ReactNode }) {
  return (
    <h2 id={`${id}-title`} className="display flex items-baseline gap-4 text-[clamp(2.75rem,5vw,4.5rem)]">
      <span aria-hidden="true" className="shrink-0 whitespace-nowrap text-brick">{number}</span>
      {/* inline inside a wrapper, so a wrapped title keeps its rule under each line of caps */}
      <span className="min-w-0">
        <span className="flood box-decoration-clone px-[0.06em]" style={{ ["--flood" as string]: "var(--mustard)" }}>
          {children}
        </span>
      </span>
    </h2>
  );
}

export function StorySection({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="pt-[clamp(3.5rem,7vw,6rem)]">
      <Opener id={id} number={number}>{title}</Opener>
      {children}
    </section>
  );
}

export function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="mt-6 grid gap-4 text-[1.125rem] leading-relaxed">
      {items.map((p) => <p key={p}>{p}</p>)}
    </div>
  );
}

export function HoldsUpList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="mt-8 grid gap-10">
      {items.map((h) => (
        <article key={h.title}>
          <h3 className="text-[1.5rem] leading-tight font-black [font-stretch:75%] uppercase">{h.title}</h3>
          <p className="mt-3 text-[1.125rem] leading-relaxed">{h.body}</p>
        </article>
      ))}
    </div>
  );
}

/** Technical details on teal: numbered rows, each with a Decision and a Trade-off. */
export function TechnicalDetails({ number, intro, items }: { number: string; intro: string; items: TechnicalItem[] }) {
  return (
    <section id="technical" aria-labelledby="technical-title" className="field field-teal on-dark border-t-[6px] border-ink px-[var(--gutter)] py-[clamp(4rem,8vw,7rem)]">
      <h2 id="technical-title" className="display flex items-baseline gap-4 text-[clamp(2.75rem,5vw,4.5rem)]">
        <span aria-hidden="true" className="shrink-0 whitespace-nowrap text-mustard">{number}</span>
        <span className="min-w-0">
          <span className="flood box-decoration-clone px-[0.06em]" style={{ ["--flood" as string]: "var(--ink)" }}>
            Technical details
          </span>
        </span>
      </h2>
      <p className="mt-4 max-w-[52ch] text-[1.125rem]">{intro}</p>
      <ol className="mt-10 border-t-[6px] border-ink">
        {items.map((t, i) => (
          <li key={t.title} className="grid gap-x-10 gap-y-3 border-b-[3px] border-ink py-7 lg:grid-cols-[4rem_minmax(0,18rem)_1fr]">
            <span aria-hidden="true" className="display text-[2.5rem] text-mustard">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-[1.375rem] leading-tight font-black [font-stretch:75%] uppercase">{t.title}</h3>
            <div className="grid max-w-[62ch] gap-3">
              <p><span className="label mr-2">Decision</span>{t.decision}</p>
              <p><span className="label mr-2">Trade-off</span>{t.tradeoff}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** The closing strip: the page's two actions. */
export function CaseClose() {
  return (
    <section aria-label="Next" className="field field-brick on-dark px-[var(--gutter)] py-[clamp(3rem,6vw,5rem)]">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <p className="display text-[clamp(2.5rem,5vw,4.5rem)]">Like how this was built?</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/#contact" className="btn btn-cream text-[1.05rem]">
            Get in touch <ArrowRight className="size-4" />
          </Link>
          <a href={person.cv} download className="btn text-[1.05rem]">
            Download CV <span className="font-semibold normal-case">· {person.cvSize}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
