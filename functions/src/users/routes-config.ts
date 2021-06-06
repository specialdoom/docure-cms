import { Application } from "express";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";
import { all, get, patch, remove } from "./controller";

export function userRoutesConfig(app: Application) {
  //..
  // lists all users
  app.get('/users', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
    all
  ]);
  // get :id user
  app.get('/users/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'], allowSameUser: true }),
    get
  ]);
  // updates :id user
  app.patch('/users/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'], allowSameUser: true }),
    patch
  ]);
  // deletes :id user
  app.delete('/users/:id', [
    isAuthenticated,
    isAuthorized({ hasRole: ['admin'] }),
    remove
  ]);
}