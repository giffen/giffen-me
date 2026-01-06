import { defineCollection, z } from "astro:content";

const lab = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(), // keep simple
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { lab };
