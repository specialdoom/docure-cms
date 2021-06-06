import { atom, selector } from 'recoil';

export const userState = atom({
  key: 'user',
  default: {
    email: '',
    displayName: '',
    uid: '',
    roles: []
  }
});

export const roles = selector({
  key: 'roles',
  get: ({ get }) => {
    const roles = get(userState).roles;
    return {
      isAdmin: roles.includes('admin'),
      isEditor: roles.includes('editor')
    };
  }
});

export const appState = atom({
  key: 'app',
  default: {
    isLoaded: false
  }
});
