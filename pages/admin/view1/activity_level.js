import React, { useState, useEffect, Fragment } from 'react';
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

const ActivityLevel = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    dispatch(actions.getActivityLevelRequest());
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
  const addActivityLevelState = useSelector(({ addActivityLevelReducer }) => addActivityLevelReducer);
  const getActivityLevelState = useSelector(({ getActivityLevelReducer }) => getActivityLevelReducer);
  const updateActivityLevelState = useSelector(({ updateActivityLevelReducer }) => updateActivityLevelReducer);

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
      name: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        name: values.name,
      };
      // action
      dispatch(actions.addActivityLevelRequest(data));
    },
  });
  // END ADD SECTION //

  // START EDIT SECTION //
  // initial member
  const [initialActivityLevel, setInitialActivityLevel] = useState({
    activity_level_id: '',
    name: '',
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
      name: initialActivityLevel?.name ?? '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        id: initialActivityLevel.activity_level_id,
        name: values.name,
      };
      // update activity level action
      dispatch(actions.updateActivityLevelRequest(data));
    },
  });
  // END EDIT SECTION //

  if (user?.auth1) {
    return (
      <AdminLayout menu={menu1} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row">
              <Typography variant="h6" mr={1}>
                จัดการระดับการแข่งขัน
              </Typography>
              <Button type="button" variant="contained" size="small" onClick={handleOpenAddDialog}>
                เพิ่มระดับการแข่งขัน
              </Button>
            </Stack>
          </Stack>
          {getActivityLevelState.isFetching ? (
            <Loading />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>ระดับการแข่งขัน</TableCell>
                    <TableCell align="center">แก้ไข</TableCell>
                    <TableCell align="center">ลบ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getActivityLevelState.result?.data?.map((row, index) => (
                    <Fragment key={index}>
                      <TableRow sx={{ verticalAlign: 'top' }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={() => {
                              setInitialActivityLevel({
                                activity_level_id: row.activity_level_id,
                                name: row.name,
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
                              confirm({ description: 'ต้องการยืนยันการลบระดับการแข่งขันหรือไม่?' }).then(() => {
                                dispatch(actions.deleteActivityLevelRequest(row.activity_level_id));
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
        <CustomDialog title="เพิ่มระดับการแข่งขัน" open={openAddDialog} onClose={handleCloseAddDialog}>
          <form onSubmit={addFormik.handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              label="ระดับการแข่งขัน"
              size="small"
              margin="dense"
              name="name"
              fullWidth
              value={addFormik.values.name}
              helperText={addFormik.touched.name && addFormik.errors.name}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={addActivityLevelState.isFetching}
              >
                บันทึก
              </Button>
            </Stack>
          </form>
        </CustomDialog>

        {/* edit form section */}
        <CustomDialog title="แก้ไขระดับการแข่งขัน" open={openEditDialog} onClose={handleCloseEditDialog}>
          <form onSubmit={editFormik.handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              label="ระดับการแข่งขัน *"
              size="small"
              margin="dense"
              name="name"
              fullWidth
              value={editFormik.values.name}
              helperText={editFormik.touched.name && editFormik.errors.name}
              onChange={editFormik.handleChange}
            />
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={updateActivityLevelState.isFetching}
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

export default ActivityLevel;
