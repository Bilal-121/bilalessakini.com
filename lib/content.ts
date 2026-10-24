// Single source for every fact the home page states. Claims here must match
// PRODUCT.md: no invented numbers, and unconfirmed engineering talking points
// stay out until they are checked against the code.

export const person = {
  name: "Bilal Essakini",
  role: "Front-end developer",
  // one line for the mobile strip, where the desktop rail's role label is hidden
  roleStack: "React / Next.js",
  cvSize: "PDF, 371 KB",
  location: "UK-based, open to remote",
  email: "essakinibilal1@outlook.com",
  github: "https://github.com/Bilal-121",
  linkedin: "https://www.linkedin.com/in/bilalessakini1/",
  cv: "/Bilal-Essakini-CV.pdf",
  pitch:
    "I build interfaces that feel as good as they look — and hold up in production.",
  // The facts a recruiter scans for in the first screen: stack, then where.
  factsStack: "React · Next.js · TypeScript.",
  facts:
    "Production websites for the University of Hertfordshire; now building production data systems at OpenSignal.",
};


export type Session = {
  id: string;
  number: string;
  short: string;
};

export const sessions: Session[] = [
  { id: "deskivo", number: "01", short: "Deskivo" },
  { id: "herts", number: "02", short: "Herts navigation" },
  { id: "cinema", number: "03", short: "Cinema" },
];

export const railLinks = [
  ...sessions.map((s) => ({ id: s.id, label: s.short, number: s.number })),
  { id: "experience", label: "Experience", number: null },
  { id: "stack", label: "Stack", number: null },
  { id: "contact", label: "Contact", number: null },
];

export const deskivo = {
  name: "Deskivo",
  summary: "Desk booking for hybrid teams.",
  problem:
    "In hybrid offices people turn up and can’t find a desk, or can’t sit near their team. Admins have no simple way to manage the space.",
  build:
    "Users pick a date, see the office on an interactive floor plan and reserve a free desk in a few taps — for a day or a whole week. They can see where teammates have booked and manage everything from My Bookings. Admins run offices, floors and desks from a dashboard and upload their own floor plans.",
  role: "Designed and built end to end: interface, data model, authentication and deployment.",
  stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "NextAuth.js", "Tailwind CSS", "Vercel"],
  live: "https://office-desk-booking-system-xlgy-gilt.vercel.app",
};

export const herts = {
  name: "Herts navigation",
  summary:
    "The new main navigation for herts.ac.uk, used by every visitor to the University of Hertfordshire website. Built with the university’s designers and stakeholders, from brief to launch.",
  problem:
    "The old navigation looked dated, slowed the site down, and made it hard for prospective students, current students and staff to find what they needed — its labels didn’t say where links went.",
  build:
    "Six plain top-level sections with search. Each opens a full-width menu of links grouped under clear headings, with descriptive labels so people know where they’re going before they click. On mobile, a full-screen menu drills into the same sections.",
  resultSource: "Measured with Google Lighthouse.",
  // Outcomes without exact figures: the 40% above is the only measured number.
  otherResults:
    "Beyond the speed gain: fewer support requests about finding pages, and clearer analytics on how visitors move through the site.",
  accessibility: [
    "Keyboard and focus: every menu opens, moves and closes without a mouse, and focus returns to its trigger.",
    "Menus announce expanded and collapsed states, tested with screen readers.",
  ],
  stack: ["University CMS", "HTML", "Bootstrap", "Sass", "JavaScript", "jQuery", "Lighthouse", "Google Analytics"],
  live: "https://www.herts.ac.uk",
};

export const cinema = {
  name: "Cinema booking",
  summary: "Browse showings, pick a seat on the seat map, sign in and check out.",
  problem: "Booking a specific seat online, quickly, without two people ending up in the same seat.",
  build: "Front end and PHP/MySQL back end, built by me.",
  stack: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "Bootstrap"],
};

export const experience = [
  {
    role: "Data Acquisition Engineer",
    company: "OpenSignal",
    period: "Dec 2025 – Present",
    note: "Production systems that have to hold up every day: GitLab CI/CD, monitoring and SLA-driven daily data feeds.",
  },
  {
    role: "Web Developer",
    company: "University of Hertfordshire",
    period: "Mar 2025 – Nov 2025",
    note: "Accessible, performant web apps with React, the university CMS and APIs — including the new site navigation.",
  },
  {
    role: "Graduate Marketing Executive (Web Developer)",
    company: "University of Hertfordshire",
    period: "Mar 2024 – Feb 2025",
    note: "Responsive landing pages and campaign content with the marketing team, contributing to a 40% uplift in user engagement and a 35% increase in site traffic, and improving WCAG 2.1 compliance by about 20%.",
  },
  {
    role: "BSc (Hons) Computer Science",
    company: "University of Hertfordshire",
    period: "Sept 2020 – July 2023",
    note: "Software engineering, UX design and web technologies.",
  },
];

