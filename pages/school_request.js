import React, { useEffect } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import actions from 'redux/actions';
import _ from 'lodash';
import MainLayout from 'templates/MainLayout/Index';
import { mainMenu } from 'utils/configMenu';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

const SchoolRequest = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  // initial state
  useEffect(() => {
    dispatch(actions.getSchoolRequest());

    // clear
    formik.handleReset();
  }, [router, user]);

  // global state
  const addSchoolState = useSelector(({ addSchoolReducer }) => addSchoolReducer);

  // START ADD SECTION //
  // formik
  const formik = useFormik({
    initialValues: {
      school_type: '1',
      name: '',
      address: '',
      sub_district: '',
      district: '',
      province: '',
      postcode: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'จำเป็นต้องใช้';
      } else if (!/^โรงเรียน/i.test(values.name)) {
        errors.name = 'ขึ้นต้นด้วยโรงเรียน';
      }
      if (!values.address) {
        errors.address = 'จำเป็นต้องใช้';
      }
      if (!values.sub_district) {
        errors.sub_district = 'จำเป็นต้องใช้';
      } else if (!/^ตำบล/i.test(values.sub_district)) {
        errors.sub_district = 'ขึ้นต้นด้วยตำบล';
      }
      if (!values.district) {
        errors.district = 'จำเป็นต้องใช้';
      } else if (!/^เขต|อำเภอ/i.test(values.district)) {
        errors.district = 'ขึ้นต้นด้วยเขตหรืออำเภอ';
      }
      if (!values.province) {
        errors.province = 'จำเป็นต้องใช้';
      } else if (!/^จังหวัด/i.test(values.province)) {
        errors.province = 'ขึ้นต้นด้วยจังหวัด';
      }
      if (!values.postcode) {
        errors.postcode = 'จำเป็นต้องใช้';
      } else if (!/^[0-9]{5}$/i.test(values.postcode)) {
        errors.postcode = 'รูปแบบไม่ถูกต้อง';
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        account: 'user',
        school_type: values.school_type,
        name: values.name,
        address: values.address,
        province: values.province,
        district: values.district,
        sub_district: values.sub_district,
        postcode: values.postcode,
      };
      dispatch(actions.addSchoolRequest(data));
    },
  });
  // END ADD SECTION //

  return (
    <MainLayout menu={mainMenu}>
      <Card sx={{ maxWidth: 600, margin: 'auto' }}>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <Stack>
              <Typography variant="h6" sx={{ paddingBottom: 2 }}>
                เพิ่มโรงเรียน
              </Typography>
            </Stack>
            <TextField
              type="text"
              variant="outlined"
              label="ชื่อโรงเรียน"
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
              label="ที่อยู่"
              size="small"
              margin="dense"
              name="address"
              fullWidth
              value={formik.values.address}
              helperText={formik.touched.address && formik.errors.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="ตำบล"
              size="small"
              margin="dense"
              name="sub_district"
              fullWidth
              value={formik.values.sub_district}
              helperText={formik.touched.sub_district && formik.errors.sub_district}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="อำเภอ"
              size="small"
              margin="dense"
              name="district"
              fullWidth
              value={formik.values.district}
              helperText={formik.touched.district && formik.errors.district}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="จังหวัด"
              size="small"
              margin="dense"
              name="province"
              fullWidth
              value={formik.values.province}
              helperText={formik.touched.province && formik.errors.province}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="รหัสไปรษณีย์"
              size="small"
              margin="dense"
              name="postcode"
              fullWidth
              value={formik.values.postcode}
              helperText={formik.touched.postcode && formik.errors.postcode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={addSchoolState.isFetching}
              fullWidth
            >
              เพิ่มโรงเรียน
            </Button>
          </CardActions>
        </form>
        <Box display="flex" justifyContent="flex-end" m={2}>
          <Link
            type="button"
            component="button"
            variant="body2"
            onClick={() => router.push('/auth/register')}
          >
            สมัครสมาชิก
          </Link>
        </Box>
      </Card>
    </MainLayout>
  );
};

export default SchoolRequest;
