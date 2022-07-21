import React, { Fragment, useState, useEffect, useMemo } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import { menu1 } from 'utils/configMenu';
import { useConfirm } from 'material-ui-confirm';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import CustomDialog from 'components/CustomDialog';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';

const MemberManage = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  // state
  const [search, setSearch] = useState('');

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    dispatch(actions.getSchoolRequest());
    // clear
    if (openAddDialog) {
      setOpenAddDialog(false);
      addFormik.handleReset();
    } else if (openEditDialog) {
      setOpenEditDialog(false);
      editFormik.handleReset();
    }
    // get member
    if (router.isReady) {
      dispatch(actions.getMemberRequest(router.query.search));
    }
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const addMemberState = useSelector(({ addMemberReducer }) => addMemberReducer);
  const getMemberState = useSelector(({ getMemberReducer }) => getMemberReducer);
  const getSchoolState = useSelector(
    ({ getSchoolReducer }) => getSchoolReducer
  );
  const updateMemberState = useSelector(({ updateMemberReducer }) => updateMemberReducer);

  // START ADD SECTION //
  // dialog
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // handle open add dialog
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  // handle close add dialog
  const handleCloseAddDialog = () => {
    // close dialog
    setOpenAddDialog(false);
    // clear addFormik state
    addFormik.setErrors({});
    addFormik.setTouched({});
  };

  // add formik
  const addFormik = useFormik({
    initialValues: {
      school_id: '',
      username: '',
      password: '',
      confirm_password: '',
      name: '',
      email: '',
      phone_number: '',
      address: '',
      suspend: '0',
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
      if (
        values.password &&
        values.confirm_password &&
        values.password !== values.confirm_password
      ) {
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
      if (!values.phone_number) {
        errors.phone_number = 'จำเป็นต้องใช้';
      } else if (!/^0[0-9]{9}$/i.test(values.phone_number)) {
        errors.phone_number = 'รูปแบบไม่ถูกต้อง';
      }
      return errors;
    },
    onSubmit: (values) => {
      // create form data
      const formData = new FormData();
      formData.append('school_id', values.school_id?.id);
      formData.append('username', values.username);
      formData.append('password', values.password);
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phone_number', values.phone_number);
      formData.append('type', 'member');
      formData.append('suspend', values.suspend);
      // action
      dispatch(actions.addMemberRequest(formData));
    },
  });
  // END ADD SECTION //

  // START EDIT SECTION //
  // initial member
  const [initialMember, setInitialMember] = useState({
    member_id: '',
    school_id: '',
    username: '',
    name: '',
    phone_number: '',
    address: '',
    suspend: '',
  });

  // set school option
  const schoolMemo = useMemo(() => {
    const schoolList = [];
    getSchoolState?.result?.data?.map((row) => {
      let school = '';
      if (row.school_type) {
        school = `${row.name}, ${row.address} ${row.sub_district} ${row.district} ${row.province}, ${row.postcode}`;
      } else {
        school = row.name;
      }
      schoolList.push({ label: school, id: row.school_id });
    });
    return schoolList;
  }, [router, getSchoolState]);

  // get default school
  const defaultSchoolMemo = useMemo(() => {
    const schoolId = initialMember.school_id;
    return schoolMemo.findIndex((element) => element.id === schoolId);
  }, [getSchoolState, initialMember]);

  // edit dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // handle open edit dialog
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  // handle close edit dialog
  const handleCloseEditDialog = () => {
    // close dialog
    setOpenEditDialog(false);
    // clear addFormik state
    editFormik.setErrors({});
    editFormik.setTouched({});
  };

  // edit formik
  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      school_id: initialMember?.school_id ?? '',
      username: initialMember?.username ?? '',
      password: '',
      confirm_password: '',
      name: initialMember?.name ?? '',
      email: initialMember?.email ?? '',
      phone_number: initialMember?.phone_number ?? '',
      address: initialMember?.address ?? '',
      suspend: initialMember.suspend ? 1 : 0,
    },
    validate: (values) => {
      const errors = {};
      if (!values.school_id) {
        errors.school_id = 'จำเป็นต้องใช้';
      }
      if (!values.username) {
        errors.username = 'จำเป็นต้องใช้';
      }
      if (values.password && values.confirm_password) {
        if (values.password !== values.confirm_password) {
          errors.password = 'รหัสผ่านไม่ตรงกัน';
          errors.confirm_password = 'รหัสผ่านไม่ตรงกัน';
        }
      }
      if (!values.name) {
        errors.name = 'จำเป็นต้องใช้';
      }
      if (!values.email) {
        errors.email = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      // create form data
      const formData = new FormData();
      formData.append('id', initialMember.member_id);
      // append school id
      formData.append('school_id', values.school_id?.id || initialMember.school_id);
      // if change the username!
      if (values.username !== editFormik.initialValues.username) {
        formData.append('username', values.username);
      }
      formData.append('name', values.name);
      if (values.password) {
        formData.append('password', values.password);
      }
      // append email if change
      if (values.email !== editFormik.initialValues.email) {
        formData.append('email', values.email);
      }
      // append phone number
      formData.append('phone_number', values.phone_number);
      // append address
      formData.append('address', values.address);
      formData.append('suspend', values.suspend);
      // update action
      dispatch(actions.updateMemberRequest(formData));
    },
  });
  // END EDIT SECTION //

  // protected
  if (user?.auth1) {
    return (
      <AdminLayout menu={menu1} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Box display="flex">
                <Typography variant="h6" mr={1}>
                  จัดการบัญชีสมาชิก
                </Typography>
                <Button
                  type="button"
                  variant="contained"
                  size="small"
                  onClick={handleOpenAddDialog}
                >
                  เพิ่มบัญชีสมาชิก
                </Button>
              </Box>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  router.push(search && `${router.pathname}?search=${search}`);
                }}
              >
                <InputBase
                  sx={{ background: '#eee', px: 1 }}
                  type="search"
                  placeholder="ค้นหา..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            </Stack>
          </Stack>
          {getMemberState.isFetching ? (
            <Loading />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>บัญชี</TableCell>
                    <TableCell>ชื่อ-นามสกุล</TableCell>
                    <TableCell>อีเมล</TableCell>
                    <TableCell>โทรศํพท์</TableCell>
                    <TableCell>ทีอยู่</TableCell>
                    <TableCell>โรงเรียน</TableCell>
                    <TableCell>สถานะบัญชี</TableCell>
                    <TableCell align="center">แก้ไข</TableCell>
                    <TableCell align="center">ลบ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getMemberState.result?.data?.map((row, index) => (
                    <Fragment key={index}>
                      <TableRow sx={{ verticalAlign: 'top' }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.phone_number}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell>{row.school?.name}</TableCell>
                        <TableCell>{row.suspend == 0 ? 'ปกติ' : 'ระงับ'}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={() => {
                              setInitialMember({
                                member_id: row.member_id,
                                school_id: row.school_id,
                                username: row.username,
                                name: row.name,
                                email: row.email,
                                phone_number: row.phone_number,
                                address: row.address,
                                suspend: row.suspend,
                              });
                              handleOpenEditDialog();
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={() => {
                              confirm({
                                description: 'ต้องการยืนยันการลบบัญชีสมาชิกหรือไม่?',
                              }).then(() => {
                                dispatch(actions.deleteMemberRequest(row.member_id));
                              });
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>

        {/* add form section */}
        <CustomDialog title="เพิ่มบัญชีสมาชิก" open={openAddDialog} onClose={handleCloseAddDialog}>
          <form onSubmit={addFormik.handleSubmit}>
            <Typography variant="subtitle1">ข้อมูลเข้าสู่ระบบ</Typography>
            <TextField
              type="text"
              variant="outlined"
              label="บัญชีผู้ใช้"
              size="small"
              margin="dense"
              name="username"
              fullWidth
              value={addFormik.values.username}
              helperText={addFormik.touched.username && addFormik.errors.username}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <TextField
              type="password"
              variant="outlined"
              label="รหัสผ่าน"
              size="small"
              margin="dense"
              name="password"
              fullWidth
              value={addFormik.values.password}
              helperText={addFormik.touched.password && addFormik.errors.password}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <TextField
              type="password"
              variant="outlined"
              label="ยืนยันรหัสผ่าน"
              size="small"
              margin="dense"
              name="confirm_password"
              fullWidth
              value={addFormik.values.confirm_password}
              helperText={addFormik.touched.confirm_password && addFormik.errors.confirm_password}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <Typography variant="subtitle1">ข้อมูลส่วนตัวผู้ใช้งาน</Typography>
            <TextField
              type="text"
              variant="outlined"
              label="ชื่อ-นามสกุล"
              size="small"
              margin="dense"
              name="name"
              fullWidth
              value={addFormik.values.name}
              helperText={addFormik.touched.name && addFormik.errors.name}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="อีเมล"
              size="small"
              margin="dense"
              name="email"
              fullWidth
              value={addFormik.values.email}
              helperText={addFormik.touched.email && addFormik.errors.email}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="โทรศัพท์"
              size="small"
              margin="dense"
              name="phone_number"
              fullWidth
              value={addFormik.values.phone_number}
              helperText={addFormik.touched.phone_number && addFormik.errors.phone_number}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
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
              value={addFormik.values.address}
              helperText={addFormik.touched.address && addFormik.errors.address}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <FormControl fullWidth margin="dense" size="small">
              <Typography variant="subtitle1" mb={1}>
                บุคคลทั่วไป/สถานศึกษา
              </Typography>
              <Autocomplete
                disablePortal
                disableClearable
                options={schoolMemo}
                noOptionsText="ไม่มีตัวเลือก"
                value={addFormik.values.school_id}
                onChange={(event, newValue) =>
                  addFormik.setFieldValue('school_id', newValue ? newValue : '')
                }
                onBlur={addFormik.handleBlur}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="school_id"
                    helperText={addFormik.touched.school_id && addFormik.errors.school_id}
                    label="เลือก"
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="dense" size="small">
              <Typography variant="subtitle1">สถานะบัญชี</Typography>
              <Select
                name="suspend"
                value={addFormik.values.suspend}
                defaultValue={addFormik.values.suspend}
                onChange={addFormik.handleChange}
                onBlur={addFormik.handleBlur}
              >
                <MenuItem key="1" value="0">
                  ปกติ
                </MenuItem>
                <MenuItem key="2" value="1">
                  ระงับบัญชี
                </MenuItem>
              </Select>
            </FormControl>
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={addMemberState.isFetching}
              >
                บันทึก
              </Button>
            </Stack>
          </form>
        </CustomDialog>

        {/* edit form section */}
        <CustomDialog
          title="แก้ไขบัญชีสมาชิก"
          open={openEditDialog}
          onClose={handleCloseEditDialog}
        >
          <form onSubmit={editFormik.handleSubmit}>
            <Typography variant="subtitle1">ข้อมูลเข้าสู่ระบบ</Typography>
            <TextField
              type="text"
              variant="outlined"
              label="บัญชีผู้ใช้"
              size="small"
              margin="dense"
              fullWidth
              name="username"
              value={editFormik.values.username}
              helperText={editFormik.touched.username && editFormik.errors.username}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <TextField
              type="password"
              variant="outlined"
              label="รหัสผ่าน"
              size="small"
              margin="dense"
              name="password"
              fullWidth
              value={editFormik.values.password}
              helperText={editFormik.touched.password && editFormik.errors.password}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <TextField
              type="password"
              variant="outlined"
              label="ยืนยันรหัสผ่าน"
              size="small"
              margin="dense"
              name="confirm_password"
              fullWidth
              value={editFormik.values.confirm_password}
              helperText={editFormik.touched.confirm_password && editFormik.errors.confirm_password}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <Typography variant="subtitle1">ข้อมูลส่วนตัวผู้ใช้งาน</Typography>
            <TextField
              type="text"
              variant="outlined"
              label="ชื่อ-นามสกุล"
              size="small"
              margin="dense"
              name="name"
              fullWidth
              value={editFormik.values.name}
              helperText={editFormik.touched.name && editFormik.errors.name}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="อีเมล"
              size="small"
              margin="dense"
              name="email"
              fullWidth
              value={editFormik.values.email}
              helperText={editFormik.touched.email && editFormik.errors.email}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="โทรศัพท์"
              size="small"
              margin="dense"
              name="phone_number"
              fullWidth
              value={editFormik.values.phone_number}
              helperText={editFormik.touched.phone_number && editFormik.errors.phone_number}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
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
              value={editFormik.values.address}
              helperText={editFormik.touched.address && editFormik.errors.address}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            {schoolMemo.length != null && (
              <FormControl fullWidth margin="dense" size="small">
                <Typography variant="subtitle1" mb={1}>
                  บุคคลทั่วไป/สถานศึกษา
                </Typography>
                <Autocomplete
                  disablePortal
                  disableClearable
                  options={schoolMemo || null}
                  noOptionsText="ไม่มีตัวเลือก"
                  defaultValue={schoolMemo[defaultSchoolMemo] || null}
                  isOptionEqualToValue={(option, value) => option.label === value.label}
                  onChange={(event, newValue) =>
                    editFormik.setFieldValue('school_id', newValue ? newValue : '')
                  }
                  onBlur={editFormik.handleBlur}
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="school_id"
                      helperText={editFormik.touched.school_id && editFormik.errors.school_id}
                      label="เลือก"
                    />
                  )}
                />
              </FormControl>
            )}
            <FormControl fullWidth margin="dense" size="small">
              <Typography variant="subtitle1">สถานะบัญชี</Typography>
              <Select
                name="suspend"
                value={editFormik.values.suspend}
                defaultValue={editFormik.values.suspend}
                onChange={editFormik.handleChange}
                onBlur={editFormik.handleBlur}
              >
                <MenuItem key="1" value="0">
                  ปกติ
                </MenuItem>
                <MenuItem key="2" value="1">
                  ระงับบัญชี
                </MenuItem>
              </Select>
            </FormControl>
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={updateMemberState.isFetching}
              >
                แก้ไข
              </Button>
            </Stack>
          </form>
        </CustomDialog>
      </AdminLayout>
    );
  }
  return <></>;
};

export default MemberManage;
