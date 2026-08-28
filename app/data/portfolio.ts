// Single source of truth for everything the page renders.
// Every number here is taken from the 2026 resume — do not invent figures.

export const PERSON = {
  name: "Senne Bels",
  jobTitle: "Senior Software Engineer",
  tagline:
    "I'm a senior software engineer, a game developer on the side, and full-time staff to four cats. I build the kind of websites that people poke at instead of scroll past.",
  email: "sennebels@gmail.com",
  locality: "Antwerp",
  country: "BE",
  github: "https://github.com/snenenenenenene",
  linkedin: "https://linkedin.com/in/sennebels",
  resume: "/assets/CV Senne Bels.pdf",
  relocation: "Open to relocation",
  // The one self-contained passage an answer engine can lift verbatim.
  answerBlock:
    "Senne Bels is a senior software engineer based in Antwerp, Belgium, with six years of remote-first experience building web, mobile and AI systems in TypeScript. He leads frontend for a consumer platform serving 140,000 users, has delivered production LLM systems with retrieval, evaluation and guardrails, and has shipped work for Tomorrowland, the Y Combinator-backed startup Kaedim, and the Flanders Agency of Home Affairs.",
} as const;


/**
 * Colour identity. The palette is Golgari: green for growth, black for
 * pragmatism. It is one scheme, locked, and every value lives in globals.css
 * as a CSS variable so both appearances stay in step. Nothing here is a hex.
 */
export const IDENTITY = {
  guild: "Golgari",
  pips: [
    { key: "B", name: "Black", gloss: "ship the pragmatic thing" },
    { key: "G", name: "Green", gloss: "then grow it" },
  ],
  line: "Black for pragmatism, green for growth. Ship the useful version, then grow it.",
} as const;

/** Type line, in the Magic sense: what a thing is, then what kind. */
export type TypeLine = { kind: string; sub: string };

/** iOS system accent carried by a project. Faded at rest, full on hover. */
export type Accent = "red" | "blue" | "yellow" | "green";

export type Featured = {
  slug: string;
  name: string;
  typeLine: TypeLine;
  accent: Accent;
  /** Client mark, shown at the top of the card the way a case study leads. */
  brand?: string;
  brandMono?: boolean;
  /** Flavour text. Personality belongs on the work, not in a box at the end. */
  flavour: string;
  title: string;
  description: string;
  tech: string[];
  /** Real screenshot, or a spec panel when the work is confidential / has no shippable asset. */
  image?: string;
  spec?: { points: string[]; credit: string };
  cta: string;
  /** Everything below powers /work/[slug] only. */
  facts: { label: string; value: string }[];
  /** Two or three paragraphs. No headings inside; the page supplies structure. */
  story: string[];
  outcomes: { value: string; label: string }[];
  live?: { label: string; href: string };
};

