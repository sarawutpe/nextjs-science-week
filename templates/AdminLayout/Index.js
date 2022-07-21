import React, { Fragment, useState } from 'react';
import Container from '@mui/material/Container';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { DashboardLayoutRoot, DashboardLayoutWrapper, DashboardLayoutContainer } from './Styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = (props) => {
  const { children, menu, profile } = props;
  const [toggleNav, setToggleNav] = useState(false);
  return (
    <Fragment>
      <DashboardLayoutRoot>
        <Navbar handleDrawerOpen={() => setToggleNav(true)} />
        <Sidebar onDrawerOpen={toggleNav} onDrawerClose={() => setToggleNav(false)} menu={menu} profile={profile} />
        <DashboardLayoutWrapper>
          <DashboardLayoutContainer>
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
          </DashboardLayoutContainer>
        </DashboardLayoutWrapper>
      </DashboardLayoutRoot>
    </Fragment>
  );
};

export default Index;
