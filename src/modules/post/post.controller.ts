import { Request, Response } from 'express';
import { prisma } from '../../utils/prisma';
import { CreatePostInput, UpdatePostInput } from './post.schema';

export const createPost = async (req: Request<{}, {}, CreatePostInput>, res: Response) => {
  const userId = +req.user?.id;
  try {
    const { title, description } = req.body;
    const imageFilename = req.file?.filename;

    const post = await prisma.post.create({
      data: { title, description, image: imageFilename, studentId: userId },
    });

    res.json({ message: 'Post created successfully!', post });
  } catch (error) {
    console.error('Failed to create post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: { student: { select: { name: true, profile: { select: { photo: true } } } } },
    });
    return res.send(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
};

export const getPost = async (req: Request<{ id: string }>, res: Response) => {
  const postId = +req.params.id;

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return res.status(404).send({ error: 'No Post Found' });
    }

    return res.send(existingPost);
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
};

export const updatePost = async (
  req: Request<{ id: string }, unknown, UpdatePostInput>,
  res: Response,
) => {
  const { title, description } = req.body;
  const imageFilename = req.file?.filename;
  const postId = +req.params.id;

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return res.status(404).send({ error: 'No Post Found' });
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { title, description, image: imageFilename },
    });

    return res.send(updatedPost);
  } catch (error) {
    console.error('Failed to update post:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
};

export const removePost = async (req: Request<{ id: string }>, res: Response) => {
  const postId = +req.params.id;

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return res.status(404).send({ error: 'No Post Found' });
    }

    await prisma.post.delete({ where: { id: postId } });
    return res.send({ message: 'Successfully Removed' });
  } catch (error) {
    console.error('Failed to remove post:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
};
