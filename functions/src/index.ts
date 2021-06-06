import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import { userRoutesConfig } from './users/routes-config';
import { articleRoutesConfig } from './articles/routes-config';

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
userRoutesConfig(app)
articleRoutesConfig(app)

export const docureCMS = functions.https.onRequest(app);