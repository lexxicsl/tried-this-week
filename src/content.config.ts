import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const tool = z.object({
  name: z.string(),
  url: z.string().url(),
  label: z.enum(["Tried", "Reported"]),
  verdict: z.enum(["Keep", "Drop"]).optional(),
  job: z.string(),
  stack: z.string(),
  license: z.string(),
  licenseUrl: z.string().url(),
  affiliate: z.boolean().default(false),
});

const issues = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/issues" }),
  schema: z.object({
    issue: z.number().int().positive(),
    title: z.string(),
    seoTitle: z.string().max(60),
    description: z.string().max(160),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    slug: z.string(),
    tags: z.array(z.string()),
    brief: z.string(),
    tools: z.array(tool).length(3),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    sponsored: z.boolean().default(false),
    hasAffiliateLinks: z.boolean().default(false),
  }),
});

export const collections = { issues };
