import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { blogPosts } from '@/config/site';

export const metadata = {
  title: 'Blog | Med Flow System',
  description:
    'Insights from Med Flow System on medical billing, revenue cycle management, coding, and denials for US healthcare providers.',
};

export default function BlogPage() {
  return (
    <main>
      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <p className="text-base font-bold uppercase tracking-widest text-teal">Blog</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold text-ink sm:text-5xl">
              Billing insights for your practice
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-ink/75">
              Practical notes on medical billing, coding, denials, and the revenue cycle —
              written for busy practice owners and staff.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 80}>
                <article className="flex h-full flex-col rounded-2xl border border-mist bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-ink/50">{post.date}</span>
                    {post.draft && (
                      <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
                        Draft
                      </span>
                    )}
                  </div>
                  <h2 className="mt-3 text-xl font-bold text-ink">
                    <Link href={`/blog/${post.slug}`} className="hover:text-teal">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-base text-ink/70">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 text-base font-bold text-teal hover:text-teal-dark"
                  >
                    Read article →
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
