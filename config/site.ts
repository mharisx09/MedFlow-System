/**
 * Single source of truth for site content and contact details.
 *
 * Editable content lives here. Placeholder/sample data is flagged clearly
 * with comments — replace those values before publishing.
 */

export const siteConfig = {
  name: "Med Flow System",
  tagline: "Seamless clinical workflows — smarter connections, smoother care.",
  phone: "+1 (213) 890-6560",
  phoneHref: "tel:+12138906560",
  // PLACEHOLDER email — confirm the real mailbox before publishing.
  email: "info@medflowsystem.co",
  address: "Pittsburgh, PA",
  city: "Pittsburgh, Pennsylvania",
  founded: "2024",
  linkedin: "https://www.linkedin.com/company/med-flow-system/",
} as const;

/**
 * Canonical base URL for the site — used for canonical links, sitemap,
 * and structured data. Updates automatically when NEXT_PUBLIC_SITE_URL changes.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://medflow-system-six.vercel.app').replace(
  /\/$/,
  ''
);

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Specialties", href: "/specialties" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export interface ServiceStep {
  title: string;
  text: string;
}

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string[];
  benefits: string[];
  steps: ServiceStep[];
}

export const services: Service[] = [
  {
    slug: "medical-billing-and-claim-submission",
    title: "Medical Billing and Claim Submission",
    short:
      "Accurate, on-time claim submission so your practice gets paid faster with fewer rejections.",
    description: [
      "Our billing team prepares and submits clean claims to every payer, following each payer's specific formatting and documentation rules. Every claim is reviewed for accuracy before it goes out, which cuts down on rejections and speeds up payment.",
      "We track each claim from submission through adjudication and payment, posting payments and reconciling balances so your books always reflect reality. You get regular, easy-to-read reports that show exactly where your revenue stands.",
    ],
    benefits: [
      "Fewer claim rejections through pre-submission review",
      "Faster, more consistent cash flow",
      "Transparent reporting on submitted claims and payments",
      "Less paperwork for your front office and staff",
      "A dedicated team that knows your specialty's payer rules",
    ],
    steps: [
      {
        title: "Charge review",
        text: "We review your charges for completeness and coding accuracy before anything is submitted.",
      },
      {
        title: "Clean claim submission",
        text: "Claims go out to payers in the right format, on the right schedule, with all required documentation.",
      },
      {
        title: "Payment tracking",
        text: "We follow each claim through adjudication, post payments, and flag anything that stalls.",
      },
      {
        title: "Reporting",
        text: "You receive clear monthly reports on submissions, payments, and outstanding balances.",
      },
    ],
  },
  {
    slug: "insurance-eligibility-and-benefits-verification",
    title: "Insurance Eligibility and Benefits Verification",
    short:
      "Verify coverage before the visit to prevent surprises, denials, and unpaid balances.",
    description: [
      "Eligibility problems are one of the most common reasons claims get denied. We verify each patient's coverage, benefits, and cost-sharing details before the date of service, so your team knows what to collect and what the payer will pay.",
      "By catching inactive policies, coverage limits, and authorization requirements ahead of time, we help you avoid write-offs and reduce the number of claims that come back for eligibility reasons.",
    ],
    benefits: [
      "Fewer denials caused by eligibility issues",
      "Accurate patient responsibility estimates at check-in",
      "Higher point-of-service collections",
      "Advance notice of prior authorization requirements",
      "Smoother scheduling and registration workflows",
    ],
    steps: [
      {
        title: "Coverage check",
        text: "We confirm active coverage, plan type, and effective dates for each patient.",
      },
      {
        title: "Benefits breakdown",
        text: "We document deductibles, copays, coinsurance, and visit or dollar limits.",
      },
      {
        title: "Authorization flagging",
        text: "Services that need prior authorization are flagged before the appointment.",
      },
      {
        title: "Front-office handoff",
        text: "Clear summaries go to your front desk so collections happen at check-in.",
      },
    ],
  },
  {
    slug: "accounts-receivable-follow-up",
    title: "Accounts Receivable (AR) Follow-up",
    short:
      "Persistent, professional follow-up on unpaid claims to recover revenue stuck in AR.",
    description: [
      "Claims that sit in accounts receivable cost your practice money every day they go unresolved. We work your AR aging systematically — contacting payers, resolving holds, correcting errors, and re-billing when needed until every claim is paid or properly resolved.",
      "Our follow-up process prioritizes high-value and aging claims first, so your oldest dollars get attention quickly. You see measurable movement in your AR days and a steady reduction in write-offs.",
    ],
    benefits: [
      "Shorter AR days and steadier cash flow",
      "High-value and aging claims prioritized",
      "Systematic payer follow-up with documented outcomes",
      "Fewer claims written off as uncollectible",
      "Clear aging reports so you always know where things stand",
    ],
    steps: [
      {
        title: "AR analysis",
        text: "We review your aging buckets and identify the claims and payers causing delays.",
      },
      {
        title: "Prioritized outreach",
        text: "Payer representatives are contacted on a schedule, starting with the highest-impact claims.",
      },
      {
        title: "Issue resolution",
        text: "Holds, errors, and missing information are corrected and claims are re-submitted.",
      },
      {
        title: "Recovery tracking",
        text: "Every action and outcome is logged, and recovered revenue is reported back to you.",
      },
    ],
  },
  {
    slug: "denial-management-and-appeals",
    title: "Denial Management and Appeals",
    short:
      "Turn denied claims into paid claims with root-cause analysis and strong appeals.",
    description: [
      "Every denial is revenue waiting to be recovered. We investigate each denial to find the root cause — coding errors, missing documentation, medical necessity questions, or payer mistakes — and fix the underlying issue, not just the symptom.",
      "For denials worth fighting, we prepare and submit thorough appeals with the right clinical documentation and payer-specific language. We also track denial patterns so we can help you prevent the same denials from happening again.",
    ],
    benefits: [
      "Root-cause analysis on every denial",
      "Well-documented appeals that give claims the best chance",
      "Denial trend reporting to prevent repeat issues",
      "Faster turnaround from denial to re-payment",
      "Fewer denials over time as patterns are corrected",
    ],
    steps: [
      {
        title: "Denial review",
        text: "Each denial is categorized by reason and assessed for appeal value.",
      },
      {
        title: "Root-cause fix",
        text: "Coding, documentation, or submission errors behind the denial are corrected.",
      },
      {
        title: "Appeal preparation",
        text: "Appeals are built with supporting documentation and payer-specific requirements.",
      },
      {
        title: "Prevention",
        text: "Recurring denial patterns are reported with recommendations to stop them at the source.",
      },
    ],
  },
  {
    slug: "medical-coding",
    title: "Medical Coding",
    short:
      "Accurate CPT, ICD-10, and HCPCS coding that reflects the care you delivered.",
    description: [
      "Correct coding is the foundation of every clean claim. Our coders translate your clinical documentation into accurate CPT, ICD-10-CM, and HCPCS codes, following current guidelines so your coding reflects the full scope of care provided.",
      "Accurate coding protects your revenue in two directions: it prevents under-coding that leaves money on the table and over-coding that creates compliance risk. Every coded encounter goes through quality review before claims are generated.",
    ],
    benefits: [
      "Accurate CPT, ICD-10-CM, and HCPCS coding",
      "Coding that reflects the full scope of services rendered",
      "Quality review on coded encounters",
      "Support for coding questions and documentation improvement",
      "Specialty-aware coders who understand your workflow",
    ],
    steps: [
      {
        title: "Documentation review",
        text: "We review the clinical notes and encounter details for each visit.",
      },
      {
        title: "Code assignment",
        text: "Appropriate diagnosis and procedure codes are assigned per current guidelines.",
      },
      {
        title: "Quality audit",
        text: "Coded encounters are reviewed for accuracy and consistency.",
      },
      {
        title: "Feedback loop",
        text: "Documentation gaps are flagged with practical suggestions for improvement.",
      },
    ],
  },
  {
    slug: "provider-credentialing",
    title: "Provider Credentialing",
    short:
      "Get credentialed and enrolled with payers faster, with deadlines tracked for you.",
    description: [
      "Credentialing delays can keep a provider from billing for months. We manage the full credentialing and enrollment process — gathering documents, completing applications, following up with payers, and tracking every deadline — so your providers can start seeing patients and billing sooner.",
      "We also monitor re-credentialing dates and payer requirements on an ongoing basis, so your participation status never lapses unexpectedly.",
    ],
    benefits: [
      "Faster enrollment with commercial and government payers",
      "One team managing applications, documents, and follow-ups",
      "Deadline tracking for initial and re-credentialing",
      "Fewer delays between hiring and billing",
      "Organized credentialing files for audits and renewals",
    ],
    steps: [
      {
        title: "Document collection",
        text: "We gather licenses, certifications, malpractice coverage, and work history.",
      },
      {
        title: "Application submission",
        text: "Payer and facility applications are completed and submitted correctly the first time.",
      },
      {
        title: "Payer follow-up",
        text: "We track each application and follow up until enrollment is confirmed.",
      },
      {
        title: "Ongoing monitoring",
        text: "Re-credentialing dates and expiring documents are monitored continuously.",
      },
    ],
  },
  {
    slug: "prior-authorization",
    title: "Prior Authorization",
    short:
      "Authorizations obtained before care is delivered, so services don't get denied.",
    description: [
      "Prior authorization requirements keep growing, and missed authorizations mean denied claims and delayed care. We handle the authorization process end to end — checking requirements, submitting requests with clinical documentation, and following up until a decision is reached.",
      "By securing authorizations before the service date, we help your patients get timely care and your practice get paid without the back-and-forth of retroactive appeals.",
    ],
    benefits: [
      "Authorizations secured before the date of service",
      "Complete request submissions with clinical documentation",
      "Proactive follow-up with payers on pending decisions",
      "Fewer authorization-related denials",
      "Clear status updates for your scheduling team",
    ],
    steps: [
      {
        title: "Requirement check",
        text: "We confirm whether the planned service needs authorization for the patient's plan.",
      },
      {
        title: "Request submission",
        text: "Authorization requests are submitted with all required clinical documentation.",
      },
      {
        title: "Payer follow-up",
        text: "We track pending requests and follow up until an approval or denial is issued.",
      },
      {
        title: "Status communication",
        text: "Your team gets clear updates so appointments can be scheduled with confidence.",
      },
      {
        title: "Denial escalation",
        text: "If authorization is denied, we support peer-to-peer reviews and reconsideration.",
      },
    ],
  },
  {
    slug: "patient-billing-and-statements",
    title: "Patient Billing and Statements",
    short:
      "Clear, professional patient statements and support that get balances paid.",
    description: [
      "Patient balances are a growing share of practice revenue, but confusing statements and poor follow-up leave money uncollected. We produce clear, easy-to-understand statements and handle patient billing inquiries with professionalism and patience.",
      "Our process keeps patients informed at every step — from the first statement through gentle reminders — which improves collection rates while protecting your practice's reputation and patient relationships.",
    ],
    benefits: [
      "Clear, easy-to-read patient statements",
      "Professional handling of billing questions",
      "Consistent follow-up on outstanding balances",
      "Better patient collection rates",
      "Patient relationships protected by courteous communication",
    ],
    steps: [
      {
        title: "Balance review",
        text: "Patient balances are verified for accuracy before any statement is sent.",
      },
      {
        title: "Statement delivery",
        text: "Clear statements go out on a consistent schedule with payment options explained.",
      },
      {
        title: "Reminder follow-up",
        text: "Gentle, professional reminders follow for balances that remain open.",
      },
      {
        title: "Inquiry support",
        text: "Patient questions about bills are answered clearly and promptly.",
      },
    ],
  },
];

export interface Specialty {
  name: string;
  blurb: string;
}

export const specialties: Specialty[] = [
  {
    name: "Primary Care",
    blurb:
      "High-volume visit billing with preventive, chronic care, and wellness coding handled accurately.",
  },
  {
    name: "Dental",
    blurb:
      "Dental billing and claims support tuned to the unique rules of dental payers and procedures.",
  },
  {
    name: "Mental Health",
    blurb:
      "Sensitive, detail-oriented billing for therapy and behavioral health services with complex authorization rules.",
  },
  {
    name: "Cardiology",
    blurb:
      "Cardiology billing that captures diagnostic, interventional, and follow-up services correctly.",
  },
  {
    name: "Orthopedics",
    blurb:
      "Orthopedic billing support for surgical, procedural, and therapy-based episodes of care.",
  },
  {
    name: "Urgent Care",
    blurb:
      "Fast-turn billing for urgent care's high-volume, walk-in visit model with varied payer rules.",
  },
  {
    name: "Physical Therapy",
    blurb:
      "PT billing with careful attention to visit limits, modifiers, and authorization requirements.",
  },
  {
    name: "More Specialties",
    blurb: "We support many other specialties — ask us about yours.",
  },
];

/**
 * Systems the team works with. Present these as chips labeled as systems the
 * team works with — page copy must add "We adapt to your EHR and practice
 * management system." (We make no claim of official partnership with vendors.)
 */
