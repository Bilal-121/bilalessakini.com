import { person } from "@/lib/content";
import { ArrowDown } from "./icons";

/** Shared closing strip: starts at the rail's edge so the rail and its CV button stay whole. */
export default function Footer() {
  return (
    <footer className="field field-ink on-dark px-[var(--gutter)] py-8 lg:ml-[var(--rail-w)]">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={person.cv} download className="btn btn-mustard">
            Download CV <ArrowDown className="size-4" />
            <span className="font-semibold normal-case">· {person.cvSize}</span>
          </a>
          <a href={`mailto:${person.email}`} className="link-arrow">Email</a>
        </div>
        <div className="text-sm">
          <p>Built with Next.js, Tailwind CSS, Vercel</p>
          <p>© 2026 {person.name}</p>
        </div>
      </div>
    </footer>
  );
}
