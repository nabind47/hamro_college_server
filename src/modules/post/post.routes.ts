import express from 'express';
import { createPost, getPost, getPosts, removePost, updatePost } from './post.controller';
import { createPostSchema, updatePostSchema } from './post.schema';
import { authenticate } from '../../middlewares/auth.middleware';
import { validateResource } from '../../middlewares/validation.middleware';
import { uploadImageMiddleware } from '../../middlewares/upload.middleware';

const router = express.Router();

router.use(authenticate);
router
  .route('/')
  .get(getPosts)
  .post(uploadImageMiddleware, validateResource(createPostSchema), createPost);

router
  .route('/:id')
  .get(getPost)
  .put(validateResource(updatePostSchema), updatePost)
  .delete(removePost);

export default router;