export const softwareList = [
  "Epic",
  "athenahealth",
  "eClinicalWorks",
  "NextGen",
  "Allscripts",
  "Kareo",
  "AdvancedMD",
  "DrChrono",
  "Practice Fusion",
] as const;

export interface FaqItem {
  question: string;
  answer: string;
}

export const defaultFaqs: FaqItem[] = [
  {
    question: "What services does Med Flow System provide?",
    answer:
      "We provide full-cycle medical billing and revenue cycle management for US healthcare practices, including claim submission, insurance eligibility verification, accounts receivable follow-up, denial management and appeals, medical coding, provider credentialing, prior authorization, and patient billing and statements.",
  },
  {
    question: "How does your pricing work?",
    answer:
      "Our pricing is based on a percentage of the collections we help you recover, so our success is directly tied to yours. The exact rate depends on your specialty, claim volume, and the services you need. Contact us for a custom quote — there are no long-term contracts required to get started.",
  },
  {
    question: "How does onboarding work?",
    answer:
      "Onboarding starts with a discovery call where we learn about your practice, specialty, and current billing workflow. We then collect the necessary access and documentation, set up your account in our system, and begin a transition period where we run in parallel with your existing process to ensure nothing falls through the cracks. Most practices are fully transitioned within a few weeks.",
  },
  {
    question: "Is my practice's data secure?",
    answer:
      "Yes. We follow HIPAA-compliant workflows, limit data access to authorized team members, and use secure systems for handling all practice and patient information. Protecting your data is a core part of how we operate.",
  },
  {
    question: "Will I lose visibility into my billing?",
    answer:
      "No — the opposite. You receive regular, easy-to-read reports on claims, payments, denials, and accounts receivable, and you can reach our team any time with questions. Many practices tell us they have better visibility working with us than they did handling billing in-house.",
  },
  {
    question: "What if I only need help with one part of billing?",
    answer:
      "That's completely fine. While many clients use our full revenue cycle service, you can also engage us for individual services such as denial management, AR follow-up, credentialing, or prior authorization. We'll build a plan around the specific gaps in your workflow.",
  },
];

