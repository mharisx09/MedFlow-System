import CalculatorClient from "@/components/CalculatorClient";
import { siteUrl } from "@/config/site";

export const metadata = {
  title: "In-House vs Outsourced Medical Billing Cost Calculator | Med Flow System",
  description:
    "Free calculator: compare the true cost of in-house billing staff vs outsourcing for your practice. Includes salary, benefits, software, and denial recovery estimates.",
  alternates: { canonical: `${siteUrl}/tools/billing-cost-calculator` },
};

export default function CalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does it cost to outsource medical billing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most billing companies charge 4 to 9 percent of monthly collections. Use the calculator above for your practice's numbers.",
        },
      },
      {
        "@type": "Question",
        name: "Is it cheaper to hire a biller or outsource?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A full-time in-house biller costs $85,000 to $110,000 per year fully loaded. For most practices under 10 providers, outsourcing at 5 to 7 percent of collections costs less and removes hiring risk.",
        },
      },
    ],
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-base font-bold uppercase tracking-widest text-teal">
            Free tool
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-ink sm:text-5xl">
            In-House vs Outsourced Billing: Cost Calculator
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-ink/75">
            Move the sliders to match your practice. See the true yearly cost of
            in-house billing staff against outsourcing, including what better
            denial management recovers.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <CalculatorClient />

          <div className="mx-auto mt-16 max-w-3xl space-y-5">
            <h2 className="text-2xl font-extrabold text-ink">
              How the math works
            </h2>
            <p className="text-base leading-relaxed text-ink/75">
              A full-time in-house biller earns $60,000 to $80,000 in salary. Add
              roughly 30 percent for benefits and payroll taxes, plus $10,000 to
              $15,000 a year for billing software and clearinghouse fees, and one
              biller truly costs $85,000 to $110,000 annually. And one person is a
              single point of failure: turnover, vacations, and sick days all hit
              your cash flow directly.
            </p>
            <p className="text-base leading-relaxed text-ink/75">
              Outsourced billing typically runs 4 to 9 percent of collections,
              with most small practices paying 5 to 7 percent. On $1.8 million in
              annual collections, that is about $108,000 at 6 percent, with no
              hiring risk and a whole team behind your revenue cycle.
            </p>
            <p className="text-base leading-relaxed text-ink/75">
              The hidden number is denial recovery. The average practice denies 7
              to 8 percent of claims on first submission; disciplined billing gets
              under 5 percent. Every point of denial rate on $1.8 million is
              $18,000 a year. The calculator estimates what closing that gap is
              worth for your practice.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