export const FEATURED: Featured[] = [
  {
    slug: "tomorrowland",
    name: "Tomorrowland",
  brand: "/images/logos/tomorrowland.svg",
  brandMono: true,
    typeLine: { kind: "Client work", sub: "Mobile" },
  accent: "blue",
  flavour: "Four apps walked in. One walked out, and it did not lose anything on the way.",
    title: "One app for a festival the whole world watches",
    description:
      "Senior mobile engineer on the consolidated super app, merging Tomorrowland Radio, the per-festival apps and Tomorrowland Account into a single product. Server-driven UI over an OpenAPI NestJS backend-for-frontend, so content teams ship without waiting on an app release.",
    tech: ["React Native", "Expo", "Server-driven UI"],
    spec: {
      points: [
        "Three separate apps merged into one cross-platform product",
        "Prismic CMS objects mirrored into type-safe Zod schemas",
        "EAS preview, production and tagged-release pipelines",
      ],
      credit: "Delivered through In The Pocket",
    },
    cta: "read the write-up",
    facts: [
      { label: "Role", value: "Senior Mobile Engineer" },
      { label: "Through", value: "In The Pocket" },
      { label: "Timeline", value: "Jul 2026 to now" },
      { label: "Team", value: "Product owner, tech lead, mobile engineers" },
    ],
    story: [
      "Tomorrowland ran several apps at once: Tomorrowland Radio, an app per festival, and Tomorrowland Account. Each had its own release cycle, its own content pipeline, and its own idea of what a user was. The brief was to fold all of it into one cross-platform product without losing what made each one useful.",
      "The interesting constraint was editorial. A festival lineup changes on the day. If every content change needs an App Store review, the app is already wrong. So the UI is server-driven: an OpenAPI-specified NestJS backend-for-frontend describes what to render, and the app renders it. Prismic content objects are mirrored into Zod schemas, so a shape change in the CMS becomes a type error at build time rather than a crash in someone's pocket at a festival.",
      "Delivery ran inside an agency team with CODEOWNERS-based review and EAS pipelines for preview, production and tagged releases.",
    ],
    outcomes: [
      { value: "3 apps", label: "folded into one product" },
      { value: "0 releases", label: "needed to ship a content change" },
    ],
  },
  {
    slug: "euroconsumers",
    name: "Euroconsumers",
  brand: "/images/logos/euroconsumers.svg",
    typeLine: { kind: "Client work", sub: "AI systems" },
  accent: "blue",
  flavour: "A confident wrong answer about your rights is worse than no answer at all.",
    title: "An AI legal assistant that has to be right",
    description:
      "A multi-tenant assistant for a European consumer-rights organisation, live on public sites. A tool-calling agent over hybrid retrieval, with automated groundedness scoring, out-of-corpus guardrails, and human review on the answers that carry real risk.",
    tech: ["Mastra", "RAG", "LangSmith"],
    spec: {
      points: [
        "A tool-calling agent replacing single-shot retrieval with multi-step reasoning",
        "PDF ingestion, chunking, hybrid sparse and dense embeddings",
        "Automated scorers for groundedness, plus full pipeline tracing",
      ],
      credit: "Delivered through Nimble, in a team of eight",
    },
    cta: "read the write-up",
    facts: [
      { label: "Role", value: "AI Engineer" },
      { label: "Through", value: "Nimble" },
      { label: "Timeline", value: "Aug 2025 to Apr 2026" },
      { label: "Team", value: "Eight engineers, two organisations" },
    ],
    story: [
      "A European consumer-rights organisation wanted an assistant that could answer legal questions on its public sites. The hard part is not the chat interface. It is that a wrong answer about someone's rights is worse than no answer at all.",
      "The first version used single-shot retrieval, which is fine for lookup and useless for reasoning across documents. I replaced it with a tool-calling agent in Mastra, given dedicated retrieval tools over legal documents, articles and product data, so it can take several steps toward an answer instead of guessing in one.",
      "Around that sits the part that makes it shippable: an ingestion pipeline that parses and chunks PDFs into hybrid sparse and dense embeddings, automated scorers that measure whether an answer is actually grounded in the corpus, guardrails that refuse questions outside it, human review on high-risk answers, and LangSmith tracing across the whole retrieval and generation path so a regression can be debugged rather than argued about.",
    ],
    outcomes: [
      { value: "100+", label: "daily active users on public sites" },
      { value: "Multi-tenant", label: "one system, several consumer organisations" },
    ],
  },
  {
    slug: "kaedim",
    name: "Kaedim",
  brand: "/images/logos/kaedim.png",
  brandMono: true,
    typeLine: { kind: "Startup", sub: "3D and AI" },
  accent: "red",
  flavour: "The model was the easy part. Making artists trust it was the work.",
    title: "Making AI 3D generation feel obvious",
    description:
      "An AI 3D copilot joining chat and canvas, plus a pipeline that pushes every generated asset through Blender over the Model Context Protocol and tests it automatically.",
    tech: ["Three.js", "WebGL", "Blender MCP"],
    image: "/images/work/kaedim.webp",
    cta: "read the write-up",
    facts: [
      { label: "Role", value: "Creative Engineer" },
      { label: "Company", value: "Kaedim, Y Combinator-backed" },
      { label: "Timeline", value: "2025" },
      { label: "Scope", value: "Five or more repositories" },
    ],
    story: [
      "Kaedim turns concept art into production 3D assets. The generation was strong; the way people worked with it was not. Getting from an idea to a usable model meant leaving the product, and there was no reliable way to know whether a generated asset was actually good before a customer saw it.",
      "I built an AI 3D copilot that puts an LLM chat next to a drag-and-drop canvas, so describing what you want and manipulating it happen in the same place, over interactive WebGL.",
      "Then the unglamorous half: an end-to-end pipeline covering idea capture, generation in Blender over the Model Context Protocol, an internal review queue for designers, and customer-facing progress tracking. Large assets move through AWS S3. I also automated the design-to-development handoff with Figma Dev MCP and recorded the walkthrough that onboarded the rest of the team onto it.",
    ],
    outcomes: [
      { value: "Thousands", label: "of users on the platform" },
      { value: "5+ repos", label: "coordinated across frontend, backend and test infra" },
    ],
    live: { label: "kaedim3d.com", href: "https://www.kaedim3d.com/" },
  },
  {
    slug: "beedee",
    name: "BeeDee",
  brand: "/images/logos/beedee.png",
    typeLine: { kind: "Client work", sub: "Frontend lead" },
  accent: "yellow",
  flavour: "Nobody filed a bug about the fifteen seconds. They just stopped coming back.",
    title: "A social platform 93% faster than I found it",
    description:
      "Led frontend on a consumer social platform: cut the slowest interactions from 15 seconds to under one, held real-time sockets steady at 10,000 daily actives, and shipped the iOS app.",
    tech: ["React Native", "Sockets", "Mollie"],
    image: "/images/work/beedee.webp",
    cta: "read the write-up",
    facts: [
      { label: "Role", value: "Frontend Lead" },
      { label: "Timeline", value: "Jan 2025 to now" },
      { label: "Team", value: "One engineer plus rotating interns" },
      { label: "Ownership", value: "Frontend, end to end" },
    ],
    story: [
      "BeeDee is a consumer social platform with 140,000 users. When I picked up frontend, the most-used interaction in the product took more than fifteen seconds. People were not complaining about it. They were leaving.",
      "Getting it under one second was React rendering work and a caching strategy, not a rewrite. Real-time sockets were the next failure: connections dropped under load, so reconnect logic and connection pooling had to hold at 10,000 daily actives. Discovery had degraded separately, and came back through query caching and database index work.",
      "The other constraint was that the platform is barred from paid advertising on Meta, Google and Reddit. Growth had to be organic, which made technical SEO a revenue channel rather than a checkbox: an 18% click-through rate against a 2 to 5% industry benchmark, and first-position ranking on target terms. I also shipped the iOS app in React Native and integrated multi-currency payments through Mollie.",
    ],
    outcomes: [
      { value: "93%", label: "faster on the critical interaction, 15s to under 1s" },
      { value: "18%", label: "organic click-through, against a 2 to 5% benchmark" },
      { value: "32%", label: "revenue growth from initiatives I contributed to" },
    ],
  },
  {
    slug: "lokaal-beslist",
    name: "Lokaal Beslist",
  brand: "/images/logos/vlaanderen.png",
    typeLine: { kind: "Government", sub: "Civic platform" },
  accent: "green",
  flavour: "Every decision was already public. None of it was readable.",
    title: "Making government decisions readable by humans",
    description:
      "A citizen-facing transparency platform for the Flanders Agency of Home Affairs, opening up local municipal decisions and financial data. Pages loaded 89% faster, and automated compliance tooling cut manual government audit work by 70%.",
    tech: ["Leaflet", "D3.js", "Semantic web"],
    image: "/images/work/lokaalbeslist.webp",
    cta: "read the write-up",
    facts: [
      { label: "Role", value: "Full-Stack Developer" },
      { label: "Client", value: "Flanders Agency of Home Affairs" },
      { label: "Timeline", value: "Jul 2022 to Jul 2024" },
      { label: "Reach", value: "300+ Belgian municipalities" },
    ],
    story: [
      "Every Belgian municipality publishes its decisions and its finances. Legally, that is transparency. Practically, it was hundreds of separate publication streams in formats nobody outside a civil service reads, which means the information was public and unavailable at the same time.",
      "The platform pulls that together for citizens: local decisions and financial data across hundreds of municipalities, with interactive geospatial visualisation on Leaflet and OpenStreetMap so you can start from where you live rather than from a document ID. A microservice architecture and semantic web standards keep the data interoperable instead of trapped in one portal.",
      "Alongside it, automated compliance monitoring cut the manual audit work by 70% while keeping regulatory adherence intact. Accessibility was a requirement rather than a pass at the end: WCAG AAA.",
    ],
    outcomes: [
      { value: "89%", label: "reduction in page load times" },
      { value: "70%", label: "less manual government audit work" },
      { value: "WCAG AAA", label: "accessibility conformance" },
    ],
    live: { label: "lokaalbeslist.vlaanderen.be", href: "https://lokaalbeslist.vlaanderen.be/" },
  },
];

