import React, { Fragment, useState, useEffect, useRef } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import CustomDialog from 'components/CustomDialog';
import { menu3 } from 'utils/configMenu';
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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { IMAGE_URL } from 'utils/constants';

const Certificate = () => {
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

    // get certificate
    if (router.isReady) {
      dispatch(actions.getCertificateRequest(router.query.search));
    }
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const addCertificateState = useSelector(({ addCertificateReducer }) => addCertificateReducer);
  const getCertificateState = useSelector(({ getCertificateReducer }) => getCertificateReducer);
  const updateCertificateState = useSelector(
    ({ updateCertificateReducer }) => updateCertificateReducer
  );

  const getCertificateTypeDesc = (certificateType) => {
    const desc = '';
    switch (certificateType) {
      case 1:
        desc = 'การแข่งขัน/การประกวด';
        break;
      case 2:
        desc = 'อบรม';
        break;
      case 3:
        desc = 'ผู้เข้าร่วมกิจกรรม';
        break;
      default:
        break;
    }
    return desc;
  };

  // START ADD SECTION //

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

  const inputImgAddRef = useRef();

  // add formik
  const addFormik = useFormik({
    initialValues: {
      certificate_name: '',
      certificate_type: '1',
      file: {},
    },
    validate: (values) => {
      const errors = {};
      if (!values.certificate_name) {
        errors.certificate_name = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      // create form data
      const formData = new FormData();
      formData.append('certificate_name', values.certificate_name);
      formData.append('certificate_type', values.certificate_type);
      // if image ready!
      if (values.file && values.file_obj) {
        formData.append('certificate_img', values.file);
      }
      // set empty image
      if (values.file == null) {
        formData.append('certificate_img', '');
      }
      // action
      dispatch(actions.addCertificateRequest(formData));
    },
  });
  // END ADD SECTION //

  // START EDIT SECTION //
  // initial certificate
  const [initialCertificate, setInitialCertificate] = useState({
    certificate_id: '',
    certificate_name: '',
    certificate_type: '',
    certificate_img: '',
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

  const inputImgEditRef = useRef();

  // edit formik
  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      certificate_name: initialCertificate?.certificate_name ?? '',
      certificate_type: initialCertificate?.certificate_type ?? '',
      file: {},
    },
    validate: (values) => {
      const errors = {};
      if (!values.certificate_name) {
        errors.certificate_name = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      // create form data
      const formData = new FormData();
      formData.append('id', initialCertificate.certificate_id);
      formData.append('certificate_name', values.certificate_name);
      formData.append('certificate_type', values.certificate_type);
      // if image ready!
      if (values.file && values.file_obj) {
        formData.append('certificate_img', values.file);
      }
      // set empty image
      if (values.file == null) {
        formData.append('certificate_img', '');
      }
      // action
      dispatch(actions.updateCertificateRequest(formData));
    },
  });
  // END EDIT SECTION //

  // protected
  if (user?.auth3) {
    return (
      <AdminLayout menu={menu3} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Box display="flex">
                <Typography variant="h6" mr={1}>
                  จัดการรูปเกียรติบัตร
                </Typography>
                <Button
                  type="button"
                  variant="contained"
                  size="small"
                  onClick={handleOpenAddDialog}
                >
                  เพิ่มรูปเกียรติบัตร
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
          {getCertificateState.isFetching ? (
            <Loading />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>ชื่อรูป</TableCell>
                    <TableCell>ประเภทรูปเกียรติบัตร</TableCell>
                    <TableCell>รูปภาพ</TableCell>
                    <TableCell>แก้ไข</TableCell>
                    <TableCell>ลบ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getCertificateState.result?.data?.map((row, index) => (
                    <Fragment key={index}>
                      <TableRow sx={{ verticalAlign: 'top' }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.certificate_name}</TableCell>
                        <TableCell>{getCertificateTypeDesc(row.certificate_type)}</TableCell>
                        <TableCell>
                          <Image
                            src={`${IMAGE_URL}/${row.certificate_img}`}
                            width={50}
                            height={50}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={() => {
                              editFormik.setFieldValue('file', {});
                              setInitialCertificate({
                                certificate_id: row.certificate_id,
                                certificate_name: row.certificate_name,
                                certificate_type: row.certificate_type,
                                certificate_img: row.certificate_img,
                              });
                              handleOpenEditDialog();
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell align="left">
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={() => {
                              confirm({
                                description: 'ต้องการยืนยันการลบรูปเกียรติบัตรหรือไม่?',
                              }).then(() => {
                                dispatch(actions.deleteCertificateRequest(row.certificate_id));
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
          title="เพิ่มรูปเกียรติบัตร"
          open={openAddDialog}
          onClose={handleCloseAddDialog}
        >
          <form onSubmit={addFormik.handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              label="ชื่อ"
              size="small"
              margin="dense"
              name="certificate_name"
              fullWidth
              value={addFormik.values.certificate_name}
              helperText={addFormik.touched.certificate_name && addFormik.errors.certificate_name}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />

            <FormControl fullWidth margin="dense" size="small">
              <Typography variant="subtiyle1">ประเภทเกียรติบัตร</Typography>
              <Select
                name="certificate_type"
                value={addFormik.values.certificate_type}
                defaultValue={addFormik.values.certificate_type}
                onChange={addFormik.handleChange}
              >
                <MenuItem value="1">การแข่งขัน/การประกวด</MenuItem>
                <MenuItem value="2">อบรม</MenuItem>
                <MenuItem value="3">ผู้เข้าร่วมกิจกรรม</MenuItem>
              </Select>
            </FormControl>
            <Box display="flex" flexDirection="column" justifyContent="center" my={1}>
              <Box mb={2}>
                <Avatar
                  variant="square"
                  src={
                    addFormik.values?.file == null
                      ? ''
                      : addFormik.values?.file_obj
                      ? addFormik.values?.file_obj
                      : getCertificateState.result?.data?.certificate_img
                      ? IMAGE_URL + '/' + getCertificateState.result?.data?.certificate_img
                      : ''
                  }
                  sx={{ width: '100%', height: 400 }}
                >
                  <ImageIcon sx={{ fontSize: 90 }} />
                </Avatar>
              </Box>
              <Box display="flex" justifyContent="space-between" my={1}>
                <input
                  ref={inputImgAddRef}
                  type="file"
                  name="certificate_img"
                  accept="image/jpeg, image/png"
                  onChange={(event) => {
                    // handle change
                    addFormik.handleChange;
                    // if file ready!
                    if (event.target.files.length) {
                      // For upload
                      addFormik.setFieldValue('file', event.target.files[0]);
                      // For preview
                      addFormik.setFieldValue(
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
                    inputImgAddRef.current.value = '';
                    addFormik.setFieldValue('file', null);
                  }}
                />
              </Box>
            </Box>
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={addCertificateState.isFetching}
              >
                บันทึก
              </Button>
            </Stack>
          </form>
        </CustomDialog>

        {/* edit form section */}
        <CustomDialog
          title="แก้ไขรูปเกียรติบัตร"
          open={openEditDialog}
          onClose={handleCloseEditDialog}
        >
          <form onSubmit={editFormik.handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              label="ชื่อ"
              size="small"
              margin="dense"
              name="certificate_name"
              fullWidth
              value={editFormik.values.certificate_name}
              helperText={editFormik.touched.certificate_name && editFormik.errors.certificate_name}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <Typography variant="subtiyle1">ประเภทรูปเกียรติบัตร</Typography>
            <FormControl fullWidth margin="dense" size="small">
              <Select
                name="certificate_type"
                value={editFormik.values.certificate_type}
                defaultValue={editFormik.values.certificate_type}
                onChange={editFormik.handleChange}
              >
                <MenuItem value="1">การแข่งขัน/การประกวด</MenuItem>
                <MenuItem value="2">อบรม</MenuItem>
                <MenuItem value="3">ผู้เข้าร่วมกิจกรรม</MenuItem>
              </Select>
            </FormControl>
            <Box display="flex" flexDirection="column" justifyContent="center" my={1}>
              <Box mb={2}>
                <Avatar
                  variant="square"
                  src={
                    editFormik.values?.file == null
                      ? ''
                      : editFormik.values?.file_obj
                      ? editFormik.values?.file_obj
                      : initialCertificate.certificate_img
                      ? IMAGE_URL + '/' + initialCertificate.certificate_img
                      : ''
                  }
                  sx={{ width: '100%', height: 400 }}
                >
                  <ImageIcon sx={{ fontSize: 90 }} />
                </Avatar>
              </Box>
              <Box display="flex" justifyContent="space-between" my={1}>
                <input
                  ref={inputImgEditRef}
                  type="file"
                  name="certificate_img"
                  accept="image/jpeg, image/png"
                  // required
                  onChange={(event) => {
                    // handle change
                    editFormik.handleChange;
                    // if file ready!
                    if (event.target.files.length) {
                      // For upload
                      editFormik.setFieldValue('file', event.target.files[0]);
                      // For preview
                      editFormik.setFieldValue(
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
                    inputImgEditRef.current.value = '';
                    editFormik.setFieldValue('file', null);
                  }}
                />
              </Box>
            </Box>
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={updateCertificateState.isFetching}
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

export default Certificate;
