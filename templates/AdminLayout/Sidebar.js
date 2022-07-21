import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import axios from 'axios';
import imageUtil from 'utils/imageUtil';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import LanguageIcon from '@mui/icons-material/Language';
import useStyles from './Styles';
import NavItem from './NavItem';

const Sidebar = (props) => {
  const router = useRouter();
  const { onDrawerOpen, onDrawerClose, menu, profile } = props;
  const classes = useStyles();

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', p: 2 }}>
        <Avatar
          sx={{ cursor: 'pointer', width: 50, height: 50 }}
          src={imageUtil.getImage(profile?.result?.data?.picture)}
        />
        <Typography minHeight={30} color="textSecondary" variant="body1" mt={1}>
          {profile?.result?.data?.name ?? ''}
        </Typography>
        <Link href="/">
          <Button color='inherit' size="small" sx={{ textAlign: 'center' }} endIcon={<LanguageIcon/>} >
            หน้าแรกเว็บไซต์
          </Button>
        </Link>
      </Box>
      <Divider />
      <List>
        {menu.map((item, index) => (
          <NavItem key={index} link={item.path} title={item.name} />
        ))}
        {/* logout */}
        <ListItem sx={{ display: 'flex', py: 0 }}>
          <a
            style={{ width: '100%' }}
            onClick={() => {
              axios.get('/api/logout').then(() => {
                router.push('/auth/login');
              });
            }}
          >
            <Button color="inherit" className={classes.customMenu}>
              <span>ออกจากระบบ</span>
            </Button>
          </a>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          open={onDrawerOpen}
          onClose={onDrawerClose}
          variant="temporary"
          PaperProps={{ sx: { width: 280 } }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open={true}
          variant="persistent"
          PaperProps={{ sx: { width: 280, top: 64, height: 'calc(100% - 64px)' } }}
        >
          {content}
        </Drawer>
      </Hidden>
    </Fragment>
  );
};

Sidebar.propTypes = {
  onDrawerOpen: PropTypes.bool,
  onDrawerClose: PropTypes.func,
};

Sidebar.defaultProps = {
  onDrawerOpen: false,
  onDrawerClose: () => {},
};

export default Sidebar;
