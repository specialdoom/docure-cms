import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { roles, userState } from '../store';
import { ContentHandler } from './ContentHandler';
import { Header } from './layout/Header';
import { Home, Articles, User, Article, Workflows } from './pages';
import { NotAuth } from './pages/NotAuth';

export const LoadedApp = () => {
  const [user] = useRecoilState(userState);
  const [userRoles] = useRecoilState(roles);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/article'>
          <ContentHandler display={user.uid}>
            <Article />
          </ContentHandler>
          <ContentHandler display={!user.uid}>
            <NotAuth />
          </ContentHandler>
        </Route>
        <Route path='/articles'>
          <ContentHandler display={user.uid}>
            <Articles />
          </ContentHandler>
          <ContentHandler display={!user.uid}>
            <NotAuth />
          </ContentHandler>
        </Route>
        <Route path='/workflows'>
          <ContentHandler display={user.uid}>
            <Workflows />
          </ContentHandler>
          <ContentHandler display={!user.uid}>
            <NotAuth />
          </ContentHandler>
        </Route>
        <Route path='/users'>
          <ContentHandler display={user.uid && userRoles.isAdmin}>
            <User />
          </ContentHandler>
          <ContentHandler display={!user.uid || !userRoles.isAdmin}>
            <NotAuth />
          </ContentHandler>
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
