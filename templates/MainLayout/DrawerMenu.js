import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';

const DrawerMenu = (props) => {
  const { menu, onDrawerOpen, onDrawerClose } = props;
  return (
    <Fragment>
       <Hidden lgUp>
        <Stack direction="row" justifyContent="space-between" width="100%" spacing={2}>
          <Drawer anchor="left" open={onDrawerOpen} onClose={onDrawerClose} variant="temporary" PaperProps={{ sx: { width: 256 }}}>
            <Menu menu={menu}/>
          </Drawer>
        </Stack>
      </Hidden>
    </Fragment>
  );
};

DrawerMenu.propTypes = {
  onDrawerOpen: PropTypes.bool,
  onDrawerClose: PropTypes.func,
};

DrawerMenu.defaultProps = {
  onDrawerOpen: false,
  onDrawerClose: () => {},
};

export default DrawerMenu;
