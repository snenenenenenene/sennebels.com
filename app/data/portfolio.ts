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
  /** Phrases in the story that carry a rebus mark. */
  storyRebus?: { phrase: string; icon: string; tint: "red" | "blue" | "yellow" }[];
  /** Phrases in the description that carry a rebus mark. */
  rebus: { phrase: string; icon: string; tint: "red" | "blue" | "yellow" }[];
  /** Client mark, shown at the top of the card the way a case study leads. */
  brand?: string;
  /** "invert" for a flat near-black mark; "lift" for one that has colour worth keeping. */
  brandDark?: "invert" | "lift";
  title: string;
  description: string;
  tech: string[];
  /** Real screenshot, or a spec panel when the work is confidential / has no shippable asset. */
  image?: string;
  spec?: { points: string[]; credit: string };
  /** Real screens from the shipped app, shown as a row on the case study. */
  gallery?: { src: string; caption: string }[];
  /** Phone screens for the card, rendered in device frames rather than baked into one image. */
  phones?: string[];
  /** True when the captures already have the Dynamic Island painted in. */
  phonesHaveIsland?: boolean;
  cta: string;
  /** Everything below powers /work/[slug] only. */
  /** Countries the work actually spanned: teams, markets or editions. */
  regions?: { codes: string[]; label: string };
  /** What the project taught, in one paragraph. Grounded in its own story. */
  lesson: string;
  facts: { label: string; value: string }[];
  /** Platforms and tools, shown as marks. */
  stack?: string[];
  /** Features shipped, named. Optional. */
  features?: string[];
  /** Two or three paragraphs. No headings inside; the page supplies structure. */
  story: string[];
  outcomes: { value: string; label: string }[];
  live?: { label: string; href: string };
};

