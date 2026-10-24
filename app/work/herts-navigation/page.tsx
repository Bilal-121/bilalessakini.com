import type { Metadata } from "next";
import Image from "next/image";
import Rail from "@/components/Rail";
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
import { herts, hertsCase } from "@/lib/content";

export const metadata: Metadata = {
  title: "Herts navigation case study — Bilal Essakini",
  description:
    "How I rebuilt the main navigation for herts.ac.uk: one shared, accessible navigation for every university site, managed by editors in the CMS.",
  openGraph: {
    title: "Herts navigation case study — Bilal Essakini",
    description: "One shared, accessible navigation for every University of Hertfordshire site.",
    url: "https://bilalessakini.com/work/herts-navigation",
    type: "article",
  },
};

const railLinks = hertsCase.sections.map((s) => ({ id: s.id, label: s.label, number: s.number }));

function VisitLink({ asButton = false }: { asButton?: boolean }) {
  return (
    <a href={herts.live} className={asButton ? "btn" : "link-arrow"} target="_blank" rel="noopener noreferrer">
      Visit herts.ac.uk <ArrowUpRight className={asButton ? "size-4" : "size-3.5"} />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export default function HertsCaseStudy() {
  return (
    <>
      <a href="#problem" className="sr-only-focusable btn fixed top-2 left-2 z-50">
        Skip to the case study
      </a>
      <Rail links={railLinks} back={{ href: "/", label: "Home" }} />

      <main id="top" className="lg:pl-[var(--rail-w)]">
        {/* ───────── Title card: Herts keeps its home-page field, teal ───────── */}
        <header className="field field-teal on-dark relative overflow-hidden border-b-[6px] border-ink px-[var(--gutter)] pt-6 pb-[clamp(2.5rem,5vw,4rem)] lg:pt-8">
          <div
            aria-hidden="true"
            className="absolute top-[70%] left-[-10%] h-[clamp(4rem,9vw,8rem)] w-[120%] origin-left -rotate-[11deg] bg-mustard lg:top-[64%] lg:left-[58%]"
          />
          <TitleCardTop backHref="/#herts" number="02" name="Herts navigation" />
          {/* --name is the display size; the frame's offset is set in the same unit, so the S always crosses by the same share of a letter */}
          <div className="relative mt-2 grid gap-8 [--name:clamp(4.5rem,13.5vw,12.5rem)] lg:mt-3 lg:flex lg:items-end lg:gap-0 lg:[--name:min(13.5vw,12.5rem,21svh)]">
            {/* the name holds the gutter; the column is exactly as wide as the name */}
            <div className="relative z-10 lg:w-fit lg:shrink-0">
              <h1 className="display text-[length:var(--name)] lg:whitespace-nowrap">
                <span className="sr-only">Case study: </span>
                <span translate="no" className="block">
                  Hert
                  {/* a keyline in the grained field's on-screen teal keeps the crossing letter clear of the frame's ink border */}
                  <span className="[paint-order:stroke_fill] lg:[-webkit-text-stroke:0.07em_#136568]">s</span>
                </span>{" "}
                {/* second plane: the home page's ink-on-mustard plate, pulled up into the foot of the name */}
                <span className="relative -mt-[0.32em] ml-[0.8em] block w-fit bg-mustard px-[0.12em] pt-[0.08em] text-[0.4em] text-ink">
                  Navigation
                </span>
              </h1>
              {/* takes the column's width without widening it */}
              <p className="mt-5 max-w-[30ch] text-[clamp(1.15rem,1.6vw,1.4rem)] leading-snug font-semibold lg:w-0 lg:min-w-[calc(100%-var(--name)*0.27-1.5rem)] lg:max-w-none">
                {hertsCase.summary}
              </p>
            </div>
            {/* the frame reaches left under the name, so the S crosses its border into the link-free strip left of the menu */}
            <figure className="screen relative min-w-0 lg:-ml-[calc(var(--name)*0.27)] lg:flex-1">
              <Image
                src="/media/herts-desktop-nav-bar-open.webp"
                alt="The new herts.ac.uk navigation on desktop with the About Us menu open: links grouped under About us, Our people and Quick links, each with a chevron, a Partnerships at Herts promo card on the right, and the page behind dimmed."
                width={1589}
                height={793}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="block h-auto w-full"
              />
              <figcaption className="label border-t-[6px] border-ink bg-ink px-3 py-2.5 text-cream">
                Desktop · the About Us menu open, page behind dimmed
              </figcaption>
            </figure>
          </div>
        </header>

        <SpecSheet>
          <SpecRow term="My role"><p className="prose-measure">{hertsCase.spec.role}</p></SpecRow>
          <SpecRow term="Stack"><StackChips items={hertsCase.spec.stack} /></SpecRow>
          <SpecRow term="Key decisions"><RuleList items={hertsCase.spec.decisions} /></SpecRow>
          <SpecRow term="Result">
            <p className="font-semibold">
              <span className="bg-mustard px-[0.2em] font-black">40%</span>{" "}
              {hertsCase.spec.result.replace(/^40% /, "")}
            </p>
          </SpecRow>
          <SpecRow term="Links" tight>
            <div className="flex flex-wrap items-center gap-x-8">
              <VisitLink />
              <span className="font-bold">Code not shown: it belongs to the university</span>
            </div>
          </SpecRow>
        </SpecSheet>

        {/* ───────── The story, in one calm reading column ───────── */}
        <div className="field field-cream px-[var(--gutter)] pb-[clamp(4rem,8vw,7rem)]">
          <div className="max-w-[46rem]">
            <StorySection id="problem" number="01" title="The problem">
              <Paragraphs items={hertsCase.problem} />
            </StorySection>

            <StorySection id="built" number="02" title="What I built">
              <Paragraphs items={hertsCase.built} />
            </StorySection>
          </div>

          {/* phone captures at their native size, never enlarged */}
          <div className="mt-10 flex flex-wrap items-end gap-6">
            <figure className="w-fit max-w-full">
              <div className="screen">
                <Image
                  src="/media/herts-mobile-nav-bar-close.webp"
                  alt="The herts.ac.uk header on mobile, closed: logo, search and a menu button."
                  width={523}
                  height={349}
                  className="block h-auto w-[261px] max-w-full"
                />
                <figcaption className="label border-t-[6px] border-ink bg-ink px-3 py-2 text-cream">Mobile · closed</figcaption>
              </div>
            </figure>
            <figure className="w-fit max-w-full">
              <div className="screen">
                <Image
                  src="/media/herts-mobile-nav-bar-open.webp"
                  alt="The herts.ac.uk mobile menu open: a full-screen list of Study, Life, International, Research, For business, About us and Socials, each with a chevron to drill in, and a close button."
                  width={524}
                  height={484}
                  className="block h-auto w-[262px] max-w-full"
                />
                <figcaption className="label border-t-[6px] border-ink bg-ink px-3 py-2 text-cream">Mobile · menu open</figcaption>
              </div>
            </figure>
          </div>

          <div className="max-w-[46rem]">
            <StorySection id="holds-up" number="03" title="How it holds up">
              <HoldsUpList items={hertsCase.holdsUp} />
            </StorySection>

            <StorySection id="result" number="04" title="The result">
              <p className="mt-6 text-[clamp(1.25rem,1.8vw,1.5rem)] leading-snug font-semibold">{hertsCase.result}</p>
              <div className="mt-6">
                <VisitLink asButton />
              </div>
            </StorySection>
          </div>
        </div>

        <TechnicalDetails
          number="05"
          intro="For engineers: three decisions behind the navigation, and what each one costs."
          items={hertsCase.technical}
        />

        <CaseClose />
      </main>

      <Footer />
    </>
  );
}
