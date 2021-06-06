import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <docure-list>
      <docure-list-item title='Admin' description='Create and update users'>
        <Link to='/users'>Go to users</Link>
      </docure-list-item>
      <docure-list-item title='Editor' description='Create and update articles'>
        <Link to='/articles'>Go to articles</Link>
      </docure-list-item>
    </docure-list>
  </>
);

export default Home;
