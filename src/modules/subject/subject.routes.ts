import express from 'express';
import {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from './subject.controller';
import { authenticate } from '../../middlewares/auth.middleware';

const router = express.Router();

router.route('/').post(createSubject).get(getAllSubjects);

router.use(authenticate);
router.route('/:id').get(getSubjectById).put(updateSubject).delete(deleteSubject);

export default router;
