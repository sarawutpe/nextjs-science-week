import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useUser from 'hoc/useUser';
import MainLayout from 'templates/MainLayout/Index';
import SubNavbar from 'templates/MainLayout/SubNavbar';
import { mainMenu } from 'utils/configMenu';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import actions from 'redux/actions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { ThemeContext } from '../../pages/_app';

const Index = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  // initial state
  useEffect(() => {
    dispatch(actions.getMemberByIdRequest(user?.id));
  }, [router, user]);

  // global state
  const profile = useSelector(({ getMemberByIdReducer }) => getMemberByIdReducer);

  // protected
  if (user?.auth0) {
    return (
      <MainLayout menu={mainMenu}>
        <SubNavbar profile={profile}>
          <Box mb={3}>
            <Typography variant="h6">
              {profile.result?.data?.name ? `สวัสดี ${profile.result?.data?.name}` : ''}
            </Typography>
          </Box>
        </SubNavbar>
      </MainLayout>
    );
  }
  return <></>;
};

export default Index;
