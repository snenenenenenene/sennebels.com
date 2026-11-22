// Products I build and run myself. Powers /projects, /projects/[slug], the
// home grid, the footer and the JSON-LD. Facts come from each product's own
// repo and live site. No traction figures: none are verified enough to print.

import type { Tint } from "../components/ui";

export type Project = {
  slug: string;
  name: string;
  tint: Tint;
  /** The live product. A normal followed link, on purpose. */
  live: { label: string; href: string };
  image: string;
  alt: string;
  /** Short status for the card pill. */
  status: string;
  /** Experiments get labelled as such everywhere they appear. */
  experiment?: boolean;
  /** schema.org type and category for the SoftwareApplication node. */
  schemaType: "WebApplication" | "MobileApplication";
  category: string;
  os: string;
  /** Under ~45 characters: the layout appends " | Senne Bels". */
  seoTitle: string;
  /** Meta description, 140 to 155 characters. */
  description: string;
  /** The H1. */
  title: string;
  /** One or two sentences: what it is and who it is for. */
  summary: string;
  /** The home card's line. */
  card: string;
  problem: string[];
  built: string[];
  decisions: { title: string; body: string }[];
  builtWith: { name: string; slug?: string }[];
  facts: { label: string; value: string }[];
  /** Where it stands today, in plain words. */
  statusNote: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "transita",
    name: "Transita",
    tint: "red",
    live: { label: "transita.app", href: "https://transita.app" },
    image: "/images/work/transita-immigration-routes.webp",
    alt: "Transita homepage: run your move abroad from one workspace, with a phone showing an EU Blue Card match for Germany",
    status: "Live",
    schemaType: "WebApplication",
    category: "TravelApplication",
    os: "Web",
    seoTitle: "Transita: visa and immigration planning",
    description:
      "Transita matches your profile to the visa routes you may qualify for, then tracks the route you choose, its deadlines and rule changes. By Senne Bels.",
    title: "Visa routes you may qualify for, and a workspace to follow one",
    summary:
      "Transita is for skilled professionals planning a move abroad on their own. A short quiz ranks the work and skilled-migration visa routes you appear to qualify for. The workspace keeps your chosen route, documents and deadlines in one place.",
    card: "A short quiz ranks the visa routes that may be open to you. Then a workspace tracks the one you pick. I built it and I run it.",
    problem: [
      "Visa information is scattered across government sites and forums, and much of it is out of date. Working out which routes you qualify for takes days. Once you choose one, there is nowhere to keep its documents, dates and rule changes during the months that follow.",
      "Transita matches you to routes and keeps the one you choose in one place. It is not a law firm and files nothing. You still submit the application yourself.",
    ],
    built: [
      "The Next.js app runs on Neon Postgres with Drizzle, magic-link and Google sign-in through Better Auth, and Stripe for the one-off Action Plan. A small AI router sends each job to the fitting model across OpenRouter, Gemini and Anthropic. Where it is safe, a call falls back to a rule-based answer when no model is available.",
      "Transita runs a public MCP server. An AI assistant can use the same data as the site to match a profile, compare routes or score a points test.",
    ],
    decisions: [
      {
        title: "One ranking everywhere",
        body: "The results page and workspace used to sort matches differently. As a result, the top route could disappear from the workspace. Both now use the same comparator, with single visas and multi-step pathways ranked in one list.",
      },
      {
        title: "Personal documents fail closed",
        body: "Anything that reads a user's documents goes only to zero-data-retention model endpoints. If none is available, the call errors instead of falling back to a provider that keeps data.",
      },
      {
        title: "Visa facts get re-checked",
        body: "A scheduled job hashes the official pages behind each route and flags drift. When a page changes, the route's \"last verified\" date stops moving, and the page says so.",
      },
      {
        title: "Counting without cookies",
        body: "Analytics load only after consent, which most visitors never give. A first-party events table counts the funnel instead, so the numbers I use are complete.",
      },
    ],
    builtWith: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Postgres", slug: "postgresql" },
      { name: "Drizzle", slug: "drizzle" },
      { name: "Stripe", slug: "stripe" },
      { name: "Anthropic", slug: "anthropic" },
      { name: "MCP" },
    ],
    facts: [
      { label: "For", value: "Skilled professionals moving abroad" },
      { label: "Platform", value: "Web" },
      { label: "Pricing", value: "Free quiz and workspace, paid Action Plan" },
      { label: "Role", value: "Solo: product, design, code, operations" },
    ],
    statusNote: "Live, with its first paying customers. I work on activation: getting people from their quiz results to a route they actually follow.",
  },
  {
    slug: "keepr",
    name: "Keepr",
    tint: "blue",
    live: { label: "joinkeepr.com", href: "https://joinkeepr.com" },
    image: "/images/work/keepr-belgian-rental-inspection.webp",
    alt: "Keepr homepage for Belgian landlords, with a phone notification that a move-in inspection report is ready to sign",
    status: "Live",
    schemaType: "WebApplication",
    category: "BusinessApplication",
    os: "Web",
    seoTitle: "Keepr: rental inspections for landlords",
    description:
      "Keepr writes the Belgian move-in inspection report (plaatsbeschrijving) from your phone, gets the tenant to sign online and handles the lease admin after it.",
    title: "The plaatsbeschrijving from your phone, and the lease admin after it",
    summary:
      "Keepr is for private landlords in Belgium with one to a few rental units. It produces move-in and move-out inspection reports from phone photos, gets the tenant's online signature, and keeps leases, indexation and deadlines in one place.",
    card: "Keepr writes the Belgian move-in inspection report from photos and handles the rest of the lease in one place.",
    problem: [
      "Since 2025, every Belgian lease needs a digital move-in inspection: the plaatsbeschrijving. A small landlord either pays an expert a few hundred euros for each report or writes it by hand and hopes it holds up when the tenant leaves.",
      "The rest of the lease often lives in spreadsheets: rent indexation, registration, energy certificates and their deadlines.",
    ],
    built: [
      "The Next.js app runs on Neon Postgres with Drizzle, Better Auth, Mollie for billing and Trigger.dev for background jobs. Photos sit behind signed URLs. Reports are rendered as PDFs.",
      "Claude compares move-in and move-out photos room by room and suggests what is damage, wear or already there. The landlord decides. If the model fails, the report falls back to plain templates.",
    ],
    decisions: [
      {
        title: "Signatures labelled for what they are",
        body: "The tenant signs through an emailed link and a one-time code. That is a simple electronic signature, so that's what Keepr calls it. The audit trail stores a hash of exactly what the tenant reviewed. Once signed, the report cannot be reopened.",
      },
      {
        title: "Timestamped PDFs",
        body: "Signed reports receive an RFC 3161 timestamp. The PDF footer says whether the timestamp is qualified, so nobody reads more into it than they should.",
      },
      {
        title: "Stamp, don't re-render",
        body: "Keepr stamps a signed PDF in place instead of rendering it again. The file the tenant saw is the file that gets kept. The job reports each outcome and stops cleanly when a render cannot succeed.",
      },
      {
        title: "Regional rules in code",
        body: "Flanders, Brussels and Wallonia index rent differently. The rules live in one tested module, which Keepr also uses to draft the indexation letter.",
      },
    ],
    builtWith: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Postgres", slug: "postgresql" },
      { name: "Drizzle", slug: "drizzle" },
      { name: "Anthropic", slug: "anthropic" },
      { name: "Mollie" },
      { name: "Trigger.dev" },
    ],
    facts: [
      { label: "For", value: "Private landlords in Belgium" },
      { label: "Platform", value: "Web, installable on a phone" },
      { label: "Pricing", value: "First property free, then monthly plans or report packs" },
      { label: "Role", value: "Solo: product, design, code, operations" },
    ],
    statusNote: "Live and open for sign-ups. It is early. Few landlords use it so far, and finding them is the work right now.",
  },
  {
    slug: "penfolk",
    name: "Penfolk",
    tint: "green",
    live: { label: "penfolk.app", href: "https://penfolk.app" },
    image: "/images/work/penfolk-pen-pal-letters.webp",
    alt: "Penfolk about page: find your people, a pen pal and language exchange app, with a public beta badge",
    status: "Public beta",
    schemaType: "WebApplication",
    category: "SocialNetworkingApplication",
    os: "Web, iOS, Android",
    seoTitle: "Penfolk: slow pen pals for language learners",
    description:
      "Penfolk matches you with pen pals who speak the language you are learning. Letters take time to arrive, based on real distance. Built by Senne Bels.",
    title: "Pen pals for language learners, with letters that take time",
    summary:
      "Penfolk is for people who want to make friends in other countries and practise a language together. You match on languages, interests and music. Then you write letters instead of chatting.",
    card: "A pen-pal app for language learners. You match on languages and interests, and letters take time to arrive.",
    problem: [
      "Language-exchange apps tend to become quick chats that fizzle out after a few messages. Social apps revolve around a feed. Finding one person who will actually write back is the hard part.",
      "Penfolk slows the conversation down on purpose. Each reply should be worth the wait.",
    ],
    built: [
      "It has a Next.js web app and an Expo app for iOS and Android, both using one backend. The stack includes Neon Postgres with Drizzle, Better Auth, Pusher for realtime, Stripe for the optional Supporter plan, and DeepL with Gemini for translation.",
      "The app talks to the same server actions as the website through a typed RPC layer. A rule only needs to be written once.",
    ],
    decisions: [
      {
        title: "Delivery time from real distance",
        body: "A slow letter's arrival time comes from the distance between the two writers at airmail speed, plus a base delay and some variance. A letter from next door arrives before one sent from the other side of the world.",
      },
      {
        title: "Sealed until it lands",
        body: "A letter in transit stays sealed on the server. The recipient's device receives no text, media or preview before it arrives. Realtime events never carry the letter either.",
      },
      {
        title: "Matches who can reply",
        body: "Suggestions include only people who were active in the last two weeks and aren't sitting on unanswered first letters. Before this rule, most first letters went to people who were no longer around.",
      },
      {
        title: "Age separation fails closed",
        body: "Adults and minors cannot message each other, share groups or appear in each other's suggestions. A profile without a birth date is refused. One tested module enforces the rules for both the web and the app.",
      },
    ],
    builtWith: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Expo", slug: "expo" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Postgres", slug: "postgresql" },
      { name: "Drizzle", slug: "drizzle" },
      { name: "Pusher", slug: "pusher" },
      { name: "DeepL", slug: "deepl" },
    ],
    facts: [
      { label: "For", value: "Language learners and people who want friends abroad" },
      { label: "Platform", value: "Web, with an iOS and Android app" },
      { label: "Pricing", value: "Free, with an optional Supporter plan" },
      { label: "Role", value: "Solo: product, design, code, operations" },
    ],
    statusNote: "In public beta on the web. The native app is built and making its way through the stores.",
  },
  {
    slug: "stadiq",
    name: "Stadiq",
    tint: "blue",
    live: { label: "stadiq.app", href: "https://stadiq.app" },
    image: "/images/work/stadiq-antwerp-street-disruption.webp",
    alt: "Stadiq homepage: an address search for road works and diversions in Antwerp, over an illustrated Antwerp street with a tram",
    status: "Live",
    schemaType: "WebApplication",
    category: "UtilitiesApplication",
    os: "Web",
    seoTitle: "Stadiq: Antwerp road works by address",
    description:
      "Stadiq shows road works, closures and diversions around any Antwerp address from GIPOD and De Lijn data, and keeps the history the official feed drops.",
    title: "What is about to happen on your street in Antwerp",
    summary:
      "Stadiq is for Antwerp residents, shop owners and businesses. Type an address to see the road works, closures and transit diversions coming up nearby, straight from the city's open data. Developers can access the same data and its history through an API.",
    card: "Type an Antwerp address and see the road works and diversions coming to your street, using the city's own open data.",
    problem: [
      "Road works, event closures and tram diversions are published as open data, but nobody reads a permit feed. Businesses on a street usually find out when the barriers go up.",
      "The official GIPOD feed drops items after they end. That leaves no public record of what happened on a street or how often the dates slipped.",
    ],
    built: [
      "The Next.js app runs on Neon Postgres with plain SQL migrations, Mapbox for maps and Gemini through OpenRouter to explain disruptions in plain Dutch. The same data is available through a REST API, CLI, MCP server and Apify actor.",
      "Stadiq reads GIPOD, De Lijn and Telraam traffic counts. It caches the parsed feeds and keeps its own archive of every change.",
    ],
    decisions: [
      {
        title: "An archive of a feed with no history",
        body: "Stadiq stores a new version only when an item changes, plus one presence row per day. That is enough to rebuild any past day and prove an absence.",
      },
      {
        title: "History back to 2021",
        body: "GIPOD's Linked Data Event Stream goes back years. Reading it lets Stadiq test a forecast against what actually happened instead of waiting months to collect its own data.",
      },
      {
        title: "Estimates say they are estimates",
        body: "Every footfall figure includes a range and confidence tier based on the number of comparable events behind it. A calibration loop raises the tier as real counts come in.",
      },
      {
        title: "Only claims the data supports",
        body: "De Lijn publishes no ridership figures, so Stadiq shows departures per day, never passenger numbers. Data licences are checked in code. Restricted sources stay out of paid use.",
      },
    ],
    builtWith: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Postgres", slug: "postgresql" },
      { name: "Mapbox", slug: "mapbox" },
      { name: "Gemini", slug: "googlegemini" },
      { name: "MCP" },
      { name: "Mollie" },
    ],
    facts: [
      { label: "For", value: "People and businesses in Antwerp" },
      { label: "Platform", value: "Web, API, CLI and MCP server" },
      { label: "Pricing", value: "Free address tools, paid data API" },
      { label: "Role", value: "Solo: product, design, code, operations" },
    ],
    statusNote: "Live. The address tools are free. The paid data API is new and still looking for its first customers.",
  },
  {
    slug: "korf",
    name: "Korf",
    tint: "yellow",
    live: { label: "korf.app", href: "https://korf.app" },
    image: "/images/work/korf-grocery-price-comparison.webp",
    alt: "Korf homepage: the app to compare supermarket prices in Belgium, with two phones showing deals and a priced shopping list",
    status: "On the App Store",
    schemaType: "MobileApplication",
    category: "ShoppingApplication",
    os: "iOS, Web",
    seoTitle: "Korf: compare supermarket prices in Belgium",
    description:
      "Korf reads your grocery receipts and finds where the same products cost less at Colruyt, Delhaize, Albert Heijn and Lidl. A free app by Senne Bels.",
    title: "Where your actual groceries cost less in Belgium",
    summary:
      "Korf is a free app for Belgian households that shop at more than one supermarket. It reads your receipts, finds the same products at Colruyt, Delhaize, Albert Heijn and Lidl, and shows which shop is cheapest for what you actually buy.",
    card: "Scan a receipt and find out where the same basket costs less. A free app for Belgian supermarkets.",
    problem: [
      "The same product has a different name, pack size and promotion at every chain, so comparing a whole basket by hand is not realistic. Leaflets compare an average basket, which is not the one you buy.",
    ],
    built: [
      "The monorepo contains an Expo app for iOS, a Next.js website and an API, with shared types between them. It uses Neon Postgres with raw SQL and vector indexes, Better Auth with Google and Apple sign-in, and Gemini models through OpenRouter for reading receipts and classifying products.",
      "Receipts can be photographed, uploaded or forwarded by email. All three routes end in the same parsing function.",
    ],
    decisions: [
      {
        title: "Matching by classification",
        body: "Every product is classified by category, type and variant. Matching is a lookup on those columns. This replaced text similarity, which missed products with short or odd names.",
      },
      {
        title: "Two kinds of match, never mixed",
        body: "\"Same product\" means the same type, variant, brand and size within 2%, ranked by pack price. \"Per unit\" means any brand, ranked per kilo, litre or piece. The app always tells you which comparison you're looking at.",
      },
      {
        title: "Honest basket totals",
        body: "The list optimiser is a pure function. It compares like for like, counts a multi-buy promotion only when you reach the required quantity, and excludes items without a comparable price instead of guessing.",
      },
      {
        title: "One parser for every receipt",
        body: "One structured-output call reads a receipt, whether it came from the camera, a PDF or a forwarded email. Anything that isn't a receipt is rejected.",
      },
    ],
    builtWith: [
      { name: "Expo", slug: "expo" },
      { name: "React Native", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Postgres", slug: "postgresql" },
      { name: "Gemini", slug: "googlegemini" },
    ],
    facts: [
      { label: "For", value: "Households in Belgium" },
      { label: "Platform", value: "iOS app and website" },
      { label: "Pricing", value: "Free, no ads" },
      { label: "Role", value: "Solo: product, design, code, operations" },
    ],
    statusNote: "Live on the App Store and the web in Dutch, French and English. Android is on its way.",
  },
  {
    slug: "payout-rescue",
    name: "Payout Rescue",
    tint: "green",
    live: { label: "payout-rescue.vercel.app", href: "https://payout-rescue.vercel.app" },
    image: "/images/work/payout-rescue-frozen-payout-guides.webp",
    alt: "Payout Rescue homepage: plain guides for small businesses whose Stripe, PayPal, Square or Mollie payouts were frozen",
    status: "Experiment",
    experiment: true,
    schemaType: "WebApplication",
    category: "BusinessApplication",
    os: "Web",
    seoTitle: "Payout Rescue: frozen Stripe or PayPal payouts",
    description:
      "An experiment by Senne Bels: plain guides, backed by official sources, for merchants whose Stripe, PayPal, Square or Mollie payouts were frozen.",
    title: "Plain guides for when a payment provider freezes your payouts",
    summary:
      "Payout Rescue is for small businesses whose payment provider froze their payouts or closed their account. It explains what the notice means, which deadlines apply and when an appeal has a chance. The experiment tests whether people want more help than that.",
    card: "Guides for merchants whose Stripe, PayPal, Square or Mollie payouts are frozen. An experiment to see whether the need is real.",
    problem: [
      "When Stripe, PayPal, Square or Mollie holds a merchant's money, the notice is vague and the help pages are general. Merchants piece together forum threads while their cash flow stops.",
    ],
    built: [
      "It is a small Next.js site on Neon Postgres. The guides are typed data. Every claim links to an official source from one registry and shows when it was checked. A merchant can send in their notice through a form, and a person answers within a day.",
    ],
    decisions: [
      {
        title: "A demand test, stated as one",
        body: "The form includes an optional box for a paid evidence pack, marked \"not for sale yet\". Ticking it measures interest before the pack exists.",
      },
      {
        title: "Sources over opinions",
        body: "The rules come from providers' own terms and EU and UK regulations, with links to each source. If an appeal is unlikely to work, the guide says so.",
      },
      {
        title: "Abuse control without tracking",
        body: "A honeypot field catches bots. A salted hash of the IP and an hourly limit counted in Postgres handle repeat submissions. The notice text is never logged.",
      },
      {
        title: "Each guide measures itself",
        body: "Every submission records its source page and campaign tags. This shows whether each guide attracts people who need help.",
      },
    ],
    builtWith: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Postgres", slug: "postgresql" },
      { name: "Resend", slug: "resend" },
    ],
    facts: [
      { label: "For", value: "Merchants with frozen payouts" },
      { label: "Platform", value: "Web" },
      { label: "Pricing", value: "Free guides; nothing for sale" },
      { label: "Role", value: "Solo: research, writing, code" },
    ],
    statusNote: "An experiment, started in November 2026. The guides are live and the question is whether merchants come looking for them.",
  },
];

export const PROJECTS_PATH = "/projects";

export const projectPath = (slug: string) => `${PROJECTS_PATH}/${slug}`;
