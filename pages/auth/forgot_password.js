import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import MainLayout from 'templates/MainLayout/Index';
import { mainMenu } from 'utils/configMenu';
import { useFormik } from 'formik';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // initial state
  useEffect(() => {
  }, []);

  // global state
  const forgotPasswordState = useSelector(({ forgotPasswordReducer }) => forgotPasswordReducer);

  // formik
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'จำเป็นต้องใช้';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'รูปแบบไม่ถูกต้อง';
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        email: values.email,
      };
      // forgot password action
      dispatch(actions.forgotPasswordRequest(data));
    },
  });

  return (
    <MainLayout menu={mainMenu}>
      <Card sx={{ maxWidth: 600, margin: 'auto' }}>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <div>
                <Typography variant="h6" sx={{ paddingBottom: 2 }}>
                  ลืมรหัสผ่าน
                </Typography>
              </div>
            </Stack>
            <TextField
              type="text"
              variant="outlined"
              label="อีเมล"
              size="small"
              margin="dense"
              name="email"
              fullWidth
              value={formik.values.email}
              helperText={formik.touched.email && formik.errors.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={forgotPasswordState.isFetching}
              fullWidth
            >
              ลีมรหัสผ่าน
            </Button>
          </CardActions>
        </form>
        <Box display="flex" justifyContent="flex-end" m={2}>
          <Link
            type="button"
            component="button"
            variant="body2"
            onClick={() => router.push('/auth/login')}
          >
            เข้าสู่ระบบ
          </Link>
        </Box>
      </Card>
    </MainLayout>
  );
};

export default ForgotPassword;
