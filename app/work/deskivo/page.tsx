import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Rail from "@/components/Rail";
import VideoFrame from "@/components/VideoFrame";
import Footer from "@/components/Footer";
import {
  CaseClose,
  HoldsUpList,
  Paragraphs,
  RuleList,
  SpecRow,
  SpecSheet,
  StackChips,
  StorySection,
  TechnicalDetails,
  TitleCardTop,
} from "@/components/CaseStudy";
import { ArrowUpRight } from "@/components/icons";
import { deskivo, deskivoCase } from "@/lib/content";

export const metadata: Metadata = {
  title: "Deskivo case study — Bilal Essakini",
  description:
    "How I designed and built Deskivo, a desk-booking app for hybrid teams: the problem, the build, and the engineering decisions behind it.",
};

const railLinks = deskivoCase.sections.map((s) => ({ id: s.id, label: s.label, number: s.number }));

export default function DeskivoCaseStudy() {
  return (
    <>
      <a href="#problem" className="sr-only-focusable btn fixed top-2 left-2 z-50">
        Skip to the case study
      </a>
      <Rail links={railLinks} back={{ href: "/", label: "Home" }} />

      <main id="top" className="lg:pl-[var(--rail-w)]">
        {/* ───────── Title card ───────── */}
        <header className="field field-mustard relative overflow-hidden border-b-[6px] border-ink px-[var(--gutter)] pt-6 pb-[clamp(2.5rem,5vw,4rem)] lg:pt-8">
          <div
            aria-hidden="true"
            className="absolute top-[56%] left-[36%] h-[clamp(4rem,9vw,8rem)] w-[120%] origin-left -rotate-[11deg] bg-teal max-lg:top-[70%] max-lg:left-[-10%]"
          />
          <TitleCardTop backHref="/#deskivo" number="01" name="Deskivo" />
          <div className="relative mt-2 grid gap-8 lg:mt-3 lg:grid-cols-12 lg:items-end lg:gap-x-10">
            {/* the name is set big enough to cross into the frame's plane, over it */}
            <div className="relative z-10 lg:col-span-5">
              <h1 className="display text-[clamp(4.5rem,13.5vw,12.5rem)] lg:whitespace-nowrap">
                <span className="sr-only">Case study: </span>
                {/* a keyline in the grained field's on-screen mustard keeps the letters that cross the frame from merging into its ink border */}
                <span translate="no" className="block [paint-order:stroke_fill] [-webkit-text-stroke:0.07em_#d2a738]">Deskivo</span>{" "}
                {/* second plane: a cream plate pulled up into the foot of the name */}
                <span className="relative -mt-[0.32em] ml-[0.8em] block w-fit bg-cream px-[0.12em] pt-[0.08em] text-[0.4em]">
                  Desk booking
                </span>
              </h1>
              <p className="mt-6 max-w-[26ch] text-[clamp(1.2rem,1.7vw,1.5rem)] leading-snug font-semibold">
                {deskivoCase.summary}
              </p>
            </div>
            <figure className="screen relative lg:col-span-7">
              <Image
                src="/media/deskivo-floorplan.webp"
                alt="Deskivo’s interactive floor plan: an office layout with desks marked green where free and red where booked, meeting rooms and break areas."
                width={930}
                height={464}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="block h-auto w-full"
              />
              <figcaption className="label border-t-[6px] border-ink bg-ink px-3 py-2.5 text-cream">
                The interactive floor plan · free desks green, booked red
              </figcaption>
            </figure>
          </div>
        </header>

        {/* ───────── Spec sheet: the skim, answered before the story ───────── */}
        <SpecSheet>
          <SpecRow term="My role"><p className="prose-measure">{deskivoCase.spec.role}</p></SpecRow>
          <SpecRow term="Stack"><StackChips items={deskivoCase.spec.stack} /></SpecRow>
          <SpecRow term="Key decisions"><RuleList items={deskivoCase.spec.decisions} /></SpecRow>
          <SpecRow term="Links" tight>
            <div className="flex flex-wrap items-center gap-x-8">
              <a href={deskivo.live} className="link-arrow" target="_blank" rel="noopener noreferrer">
                Open the live app <ArrowUpRight className="size-3.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <Link href="/#contact" className="link-arrow">Code available on request</Link>
            </div>
          </SpecRow>
        </SpecSheet>

        {/* ───────── The story, in one calm reading column ───────── */}
        <div className="field field-cream px-[var(--gutter)] pb-[clamp(4rem,8vw,7rem)]">
          <div className="max-w-[46rem]">
            <StorySection id="problem" number="01" title="The problem">
              <Paragraphs items={deskivoCase.problem} />
            </StorySection>

            <StorySection id="built" number="02" title="What I built">
              <Paragraphs items={deskivoCase.built} />
            </StorySection>
          </div>

          {/* the walkthrough breaks out of the column, at the width the work deserves */}
          <div className="mt-10 max-w-[62rem]">
            <VideoFrame
              src="/media/deskivo-walkthrough.mp4"
              poster="/media/deskivo-poster.webp"
              width={1280}
              height={580}
              label="Deskivo full walkthrough: finding a desk on the floor plan, My Bookings and the admin dashboard"
              caption="Full walkthrough · 21 seconds, no sound"
              className="[--slice:var(--mustard)]"
            />
          </div>

          <div className="max-w-[46rem]">
            <StorySection id="holds-up" number="03" title="How it holds up">
              <HoldsUpList items={deskivoCase.holdsUp} />
            </StorySection>

            <StorySection id="result" number="04" title="The result">
              <p className="mt-6 text-[clamp(1.25rem,1.8vw,1.5rem)] leading-snug font-semibold">{deskivoCase.result}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
                <a href={deskivo.live} className="btn" target="_blank" rel="noopener noreferrer">
                  Open the live app <ArrowUpRight className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </StorySection>
          </div>
        </div>

        <TechnicalDetails
          number="05"
          intro="For engineers: three decisions in the codebase, and what each one costs."
          items={deskivoCase.technical}
        />

        <CaseClose />
      </main>

      <Footer />
    </>
  );
}
