import { Request, Response } from 'express';
import { CreateBookInput, UpdateBookInput } from './book.schema';
import { prisma } from '../../utils/prisma';

export const createBook = async (req: Request<{}, {}, CreateBookInput>, res: Response) => {
  const { title, author, price, category } = req.body;

  try {
    const bookExists = await prisma.book.findFirst({
      where: { title },
    });

    if (bookExists) {
      return res.status(400).send({ error: 'A book with this title already exists' });
    }

    const book = await prisma.book.create({
      data: { title, author, price, category },
    });
    return res.send(book);
  } catch (error) {
    return res.status(500).send({ error: 'Unable to create book' });
  }
};

export const getBook = async (req: Request<{ id: string }>, res: Response) => {
  const bookId = +req.params.id;

  try {
    const foundBook = await prisma.book.findFirst({
      where: { id: bookId },
      include: { User: true },
    });

    if (!foundBook) {
      return res.status(404).send({ error: 'Book not found' });
    }

    return res.send(foundBook);
  } catch (error) {
    return res.status(500).send({ error: 'Unable to get book' });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    return res.send(books);
  } catch (error) {
    return res.status(500).send({ error: 'Unable to query for books' });
  }
};

export const updateBook = async (req: Request<{ id: string }, unknown, UpdateBookInput>, res: Response) => {
  const bookId = +req.params.id;
  const { title, author, price, category } = req.body;

  try {
    const existingBook = await prisma.book.findUnique({ where: { id: bookId } });
    if (!existingBook) {
      return res.status(404).send({ error: 'No book found' });
    }

    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: { author, category, price, title },
    });
    return res.send(updatedBook);
  } catch (error) {
    return res.status(500).send({ error: 'Unable to update book' });
  }
};

export const removeBook = async (req: Request<{ id: string }>, res: Response) => {
  const bookId = +req.params.id;
  try {
    const existingBook = await prisma.book.findFirst({ where: { id: bookId } });
    if (!existingBook) {
      return res.status(404).send({ error: 'No book found' });
    }

    await prisma.book.delete({ where: { id: bookId } });
    return res.send({ message: 'Successfully removed!' });
  } catch (error) {
    return res.status(500).send({ error: 'Unable to remove book' });
  }
};
