import React, { Fragment, useState, useEffect } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import CustomDialog from 'components/CustomDialog';
import { menu4 } from 'utils/configMenu';
import { DOCUMENT_URL } from 'utils/constants';
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
import Link from '@mui/material/Link';

const AwardAttachment = () => {
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

    // get award attachment
    if (router.isReady) {
      dispatch(actions.getAwardAttachmentRequest(router.query.search));
    }
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const addAwardAttachmentState = useSelector(({ addAwardAttachmentReducer }) => addAwardAttachmentReducer);
  const getAwardAttachmentState = useSelector(({ getAwardAttachmentReducer }) => getAwardAttachmentReducer);
  const updateAwardAttachmentState = useSelector(({ updateAwardAttachmentReducer }) => updateAwardAttachmentReducer);

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
      award_attachment_name: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.award_attachment_name) {
        errors.award_attachment_name = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      // create form data
      const formData = new FormData();
      formData.append('award_attachment_name', values.award_attachment_name);
      // if image ready!
      if (values.file) {
        formData.append('award_attachment_path', values.file);
      }
      // add award attachment action
      dispatch(actions.addAwardAttachmentRequest(formData));
    },
  });
  // END ADD SECTION //

  // START EDIT SECTION //
  // initial award attachment
  const [initialAwardAttachment, setInitialAwardAttachment] = useState({
    award_attachment_id: '',
    award_attachment_name: '',
    award_attachment_path: '',
  });

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
      award_attachment_name: initialAwardAttachment?.award_attachment_name ?? '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.award_attachment_name) {
        errors.award_attachment_name = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      // create form data
      const formData = new FormData();
      formData.append('id', initialAwardAttachment.award_attachment_id);
      formData.append('award_attachment_name', values.award_attachment_name);
      // if image ready!
      if (values.file) {
        formData.append('award_attachment_path', values.file);
      }
      // edit award attachment action
      dispatch(actions.updateAwardAttachmentRequest(formData));
    },
  });
  // END EDIT SECTION //

  // protected
  if (user?.auth4) {
    return (
      <AdminLayout menu={menu4} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Box display="flex">
                <Typography variant="h6" mr={1}>
                  จัดการเอกสารประกอบขอรับเงินรางวัล
                </Typography>
                <Button type="button" variant="contained" size="small" onClick={handleOpenAddDialog}>
                  เพิ่มเอกสารประกอบขอรับเงินรางวัล
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

          {getAwardAttachmentState.isFetching ? (
            <Loading />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>ชื่อเอกสาร</TableCell>
                    <TableCell>ที่อยู่เอกสาร</TableCell>
                    <TableCell>แก้ไข</TableCell>
                    <TableCell>ลบ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getAwardAttachmentState.result?.data?.map((row, index) => (
                    <Fragment>
                      <TableRow sx={{ verticalAlign: 'top' }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.award_attachment_name}</TableCell>
                        <TableCell>
                          <Link href={`${DOCUMENT_URL}/${row.award_attachment_path}`}>{row.award_attachment_path}</Link>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={() => {
                              setInitialAwardAttachment({
                                award_attachment_id: row.award_attachment_id,
                                award_attachment_name: row.award_attachment_name,
                                award_attachment_path: row.award_attachment_path,
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
                              confirm({ description: 'ต้องการยืนยันการลบเอกสารประกอบขอรับเงินรางวัลหรือไม่?' }).then(
                                () => {
                                  dispatch(actions.deleteAwardAttachmentRequest(row.award_attachment_id));
                                }
                              );
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
        <CustomDialog title="เพิ่มเอกสารประกอบขอรับเงินรางวัล" open={openAddDialog} onClose={handleCloseAddDialog}>
          <form onSubmit={addFormik.handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              label="ชื่อเอกสาร"
              size="small"
              margin="dense"
              name="award_attachment_name"
              fullWidth
              value={addFormik.values.award_attachment_name}
              helperText={addFormik.touched.award_attachment_name && addFormik.errors.award_attachment_name}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <Box display="flex" flexDirection="column" justifyContent="center" my={1}>
              <Typography variant="subtitle2" color="error">
                รองรับไฟล์ (.PDF)
              </Typography>
              <Box my={1}>
                <input
                  type="file"
                  name="award_attachment_path"
                  accept="application/pdf"
                  required
                  onChange={(event) => {
                    // handle change
                    addFormik.handleChange(event);
                    // if file ready!
                    if (event.target.files.length) {
                      // For upload
                      addFormik.setFieldValue('file', event.target.files[0]);
                    }
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
                disabled={addAwardAttachmentState.isFetching}
              >
                บันทึก
              </Button>
            </Stack>
          </form>
        </CustomDialog>

        {/* edit form section */}
        <CustomDialog title="แก้ไขเอกสารประกอบขอรับเงินรางวัล" open={openEditDialog} onClose={handleCloseEditDialog}>
          <form onSubmit={editFormik.handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              label="ชื่อเอกสาร"
              size="small"
              margin="dense"
              name="award_attachment_name"
              fullWidth
              value={editFormik.values.award_attachment_name}
              helperText={editFormik.touched.award_attachment_name && editFormik.errors.award_attachment_name}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              label="ที่อยู่เอกสาร"
              size="small"
              margin="dense"
              fullWidth
              disabled
              value={initialAwardAttachment?.award_attachment_path}
            />
            <Box display="flex" flexDirection="column" justifyContent="center" my={1}>
              <Typography variant="subtitle2" color="error">
                รองรับไฟล์ (.PDF)
              </Typography>
              <Box my={1}>
                <input
                  type="file"
                  name="award_attachment_path"
                  accept="application/pdf"
                  // required
                  onChange={(event) => {
                    // handle change
                    editFormik.handleChange;
                    // if file ready!
                    if (event.target.files.length) {
                      // For upload
                      editFormik.setFieldValue('file', event.target.files[0]);
                    }
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
                disabled={updateAwardAttachmentState.isFetching}
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

export default AwardAttachment;