export interface PlaceholderStat {
  value: number;
  suffix: string;
  label: string;
  note: string;
}

/**
 * SAMPLE numbers for layout design only.
 * EDITABLE PLACEHOLDER — replace with real numbers before publishing.
 */
export const placeholderStats: PlaceholderStat[] = [
  {
    value: 98,
    suffix: "%",
    label: "Clean claim rate",
    note: "EDITABLE PLACEHOLDER — replace with real numbers before publishing",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Dedicated support availability",
    note: "EDITABLE PLACEHOLDER — replace with real numbers before publishing",
  },
  {
    value: 30,
    suffix: "+",
    label: "Days shaved off average AR (sample)",
    note: "EDITABLE PLACEHOLDER — replace with real numbers before publishing",
  },
  {
    value: 100,
    suffix: "%",
    label: "HIPAA-compliant workflows",
    note: "EDITABLE PLACEHOLDER — replace with real numbers before publishing",
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  draft: boolean;
}

/**
 * Published blog articles — real educational content for practice owners.
 * Manage posts (create/edit) from the admin dashboard; these are the defaults.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "denial-management-tips",
    title: "Denial Management Tips for Medical Practices",
    excerpt:
      "Denied claims drain revenue, yet most are preventable. Learn how to track denial patterns, appeal faster, and fix the front-end processes that cause them.",
    content: `Denied claims are one of the biggest drains on a practice's revenue, yet many are preventable. The first step is tracking: if you don't categorize denials by reason, you can't fix the patterns behind them. Build a simple monthly report that groups denials by cause — eligibility, coding, authorization, medical necessity — and you'll quickly see where your effort belongs.

The second step is speed. Denials have appeal deadlines, and every day a denial sits untouched is a day closer to losing the revenue permanently. Assign ownership of denials so each one has a person responsible for working it to resolution, and set clear turnaround targets.

Third, fix the front end. Most denials are born upstream: wrong patient demographics, unverified eligibility, or missing authorizations. Strengthening registration and verification processes prevents far more denials than even the best appeals team can recover.

Finally, treat every appeal as a case worth making. Well-documented appeals that reference the payer's own policies and include complete clinical documentation win far more often than template letters. Track your appeal success rate by payer — it tells you where appeals pay off and where process changes are needed instead.

If your team doesn't have the bandwidth to work denials systematically, that's exactly where a dedicated billing partner earns its keep.`,
    date: "2026-09-15",
    draft: false,
  },
  {
    slug: "ar-follow-up-best-practices",
    title: "AR Follow-Up Best Practices for Steady Cash Flow",
    excerpt:
      "Disciplined AR follow-up is the highest-return activity in revenue cycle management. Here is how to segment, document, and work your aging buckets.",
    content: `Accounts receivable is the pulse of your practice's financial health. The goal is simple: keep AR days low and make sure every dollar of earned revenue is actually collected. That requires a disciplined, repeatable follow-up process — not occasional cleanup sprints.

Start by segmenting your AR. High-value and aging claims deserve attention first, so work your aging buckets in priority order rather than randomly. A claim that is 120 days old needs a different strategy than one that is 30 days old, and knowing the difference is what separates good follow-up from busywork.

Second, document everything. Every payer call, every reference number, every promise of payment should be logged. When a claim comes back unpaid again, that history is what lets you escalate effectively instead of starting from zero.

Third, set a cadence and stick to it. Payer follow-up works best on a schedule — claims touched every 7 to 14 days move; claims touched once and forgotten don't. Build the cadence into your weekly workflow and measure it like any other operational metric.

Fourth, close the loop on root causes. If the same payer keeps stalling the same type of claim, the fix isn't more follow-up — it's a process change upstream, whether that's better documentation, a different coding approach, or a corrected enrollment.

Consistent AR follow-up is one of the highest-return activities in revenue cycle management, and it's also one of the first things to slip when staff are stretched thin.`,
    date: "2026-09-01",
    draft: false,
  },
  {
    slug: "choosing-a-billing-partner",
    title: "How to Choose the Right Medical Billing Partner",
    excerpt:
      "Choosing a billing partner is a multi-year decision. Evaluate specialty experience, transparency, pricing, denial workflows, and the transition plan.",
    content: `Choosing a billing partner is a decision you'll live with for years, so it's worth evaluating carefully. The first thing to look for is specialty experience: billing rules vary enormously between specialties, and a partner who knows yours will spot problems a generalist misses.

Second, ask about transparency. You should receive regular reports on claims, payments, denials, and AR — and you should be able to reach a real person who knows your account. If a billing company can't clearly explain what they're doing with your revenue cycle, keep looking.

Third, understand the pricing model and what's included. Percentage-of-collections pricing aligns incentives, but make sure you know exactly which services are covered, whether there are setup fees or minimums, and how contract terms and termination work.

Fourth, ask about their process for denials and AR follow-up. This is where the real value lives. A partner should be able to describe their denial workflow, their follow-up cadence, and how they report results — in concrete terms, not vague promises.

Finally, check the transition plan. A good partner runs in parallel with your existing process during onboarding so nothing falls through the cracks, and they should be able to tell you exactly what they'll need from your team and when.

Take your time, ask hard questions, and choose the partner that treats your revenue like their own.`,
    date: "2026-08-18",
    draft: false,
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

/**
 * Homepage testimonials. Edit the quotes here directly.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Our denials dropped noticeably within the first two months, and for the first time we actually understand our own revenue reports.",
    name: "Practice Manager",
    role: "Family Medicine Clinic",
    initials: "PM",
  },
  {
    quote:
      "Claims go out clean and payments come back faster. Their team feels like an extension of our front office, not an outside vendor.",
    name: "Office Administrator",
    role: "Dental Practice",
    initials: "OA",
  },
  {
    quote:
      "Switching our billing over was the best operational decision we made this year. AR is down and my staff finally focuses on patients.",
    name: "Clinic Director",
    role: "Urgent Care Center",
    initials: "CD",
  },
];
