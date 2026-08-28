// Single source of truth for everything the page renders.
// Every number here is taken from the 2026 resume. Do not invent figures.

export const PERSON = {
  name: "Senne Bels",
  jobTitle: "Senior Software Engineer",
  tagline:
    "Senior software engineer. I build things people poke at instead of scroll past, and I have been doing it remote-first for six years.",
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


/** Type line, in the Magic sense: what a thing is, then what kind. */
export type TypeLine = { kind: string; sub: string };

/** iOS system accent carried by a project. Faded at rest, full on hover. */
export type Accent = "red" | "blue" | "yellow" | "green";

export type Featured = {
  slug: string;
  name: string;
  typeLine: TypeLine;
  accent: Accent;
  /** Rebus glyphs woven into the card copy. */
  /** Phrases in the description that carry a rebus mark. */
  rebus: { phrase: string; icon: string; tint: "red" | "blue" | "yellow" }[];
  /** Client mark, shown at the top of the card the way a case study leads. */
  brand?: string;
  brandMono?: boolean;
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
  rebus: [{ phrase: "one app now", icon: "DeviceMobile", tint: "red" }, { phrase: "server-driven", icon: "Broadcast", tint: "blue" }, { phrase: "does not wait on an App Store review", icon: "Lightning", tint: "yellow" }],
    name: "Tomorrowland",
  brand: "/images/logos/tomorrowland.svg",
  brandMono: true,
    typeLine: { kind: "Client work", sub: "Mobile" },
  accent: "red",
    title: "One app for a festival the whole world watches",
    description:
      "Tomorrowland ran four apps. Radio, one per festival, and Account, each with its own release cycle. They are one app now. The UI is server-driven, so a lineup change on the day of the festival does not wait on an App Store review.",
    tech: ["React Native", "Expo", "Server-driven UI"],
    spec: {
      points: [
        "Three separate apps merged into one cross-platform product",
        "Prismic CMS objects mirrored into type-safe Zod schemas",
        "EAS preview, production and tagged-release pipelines",
      ],
      credit: "Freelance, engaged directly",
    },
    cta: "read the write-up",
    facts: [
      { label: "Role", value: "Senior Mobile Engineer" },
      { label: "Through", value: "Direct, freelance" },
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
  rebus: [{ phrase: "retrieval tools over Qdrant", icon: "Database", tint: "red" }, { phrase: "scores its own groundedness", icon: "ShieldCheck", tint: "blue" }, { phrase: "Azure environments", icon: "Cloud", tint: "yellow" }],
    name: "Euroconsumers",
  brand: "/images/logos/euroconsumers.svg",
    typeLine: { kind: "Client work", sub: "AI systems" },
  accent: "blue",
    title: "An AI legal assistant that has to be right",
    description:
      "A wrong answer about your rights is worse than no answer. The agent calls retrieval tools over Qdrant instead of guessing, scores its own groundedness, and hands anything risky to a person. I built the Azure environments under it and kept it running after launch, with their teams in Portugal, France and Italy.",
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
      "Euroconsumers wanted a legal assistant its members could actually rely on, first for Altroconsumo in Italy and then across the group. A wrong answer about somebody's consumer rights is worse than no answer, so the whole build was arranged around not being confidently wrong.",
      "The agent calls dedicated retrieval tools over legal documents, articles and product data rather than doing a single-shot lookup, with hybrid sparse and dense retrieval out of Qdrant so an answer can cite the article it came from. Automated scorers measure groundedness, out-of-corpus guardrails catch questions the corpus cannot answer, and anything high-risk goes to a human. LangSmith traces the full pipeline so a regression can be found rather than guessed at.",
      "A large part of the work was not the model at all. I set up and ran their development, staging and production environments on Azure, then maintained the system after launch, working with their teams across Portugal, France and Italy.",
    ],
    outcomes: [
      { value: "100+", label: "daily active users on public sites" },
      { value: "Multi-tenant", label: "one system, several consumer organisations" },
    ],
  },
  {
    slug: "kaedim",
  rebus: [{ phrase: "Blender over MCP", icon: "Cube", tint: "red" }, { phrase: "tested before a designer sees them", icon: "Robot", tint: "blue" }, { phrase: "Figma Dev MCP", icon: "Flask", tint: "yellow" }],
    name: "Kaedim",
  brand: "/images/logos/kaedim.png",
  brandMono: true,
    typeLine: { kind: "Startup", sub: "3D and AI" },
  accent: "yellow",
    title: "Tooling for a 3D team that ships every day",
    description:
      "Kaedim already had a product. I made it better. Generated assets go through Blender over MCP and get tested before a designer sees them, and the design-to-development handoff runs on Figma Dev MCP. Team across San Francisco, London and Singapore, working with the CEO.",
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
      "Kaedim already had a product and customers when I arrived. The job was not to build it, it was to make it better and to give the 3D design team tooling they did not have.",
      "That meant experimental workflows for the designers, automations over the Model Context Protocol that pushed generated assets through Blender, and an AI-driven testing pipeline so a bad asset was caught before a human saw it. I automated the design-to-development handoff with Figma Dev MCP and wrote the walkthrough that got the rest of engineering onto it.",
      "The team was spread across San Francisco, London and Singapore, and I worked directly with the CEO. Coordinating a change often meant touching five or more repositories across frontend, backend and test infrastructure.",
    ],
    outcomes: [
      { value: "Thousands", label: "of users on the platform" },
      { value: "5+ repos", label: "coordinated across frontend, backend and test infra" },
    ],
    live: { label: "kaedim3d.com", href: "https://www.kaedim3d.com/" },
  },
  {
    slug: "beedee",
  rebus: [{ phrase: "made it properly native", icon: "DeviceMobile", tint: "red" }, { phrase: "travel mode, localisation", icon: "Translate", tint: "blue" }, { phrase: "organic search", icon: "TrendUp", tint: "yellow" }],
    name: "BeeDee",
  brand: "/images/logos/beedee.png",
    typeLine: { kind: "Client work", sub: "Frontend lead" },
  accent: "red",
    title: "Four years of a consumer app, owned end to end",
    description:
      "BeeDee looked unfinished when I got there, and an app that looks unfinished does not get a second session. I rebuilt the interface, made it properly native, then kept going: travel mode, localisation, GitHub Actions instead of manual releases, AI in the internal workflows. It cannot buy ads on Meta, Google or Reddit, so organic search had to carry it. Four years, reporting to the CEO, with the team in India.",
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
      "I did not join BeeDee to make it faster. I joined because the app looked and felt unfinished, and a consumer product that feels unfinished does not get a second session. The first year was visual and interaction work: rebuilding the interface, making the React Native app feel native rather than wrapped, and getting the slowest interactions under a second.",
      "After that it became ownership. Travel mode, localisation, and a run of features that gave people a reason to come back. GitHub Actions replaced manual releases. I made the architectural and infrastructure calls, put AI into the internal workflows, and did the technical SEO that took organic acquisition from nothing to an 18% click-through against a 2 to 5% benchmark, on a platform barred from paid advertising on Meta, Google and Reddit.",
      "Four years of it, working directly with the CEO and with the engineering team in India, growing the thing steadily rather than rescuing it once.",
    ],
    outcomes: [
      { value: "36,000", label: "monthly active users at peak, from a far smaller base" },
      { value: "18%", label: "organic click-through, against a 2 to 5% benchmark" },
      { value: "4 years", label: "owning frontend, infrastructure and release" },
    ],
  },
  {
    slug: "lokaal-beslist",
  rebus: [{ phrase: "hundreds of municipalities", icon: "Buildings", tint: "red" }, { phrase: "89% faster", icon: "Lightning", tint: "blue" }, { phrase: "manual audit work", icon: "ShieldCheck", tint: "yellow" }],
    name: "Lokaal Beslist",
  brand: "/images/logos/vlaanderen.png",
    typeLine: { kind: "Government", sub: "Civic platform" },
  accent: "blue",
    title: "Making government decisions readable by humans",
    description:
      "Every decision a Belgian municipality makes is already public. None of it was readable. This puts hundreds of municipalities in one place, loads pages 89% faster than before, and the compliance tooling took 70% of the manual audit work off people.",
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
    tint: "red" as const,
    image: "/images/work/transita.webp",
    kind: "Live, paying customers",
    description:
      "Answer nine questions and Claude ranks the immigration routes actually open to you. I built it, I run it, and people pay for it.",
    href: "https://transita.app",
  },
  {
    name: "Keepr",
    tint: "blue" as const,
    image: "/images/work/keepr.webp",
    kind: "Live",
    description:
      "A Belgian landlord signs a new tenant and the paperwork eats the week. Keepr writes the plaatsbeschrijving from photos and runs the rest of the lease from one place.",
    href: "https://joinkeepr.com",
  },
  {
    name: "Korf",
    tint: "yellow" as const,
    image: "/images/work/korf-live.webp",
    kind: "App Store and Play Store",
    description:
      "Scan a receipt, find out where the same basket costs less. Live on both stores, and every push to main goes out to TestFlight and the Play Store.",
    href: "https://korf.app",
  },
  {
    name: "Faultline",
    tint: "red" as const,
    image: "/images/work/faultline.webp",
    kind: "In progress",
    description:
      "An earthquake cracks the dam, the dam breaks, the island floods. Twelve players, one seed disaster, and the cascade decides who survives. Dead players still get a vote.",
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
  { role: "Senior Mobile Engineer", org: "Tomorrowland", logoMono: true, href: "https://www.tomorrowland.com", logo: "/images/logos/tomorrowland.svg", tint: "red", dates: "Jul 2026 to now" },
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
    tint: "red" as const,
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
    tint: "blue" as const,
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
    tint: "yellow" as const,
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
    tint: "red" as const,
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
  "Most of what I do away from a keyboard ends up feeding what I do at one.",
];

