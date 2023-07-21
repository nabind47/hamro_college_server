import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../utils/prisma';

export const createAttendance = async (req: Request, res: Response) => {
  try {
    const { presentDays, absentDays, studentId } = req.body;

    const attendance = await prisma.attendance.create({
      data: {
        presentDays,
        absentDays,
        studentId,
      },
    });

    res.status(StatusCodes.CREATED).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create attendance' });
  }
};

export const getAllAttendances = async (_req: Request, res: Response) => {
  try {
    const attendances = await prisma.attendance.findMany();

    res.json(attendances);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve attendances' });
  }
};

export const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const attendance = await prisma.attendance.findUnique({
      where: { id: parseInt(id) },
    });

    if (attendance) {
      res.json(attendance);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Attendance not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve attendance' });
  }
};

export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { presentDays, absentDays, studentId } = req.body;

    const attendance = await prisma.attendance.update({
      where: { id: parseInt(id) },
      data: {
        presentDays,
        absentDays,
        studentId,
      },
    });

    if (attendance) {
      res.json(attendance);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Attendance not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update attendance' });
  }
};

export const deleteAttendance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const attendance = await prisma.attendance.delete({
      where: { id: parseInt(id) },
    });

    if (attendance) {
      res.json({ message: 'Attendance deleted successfully' });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Attendance not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete attendance' });
  }
};
