import React, { Fragment } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Menu from './Menu';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import Hidden from '@mui/material/Hidden';

const web = {
  name: 'My page',
  title: '',
  description: '',
  favicon: '',
  logo: '/udru.png',
};

const Navbar = (props) => {
  const { menu, handleDrawerOpen } = props;
  return (
    <Fragment>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
        sx={{ background: '#fbfbfb' }}
      >
        <div>
          <Image src={web.logo} width={40} height={51} alt="Logo" />
        </div>
        <Hidden lgDown>
          <Menu menu={menu} />
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" size="large" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Stack>
    </Fragment>
  );
};

Navbar.propTypes = {
  handleDrawerOpen: PropTypes.func,
};

export default Navbar;
