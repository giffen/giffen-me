import { defineCollection, z } from "astro:content";

const lab = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    status: z.enum(["in-progress", "complete", "ongoing"]).default("complete"),
    tags: z.array(z.string()),
    pattern: z.number().min(1).max(6).default(1),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    image: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

const writing = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tag: z.string(), // "Case Study", "Essay", "Framework", etc.
    excerpt: z.string(),
  }),
});

export const collections = { lab, writing };