/** Real numbers, straight out of the Letterboxd export. */
export const FILM_STATS = [
  { value: "198", label: "films rated since August 2023" },
  { value: "31", label: "of them got five stars" },
  { value: "49", label: "still sitting on the watchlist" },
];




/** Rebus marks for the About lede. */
export const ABOUT_REBUS = [
  { phrase: "six years of remote-first experience", icon: "Clock", tint: "red" as const },
  { phrase: "web, mobile and AI systems", icon: "Terminal", tint: "blue" as const },
  { phrase: "140,000 users", icon: "UsersThree", tint: "yellow" as const },
];

/** Rebus marks for the Fun paragraphs. Keyed by the line they belong to. */
export const FUN_REBUS = [
  { phrase: "Four cats and a dog", icon: "Cat", tint: "red" as const },
  { phrase: "long walk with a coffee", icon: "Coffee", tint: "blue" as const },
  { phrase: "Marvel Rivals", icon: "GameController", tint: "yellow" as const },
  { phrase: "Wingspan", icon: "Bird", tint: "red" as const },
  { phrase: "I play most days", icon: "Guitar", tint: "blue" as const },
  { phrase: "closer to a greenhouse", icon: "Plant", tint: "yellow" as const },
  { phrase: "flat and six metres above sea level", icon: "Ruler", tint: "red" as const },
  { phrase: "Fury Road", icon: "FilmSlate", tint: "blue" as const },
];

