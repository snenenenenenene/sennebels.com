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
  rebus: [{ phrase: "consolidated super app", icon: "DeviceMobile", tint: "red" }, { phrase: "Server-driven UI", icon: "Broadcast", tint: "blue" }, { phrase: "without waiting on an app release", icon: "Lightning", tint: "yellow" }],
    name: "Tomorrowland",
  brand: "/images/logos/tomorrowland.svg",
  brandMono: true,
    typeLine: { kind: "Client work", sub: "Mobile" },
  accent: "red",
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
  rebus: [{ phrase: "tool-calling agent", icon: "Robot", tint: "red" }, { phrase: "Qdrant", icon: "Database", tint: "blue" }, { phrase: "Azure environments", icon: "Cloud", tint: "yellow" }],
    name: "Euroconsumers",
  brand: "/images/logos/euroconsumers.svg",
    typeLine: { kind: "Client work", sub: "AI systems" },
  accent: "blue",
    title: "An AI legal assistant that has to be right",
    description:
      "A legal assistant for Altroconsumo and its sister organisations, built on a tool-calling agent over Qdrant with groundedness scoring and guardrails. I also built and ran the Azure environments behind it, and maintained the thing after launch. Working with their teams in Portugal, France and Italy.",
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
  rebus: [{ phrase: "Experimental workflows", icon: "Flask", tint: "red" }, { phrase: "MCP automations", icon: "Cube", tint: "blue" }, { phrase: "AI-driven testing", icon: "Robot", tint: "yellow" }],
    name: "Kaedim",
  brand: "/images/logos/kaedim.png",
  brandMono: true,
    typeLine: { kind: "Startup", sub: "3D and AI" },
  accent: "yellow",
    title: "Tooling for a 3D team that ships every day",
    description:
      "Joined an established product to make it better rather than to build it. Experimental workflows for the 3D design team, MCP automations, and AI-driven testing for generated assets. Working across San Francisco, London and Singapore, and directly with the CEO.",
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
  rebus: [{ phrase: "36,000 monthly actives", icon: "TrendUp", tint: "red" }, { phrase: "made it native", icon: "DeviceMobile", tint: "blue" }, { phrase: "travel mode and localisation", icon: "Translate", tint: "yellow" }],
    name: "BeeDee",
  brand: "/images/logos/beedee.png",
    typeLine: { kind: "Client work", sub: "Frontend lead" },
  accent: "red",
    title: "Four years of a consumer app, owned end to end",
    description:
      "Took a consumer social app from a rough visual state to 36,000 monthly actives. Rebuilt the interface, made it native, shipped travel mode and localisation, moved the infrastructure onto GitHub Actions, and put AI into the internal workflows. Reporting to the CEO, with a team in India.",
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
  rebus: [{ phrase: "local municipal decisions", icon: "Buildings", tint: "red" }, { phrase: "89% faster", icon: "Lightning", tint: "blue" }, { phrase: "manual government audit work", icon: "ShieldCheck", tint: "yellow" }],
    name: "Lokaal Beslist",
  brand: "/images/logos/vlaanderen.png",
    typeLine: { kind: "Government", sub: "Civic platform" },
  accent: "blue",
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
    tint: "red" as const,
    image: "/images/work/transita.webp",
    kind: "Live, paying customers",
    description:
      "Built and run entirely by me, end to end. Claude ranks a person's best global immigration pathways from a three-minute questionnaire, and people pay for the result.",
    href: "https://transita.app",
  },
  {
    name: "Korf",
    tint: "blue" as const,
    image: "/images/work/korf-live.webp",
    kind: "App Store and Play Store",
    description:
      "Belgian grocery price comparison, live on both stores. Next.js and Capacitor, with CI releasing to TestFlight and the Play Store internal track on every push to main.",
    href: "https://korf.app",
  },
  {
    name: "Faultline",
    tint: "yellow" as const,
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
