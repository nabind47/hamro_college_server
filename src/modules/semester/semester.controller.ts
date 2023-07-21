import { Request, Response } from 'express';
import { prisma } from '../../utils/prisma';
import { StatusCodes } from 'http-status-codes';

export const createSemester = async (req: Request, res: Response) => {
  try {
    const { title, total_fee, departmentId } = req.body;

    const semester = await prisma.semester.create({
      data: {
        title,

        total_fee,
        departmentId,
      },
    });

    res.status(StatusCodes.CREATED).json(semester);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create semester' });
  }
};

export const getAllSemesters = async (_req: Request, res: Response) => {
  try {
    const semesters = await prisma.semester.findMany({
      include: { department: true, subjects: true },
    });

    res.json(semesters);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve semesters' });
  }
};

export const getSemesterById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const semester = await prisma.semester.findUnique({
      where: { id: parseInt(id) },
    });

    if (semester) {
      res.json(semester);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Semester not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve semester' });
  }
};

export const updateSemester = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, total_fee, departmentId } = req.body;

    const semester = await prisma.semester.update({
      where: { id: parseInt(id) },
      data: {
        title,
        total_fee,
        departmentId,
      },
    });

    if (semester) {
      res.json(semester);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Semester not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update semester' });
  }
};

export const deleteSemester = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const semester = await prisma.semester.delete({
      where: { id: parseInt(id) },
    });

    if (semester) {
      res.json({ message: 'Semester deleted successfully' });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Semester not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete semester' });
  }
};
