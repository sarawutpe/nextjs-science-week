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
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const School = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  // state
  const [search, setSearch] = useState('');

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    if (router.isReady) {
      dispatch(actions.getSchoolRequest({ search: search }));
    }
    // clear
    if (openAddDialog) {
      setOpenAddDialog(false);
      addFormik.handleReset();
    } else if (openEditDialog) {
      setOpenEditDialog(false);
      editFormik.handleReset();
    }
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const addSchoolState = useSelector(({ addSchoolReducer }) => addSchoolReducer);
  const getSchoolState = useSelector(({ getSchoolReducer }) => getSchoolReducer);
  const updateSchoolState = useSelector(({ updateSchoolReducer }) => updateSchoolReducer);

  // start add section
  // dialog
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // handle open add dialog
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  // handle close add dialog
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    addFormik.setErrors({});
    addFormik.setTouched({});
  };

  // add formik
  const addFormik = useFormik({
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
      } else if (values.school_type == 1 && !/^โรงเรียน/i.test(values.name)) {
        errors.name = 'ขึ้นต้นด้วยโรงเรียน';
      }
      if (!values.address) {
        errors.address = 'จำเป็นต้องใช้';
      }
      if (!values.sub_district) {
        errors.sub_district = 'จำเป็นต้องใช้';
      } else if (values.school_type == 1 && !/^ตำบล/i.test(values.sub_district)) {
        errors.sub_district = 'ขึ้นต้นด้วยตำบล';
      }
      if (!values.district) {
        errors.district = 'จำเป็นต้องใช้';
      } else if (values.school_type == 1 && !/^เขต|อำเภอ/i.test(values.district)) {
        errors.district = 'ขึ้นต้นด้วยเขตหรืออำเภอ';
      }
      if (!values.province) {
        errors.province = 'จำเป็นต้องใช้';
      } else if (values.school_type == 1 && !/^จังหวัด/i.test(values.province)) {
        errors.province = 'ขึ้นต้นด้วยจังหวัด';
      }
      if (!values.postcode) {
        errors.postcode = 'จำเป็นต้องใช้';
      } else if (values.school_type == 1 && !/^[0-9]{5}$/i.test(values.postcode)) {
        errors.postcode = 'รูปแบบไม่ถูกต้อง';
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
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
  // end add section

  // start edit section
  // initial school
  const [initialSchool, setInitialSchool] = useState({
    school_id: '',
    school_type: '1',
    name: '',
    address: '',
    sub_district: '',
    district: '',
    province: '',
    postcode: '',
  });

  // edit dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // handle open edit dialog
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  // handle close edit dialog
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    editFormik.setErrors({});
    editFormik.setTouched({});
  };

  // edit formik
  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      school_type: initialSchool?.school_type ?? '',
      name: initialSchool?.name ?? '',
      address: initialSchool?.address ?? '',
      sub_district: initialSchool?.sub_district ?? '',
      district: initialSchool?.district ?? '',
      province: initialSchool?.province ?? '',
      postcode: initialSchool?.postcode ?? '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'จำเป็นต้องใช้';
      } else if (values.school_type == 1 && !/^โรงเรียน/i.test(values.name)) {
        errors.name = 'ขึ้นต้นด้วยโรงเรียน';
      }
      if (!values.address) {
        errors.address = 'จำเป็นต้องใช้';
      }
      if (!values.sub_district) {
        errors.sub_district = 'จำเป็นต้องใช้';
      } else if (values.school_type == 1 && !/^ตำบล/i.test(values.sub_district)) {
        errors.sub_district = 'ขึ้นต้นด้วยตำบล';
      }
      if (!values.district) {
        errors.district = 'จำเป็นต้องใช้';
      } else if (values.school_type == 1 && !/^เขต|อำเภอ/i.test(values.district)) {
        errors.district = 'ขึ้นต้นด้วยเขตหรืออำเภอ';
      }
      if (!values.province) {
        errors.province = 'จำเป็นต้องใช้';
      } else if (values.school_type == 1 && !/^จังหวัด/i.test(values.province)) {
        errors.province = 'ขึ้นต้นด้วยจังหวัด';
      }
      if (!values.postcode) {
        errors.postcode = 'จำเป็นต้องใช้';
      } else if (values.school_type == 1 && !/^[0-9]{5}$/i.test(values.postcode)) {
        errors.postcode = 'รูปแบบไม่ถูกต้อง';
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        id: initialSchool?.school_id ?? '',
        school_type: values.school_type,
        name: values.name,
        address: values.address,
        province: values.province,
        district: values.district,
        sub_district: values.sub_district,
        postcode: values.postcode,
      };
      dispatch(actions.updateSchoolRequest(data));
    },
  });
  // end edit section

  // protected
  if (user?.auth1) {
    return (
      <AdminLayout menu={menu1} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Box display="flex">
                <Typography variant="h6" mr={1}>
                  จัดการรายชื่อโรงเรียน
                </Typography>
                <Button
                  type="button"
                  variant="contained"
                  size="small"
                  onClick={handleOpenAddDialog}
                >
                  เพิ่มรายชื่อโรงเรียน
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
          {getSchoolState.isFetching ? (
            <Loading />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>ชื่อโรงเรียน</TableCell>
                    <TableCell>ที่อยู่</TableCell>
                    <TableCell>ตำบล</TableCell>
                    <TableCell>อำเภอ</TableCell>
                    <TableCell>จังหวัด</TableCell>
                    <TableCell>รหัสไปรษณีย์</TableCell>
                    <TableCell align="center">แก้ไข</TableCell>
                    <TableCell align="center">ลบ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getSchoolState.result?.data?.map((row, index) => (
                    <Fragment key={index}>
                      <TableRow sx={{ verticalAlign: 'top' }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell>{row.sub_district}</TableCell>
                        <TableCell>{row.district}</TableCell>
                        <TableCell>{row.province}</TableCell>
                        <TableCell>{row.postcode}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={() => {
                              setInitialSchool({
                                school_id: row.school_id,
                                school_type: row.school_type,
                                name: row.name,
                                address: row.address,
                                sub_district: row.sub_district,
                                district: row.district,
                                province: row.province,
                                postcode: row.postcode,
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
                                description: 'ต้องการยืนยันการลบรายชื่อโรงเรียนหรือไม่?',
                              }).then(() => {
                                dispatch(actions.deleteSchoolRequest(row.school_id));
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
        <CustomDialog
          title="เพิ่มรายชื่อโรงเรียน"
          open={openAddDialog}
          onClose={handleCloseAddDialog}
        >
          <form onSubmit={addFormik.handleSubmit}>
            <FormControl>
              <Typography variant="subtitle1">ประเภท</Typography>
              <RadioGroup
                row
                name="school_type"
                value={addFormik.values.school_type}
                onChange={addFormik.handleChange}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="โรงเรียน"
                  onClick={() => addFormik.handleReset()}
                />
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="บุคคลทั่วไป"
                  onClick={() => {
                    addFormik.setFieldValue('name', 'บุคคลทั่วไป');
                    addFormik.setFieldValue('address', '-');
                    addFormik.setFieldValue('sub_district', '-');
                    addFormik.setFieldValue('district', '-');
                    addFormik.setFieldValue('province', '-');
                    addFormik.setFieldValue('postcode', '-');
                  }}
                />
              </RadioGroup>
            </FormControl>
            <TextField
              type="text"
              variant="outlined"
              label="ชื่อโรงเรียน"
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
              label="ที่อยู่"
              size="small"
              margin="dense"
              name="address"
              fullWidth
              value={addFormik.values.address}
              helperText={addFormik.touched.address && addFormik.errors.address}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="ตำบล"
              size="small"
              margin="dense"
              name="sub_district"
              fullWidth
              value={addFormik.values.sub_district}
              helperText={addFormik.touched.sub_district && addFormik.errors.sub_district}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="อำเภอ"
              size="small"
              margin="dense"
              name="district"
              fullWidth
              value={addFormik.values.district}
              helperText={addFormik.touched.district && addFormik.errors.district}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="จังหวัด"
              size="small"
              margin="dense"
              name="province"
              fullWidth
              value={addFormik.values.province}
              helperText={addFormik.touched.province && addFormik.errors.province}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="รหัสไปรษณีย์"
              size="small"
              margin="dense"
              name="postcode"
              fullWidth
              value={addFormik.values.postcode}
              helperText={addFormik.touched.postcode && addFormik.errors.postcode}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={addSchoolState.isFetching}
              >
                บันทึก
              </Button>
            </Stack>
          </form>
        </CustomDialog>

        {/* edit form section */}
        <CustomDialog
          title="แก้ไขรายชื่อโรงเรียน"
          open={openEditDialog}
          onClose={handleCloseEditDialog}
        >
          <form onSubmit={editFormik.handleSubmit}>
            <FormControl>
              <Typography variant="subtitle1">ประเภท</Typography>
              <RadioGroup
                row
                name="school_type"
                value={editFormik.values.school_type}
                onChange={editFormik.handleChange}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="โรงเรียน"
                  onClick={() => editFormik.handleReset()}
                />
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="บุคคลทั่วไป"
                  onClick={() => {
                    editFormik.setFieldValue('name', 'บุคคลทั่วไป');
                    editFormik.setFieldValue('address', '-');
                    editFormik.setFieldValue('sub_district', '-');
                    editFormik.setFieldValue('district', '-');
                    editFormik.setFieldValue('province', '-');
                    editFormik.setFieldValue('postcode', '-');
                  }}
                />
              </RadioGroup>
            </FormControl>
            <TextField
              type="text"
              variant="outlined"
              label="ชื่อโรงเรียน"
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
              label="ที่อยู่"
              size="small"
              margin="dense"
              name="address"
              fullWidth
              value={editFormik.values.address}
              helperText={editFormik.touched.address && editFormik.errors.address}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="ตำบล"
              size="small"
              margin="dense"
              name="sub_district"
              fullWidth
              value={editFormik.values.sub_district}
              helperText={editFormik.touched.sub_district && editFormik.errors.sub_district}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="อำเภอ"
              size="small"
              margin="dense"
              name="district"
              fullWidth
              value={editFormik.values.district}
              helperText={editFormik.touched.district && editFormik.errors.district}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="จังหวัด"
              size="small"
              margin="dense"
              name="province"
              fullWidth
              value={editFormik.values.province}
              helperText={editFormik.touched.province && editFormik.errors.province}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="รหัสไปรษณีย์"
              size="small"
              margin="dense"
              name="postcode"
              fullWidth
              value={editFormik.values.postcode}
              helperText={editFormik.touched.postcode && editFormik.errors.postcode}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={updateSchoolState.isFetching}
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

export default School;
