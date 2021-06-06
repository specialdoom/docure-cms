import { Application } from "express";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";
import { all } from "./controller";

export function workflowRoutesConfig(app: Application) {
  // get all workflows
  app.get('/workflows', [
    isAuthenticated,
    isAuthorized({ hasRole: ['editor'] }),
    all
  ]);
}