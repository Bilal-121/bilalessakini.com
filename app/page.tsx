import Image from "next/image";
import Link from "next/link";
import Rail from "@/components/Rail";
import VideoFrame from "@/components/VideoFrame";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { ArrowDown, ArrowRight, ArrowUpRight } from "@/components/icons";
import {
  cinema,
  deskivo,
  experience,
  herts,
  person,
  stack,
} from "@/lib/content";

/** The project number: "PROJECT / 01 / DESKIVO", set as the frame's ornament. */
function Stamp({ number, name, className = "" }: { number: string; name: string; className?: string }) {
  return (
    <p className={`text-right ${className}`} aria-hidden="true">
      <span className="label block">Project</span>
      <span className="display block text-[clamp(4.5rem,9vw,8.5rem)] leading-[0.8]">{number}</span>
      <span className="label mt-2 inline-block border-t-[5px] border-current pt-1.5">{name}</span>
    </p>
  );
}

/**
 * A frame title in heavy caps. The first line floods with colour when the
 * frame goes active; an optional second line is a mustard plate that collides
 * up into it, ink on mustard, on its own plane.
 */
function FrameTitle({ id, children, second, flood, className = "" }: { id: string; children: React.ReactNode; second?: string; flood: string; className?: string }) {
  return (
    <h2 id={id} className={`display text-[clamp(3.5rem,8.5vw,8rem)] ${className}`}>
      <span className="block">
        {/* with a second-line plate below, the resting rule sits above the caps instead */}
        <span className={`flood px-[0.06em] ${second ? "flood-bare" : ""}`} style={{ ["--flood" as string]: flood }}>
          {children}
        </span>
      </span>
      {second && (
        <>
          {" "}
          <span className="relative -mt-[0.16em] ml-[0.35em] inline-block bg-mustard px-[0.08em] pt-[0.06em] text-ink">
            {second}
          </span>
        </>
      )}
    </h2>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul translate="no" className="flex flex-wrap gap-2" aria-label="Built with">
      {items.map((s) => (
        <li key={s} className="chip">{s}</li>
      ))}
    </ul>
  );
}

