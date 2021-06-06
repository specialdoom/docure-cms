import { firebase } from './Firebase';
import { Notification } from 'rsuite';
import { apiEndpoints } from '../config/api';

// const apiPath = 'https://us-central1-docure-9a8dd.cloudfunctions.net/api/users';
// const apiPathDev = 'http://localhost:5001/docure-9a8dd/us-central1/api/users';

export class UserService {
  getUsers() {
    if (firebase.auth().currentUser) {
      return firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          return fetch(apiEndpoints.users, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${idToken}`
            }
          }).then((res) => res.json());
        });
    } else {
      return Promise.resolve([]);
    }
  }

  getUser(id) {
    return firebase
      .auth()
      .currentUser.getIdToken(true)
      .then((idToken) => {
        return fetch(`${apiEndpoints.users}/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        })
          .then((res) => res.json())
          .then((data) => data.user);
      });
  }

  updateUserRole(userId, role, active) {
    return firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(function (idToken) {
        return fetch(`${apiEndpoints.users}/${userId}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${idToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ role, active })
        }).then(() => {
          Notification.success({
            title: 'User updated successfully',
            description: 'Changes will be available after a reload!'
          });
        });
      })
      .catch(function (error) {
        console.error('error', error);
      });
  }
}
