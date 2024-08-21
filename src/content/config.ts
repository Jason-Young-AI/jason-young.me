import { defineCollection, z } from "astro:content"

const publications = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    abstract: z.string(),
    authors: z.array(z.string()),
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
  type: "content",
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
  type: "content",
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
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    order: z.number(),
  }),
})

export const collections = { publications, projects, posts, cv }