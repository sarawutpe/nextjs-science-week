import React, { Fragment, useState, useEffect } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import CustomDialog from 'components/CustomDialog';
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
import MenuItem from '@mui/material/MenuItem';

const AdminManage = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  // state
  const [search, setSearch] = useState('');

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    // clear
    if (openAddDialog) {
      setOpenAddDialog(false);
      addFormik.handleReset();
    } else if (openEditDialog) {
      setOpenEditDialog(false);
      editFormik.handleReset();
    }
    // get admin
    if (router.isReady) {
      dispatch(actions.getAdminRequest(router.query.search));
    }
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const addAdminState = useSelector(({ addAdminReducer }) => addAdminReducer);
  const getAdminState = useSelector(({ getAdminReducer }) => getAdminReducer);
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

  // START ADD SECTION //
  // dialog
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = (action) => {
    // close dialog
    setOpenAddDialog(false);

    // clear addFormik state
    addFormik.setErrors({});
    addFormik.setTouched({});
  };

  // add formik
  const addFormik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm_password: '',
      name: '',
      picture: '',
      type: '',
      email: '',
      level: '2',
      suspend: '0',
    },
    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = 'จำเป็นต้องใช้';
      }
      if (!values.password) {
        errors.password = 'จำเป็นต้องใช้';
      }
      if (!values.confirm_password) {
        errors.confirm_password = 'จำเป็นต้องใช้';
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
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'รูปแบบไม่ถูกต้อง';
      }
      if (!values.level) {
        errors.level = 'จำเป็นต้องใช้';
      }
      if (!values.suspend) {
        errors.suspend = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      // create form data
      const formData = new FormData();
      formData.append('username', values.username);
      formData.append('password', values.password);
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('type', 'admin');
      formData.append('level', values.level);
      formData.append('suspend', values.suspend);
      // add admin action
      dispatch(actions.addAdminRequest(formData));
    },
  });
  // END ADD SECTION //

  // START EDIT SECTION //
  // initial admin
  const [initialAdmin, setInitialAdmin] = useState({
    admin_id: '',
    username: '',
    name: '',
    picture: '',
    email: '',
    level: '',
    suspend: '',
  });

  // edit dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // handle open edit dialog
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  // handel close edit dialog
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
      username: initialAdmin?.username ?? '',
      password: '',
      confirm_password: '',
      name: initialAdmin?.name ?? '',
      email: initialAdmin?.email ?? '',
      level: initialAdmin?.level ?? '',
      suspend: initialAdmin?.suspend ?? '',
    },
    validate: (values) => {
      const errors = {};
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
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'รูปแบบไม่ถูกต้อง';
      }
      return errors;
    },
    onSubmit: (values) => {
      // create form data
      const formData = new FormData();
      formData.append('id', initialAdmin.admin_id);
      // if change the username!
      if (values.username !== editFormik.initialValues.username) {
        formData.append('username', values.username);
      }
      if (values.password) {
        formData.append('password', values.password);
      }
      formData.append('name', values.name);
      // if change the username!
      if (values.email !== editFormik.initialValues.email) {
        formData.append('email', values.email);
      }
      formData.append('level', values.level);
      formData.append('suspend', values.suspend);
      // edit admin action
      dispatch(actions.updateAdminRequest(formData));
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
                  จัดการบัญชีเจ้าหน้าที่
                </Typography>
                <Button type="button" variant="contained" size="small" onClick={handleOpenAddDialog}>
                  เพิ่มบัญชีเจ้าหน้าที่
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
          {getAdminState.isFetching ? (
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
                    <TableCell>ระดับ</TableCell>
                    <TableCell>สถานะบัญชี</TableCell>
                    <TableCell align="center">แก้ไข</TableCell>
                    <TableCell align="center">ลบ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getAdminState.result?.data?.map((row, index) => (
                    <Fragment>
                      <TableRow sx={{ verticalAlign: 'top' }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{getLevelDesc(row.level)}</TableCell>
                        <TableCell>{getSuspendDesc(row.suspend)}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={() => {
                              setInitialAdmin({
                                admin_id: row.admin_id,
                                username: row.username,
                                name: row.name,
                                picture: row.picture,
                                email: row.email,
                                level: row.level,
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
                              confirm({ description: 'ต้องการยืนยันการลบบัญชีเจ้าหน้าที่หรือไม่?' }).then(() => {
                                dispatch(actions.deleteAdminRequest(row.admin_id));
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
        <CustomDialog title="เพิ่มบัญชีเจ้าหน้าที่" open={openAddDialog} onClose={handleCloseAddDialog}>
          <form onSubmit={addFormik.handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              label="บัญชีเจ้าหน้าที่"
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
            <FormControl fullWidth margin="dense" size="small">
              <Typography variant="subtitle1">เจ้าหน้าที่</Typography>
              <Select
                name="level"
                value={addFormik.values.level}
                defaultValue={addFormik.values.level}
                onChange={addFormik.handleChange}
              >
                <MenuItem key="2" value="2">
                  ผู้จัดกิจกรรม
                </MenuItem>
                <MenuItem key="3" value="3">
                  กรรมการกลาง
                </MenuItem>
                <MenuItem key="4" value="4">
                  ผู้จ่ายเงินรางวัล
                </MenuItem>
                <MenuItem key="5" value="5">
                  ผู้บริหาร
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense" size="small">
              <Typography variant="subtitle1">สถานะบัญชี</Typography>
              <Select
                name="suspend"
                value={addFormik.values.suspend}
                defaultValue={addFormik.values.suspend}
                onChange={addFormik.handleChange}
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
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={addAdminState.isFetching}>
                บันทึก
              </Button>
            </Stack>
          </form>
        </CustomDialog>

        {/* edit form section */}
        <CustomDialog title="แก้ไขบัญชีเจ้าหน้าที่" open={openEditDialog} onClose={handleCloseEditDialog}>
          <form onSubmit={editFormik.handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              label="บัญชีเจ้าหน้าที่"
              size="small"
              margin="dense"
              name="username"
              fullWidth
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
            <FormControl fullWidth margin="dense" size="small">
              <Typography variant="subtitle1">เจ้าหน้าที่</Typography>
              <Select
                name="level"
                value={editFormik.values.level}
                defaultValue={editFormik.values.level}
                onChange={editFormik.handleChange}
              >
                <MenuItem key="2" value="2">
                  ผู้จัดกิจกรรม
                </MenuItem>
                <MenuItem key="3" value="3">
                  กรรมการกลาง
                </MenuItem>
                <MenuItem key="4" value="4">
                  ผู้จ่ายเงินรางวัล
                </MenuItem>
                <MenuItem key="5" value="5">
                  ผู้บริหาร
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense" size="small">
              <Typography variant="subtitle1">สถานะบัญชี</Typography>
              <Select
                name="suspend"
                value={editFormik.values.suspend}
                defaultValue={editFormik.values.suspend}
                onChange={editFormik.handleChange}
                required
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
                disabled={updateAdminState.isFetching}
                fullWidth
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

export default AdminManage;
