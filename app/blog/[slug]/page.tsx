import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import { blogPosts, siteUrl } from '@/config/site';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Blog | Med Flow System' };
  return {
    title: `${post.title} | Med Flow System Blog`,
    description: post.excerpt,
    alternates: { canonical: `${siteUrl}/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const paragraphs = post.content.split('\n\n').filter((p) => p.trim().length > 0);

  /** Structured article data, helps Google show rich results for blog posts. */
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Med Flow System' },
    publisher: { '@type': 'Organization', name: 'Med Flow System' },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <nav aria-label="Breadcrumb" className="text-base text-ink/60">
            <Link href="/blog" className="font-semibold text-teal hover:text-teal-dark">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span>{post.title}</span>
          </nav>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-base font-semibold text-ink/50">{post.date}</span>
            {post.draft && (
              <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">
                Draft
              </span>
            )}
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-ink sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-ink/70">{post.excerpt}</p>
        </Reveal>

        <Reveal delay={100} className="mt-8">
          <div className="space-y-5">
            {paragraphs.map((paragraph, i) => {
              const trimmed = paragraph.trim();
              if (trimmed.startsWith('## ')) {
                return (
                  <h2 key={i} className="pt-4 text-2xl font-extrabold text-ink">
                    {trimmed.slice(3)}
                  </h2>
                );
              }
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={i} className="pt-2 text-xl font-bold text-ink">
                    {trimmed.slice(4)}
                  </h3>
                );
              }
              return (
                <p key={i} className="text-base leading-relaxed text-ink/80">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="rounded-2xl bg-navy p-8 text-center">
            <h2 className="text-2xl font-extrabold text-white">Need help with billing?</h2>
            <p className="mx-auto mt-2 max-w-xl text-base text-white/85">
              Talk to our team about a free billing audit for your practice.
            </p>
            <Link
              href="/contact?type=audit"
              className="mt-5 inline-block rounded-lg bg-teal px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-teal-dark"
            >
              Get a Free Audit
            </Link>
          </div>
        </Reveal>
      </article>
    </main>
  );
}
