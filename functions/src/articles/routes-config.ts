import { Application } from "express";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";
import { add, all } from "./controller";

export function articleRoutesConfig(app: Application) {
  // add new article
  app.post('/article', [
    isAuthenticated,
    isAuthorized({ hasRole: ['editor'] }),
    add
  ]);

  app.get('/articles', [
    isAuthenticated,
    isAuthorized({ hasRole: ['editor'] }),
    all
  ]);
}