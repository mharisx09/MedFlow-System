"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";

function format(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export default function CalculatorClient() {
  const [providers, setProviders] = useState(3);
  const [monthlyCollections, setMonthlyCollections] = useState(150000);
  const [billers, setBillers] = useState(1);
  const [denialRate, setDenialRate] = useState(8);

  const annualCollections = monthlyCollections * 12;

  // In-house costs
  const salaryPerBiller = 70000;
  const benefitsRate = 0.3;
  const softwarePerYear = 12000;
  const inHouseAnnual =
    billers * salaryPerBiller * (1 + benefitsRate) + softwarePerYear;

  // Outsourced cost at 6%
  const outsourcedAnnual = annualCollections * 0.06;

  // Denial recovery: assume outsourcing cuts denial rate to 4.5%
  const targetDenialRate = 4.5;
  const recoveredAnnual =
    denialRate > targetDenialRate
      ? annualCollections * ((denialRate - targetDenialRate) / 100)
      : 0;

  const savings = inHouseAnnual - outsourcedAnnual + recoveredAnnual;
  const cheaper = savings > 0;

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-mist bg-white p-7 shadow-sm">
          <h2 className="text-xl font-extrabold text-ink">Your practice</h2>
          <div className="mt-6 space-y-6">
            <div>
              <label className="flex justify-between text-base font-semibold text-ink">
                Providers <span className="text-teal">{providers}</span>
              </label>
              <input
                type="range"
                min={1}
                max={15}
                value={providers}
                onChange={(e) => setProviders(Number(e.target.value))}
                className="mt-2 w-full accent-teal"
              />
            </div>
            <div>
              <label className="flex justify-between text-base font-semibold text-ink">
                Monthly collections <span className="text-teal">${format(monthlyCollections)}</span>
              </label>
              <input
                type="range"
                min={20000}
                max={1000000}
                step={10000}
                value={monthlyCollections}
                onChange={(e) => setMonthlyCollections(Number(e.target.value))}
                className="mt-2 w-full accent-teal"
              />
            </div>
            <div>
              <label className="flex justify-between text-base font-semibold text-ink">
                In-house billers <span className="text-teal">{billers}</span>
              </label>
              <input
                type="range"
                min={1}
                max={5}
                value={billers}
                onChange={(e) => setBillers(Number(e.target.value))}
                className="mt-2 w-full accent-teal"
              />
            </div>
            <div>
              <label className="flex justify-between text-base font-semibold text-ink">
                Current denial rate <span className="text-teal">{denialRate}%</span>
              </label>
              <input
                type="range"
                min={2}
                max={20}
                value={denialRate}
                onChange={(e) => setDenialRate(Number(e.target.value))}
                className="mt-2 w-full accent-teal"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Reveal className="rounded-2xl bg-navy p-7 text-white">
            <p className="text-sm font-bold uppercase tracking-widest text-white/60">
              In-house cost per year
            </p>
            <p className="mt-2 text-4xl font-extrabold">${format(inHouseAnnual)}</p>
            <p className="mt-2 text-sm text-white/70">
              {billers} biller{ billers > 1 ? "s" : ""} at ${format(salaryPerBiller)} salary plus
              30% benefits and payroll tax, plus ${format(softwarePerYear)} billing software.
            </p>
          </Reveal>
          <Reveal delay={80} className="rounded-2xl bg-teal p-7 text-white">
            <p className="text-sm font-bold uppercase tracking-widest text-white/70">
              Outsourced cost per year (at 6%)
            </p>
            <p className="mt-2 text-4xl font-extrabold">${format(outsourcedAnnual)}</p>
            <p className="mt-2 text-sm text-white/80">
              No hiring risk, no software fees, a full team instead of one person.
            </p>
          </Reveal>
          <Reveal delay={160} className="rounded-2xl border-2 border-teal bg-white p-7">
            <p className="text-sm font-bold uppercase tracking-widest text-ink/50">
              Estimated yearly benefit of outsourcing
            </p>
            <p className={`mt-2 text-4xl font-extrabold ${cheaper ? "text-teal" : "text-ink"}`}>
              {cheaper ? "+" : ""}${format(Math.abs(savings))}
            </p>
            <p className="mt-2 text-sm text-ink/70">
              {cheaper
                ? "Outsourcing looks cheaper for your practice, before counting faster payments and fewer write-offs."
                : "At your size, in-house may be competitive on cost alone, but factor in turnover risk and denial recovery."}{" "}
              Includes an estimated ${format(recoveredAnnual)} recovered by cutting denials
              from {denialRate}% to {targetDenialRate}%.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-10 rounded-2xl bg-mist p-8 text-center">
        <h2 className="text-2xl font-extrabold text-ink">Want the exact math for your practice?</h2>
        <p className="mx-auto mt-2 max-w-xl text-ink/70">
          Get a free billing audit. We will look at your actual denial rate, AR days,
          and collections, and show you the real numbers.
        </p>
        <Link
          href="/contact?type=audit"
          className="mt-5 inline-block rounded-lg bg-teal px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-teal-dark"
        >
          Get a Free Audit
        </Link>
      </Reveal>

      <p className="mt-6 text-center text-sm text-ink/50">
        Estimates only. Actual pricing depends on specialty, claim volume, and scope of services.
      </p>
    </div>
  );
}
