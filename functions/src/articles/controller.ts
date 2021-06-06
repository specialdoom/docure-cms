import { Request, Response } from "express";
import { handleError } from "../utils";
import admin from '../firebase';

const database = admin.database();

export async function add(req: Request, res: Response) {
  const { title, description, content, author, workflowId } = req.body;

  console.log(req.body);

  if (!title || !description || !content || !author || !workflowId) {
    return res.status(400).send({ message: 'No enough details.' })
  }

  try {
    database.ref('articles').push().set({
      title,
      description,
      content,
      author,
      workflowId,
      date: new Date().toString()
    });
    return res.status(200).send({ message: 'Article added successfully.' })
  } catch (e) {
    return handleError(res, e);
  }
}

export async function all(req: Request, res: Response) {
  try {
    const articles: any[] = [];
    await (await database.ref('articles').once("value")).forEach(item => {
      articles.push({ id: item.key, ...item.val() });
    });

    return res.status(200).send({ articles })
  } catch (e) {
    return handleError(res, e)
  }
}

export async function remove(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: 'No id provided.' })
  }

  try {
    await database.ref('articles').child(id).remove();
    const recentlyViewedArticles = database.ref('recently-viewed');
    await (await recentlyViewedArticles.once("value")).forEach(user =>
      user.forEach(article => {
        if (article.val().articleId === id) recentlyViewedArticles.child(`${user.key}/${article.key}`).remove();
      })
    );

    return res.status(200).send({ message: 'Article removed successfully.' })
  } catch (e) {
    return handleError(res, e)
  }
}