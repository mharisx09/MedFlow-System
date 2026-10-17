/**
 * Single source of truth for site content and contact details.
 *
 * Editable content lives here. Placeholder/sample data is flagged clearly
 * with comments, replace those values before publishing.
 */

export const siteConfig = {
  name: "Med Flow System",
  tagline: "Seamless clinical workflows, smarter connections, smoother care.",
  phone: "+1 (213) 890-6560",
  phoneHref: "tel:+12138906560",
  // PLACEHOLDER email, confirm the real mailbox before publishing.
  email: "info@medflowsystem.co",
  address: "Pittsburgh, PA",
  city: "Pittsburgh, Pennsylvania",
  founded: "2024",
  linkedin: "https://www.linkedin.com/company/med-flow-system/",
} as const;

/**
 * Canonical base URL for the site, used for canonical links, sitemap,
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
      "Our service is built for small practices with 1 to 10 providers, the segment most billing companies overlook. You work directly with the people handling your claims, not a ticketing queue. Our workflows adapt to your specialty, your EHR, and your payer mix, because a solo therapist and a five-provider urgent care don't bill the same way. Transparent monthly reporting shows every claim submitted, every payment posted, and every denial worked, so you always know exactly what your billing partner is doing.",
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
    slug: "advanced-eligibility-verification",
    title: "Advanced Eligibility Verification",
    short:
      "Multi-touch eligibility checks that catch what basic verification misses, before it costs you.",
    description: [
      "Basic eligibility checks confirm a policy is active. Advanced eligibility goes further: we re-verify coverage at multiple points before the visit, uncover secondary and tertiary coverage that standard checks miss, and analyze out-of-network benefits so every patient encounter is financially cleared before it happens.",
      "For practices with high-value procedures, recurring visits, or complex payer mixes, this deeper layer of verification prevents the eligibility denials that slip through standard checks, protecting revenue on the encounters that matter most.",
    ],
    benefits: [
      "Multiple verification touches before each visit, 7-day, 72-hour, and 24-hour checks",
      "Coordination of benefits discovery, we find secondary coverage others miss",
      "Out-of-network benefit analysis with accurate patient cost estimates",
      "Ongoing eligibility monitoring for recurring and long-term patients",
      "Fewer eligibility denials on high-value procedures",
    ],
    steps: [
      {
        title: "Deep coverage analysis",
        text: "Beyond active or inactive, we verify plan details, network status, and benefit limits in depth.",
      },
      {
        title: "COB discovery",
        text: "We search for secondary and tertiary coverage so claims go to the right payer the first time.",
      },
      {
        title: "Multi-touch re-verification",
        text: "Coverage is re-checked at set intervals before the visit to catch last-minute changes.",
      },
      {
        title: "Financial clearance report",
        text: "Your team gets a clear go or no-go with patient responsibility confirmed before the appointment.",
      },
    ],
  },
  {
    slug: "accounts-receivable-follow-up",
    title: "Accounts Receivable (AR) Follow-up",
    short:
      "Persistent, professional follow-up on unpaid claims to recover revenue stuck in AR.",
    description: [
      "Claims that sit in accounts receivable cost your practice money every day they go unresolved. We work your AR aging systematically, contacting payers, resolving holds, correcting errors, and re-billing when needed until every claim is paid or properly resolved.",
      "Our follow-up process prioritizes high-value and aging claims first, so your oldest dollars get attention quickly. You see measurable movement in your AR days and a steady reduction in write-offs.",
      "For small practices, AR follow-up is usually the first thing to slip when staff are stretched thin, and it's the highest-return activity in the revenue cycle. The MGMA benchmark for a well-run practice is 30 to 35 days in AR; anything over 50 signals revenue loss. Our team touches claims on a 7 to 14 day cadence, documents every payer interaction with reference numbers, and escalates stalled claims instead of letting them age. Most small practices see AR days drop within the first two months.",
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
      "Every denial is revenue waiting to be recovered. We investigate each denial to find the root cause, coding errors, missing documentation, medical necessity questions, or payer mistakes, and fix the underlying issue, not just the symptom.",
      "For denials worth fighting, we prepare and submit thorough appeals with the right clinical documentation and payer-specific language. We also track denial patterns so we can help you prevent the same denials from happening again.",
      "Small practices feel denials hardest. A five-provider clinic doesn't have a denials department, it has an office manager already doing three jobs. Our denial management is built for that reality: we categorize every denial by reason, work them on a strict cadence so appeal deadlines never slip, and report monthly on the patterns driving your denials. The MGMA benchmark for first-pass denial rates is 7 to 8 percent, and disciplined practices get under 5 percent. If your rate is above 10 percent, our process typically cuts it significantly within two quarters by fixing front-end causes, not just appealing harder.",
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
      "For small practices, coding is often done by whoever has a spare minute, which is how revenue leaks. Under-coding a level 4 visit as level 3 across hundreds of encounters adds up to tens of thousands a year. Our coders know the documentation requirements that support higher-level codes legitimately, and we flag documentation gaps with practical fixes your providers can actually use.",
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
      "Credentialing delays can keep a provider from billing for months. We manage the full credentialing and enrollment process, gathering documents, completing applications, following up with payers, and tracking every deadline, so your providers can start seeing patients and billing sooner.",
      "We also monitor re-credentialing dates and payer requirements on an ongoing basis, so your participation status never lapses unexpectedly.",
      "Commercial credentialing takes 90 to 120 days and Medicaid up to 6 months, which is why we start 4 to 6 months before a provider's go-live date. For a small practice adding one provider, every month of delay is a month of salary paid with no collections to offset it. We submit clean applications, follow up on schedule, and catch document problems before payers use them as an excuse to stall.",
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
      "Prior authorization requirements keep growing, and missed authorizations mean denied claims and delayed care. We handle the authorization process end to end, checking requirements, submitting requests with clinical documentation, and following up until a decision is reached.",
      "By securing authorizations before the service date, we help your patients get timely care and your practice get paid without the back-and-forth of retroactive appeals.",
      "The average physician now deals with 40 prior authorizations per week, eating 13 hours of staff time. Small practices feel this hardest because there is no dedicated auth team, just whoever can squeeze it between patients. We run authorizations with payer-specific checklists, complete clinical documentation on first submission, and relentless follow-up, so approvals come faster and fewer services get delayed or denied.",
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
      "Our process keeps patients informed at every step, from the first statement through gentle reminders, which improves collection rates while protecting your practice's reputation and patient relationships.",
      "With high-deductible plans now the norm, small practices collect more than ever directly from patients, yet most have no system for it beyond sending a statement and hoping. We run patient billing like a process: accurate balances verified before anything goes out, statements patients can actually understand, consistent reminder cadence, and courteous handling of every question. Practices that systematize patient collections typically recover 20 to 30 percent more of their patient AR.",
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
    blurb: "We support many other specialties, ask us about yours.",
  },
];

export interface SpecialtyPage {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  intro: string[];
  painPoints: { title: string; text: string }[];
  howWeHelp: string[];
  stats: { value: string; label: string }[];
}

/**
 * Dedicated landing pages for high-opportunity specialties.
 * Each targets a winnable keyword for small-practice commercial intent.
 */