export const ALSO = [
  {
    name: "Transita",
    image: "/images/work/transita.webp",
    kind: "Live, paying customers",
    description:
      "Built and run entirely by me, end to end. Claude ranks a person's best global immigration pathways from a three-minute questionnaire, and people pay for the result.",
    href: "https://transita.app",
  },
  {
    name: "Korf",
    image: "/images/work/korf-live.webp",
    kind: "App Store and Play Store",
    description:
      "Belgian grocery price comparison, live on both stores. Next.js and Capacitor, with CI releasing to TestFlight and the Play Store internal track on every push to main.",
    href: "https://korf.app",
  },
  {
    name: "Faultline",
    image: "/images/work/faultline.webp",
    kind: "In progress",
    description:
      "Browser multiplayer on Three.js and Colyseus. Compound disasters, and dead players still get a vote on what happens next.",
  },
];


export const NUMBERS = [
  {
    value: "140,000",
    label: "people using the platform I lead frontend for",
  },
  {
    value: "15s → 1s",
    label: "what I did to their slowest screen, a 93% cut",
  },
  {
    value: "89%",
    label: "faster page loads on a national government platform",
  },
  {
    value: "6 years",
    label: "remote-first: agency, government, YC-backed",
  },
];

export const EXPERIENCE: {
  role: string;
  org: string;
  dates: string;
  slug?: string;
  logo?: string;
  /** Marks supplied in a single near-black colourway need inverting in dark. */
  logoMono?: boolean;
  href?: string;
  tint?: "red" | "blue" | "yellow" | "green";
}[] = [
  { role: "Founder & Principal Engineer", org: "Okapi Works", tint: "green", dates: "Apr 2020 to now" },
  { role: "Senior Mobile Engineer", org: "Tomorrowland, via In The Pocket", logoMono: true, href: "https://www.tomorrowland.com", logo: "/images/logos/tomorrowland.svg", tint: "red", dates: "Jul 2026 to now" },
  { role: "Full-Stack Engineer", org: "Outpost", tint: "blue", dates: "Jan 2026 to now" },
  { role: "Frontend Lead", org: "BeeDee", href: "https://www.beedee.com", logo: "/images/logos/beedee.png", tint: "red", dates: "Jan 2025 to now" },
  { role: "AI Engineer", org: "Euroconsumers, via Nimble", href: "https://www.euroconsumers.org", logo: "/images/logos/euroconsumers.svg", tint: "blue", dates: "Aug 2025 to Apr 2026" },
  { role: "Creative Engineer", org: "Kaedim, Y Combinator-backed", logoMono: true, href: "https://www.kaedim3d.com", logo: "/images/logos/kaedim.png", tint: "yellow", dates: "2025" },
  { role: "Full-Stack Developer", org: "Flanders Agency of Home Affairs", href: "https://www.vlaanderen.be", logo: "/images/logos/vlaanderen.png", tint: "yellow", dates: "Jul 2022 to Jul 2024" },
  { role: "Earlier engagements", org: "WeHave, BubblyDoo, JStack (Cronos), Inuits", logoMono: true, href: "https://cronos-groep.be", logo: "/images/logos/cronos.png", tint: "green", dates: "2021 to 2026" },
];

