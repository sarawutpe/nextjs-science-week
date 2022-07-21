import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { memberMenu } from 'utils/configMenu';
import imageUtil from 'utils/imageUtil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';

const SubNavbar = (props) => {
  const router = useRouter();
  const { children, profile } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickAnchorEl = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Box display="flex" flexDirection="column" bgcolor="rgb(248,248,248,0.5)">
        <div>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', textAlign: 'center' }}>
            {memberMenu.main.map((item, index) => (
              <div key={index}>
                <Link href={item.path}>
                  <MenuItem>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {item.name}
                  </MenuItem>
                </Link>
              </div>
            ))}

            <Tooltip title={profile?.result?.data?.name ?? ''}>
              <IconButton
                onClick={handleClickAnchorEl}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar src={imageUtil.getImage(profile?.result?.data?.picture)} sx={{ width: 32, height: 32 }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {memberMenu.account.map((item, index) => (
              <div key={index}>
                <Link href={item.path}>
                  <MenuItem>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    {item.name}
                  </MenuItem>
                </Link>
              </div>
            ))}
            <a
              onClick={() => {
                axios.get('/api/logout').then(() => {
                  router.push('/auth/login');
                });
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                ออกจากระบบ
              </MenuItem>
            </a>
          </Menu>
        </div>
        <div>
          <Box sx={{ p: 2, minHeight: '100vh', maxWidth: '100%' }}>
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
          </Box>
        </div>
      </Box>
    </Fragment>
  );
};

export default SubNavbar;
