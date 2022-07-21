import React, { useState, useEffect, useMemo } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import { menu2 } from 'utils/configMenu';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const Mail = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const sendEmailState = useSelector(({ sendEmailReducer }) => sendEmailReducer);
  const getProgramByAdminIdState = useSelector(
    ({ getProgramByAdminIdReducer }) => getProgramByAdminIdReducer
  );

  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedActivityLevel, setSelectedActivityLevel] = useState('');

  const activityLevelMemo = useMemo(() => {
    setSelectedActivityLevel('');
    const program = getProgramByAdminIdState?.result?.data ?? [];
    const filter = program.filter((row) => row.activity_id == selectedActivity);
    return filter[0] || [];
  }, [selectedActivity]);

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    dispatch(actions.getProgramByAdminIdRequest({ id: user?.id }));
    dispatch(actions.getActivityByAdminIdRequest({ id: user?.id }));
    dispatch(actions.getActivityLevelRequest());
  }, [router, user]);

  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      subject: '',
      message: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.subject) {
        errors.subject = 'จำเป็นต้องใช้';
      }
      if (!values.message) {
        errors.message = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        activity: selectedActivity,
        activity_level: selectedActivityLevel,
        subject: values.subject,
        message: values.message,
      };
      // update admin action
      dispatch(actions.sendEmailRequest(data));
      formik.handleReset();
      setSelectedActivity('');
      setSelectedActivityLevel('');
    },
  });

  // protected
  if (user?.auth2) {
    return (
      <AdminLayout menu={menu2} profile={profile}>
        <Box marginBottom={3}>
          <Typography variant="h6">แจ้งข่าวสารสมาชิก</Typography>
          <Typography variant="subtitle2">
            ส่งข้อความไปยังอีเมล์ผู้สมัครเข้าร่วมกิจกรรม
          </Typography>
        </Box>
        <Box display="flex" mb={3}>
          <Box sx={{ width: 300, mr: 2 }}>
            <FormControl fullWidth margin="dense" size="small">
              <Typography variant="subtitle1">กิจกรรม</Typography>
              <Select
                value={selectedActivity}
                displayEmpty
                onChange={(e) => setSelectedActivity(e.target.value)}
                required
              >
                <MenuItem value="">เลือก</MenuItem>
                {getProgramByAdminIdState.result?.data?.map((row, index) => (
                  <MenuItem key={index} value={row.activity_id}>
                    {row.activity_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: 300, mr: 2 }}>
            <FormControl fullWidth margin="dense" size="small">
              <Typography variant="subtitle1">ระดับการแข่งขัน</Typography>
              <Select
                value={selectedActivityLevel}
                onChange={(event) => setSelectedActivityLevel(event.target.value)}
                displayEmpty
                required
              >
                <MenuItem value="">เลือก</MenuItem>
                {activityLevelMemo?.programs?.map((row, index) => (
                  <MenuItem key={index} value={row.activity_level_id}>
                    {row.activity_level?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        {sendEmailState.isFetching && <Loading />}
        <Stack spacing={4}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              label="เรื่อง"
              size="small"
              margin="dense"
              name="subject"
              fullWidth
              value={formik.values.subject}
              helperText={formik.touched.subject && formik.errors.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="ข้อความ"
              size="small"
              margin="dense"
              multiline
              minRows={8}
              maxRows={16}
              name="message"
              fullWidth
              value={formik.values.message}
              defaultValue={formik.values.message}
              helperText={formik.touched.message && formik.errors.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Stack spacing={2} mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={
                  sendEmailState.isFetching || !selectedActivity || !selectedActivityLevel
                }
              >
                {sendEmailState.isFetching ? 'กำลังส่ง...' : 'ส่ง'}
              </Button>
            </Stack>
          </form>
        </Stack>
      </AdminLayout>
    );
  }
  return <></>;
};

export default Mail;
