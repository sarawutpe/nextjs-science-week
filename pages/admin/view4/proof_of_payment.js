import React, { Fragment, useState, useEffect, useMemo, useRef } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import CustomDialog from 'components/CustomDialog';
import { menu4 } from 'utils/configMenu';
import { IMAGE_URL } from 'utils/constants';
import formatter from 'utils/formatter';
import { useConfirm } from 'material-ui-confirm';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

const ProofOfPayment = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const getCompetitionResultState = useSelector(
    ({ getCompetitionResultReducer }) => getCompetitionResultReducer
  );
  const getProgramState = useSelector(({ getProgramReducer }) => getProgramReducer);
  const updateCompetitionResultState = useSelector(
    ({ updateCompetitionResultReducer }) => updateCompetitionResultReducer
  );

  // state
  const [search, setSearch] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedActivityLevel, setSelectedActivityLevel] = useState('');

  const activityLevelMemo = useMemo(() => {
    setSelectedActivityLevel('');
    const program = getProgramState?.result?.data ?? [];
    const filter = program.filter((row) => row.activity_id == selectedActivity);
    return filter[0] || [];
  }, [selectedActivity]);

  // get activity and activity level
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    dispatch(actions.getProgramRequest());
    dispatch(actions.getAwardLevelRequest());
    setOpenDialog(false);
    formik.handleReset();
  }, [router, user]);

  // initial state
  useEffect(() => {
    // search if router isReady!
    if (router.isReady) {
      dispatch(
        actions.getCompetitionResultRequest({
          search: router.query.search,
          activity: selectedActivity,
          activity_level: selectedActivityLevel,
        })
      );
    }
    // clear formik state
  }, [router, selectedActivity, selectedActivityLevel]);

  // START ADD SECTION //
  const [initialCompetitionResult, setInitialCompetitionResult] = useState({
    competition_result_id: '',
    amount: '',
    proof_of_payment: '',
  });

  // dialog
  const [openDialog, setOpenDialog] = useState(false);

  // handle open add dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // handle close add dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    formik.handleReset();
    formik.setErrors({});
    formik.setTouched({});
  };

  const inputImgRef = useRef();

  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      amount: initialCompetitionResult.amount,
      file: {},
    },
    validate: (values) => {
      const errors = {};
      if (!values.amount && values.amount != 0) {
        errors.amount = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      // create form data
      const formData = new FormData();
      formData.append('competition_result_id', initialCompetitionResult.competition_result_id);
      formData.append('amount', values.amount);
      // if image ready!
      if (values.file && values.file_obj) {
        formData.append('proof_of_payment', values.file);
      }
      // set empty image
      if (values.file == null) {
        formData.append('proof_of_payment', '');
      }
      dispatch(actions.updateCompetitionResultRequest(formData));
    },
  });
  // END SECTION //

  // protected
  if (user?.auth4) {
    return (
      <AdminLayout menu={menu4} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Typography variant="h6">จัดการหลักฐานการจ่ายเงินรางวัล</Typography>
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
                  {getProgramState.result?.data?.map((row, index) => (
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
          {getCompetitionResultState.isFetching ? (
            <Loading />
          ) : (
            <Fragment>
              {getCompetitionResultState.result?.data?.map((row, index) => (
                <Box key={index} mb={8}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6">{row.activity?.activity_name}</Typography>
                    <Typography variant="h6">{row.activity_level?.name}</Typography>
                  </Box>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>รายชื่อผู้สมัคร</TableCell>
                          <TableCell>สถานศึกษา</TableCell>
                          <TableCell>รางวัล</TableCell>
                          <TableCell>จำนวนเงิน</TableCell>
                          <TableCell>หลักฐานการจ่ายเงิน</TableCell>
                          <TableCell>แก้ไข</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <Fragment key={index}>
                          {row.competitions?.map((row, index) => (
                            <TableRow key={index} sx={{ verticalAlign: 'top' }}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>
                                {row.participants?.map((row, index) => (
                                  <Typography key={index} variant="body2">
                                    {row.participant_name}
                                  </Typography>
                                ))}
                              </TableCell>
                              <TableCell>{row.member?.school?.name}</TableCell>
                              <TableCell>
                                {row.competition_result?.award_level?.award_level_name ?? '-'}
                              </TableCell>
                              <TableCell>{formatter.thb(row.competition_result?.amount)}</TableCell>
                              <TableCell>
                                {row.competition_result?.proof_of_payment ? (
                                  <Image
                                    src={`${IMAGE_URL}/${row.competition_result?.proof_of_payment}`}
                                    width={50}
                                    height={50}
                                  />
                                ) : (
                                  <></>
                                )}
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  color="primary"
                                  component="span"
                                  onClick={() => {
                                    formik.setFieldValue('file', {});
                                    setInitialCompetitionResult({
                                      competition_result_id:
                                        row.competition_result?.competition_result_id,
                                      amount: row.competition_result?.amount,
                                      proof_of_payment: row.competition_result?.proof_of_payment,
                                    });
                                    handleOpenDialog();
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </Fragment>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ))}
            </Fragment>
          )}
        </Box>
        {/* add form section */}
        <CustomDialog
          title="แก้ไขหลักฐานการจ่ายเงินรางวัล"
          open={openDialog}
          onClose={handleCloseDialog}
        >
          <form onSubmit={formik.handleSubmit}>
            <TextField
              type="number"
              variant="outlined"
              label="จำนวนเงิน"
              size="small"
              margin="dense"
              name="amount"
              fullWidth
              value={formik.values.amount}
              helperText={formik.touched.amount && formik.errors.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box display="flex" flexDirection="column" justifyContent="center" my={1}>
              <Box>
                <Avatar
                  variant="square"
                  src={
                    formik.values?.file == null
                      ? ''
                      : formik.values?.file_obj
                      ? formik.values?.file_obj
                      : initialCompetitionResult.proof_of_payment
                      ? IMAGE_URL + '/' + initialCompetitionResult.proof_of_payment
                      : ''
                  }
                  sx={{ width: '100%', height: 400 }}
                >
                  <ImageIcon sx={{ fontSize: 90 }} />
                </Avatar>
              </Box>
              <Box display="flex" justifyContent="space-between" my={1}>
                <input
                  ref={inputImgRef}
                  type="file"
                  name="proof_of_payment"
                  accept="image/jpeg, image/png"
                  onChange={(event) => {
                    // handle change
                    formik.handleChange;
                    // if file ready!
                    if (event.target.files.length) {
                      // For upload
                      formik.setFieldValue('file', event.target.files[0]);
                      // For preview
                      formik.setFieldValue('file_obj', URL.createObjectURL(event.target.files[0]));
                    }
                  }}
                />
                <input
                  type="button"
                  color="error"
                  value="ลบรูป"
                  onClick={() => {
                    inputImgRef.current.value = '';
                    formik.setFieldValue('file', null);
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
                disabled={updateCompetitionResultState.isFetching}
              >
                บันทึก
              </Button>
            </Stack>
          </form>
        </CustomDialog>
      </AdminLayout>
    );
  }
  return <></>;
};

export default ProofOfPayment;
