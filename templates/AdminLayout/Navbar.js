import React from 'react';
import PropTypes from 'prop-types';
import { AppBar } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

const Navbar = (props) => {
  const { handleDrawerOpen } = props;
  return (
    <AppBar elevation={0} >
      <Toolbar sx={{justifyContent: 'space-between'}}>
        <Typography variant='h6'>UDRU</Typography>
        <div>
          <Hidden lgUp>
            <IconButton color="inherit" size="large" onClick={handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </div>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  handleDrawerOpen: PropTypes.func
};

export default Navbar;