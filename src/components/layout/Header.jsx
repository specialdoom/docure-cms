import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { AuthService } from '../../services/AuthService';
import { userState, roles } from '../../store';
import { ContentHandler } from '../ContentHandler';

export const Header = () => {
  const [user] = useRecoilState(userState);
  const [userRoles] = useRecoilState(roles);

  return (
    <docure-header>
      <docure-header-item>
        <Link to='/'>Home</Link>
      </docure-header-item>
      <ContentHandler display={userRoles.isEditor || userRoles.isAdmin}>
        <docure-header-item>
          <Link to='/articles'>Articles</Link>
        </docure-header-item>
      </ContentHandler>
      <ContentHandler display={userRoles.isAdmin}>
        <docure-header-item>
          <Link to='/users'>Users</Link>
        </docure-header-item>
      </ContentHandler>
      <ContentHandler display={user.uid}>
        <docure-header-item isright>
          <docure-icon logout onClick={AuthService.logout} />
        </docure-header-item>
      </ContentHandler>
      <ContentHandler display={!user.uid}>
        <docure-header-item isright>
          <docure-icon login onClick={AuthService.login} />
        </docure-header-item>
      </ContentHandler>
    </docure-header>
  );
};
