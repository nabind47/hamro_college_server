import { z } from 'zod';

export const createNoticeSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
});

export const updateNoticeSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

export type CreateNoticeInput = z.infer<typeof createNoticeSchema>['body'];
export type UpdateNoticeInput = z.infer<typeof updateNoticeSchema>['body'];
