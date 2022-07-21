import React, { Fragment, useState, useEffect, useMemo, useRef } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import { menu2 } from 'utils/configMenu';
import pdfMake from 'utils/pdfmake';
import formatter from 'utils/formatter';
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
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Select from '@mui/material/Select';
import CustomDialog from 'components/CustomDialog';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { green } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  selected: {
    color: 'rgb(30 70 32)',
    '&$selected': {
      backgroundColor: 'rgba(237, 247, 237, 0.8)',
      '&:hover': {
        backgroundColor: green[50],
      },
    },
    '& svg': {
      color: 'rgb(30 70 32)',
    },
  },
});

const CompetitionResult = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const classes = useStyles();

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const getAwardLevelState = useSelector(({ getAwardLevelReducer }) => getAwardLevelReducer);
  const getCompetitionResultByAdminIdState = useSelector(
    ({ getCompetitionResultByAdminIdReducer }) => getCompetitionResultByAdminIdReducer
  );
  const getProgramByAdminIdState = useSelector(
    ({ getProgramByAdminIdReducer }) => getProgramByAdminIdReducer
  );
  const updateCompetitionResultState = useSelector(
    ({ updateCompetitionResultReducer }) => updateCompetitionResultReducer
  );

  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedActivityLevel, setSelectedActivityLevel] = useState('');

  const activityLevelMemo = useMemo(() => {
    setSelectedActivityLevel('');
    const program = getProgramByAdminIdState?.result?.data ?? [];
    const filter = program.filter((row) => row.activity_id == selectedActivity);
    return filter[0] || [];
  }, [selectedActivity]);

  // get activity and activity level
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    dispatch(actions.getAwardLevelRequest());
    dispatch(actions.getProgramByAdminIdRequest({ id: user?.id }));
    dispatch(actions.getActivityByAdminIdRequest({ id: user?.id }));
    dispatch(actions.getActivityLevelRequest());
  }, [router, user]);

  // initial state
  useEffect(() => {
    dispatch(
      actions.getCompetitionResultByAdminIdRequest({
        id: user?.id,
        activity: selectedActivity,
        activity_level: selectedActivityLevel,
      })
    );
    // clear
    if (openDialog) {
      setOpenDialog(false);
      formik.handleReset();
    }
  }, [user, router, selectedActivity, selectedActivityLevel]);

  // START SECTION //
  const [initialCompetitionResult, setInitialCompetitionResult] = useState([]);

  // award level select ref
  const awardLevelRef = useRef([]);

  // dialog
  const [openDialog, setOpenDialog] = useState(false);

  // handle open add dialog
  const handleopenDialog = () => {
    setOpenDialog(true);
  };

  // handle close dialog
  const handleCloseDialog = () => {
    // close dialog
    setOpenDialog(false);
    // clear action state
    // clear formik state
    formik.setErrors({});
    formik.setTouched({});
  };

  // handle tohhle confirm checkbox
  const [confirmProgramState, setConfirmProgramState] = useState(false);
  const handleConfirmProgramState = () => {
    setConfirmProgramState(!confirmProgramState);
  };

  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    validate: (values) => {
      const errors = {};
      return errors;
    },
    onSubmit: (values) => {
      new Promise((resolve, reject) => {
        const programList = [];
        const competitionResulCreatetList = [];
        const competitionResulUpdatetList = [];
        // loop set data
        initialCompetitionResult[0]?.competitions?.map((row, index) => {
          // set program list
          programList.push({ program_id: row.program_id });
          // set competition result create list
          if (awardLevelRef.current[index].node.name === 'create') {
            competitionResulCreatetList.push({
              program_id: row.program_id,
              competition_id: row.competition_id,
              award_level_id: awardLevelRef.current[index].value,
            });
          } else {
            // set competition result update list
            competitionResulUpdatetList.push({
              competition_result_id: row.competition_result.competition_result_id,
              award_level_id: awardLevelRef.current[index].value,
            });
          }
        });
        const list = {
          program_list: programList,
          competition_result_list_create: competitionResulCreatetList,
          competition_result_list_update: competitionResulUpdatetList,
        };
        // resolve
        resolve(list);
      }).then((list) => {
        const data = {
          program_list: list.program_list,
          confirm: confirmProgramState,
          competition_result_create_list: list.competition_result_list_create,
          competition_result_update_list: list.competition_result_list_update,
        };
        if (!confirmCompetitionResult()) {
          // action
          dispatch(actions.updateCompetitionResultRequest(data));
        }
      });
    },
  });
  // END SECTION //

  // check confirm competition result
  const confirmCompetitionResult = () => {
    if (initialCompetitionResult[0]?.confirm) {
      return true;
    } else {
      return false;
    }
  };

  // get activity name
  const activityNameMemo = useMemo(() => {
    let activityName = '';
    if (selectedActivity) {
      activityName = getCompetitionResultByAdminIdState.result?.data[0]?.activity?.activity_name ?? '';
    }
    return activityName;
  }, [getCompetitionResultByAdminIdState]);

  // get activity level name
  const activityLevelNameMemo = useMemo(() => {
    let activityLevelName = '';
    if (selectedActivity) {
      activityLevelName = getCompetitionResultByAdminIdState.result?.data[0]?.activity_level?.name ?? '';
    }
    return activityLevelName;
  }, [getCompetitionResultByAdminIdState]);

  // generate pdf memo
  const generatePDFMemo = useMemo(() => {
    let body = [];
    let data = getCompetitionResultByAdminIdState.result?.data[0]?.competitions;
    // map array
    if (data?.length) {
      body.push(['#', 'รายชื่อผู้สมัคร', 'สถานศึกษา', 'รางวัล']);
      data.map((row, index) => {
        body.push([
          `${index + 1}`,
          `${row.participants?.map((row) => row.participant_name + '\n').join('')}`,
          `${row.member?.school?.name ?? ''}`,
          `${row.competition_result?.award_level?.award_level_name ?? '-'}`,
        ]);
      });
    }
    return body;
  }, [router, getCompetitionResultByAdminIdState]);

  // doc definition
  const docDefinition = {
    header: { text: formatter.momentShort(), margin: [10, 5] },
    content: [
      { text: 'ผลการแข่งขัน', style: 'header' },
      { text: `กิจกรรม ${activityNameMemo}`, style: 'subheader' },
      { text: `ระดับ ${activityLevelNameMemo}`, style: 'subheader' },
      { text: '\n' },
      {
        layout: 'lightHorizontalLines',
        table: {
         
          widths: ['auto', '*', '*', '*'],
          body: generatePDFMemo,
        },
      },
    ],
    defaultStyle: {
      font: 'THSarabunNew',
      fontSize: 16,
    },
    styles: {
      header: {
        fontSize: 20,
        bold: true,
      },
      subheader: {
        fontSize: 16,
        bold: true,
      },
    },
  };

  // download pdf button
  const downloadPDF = () => {    
    if (getCompetitionResultByAdminIdState.result?.data?.length == 1 && selectedActivity && selectedActivityLevel) {
      pdfMake.createPdf(docDefinition).download(Date.now());
    }
  };

  // protected
  if (user?.auth2) {
    return (
      <AdminLayout menu={menu2} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Typography variant="h6">จัดการผลการแข่งขัน</Typography>
              <Button
                variant="outlined"
                onClick={downloadPDF}
                disabled={getCompetitionResultByAdminIdState.result?.data?.length != 1 || !selectedActivity || !selectedActivityLevel}
              >
                ดาวน์โหลด PDF
              </Button>
            </Stack>
          </Stack>
          <Fragment>
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
                    {getProgramByAdminIdState.result?.data?.map((row, index) => (
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
            {getCompetitionResultByAdminIdState.isFetching ? (
              <Loading />
            ) : (
              <Fragment>
                {getCompetitionResultByAdminIdState.result?.data?.map((row, index) => (
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
                            <TableCell>ส่งผลการแข่งขัน</TableCell>
                            <TableCell>แก้ไข</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <Fragment key={index}>
                            {row.competitions?.map((row, index) => (
                              <TableRow key={index}>
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
                                <TableCell>
                                  {row.program?.confirm ? (
                                    <IconButton color="success">
                                      <CheckIcon />
                                    </IconButton>
                                  ) : (
                                    <IconButton color="error">
                                      <ClearIcon />
                                    </IconButton>
                                  )}
                                </TableCell>
                                {index === 0 && (
                                  <TableCell
                                    sx={{ verticalAlign: 'top' }}
                                    rowSpan={(
                                      getCompetitionResultByAdminIdState.result?.data?.competitions?.length +
                                      1
                                    ).toString()}
                                  >
                                    <IconButton
                                      color="primary"
                                      component="span"
                                      onClick={() => {
                                        const programId = row.program_id;
                                        const filterCompetitionResult =
                                          getCompetitionResultByAdminIdState?.result?.data?.filter(
                                            (row) => row.program_id == programId
                                          );
                                        setInitialCompetitionResult(filterCompetitionResult);
                                        handleopenDialog();
                                      }}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </TableCell>
                                )}
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
          </Fragment>
        </Box>

        {/* form section */}
        <CustomDialog
          title="แก้ไขผลการแข่งขัน"
          size="md"
          open={openDialog}
          onClose={handleCloseDialog}
        >
          <Box mb={1}>
            {confirmCompetitionResult() ? (
              <Alert severity="success">ส่งผลการแข่งขันแล้ว</Alert>
            ) : (
              <Box border={`1px solid ${green[900]}`} mb={1}>
                <ListItemButton
                  classes={{ selected: classes.selected }}
                  role={undefined}
                  sx={{ bgColor: 'success.light' }}
                  selected={confirmProgramState}
                  onClick={handleConfirmProgramState}
                >
                  <ListItemText
                    primary={'ส่งผลการแข่งขัน'}
                    secondary={
                      <Typography variant="body2">กรุณาตรวจสอบข้อมูลก่อนยืนยัน*</Typography>
                    }
                  />
                  <ListItemIcon>
                    <Checkbox checked={confirmProgramState} tabIndex={-1} disableRipple />
                  </ListItemIcon>
                </ListItemButton>
              </Box>
            )}
          </Box>

          <form onSubmit={formik.handleSubmit}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>รายชื่อผู้สมัคร</TableCell>
                    <TableCell>สถานศึกษา</TableCell>
                    <TableCell>รางวัล</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {initialCompetitionResult?.map((row, index) => (
                    <Fragment key={index}>
                      {row.competitions?.map((row, index) => (
                        <TableRow key={index}>
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
                            <FormControl sx={{ width: 250 }}>
                              <Select
                                defaultValue={row.competition_result?.award_level_id ?? 0}
                                displayEmpty
                                disabled={confirmCompetitionResult()}
                                inputProps={{
                                  name: row.competition_result?.competition_result_id
                                    ? 'update'
                                    : 'create',
                                }}
                                inputRef={(element) => (awardLevelRef.current[index] = element)}
                              >
                                <MenuItem value="0">เลือก</MenuItem>
                                {getAwardLevelState.result?.data?.map((row, index) => (
                                  <MenuItem key={index} value={row.award_level_id}>
                                    {row.award_level_name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                        </TableRow>
                      ))}
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {!confirmCompetitionResult() && (
              <Stack mt={2} mb={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={updateCompetitionResultState.isFetching}
                >
                  แก้ไข
                </Button>
              </Stack>
            )}
          </form>
        </CustomDialog>
      </AdminLayout>
    );
  }
  return <></>;
};

export default CompetitionResult;
