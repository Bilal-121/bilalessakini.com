import type { Metadata } from "next";
import Link from "next/link";
import Rail from "@/components/Rail";
import Footer from "@/components/Footer";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { StorySection } from "@/components/CaseStudy";
import { ArrowLeft } from "@/components/icons";
import { person } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy and cookies — Bilal Essakini",
  description: "What this site collects, why, and how to change your mind.",
  alternates: { canonical: "/privacy" },
};

const PRIVACY_EMAIL = "essakinibilal1@outlook.com";

const sections = [
  { id: "analytics", label: "Analytics cookies", number: "01" },
  { id: "contact-form", label: "The contact form", number: "02" },
  { id: "your-rights", label: "Your rights", number: "03" },
];

function Body({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 grid gap-4 text-[1.125rem] leading-relaxed">{children}</div>;
}

export default function Privacy() {
  return (
    <>
      <a href="#analytics" className="sr-only-focusable btn fixed top-2 left-2 z-50">
        Skip to the notice
      </a>
      <Rail links={sections} back={{ href: "/", label: "Home" }} />

      <main id="top" className="lg:pl-[var(--rail-w)]">
        <header className="field field-mustard border-b-[6px] border-ink px-[var(--gutter)] pt-8 pb-[clamp(2.5rem,5vw,4rem)]">
          <Link href="/" className="link-arrow">
            <ArrowLeft className="size-3.5" /> Home
          </Link>
          <h1 className="display mt-6 text-[clamp(3.5rem,8vw,7rem)]">
            <span className="block">Privacy</span>{" "}
            <span className="relative -mt-[0.16em] ml-[0.6em] block w-fit bg-cream px-[0.1em] pt-[0.06em] text-[0.5em]">
              and cookies
            </span>
          </h1>
          <p className="mt-6 max-w-[46ch] text-[clamp(1.15rem,1.6vw,1.35rem)] leading-snug font-semibold">
            This site is run by <span translate="no">{person.name}</span>. It collects as little as it can: analytics
            only if you agree to them, and whatever you choose to send through the contact form.
          </p>
          <p className="label mt-4">Last updated 24 October 2026</p>
        </header>

        <div className="field field-cream px-[var(--gutter)] pb-[clamp(4rem,8vw,7rem)]">
          <div className="max-w-[46rem]">
            <StorySection id="analytics" number="01" title="Analytics cookies">
              <Body>
                <p>
                  I use Google Analytics to see which pages get read. It only loads if you choose{" "}
                  <strong>Accept analytics</strong> in the cookie banner. Until then, nothing from Google runs on this
                  site and no analytics cookies are set.
                </p>
                <p>
                  If you accept, Google Analytics records the pages you visit, how you arrived (for example from a
                  search or a link), roughly where you are (country and city), and your device, browser and screen
                  size. It sets two cookies, <code translate="no">_ga</code> and{" "}
                  <code translate="no">_ga_YZ399FC9TC</code>, to tell visits apart. Google processes this data for
                  me.
                </p>
                <p>
                  Your choice itself is saved in your browser’s local storage, not in a cookie, so the banner doesn’t
                  ask again on every page.
                </p>
                <p>
                  <strong>To change your mind,</strong> open the cookie settings and choose Reject. The analytics
                  cookies are deleted and Google Analytics stops loading.
                </p>
                <p>
                  <CookieSettingsLink />
                </p>
              </Body>
            </StorySection>

            <StorySection id="contact-form" number="02" title="The contact form">
              <Body>
                <p>
                  When you send a message, your name, email address and message are passed to{" "}
                  <span translate="no">Resend</span>, an email delivery service, which sends them to my inbox.
                </p>
                <p>I use them only to reply to you.</p>
              </Body>
            </StorySection>

            <StorySection id="your-rights" number="03" title="Your rights">
              <Body>
                <p>
                  Under UK data protection law you can ask to see the personal data I hold about you, ask me to
                  correct it, or ask me to delete it.
                </p>
                <p>
                  For any privacy request, email{" "}
                  <a href={`mailto:${PRIVACY_EMAIL}`} className="font-bold underline">
                    {PRIVACY_EMAIL}
                  </a>
                  .
                </p>
                <p>
                  If you’re unhappy with how I’ve handled your data, you can complain to the Information
                  Commissioner’s Office at{" "}
                  <a href="https://ico.org.uk" className="font-bold underline" target="_blank" rel="noopener noreferrer">
                    ico.org.uk<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  .
                </p>
              </Body>
            </StorySection>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
