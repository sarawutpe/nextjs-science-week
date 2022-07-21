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

const AwardLevel = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    // initial award level
    dispatch(actions.getAwardLevelRequest());
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
  const addAwardLevelState = useSelector(({ addAwardLevelReducer }) => addAwardLevelReducer);
  const getAwardLevelState = useSelector(({ getAwardLevelReducer }) => getAwardLevelReducer);
  const updateAwardLevelState = useSelector(({ updateAwardLevelReducer }) => updateAwardLevelReducer);

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
      award_level_name: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.award_level_name) {
        errors.award_level_name = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        award_level_name: values.award_level_name,
      };
      // add award level action
      dispatch(actions.addAwardLevelRequest(data));
    },
  });
  // END ADD SECTION //

  // START EDIT SECTION //
  // initial member
  const [initialAwardLevel, setInitialAwardLevel] = useState({
    award_level_id: '',
    award_level_name: '',
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
      award_level_name: initialAwardLevel?.award_level_name ?? '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.award_level_name) {
        errors.award_level_name = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      const data = {
        id: initialAwardLevel.award_level_id,
        award_level_name: values.award_level_name,
      };
      // update award level action
      dispatch(actions.updateAwardLevelRequest(data));
    },
  });
  // END EDIT SECTION //

  // protected
  if (user?.auth1) {
    return (
      <AdminLayout menu={menu1} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row">
              <Typography variant="h6" mr={1}>
                จัดการระดับรางวัล
              </Typography>
              <Button type="button" variant="contained" size="small" onClick={handleOpenAddDialog}>
                เพิ่มระดับรางวัล
              </Button>
            </Stack>
          </Stack>
          {getAwardLevelState.isFetching ? (
            <Loading />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>ระดับรางวัล</TableCell>
                    <TableCell align="center">แก้ไข</TableCell>
                    <TableCell align="center">ลบ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getAwardLevelState.result?.data?.map((row, index) => (
                    <Fragment key={index}>
                      <TableRow sx={{ verticalAlign: 'top' }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.award_level_name}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={() => {
                              setInitialAwardLevel({
                                award_level_id: row.award_level_id,
                                award_level_name: row.award_level_name,
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
                              confirm({ description: 'ต้องการยืนยันการลบระดับรางวัลหรือไม่?' }).then(() => {
                                dispatch(actions.deleteAwardLevelRequest(row.award_level_id));
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
        <CustomDialog title="เพิ่มระดับรางวัล" open={openAddDialog} onClose={handleCloseAddDialog}>
          <form onSubmit={addFormik.handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              label="ชื่อระดับรางวัล"
              size="small"
              margin="dense"
              name="award_level_name"
              fullWidth
              value={addFormik.values.award_level_name}
              helperText={addFormik.touched.award_level_name && addFormik.errors.award_level_name}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={addAwardLevelState.isFetching}
              >
                บันทึก
              </Button>
            </Stack>
          </form>
        </CustomDialog>

        {/* edit form section */}
        <CustomDialog title="แก้ไขระดับรางวัล" open={openEditDialog} onClose={handleCloseEditDialog}>
          <form onSubmit={editFormik.handleSubmit}>
            <TextField
              type="text"
              variant="outlined"
              label="ระดับรางวัล"
              size="small"
              margin="dense"
              name="award_level_name"
              fullWidth
              value={editFormik.values.award_level_name}
              helperText={editFormik.touched.award_level_name && editFormik.errors.award_level_name}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={updateAwardLevelState.isFetching}
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

export default AwardLevel;
