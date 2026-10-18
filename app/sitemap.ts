import type { MetadataRoute } from 'next';
import { services, blogPosts } from '@/config/site';

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://medflow-system-six.vercel.app').replace(
  /\/$/,
  ''
);

/**
 * Auto-generated sitemap, helps Google discover and index every page.
 * Updates itself when services or blog posts are added.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/specialties', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/free-audit', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/hipaa-notice', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const urls: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  for (const service of services) {
    urls.push({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  for (const post of blogPosts) {
    urls.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return urls;
}
