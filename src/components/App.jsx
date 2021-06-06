import { useRecoilState } from 'recoil';
import { appState, userState } from '../store';
import { LoadedApp } from './LoadedApp.jsx';
import { LoadingApp } from './LoadingApp.jsx';
import { AuthService } from '../services/AuthService';
import { useEffect } from 'react';

const App = () => {
  const [app, setApp] = useRecoilState(appState);
  const setUser = useRecoilState(userState)[1];

  useEffect(() => {
    AuthService.auth().onAuthStateChanged((state) => {
      if (state) {
        AuthService.getUser().then((user) => {
          setApp({ isLoaded: true });
          setUser({
            email: user.email,
            displayName: user.displayName,
            uid: user.uid,
            roles: user.roles
          });
        });
      } else {
        setApp({ isLoaded: true });
      }
    });
  }, [setApp, setUser]);

  if (!app.isLoaded) return <LoadingApp />;
  if (app.isLoaded) return <LoadedApp />;

  return '';
};

export default App;
