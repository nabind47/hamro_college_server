import { Request, Response } from 'express';
import { CreateNoticeInput, UpdateNoticeInput } from './notice.schema';
import { prisma } from '../../utils/prisma';

export const createNotice = async (
  req: Request<{}, {}, CreateNoticeInput>,
  res: Response,
) => {
  try {
    const { title, content, tags } = req.body;
    const notice = await prisma.notice.create({
      data: { title, content, tags },
    });
    return res.send(notice);
  } catch (error) {
    console.error('Failed to create notice:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
};

export const getNotices = async (req: Request, res: Response) => {
  try {
    const notices = await prisma.notice.findMany();
    return res.send(notices);
  } catch (error) {
    console.error('Failed to fetch notices:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
};

export const getNotice = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const noticeId = +req.params.id;

  try {
    const existingNotice = await prisma.notice.findUnique({
      where: { id: noticeId },
    });

    if (!existingNotice) {
      return res.status(404).send({ error: 'No Notice Found' });
    }

    return res.send(existingNotice);
  } catch (error) {
    console.error('Failed to fetch notice:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
};

export const updateNotice = async (
  req: Request<{ id: string }, unknown, UpdateNoticeInput>,
  res: Response,
) => {
  const { title, content, tags } = req.body;
  const noticeId = +req.params.id;

  try {
    const existingNotice = await prisma.notice.findUnique({
      where: { id: noticeId },
    });

    if (!existingNotice) {
      return res.status(404).send({ error: 'No Notice Found' });
    }

    const updatedNotice = await prisma.notice.update({
      where: { id: noticeId },
      data: { title, content, tags },
    });

    return res.send(updatedNotice);
  } catch (error) {
    console.error('Failed to update notice:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
};

export const removeNotice = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const noticeId = +req.params.id;

  try {
    const existingNotice = await prisma.notice.findUnique({
      where: { id: noticeId },
    });

    if (!existingNotice) {
      return res.status(404).send({ error: 'No Notice Found' });
    }

    await prisma.notice.delete({ where: { id: noticeId } });
    return res.send({ message: 'Successfully Removed' });
  } catch (error) {
    console.error('Failed to remove notice:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
};
