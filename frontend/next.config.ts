import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Static export: every route is prerendered, so the site can be hosted as plain files (Netlify, Vercel, any CDN).
  output: "export",
  // One folder per route (`/app/index.html`) so any static host serves clean URLs without rewrite rules.
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
