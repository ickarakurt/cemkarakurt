import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import { SITE } from "./src/config";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  redirects: {
    "/notes/jest-mocking/": { status: 301, destination: "/blog/jest-mocking/" },
    "/notes/nextjs-server-actions-zod-react-hook-form/": { status: 301, destination: "/blog/nextjs-server-actions-zod-react-hook-form/" },
    "/notes/react-hook-testing/": { status: 301, destination: "/blog/react-hook-testing/" },
    "/notes/converting-a-google-spreadsheet-to-an-api/": { status: 301, destination: "/blog/converting-a-google-spreadsheet-to-an-api/" },
    "/notes/": { status: 301, destination: "/blog/" },
  },
  integrations: [tailwind({
    applyBaseStyles: false,
  }), react(), sitemap(), mdx()],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "css-variables",
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
