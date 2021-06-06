import { apiEndpoints } from '../config/api';
import { firebase } from './Firebase';

export const AuthService = {
  auth: () => firebase.auth(),

  getToken: () => firebase.auth().currentUser.getIdToken(),

  getUser: () =>
    AuthService.getToken().then((token) => {
      return fetch(`${apiEndpoints.users}/${firebase.auth().currentUser.uid}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((data) => data.user);
    }),

  login: () =>
    firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider()),

  logout: () =>
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.reload();
      })
};
