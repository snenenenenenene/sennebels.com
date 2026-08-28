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
  rebus: [{ phrase: "live radio", icon: "Broadcast", tint: "red" }, { phrase: "bad network", icon: "WifiSlash", tint: "blue" }, { phrase: "CMS-driven containers", icon: "Stack", tint: "yellow" }],
    name: "Tomorrowland",
  brand: "/images/logos/tomorrowland.svg",
  brandMono: true,
    typeLine: { kind: "Client work", sub: "Mobile" },
  accent: "red",
    title: "One app for a festival the whole world watches",
    description:
      "I joined the consolidated super app in July 2026. Most of my work since has been making live radio survive a bad network on Android, plus CMS-driven containers on the festival tab so content ships without an app release.",
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
      "Tomorrowland folded Radio, the per-festival apps and Account into one cross-platform product. I joined that app in July 2026, and most of what I have done since is make the live radio survive a bad network.",
      "Android was the problem. The stream would stall inside the buffer and never recover, so Media3 now detects the stall itself rather than the app guessing at it. Connectivity is read from the active network instead of trusting the order callbacks arrive in. A queued reconnect no longer overrides someone deliberately hitting pause, and a play intent is recorded before a live-edge reload so the reload cannot swallow it. There is a RESILIENCE document in the repo because the failure modes needed writing down before they could be fixed.",
      "The other half is the festival tab: CMS-driven containers rendered from the backend-for-frontend, a detail node browse screen, and link types extended so a container row can point at an external page or a webview. That work is aligned to a shared Container Block spec, so the app and the CMS agree on shape rather than each assuming.",
    ],
    outcomes: [
      { value: "9", label: "of my first 20 commits were live-radio resilience" },
      { value: "Media3", label: "detects the Android buffering stall instead of the app guessing" },
      { value: "1 spec", label: "shared Container Block, so app and CMS agree on shape" },
    ],
  },
  {
    slug: "euroconsumers",
  rebus: [{ phrase: "Qdrant", icon: "Database", tint: "red" }, { phrase: "scores its own groundedness", icon: "ShieldCheck", tint: "blue" }, { phrase: "Azure", icon: "Cloud", tint: "yellow" }],
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
      "A wrong answer about your consumer rights is worse than no answer, so the whole build is arranged around not being confidently wrong.",
      "The agent is Mastra in TypeScript, calling retrieval tools over Qdrant rather than doing a single-shot lookup, with LangSmith tracing the full pipeline so a regression can be found instead of guessed at. Ingestion runs on LlamaParse, and its polling ceiling went from three retries to twenty once real legal PDFs showed how long they actually take. Sources carry their publication date, because a consumer-rights article that was right two years ago may not be now.",
      "The unglamorous half was the rest of it: product scores filtered client-side, prices parsed properly for a dot thousands separator, translations for every surface, guardrails for questions the corpus cannot answer, and a human in the loop on the answers that carry real risk. I also built and ran their development, staging and production environments on Azure, with teams in Portugal, France and Italy.",
    ],
    outcomes: [
      { value: "Qdrant", label: "hybrid retrieval, so an answer can cite the article it came from" },
      { value: "3 to 20", label: "parse retries, once real legal PDFs showed their true length" },
      { value: "3 markets", label: "Portugal, France and Italy, plus the Azure environments under it" },
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
  rebus: [{ phrase: "made it native", icon: "DeviceMobile", tint: "red" }, { phrase: "signup flow", icon: "SignIn", tint: "blue" }, { phrase: "GitHub Actions", icon: "GitBranch", tint: "yellow" }],
    name: "BeeDee",
  brand: "/images/logos/beedee.png",
    typeLine: { kind: "Client work", sub: "Frontend lead" },
  accent: "red",
    title: "Four years of a consumer app, owned end to end",
    description:
      "BeeDee felt like a website in a wrapper. I made it native, then spent sixteen of my 155 pull requests on the signup flow alone, so people stopped falling out of it. Refer-a-friend, travel mode, localisation, and releases moved onto GitHub Actions. It cannot buy ads on Meta, Google or Reddit, so organic search had to carry the growth, from 63 clicks a day to 116. Reporting to the CEO, with the team in India.",
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
      "BeeDee did not need to be faster. It needed to stop feeling like a website in a wrapper. So the first stretch was the native look: React Navigation headers instead of custom ones, SF Symbols in the chat inbox on iOS, and the image, list, toast and carousel libraries all swapped for ones that behave the way the platform does.",
      "Then the signup flow, which turned into the single biggest thread of the whole engagement: sixteen separate pieces of work on it. Your answers survive going back to change your phone number. The BDSM test result you already added is still there when you resume. The safe-search choice persists through an interrupted signup. None of that is a feature anyone asks for. All of it is people not falling out of the funnel.",
      "After that it was growth and the plumbing under it. Refer-a-friend for Superlikes and Supporter, the Superlike and Supporter purchase screens redesigned, and the Play Store screenshot set generated from the app itself rather than mocked up by hand. Travel mode, localisation, crash reports carrying the account context so a stack trace names a person, and GitHub Actions taking over the releases.",
      "Growth had to come from somewhere else, because the platform is barred from paid advertising on Meta, Google and Reddit. So it came from search. Over the last 164 days the site went from 63 clicks a day to 116, 954 non-brand queries rank, and 83 of them sit in position one. The best of those is bdsm test app at position 1.3, which is the kind of term that brings people who are already looking.",
      "A hundred and fifty-five merged pull requests between January 2025 and August 2026, working directly with the CEO and with the engineering team in India.",
    ],
    outcomes: [
      { value: "63 to 116", label: "search clicks a day over the last 164 days" },
      { value: "954", label: "non-brand queries ranking, 83 of them in position one" },
      { value: "155", label: "pull requests merged, 16 of them the signup flow alone" },
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
    name: "Stadiq",
    tint: "blue" as const,
    image: "/images/work/stadiq.webp",
    kind: "In private beta",
    wide: true,
    description:
      "A roadworks permit, a bridge closure and a festival all land in the same street in the same week, and nobody tells the businesses on it. Stadiq reads Antwerp's open data and tells an operator what is about to disrupt them, in plain language, with the estimate stated as an estimate.",
  },
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