export const specialtyPages: SpecialtyPage[] = [
  {
    slug: "behavioral-health-billing",
    name: "Behavioral Health",
    title: "Behavioral Health Billing Services for Small Practices",
    metaDescription:
      "Billing for therapists, counselors, and behavioral health practices. We handle authorizations, session billing, and credentialing so you can focus on clients.",
    intro: [
      "Behavioral health billing is some of the most complex in healthcare: session-based codes, strict authorization requirements, varying session limits by payer, and credentialing hurdles that delay everything. For a solo therapist or small group practice, managing it in-house eats hours every week.",
      "We specialize in billing for therapists, counselors, psychologists, and behavioral health clinics with 1 to 10 providers. Our team knows the authorization maze, the session-limit rules, and the documentation that gets claims paid.",
    ],
    painPoints: [
      {
        title: "Authorization hell",
        text: "Most payers require prior authorization for therapy, with session limits that vary by plan. Miss the auth or exceed the limit without re-authorization, and the claim denies.",
      },
      {
        title: "Credentialing delays",
        text: "Getting credentialed with commercial payers takes 90 to 120 days. New therapists often can't bill for months while applications sit in queues.",
      },
      {
        title: "Session billing errors",
        text: "Timed codes (90832, 90834, 90837) have strict time thresholds. Bill the wrong code for the session length and you invite denials or audits.",
      },
      {
        title: "Telehealth confusion",
        text: "Telehealth billing rules changed repeatedly since 2020. Modifier 95 vs GT, place of service codes, and payer-specific telehealth policies create constant denials.",
      },
    ],
    howWeHelp: [
      "We verify benefits and authorization requirements before every client intake, so you know what's covered before the first session.",
      "Our team tracks session counts against payer limits and initiates re-authorizations before you hit the cap.",
      "We manage the full credentialing process for new therapists, following up until enrollment is confirmed.",
      "Claims are coded to session length and payer rules, with telehealth modifiers applied correctly.",
      "Monthly reports show your collections, denial rate, and AR in plain language.",
    ],
    stats: [
      { value: "90-120", label: "Days typical commercial credentialing takes" },
      { value: "40%", label: "Of practices cite authorizations as top admin burden" },
      { value: "<5%", label: "Denial rate our process targets" },
    ],
  },
  {
    slug: "aba-therapy-billing",
    name: "ABA Therapy",
    title: "ABA Therapy Billing Services for Small Clinics",
    metaDescription:
      "Billing for ABA clinics: authorization renewals, BCBA credentialing, timed codes, and payer-specific rules handled by specialists.",
    intro: [
      "Applied Behavior Analysis billing is a specialty within a specialty. Timed codes in 15-minute units, treatment plan authorizations that expire, BCBA and RBT credentialing requirements, and payer rules that seem to change quarterly. Small ABA clinics feel this acutely because there's rarely a dedicated biller on staff.",
      "We handle ABA billing for small clinics, so your BCBAs spend time on treatment plans, not payer phone calls.",
    ],
    painPoints: [
      {
        title: "Authorization renewals",
        text: "ABA authorizations are tied to treatment plans with expiration dates. Let one lapse and every session after it denies. Tracking dozens of clients' auth windows manually is where clinics lose revenue.",
      },
      {
        title: "Unit billing errors",
        text: "Codes like 97153 and 97155 bill in 15-minute units with specific rounding rules. Miscounted units are one of the most common ABA denial reasons.",
      },
      {
        title: "BCBA credentialing",
        text: "Payers credential BCBAs individually, and RBTs often need to be rostered under the supervising BCBA. New hires can wait months before their sessions are billable.",
      },
      {
        title: "Medical necessity documentation",
        text: "Payers scrutinize ABA medical necessity more than almost any other service. Thin treatment plans trigger denials and audits.",
      },
    ],
    howWeHelp: [
      "We track every client's authorization window and start renewals before expiration, so no session goes unbilled.",
      "Unit calculations are validated against payer rounding rules before claims go out.",
      "We manage BCBA credentialing and RBT rostering end to end.",
      "We flag documentation gaps that would trigger medical necessity denials, with practical fixes.",
      "Denials are worked on a strict cadence with payer-specific appeal language.",
    ],
    stats: [
      { value: "15-min", label: "Unit billing precision we validate on every claim" },
      { value: "100%", label: "Of auth windows tracked proactively" },
      { value: "<5%", label: "Denial rate our process targets" },
    ],
  },
  {
    slug: "physical-therapy-billing",
    name: "Physical Therapy",
    title: "Physical Therapy Billing Services for Small Clinics",
    metaDescription:
      "PT billing without the 8-minute rule denials: timed codes, KX modifiers, visit limits, and authorization handling for small PT practices.",
    intro: [
      "Physical therapy billing lives and dies on details: the 8-minute rule for timed codes, KX modifiers for exceeding therapy caps, visit limits that vary by payer, and authorization requirements that differ for every plan. Get one detail wrong and the visit denies.",
      "We handle PT billing for small and independent clinics, catching the errors that cause the most common PT denials before claims go out.",
    ],
    painPoints: [
      {
        title: "8-minute rule violations",
        text: "Timed codes (97110, 97140, 97530) require at least 8 minutes of direct one-on-one time per unit. Documentation that doesn't support the units billed is an instant denial and an audit flag.",
      },
      {
        title: "KX modifier mistakes",
        text: "When therapy exceeds the annual cap, the KX modifier attests medical necessity. Missing it means denial; using it without supporting documentation means audit risk.",
      },
      {
        title: "Visit limit tracking",
        text: "Many plans cap PT visits per year. Clinics that don't track remaining visits discover the limit only when claims start denying.",
      },
      {
        title: "Authorization gaps",
        text: "PT almost always needs prior auth, and re-authorization mid-plan-of-care is where most clinics drop the ball.",
      },
    ],
    howWeHelp: [
      "Every timed-code claim is checked against 8-minute rule requirements before submission.",
      "KX modifiers are applied with documentation review, so caps don't become denials or audit risks.",
      "We track visit counts against payer limits and alert you before patients hit caps.",
      "Authorizations are secured before the plan of care starts and renewed before they expire.",
      "Our coders know PT-specific LCD rules and apply them per payer.",
    ],
    stats: [
      { value: "8-min", label: "Rule compliance checked on every timed claim" },
      { value: "30-35", label: "Days in AR our process targets (MGMA benchmark)" },
      { value: "<5%", label: "Denial rate our process targets" },
    ],
  },
  {
    slug: "dental-billing",
    name: "Dental",
    title: "Dental Billing Services Including Medical Cross-Billing",
    metaDescription:
      "Dental billing plus medical cross-billing: we bill medical insurance for qualifying dental procedures (sleep apnea, TMJ, trauma, oral surgery) that most practices miss.",
    intro: [
      "Dental billing has its own codes, its own payers, and its own denial patterns. But the biggest opportunity most dental practices miss isn't dental billing at all: it's billing medical insurance for procedures that qualify, like sleep apnea appliances, TMJ treatment, trauma repair, and oral surgery tied to medical diagnoses.",
      "We handle standard dental billing and medical cross-billing, capturing revenue most practices leave on the table.",
    ],
    painPoints: [
      {
        title: "Missed medical billing",
        text: "Procedures like sleep apnea appliances, TMJ treatment, and trauma-related surgery can often be billed to medical insurance, frequently at better rates than dental plans. Most practices never try.",
      },
      {
        title: "Dental claim denials",
        text: "Missing tooth clauses, waiting periods, downgraded posterior composites, and frequency limitations drive the most common dental denials.",
      },
      {
        title: "Benefit verification gaps",
        text: "Dental benefits are notoriously hard to verify accurately. Wrong estimates at check-in mean surprise balances and unhappy patients.",
      },
      {
        title: "Cross-billing documentation",
        text: "Medical reviewers don't think in dental terms. Claims need the medical diagnosis narrative, not just the procedure code.",
      },
    ],
    howWeHelp: [
      "We identify which of your procedures qualify for medical billing and build the documentation to support it.",
      "Cross-billed claims are submitted with ICD-10 medical diagnoses and narratives that medical reviewers understand.",
      "Dental benefits are verified before treatment with accurate patient estimates.",
      "Common dental denial patterns (waiting periods, frequency limits, downgrades) are checked before submission.",
      "We track both dental and medical AR so nothing falls through the cracks between the two systems.",
    ],
    stats: [
      { value: "2x-4x", label: "Typical medical vs dental reimbursement on qualifying procedures" },
      { value: "100%", label: "Of qualifying procedures screened for cross-billing" },
      { value: "<5%", label: "Denial rate our process targets" },
    ],
  },
];

