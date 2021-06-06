import { Application } from "express";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";
import { add, all, remove } from "./controller";

export function articleRoutesConfig(app: Application) {
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

  app.delete('/article/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['editor'] }),
    remove
  ]);
}