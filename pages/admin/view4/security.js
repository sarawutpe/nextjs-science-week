import React, { useEffect } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import { menu4 } from 'utils/configMenu';
import { useConfirm } from 'material-ui-confirm';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const Security = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const updatePasswordState = useSelector(({ updatePasswordReducer }) => updatePasswordReducer);

  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      current_password: '',
      password: '',
      new_password: '',
      confirm_new_password: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.current_password) {
        errors.current_password = 'จำเป็นต้องใช้';
      }
      if (!values.new_password) {
        errors.new_password = 'จำเป็นต้องใช้';
      }
      if (!values.confirm_new_password) {
        errors.confirm_new_password = 'จำเป็นต้องใช้';
      }
      if (values.new_password && values.confirm_new_password) {
        if (values.new_password !== values.confirm_new_password) {
          errors.new_password = 'รหัสผ่านใหม่ไม่ตรงกัน';
          errors.confirm_new_password = 'รหัสผ่านใหม่ไม่ตรงกัน';
        }
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        id: user?.id,
        current_password: values.current_password,
        new_password: values.new_password,
        type: 'admin',
      };

      confirm({ description: 'ต้องการยืนยันการเปลี่ยนรหัสผ่านหรือไม่?' }).then(() => {
        // action
        dispatch(actions.updatePasswordRequest(data));
        formik.resetForm();
      });
    },
  });

  // protected
  if (user?.auth4) {
    return (
      <AdminLayout menu={menu4} profile={profile}>
        <Box marginBottom={3}>
          <Typography variant="h6">ความปลอดภัยและการเข้าสู่ระบบ</Typography>
        </Box>
        {updatePasswordState.isFetching ? (
          <Loading />
        ) : (
          <Stack spacing={4}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                type="password"
                variant="outlined"
                label="รหัสผ่านเดิม"
                size="small"
                margin="dense"
                name="current_password"
                fullWidth
                value={formik.values.current_password}
                helperText={formik.touched.current_password && formik.errors.current_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                type="password"
                variant="outlined"
                label="รหัสผ่านใหม่"
                size="small"
                margin="dense"
                name="new_password"
                fullWidth
                value={formik.values.new_password}
                helperText={formik.touched.new_password && formik.errors.new_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                type="password"
                variant="outlined"
                label="รหัสผ่านใหม่อีกครั้ง"
                size="small"
                margin="dense"
                name="confirm_new_password"
                fullWidth
                value={formik.values.confirm_new_password}
                helperText={formik.touched.confirm_new_password && formik.errors.confirm_new_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Stack spacing={2} mt={2} mb={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={updatePasswordState.isFetching}
                >
                  บันทึก
                </Button>
              </Stack>
            </form>
          </Stack>
        )}
      </AdminLayout>
    );
  }
  return <></>;
};

export default Security;
