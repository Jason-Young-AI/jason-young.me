import { glob } from "astro/loaders"
import { defineCollection } from "astro:content"
import { z } from "astro/zod"

const publications = defineCollection({
  loader: glob({
    base: "./src/content/publications",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    abstract: z.string(),
    authors: z.array(z.string()),
    cofirstAuthors: z.array(z.string()).optional(),
    correspondingAuthors: z.array(z.string()).optional(),
    position: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    type: z.string(),
    draft: z.boolean().optional(),
    select: z.boolean().optional(),
    arxivLink: z.string().optional(),
    officialLink: z.string().optional(),
  }),
})

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.md",
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    authors: z.array(z.string()),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    select: z.boolean().optional(),
    sourceLink: z.string().optional(),
  }),
})

const posts = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/*.md",
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    authors: z.array(z.string()),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
    select: z.boolean().optional(),
    originalLink: z.string().optional(),
  }),
})

const cv = defineCollection({
  loader: glob({
    base: "./src/content/cv",
    pattern: "**/*.md",
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    order: z.number(),
    draft: z.boolean().optional(),
  }),
})

export const collections = { publications, projects, posts, cv }