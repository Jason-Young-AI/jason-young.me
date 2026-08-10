import { defineConfig } from "astro/config"

import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import solidJs from "@astrojs/solid-js"
import tailwindcss from "@tailwindcss/vite"
import { unified } from "@astrojs/markdown-remark"

import remarkToc from 'remark-toc';
import remarkMath from 'remark-math'

import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: "prism",
    processor: unified({
      remarkPlugins: [
        remarkMath,
        [remarkToc, { heading: "contents" }],
      ],
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "append" }],
      ],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://jason-young.me",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/hidden'),
    }),
    solidJs(),
  ],
})
