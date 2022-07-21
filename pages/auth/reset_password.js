import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import actions from '../../redux/actions';
import MainLayout from 'templates/MainLayout/Index';
import { mainMenu } from 'utils/configMenu';
import { useFormik } from 'formik';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const ResetPassword = ({ auth, token }) => {
  const dispatch = useDispatch();
  
  // initial state
  useEffect(() => {
  }, []);

  // global state
  const resetPasswordState = useSelector(({ resetPasswordReducer }) => resetPasswordReducer);

  // formik
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.password) {
        errors.password = 'จำเป็นต้องใช้';
      }
      if (!values.confirm_password) {
        errors.confirm_password = 'จำเป็นต้องใช้';
      }
      if (
        values.password &&
        values.confirm_password &&
        values.password !== values.confirm_password
      ) {
        errors.password = 'รหัสผ่านไม่ตรงกัน ลองอีกครั้ง';
        errors.confirm_password = 'รหัสผ่านไม่ตรงกัน ลองอีกครั้ง';
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        password: values.password,
        token: token,
      };
      // action
      if (auth) {
        dispatch(actions.resetPasswordRequest(data));
      }
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
                  รีเซ็ตรหัสผ่าน
                </Typography>
              </div>
            </Stack>
            {/* form */}
            {auth.status && (
              <>
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
                />
                <TextField
                  type="password"
                  variant="outlined"
                  label="ยืนยันรหัสผ่าน"
                  size="small"
                  margin="dense"
                  name="confirm_password"
                  fullWidth
                  value={formik.values.confirm_password}
                  helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                  onChange={formik.handleChange}
                />
                <CardActions>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={resetPasswordState.isFetching}
                  >
                    รีเซ็ตรหัสผ่าน
                  </Button>
                </CardActions>
              </>
            )}
          </CardContent>
        </form>
      </Card>
    </MainLayout>
  );
};

export async function getServerSideProps(ctx) {
  // ctx
  const token = ctx.query.token;

  // !token
  if (!token) {
    return {
      notFound: true,
    };
  }

  // token
  if (token) {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${token}`
    );
    // send props
    if (result.data) {
      return { props: { isReset: true, auth: result.data, token: token } };
    }
  }

  // default props
  return { props: {} };
}

export default ResetPassword;