/**
 * Systems the team works with. Present these as chips labeled as systems the
 * team works with, page copy must add "We adapt to your EHR and practice
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
      "Our pricing is based on a percentage of the collections we help you recover, so our success is directly tied to yours. The exact rate depends on your specialty, claim volume, and the services you need. Contact us for a custom quote, there are no long-term contracts required to get started.",
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
      "No, the opposite. You receive regular, easy-to-read reports on claims, payments, denials, and accounts receivable, and you can reach our team any time with questions. Many practices tell us they have better visibility working with us than they did handling billing in-house.",
  },
  {
    question: "What if I only need help with one part of billing?",
    answer:
      "That's completely fine. While many clients use our full revenue cycle service, you can also engage us for individual services such as denial management, AR follow-up, credentialing, or prior authorization. We'll build a plan around the specific gaps in your workflow.",
  },
  {
    question: "How much does it cost to outsource medical billing?",
    answer:
      "Most billing companies charge 4 to 9 percent of monthly collections, with small practices typically paying 5 to 7 percent for full-service billing in 2026. Some use per-claim pricing ($0.50 to $5 per claim) or flat monthly fees ($500 to $5,000+). Our pricing is a percentage of collections, so we only succeed when you do, and the exact rate depends on your specialty, claim volume, and scope of services.",
  },
  {
    question: "What is a good denial rate for a medical practice?",
    answer:
      "The MGMA benchmark for first-pass denial rates is 7 to 8 percent, and well-run practices with disciplined front-end processes get under 5 percent. If your denial rate is above 10 percent, better eligibility verification, claim scrubbing, and denial tracking can usually cut it significantly within a few months.",
  },
  {
    question: "How long does insurance credentialing take?",
    answer:
      "Commercial payer credentialing typically takes 90 to 120 days, and Medicaid can take up to 6 months. Because delays mean claims denied for provider-not-credentialed reasons, we recommend starting 4 to 6 months before a provider's go-live date. Our credentialing service manages the full application and follow-up process so nothing stalls.",
  },
  {
    question: "Should a small practice choose a small billing company or a large RCM firm?",
    answer:
      "For practices with 1 to 10 providers, a small billing company usually fits better: you get direct access to the people working your claims, workflows adapted to your specialty and EHR, and faster answers when payer issues arise. Large RCM firms make more sense for multi-site organizations above 25 providers that need enterprise reporting. The key is choosing a partner built for practices your size.",
  },
  {
    question: "How can a small practice reduce claim denials?",
    answer:
      "Start with the front end: verify eligibility before every visit, confirm patient demographics at check-in, and flag authorization requirements before the appointment. Then track denials by reason monthly, work them quickly with clear ownership, and feed the causes back into prevention. Small practices that systematize this routinely cut denial rates in half within two quarters.",
  },
  {
    question: "What are the red flags when choosing a billing company?",
    answer:
      "Watch for rates far below 4 percent (usually minimal follow-up), rates above 9 percent without clear justification, undisclosed setup fees, long lock-in contracts with painful termination clauses, vague reporting, and no client references in your specialty. A trustworthy partner explains exactly what is included, reports transparently, and lets you talk to current clients.",
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
 * EDITABLE PLACEHOLDER, replace with real numbers before publishing.
 */
