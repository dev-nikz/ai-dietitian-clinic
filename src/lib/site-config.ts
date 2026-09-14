import { siteMode } from "./site-mode";

// -----------------------------------------------------------------------
// SAFETY MODEL
// This file is committed to the PUBLIC repo, so every value that could
// identify the real pitch client (name, clinic, address, phone, bio
// specifics) must never be hardcoded here — not even inside a "pitch"
// branch. Real values are read from NEXT_PUBLIC_PITCH_* env vars, which
// live only in the gitignored .env.local. If those vars are absent
// (e.g. anyone who clones the public repo, or portfolio mode itself),
// every field silently falls back to the generic portfolio copy below.
// -----------------------------------------------------------------------

type Credential = { value: string; label: string };
type Service = { title: string; description: string };

type SiteContent = {
  brandName: string;
  eyebrow: string;
  tagline: string;
  heroLead: string;
  credentials: Credential[];
  aboutBio: string[];
  aboutHighlights: string[];
  address: string;
  phoneDisplay: string;
  email: string;
  whatsappNumber: string; // digits only, E.164 without "+"; empty = demo/disabled
  instagramUrl: string; // empty = hidden
  practoConnected: boolean;
};

const portfolioContent: SiteContent = {
  brandName: "Nourish Clinic",
  eyebrow: "Nourish Clinic · Delhi (concept)",
  tagline: "A concept dietitian-practice site — demo content only, not a real clinic.",
  heroLead:
    "Clinical nutrition built on published research, not a generic meal plan — from a PhD-level practice that studies how nutrition actually works in the body.",
  credentials: [
    { value: "PhD", label: "Nutrition Science" },
    { value: "5+", label: "Published Studies" },
    { value: "50+", label: "Patients / Day" },
    { value: "15 yrs", label: "Clinical Practice" },
  ],
  aboutBio: [
    "This concept practice is led by a PhD-level clinical dietitian whose approach starts with published research, not a templated meal plan.",
    "Every plan is built around the patient's own labs, history, and daily routine — reviewed and adjusted over time, not handed over once and forgotten.",
  ],
  aboutHighlights: [
    "PhD in Nutrition Science",
    "Peer-reviewed published research",
    "Clinical affiliation with a teaching hospital",
    "15 years in practice",
  ],
  address: "Delhi, India (concept — address shown only in pitch mode)",
  phoneDisplay: "Demo mode — contact number connects here",
  email: "",
  whatsappNumber: "",
  instagramUrl: "",
  practoConnected: false,
};

// Reads a NEXT_PUBLIC_PITCH_* var; falls back to the matching portfolio
// value whenever the var is missing or empty (public clone, or portfolio mode).
function pitchStr(envValue: string | undefined, fallback: string): string {
  return envValue && envValue.trim().length > 0 ? envValue : fallback;
}

function pitchCredentials(): Credential[] {
  const raw = process.env.NEXT_PUBLIC_PITCH_CREDENTIALS_JSON;
  if (!raw) return portfolioContent.credentials;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every((c) => c && typeof c.value === "string" && typeof c.label === "string")) {
      return parsed as Credential[];
    }
  } catch {
    // fall through to generic
  }
  return portfolioContent.credentials;
}

function pitchList(raw: string | undefined, fallback: string[]): string[] {
  if (!raw) return fallback;
  const items = raw.split("|").map((s) => s.trim()).filter(Boolean);
  return items.length > 0 ? items : fallback;
}

function pitchContent(): SiteContent {
  const env = process.env;
  return {
    brandName: pitchStr(env.NEXT_PUBLIC_PITCH_BRAND_NAME, portfolioContent.brandName),
    eyebrow: pitchStr(env.NEXT_PUBLIC_PITCH_EYEBROW, portfolioContent.eyebrow),
    tagline: pitchStr(env.NEXT_PUBLIC_PITCH_TAGLINE, portfolioContent.tagline),
    heroLead: pitchStr(env.NEXT_PUBLIC_PITCH_HERO_LEAD, portfolioContent.heroLead),
    credentials: pitchCredentials(),
    aboutBio: pitchList(env.NEXT_PUBLIC_PITCH_ABOUT_BIO, portfolioContent.aboutBio),
    aboutHighlights: pitchList(env.NEXT_PUBLIC_PITCH_ABOUT_HIGHLIGHTS, portfolioContent.aboutHighlights),
    address: pitchStr(env.NEXT_PUBLIC_PITCH_ADDRESS, portfolioContent.address),
    phoneDisplay: pitchStr(env.NEXT_PUBLIC_PITCH_PHONE_DISPLAY, portfolioContent.phoneDisplay),
    email: pitchStr(env.NEXT_PUBLIC_PITCH_EMAIL, portfolioContent.email),
    whatsappNumber: pitchStr(env.NEXT_PUBLIC_PITCH_WHATSAPP_NUMBER, portfolioContent.whatsappNumber),
    instagramUrl: pitchStr(env.NEXT_PUBLIC_PITCH_INSTAGRAM_URL, portfolioContent.instagramUrl),
    practoConnected: env.NEXT_PUBLIC_PITCH_PRACTO_CONNECTED === "true",
  };
}

export function getSiteContent(): SiteContent {
  return siteMode === "pitch" ? pitchContent() : portfolioContent;
}

// Service categories are generic clinical offerings, not identifying —
// safe to share between portfolio and pitch mode. Matches the real
// clinic's own specialty list so the pitch demo has full feature parity.
export const services: Service[] = [
  {
    title: "Obesity & Weight Loss",
    description:
      "Evidence-based fat-loss and metabolic health plans, adjusted from lab work and progress data — not a fixed calorie sheet.",
  },
  {
    title: "Therapeutic Diet",
    description:
      "Structured nutrition therapy for diabetes, thyroid, PCOS, and other clinical conditions, coordinated with your treating physician.",
  },
  {
    title: "Child Health Diets",
    description: "Growth-focused nutrition plans for children, built around real eating habits, not rigid rules.",
  },
  {
    title: "Wellness Program",
    description: "Ongoing preventive nutrition coaching for long-term metabolic and lifestyle health.",
  },
  {
    title: "Bariatric Diets",
    description: "Pre- and post-bariatric surgery nutrition support, including advanced bariatric-specific training.",
  },
  {
    title: "Diet in Geriatric / Old Age",
    description: "Nutrition plans adapted for aging bodies — bone health, appetite changes, and medication interactions.",
  },
  {
    title: "Skin Health with Pre-Wedding",
    description: "Nutrition-led skin and wellness prep for pre-wedding timelines.",
  },
  {
    title: "Diet in Pregnancy & Lactation",
    description: "Maternal nutrition plans balancing energy needs, lactation support, and safe weight management.",
  },
  {
    title: "Gym Diet",
    description: "Performance and recovery nutrition built around training load and body-composition goals.",
  },
  {
    title: "Weight Gain Diets",
    description: "Structured plans to gain weight the healthy way, without relying on empty calories.",
  },
];
