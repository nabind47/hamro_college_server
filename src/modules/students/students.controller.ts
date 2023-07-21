import { Request, Response } from 'express';
import { prisma } from '../../utils/prisma';
import { StatusCodes } from 'http-status-codes';

export const attendence = async (req: Request, res: Response) => {
  const studentId = req.user?.id;

  console.log(studentId, 'ok');

  try {
    const attendence = await prisma.attendance.create({
      data: {
        id: studentId,
        presentDays: 20,
        absentDays: 5,
      },
    });
    return res.status(StatusCodes.CREATED).json({ data: attendence });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error creating attendence' });
  }
};
