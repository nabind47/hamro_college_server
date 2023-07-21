import express from 'express';
import {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} from './attendance.controller';

const router = express.Router();

router.route('/attendances').post(createAttendance).get(getAllAttendances);
router
  .route('/attendances/:id')
  .get(getAttendanceById)
  .put(updateAttendance)
  .delete(deleteAttendance);

export default router;
