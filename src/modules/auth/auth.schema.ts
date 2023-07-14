import { z } from 'zod';

// Registration
const registerUserSchema = z
  .object({
    body: z.object({
      name: z.string(),
      email: z.string().email().endsWith('@ncit.edu.np'),
      password: z.string().min(6),
      passwordConfirmation: z.string().min(6),
    }),
  })
  .refine((data) => data.body.password === data.body.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

export type RegisterInput = z.infer<typeof registerUserSchema>['body'];

// Login
const loginUserSchema = z.object({
  body: z.object({
    email: z.string().email().endsWith('@ncit.edu.np'),
    password: z.string().min(6),
  }),
});

export type LoginInput = z.infer<typeof loginUserSchema>['body'];

// Forgot password
const forgotPasswordSchema = z
  .object({
    body: z.object({
      email: z.string().email().endsWith('@ncit.edu.np'),
      password: z.string().min(6),
      passwordConfirmation: z.string().min(6),
    }),
  })
  .refine((data) => data.body.password === data.body.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

export type ForgotInput = z.infer<typeof forgotPasswordSchema>['body'];

// Change Password
const chnagePasswordSchema = z
  .object({
    body: z.object({
      oldPassword: z.string().min(6),
      password: z.string().min(6),
      passwordConfirmation: z.string().min(6),
    }),
  })
  .refine((data) => data.body.password === data.body.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

export type ChangeInput = z.infer<typeof chnagePasswordSchema>['body'];

export { registerUserSchema, loginUserSchema, forgotPasswordSchema, chnagePasswordSchema };