/** Longer-form personality, for /fun. Each has room to be an actual story. */
export const FUN = [
  {
    title: "Four cats and a dog",
    body: "Maria has one eye and full veto power over the radiator, which is how the heating bill gets decided here. The long-term plan is a cat cafe. That is a roadmap item, not a joke.",
  },
  {
    title: "198 films and a generous hand",
    body: "Four films in that list ever got half a star. Most land on four or four and a half, because I would rather enjoy a thing than be right about it. Fury Road, The Truman Show and WALL-E are the ones I keep going back to. My Letterboxd bio says literally ryan gosling and I stand by it.",
  },
  {
    title: "Electric guitar, badly, loudly",
    body: "I play most days. Nobody has asked me to play in front of them twice, which I choose to read as a compliment to the volume.",
  },
  {
    title: "Plants, and getting outside",
    body: "The flat is closer to a greenhouse than a flat at this point. Belgium is flat and six metres above sea level, so the hiking happens somewhere else. That is a large part of why the plan points west and upward.",
  },
  {
    title: "Marvel Rivals, HOI4, Wingspan",
    body: "Marvel Rivals and Rocket League when I want to lose a match I had every right to win. Hearts of Iron when I want to lose four hours instead. Wingspan is the one everyone gets talked into and nobody regrets.",
  },
  {
    title: "Coffee, and cooking past my level",
    body: "A long walk with a coffee, or a Tuesday dinner more ambitious than a Tuesday can support. Both are how I get unstuck.",
  },
] as const;
