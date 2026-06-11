/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@trinos/shared'],
  webpack: (config) => {
    // @trinos/shared is compiled from source (TS) via the tsconfig path alias.
    // Its barrel uses NodeNext-style `.js` import specifiers that point at `.ts`
    // files, so teach webpack to resolve `.js` → `.ts`/`.tsx` first.
    config.resolve.extensionAlias = {
      ...(config.resolve.extensionAlias || {}),
      '.js': ['.ts', '.tsx', '.js'],
    };
    return config;
  },
};

module.exports = nextConfig;