function Notes({ rows }: { rows: { term: string; body: React.ReactNode }[] }) {
  return (
    <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-[9.5rem_1fr]">
      {rows.map((r) => (
        <div key={r.term} className="contents">
          <dt className="label pt-1">{r.term}</dt>
          <dd className="prose-measure text-[1.0625rem]">{r.body}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function Home() {
  return (
    <>
      <a href="#deskivo" className="sr-only-focusable btn fixed top-2 left-2 z-50">
        Skip to the work
      </a>
      <Rail />

      <main id="top" className="lg:pl-[var(--rail-w)]">
        {/* ───────── Project 01 · Deskivo (opening frame) ───────── */}
        <section id="deskivo" aria-labelledby="hero-title" className="scroll-mt-0">
          <div className="field field-mustard relative flex flex-col overflow-hidden lg:min-h-[100svh]">
            {/* teal bar slicing behind the screen */}
            <div
              aria-hidden="true"
              className="absolute top-[47%] left-[40%] h-[clamp(4.5rem,10vw,8.5rem)] w-[120%] origin-left -rotate-[11deg] bg-teal max-lg:top-[58%] max-lg:left-[-10%]"
            />

            <div className="relative grid gap-y-8 px-[var(--gutter)] pt-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-6 lg:pt-8">
              <h1 id="hero-title" className="display text-[clamp(4.5rem,11.6vw,12.5rem)] lg:col-span-9 lg:text-[min(11.6vw,12.5rem,17svh)] lg:whitespace-nowrap">
                {/* the name is announced first; the slogan stays the visual headline */}
                <span className="sr-only">Bilal Essakini, front-end developer. </span>
                <span className="block">Feels good.</span>{" "}
                <span className="relative -mt-[0.17em] block pl-[0.5em] text-brick">Holds up.</span>
              </h1>

              <Stamp number="01" name="Deskivo" className="hidden lg:col-span-3 lg:block" />

              <p className="max-w-[26ch] text-[clamp(1.25rem,1.7vw,1.55rem)] leading-snug font-semibold lg:col-span-4 lg:pt-4">
                {person.pitch}
              </p>

              <div className="relative w-full lg:col-span-8 lg:mt-[clamp(0.25rem,1vw,1rem)] lg:max-w-[calc(33svh*2)] lg:justify-self-end">
                <VideoFrame
                  src="/media/deskivo-floorplan-pan.mp4"
                  poster="/media/deskivo-floorplan.webp"
                  width={930}
                  height={464}
                  ambient
                  caption="Deskivo, desk booking · Next.js, Prisma, PostgreSQL"
                  label="Deskivo: the interactive floor plan, with free and booked desks"
                />
                <p className="label relative mt-2 flex justify-end">
                  <a href="#deskivo-notes" className="link-arrow min-h-11 whitespace-nowrap normal-case lg:min-h-0">
                    See the full walkthrough <ArrowDown className="size-3.5" />
                  </a>
                </p>
              </div>
            </div>

            {/* brick band along the foot of the frame */}
            <div className="field field-brick on-dark relative mt-10 [clip-path:polygon(0_clamp(2.5rem,30%,4.5rem),100%_0,100%_100%,0_100%)] lg:mt-auto">
              <div className="flex flex-wrap items-end justify-between gap-6 px-[var(--gutter)] pt-[4.5rem] pb-6 lg:pt-[clamp(2.75rem,6svh,4.5rem)] lg:pb-[clamp(1rem,2.5svh,1.5rem)]">
                <p className="max-w-[60ch] text-[clamp(1.1rem,1.45vw,1.3rem)] leading-snug font-semibold">
                  <span translate="no">{person.factsStack}</span> {person.facts}{" "}
                  <span className="whitespace-nowrap">{person.location}.</span>
                </p>
                <a href="#contact" className="btn btn-cream text-[1.05rem]">
                  Get in touch <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>

          {/* liner notes: problem → build → role, same order every project */}
          <div id="deskivo-notes" className="field field-cream overflow-hidden border-b-[6px] border-ink px-[var(--gutter)] py-[clamp(4rem,8vw,7rem)]">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <FrameTitle id="deskivo-title" flood="var(--mustard)"><span translate="no">{deskivo.name}</span></FrameTitle>
                <p className="mt-6 text-[clamp(1.35rem,2.2vw,1.85rem)] leading-tight font-bold">{deskivo.summary}</p>
                <div className="relative mt-10">
                  <div aria-hidden="true" className="absolute top-[38%] -right-[4%] -left-[var(--gutter)] h-[clamp(3rem,6vw,5.5rem)] origin-left rotate-[8deg] bg-teal" />
                <VideoFrame
                  src="/media/deskivo-walkthrough.mp4"
                  poster="/media/deskivo-poster.webp"
                  width={1280}
                  height={580}
                  label="Deskivo full walkthrough: finding a desk, My Bookings and the admin dashboard"
                  caption="Full walkthrough · 21 seconds, no sound"
                  className="relative [--slice:var(--mustard)]"
                />
                </div>
              </div>
              <div className="grid gap-10 lg:col-span-7">
                <Notes
                  rows={[
                    { term: "The problem", body: deskivo.problem },
                    { term: "What I built", body: deskivo.build },
                    { term: "My part", body: deskivo.role },
                  ]}
                />
                <Chips items={deskivo.stack} />
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                  <Link href="/work/deskivo" className="btn">
                    Read the case study <ArrowRight className="size-4" />
                  </Link>
                  <a href={deskivo.live} className="link-arrow" target="_blank" rel="noopener noreferrer">
                    Open the live app <ArrowUpRight className="size-3.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  <a href="#contact" className="link-arrow">Code available on request</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Project 02 · Herts navigation ───────── */}
        <section id="herts" aria-labelledby="herts-title" className="field field-teal on-dark overflow-hidden border-b-[6px] border-ink">
          <div className="px-[var(--gutter)] pt-[clamp(4rem,8vw,7rem)]">
            <div className="flex flex-wrap items-start justify-between gap-8">
              <div className="max-w-[52rem]">
                <FrameTitle id="herts-title" flood="var(--ink)" second="navigation">
                  Herts
                </FrameTitle>
                <p className="mt-6 max-w-[40ch] text-[clamp(1.2rem,1.9vw,1.55rem)] leading-snug font-semibold">
                  {herts.summary}
                </p>
              </div>
              <Stamp number="02" name="Herts navigation" className="hidden md:block" />
            </div>

            <p className="mt-[clamp(3rem,6vw,5rem)] max-w-[22ch] text-[clamp(2.1rem,4.4vw,4rem)] leading-[1.02] font-black [font-stretch:75%]">
              <span className="bg-mustard px-[0.12em] text-ink box-decoration-clone">40%</span> overall improvement in
              page load speed and performance.
            </p>
            <p className="label mt-4">{herts.resultSource}</p>
          </div>

          {/* the new navigation: the open-menu capture shows the header bar too, so one desktop shot carries both */}
          <div className="relative mt-[clamp(3rem,6vw,5rem)] grid gap-6 px-[var(--gutter)] lg:grid-cols-12">
            <div
              aria-hidden="true"
              className="absolute top-[38%] left-[-10%] h-[clamp(4rem,9vw,8rem)] w-[130%] origin-left rotate-[7deg] bg-mustard"
            />
            <figure className="relative lg:col-span-9">
              <div className="screen slice" style={{ ["--slice" as string]: "var(--mustard)" }}>
                <Image
                  src="/media/herts-desktop-nav-bar-open.webp"
                  alt="The new herts.ac.uk navigation on desktop with the About Us menu open: links grouped under About us, Our people and Quick links, each with a chevron, a Partnerships at Herts promo card on the right, and the page behind dimmed."
                  width={1589}
                  height={793}
                  sizes="(min-width: 1024px) 65vw, 100vw"
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="label relative mt-3 w-fit bg-teal px-1.5 py-1">Desktop · header with the About Us menu open</figcaption>
            </figure>
          </div>

          <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-12 px-[var(--gutter)] pb-[clamp(4rem,8vw,7rem)] lg:grid-cols-12">
            {/* phone captures side by side where they fit; scaled down, never up */}
            <div className="flex flex-wrap content-start items-start gap-6 lg:col-span-5">
              {/* closed state from 640px up; phones show only the open menu, at a readable size */}
              <figure className="hidden min-w-0 sm:block">
                <div className="w-fit max-w-full border-[6px] border-ink bg-ink">
                  <Image
                    src="/media/herts-mobile-nav-bar-close.webp"
                    alt="The herts.ac.uk header on mobile, closed: logo, search and a menu button."
                    width={523}
                    height={349}
                    className="block h-auto w-[261px] max-w-full"
                  />
                </div>
                <figcaption className="label mt-3">Mobile · closed</figcaption>
              </figure>
              <figure className="min-w-0">
                <div className="w-fit max-w-full border-[6px] border-ink bg-ink">
                  <Image
                    src="/media/herts-mobile-nav-bar-open.webp"
                    alt="The herts.ac.uk mobile menu open: a full-screen list of the six sections, each with a chevron to drill in, and a close button."
                    width={524}
                    height={484}
                    className="block h-auto w-[262px] max-w-full"
                  />
                </div>
                <figcaption className="label mt-3">Mobile · open</figcaption>
              </figure>
            </div>

            <div className="grid gap-10 lg:col-span-7">
              <Notes
                rows={[
                  { term: "The problem", body: herts.problem },
                  { term: "What I built", body: herts.build },
                  {
                    term: "Accessibility",
                    body: (
                      <ul className="grid gap-2">
                        {herts.accessibility.map((a) => (
                          <li key={a} className="flex gap-3">
                            <span aria-hidden="true" className="mt-[0.55em] h-[3px] w-4 shrink-0 bg-mustard" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    term: "The result",
                    body: herts.otherResults,
                  },
                ]}
              />
              <Chips items={herts.stack} />
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link href="/work/herts-navigation" className="btn btn-cream">
                  Read the case study <ArrowRight className="size-4" />
                </Link>
                <a href={herts.live} className="link-arrow" target="_blank" rel="noopener noreferrer">
                  Visit herts.ac.uk <ArrowUpRight className="size-3.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <span className="font-bold">Code not shown: it belongs to the university</span>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Project 03 · Cinema (compact strip) ───────── */}
        <section id="cinema" aria-labelledby="cinema-title" className="field field-brick on-dark overflow-hidden border-b-[6px] border-ink px-[var(--gutter)] py-[clamp(2.5rem,5vw,4rem)]">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="relative lg:order-2 lg:col-span-5">
              <VideoFrame
                src="/media/cinema-walkthrough.mp4"
                poster="/media/cinema-poster.webp"
                width={1280}
                height={656}
                label="Cinema booking walkthrough: choosing a showing and a seat"
                caption="Walkthrough · 17 seconds, no sound"
                className="relative [--slice:var(--mustard)]"
              />
            </div>
            <div className="lg:order-1 lg:col-span-7">
              <p className="label">Project 03</p>
              <h2 id="cinema-title" className="display mt-2 text-[clamp(2.75rem,5vw,4.5rem)]">
                <span className="flood px-[0.06em]" style={{ ["--flood" as string]: "var(--ink)" }}>
                  {cinema.name}
                </span>
              </h2>
              <p className="mt-4 max-w-[46ch] text-[clamp(1.15rem,1.6vw,1.35rem)] leading-snug font-semibold">
                {cinema.summary} {cinema.build}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Chips items={cinema.stack} />
                <a href="#contact" className="link-arrow">Code available on request</a>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── Experience ───────── */}
        <section id="experience" aria-labelledby="experience-title" className="field field-cream relative overflow-hidden border-b-[6px] border-ink px-[var(--gutter)] py-[clamp(4rem,8vw,7rem)]">
          <div aria-hidden="true" className="absolute top-[clamp(3rem,6vw,5rem)] right-[-8%] h-[clamp(3rem,6vw,5rem)] w-[55%] -rotate-[6deg] bg-brick max-md:hidden" />
          <FrameTitle id="experience-title" flood="var(--mustard)">Experience</FrameTitle>
          <ol className="mt-12 border-t-[6px] border-ink">
            {experience.map((e) => (
              <li key={e.role + e.period} className="grid gap-x-10 gap-y-2 border-b-[3px] border-ink py-7 md:grid-cols-[12rem_1fr] lg:grid-cols-[12rem_minmax(0,26rem)_1fr]">
                <p className="label pt-1.5">{e.period}</p>
                <div>
                  <h3 className="text-[1.5rem] leading-tight font-black [font-stretch:75%] uppercase">{e.role}</h3>
                  <p className="font-semibold">{e.company}</p>
                </div>
                <p className="prose-measure md:col-start-2 lg:col-start-3">{e.note}</p>
              </li>
            ))}
          </ol>
          <a href={person.cv} download className="btn mt-10">
            Download CV <ArrowDown className="size-4" />
            <span className="font-semibold normal-case">· {person.cvSize}</span>
          </a>
        </section>

        {/* ───────── Stack ───────── */}
        <section id="stack" aria-labelledby="stack-title" className="field field-mustard relative overflow-hidden border-b-[6px] border-ink px-[var(--gutter)] py-[clamp(4rem,8vw,7rem)]">
          <div aria-hidden="true" className="absolute top-[clamp(3rem,6vw,5rem)] right-[-8%] h-[clamp(3rem,6vw,5rem)] w-[55%] rotate-[5deg] bg-teal max-md:hidden" />
          <FrameTitle id="stack-title" flood="var(--cream)">Stack</FrameTitle>
          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h3 className="label">{stack[0].group}</h3>
              <ul translate="no" className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                {stack[0].items.map((s) => (
                  <li key={s} className="display text-[clamp(2.4rem,4.6vw,4rem)] leading-[0.95]">{s}</li>
                ))}
              </ul>
              <ul translate="no" className="mt-5 flex flex-wrap gap-2" aria-label="Also on the front end">
                {stack[0].also.map((s) => (
                  <li key={s} className="chip">{s}</li>
                ))}
              </ul>
            </div>
            <div className="grid content-start gap-8 lg:col-span-5">
              {stack.slice(1).map((g) => (
                <div key={g.group}>
                  <h3 className="label">{g.group}</h3>
                  <ul translate="no" className="mt-3 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li key={s} className="chip">{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Contact ───────── */}
        <section id="contact" aria-labelledby="contact-title" className="field field-teal on-dark overflow-hidden px-[var(--gutter)] py-[clamp(4rem,8vw,7rem)]">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="relative lg:col-span-5">
              <FrameTitle id="contact-title" flood="var(--ink)" second="touch">
                Get in
              </FrameTitle>
              <p className="mt-6 max-w-[30ch] text-[clamp(1.25rem,2vw,1.6rem)] leading-snug font-semibold">
                Hiring for a front-end role, or need a site built properly? Tell me what you’re working on.
              </p>
              {/* the form is the main route; everything else is one quiet line */}
              <p className="mt-8 flex flex-wrap items-center gap-x-3">
                <span>Or reach me by</span>
                <a href={`mailto:${person.email}`} className="link-arrow">email</a>
                <span aria-hidden="true">·</span>
                <a href={person.linkedin} className="link-arrow" target="_blank" rel="noopener noreferrer">
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </a>
                <span aria-hidden="true">·</span>
                <a href={person.github} className="link-arrow" target="_blank" rel="noopener noreferrer">
                  GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
