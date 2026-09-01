import type { NextConfig } from 'next';

const githubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: githubPages ? '/design-studio-webmcp' : '',
  assetPrefix: githubPages ? '/design-studio-webmcp/' : undefined,
  images: { unoptimized: true },
};

export default nextConfig;
