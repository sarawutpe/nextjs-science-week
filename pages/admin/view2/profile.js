import React, { useEffect, useRef } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import { menu2 } from 'utils/configMenu';
import { IMAGE_URL } from 'utils/constants';
import { useConfirm } from 'material-ui-confirm';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const Profile = () => {
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
  const updateAdminState = useSelector(({ updateAdminReducer }) => updateAdminReducer);

  const getLevelDesc = (level) => {
    const desc = '';
    switch (level) {
      case 1:
        desc = 'ผู้ดูแลระบบ';
        break;
      case 2:
        desc = 'ผู้จัดกิจกรรม';
        break;
      case 3:
        desc = 'กรรมการกลาง';
        break;
      case 4:
        desc = 'ผู้จ่ายเงินรางวัล';
        break;
      case 5:
        desc = 'ผู้บริหาร';
        break;
      default:
        break;
    }
    return desc;
  };

  const getSuspendDesc = (suspend) => {
    const desc = '';
    switch (suspend) {
      case 0:
        desc = 'ปกติ';
        break;
      case 1:
        desc = 'ระงับ';
        break;
      default:
        break;
    }
    return desc;
  };

  const inputImgRef = useRef();

  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: profile.result?.data?.username ?? '',
      name: profile.result?.data?.name ?? '',
      email: profile.result?.data?.email ?? '',
      type: profile.result?.data?.type ?? '',
      level: getLevelDesc(profile.result?.data?.level ?? ''),
      suspend: getSuspendDesc(profile.result?.data?.suspend ?? ''),
      file: {},
    },
    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = 'จำเป็นต้องใช้';
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
      const formData = new FormData();
      formData.append('id', user?.id);
      // if change the username!
      if (values.username !== formik.initialValues.username) {
        formData.append('username', values.username);
      }
      // append name!
      formData.append('name', values.name);
      // if change the email!
      if (values.email !== formik.initialValues.email) {
        formData.append('email', values.email);
      }
      // if file ready!
      if (values.file && values.file_obj) {
        formData.append('picture', values.file);
      }
      // set empty image
      if (values.file == null) {
        formData.append('picture', '');
      }
      confirm({ description: 'ต้องการยืนยันการแก้ไขข้อมูลส่วนตัวหรือไม่?' }).then(() => {
        dispatch(actions.updateAdminRequest(formData));
      });
    },
  });

  // protected
  if (user?.auth2) {
    return (
      <AdminLayout menu={menu2} profile={profile}>
        <Box marginBottom={3}>
          <Typography variant="h6">การตั้งค่าข้อมูลส่วนตัว</Typography>
        </Box>
        {profile.isFetching ? (
          <Loading />
        ) : (
          <Stack spacing={4}>
            <form onSubmit={formik.handleSubmit}>
              <Box display="flex" justifyContent="center" mb={1}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  mb={1}
                >
                  <Box mb={2}>
                    <Avatar
                      src={
                        formik.values?.file == null
                          ? ''
                          : formik.values?.file_obj
                          ? formik.values?.file_obj
                          : profile.result?.data?.picture
                          ? IMAGE_URL + '/' + profile.result?.data?.picture
                          : ''
                      }
                      sx={{ width: 100, height: 100 }}
                    />
                  </Box>
                  <Box my={1}>
                    <input
                      ref={inputImgRef}
                      type="file"
                      value={formik.values.picture}
                      name="picture"
                      accept="image/jpeg, image/png"
                      onChange={(event) => {
                        // handle change
                        formik.handleChange;
                        // if file ready!
                        if (event.target.files.length) {
                          // For upload
                          formik.setFieldValue('file', event.target.files[0]);
                          // For preview
                          formik.setFieldValue(
                            'file_obj',
                            URL.createObjectURL(event.target.files[0])
                          );
                        }
                      }}
                    />
                    <input
                      type="button"
                      color="error"
                      value="ลบรูป"
                      onClick={() => {
                        inputImgRef.current.value = '';
                        formik.setFieldValue('file', null);
                      }}
                    />
                  </Box>
                </Box>
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
                type="text"
                variant="outlined"
                label="ชื่อ"
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
              <TextField
                type="text"
                variant="outlined"
                label="ประเภทบัญชี"
                size="small"
                margin="dense"
                name="type"
                fullWidth
                disabled
                value={formik.values.type}
                helperText={formik.touched.type && formik.errors.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                type="text"
                variant="outlined"
                label="บัญชี"
                size="small"
                margin="dense"
                name="level"
                fullWidth
                disabled
                value={formik.values.level}
                helperText={formik.touched.level && formik.errors.level}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                type="text"
                variant="outlined"
                label="สถานะบัญชี"
                size="small"
                margin="dense"
                name="suspend"
                fullWidth
                disabled
                value={formik.values.suspend}
                helperText={formik.touched.suspend && formik.errors.suspend}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Stack spacing={2} mt={2} mb={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={updateAdminState.isFetching}
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

export default Profile;