export const FEATURED: Featured[] = [
  {
    slug: "tomorrowland",
  stack: ["react", "expo", "nestjs", "typescript"],
  storyRebus: [{ phrase: "one app now", icon: "SquaresFour", tint: "red" }, { phrase: "a stream that dies on a train", icon: "WifiSlash", tint: "blue" }, { phrase: "without waiting on a release", icon: "Lightning", tint: "yellow" }],
  features: [
    "Live radio stall recovery on both platforms",
    "Playback that survives losing signal",
    "CMS-driven festival screens",
    "Content detail screens",
    "Partners overview",
  ],
  rebus: [{ phrase: "Three or four apps became one", icon: "SquaresFour", tint: "red" }, { phrase: "CarPlay and Android Auto", icon: "Car", tint: "blue" }, { phrase: "live radio", icon: "Broadcast", tint: "yellow" }],
    name: "Tomorrowland",
  brand: "/images/logos/tomorrowland.svg",
  brandDark: "invert",
    typeLine: { kind: "Client work", sub: "Mobile" },
  accent: "red",
    title: "One app for every edition, all year round",
    description:
      "Three or four apps became one, covering every Tomorrowland edition worldwide and carrying the old radio app's features into CarPlay and Android Auto. My work is the live radio surviving a bad network on both platforms, and the CMS-driven content system the festival screens are built from.",
    tech: ["React Native", "Expo", "Server-driven UI"],
    phones: [
      "/images/work/tomorrowland-explore.webp",
      "/images/work/tomorrowland-search.webp",
    ],
    phonesHaveIsland: true,
    gallery: [
      { src: "/images/work/tomorrowland-explore.webp", caption: "Every edition in one place, plus the eleven months you are not at one" },
      { src: "/images/work/tomorrowland-search.webp", caption: "Search across DJ sets and One World Radio shows" },
    ],
    regions: { codes: ["be", "br"], label: "Editions worldwide, Belgium and Brazil among them" },
    lesson:
      "Write down how a thing fails before you try to fix it. The radio only got better once the failure modes were on paper, because a stream that stalls, a network that dropped and a person who pressed pause look identical from the player and need three different answers. Guessing at that in code just moves the bug.",
    cta: "read the write-up",
    facts: [
      { label: "Role", value: "Senior Mobile Engineer" },
      { label: "Through", value: "Direct, freelance" },
      { label: "Timeline", value: "Jul 2026 to now" },
      { label: "Team", value: "Product owner, tech lead, mobile engineers" },
    ],
    story: [
      "Tomorrowland ran three or four apps: Radio, an app per festival, and Account. They are one app now, covering every edition worldwide, with the old radio app's features carried into CarPlay and Android Auto, a full store, and a festival map that has to hold up with tens of thousands of people on it at once. The point of consolidating was not tidiness. It was that a Tomorrowland experience should exist in the eleven months you are not at a festival.",
      "The radio is where most of my time has gone, because a stream that dies on a train is a stream nobody trusts. It recovers from stalls on both platforms now, it knows the difference between a network that dropped and a person who pressed pause, and it stops fighting you when you walk back into signal. Getting there meant writing down how it fails before trying to fix it.",
      "The other half is the content system behind the festival screens. Editorial teams shape what the app shows without waiting on a release, which matters when a lineup changes on the day.",
    ],
    outcomes: [
      { value: "4 to 1", label: "apps consolidated, across every edition worldwide" },
      { value: "Both platforms", label: "live radio recovering from stalls on iOS and Android" },
      { value: "No release needed", label: "for editorial teams to change what the app shows" },
    ],
  },
  {
    slug: "euroconsumers",
  stack: ["typescript", "qdrant", "langchain", "docker"],
  storyRebus: [{ phrase: "not being confidently wrong", icon: "ShieldCheck", tint: "red" }, { phrase: "the article it came from", icon: "Quotes", tint: "blue" }, { phrase: "human in the loop", icon: "HandHeart", tint: "yellow" }],
  rebus: [{ phrase: "looks things up rather than guessing", icon: "MagnifyingGlass", tint: "red" }, { phrase: "cites the article", icon: "Quotes", tint: "blue" }, { phrase: "hands anything risky to a person", icon: "HandHeart", tint: "yellow" }],
    name: "Euroconsumers",
  brand: "/images/logos/euroconsumers.svg",
    typeLine: { kind: "Client work", sub: "AI systems" },
  accent: "blue",
    title: "Vera, a legal assistant that has to be right",
    description:
      "Vera answers consumer-rights questions for Altroconsumo and its sister organisations. A wrong answer about your rights is worse than no answer, so she looks things up rather than guessing, cites the article she answered from, marks her own confidence, and hands anything risky to a person. I built the environments it runs on and kept it running after launch, with their teams in Portugal, France and Italy.",
    tech: ["Mastra", "RAG", "LangSmith"],
    spec: {
      points: [
        "A tool-calling agent replacing single-shot retrieval with multi-step reasoning",
        "PDF ingestion, chunking, hybrid sparse and dense embeddings",
        "Automated scorers for groundedness, plus full pipeline tracing",
      ],
      credit: "Delivered through Nimble, in a team of eight",
    },
    regions: { codes: ["pt", "fr", "it"], label: "Teams in Portugal, France and Italy" },
    lesson:
      "Knowing when to say nothing is a feature. Vera is more useful for refusing a question her sources cannot support than she would be for answering everything fluently, and an answer you can check beats one you have to take on faith. Most of the trust came from the unglamorous half: dated sources, prices that parse, a person on anything risky.",
    cta: "read the write-up",
    facts: [
      { label: "Role", value: "AI Engineer" },
      { label: "Through", value: "Nimble" },
      { label: "Timeline", value: "Aug 2025 to Apr 2026" },
      { label: "Team", value: "Eight engineers, two organisations" },
    ],
    story: [
      "A wrong answer about your consumer rights is worse than no answer, so the whole build is arranged around not being confidently wrong.",
      "Vera looks things up before she answers rather than reciting from memory, and every answer carries the article it came from, so a member can check her. Sources show their publication date, because a consumer-rights article that was right two years ago may not be now. Ingestion had to be rebuilt around how long real legal documents actually take to process, rather than how long we had assumed.",
      "The rest was the unglamorous half that decides whether people trust it: prices that parse correctly in every market, translations for every surface, a refusal to answer questions the sources cannot support, and a human in the loop on anything carrying real risk. I also built and ran the environments it lives on, working with teams in Portugal, France and Italy.",
    ],
    outcomes: [
      { value: "Qdrant", label: "hybrid retrieval, so an answer can cite the article it came from" },
      { value: "Cited", label: "every answer traceable to the article it came from" },
      { value: "3 markets", label: "Portugal, France and Italy, plus the Azure environments under it" },
    ],
  },
  {
    slug: "kaedim",
  stack: ["react", "typescript", "blender", "figma"],
  storyRebus: [{ phrase: "inspected, marked up and approved", icon: "ListChecks", tint: "red" }, { phrase: "reads as progress", icon: "Hourglass", tint: "blue" }, { phrase: "before a human spends attention", icon: "Robot", tint: "yellow" }],
  features: [
    "Customer onboarding flow",
    "Customer-facing app redesign",
    "Skeleton loaders for slow generations",
    "Bulk uploads that survive a bad item",
    "Progress tracking for in-flight assets",
    "Internal review queue for the 3D team",
    "Blender testing over MCP",
    "Figma Dev MCP design handoff",
  ],
  rebus: [{ phrase: "onboarding and progress", icon: "SignIn", tint: "red" }, { phrase: "review queue", icon: "ListChecks", tint: "blue" }, { phrase: "automated testing", icon: "Robot", tint: "yellow" }],
    name: "Kaedim",
  brand: "/images/logos/kaedim.png",
  brandDark: "lift",
    typeLine: { kind: "Startup", sub: "3D and AI" },
  accent: "yellow",
    title: "Both sides of a human-in-the-loop pipeline",
    description:
      "Kaedim turns a brief into 3D that a real team inspects and approves before it ships. I worked both ends of that: the onboarding and progress a customer sees, and the review queue and automated testing the design team leans on.",
    tech: ["Three.js", "WebGL", "Blender MCP"],
    spec: {
      points: [
        "Onboarding and the customer-facing app, redesigned",
        "Skeleton loaders, so a slow generation reads as progress",
        "Bulk uploads where one bad item no longer sinks the batch",
        "A review queue for the 3D team, and automated asset testing",
      ],
      credit: "The product itself sits behind a login, so no screenshot.",
    },
    regions: { codes: ["us", "gb", "sg"], label: "Team across San Francisco, London and Singapore" },
    lesson:
      "Waiting is a design problem, not a backend one. Nothing about the generation got faster, but a skeleton loader turns a frozen screen into visible progress, and one bad item no longer takes a whole batch down with it. The same idea runs the other way too: failing bad assets automatically means a designer only spends attention on work worth looking at.",
    cta: "read the write-up",
    facts: [
      { label: "Role", value: "Creative Engineer" },
      { label: "Company", value: "Kaedim, Y Combinator-backed" },
      { label: "Engagement", value: "Contract" },
      { label: "Scope", value: "Five or more repositories" },
    ],
    story: [
      "Kaedim is not a button that emits a finished model. A brief, a sketch or a reference pack goes in, and what comes out is inspected, marked up and approved by an actual 3D team before a customer sees it. That loop is the product, and it has two sides.",
      "On the customer side I built the onboarding flow and redesigned the customer-facing app, added skeleton loaders so a slow generation reads as progress rather than a frozen screen, and reworked bulk uploads so one bad item stops taking the whole batch with it. Progress tracking so someone can see where their asset actually is.",
      "On the team's side, a review queue for the designers doing the inspecting, and an automated testing pipeline that pushes generated assets through Blender over the Model Context Protocol and fails the bad ones before a human spends attention on them. Fewer bad assets reaching a designer is the whole point.",
      "The handoff itself got faster too. Figma Dev MCP plus the automated tests meant a design became a reviewed implementation without the usual round trip, and I wrote the walkthrough that got the rest of engineering onto it. The team was spread across San Francisco, London and Singapore, and I worked directly with the CEO.",
    ],
    outcomes: [
      { value: "Both ends", label: "the customer's view of the pipeline, and the team's" },
      { value: "Fewer", label: "bad assets reaching a designer, caught by tests first" },
      { value: "Faster", label: "design to reviewed implementation, via Figma Dev MCP" },
    ],
    live: { label: "kaedim3d.com", href: "https://www.kaedim3d.com/" },
  },
  {
    slug: "beedee",
  stack: ["react", "expo", "typescript", "githubactions", "firebase"],
  storyRebus: [{ phrase: "website in a wrapper", icon: "DeviceMobile", tint: "red" }, { phrase: "signup flow", icon: "SignIn", tint: "blue" }, { phrase: "it came from search", icon: "MagnifyingGlass", tint: "yellow" }],
  features: [
    "Travel Mode, passport-style redesign",
    "Incognito mode",
    "Refer-a-friend for Superlikes",
    "Share your profile with a link",
    "Supporter upgrade with duration toggle",
    "Superlike purchase screen",
    "Unread counts per conversation",
    "Same-country filter",
    "Store screenshots generated from the app",
    "Metro to Expo migration",
  ],
  rebus: [{ phrase: "made it native", icon: "DeviceMobile", tint: "red" }, { phrase: "signup flow", icon: "SignIn", tint: "blue" }, { phrase: "GitHub Actions", icon: "GitBranch", tint: "yellow" }],
    name: "BeeDee",
  brand: "/images/logos/beedee.png",
    typeLine: { kind: "Client work", sub: "Frontend lead" },
  accent: "red",
    title: "A consumer app, owned end to end",
    description:
      "BeeDee felt like a website in a wrapper. I made it native, then spent more work on the signup flow than on anything else, so people stopped falling out of it. Refer-a-friend, travel mode, localisation, and releases moved onto GitHub Actions. It cannot buy ads on Meta, Google or Reddit, so organic search had to carry the growth, and daily clicks are up 84%. Reporting to the CEO, with the team in India.",
    tech: ["React Native", "Sockets", "Mollie"],
    gallery: [
      { src: "/images/work/beedee-profile.webp", caption: "Supporter, Superlikes and refer-a-friend, all off one screen" },
      { src: "/images/work/beedee-incognito.webp", caption: "Incognito, so you only surface to people you already liked" },
      { src: "/images/work/beedee-travel.webp", caption: "Travel mode, with the places you keep going back to" },
      { src: "/images/work/beedee-likes.webp", caption: "Who liked you, kept separate from who you liked" },
    ],
    phones: [
      "/images/work/beedee-discover.webp",
      "/images/work/beedee-match.webp",
      "/images/work/beedee-conversation.webp",
    ],
    regions: { codes: ["be", "in"], label: "Belgium, with the engineering team in India" },
    lesson:
      "The unglamorous flow is where the users actually are. More work went into signup than into any feature, and none of it is something a person would ever ask for. Keeping your answers when you go back to change your phone number does not demo well. It just means people finish.",
    cta: "read the write-up",
    facts: [
      { label: "Role", value: "Frontend Lead" },
      { label: "Timeline", value: "Jan 2025 to now" },
      { label: "Team", value: "One engineer plus rotating interns" },
      { label: "Ownership", value: "Frontend, end to end" },
    ],
    story: [
      "BeeDee did not need to be faster. It needed to stop feeling like a website in a wrapper. So the first stretch was the native look: React Navigation headers instead of custom ones, SF Symbols in the chat inbox on iOS, and the image, list, toast and carousel libraries all swapped for ones that behave the way the platform does.",
      "Then the signup flow, which turned into the single biggest thread of the whole engagement: more separate pieces of work than anything else got. Your answers survive going back to change your phone number. The BDSM test result you already added is still there when you resume. The safe-search choice persists through an interrupted signup. None of that is a feature anyone asks for. All of it is people not falling out of the funnel.",
      "After that it was growth and the plumbing under it. Refer-a-friend for Superlikes and Supporter, the Superlike and Supporter purchase screens redesigned, and the Play Store screenshot set generated from the app itself rather than mocked up by hand. Travel mode, localisation, crash reports carrying the account context so a stack trace names a person, and GitHub Actions taking over the releases.",
      "Growth had to come from somewhere else, because the platform is barred from paid advertising on Meta, Google and Reddit. So it came from search. Daily clicks are up 84% over the last five months, 954 non-brand queries rank, and 83 of them sit in position one. The best of those is bdsm test app at position 1.3, which is the kind of term that brings people who are already looking.",
      "Frontend lead since the start of 2025, owning the codebase end to end, reporting to the CEO and working with the engineering team in India.",
    ],
    outcomes: [
      { value: "+27%", label: "monthly active users across 2026" },
      { value: "+84%", label: "search clicks a day, at a 9.2% click-through against a 2 to 5% benchmark" },
      { value: "Lead", label: "frontend owned end to end since the start of 2025, reporting to the CEO" },
    ],
  },
  {
    slug: "lokaal-beslist",
  stack: ["emberdotjs", "typescript", "docker"],
  storyRebus: [{ phrase: "required to publish", icon: "Scales", tint: "red" }, { phrase: "first commit", icon: "GitCommit", tint: "blue" }, { phrase: "maturity levels", icon: "ChartBar", tint: "yellow" }],
  features: [
    "Keyword and session search",
    "Filter by governing body",
    "Multiselect classification filter",
    "Agenda item detail with every source",
    "Decision validation library",
    "Maturity levels for published decisions",
    "A view of what is missing against the standard",
    "Correct and complete scored separately",
  ],
  rebus: [{ phrase: "first commit", icon: "GitCommit", tint: "red" }, { phrase: "citizen-facing database", icon: "Buildings", tint: "blue" }, { phrase: "validation toolchain", icon: "ShieldCheck", tint: "yellow" }],
    name: "Lokaal Beslist",
  brand: "/images/logos/vlaanderen.png",
    typeLine: { kind: "Government", sub: "Civic platform" },
  accent: "blue",
    title: "Public by law, readable by nobody",
    description:
      "Every Belgian municipality publishes its decisions. Almost none of it was searchable. I made the first commit on the citizen-facing database and then built the validation toolchain that tells a municipality whether what it published actually meets the standard.",
    tech: ["Leaflet", "D3.js", "Semantic web"],
    image: "/images/work/lokaalbeslist.webp",
    regions: { codes: ["be"], label: "300+ Belgian municipalities" },
    lesson:
      "Publishing something is not the same as publishing it correctly. Scoring correct and complete separately sounds pedantic until you notice a municipality can be one without being the other, and that the fix differs for each. Fixing the data upstream is what makes the citizen-facing half worth searching at all.",
    cta: "read the write-up",
    facts: [
      { label: "Role", value: "Full-Stack Developer" },
      { label: "Client", value: "Flanders Agency of Home Affairs" },
      { label: "Timeline", value: "Jul 2022 to Jul 2024" },
      { label: "Reach", value: "300+ Belgian municipalities" },
    ],
    story: [
      "Flemish municipalities are required to publish their decisions. Hundreds of them do, as linked data, and until this existed almost none of it was findable by the people it concerns. I made the first commit on the citizen-facing database and worked on it across seventeen pull requests: search inside a session, keyword search, multiselect on classification, filters by governing body that actually stay open when you query them, and a detail view that shows an agenda item with the body that decided it and every source it came from.",
      "The harder half is upstream. Publishing something is not the same as publishing it correctly, so I built a validation library and the tool on top of it: maturity levels for how complete a published decision is, a view of exactly what is missing against the standard, and correct and complete scored separately, because a decision can be one without being the other.",
      "That is the part that turns a legal obligation into something a municipality can act on. It is also the part that means the citizen-facing side has data worth searching.",
    ],
    outcomes: [
      { value: "First commit", label: "on the citizen-facing decisions database" },
      { value: "Correct and complete", label: "scored separately, because they are different failures" },
      { value: "89%", label: "faster page loads, and 70% less manual audit work" },
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
  
  { role: "Senior Mobile Engineer", org: "Tomorrowland", logoMono: true, href: "https://www.tomorrowland.com", logo: "/images/logos/tomorrowland.svg", tint: "red", dates: "Jul 2026 to now" },
  { role: "Full-Stack Engineer", org: "Outpost", href: "https://outpostplayers.com", logo: "/images/logos/outpost.webp", tint: "blue", dates: "Jan 2026 to now" },
  { role: "Frontend Lead", org: "BeeDee", href: "https://www.beedee.com", logo: "/images/logos/beedee.png", tint: "red", dates: "Jan 2025 to now" },
  { role: "AI Engineer", org: "Euroconsumers, via Nimble", href: "https://www.euroconsumers.org", logo: "/images/logos/euroconsumers.svg", tint: "blue", dates: "Aug 2025 to Apr 2026" },
  { role: "Creative Engineer", org: "Kaedim, Y Combinator-backed", href: "https://www.kaedim3d.com", logo: "/images/logos/kaedim.png", tint: "yellow", dates: "2025" },
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
/**
 * Everything rated on one scale, the way a film diary does it. The top is
 * what he actually said he loves; the bottom is life and work, not other
 * people's art, because panning real films in someone else's name is not a
 * joke worth making.
 */
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

/** Services a card actually points at, so the mark is real rather than generic. */
export const FUN_BRANDS: Record<string, string[]> = {
  "Achievement hunting, and Magic": ["steam", "boardgamegeek"],
  "Guitar at home, loud rooms elsewhere": ["spotify"],
};

export type Rated = { name: string; img?: string };

/**
 * The scale, with cover art. Only things there is a real image for: the point
 * is images and titles, and a title on a blank tile is the fluff this was
 * meant to remove. Magic, both Pokémon games, the Cameron films and the four
 * concerts belong here too and are waiting on art.
 */
export const RATINGS: { stars: number; items: Rated[] }[] = [
  {
    stars: 5,
    items: [
      { name: "Mad Max: Fury Road", img: "/images/film/mad-max-fury-road.webp" },
      { name: "Phasmophobia", img: "/images/rated/phasmophobia.webp" },
      { name: "Interstellar", img: "/images/film/interstellar.webp" },
    ],
  },
  {
    stars: 4.5,
    items: [
      { name: "The Truman Show", img: "/images/film/the-truman-show.webp" },
      { name: "Europa Universalis IV", img: "/images/rated/eu4.webp" },
      { name: "WALL-E", img: "/images/film/wall-e.webp" },
    ],
  },
  {
    stars: 4,
    items: [
      { name: "Across the Spider-Verse", img: "/images/film/spider-man-across-the-spider-verse.webp" },
      { name: "Hearts of Iron IV", img: "/images/rated/hoi4.webp" },
      { name: "The Wild Robot", img: "/images/film/the-wild-robot.webp" },
    ],
  },
  {
    stars: 3.5,
    items: [
      { name: "Marvel Rivals", img: "/images/rated/marvel-rivals.webp" },
      { name: "Rocket League", img: "/images/rated/rocket-league.webp" },
    ],
  },
  {
    stars: 3,
    items: [{ name: "Overwatch 2", img: "/images/rated/overwatch.webp" }],
  },
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
    title: "Cinephile, horror-leaning",
    body: "Most things land on four or four and a half, because I would rather enjoy a thing than be right about it. Horror is the genre I will watch at its worst, and Cameron is the director I will defend at his. Aliens, Terminator 2 and The Abyss, in that order, and I will take the argument.",
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
    title: "Achievement hunting, and Magic",
    body: "Hearts of Iron and EU4, where the actual game is the achievement list and the run is just how you get there. Phasmophobia when there are four of us. Marvel Rivals and Rocket League when I want to lose a match I had every right to win. Magic since long before any of it, and Wingspan is the one everyone gets talked into and nobody regrets.",
  },
  {
    title: "Coffee, and cooking past my level",
    body: "A long walk with a coffee, or a Tuesday dinner more ambitious than a Tuesday can support. Both are how I get unstuck.",
  },
] as const;
