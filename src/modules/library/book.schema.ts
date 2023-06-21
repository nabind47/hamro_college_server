import { z } from 'zod';

export const createBookSchema = z.object({
  body: z.object({
    title: z.string(),
    price: z.number(),
    author: z.string(),
    category: z.string(),
    coverImage: z.string().optional(),
  }),
});

export const updateBookSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    price: z.number().optional(),
    author: z.string().optional(),
    category: z.string().optional(),
    coverImage: z.string().optional(),
  }),
});

export type CreateBookInput = z.infer<typeof createBookSchema>['body'];
export type UpdateBookInput = z.infer<typeof updateBookSchema>['body'];