export const placeholderStats: PlaceholderStat[] = [
  {
    value: 98,
    suffix: "%",
    label: "Clean claim rate",
    note: "EDITABLE PLACEHOLDER, replace with real numbers before publishing",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Dedicated support availability",
    note: "EDITABLE PLACEHOLDER, replace with real numbers before publishing",
  },
  {
    value: 30,
    suffix: "+",
    label: "Days shaved off average AR (sample)",
    note: "EDITABLE PLACEHOLDER, replace with real numbers before publishing",
  },
  {
    value: 100,
    suffix: "%",
    label: "HIPAA-compliant workflows",
    note: "EDITABLE PLACEHOLDER, replace with real numbers before publishing",
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
 * Published blog articles, real educational content for practice owners.
 * Manage posts (create/edit) from the admin dashboard; these are the defaults.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "denial-management-tips",
    title: "Denial Management Tips for Medical Practices",
    excerpt:
      "Denied claims drain revenue, yet most are preventable. Learn how to track denial patterns, appeal faster, and fix the front-end processes that cause them.",
    content: `Denied claims are one of the biggest drains on a practice's revenue, yet many are preventable. The first step is tracking: if you don't categorize denials by reason, you can't fix the patterns behind them. Build a simple monthly report that groups denials by cause, eligibility, coding, authorization, medical necessity, and you'll quickly see where your effort belongs.

The second step is speed. Denials have appeal deadlines, and every day a denial sits untouched is a day closer to losing the revenue permanently. Assign ownership of denials so each one has a person responsible for working it to resolution, and set clear turnaround targets.

Third, fix the front end. Most denials are born upstream: wrong patient demographics, unverified eligibility, or missing authorizations. Strengthening registration and verification processes prevents far more denials than even the best appeals team can recover.

Finally, treat every appeal as a case worth making. Well-documented appeals that reference the payer's own policies and include complete clinical documentation win far more often than template letters. Track your appeal success rate by payer, it tells you where appeals pay off and where process changes are needed instead.

If your team doesn't have the bandwidth to work denials systematically, that's exactly where a dedicated billing partner earns its keep.`,
    date: "2026-09-15",
    draft: false,
  },
  {
    slug: "ar-follow-up-best-practices",
    title: "AR Follow-Up Best Practices for Steady Cash Flow",
    excerpt:
      "Disciplined AR follow-up is the highest-return activity in revenue cycle management. Here is how to segment, document, and work your aging buckets.",
    content: `Accounts receivable is the pulse of your practice's financial health. The goal is simple: keep AR days low and make sure every dollar of earned revenue is actually collected. That requires a disciplined, repeatable follow-up process, not occasional cleanup sprints.

Start by segmenting your AR. High-value and aging claims deserve attention first, so work your aging buckets in priority order rather than randomly. A claim that is 120 days old needs a different strategy than one that is 30 days old, and knowing the difference is what separates good follow-up from busywork.

Second, document everything. Every payer call, every reference number, every promise of payment should be logged. When a claim comes back unpaid again, that history is what lets you escalate effectively instead of starting from zero.

Third, set a cadence and stick to it. Payer follow-up works best on a schedule, claims touched every 7 to 14 days move; claims touched once and forgotten don't. Build the cadence into your weekly workflow and measure it like any other operational metric.

Fourth, close the loop on root causes. If the same payer keeps stalling the same type of claim, the fix isn't more follow-up, it's a process change upstream, whether that's better documentation, a different coding approach, or a corrected enrollment.

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

Second, ask about transparency. You should receive regular reports on claims, payments, denials, and AR, and you should be able to reach a real person who knows your account. If a billing company can't clearly explain what they're doing with your revenue cycle, keep looking.

Third, understand the pricing model and what's included. Percentage-of-collections pricing aligns incentives, but make sure you know exactly which services are covered, whether there are setup fees or minimums, and how contract terms and termination work.

Fourth, ask about their process for denials and AR follow-up. This is where the real value lives. A partner should be able to describe their denial workflow, their follow-up cadence, and how they report results, in concrete terms, not vague promises.

Finally, check the transition plan. A good partner runs in parallel with your existing process during onboarding so nothing falls through the cracks, and they should be able to tell you exactly what they'll need from your team and when.

Take your time, ask hard questions, and choose the partner that treats your revenue like their own.`,
    date: "2026-08-18",
    draft: false,
  },
  {
    slug: "cost-to-outsource-medical-billing-2026",
    title: "How Much Does It Cost to Outsource Medical Billing in 2026",
    excerpt:
      "Real 2026 pricing for outsourced medical billing: percentage, per-claim, and flat-fee models, what drives the price, and the math on in-house vs outsourcing for small practices.",
    content: `One of the first questions every practice owner asks is also one of the hardest to get a straight answer to: what does outsourced medical billing actually cost? Most billing companies hide their pricing behind "contact us for a quote," so here are the real 2026 numbers.

## The three pricing models

Nearly every billing company uses one of three models. Percentage of collections is the most common: the company takes 4 to 9 percent of what your practice collects each month. A small family practice collecting $80,000 a month would pay roughly $3,200 to $7,200. This model aligns incentives, because the billing company only earns more when you collect more.

Per-claim pricing charges a flat amount per submitted claim, typically $0.50 to $5 depending on specialty complexity and volume. High-volume practices with straightforward claims sometimes prefer this because the cost is predictable.

Flat-fee pricing charges a fixed monthly amount, usually $500 to $5,000 or more depending on practice size and services included. This works well for practices with stable volume that want a predictable line item in the budget.

## What drives the price up or down

Specialty matters most. Behavioral health, with its authorization maze and session-based billing, costs more to service than straightforward primary care. Claim volume matters too: a solo therapist submitting 200 claims a month is a different engagement than a five-provider urgent care submitting 3,000.

The scope of services is the other big lever. Basic claim submission costs less than a full revenue cycle package covering eligibility verification, denial management, AR follow-up, credentialing, and patient billing. When comparing quotes, always compare identical scopes, because a cheap quote that excludes denial management is not actually cheap.

## In-house vs outsourcing: the real math

A full-time in-house biller costs $60,000 to $80,000 per year in salary alone. Add benefits, payroll taxes, billing software, clearinghouse fees, and ongoing training, and the true cost often lands between $85,000 and $110,000 annually. And one person is a single point of failure: vacations, turnover, and sick days all hit your cash flow directly.

Compare that to outsourcing at, say, 6 percent of collections. A practice collecting $1 million a year pays about $60,000, with no hiring risk, no software costs, and a whole team instead of one person. For most practices under 10 providers, the math favors outsourcing, and the gap widens once you factor in the revenue recovered through better denial management.

## Red flags in billing company pricing

Be cautious of rates far below 4 percent, which usually signal offshore-only processing with minimal follow-up, or rates above 9 percent without a clear explanation of premium services. Watch for setup fees that aren't disclosed upfront, long lock-in contracts with painful termination clauses, and vague definitions of what "collections" means in the percentage calculation.

## The bottom line

For a typical small practice, expect to pay 5 to 7 percent of collections for full-service billing in 2026. Get the scope in writing, understand exactly what's included, and run the in-house comparison with fully loaded costs, not just salary. The cheapest option is rarely the one with the lowest percentage; it's the one that collects the most of what you've earned.`,
    date: "2026-10-13",
    draft: false,
  },
  {
    slug: "reduce-claim-denials-small-practice",
    title: "How to Reduce Claim Denials in a Small Practice",
    excerpt:
      "Denied claims are preventable. A practical playbook for small practices: benchmarks, the fixes that matter most, and how to track denials without expensive software.",
    content: `Claim denials are one of the biggest revenue leaks in healthcare, and small practices feel them hardest. A five-provider clinic doesn't have a denials department; it has an office manager already doing three jobs. The good news: most denials are preventable, and the fixes that matter most are process changes, not expensive technology.

## Know your benchmark

The Medical Group Management Association reports that first-pass denial rates average 7 to 8 percent across medical groups, and that focused process improvements can bring that under 5 percent. If your denial rate is above 10 percent, you have a significant and fixable problem. Nearly half of medical group leaders now name denials and appeals as their single biggest revenue leak, so you are not alone.

## Fix the front end first

Around 23 percent of practice leaders identify front-end failures, eligibility and registration errors, as their top denial driver. This is the highest-return place to start. Verify every patient's eligibility before the visit, not after. Confirm demographics at check-in, because a wrong birth date or transposed ID number is an instant denial. Flag authorization requirements before the appointment, not when the claim bounces.

## Build a denial tracking habit

You cannot fix what you don't measure. Create a simple monthly report that groups every denial by reason: eligibility, coding, authorization, medical necessity, timely filing. A spreadsheet is enough. Within two months, patterns emerge, and those patterns tell you exactly where to focus. Many small practices discover that two or three denial reasons account for most of their lost revenue.

## Work denials fast

Every denial has an appeal deadline, and timely filing limits are unforgiving. Assign clear ownership so each denial has a person responsible for resolving it, and set turnaround targets: initial review within 5 business days, appeal filed within 15. Denials that sit untouched become write-offs.

## Appeal like you mean it

Well-documented appeals that cite the payer's own medical policies and include complete clinical documentation succeed far more often than form letters. Track your appeal win rate by payer. If one payer overturns 60 percent of appeals and another overturns 10 percent, that tells you where appeals pay off and where you need process changes instead.

## Close the loop

The final step is the one most practices skip: feed denial causes back into prevention. If coding errors drive your denials, invest in coder training or a coding audit. If authorizations are the issue, tighten the pre-visit workflow. Every denial should make the next one less likely.

Small practices that systematize these six steps routinely cut denial rates in half within two quarters. If your team doesn't have the bandwidth to do it consistently, that's precisely what a billing partner is for.`,
    date: "2026-10-13",
    draft: false,
  },
  {
    slug: "small-billing-company-vs-large-rcm",
    title: "Small Billing Company vs Large RCM Company: An Honest Comparison",
    excerpt:
      "Should your small practice hire a boutique billing company or a large RCM firm? An honest breakdown of cost, service, and fit for practices under 10 providers.",
    content: `When a small practice decides to outsource billing, the next question is who to hire: a boutique billing company built for practices like yours, or a large revenue cycle management firm with thousands of clients? Both can work, but they are built for very different customers. Here is an honest comparison.

## How they differ

Large RCM companies operate at scale. They onboard hundreds of practices onto standardized workflows, which keeps their per-client cost down but means your practice follows their process, not the other way around. You typically interact with an account team or a ticketing system rather than a person who knows your providers by name.

Small billing companies live or die on relationships. With dozens of clients instead of thousands, each practice gets direct access to the people working its claims. Workflows adapt to how your practice actually operates, including your EHR, your payer mix, and your specialty's quirks.

## Cost comparison

Large RCM firms often quote competitive percentage rates, sometimes 4 to 6 percent, because scale lets them. But watch the fine print: implementation fees, technology fees, and charges for services like credentialing or patient collections can push the effective rate higher. Small companies typically charge 5 to 8 percent with fewer add-on fees, and the scope is usually clearer because there are fewer product lines to upsell.

## Service and responsiveness

This is where the difference is starkest. In a large RCM, your denials are worked by whoever is available in a shared queue. In a small company, the person working your denials knows that Dr. Smith's claims with a particular payer always need a specific attachment. That institutional knowledge compounds over time and shows up in your denial rate.

Turnaround on questions differs too. Small companies typically answer in hours; large firms route through support tiers. When a payer issue is holding up $40,000 in claims, that difference matters.

## Technology

Large RCMs have an edge in proprietary analytics platforms and integrations. Small companies generally work inside your existing EHR and clearinghouse rather than requiring you onto their platform, which means less disruption during onboarding. For most small practices, this is a feature, not a limitation.

## Which should you choose?

Choose a large RCM if you are part of a growing multi-site organization that will exceed 25 providers, need enterprise reporting, or want a single vendor across many locations. Choose a small billing company if you have 1 to 10 providers, want direct relationships with the people touching your revenue, and value flexibility over standardization.

The wrong choice in either direction is expensive, because switching billing companies mid-stream disrupts cash flow for months. Evaluate carefully, ask for client references in your specialty and size range, and pick the partner built for practices like yours.`,
    date: "2026-10-13",
    draft: false,
  },
  {
    slug: "good-denial-rate-medical-practice",
    title: "What Is a Good Denial Rate for a Medical Practice in 2026",
    excerpt:
      "2026 denial rate benchmarks by MGMA, HFMA, and payer type, how to calculate yours, and the practical steps that move a practice from average to best-in-class.",
    content: `Every practice owner has wondered whether their denial rate is normal. The answer matters, because denials are pure lost revenue until they're worked, and every point of denial rate represents real money. Here are the 2026 benchmarks and what to do with them.

## The headline benchmarks

The Medical Group Management Association reports that first-pass denial rates have averaged 7 to 8 percent across medical groups over the last four years. Well-run practices with disciplined front-end processes get under 5 percent. If your rate sits above 10 percent, you're leaking significant revenue that better processes would capture.

Context matters by payer type. Medicare Advantage plans show initial denial rates around 17.7 percent across hundreds of millions of claims, though more than half are overturned on appeal. Commercial payers vary widely. And specialty matters enormously: durable medical equipment suppliers face industry denial rates of 10 to 18 percent, while straightforward primary care typically runs lower than average.

## How to calculate your denial rate

Divide the number of claims denied on first submission by the total number of claims submitted in the same period. Use first-pass denials, not final denials after appeals, because the first-pass rate measures your process quality. Calculate it monthly and track the trend; a rising rate is an early warning that something upstream broke.

## What separates good from average

Practices under 5 percent share a few traits. They verify eligibility before every visit. They scrub claims before submission rather than fixing rejections after. They track denials by reason code monthly and attack the top three causes systematically. And they appeal quickly, because timely filing deadlines forgive nothing.

The single biggest differentiator is front-end discipline. Nearly a quarter of practice leaders name eligibility and registration failures as their top denial driver. A practice that verifies coverage, confirms demographics, and flags authorization needs before the encounter prevents more denials than any appeals team can recover.

## AR days: the companion metric

Watch days in AR alongside your denial rate. MGMA benchmarks a well-run practice at 30 to 35 days in AR; anything over 50 signals trouble. High denial rates and high AR days usually share root causes, so fixing the front end improves both.

## Moving from average to best-in-class

Start by measuring: calculate your first-pass denial rate and your top five denial reasons. Fix the front end: eligibility verification and registration accuracy. Build the tracking habit: monthly denial reports by cause. Then work the backlog with clear ownership and deadlines. Practices that do this consistently move from 8 percent to under 5 percent within two quarters, which on $2 million in annual charges is $60,000 or more in recovered revenue.`,
    date: "2026-10-13",
    draft: false,
  },
  {
    slug: "how-long-does-credentialing-take-2026",
    title: "How Long Does Insurance Credentialing Take in 2026",
    excerpt:
      "Real 2026 credentialing timelines by payer type, what causes delays, and a checklist to get your providers enrolled faster.",
    content: `Credentialing is the slowest part of bringing a new provider on board, and delays cost real money: claims submitted before a provider is credentialed get denied, and every week of delay pushes revenue further out. Here are the real 2026 timelines and how to shorten them.

## The benchmarks

Commercial payer credentialing typically takes 90 to 120 days from clean application to approval. Medicare is often faster, 60 to 90 days, when the application is complete. Medicaid is the slowest, frequently 120 to 180 days depending on the state. These are best-case timelines with complete applications; anything missing resets the clock.

## Why it takes so long

Payers verify everything: education, training, licenses, work history, malpractice coverage, hospital privileges, and references. Each item is checked independently, and verifications happen in sequence, not parallel. A single unreturned reference or an expired document can stall an application for weeks while nobody tells you.

The other major cause of delay is errors. The vast majority of credentialing applications contain at least one error or omission, and payers don't fix them, they return the application and you start over. Common killers: mismatched dates between CV and application, missing CAQH attestation, and expired licenses discovered mid-process.

## The speed-up checklist

Start 4 to 6 months before the provider's go-live date, not 2. Keep CAQH current at all times, because most commercial payers pull from it. Gather every document before submitting: license, DEA, board certification, malpractice face sheet, CV with no gaps, and signed attestations. Respond to payer follow-ups within 48 hours; applications that sit in your inbox lose their place in the queue. And track every application in one place with dates, reference numbers, and next follow-up dates.

## The cost of waiting

A provider who can't bill for three extra months because credentialing stalled represents tens of thousands in delayed revenue, plus the salary you're paying while they can't generate collections. For small practices adding one provider, that delay can erase the margin on the hire's first year.

## When to get help

If your team is managing credentialing alongside everything else, applications slip. A dedicated credentialing service submits clean applications, follows up on schedule, and catches problems before payers do. The fee is small compared to one month of a provider's delayed revenue.`,
    date: "2026-10-15",
    draft: false,
  },
  {
    slug: "prior-authorization-burden-small-practice-2026",
    title: "Prior Authorization Is Eating 13 Hours a Week: What Small Practices Can Do",
    excerpt:
      "2026 AMA data on the prior authorization burden, and practical steps small practices can take to reduce delays and denials.",
    content: `Prior authorization has quietly become one of the biggest drains on small practices. The 2026 AMA physician survey puts numbers on what every practice owner already feels: the average physician deals with 40 prior authorizations per week, consuming 13 hours of physician and staff time. Ninety-five percent report that prior auth delays patient care.

## Why small practices suffer most

Large systems have dedicated prior auth teams. A three-provider practice has whoever can squeeze it between patients. Authorizations get submitted late, clinical documentation is thin because nobody has time to write the perfect letter, and follow-up calls don't happen because the phones are already ringing. The result: more denials, more delays, more rework.

## What you can actually do

Build authorization into the scheduling workflow, not after it. When an appointment is booked for a service that typically needs auth, the auth process should start that day, with a checklist of what the payer requires. Most payers publish their criteria; keep a one-page reference per top payer so staff aren't guessing.

Document like the reviewer is skeptical, because they are. Include the diagnosis, the conservative treatments already tried and failed, and the clinical rationale in the initial submission. A complete first submission beats a fast appeal every time.

Track everything. Log submission dates, reference numbers, and promised decision dates. Follow up the day after a promised date passes, not a week later. Practices that systematize follow-up cut their auth-related delays dramatically.

## The 2026 rule change

CMS finalized prior authorization interoperability rules taking effect in 2026, requiring payers to support electronic prior auth APIs and faster decision timeframes. In practice, adoption is uneven, and the practices that benefit first will be the ones already submitting clean, complete, electronic requests. Paper fax workflows won't capture the gains.

## Getting help

Prior authorization is one of the most outsourceable parts of the revenue cycle: it's rules-based, high-volume, and punishes inconsistency. If auth delays are costing your practice appointments and revenue, having a dedicated team run the process, with payer-specific checklists and relentless follow-up, typically pays for itself within the first quarter.`,
    date: "2026-10-15",
    draft: false,
  },
  {
    slug: "dental-cross-billing-medical-insurance-101",
    title: "Dental Cross-Billing 101: When to Bill Medical Insurance for Dental Procedures",
    excerpt:
      "Many dental procedures can be billed to medical insurance. Learn which ones qualify, how cross-billing works, and what it means for your practice revenue.",
    content: `Most dentists don't know they can bill medical insurance for certain procedures, which means real revenue goes uncollected. When a dental procedure is medically necessary, trauma, pathology, sleep apnea appliances, TMJ treatment, or oral surgery tied to a medical diagnosis, medical insurance may cover it, often at better rates than dental plans.

## Which procedures qualify

The key test is medical necessity with a medical diagnosis code. Examples include: tooth extractions tied to radiation treatment or organ transplant, sleep apnea oral appliances (with a sleep study diagnosis), TMJ treatment, biopsies and pathology, trauma repair, and implant procedures related to accident or disease. Cosmetic and routine restorative work does not qualify.

## How cross-billing works

Cross-billing means submitting the dental procedure to the patient's medical plan, usually as an out-of-network claim, using medical diagnosis codes (ICD-10) alongside the dental procedure codes. Documentation must tell the medical story: the diagnosis, why the procedure was medically necessary, and supporting clinical notes. Medical reviewers don't think in dental terms, so the narrative matters.

## Why most practices leave money here

The knowledge gap is the biggest barrier. Dental teams are trained in dental billing; medical billing has different codes, different forms, and different payer rules. Many practices also assume the effort isn't worth it, but a single sleep apnea appliance billed to medical can reimburse several times what the dental plan pays.

## Getting it right

Start by identifying the procedures you already perform that have a medical diagnosis behind them. Build documentation templates that capture the medical necessity narrative at the time of treatment, not weeks later when the claim is prepared. And verify medical benefits before treatment, because out-of-network medical benefits vary widely and patients need accurate estimates.

For dental practices doing surgical, sleep, or trauma-related work, cross-billing is one of the highest-ROI revenue opportunities available, and most competitors aren't doing it.`,
    date: "2026-10-15",
    draft: false,
  },
  {
    slug: "dme-billing-denials-small-suppliers",
    title: "Why DME Claims Deny at 10 to 18 Percent, and How Small Suppliers Get Under 5",
    excerpt:
      "DME billing has the highest denial rates in healthcare. The specific reasons claims deny and the process fixes that bring small suppliers under 5 percent.",
    content: `Durable medical equipment suppliers face the toughest billing environment in healthcare, with industry denial rates running 10 to 18 percent. For a small supplier, that means nearly one in six claims needs rework. The causes are specific to DME, and so are the fixes.

## Why DME denies so much

Documentation is the number one killer. Medicare and commercial payers require detailed written orders, face-to-face encounter notes, and proof of medical necessity before they'll pay for equipment. Missing one element means denial, and the requirements differ by product category, power wheelchairs have different rules than CPAP machines, which differ from orthotics.

Prior authorization is the second driver. Many DME items need auth, and the auth must match the exact HCPCS code billed. A common failure: getting auth for a base code, then billing with a modifier the auth didn't cover.

The third is the sheer complexity of LCDs and NCDs. Local and national coverage determinations set granular rules, down to how often supplies can be refilled and which diagnoses support which equipment. Small suppliers rarely have someone tracking these full-time.

## The fixes that work

Build product-specific checklists. For each HCPCS category you bill, document exactly what the payer requires: order elements, encounter note contents, auth requirements, and refill rules. Intake staff should work from these checklists before equipment ships, because fixing documentation after delivery is ten times harder.

Verify and authorize before fulfillment. Never ship on a promise; confirm the auth covers the exact codes and quantities. This single discipline eliminates a huge share of denials.

Track denials by product category, not just overall. If power mobility denies at 20 percent but CPAP denies at 6 percent, your fix belongs in the mobility workflow. Category-level tracking turns a scary overall rate into solvable specific problems.

## The payoff

Small DME suppliers that systematize intake checklists, pre-fulfillment authorization, and category-level denial tracking routinely cut denial rates from the mid-teens to under 5 percent. On $1 million in annual billings, that's $100,000 or more in revenue that stops leaking.`,
    date: "2026-10-15",
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
