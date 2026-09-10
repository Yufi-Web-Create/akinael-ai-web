import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const industries = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/industries" }),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    metaDescription: z.string(),
    heroEyebrow: z.string(),
    heroHeadline: z.string(),
    heroLead: z.string(),
    challenges: z.array(z.string()).min(3),
    offerings: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    ).min(3),
    faq: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ).min(3),
  }),
});

export const collections = { industries };
