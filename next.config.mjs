/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint is handled by the developer's editor/CI; keep builds from failing on lint.
    ignoreDuringBuilds: true,
  },
  // TypeScript type checking stays ON during builds.
};

export default nextConfig;
