import { Request, Response } from 'express';
import { z } from 'zod';
import express from 'express';
import { validateResource } from './middlewares/validation.middleware';

const app = express();
app.use(express.json());

// Define your validation schema
const schema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(18),
});

type Input = z.infer<typeof schema>;

// Example route using the middleware
app.post('/users', validateResource(schema), (req: Request<{}, {}, Input>, res: Response) => {
  const { age, email, name } = req.body;
  res.status(200).json({ age, email, name });
});

app.listen(3000, () => {
  console.log('Listening');
});
