import { Request, Response } from "express";
import { handleError } from "../utils";
import admin from '../firebase';

const database = admin.database();

export async function all(req: Request, res: Response) {
  try {
    const workflows: any[] = [];
    await (await database.ref('workflows').once("value")).forEach(item => {
      workflows.push({ id: item.key, title: item.val().title });
    });

    return res.status(200).send({ workflows })
  } catch (e) {
    return handleError(res, e)
  }
}