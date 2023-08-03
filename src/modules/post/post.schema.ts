import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
  }),
});

export const updatePostSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
  }),
});

export type CreatePostInput = z.infer<typeof createPostSchema>['body'];
export type UpdatePostInput = z.infer<typeof updatePostSchema>['body'];
