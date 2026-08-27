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

export type Tint = "violet" | "mint" | "blush" | "rose" | "butter";

export type Featured = {
  slug: string;
  name: string;
  meta: string;
  title: string;
  description: string;
  tech: string[];
  tint: Tint;
  markColor: string;
  /** Real screenshot, or a spec panel when the work is confidential / has no shippable asset. */
  image?: string;
  spec?: { points: string[]; credit: string };
  cta: string;
};

export const FEATURED: Featured[] = [
  {
    slug: "tomorrowland",
    name: "Tomorrowland",
    meta: "Client · React Native + Expo · global consumer app",
    title: "One app for a festival the whole world watches",
    description:
      "Senior mobile engineer on the consolidated super app, merging Tomorrowland Radio, the per-festival apps and Tomorrowland Account into a single product. Server-driven UI over an OpenAPI NestJS backend-for-frontend, so content teams ship without waiting on an app release.",
    tech: ["React Native", "Expo", "Server-driven UI"],
    tint: "violet",
    markColor: "#5B2A8C",
    spec: {
      points: [
        "Three separate apps merged into one cross-platform product",
        "Prismic CMS objects mirrored into type-safe Zod schemas",
        "EAS preview, production and tagged-release pipelines",
      ],
      credit: "Delivered through In The Pocket",
    },
    cta: "read the write-up",
  },
  {
    slug: "euroconsumers",
    name: "Euroconsumers",
    meta: "Client · production LLM system · 100+ daily users",
    title: "An AI legal assistant that has to be right",
    description:
      "A multi-tenant assistant for a European consumer-rights organisation, live on public sites. A tool-calling agent over hybrid retrieval, with automated groundedness scoring, out-of-corpus guardrails, and human review on the answers that carry real risk.",
    tech: ["Mastra", "RAG", "LangSmith"],
    tint: "mint",
    markColor: "#2E6B48",
    spec: {
      points: [
        "A tool-calling agent replacing single-shot retrieval with multi-step reasoning",
        "PDF ingestion, chunking, hybrid sparse and dense embeddings",
        "Automated scorers for groundedness, plus full pipeline tracing",
      ],
      credit: "Delivered through Nimble, in a team of eight",
    },
    cta: "read the write-up",
  },
  {
    slug: "kaedim",
    name: "Kaedim",
    meta: "Client · Y Combinator-backed · WebGL",
    title: "Making AI 3D generation feel obvious",
    description:
      "An AI 3D copilot joining chat and canvas, plus a pipeline that pushes every generated asset through Blender over the Model Context Protocol and tests it automatically.",
    tech: ["Three.js", "WebGL", "Blender MCP"],
    tint: "blush",
    markColor: "#FF6B57",
    image: "/images/work/kaedim.png",
    cta: "read the write-up",
  },
  {
    slug: "beedee",
    name: "BeeDee",
    meta: "Client · frontend lead · 140,000 users",
    title: "A social platform 93% faster than I found it",
    description:
      "Led frontend on a consumer social platform: cut the slowest interactions from 15 seconds to under one, held real-time sockets steady at 10,000 daily actives, and shipped the iOS app.",
    tech: ["React Native", "Sockets", "Mollie"],
    tint: "rose",
    markColor: "#891E3C",
    image: "/images/work/beedee.png",
    cta: "read the write-up",
  },
  {
    slug: "lokaal-beslist",
    name: "Lokaal Beslist",
    meta: "Belgian government · 300+ municipalities · WCAG AAA",
    title: "Making government decisions readable by humans",
    description:
      "A citizen-facing transparency platform for the Flanders Agency of Home Affairs, opening up local municipal decisions and financial data. Pages loaded 89% faster, and automated compliance tooling cut manual government audit work by 70%.",
    tech: ["Leaflet", "D3.js", "Semantic web"],
    tint: "butter",
    markColor: "#5C41C2",
    image: "/images/work/lokaalbeslist.png",
    cta: "read the write-up",
  },
];

