import React, { Fragment, useState } from 'react';
import Navbar from './Navbar';
import DrawerMenu from './DrawerMenu';
import Container from '@mui/material/Container';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = (props) => {
  const { children, menu } = props;
  const [toggleNav, setToggleNav] = useState(false);

  return (
    <Fragment>
      <header>
        <Container>
          <Navbar menu={menu} handleDrawerOpen={() => setToggleNav(true)} />
          <DrawerMenu
            menu={menu}
            onDrawerOpen={toggleNav}
            onDrawerClose={() => setToggleNav(false)}
          />
        </Container>
      </header>
      <main>
        <Container sx={{ minHeight: '65vh', padding: '16px 0' }}>
          <ToastContainer
            position="top-center"
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
          />
          {children}
        </Container>
      </main>
      <footer>
        <Container>
          <Footer />
        </Container>
      </footer>
    </Fragment>
  );
};

export default Index;