export const EDUCATION = {
  degree: "BSc Computer Science, Cum Laude",
  detail:
    "AP University of Applied Sciences, Antwerp · 2019 to 2022. Big data, distributed systems, cloud.",
};

export const LANGUAGES = [
  { code: "nl" as const, label: "Dutch", level: "native" },
  { code: "gb" as const, label: "English", level: "C2" },
  { code: "fr" as const, label: "French", level: "professional" },
];

/** `ai: true` chips are tinted so the in-demand half reads first. */
export const SKILL_GROUPS = [
  {
    label: "Languages",
    tint: "blue" as const,
    items: [
      { name: "TypeScript", slug: "typescript" },
      { name: "JavaScript", slug: "javascript" },
      { name: "Python", slug: "python" },
      { name: "Java", slug: "openjdk" },
      { name: "C#", slug: "csharp" },
      { name: "SQL", slug: "postgresql" },
    ],
  },
  {
    label: "Frontend",
    tint: "red" as const,
    items: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "React Native", slug: "react" },
      { name: "Expo", slug: "expo" },
      { name: "Tailwind", slug: "tailwindcss" },
      { name: "Three.js", slug: "threedotjs" },
    ],
  },
  {
    label: "Backend",
    tint: "green" as const,
    items: [
      { name: "Node", slug: "nodedotjs" },
      { name: "NestJS", slug: "nestjs" },
      { name: "Postgres", slug: "postgresql" },
      { name: "Prisma", slug: "prisma" },
      { name: "GraphQL", slug: "graphql" },
      { name: "Redis", slug: "redis" },
    ],
  },
  {
    label: "AI",
    tint: "yellow" as const,
    items: [
      { name: "OpenAI", slug: "openai" },
      { name: "Anthropic", slug: "anthropic" },
      { name: "LangChain", slug: "langchain" },
      { name: "Hugging Face", slug: "huggingface" },
      { name: "Ollama", slug: "ollama" },
      { name: "Pinecone", slug: "pinecone" },
    ],
  },
  {
    label: "Platform",
    tint: "blue" as const,
    items: [
      { name: "AWS", slug: "amazonwebservices" },
      { name: "Vercel", slug: "vercel" },
      { name: "Docker", slug: "docker" },
      { name: "Turborepo", slug: "turborepo" },
      { name: "Playwright", slug: "playwright" },
      { name: "GitHub Actions", slug: "githubactions" },
    ],
  },
] as const;


