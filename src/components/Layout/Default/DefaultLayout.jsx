import { Outlet } from 'react-router-dom';
import HeaderDefault from './DefaultHeader';
import Footer from '../Footer';

const DefaultLayout = () => {
  return (
    <div>
      <HeaderDefault />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
