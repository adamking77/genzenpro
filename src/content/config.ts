import { defineCollection, z } from 'astro:content';

const reportsCollection = defineCollection({
  type: 'data', // Using 'data' type for JSON files
  schema: z.object({
    id: z.string(),
    // slug is derived from the filename, but we can include it in the schema
    // if it's also present in the data source and used explicitly.
    // For Astro's getCollection, slug is part of the entry object automatically.
    // We will include it here to match the source data structure.
    slug: z.string(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    author: z.string(),
    publishDate: z.string(), // Keep as string for "Month YYYY" format
    category: z.string(),
    tags: z.array(z.string()),
    readTime: z.string(),
    featured: z.boolean(),
    // imageUrl: z.string().optional(), // Not in source data
    // sections: z.array(z.object({ type: z.string(), content: z.any() })).optional(), // Not in source data
  }),
});

export const collections = {
  reports: reportsCollection,
};