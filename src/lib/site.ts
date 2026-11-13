export const SITE = {
  name: "Tried This Week",
  shortName: "TTW",
  tagline: "We installed it in a game project this week.",
  description:
    "A weekly hands-on lab for indie game makers who vibe-code. Each issue installs three AI tools in Godot, Unity, or a web-game stack, then publishes a keep-or-drop verdict plus commercial-use and store-disclosure notes.",
  url: "https://lexxicsl.github.io",
  base: "/tried-this-week",
  origin: "https://lexxicsl.github.io/tried-this-week",
  github: "https://github.com/lexxicsl/tried-this-week",
  locale: "en_US",
  lang: "en",
  themeColor: "#0e0c0a",
  ogImage: "/og.png",
} as const;

function isFilePath(path: string): boolean {
  return /\.[a-zA-Z0-9]+$/.test(path);
}

export function withBase(path = "/"): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `${base}/`;
  if (isFilePath(clean)) return `${base}${clean.replace(/\/$/, "")}`;
  return `${base}${clean.endsWith("/") ? clean : `${clean}/`}`;
}

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  const origin = SITE.url.replace(/\/$/, "");
  const resolved = path.startsWith("/") ? withBase(path) : withBase(`/${path}`);
  return `${origin}${resolved}`;
}

export const NAV = [
  { href: "/issues/", label: "Issues" },
  { href: "/about/", label: "About" },
  { href: "/disclosures/", label: "Disclosures" },
] as const;

export const FAQ = [
  {
    q: "What is Tried This Week?",
    a: "A Monday lab for indie game makers who vibe-code. Each issue takes three AI tools, installs them in Godot, Unity, or a web-game stack, and publishes a keep-or-drop verdict with commercial-use and store-disclosure notes.",
  },
  {
    q: "Do you actually install the tools?",
    a: "Yes, when an item is labeled Tried. Tried means it was installed in a real game project and run through a fixed checklist. Reported means we only read public docs or coverage, and we say so. We never imply a test that did not happen.",
  },
  {
    q: "What do Keep and Drop mean?",
    a: "Keep means the tool earned a place in the test project for the job we gave it. Drop means we would not rely on it for that job, given what broke, what the plan allows, or what you would have to disclose. Verdicts are about a specific job and stack, not a moral score for the product.",
  },
  {
    q: "Can a sponsor buy a Keep verdict?",
    a: "No. Money cannot buy a verdict. Sponsored items, when we have them, are labeled as sponsored and kept out of the verdict slot. Affiliate links, when we have them, are disclosed. See the Disclosures page.",
  },
  {
    q: "What engines and stacks do you test in?",
    a: "Godot, Unity, or a web-game stack, depending on the tool. Each card names the engine or stack we used. If we cannot install a tool honestly — for example it needs a paid plan we do not have — we flag it as Reported or skip it instead of inventing a result.",
  },
  {
    q: "How do I get the newsletter?",
    a: "The signup form on this site is a placeholder until a Beehiiv or Substack list is connected. It does not collect email yet. Check back, or watch the site: issues will also be published on the web with no signup wall.",
  },
  {
    q: "Can I suggest a tool to install?",
    a: "Yes. Once the newsletter is live, every issue will end with an ask for what to install next. Until then, you can open a GitHub issue on the site repo.",
  },
] as const;
