import React, { Fragment, useContext } from 'react';
import { AppContext } from 'pages/_app';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  const siteContext = useContext(AppContext);
  return (
    <Fragment>
      <Box
        sx={{
          mt: 'auto',
          backgroundColor: '#fbfbfb',
        }}
      >
        <Box display="flex" flexDirection="row" my={4}>
          <Typography variant="body1">{siteContext?.site_footer ?? ''}</Typography>
        </Box>
        <Divider />
        <Box my={4} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body1">Copyright © {new Date().getFullYear() + 543}</Typography>
          <Stack direction="row" spacing={1}>
            <IconButton color="primary" aria-label="website link" component="span">
              <LanguageIcon />
            </IconButton>
            <IconButton color="primary" aria-label="facebook link" component="span">
              <FacebookIcon />
            </IconButton>
            <IconButton color="primary" aria-label="youtube link" component="span">
              <YouTubeIcon />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Footer;
