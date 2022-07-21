import React, { Fragment, useState, useEffect, useRef } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
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
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CustomDialog from 'components/CustomDialog';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { IMAGE_URL } from 'utils/constants';

const News = () => {
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

    // get news
    if (router.isReady) {
      dispatch(actions.getNewsRequest(router.query.search));
    }
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const addNewsState = useSelector(({ addNewsReducer }) => addNewsReducer);
  const getNewsState = useSelector(({ getNewsReducer }) => getNewsReducer);
  const updateNewsState = useSelector(({ updateNewsReducer }) => updateNewsReducer);

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
      news_topic: '',
      news_desc: '',
      file: {},
    },
    validate: (values) => {
      const errors = {};
      if (!values.news_topic) {
        errors.news_topic = 'จำเป็นต้องใช้';
      }
      if (!values.news_desc) {
        errors.news_desc = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      // create form data
      const formData = new FormData();
      formData.append('news_topic', values.news_topic);
      formData.append('news_desc', values.news_desc);
      // if image ready!
      if (values.file && values.file_obj) {
        formData.append('news_img', values.file);
      }
      // set empty image
      if (values.file == null) {
        formData.append('news_img', '');
      }
      // action
      dispatch(actions.addNewsRequest(formData));
    },
  });
  // END ADD SECTION //

  // START EDIT SECTION //
  // initial news
  const [initialNews, setInitialNews] = useState({
    news_id: '',
    news_topic: '',
    news_img: '',
    news_desc: '',
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
      news_id: initialNews?.news_id ?? '',
      news_topic: initialNews?.news_topic ?? '',
      news_desc: initialNews?.news_desc ?? '',
      file: {},
    },
    validate: (values) => {
      const errors = {};
      if (!values.news_topic) {
        errors.news_topic = 'จำเป็นต้องใช้';
      }
      if (!values.news_desc) {
        errors.news_desc = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      // create form data
      const formData = new FormData();
      formData.append('id', initialNews.news_id);
      formData.append('news_topic', values.news_topic);
      formData.append('news_desc', values.news_desc);
      // if image ready!
      if (values.file && values.file_obj) {
        formData.append('news_img', values.file);
      }
      // set empty image
      if (values.file == null) {
        formData.append('news_img', '');
      }
      // action
      dispatch(actions.updateNewsRequest(formData));
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
                  จัดการข่าวประชาสัมพันธ์
                </Typography>
                <Button
                  type="button"
                  variant="contained"
                  size="small"
                  onClick={handleOpenAddDialog}
                >
                  เพิ่มข่าวประชาสัมพันธ์
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
          {getNewsState.isFetching ? (
            <Loading />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>หัวข้อข่าว</TableCell>
                    <TableCell>รูปภาพ</TableCell>
                    <TableCell>คำอธิบาย</TableCell>
                    <TableCell>แก้ไข</TableCell>
                    <TableCell>ลบ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getNewsState.result?.data?.map((row, index) => (
                    <Fragment key={index}>
                      <TableRow sx={{ verticalAlign: 'top' }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.news_topic}</TableCell>
                        <TableCell>
                          <Image src={`${IMAGE_URL}/${row.news_img}`} width={50} height={50} />
                        </TableCell>
                        <TableCell>{row.news_desc}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={() => {
                              editFormik.setFieldValue('file', {});
                              setInitialNews({
                                news_id: row.news_id,
                                news_topic: row.news_topic,
                                news_img: row.news_img,
                                news_desc: row.news_desc,
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
                                description: 'ต้องการยืนยันการลบข่าวประชาสัมพันธ์หรือไม่?',
                              }).then(() => {
                                dispatch(actions.deleteNewsRequest(row.news_id));
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
          title="เพิ่มข่าวประชาสัมพันธ์"
          open={openAddDialog}
          onClose={handleCloseAddDialog}
        >
          <form onSubmit={addFormik.handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              label="หัวข้อข่าว"
              size="small"
              margin="dense"
              name="news_topic"
              fullWidth
              value={addFormik.values.news_topic}
              helperText={addFormik.touched.news_topic && addFormik.errors.news_topic}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <Box display="flex" flexDirection="column" justifyContent="center" my={1}>
              <Box mb={2}>
                <Avatar
                  variant="square"
                  src={
                    addFormik.values?.file == null
                      ? ''
                      : addFormik.values?.file_obj
                      ? addFormik.values?.file_obj
                      : getNewsState.result?.data?.news_img
                      ? IMAGE_URL + '/' + getNewsState.result?.data?.news_img
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
                  name="news_img"
                  accept="image/jpeg, image/png"
                  onChange={(event) => {
                    // handle change
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
            <TextField
              type="text"
              variant="outlined"
              label="รายละเอียด"
              size="small"
              margin="dense"
              name="news_desc"
              multiline
              minRows={4}
              maxRows={8}
              fullWidth
              value={addFormik.values.news_desc}
              helperText={addFormik.touched.news_desc && addFormik.errors.news_desc}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={addNewsState.isFetching}
              >
                บันทึก
              </Button>
            </Stack>
          </form>
        </CustomDialog>

        {/* edit form section */}
        <CustomDialog
          title="แก้ไขข่าวประชาสัมพันธ์"
          open={openEditDialog}
          onClose={handleCloseEditDialog}
        >
          <form onSubmit={editFormik.handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              label="หัวข้อข่าว"
              size="small"
              margin="dense"
              name="news_topic"
              fullWidth
              value={editFormik.values.news_topic}
              helperText={editFormik.touched.news_topic && editFormik.errors.news_topic}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <Box display="flex" flexDirection="column" justifyContent="center" my={1}>
              <Box mb={2}>
                <Avatar
                  variant="square"
                  src={
                    editFormik.values?.file == null
                      ? ''
                      : editFormik.values?.file_obj
                      ? editFormik.values?.file_obj
                      : initialNews.news_img
                      ? IMAGE_URL + '/' + initialNews.news_img
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
                  name="news_img"
                  accept="image/jpeg, image/png"
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
            <TextField
              type="text"
              variant="outlined"
              label="รายละเอียด"
              size="small"
              margin="dense"
              name="news_desc"
              multiline
              minRows={4}
              maxRows={8}
              fullWidth
              value={editFormik.values.news_desc}
              helperText={editFormik.touched.news_desc && editFormik.errors.news_desc}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={updateNewsState.isFetching}
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

export default News;
