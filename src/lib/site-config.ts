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
type ServiceSection = { heading: string; body?: string; bullets?: string[] };
type Service = {
  slug: string;
  title: string;
  description: string;
  detail: { intro: string; sections: ServiceSection[] };
};

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
  facebookUrl: string; // empty = hidden
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
  facebookUrl: "",
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
    facebookUrl: pitchStr(env.NEXT_PUBLIC_PITCH_FACEBOOK_URL, portfolioContent.facebookUrl),
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
    slug: "obesity-weight-loss",
    title: "Obesity & Weight Loss",
    description:
      "Evidence-based fat-loss and metabolic health plans, adjusted from lab work and progress data — not a fixed calorie sheet.",
    detail: {
      intro:
        "Obesity is a medical condition, not a cosmetic one — in India, a BMI above 25 is classed as obese, and sustained excess weight raises the risk of diabetes, hypertension, and heart disease. A structured plan changes that trajectory.",
      sections: [
        {
          heading: "What sustained excess weight puts at risk",
          bullets: [
            "Hypertension and heart disease",
            "Diabetes and PCOD",
            "Infertility and pregnancy complications",
            "Osteoarthritis and sleep apnea",
            "Elevated risk of certain cancers",
          ],
        },
        {
          heading: "How the plan is built",
          bullets: [
            "A full dietary recall — current eating patterns and lifestyle",
            "Body composition analysis — fat levels and realistic targets",
            "A personalized diet plan built for sustainable results, not a crash diet",
          ],
        },
        {
          heading: "What to expect",
          body: "The target is a healthy 3–5 kg per month, with visible change within the first few weeks — through regular meals at consistent intervals, all food groups represented, and no extended gaps between meals.",
        },
        {
          heading: "Beyond the number on the scale",
          bullets: [
            "Improved fertility and insulin sensitivity",
            "Better glucose control and lower chronic-disease risk",
            "More energy, better skin and hair, less joint pain",
            "Better sleep and lower anxiety",
          ],
        },
      ],
    },
  },
  {
    slug: "therapeutic-diet",
    title: "Therapeutic Diet",
    description:
      "Structured nutrition therapy for diabetes, thyroid, PCOS, and other clinical conditions, coordinated with your treating physician.",
    detail: {
      intro:
        "Specialized therapeutic diets for diabetes, hypertension, hypothyroidism, PCOD, chronic kidney disease, fatty liver, and more — each condition managed with its own dietary logic, alongside your treating physician.",
      sections: [
        {
          heading: "Dyslipidemia & heart disease",
          body: "Lower cholesterol and triglycerides, raise HDL, through fiber-rich, low-fat eating.",
        },
        {
          heading: "Hypertension",
          body: "Lower sodium and saturated fat, more potassium-rich foods, alongside regular activity.",
        },
        {
          heading: "Hypothyroidism",
          body: "Foods that support thyroid function, while limiting known goitrogens.",
        },
        {
          heading: "Gout (elevated uric acid)",
          body: "Cut purine-rich foods, prioritize hydration and weight management.",
        },
        {
          heading: "Diabetes",
          body: "Diet and lifestyle account for roughly half of diabetes management — customized carbohydrate distribution and high-fiber meals do the rest.",
        },
        {
          heading: "Digestive health & PCOD/PCOS",
          body: "High-fiber, well-hydrated eating for digestion; anti-inflammatory, weight-focused plans for hormonal balance.",
        },
      ],
    },
  },
  {
    slug: "child-health-diets",
    title: "Child Health Diets",
    description: "Growth-focused nutrition plans for children, built around real eating habits, not rigid rules.",
    detail: {
      intro:
        "Nutrition needs shift constantly through childhood — plans are built by age band, from 0–3 months through the young-teen years, around how a child actually eats.",
      sections: [
        {
          heading: "Age bands covered",
          bullets: ["0–3 months", "3–6 months", "6–12 months", "1–3 years", "3–6 years", "7–9 years", "10–12 years"],
        },
        {
          heading: "Pre-schoolers",
          body: "Poor early eating habits raise the risk of protein-energy malnutrition, anemia, and Vitamin A deficiency — addressed with a well-balanced diet, food variety, and better eating habits, including at school.",
        },
        {
          heading: "Adolescence",
          body: "Rapid growth and hormonal change bring their own concerns — PCOD, disordered eating, and body-image pressure. Counselling alongside a practical, balanced diet matters as much as the food itself.",
        },
      ],
    },
  },
  {
    slug: "bariatric-diets",
    title: "Bariatric Diets",
    description: "Pre- and post-bariatric surgery nutrition support, including advanced bariatric-specific training.",
    detail: {
      intro:
        "For severe obesity (typically BMI over 35) that hasn't responded to conventional approaches, bariatric surgery — done in coordination with a bariatric surgeon — is sometimes the right option, with nutrition support before and after.",
      sections: [
        {
          heading: "Procedure types",
          bullets: [
            "Laparoscopic gastric banding",
            "Laparoscopic sleeve gastrectomy",
            "Laparoscopic Roux-en-Y gastric bypass",
          ],
        },
        {
          heading: "The nutrition side",
          body: "Pre-operative evaluation and dietary preparation, then structured post-operative nutrition through recovery, with long-term follow-up so the weight loss holds — through diet and activity, not just the procedure itself.",
        },
      ],
    },
  },
  {
    slug: "skin-health-pre-wedding",
    title: "Skin Health with Pre-Wedding",
    description: "Nutrition-led skin and wellness prep for pre-wedding timelines.",
    detail: {
      intro:
        "Skin health has a real nutritional component — certain foods and eating patterns act as triggers for conditions like acne, atopic dermatitis, psoriasis, and rosacea, while others help. Whole-food-forward eating tends to help skin conditions generally.",
      sections: [
        {
          heading: "Why it matters more around a wedding",
          body: "Weddings are a common reason people prioritize skin, hair, and overall glow — a personalized diet built around your actual daily schedule supports that, alongside general skin and hair health.",
        },
      ],
    },
  },
  {
    slug: "pregnancy-lactation",
    title: "Diet in Pregnancy & Lactation",
    description: "Maternal nutrition plans balancing energy needs, lactation support, and safe weight management.",
    detail: {
      intro:
        "Pregnancy is a period of real physiological demand — a mother's nutrition, both before conception and during pregnancy, directly shapes the health of the newborn. Plans are built by trimester, and separately for nursing mothers.",
      sections: [
        {
          heading: "What the plan prioritizes",
          bullets: ["Plenty of vegetables and fresh fruit", "Whole grains", "Lean protein", "Healthy fats", "Adequate hydration"],
        },
        {
          heading: "Why it matters",
          body: "Inadequate nutrition during pregnancy raises the risk of real complications, including prolonged labor — proper nutrition is protective, not optional.",
        },
      ],
    },
  },
  {
    slug: "gym-diet",
    title: "Gym Diet",
    description: "Performance and recovery nutrition built around training load and body-composition goals.",
    detail: {
      intro:
        "Training only works as hard as the nutrition behind it — meal timing, protein intake, and recovery nutrition are built around your actual training schedule and goals, not a generic bodybuilder template.",
      sections: [
        {
          heading: "What's covered",
          bullets: [
            "Protein and calorie targets matched to training load",
            "Pre- and post-workout meal timing",
            "Hydration and electrolyte planning",
            "Adjustments as training volume or goals change",
          ],
        },
      ],
    },
  },
  {
    slug: "weight-gain-diets",
    title: "Weight Gain Diets",
    description: "Structured plans to gain weight the healthy way, without relying on empty calories.",
    detail: {
      intro:
        "A fully balanced, structured weekly plan for gaining weight — no medicines or supplements. Age, height, lifestyle, and current eating habits set the daily energy target the plan is built around.",
      sections: [
        {
          heading: "How it works",
          body: "A customized diet program matched to lifestyle and weight-gain goals, paired with a suitable exercise plan to support the process — most people notice a difference within the first week.",
        },
      ],
    },
  },
  {
    slug: "wellness-program",
    title: "Wellness Program",
    description: "Ongoing preventive nutrition coaching for long-term metabolic and lifestyle health.",
    detail: {
      intro:
        "Food plays a direct role in preventing and managing disease, not just maintaining weight. This program builds a customized, ongoing plan around your actual life — reviewed and adjusted, not handed over once.",
      sections: [
        {
          heading: "How progress is tracked",
          body: "Body composition analysis (BMI and body fat against healthy targets for your height and age), followed by a detailed review of daily diet and activity, with the plan reformulated weekly as progress is tracked.",
        },
        {
          heading: "The one rule",
          body: "No plan is built in a way that leaves a patient feeling starved or uncomfortable. No medicines, no strenuous exercise mandates, no starvation.",
        },
      ],
    },
  },
  {
    slug: "geriatric-diet",
    title: "Diet in Geriatric / Old Age",
    description: "Nutrition plans adapted for aging bodies — bone health, appetite changes, and medication interactions.",
    detail: {
      intro:
        "Aging brings a progressive change in how the body processes food — reduced digestion and absorption, and often less appetite — while the need for vitamins and minerals stays just as high as in younger adults, even as calorie needs fall.",
      sections: [
        {
          heading: "What changes with age",
          body: "Slower metabolism and lower activity mean fewer calories and smaller portions are needed — but the same amount of vitamins and minerals is still required, which is where a generic diet falls short.",
        },
      ],
    },
  },
];
