/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-svgr");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  webpack: (config, { isServer }) => {
    // Fixes packages that depend on fs/module module
    if (!isServer) {
      config.node = { fs: "empty", module: "empty" };
    }

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });

    return config;
  },
  images: {
    domains: [],
  },
  reactStrictMode: true,

  // async redirects() {
  //   return [
  //     {
  //       source: '/checkout',
  //       destination: '/',
  //       permanent: false,
  //     },
  //   ];
  // },
};

module.exports = withPlugins([withSvgr, withBundleAnalyzer], nextConfig);
