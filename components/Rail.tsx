"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { person, railLinks as homeLinks } from "@/lib/content";
import { ArrowDown, ArrowLeft } from "./icons";

export type RailLink = { id: string; label: string; number: string | null };

// The running-order rail. Tracks which frame is on screen, marks it on the
// rail (the number stamps in) and sets data-active on the frame itself so its
// title floods in one hard cut.
export default function Rail({
  links = homeLinks,
  back,
}: {
  /** The page's sections, in reading order. */
  links?: RailLink[];
  /** A way back to the home page, shown above the sections on inner pages. */
  back?: { href: string; label: string };
} = {}) {
  const railLinks = links;
  const [active, setActive] = useState<string>(railLinks[0].id);
  const stripRef = useRef<HTMLOListElement>(null);
  const [stripAtEnd, setStripAtEnd] = useState(false);

  function onStripScroll() {
    const strip = stripRef.current;
    if (strip) setStripAtEnd(strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4);
  }

  useEffect(() => {
    // The active frame is the last one whose top has passed 40% of the
    // viewport, so short frames (the Cinema strip) still register. At the very
    // bottom of the page the last frame wins.
    let frame = 0;
    function update() {
      frame = 0;
      const line = window.innerHeight * 0.4;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = railLinks[0].id;
      for (const l of railLinks) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= line) current = l.id;
      }
      if (atBottom) current = railLinks[railLinks.length - 1].id;
      setActive(current);
    }
    // railLinks is fixed for the life of a page
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    railLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) el.dataset.active = String(l.id === active);
    });
    // keep the active item visible in the mobile strip, scrolling only the strip
    const strip = stripRef.current;
    const item = strip?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (strip && item && strip.offsetParent !== null) {
      const left = item.offsetLeft - (strip.clientWidth - item.offsetWidth) / 2;
      strip.scrollTo({ left: Math.max(0, left), behavior: "auto" });
      onStripScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <>
      {/* desktop: fixed cream rail on the left */}
      <nav
        aria-label="Sections"
        className="field field-cream fixed inset-y-0 left-0 z-30 hidden w-[var(--rail-w)] flex-col border-r-[6px] border-ink px-6 pt-8 pb-7 lg:flex"
      >
        <a href="#top" translate="no" className="display block text-[2.6rem] no-underline">
          <span className="block">Bilal</span> <span className="block">Essakini</span>
        </a>
        <p className="label mt-3 text-ink-soft">{person.role}</p>

        {back && (
          <Link href={back.href} className="link-arrow mt-8 w-fit">
            <ArrowLeft className="size-3.5" /> {back.label}
          </Link>
        )}

        <ol className={`${back ? "mt-4" : "mt-10"} grid gap-1`}>
          {railLinks.map((l) => {
            const isActive = l.id === active;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setActive(l.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`group flex items-baseline gap-3 py-1.5 no-underline ${
                    isActive ? "" : "hover:underline"
                  }`}
                >
                  {/* projects carry their number; the other frames align without a marker */}
                  <span
                    key={isActive ? `${l.id}-on` : l.id}
                    className={`display inline-block w-9 text-[1.65rem] ${
                      isActive ? "stamp-on text-brick" : "text-ink"
                    }`}
                    aria-hidden="true"
                  >
                    {l.number ?? ""}
                  </span>
                  <span
                    className={`label text-[0.95rem] ${
                      isActive ? "bg-ink px-1.5 py-0.5 text-cream" : ""
                    }`}
                  >
                    {l.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>

        <div className="mt-auto">
          <a href={person.cv} download className="btn w-full justify-center px-3 text-[0.9rem]">
            Download CV <ArrowDown className="size-4" />
          </a>
          <p className="mt-2 text-center text-sm text-ink-soft">{person.cvSize}</p>
        </div>
      </nav>

      {/* mobile + tablet: sticky strip across the top */}
      <nav
        aria-label="Sections"
        className="field field-cream sticky top-0 z-30 border-b-[6px] border-ink lg:hidden"
      >
        <div className="flex items-center justify-between gap-4 px-[var(--gutter)] pt-2">
          <a href="#top" className="flex min-h-11 flex-col justify-center no-underline">
            <span translate="no" className="display text-[1.75rem]">Bilal Essakini</span>
            <span className="label mt-0.5 text-[0.8125rem] text-ink-soft">
              {person.role} · <span translate="no">{person.roleStack}</span>
            </span>
          </a>
          <a href={person.cv} download className="btn min-h-11 px-4 text-sm" aria-label={`Download CV (${person.cvSize})`}>
            CV <ArrowDown className="size-3.5" />
          </a>
        </div>
        {/* the right edge fades while more items wait off-screen */}
        <ol
          ref={stripRef}
          onScroll={onStripScroll}
          className={`flex gap-1 overflow-x-auto px-[var(--gutter)] pt-1.5 pb-2 [scrollbar-width:none] ${
            stripAtEnd ? "" : "[mask-image:linear-gradient(to_right,#000_80%,transparent)]"
          }`}
        >
          {back && (
            <li className="shrink-0">
              <Link href={back.href} className="label flex min-h-11 items-center gap-1.5 px-2.5 no-underline">
                <ArrowLeft className="size-3.5" /> {back.label}
              </Link>
            </li>
          )}
          {railLinks.map((l) => {
            const isActive = l.id === active;
            return (
              <li key={l.id} data-id={l.id} className="shrink-0">
                <a
                  href={`#${l.id}`}
                  onClick={() => setActive(l.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`label flex min-h-11 items-center gap-1.5 px-2.5 no-underline ${
                    isActive ? "bg-ink text-cream" : "underline-offset-4 hover:underline"
                  }`}
                >
                  {l.number && <span aria-hidden="true">{l.number}</span>}
                  {l.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
