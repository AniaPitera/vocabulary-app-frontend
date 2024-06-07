import { Outlet } from 'react-router-dom';
import HeaderDefault from './DefaultHeader';

const DefaultLayout = () => {
  return (
    <div>
      <HeaderDefault />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
