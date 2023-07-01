import { z } from 'zod';

export const createNoticeSchema = z.object({
  body: z.object({
    title: z.string(),
    summary: z.string(),
    description: z.string(),
    tag: z.string(),
    image: z.string().optional(),
  }),
});

export const updateNoticeSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    summary: z.string().optional(),
    description: z.string().optional(),
    tag: z.string().optional(),
    image: z.string().optional(),
  }),
});

export type CreateNoticeInput = z.infer<typeof createNoticeSchema>['body'];
export type UpdateNoticeInput = z.infer<typeof updateNoticeSchema>['body'];