/** Recent shows. Kept as a list because that is how it reads on a poster. */
export const CONCERTS = [
  { act: "Bring Me The Horizon", where: "Graspop", year: "2026", tint: "red" as const },
  { act: "Bad Omens", where: "Graspop", year: "2026", tint: "red" as const },
  { act: "Tame Impala", where: "", year: "2026", tint: "blue" as const },
  { act: "Joji", where: "", year: "2026", tint: "yellow" as const },
];

/**
 * The Bumble move: short claims that state something true rather than describe
 * a hobby. These say more in six words than a paragraph would.
 */
export const TRAITS = [
  { text: "Emotionally reliant on a one-eyed cat", icon: "Cat", tint: "red" as const },
  { text: "Owns more plants than shelf", icon: "Plant", tint: "blue" as const },
  { text: "Rates four stars, means it", icon: "Star", tint: "yellow" as const },
  { text: "Plays guitar at a volume nobody asked for", icon: "Guitar", tint: "red" as const },
  { text: "Will lose a Rocket League match on purpose, apparently", icon: "GameController", tint: "blue" as const },
  { text: "Cooks past his level on a Tuesday", icon: "CookingPot", tint: "yellow" as const },
];

/** Six of the thirty-one films Senne has given five stars. */
export const FILM_STRIP = [
  { title: "Mad Max: Fury Road", year: "2015", img: "/images/film/mad-max-fury-road.webp" },
  { title: "The Truman Show", year: "1998", img: "/images/film/the-truman-show.webp" },
  { title: "WALL-E", year: "2008", img: "/images/film/wall-e.webp" },
  { title: "Interstellar", year: "2014", img: "/images/film/interstellar.webp" },
  { title: "Across the Spider-Verse", year: "2023", img: "/images/film/spider-man-across-the-spider-verse.webp" },
  { title: "The Wild Robot", year: "2024", img: "/images/film/the-wild-robot.webp" },
];

/** Services a card actually points at, so the mark is real rather than generic. */
export const FUN_BRANDS: Record<string, string[]> = {
  "Marvel Rivals, HOI4, Wingspan": ["steam", "boardgamegeek"],
  "Guitar at home, loud rooms elsewhere": ["spotify"],
};

/** Real counts from his own viewing log. Kept as numbers, not as a profile. */
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
    body: "Four films in that list ever got half a star. Most land on four or four and a half, because I would rather enjoy a thing than be right about it. Fury Road, The Truman Show and WALL-E are the ones I keep going back to.",
  },
  {
    title: "Guitar at home, loud rooms elsewhere",
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
