import express from 'express';
import {
  createNotice,
  getNotice,
  getNotices,
  removeNotice,
  updateNotice,
} from './notice.controller';
import { createNoticeSchema, updateNoticeSchema } from './notice.schema';
// import { authenticate } from '../../middlewares/auth.middleware';
import { validateResource } from '../../middlewares/validation.middleware';

const router = express.Router();

// router.use(authenticate);
router.route('/notices').get(getNotices).post(validateResource(createNoticeSchema), createNotice);

router
  .route('/notices/:id')
  .get(getNotice)
  .put(validateResource(updateNoticeSchema), updateNotice)
  .delete(removeNotice);

export default router;
