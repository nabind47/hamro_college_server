import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodSchema, ZodError } from 'zod';

export const validateResource =
  (schema: ZodSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map((err) => {
          return {
            field: err.path.join('.'),
            message: err.message,
          };
        });
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: validationErrors });
      }

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
  };
