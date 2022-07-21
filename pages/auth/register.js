import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import { useFormik } from 'formik';
import { mainMenu } from 'utils/configMenu';
import MainLayout from 'templates/MainLayout/Index';
import Loading from 'components/Loading';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // global state
  const getSchoolState = useSelector(({ getSchoolReducer }) => getSchoolReducer);
  const registerState = useSelector(({ registerReducer }) => registerReducer);

  // initial state
  useEffect(() => {
    dispatch(actions.getSchoolRequest());
  }, [router]);

  // set school option
  const schoolMemo = useMemo(() => {
    const schoolList = [];
    getSchoolState.result?.data?.map((row) => {
      let school = '';
      if (row.school_type == 1) {
        school = `${row.name}, ${row.address} ${row.sub_district} ${row.district} ${row.province}, ${row.postcode}`;
      } else {
        school = row.name;
      }
      schoolList.push({ label: school, id: row.school_id });
    });
    return schoolList;
  }, [getSchoolState]);

  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      school_id: '',
      username: '',
      password: '',
      confirm_password: '',
      name: '',
      email: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.school_id) {
        errors.school_id = 'จำเป็นต้องใช้';
      }
      if (!values.username) {
        errors.username = 'จำเป็นต้องใช้';
      }
      if (!values.password) {
        errors.password = 'จำเป็นต้องใช้';
      }
      if (!values.confirm_password) {
        errors.confirm_password = 'จำเป็นต้องใช้';
      }
      if (values.password && values.confirm_password && values.password !== values.confirm_password) {
        errors.password = 'รหัสผ่านไม่ตรงกัน ลองอีกครั้ง';
        errors.confirm_password = 'รหัสผ่านไม่ตรงกัน ลองอีกครั้ง';
      }
      if (!values.name) {
        errors.name = 'จำเป็นต้องใช้';
      }
      if (!values.email) {
        errors.email = 'จำเป็นต้องใช้';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'รูปแบบไม่ถูกต้อง';
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        school_id: values.school_id?.id,
        username: values.username,
        password: values.password,
        name: values.name,
        email: values.email,
        type: 'member',
        suspend: false,
      };
      // action
      dispatch(actions.registerRequest(data));
      formik.handleReset();
    },
  });

  return (
    <MainLayout menu={mainMenu}>
      {getSchoolState.isFetching ? (
        <Loading />
      ) : (
        <Card sx={{ maxWidth: 600, margin: 'auto' }}>
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <Stack>
                <Typography variant="h6" sx={{ paddingBottom: 2 }}>
                  สมัครสมาชิกเว็บ
                </Typography>
              </Stack>
              <Typography variant="subtitle1">ข้อมูลเข้าสู่ระบบ</Typography>
              <TextField
                type="text"
                variant="outlined"
                label="บัญชีผู้ใช้"
                size="small"
                margin="dense"
                fullWidth
                name="username"
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
                onBlur={formik.handleBlur}
              />
              <TextField
                type="text"
                variant="outlined"
                label="ชื่อ-นามสกุล"
                size="small"
                margin="dense"
                name="name"
                fullWidth
                value={formik.values.name}
                helperText={formik.touched.name && formik.errors.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
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
              <FormControl fullWidth margin="dense" size="small">
                <Box display="flex" justifyContent="space-between" alignItems="baseline" mb={1}>
                  <div>
                    <Typography variant="subtitle1" mb={1}>
                      บุคคลทั่วไป/สถานศึกษา
                    </Typography>
                  </div>
                  <div>
                    <Button variant="text" color="secondary" onClick={() => router.push('/school_request')}>
                      ต้องการเพิ่มโรงเรียน?
                    </Button>
                  </div>
                </Box>
                <Autocomplete
                  disablePortal
                  disableClearable
                  options={schoolMemo}
                  noOptionsText="ไม่มีตัวเลือก"
                  value={formik.values.school_id}
                  onChange={(event, newValue) => formik.setFieldValue('school_id', newValue ? newValue : '')}
                  onBlur={formik.handleBlur}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="school_id"
                      helperText={formik.touched.school_id && formik.errors.school_id}
                      label="เลือก"
                    />
                  )}
                />
              </FormControl>
            </CardContent>
            <CardActions>
              <Button type="submit" variant="contained" color="primary" disabled={registerState.isFetching} fullWidth>
                สมัครสมาชิกเว็บ
              </Button>
            </CardActions>
          </form>
          <Box display="flex" justifyContent="space-between" m={2}>
            <Typography variant="body2">มีบัญชีอยู่แล้ว?</Typography>
            <Link component="button" variant="body2" onClick={() => router.push('/auth/login')}>
              เข้าสู่ระบบ
            </Link>
          </Box>
        </Card>
      )}
    </MainLayout>
  );
};

export default Register;