export const ALSO = [
  {
    name: "Transita",
    kind: "My product",
    description:
      "Solo-built and operated, 759 of 760 commits, with paying customers. Claude ranks a person's best global immigration pathways from a three-minute questionnaire.",
    href: "https://transita.app",
  },
  {
    name: "Outpost",
    kind: "Client",
    description:
      "A whole e-commerce platform rebuilt alone — 944 of 946 commits across storefront, REST API, database schema, Docker and deployment.",
  },
  {
    name: "Ornitho",
    kind: "My game",
    description:
      "A dinosaur horror game set in Antwerp. Actual Antwerp, actual dinosaurs. The reason everything above behaves the way it does.",
  },
  {
    name: "Faultline",
    kind: "My game",
    description:
      "Browser multiplayer on Three.js and Colyseus. Compound disasters, and dead players still get a vote on what happens next.",
  },
  {
    name: "Velso",
    kind: "My product",
    description:
      "An AI ops layer for solo freelancers: intake, scope briefs, contracts, invoicing and scope-creep detection, automated end to end.",
  },
  {
    name: "Korf",
    kind: "My product",
    description:
      "Belgian grocery price comparison, live on the App Store and Google Play, shipping to TestFlight on every push to main.",
    href: "https://korf.app",
  },
];

export const NUMBERS = [
  {
    value: "140,000",
    label: "people using the platform I lead frontend for",
    tint: "butter" as Tint,
  },
  {
    value: "15s → 1s",
    label: "what I did to their slowest screen, a 93% cut",
    tint: "mint" as Tint,
  },
  {
    value: "944 of 946",
    label: "commits on a whole e-commerce rebuild, alone",
    tint: "violet" as Tint,
  },
  {
    value: "6 years",
    label: "remote-first: agency, government, YC-backed",
    tint: "blush" as Tint,
  },
];

export const EXPERIENCE = [
  { role: "Founder & Principal Engineer", org: "Okapi Works", dates: "Apr 2020 – now" },
  { role: "Senior Mobile Engineer", org: "Tomorrowland, via In The Pocket", dates: "Jul 2026 – now" },
  { role: "Full-Stack Engineer", org: "Outpost", dates: "Jan 2026 – now" },
  { role: "Frontend Lead", org: "BeeDee", dates: "Jan 2025 – now" },
  { role: "AI Engineer", org: "Euroconsumers, via Nimble", dates: "Aug 2025 – Apr 2026" },
  { role: "Creative Engineer", org: "Kaedim, Y Combinator-backed", dates: "2025" },
  { role: "Full-Stack Developer", org: "Flanders Agency of Home Affairs", dates: "Jul 2022 – Jul 2024" },
  { role: "Earlier engagements", org: "WeHave, BubblyDoo, JStack (Cronos), Inuits", dates: "2021 – 2026" },
];

export const EDUCATION = {
  degree: "BSc Computer Science, Cum Laude",
  detail:
    "AP University of Applied Sciences, Antwerp · 2019–2022. Big data, distributed systems, cloud.",
};

export const LANGUAGES = ["Dutch — native", "English — C2", "French — professional"];

/** `ai: true` chips are tinted so the in-demand half reads first. */
export const SKILLS = [
  { label: "TypeScript" }, { label: "React" }, { label: "Next.js" },
  { label: "React Native" }, { label: "Expo" }, { label: "Node.js" },
  { label: "NestJS" }, { label: "Three.js" }, { label: "WebGL" },
  { label: "RAG", ai: true }, { label: "AI agents", ai: true },
  { label: "Tool calling", ai: true }, { label: "LLM evals", ai: true },
  { label: "Guardrails", ai: true }, { label: "MCP", ai: true },
  { label: "Vector search", ai: true },
  { label: "PostgreSQL" }, { label: "Drizzle" }, { label: "Prisma" },
  { label: "Docker" }, { label: "Playwright" }, { label: "Turborepo" },
  { label: "Python" }, { label: "Accessibility" }, { label: "Technical SEO" },
];

export const FUN_INTRO =
  "You can usually find me on a long walk with a coffee, cooking something ambitious on a weeknight, or losing a Rocket League match I had every right to win. Four cats and a dog run the household. One of them, Maria, has a single eye and full veto power over the radiator.";

export const FUN = [
  {
    title: "Four cats, one dog",
    body: "The long-term plan involves opening a cat cafe. This is not a joke, it is a roadmap item.",
    tint: "blush" as Tint,
  },
  {
    title: "Mountains, eventually",
    body: "I hike. Belgium is six metres above sea level and entirely flat. You can see the problem.",
    tint: "mint" as Tint,
  },
  {
    title: "Overwatch & HOI4",
    body: "Plus Rocket League and Rivals of Aether. Half research, half genuinely just playing games.",
    tint: "violet" as Tint,
  },
  {
    title: "Coffee, obviously",
    body: "Usually paired with a walk, and occasionally with a suspiciously ambitious dinner plan.",
    tint: "butter" as Tint,
  },
];