export const stack = [
  {
    group: "Front end",
    // what I reach for first, at display size; the rest as small tags
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "JavaScript"],
    also: ["HTML", "CSS", "Sass", "Bootstrap", "jQuery", "Framer Motion"],
  },
  {
    group: "Back end and data",
    also: [] as string[],
    items: ["Node.js", "Express", "Prisma", "PostgreSQL", "Supabase", "MySQL", "MongoDB", "PHP", "Python"],
  },
  {
    group: "Tooling, delivery and design",
    also: [] as string[],
    items: ["Git", "GitHub", "GitLab CI/CD", "Vite", "Vercel", "Render", "Google Lighthouse", "Google Analytics", "CMS platforms", "Figma"],
  },
];

// Deskivo case study. Every engineering line here was checked against the
// Deskivo code and approved by Bilal (see PRODUCT.md). Do not add a
// double-booking claim until that bug is fixed and verified.
export const deskivoCase = {
  sections: [
    { id: "problem", label: "The problem", number: "01" },
    { id: "built", label: "What I built", number: "02" },
    { id: "holds-up", label: "How it holds up", number: "03" },
    { id: "result", label: "The result", number: "04" },
    { id: "technical", label: "Technical details", number: "05" },
  ],
  summary: "For hybrid teams who need a desk, and a seat near their team. Designed and built end to end.",
  spec: {
    role: "Design, interface, data model, authentication and deployment: built on my own, end to end.",
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Supabase", "NextAuth.js", "Tailwind CSS", "Vercel"],
    decisions: [
      "Admin access re-checked against the database on every request",
      "Desk positions stored as percentages, so markers stay aligned at any zoom",
    ],
  },
  problem: [
    "In a hybrid office, nobody knows who is coming in. People arrive and can’t find a free desk, or end up on the other side of the floor from their team.",
    "Admins had no simple way to say which desks exist, where they are, or who is using them.",
  ],
  built: [
    "A booking app built around the office itself. Users pick a date, see the floor as an interactive plan with free and booked desks marked, and reserve a desk in a few taps — for one day or a run of days. Desks booked by their own team are marked, so people can sit together.",
    "My Bookings lists upcoming and past bookings and lets people cancel. Admins manage offices, floors and desks from a dashboard: they upload a floor-plan image and click to place each desk on it.",
  ],
  holdsUp: [
    {
      title: "Admin access is checked against the database, every time",
      body: "Signing in issues a session token that lasts 30 days, and it carries the user’s role (USER or ADMIN). The admin API doesn’t trust that token’s copy of the role. On every admin request it reloads the user from the database and checks the role there, so an admin who is demoted loses access on their next request rather than when their token expires. Every admin endpoint goes through the same server-side check.",
    },
    {
      title: "Desk positions survive any screen size",
      body: "When an admin clicks to place a desk, its position is saved as a percentage of the floor-plan image’s width and height, not in pixels. The same plan then renders correctly on a phone, a laptop or zoomed in three times, without recalculating anything. Each desk marker is a real button with a label, so the plan works with a keyboard and a screen reader, not only a mouse.",
    },
  ],
  result:
    "A working, deployed app: users can find and book a desk on an interactive plan, and admins can set up offices, floors and desks themselves, without touching code.",
  technical: [
    {
      title: "Role check: database over token",
      decision: "Re-read the user’s role from PostgreSQL on every admin API call instead of trusting the JWT.",
      tradeoff: "One extra database query on every admin request. Worth it so that removing someone’s admin rights takes effect on their very next request.",
    },
    {
      title: "Desk coordinates: percentages, not pixels",
      decision: "Store each desk’s x and y as a percentage of the uploaded image, and render markers as absolutely positioned buttons.",
      tradeoff: "No canvas or SVG maths, and it scales for free — but positions assume the image keeps its proportions, so replacing a floor plan with a differently shaped image would misplace desks.",
    },
    {
      title: "The basics, done properly",
      decision: "Zod validation on booking and registration input, rate-limited sign-in and registration, security headers, and a daily keep-alive job so the free Supabase-hosted database never pauses.",
      tradeoff: "The rate limit lives in memory, so each server instance counts separately — fine at this scale, and the first thing to move to a shared store if traffic grew.",
    },
  ],
};

