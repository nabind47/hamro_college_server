import express from 'express';
import {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
} from './semester.controller';

const router = express.Router();

router.route('/').post(createSemester).get(getAllSemesters);
router.route('/:id').get(getSemesterById).put(updateSemester).delete(deleteSemester);

export default router;
