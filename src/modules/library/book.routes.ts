import { Router } from 'express';
import { createBookSchema, updateBookSchema } from './book.schema';
import { createBook, getBook, getBooks, removeBook, updateBook } from './book.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { validateResource } from '../../middlewares/validation.middleware';

const router = Router();

router.use(authenticate);
router.route('/books').get(getBooks).post(validateResource(createBookSchema), createBook);
router.route('/books/:id').get(getBook).put(validateResource(updateBookSchema), updateBook).delete(removeBook);

export default router;
