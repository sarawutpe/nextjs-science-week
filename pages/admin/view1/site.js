import React, { useEffect, useRef } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import { menu1 } from 'utils/configMenu';
import { IMAGE_URL } from 'utils/constants';
import { useConfirm } from 'material-ui-confirm';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

const Site = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    dispatch(actions.getSiteRequest());
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const getSiteState = useSelector(({ getSiteReducer }) => getSiteReducer);
  const updateSiteState = useSelector(({ updateSiteReducer }) => updateSiteReducer);

  const inputImgRef = useRef();

  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      site_title: getSiteState.result?.data?.site_title ?? '',
      site_header: getSiteState.result?.data?.site_header ?? '',
      site_footer: getSiteState.result?.data?.site_footer ?? '',
      file: {},
    },
    onSubmit: (values) => {
      // create form data
      const formData = new FormData();
      formData.append('site_title', values.site_title);
      formData.append('site_header', values.site_header);
      formData.append('site_footer', values.site_footer);
      // If file ready!
      if (values.file && values.file_obj) {
        formData.append('site_banner', values.file);
      }
      // set empty image
      if (values.file == null) {
        formData.append('site_banner', '');
      }
      confirm({ description: 'ต้องการยืนยันการแก้ไขข้อมูลเว็บไซต์หรือไม่?' }).then(() => {
        // action
        dispatch(actions.updateSiteRequest(formData));
      });
    },
  });

  // protected
  if (user?.auth1) {
    return (
      <AdminLayout menu={menu1} profile={profile}>
        <Box marginBottom={3}>
          <Typography variant="h6">ตั้งค่าเว็บไซต์</Typography>
        </Box>
        {getSiteState.isFetching ? (
          <Loading />
        ) : (
          <Stack spacing={4}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                type="text"
                variant="outlined"
                label="Title เว็บไซต์"
                size="small"
                margin="dense"
                name="site_title"
                fullWidth
                value={formik.values.site_title}
                helperText={formik.touched.site_title && formik.errors.site_title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                type="text"
                variant="outlined"
                label="ส่วนหัวเว็บไซต์"
                size="small"
                margin="dense"
                name="site_header"
                fullWidth
                value={formik.values.site_header}
                helperText={formik.touched.site_header && formik.errors.site_header}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <TextField
                type="text"
                variant="outlined"
                label="ส่วนท้ายเว็บไซต์"
                size="small"
                margin="dense"
                name="site_footer"
                fullWidth
                value={formik.values.site_footer}
                helperText={formik.touched.site_footer && formik.errors.site_footer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Box>
                <Typography my={1} variant="subtitle2" color="error">
                  รองรับไฟล์ (JPG, JPEG, PNG)
                </Typography>
                <Avatar
                  variant="square"
                  src={
                    formik.values?.file == null
                      ? ''
                      : formik.values?.file_obj
                      ? formik.values?.file_obj
                      : getSiteState.result?.data?.site_banner
                      ? IMAGE_URL + '/' + getSiteState.result?.data?.site_banner
                      : ''
                  }
                  sx={{ width: '100%', height: '300px' }}
                >
                  <ImageIcon sx={{ fontSize: 90 }} />
                </Avatar>
                <Box display="flex" justifyContent="space-between" my={1}>
                  <input
                    ref={inputImgRef}
                    type="file"
                    value={formik.values.site_banner}
                    name="site_banner"
                    accept="image/jpeg image/png"
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
              <Stack spacing={2} mt={2} mb={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={updateSiteState.isFetching}
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

export default Site;
