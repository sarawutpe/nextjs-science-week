import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from 'hoc/sessionOptions';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import actions from 'redux/actions';
import { mainMenu, memberMenu, menu1, menu2, menu3, menu4, menu5 } from 'utils/configMenu';
import MainLayout from 'templates/MainLayout/Index';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // initial state
  useEffect(() => {}, []);

  // global state
  const loginState = useSelector(({ loginReducer }) => loginReducer);

  // formik
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      account_type: 'member',
    },
    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = 'จำเป็นต้องใช้';
      }
      if (!values.password) {
        errors.password = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        username: values.username,
        password: values.password,
      };
      // action
      dispatch(actions.loginRequest(data));
    },
  });

  return (
    <MainLayout menu={mainMenu}>
      <Card sx={{ maxWidth: 600, margin: 'auto' }}>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <Box>
              <div>
                <Typography variant="h6" sx={{ paddingBottom: 2 }}>
                  เข้าสู่ระบบ
                </Typography>
              </div>
            </Box>
            <TextField
              type="text"
              variant="outlined"
              label="บัญชีผู้ใช้"
              size="small"
              margin="dense"
              name="username"
              fullWidth
              value={formik.values.username}
              helperText={formik.touched.username && formik.errors.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextField
              type="password"
              variant="outlined"
              label="รหัสผ่าน"
              size="small"
              margin="dense"
              name="password"
              fullWidth
              value={formik.values.password}
              helperText={formik.touched.password && formik.errors.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loginState.isFetching}
              fullWidth
            >
              เข้าสู่ระบบ
            </Button>
          </CardActions>
        </form>
        <Box display="flex" justifyContent="flex-end" m={2}>
          <Link
            type="button"
            component="button"
            variant="body2"
            onClick={() => router.push('/auth/forgot_password')}
          >
            ลืมรหัสผ่าน
          </Link>
        </Box>
      </Card>
    </MainLayout>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  const user = req.session.user;
  // redirect when user is logged in
  if (user !== undefined) {
    if (user.auth0) {
      return {
        redirect: {
          destination: memberMenu.main[0].path,
          permanent: false,
        },
      };
    } else if (user.auth1) {
      return {
        redirect: {
          destination: menu1[0].path,
          permanent: false,
        },
      };
    } else if (user.auth2) {
      return {
        redirect: {
          destination: menu2[0].path,
          permanent: false,
        },
      };
    } else if (user.auth3) {
      return {
        redirect: {
          destination: menu3[0].path,
          permanent: false,
        },
      };
    } else if (user.auth4) {
      return {
        redirect: {
          destination: menu4[0].path,
          permanent: false,
        },
      };
    } else if (user.auth5) {
      return {
        redirect: {
          destination: menu5[0].path,
          permanent: false,
        },
      };
    }
  }
  return {
    props: {},
  };
}, sessionOptions);

export default Login;
