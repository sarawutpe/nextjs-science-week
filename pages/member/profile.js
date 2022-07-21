import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import useUser from 'hoc/useUser';
import actions from 'redux/actions';
import MainLayout from 'templates/MainLayout/Index';
import SubNavbar from 'templates/MainLayout/SubNavbar';
import Loading from 'components/Loading';
import { mainMenu } from 'utils/configMenu';
import { IMAGE_URL } from 'utils/constants';
import { useConfirm } from 'material-ui-confirm';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  // initial state
  useEffect(() => {
    dispatch(actions.getMemberByIdRequest(user?.id));
    dispatch(actions.getSchoolRequest());
  }, [router, user]);

  // global state
  const profile = useSelector(({ getMemberByIdReducer }) => getMemberByIdReducer);
  const getSchoolState = useSelector(({ getSchoolReducer }) => getSchoolReducer);
  const updateMemberState = useSelector(({ updateMemberReducer }) => updateMemberReducer);

  // set school option
  const schoolMemo = useMemo(() => {
    const schoolList = [];
    getSchoolState.result?.data?.map((row) => {
      schoolList.push({ label: row.name, id: row.school_id });
    });
    return schoolList;
  }, [profile, getSchoolState]);

  // get default school
  const defaultSchoolMemo = useMemo(() => {
    const schoolId = profile.result?.data?.school_id ?? '';
    return schoolMemo.findIndex((element) => element.id === schoolId);
  }, [profile, getSchoolState]);

  const inputImgRef = useRef();

  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      school_id: profile.result?.data?.school_id ?? '',
      username: profile.result?.data?.username ?? '',
      name: profile.result?.data?.name ?? '',
      email: profile.result?.data?.email ?? '',
      phone_number: profile.result?.data?.phone_number ?? '',
      address: profile.result?.data?.address ?? '',
      file: {},
    },
    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = 'จำเป็นต้องใช้';
      }
      if (!values.email) {
        errors.email = 'จำเป็นต้องใช้';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'รูปแบบไม่ถูกต้อง';
      }
      if (values.phone_number && !/^0[0-9]{9}$/i.test(values.phone_number)) {
        errors.phone_number = 'รูปแบบไม่ถูกต้อง';
      }
      return errors;
    },
    onSubmit: (values) => {
      // create form data
      const formData = new FormData();
      // append id
      formData.append('id', user?.id);
      // append school id
      // append username if change
      if (values.username !== formik.initialValues.username) {
        formData.append('username', values.username);
      }
      // append name
      formData.append('name', values.name);
      // append file if ready
      if (values.file) {
        formData.append('picture', values.file);
      }
      // set empty image
      if (values.file == null) {
        formData.append('picture', '');
      }
      // append email if change
      if (values.email !== formik.initialValues.email) {
        formData.append('email', values.email);
      }
      // append phone number
      formData.append('phone_number', values.phone_number);
      // append address
      formData.append('address', values.address);
      confirm({ description: 'ต้องการยืนยันการแก้ไขข้อมูลสมาชิกเว็บหรือไม่?' }).then(() => {
        dispatch(actions.updateMemberRequest(formData));
      });
    },
  });

  // protected
  if (user?.auth0) {
    return (
      <MainLayout menu={mainMenu}>
        <SubNavbar profile={profile}>
          <Box mb={3}>
            <Typography variant="h6">การตั้งค่าข้อมูลส่วนตัว</Typography>
          </Box>
          {profile.isFetching || getSchoolState.isFetching ? (
            <Loading />
          ) : (
            <div>
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
                  fullWidth
                  name="username"
                  value={formik.values.username}
                  helperText={formik.touched.username && formik.errors.username}
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
                <TextField
                  type="text"
                  variant="outlined"
                  label="โทรศัพท์"
                  size="small"
                  margin="dense"
                  name="phone_number"
                  fullWidth
                  value={formik.values.phone_number}
                  helperText={formik.touched.phone_number && formik.errors.phone_number}
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
                  multiline
                  minRows={2}
                  maxRows={3}
                  fullWidth
                  value={formik.values.address}
                  helperText={formik.touched.address && formik.errors.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormControl fullWidth margin="dense" size="small">
                  <Typography variant="subtitle1" mb={1}>
                    บุคคลทั่วไป/สถานศึกษา
                  </Typography>
                  <Autocomplete
                    disabled
                    disablePortal
                    disableClearable
                    noOptionsText="ไม่มีตัวเลือก"
                    options={schoolMemo}
                    defaultValue={schoolMemo[defaultSchoolMemo]}
                    onChange={(event, newValue) =>
                      formik.setFieldValue('school_id', newValue ? newValue : '')
                    }
                    onBlur={formik.handleBlur}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        helperText={formik.touched.school_id && formik.errors.school_id}
                        label="เลือก"
                      />
                    )}
                  />
                </FormControl>

                <Stack spacing={2} mt={2} mb={1}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={updateMemberState.isFetching}
                  >
                    บันทึก
                  </Button>
                </Stack>
              </form>
            </div>
          )}
        </SubNavbar>
      </MainLayout>
    );
  }

  return <></>;
};

export default Profile;
