/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint is handled by the developer's editor/CI; keep builds from failing on lint.
    ignoreDuringBuilds: true,
  },
  // TypeScript type checking stays ON during builds.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Prevents the site from being embedded in iframes (clickjacking defense).
          { key: 'X-Frame-Options', value: 'DENY' },
          // Stops browsers from guessing content types (MIME-sniffing attacks).
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Limits referrer data shared with other sites.
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Disables browser features the site never uses.
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
