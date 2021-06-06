import { firebase } from './Firebase';
import { apiEndpoints } from '../config/api';

export class ArticleService {
  add(data) {
    if (firebase.auth().currentUser) {
      return firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          return fetch(apiEndpoints.article.add, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${idToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then((res) => res.json());
        });
    } else {
      return Promise.resolve('');
    }
  }

  remove(articleId) {
    if (firebase.auth().currentUser) {
      return firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          return fetch(`${apiEndpoints.article.remove}/${articleId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${idToken}`,
              Accept: 'application/json'
            }
          }).then((res) => res.json());
        });
    } else {
      return Promise.resolve([]);
    }
  }

  getAll() {
    if (firebase.auth().currentUser) {
      return firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          return fetch(apiEndpoints.article.getAll, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${idToken}`,
              Accept: 'application/json'
            }
          }).then((res) => res.json());
        });
    } else {
      return Promise.resolve([]);
    }
  }
}
