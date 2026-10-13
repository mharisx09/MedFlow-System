import { prisma } from '@/lib/prisma';
import { defaultFaqs, siteUrl } from '@/config/site';
import FaqAccordion from '@/components/FaqAccordion';
import Reveal from '@/components/Reveal';

export const metadata = {
  title: 'FAQs | Med Flow System',
  description:
    'Answers to common questions about Med Flow System medical billing services, pricing, onboarding, and revenue cycle management for US healthcare providers.',
  alternates: { canonical: `${siteUrl}/faq` },
};

export default async function FaqPage() {
  let faqs = defaultFaqs;
  try {
    const dbFaqs = await prisma.faq.findMany({
      where: { active: true },
      orderBy: { sortOrder: 'asc' },
    });
    if (dbFaqs.length > 0) {
      const dbQuestions = new Set(
        dbFaqs.map((f) => f.question.trim().toLowerCase())
      );
      faqs = [
        ...dbFaqs.map((f) => ({ question: f.question, answer: f.answer })),
        ...defaultFaqs.filter((f) => !dbQuestions.has(f.question.trim().toLowerCase())),
      ];
    }
  } catch {
    faqs = defaultFaqs;
  }

  /** Structured FAQ data, lets Google show our Q&As directly in search results. */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="bg-mist">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal className="text-center">
            <h1 className="text-4xl font-extrabold text-ink sm:text-5xl">
              Frequently asked questions
            </h1>
            <p className="mt-4 text-lg text-ink/70">
              Everything you need to know about working with Med Flow System.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <FaqAccordion faqs={faqs} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
