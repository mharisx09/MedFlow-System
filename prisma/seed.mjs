#!/usr/bin/env node
/**
 * Seed script (plain Node, runs via `prisma db seed`).
 * Idempotent: wipes and recreates FAQ + placeholder Post rows each run.
 *
 * NOTE: FAQ/post content is duplicated here rather than imported from
 * config/site.ts, because this script runs as plain .mjs without the
 * project's TypeScript module resolution.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const faqs = [
  {
    question: "What services does Med Flow System provide?",
    answer:
      "We provide full-cycle medical billing and revenue cycle management for US healthcare practices, including claim submission, insurance eligibility verification, accounts receivable follow-up, denial management and appeals, medical coding, provider credentialing, prior authorization, and patient billing and statements.",
    sortOrder: 0,
  },
  {
    question: "How does your pricing work?",
    answer:
      "Our pricing is based on a percentage of the collections we help you recover, so our success is directly tied to yours. The exact rate depends on your specialty, claim volume, and the services you need. Contact us for a custom quote — there are no long-term contracts required to get started.",
    sortOrder: 1,
  },
  {
    question: "How does onboarding work?",
    answer:
      "Onboarding starts with a discovery call where we learn about your practice, specialty, and current billing workflow. We then collect the necessary access and documentation, set up your account in our system, and begin a transition period where we run in parallel with your existing process to ensure nothing falls through the cracks. Most practices are fully transitioned within a few weeks.",
    sortOrder: 2,
  },
  {
    question: "Is my practice's data secure?",
    answer:
      "Yes. We follow HIPAA-compliant workflows, limit data access to authorized team members, and use secure systems for handling all practice and patient information. Protecting your data is a core part of how we operate.",
    sortOrder: 3,
  },
  {
    question: "Will I lose visibility into my billing?",
    answer:
      "No — the opposite. You receive regular, easy-to-read reports on claims, payments, denials, and accounts receivable, and you can reach our team any time with questions. Many practices tell us they have better visibility working with us than they did handling billing in-house.",
    sortOrder: 4,
  },
  {
    question: "What if I only need help with one part of billing?",
    answer:
      "That's completely fine. While many clients use our full revenue cycle service, you can also engage us for individual services such as denial management, AR follow-up, credentialing, or prior authorization. We'll build a plan around the specific gaps in your workflow.",
    sortOrder: 5,
  },
];

const posts = [
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
    published: true,
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
    published: true,
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
    published: true,
  },
];

async function main() {
  await prisma.faq.deleteMany();
  await prisma.faq.createMany({ data: faqs });

  await prisma.post.deleteMany();
  await prisma.post.createMany({ data: posts });

  console.log(`Seeded ${faqs.length} FAQs and ${posts.length} posts.`);
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
