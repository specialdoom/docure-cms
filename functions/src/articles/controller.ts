import { Request, Response } from "express";
import * as admin from 'firebase-admin'
import { handleError } from "../utils";
import * as serviceAccount from '../../credentials/docure-credentials.json';
import { DataSnapshot } from "@firebase/database-types";

const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url
}


admin.initializeApp({
  credential: admin.credential.cert(params),
  databaseURL: "https://docure-9a8dd-default-rtdb.europe-west1.firebasedatabase.app"
});

const database = admin.database();

export async function add(req: Request, res: Response) {
  const { title, description, content, author } = req.body;

  if (!title || !description || !content || !author) {
    return res.status(400).send({ message: 'No enough details.' })
  }

  try {
    database.ref('articles').push().set({
      title,
      description,
      content,
      author,
      date: new Date().toString()
    });
    return res.status(200).send({ message: 'Article added successfully.' })
  } catch (e) {
    return handleError(res, e);
  }
}

export async function all(req: Request, res: Response) {
  try {
    const articles: DataSnapshot[] = [];
    await (await database.ref('articles').once("value")).forEach(item => {
      articles.push(item);
    });

    return res.status(200).send({ articles })
  } catch (e) {
    return handleError(res, e)
  }
}