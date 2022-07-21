import React, { Fragment, useState, useEffect } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import { menu2 } from 'utils/configMenu';
import Loading from 'components/Loading';
import CustomDialog from 'components/CustomDialog';
import { useConfirm } from 'material-ui-confirm';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
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
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const Activity = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();

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
    // search if router isReady!
    if (router.isReady && user) {
      dispatch(actions.getActivityByAdminIdRequest({ id: user?.id, search: router.query.search }));
    }
  }, [router, user]);

  // state
  const [search, setSearch] = useState('');
  const [initialActivity, setInitialActivity] = useState({
    activity_id: '',
    admin_id: '',
    activity_name: '',
    activity_type: '',
  });

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const getActivityByAdminState = useSelector(({ getActivityByAdminIdReducer }) => getActivityByAdminIdReducer);
  const addActivityState = useSelector(({ addActivityReducer }) => addActivityReducer);
  const updateActivityState = useSelector(({ updateActivityReducer }) => updateActivityReducer);

  // START ADD SECTION //
  // add dialog
  const [openAddDialog, setOpenAddDialog] = useState(false);
  // handle open add dialog
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };
  // handle close add dialog
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    addFormik.handleReset();
  };

  // add formik
  const addFormik = useFormik({
    initialValues: {
      activity_name: '',
      activity_type: '1',
    },
    validate: (values) => {
      const errors = {};
      if (!values.activity_name) {
        errors.activity_name = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      // create data
      const data = {
        admin_id: user?.id,
        activity_name: values.activity_name,
        activity_type: values.activity_type,
      };
      // action
      dispatch(actions.addActivityRequest(data));
    },
  });

  // START EDIT SECTION //
  // edit dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);
  // handle open add dialog
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };
  // handle close add dialog
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    editFormik.handleReset();
  };

  // edit formik
  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      activity_name: initialActivity?.activity_name ?? '',
      activity_type: initialActivity?.activity_type ?? '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.activity_name) {
        errors.activity_name = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      // create data
      const data = {
        id: initialActivity.activity_id,
        admin_id: user?.id,
        activity_name: values.activity_name,
        activity_type: values.activity_type,
      };
      // action
      dispatch(actions.updateActivityRequest(data));
    },
  });

  // protected
  if (user?.auth2) {
    return (
      <AdminLayout menu={menu2} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Box display="flex">
                <Typography variant="h6" mr={1}>
                  จัดการกิจกรรม
                </Typography>
                <Button type="button" variant="contained" size="small" onClick={handleOpenAddDialog}>
                  เพิ่มกิจกรรม
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
          {getActivityByAdminState.isFetching ? (
            <Loading />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>กิจกรรม</TableCell>
                    <TableCell>รูปแบบกิจกรรม</TableCell>
                    <TableCell align="center">แก้ไข</TableCell>
                    <TableCell align="center">ลบ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getActivityByAdminState.result?.data?.map((row, index) => (
                    <Fragment key={index}>
                      <TableRow sx={{ verticalAlign: 'top' }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.activity_name}</TableCell>
                        <TableCell>{row.activity_type === 1 ? 'การประกวด/แข่งขัน' : 'อบรม'}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={() => {
                              // set initial activity
                              setInitialActivity({
                                activity_id: row.activity_id,
                                admin_id: row.admin_id,
                                activity_name: row.activity_name,
                                activity_type: row.activity_type,
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
                              confirm({ description: 'ต้องการยืนยันการลบกิจกรรมหรือไม่?' }).then(() => {
                                dispatch(actions.deleteActivityRequest(row.activity_id));
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
        <CustomDialog title="เพิ่มกิจกรรม" open={openAddDialog} onClose={handleCloseAddDialog}>
          <form onSubmit={addFormik.handleSubmit}>
            {/* start textfield */}
            <TextField
              type="text"
              variant="outlined"
              label="ชื่อกิจกรรม"
              size="small"
              margin="dense"
              name="activity_name"
              fullWidth
              value={addFormik.values.activity_name}
              helperText={addFormik.touched.activity_name && addFormik.errors.activity_name}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <FormControl sx={{ mt: 1 }}>
              <Typography variant="subtiyle1">รูปแบบกิจกรรม</Typography>
              <RadioGroup
                row
                aria-labelledby="activity-type-group"
                name="activity_type"
                value={addFormik.values.activity_type}
                onChange={addFormik.handleChange}
              >
                <FormControlLabel value="1" control={<Radio />} label="การประกวด/แข่งขัน" />
                <FormControlLabel value="2" control={<Radio />} label="อบรม" />
              </RadioGroup>
            </FormControl>
            {/* end textfield */}
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={addActivityState.isFetching}
              >
                บันทึก
              </Button>
            </Stack>
          </form>
        </CustomDialog>
        {/* edit form section */}
        <CustomDialog title="แก้ไขกิจกรรม" open={openEditDialog} onClose={handleCloseEditDialog}>
          <form onSubmit={editFormik.handleSubmit}>
            {/* start textfield */}
            <TextField
              type="text"
              variant="outlined"
              label="ชื่อกิจกรรม"
              size="small"
              margin="dense"
              name="activity_name"
              fullWidth
              value={editFormik.values.activity_name}
              helperText={editFormik.touched.activity_name && editFormik.errors.activity_name}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <FormControl sx={{ mt: 1 }}>
              <Typography variant="subtiyle1">รูปแบบกิจกรรม</Typography>
              <RadioGroup
                row
                aria-labelledby="activity-type-group"
                name="activity_type"
                value={editFormik.values.activity_type}
                onChange={editFormik.handleChange}
              >
                <FormControlLabel value="1" control={<Radio />} label="การประกวด/แข่งขัน" />
                <FormControlLabel value="2" control={<Radio />} label="อบรม" />
              </RadioGroup>
            </FormControl>
            {/* end textfield */}
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={updateActivityState.isFetching}
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

export default Activity;
