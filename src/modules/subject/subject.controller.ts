import { Request, Response } from 'express';
import { prisma } from '../../utils/prisma';
import { StatusCodes } from 'http-status-codes';

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { title, sub_code, credit_hours, semesterId } = req.body;

    const subject = await prisma.subject.create({
      data: {
        title,
        credit_hours,
        sub_code,
        semesterId,
      },
    });

    res.status(StatusCodes.CREATED).json(subject);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create subject' });
  }
};

export const getAllSubjects = async (_req: Request, res: Response) => {
  try {
    const subjects = await prisma.subject.findMany();

    res.json(subjects);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve subjects' });
  }
};

export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const subject = await prisma.subject.findUnique({
      where: { id: parseInt(id) },
    });

    if (subject) {
      res.json(subject);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Subject not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve subject' });
  }
};

export const updateSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, sub_code, credit_hours, semesterId } = req.body;

    const subject = await prisma.subject.update({
      where: { id: parseInt(id) },
      data: {
        title,
        sub_code,
        credit_hours,
        semesterId,
      },
    });

    if (subject) {
      res.json(subject);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Subject not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update subject' });
  }
};

export const deleteSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const subject = await prisma.subject.delete({
      where: { id: parseInt(id) },
    });

    if (subject) {
      res.json({ message: 'Subject deleted successfully' });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Subject not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete subject' });
  }
};
