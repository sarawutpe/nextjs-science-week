import React, { useEffect } from 'react';
import useUser from 'hoc/useUser';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from 'templates/AdminLayout/Index';
import { menu5 } from 'utils/configMenu';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import actions from 'redux/actions';
import { useRouter } from 'next/router';

const Index = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);

  // protected
  if (user?.auth5) {
    return (
      <AdminLayout menu={menu5} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Typography variant="h6">หน้าแรก</Typography>
            </Stack>
            <Typography variant="subtitle1">
              {' '}
              {profile.result?.data?.name ? `ยินดีต้อนรับ ${profile.result?.data?.name}` : ''}
            </Typography>
          </Stack>
        </Box>
      </AdminLayout>
    );
  }
  return <></>;
};

export default Index;
