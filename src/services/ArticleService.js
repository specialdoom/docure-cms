import { firebase } from './Firebase';
import { apiEndpoints } from '../config/api';

// const apiPath = 'https://us-central1-docure-9a8dd.cloudfunctions.net/api/users';
// const apiPathDev = 'http://localhost:5001/docure-9a8dd/us-central1/api/users';

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
