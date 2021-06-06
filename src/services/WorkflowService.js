import { firebase } from './Firebase';
import { apiEndpoints } from '../config/api';

export class WorkflowService {
  getAll() {
    if (firebase.auth().currentUser) {
      return firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          return fetch(apiEndpoints.workflow.getAll, {
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
