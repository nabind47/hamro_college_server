import { Request, Response } from 'express';
import { prisma } from '../../utils/prisma';
import { StatusCodes } from 'http-status-codes';

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    const department = await prisma.department.create({
      data: {
        title,
      },
    });

    res.status(StatusCodes.CREATED).json(department);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create department' });
  }
};

export const getAllDepartments = async (_req: Request, res: Response) => {
  try {
    const departments = await prisma.department.findMany({ include: { semesters: true } });

    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve departments' });
  }
};

export const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const department = await prisma.department.findUnique({
      where: { id: parseInt(id) },
    });

    if (department) {
      res.json(department);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Department not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve department' });
  }
};

export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const department = await prisma.department.update({
      where: { id: parseInt(id) },
      data: {
        title,
      },
    });

    if (department) {
      res.json(department);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Department not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update department' });
  }
};

export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const department = await prisma.department.delete({
      where: { id: parseInt(id) },
    });

    if (department) {
      res.json({ message: 'Department deleted successfully' });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: 'Department not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete department' });
  }
};