/** Intro paragraphs for /fun. */
export const ASIDE = [
  "Four cats and a dog run this household. Maria has one eye and full veto power over the radiator, which is how the heating bill gets decided.",
  "Otherwise: long walks with a coffee, dinners more ambitious than the weeknight deserves, and Rocket League matches I had every right to win.",
  "Belgium is flat and six metres above sea level, so the hiking happens elsewhere. That is part of why the plan points at mountains.",
];



/** Longer-form personality, for /fun. Each has room to be an actual story. */
export const FUN = [
  {
    title: "Four cats and a dog",
    body: "Maria has one eye and full veto power over the radiator, which is how the heating bill gets decided in this house. The long-term plan involves opening a cat cafe. That is not a joke, it is a roadmap item.",
  },
  {
    title: "Mountains, eventually",
    body: "I hike. Belgium is flat and six metres above sea level, so the hiking happens elsewhere, which is a large part of why the plan points west and upward.",
  },
  {
    title: "Games, played and built",
    body: "Overwatch, Hearts of Iron, Rocket League, Rivals of Aether. Half of it is research for Faultline and Ornitho. The other half is losing matches I had every right to win.",
  },
  {
    title: "Coffee, and cooking past my level",
    body: "Long walks with a coffee, and weeknight dinners more ambitious than a Tuesday can support. Both of these are how I think through a problem I am stuck on.",
  },
] as const;