// Herts navigation case study. Facts come from PRODUCT.md (Bilal's own account
// of the restructure). The 40% is never attributed to one change. The
// Technical details wording is a draft until Bilal approves it.
export const hertsCase = {
  sections: [
    { id: "problem", label: "The problem", number: "01" },
    { id: "built", label: "What I built", number: "02" },
    { id: "holds-up", label: "How it holds up", number: "03" },
    { id: "result", label: "The result", number: "04" },
    { id: "technical", label: "Technical details", number: "05" },
  ],
  summary: "The main navigation for herts.ac.uk, used by every visitor to the University of Hertfordshire website.",
  spec: {
    role: "Front-end build and CMS integration: audited the existing sites, built the shared markup, styles, behaviour and accessibility, made it compatible with older templates, and set up CMS data sets so editors manage navigation content in one place — working with the university’s designers and stakeholders from brief to launch.",
    stack: ["University CMS", "HTML", "Bootstrap", "Sass", "JavaScript", "jQuery", "Google Lighthouse", "Google Analytics"],
    decisions: [
      "One shared navigation for every university site, adjusted per template in CSS only",
      "Navigation content managed in the CMS, in one place",
    ],
    result: "40% overall improvement in page load speed and performance, measured with Google Lighthouse",
  },
  problem: [
    "The university’s main navigation no longer matched a modern university website, and it was slowing pages down.",
    "It was also hard to use. People couldn’t easily get to what they wanted, and its labels didn’t make clear where links went. Every visitor relies on it — prospective students, current students and staff.",
  ],
  built: [
    "A full restructure, not a reskin. Six plain top-level sections — Study, Life, International, Research, For Business and About Us — plus search. Each opens a full-width menu of links grouped under clear headings, with a promo card, and the page behind dims so the menu stays the focus. On mobile, a full-screen menu drills into the same sections.",
    "Underneath, one shared HTML and JavaScript navigation now serves every university site. Before building it, I audited and tested the existing sites. Some still ran older templates, so I made the new navigation compatible with each of them through a per-template CSS adjustment only; the markup and behaviour are the same everywhere. I also set each older category site’s CMS header and layout to use the right navigation style.",
    "None of the navigation’s content is hard-coded. Link titles, URLs, labels and social links come from CMS data sets, layouts and metadata.",
  ],
  holdsUp: [
    {
      title: "It works without a mouse",
      body: "Every menu opens, moves and closes from the keyboard. Focus moves into a menu when it opens and returns to its trigger when it closes. Menus and toggles announce whether they’re expanded or collapsed, and the navigation was tested with screen readers.",
    },
    {
      title: "One build, every template",
      body: "Older templates get a per-template CSS adjustment only, so the navigation’s markup and behaviour stay identical across every university site. There is one version to maintain, not one per site.",
    },
    {
      title: "Editors stay in control",
      body: "Editors change navigation text and links in one place instead of updating many pages by hand, and they can switch on seasonal features such as an Open Days promo card without a developer.",
    },
  ],
  result:
    "A 40% overall improvement in page load speed and performance, measured with Google Lighthouse alongside this restructure. Beyond the speed: fewer support requests about finding pages, and clearer analytics on how visitors move through the site.",
  // DRAFT: awaiting Bilal's approval before the site is published.
  technical: [
    {
      title: "One navigation, many templates",
      decision: "Build one HTML and JavaScript navigation for every university site, and handle older templates with a per-template CSS adjustment only, rather than separate markup.",
      tradeoff: "A fix reaches every site at once, and so would a mistake. The existing sites were audited and tested before the build.",
    },
    {
      title: "Content in the CMS, not the code",
      decision: "Drive link titles, URLs, labels and social links from CMS data sets, layouts and metadata.",
      tradeoff: "The navigation depends on its CMS data sets, layouts and metadata being set up and kept correct. In return, editors manage it in one place and switch on seasonal features without a developer.",
    },
    {
      title: "Menus that work without a mouse",
      decision: "Keyboard control for every menu, focus that moves into an open menu and back to its trigger, and toggles that announce their expanded state.",
      tradeoff: "More behaviour to build and test than a simple hover menu, including testing with screen readers.",
    },
  ],
};
