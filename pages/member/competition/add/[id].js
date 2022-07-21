import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import useUser from 'hoc/useUser';
import actions from 'redux/actions';
import _ from 'lodash';
import MainLayout from 'templates/MainLayout/Index';
import SubNavbar from 'templates/MainLayout/SubNavbar';
import { mainMenu } from 'utils/configMenu';
import momentUtil from 'utils/momentUtil';
import Loading from 'components/Loading';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfirm } from 'material-ui-confirm';

const Add = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  // initial state
  useEffect(() => {
    dispatch(actions.getMemberByIdRequest(user?.id));
    if (router.isReady) {
      dispatch(actions.getProgramByIdRequest(router.query.id));
    }
  }, [router, user]);

  // global state
  const profile = useSelector(({ getMemberByIdReducer }) => getMemberByIdReducer);
  const addCompetitionState = useSelector(
    ({ addCompetitionReducer }) => addCompetitionReducer
  );
  const getProgramByIdState = useSelector(
    ({ getProgramByIdReducer }) => getProgramByIdReducer
  );

  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    validate: (values) => {
      const errors = {};
      return errors;
    },
    onSubmit: async (values) => {
      const advisorList = [];
      const participantList = [];
      // create advisor list
      for await (const [i] of advisorRef.current.entries()) {
        if (advisorRef.current[i] === null || advisorRef.current[i].value.trim() === '') {
          continue;
        }
        advisorList.push({ advisor_name: advisorRef.current[i].value.trim() });
      }
      // create participant list
      for await (const [i] of participantRef.current.entries()) {
        if (
          participantRef.current[i] === null ||
          participantRef.current[i].value.trim() === ''
        ) {
          continue;
        }
        participantList.push({
          participant_name: participantRef.current[i].value.trim(),
        });
      }
      // create data
      const data = {
        member_id: user?.id ?? '',
        school_id: profile.result?.data?.school?.school_id ?? '',
        school_type: profile.result?.data?.school?.school_type ?? '',
        program_id: getProgramByIdState.result?.data?.program_id ?? '',
        limit_per_team: getProgramByIdState.result?.data?.limit_per_team ?? '',
        limit_per_school: getProgramByIdState.result?.data?.limit_per_school ?? '',
        limit_per_program: getProgramByIdState.result?.data?.limit_per_program ?? '',
        advisor_list: advisorList,
        participant_list: participantList,
      };
      const startDate = getProgramByIdState.result?.data?.apply_from;
      const endDate = getProgramByIdState.result?.data?.apply_to;
      if (
        !momentUtil.competitionTime(startDate, endDate).isBefore &&
        !momentUtil.competitionTime(startDate, endDate).isAfter
      ) {
        // action
        dispatch(actions.addCompetitionRequest(data));
        // set currnt state to initial state
        setAdvisorInput([{ advisor_id: uuidv4() }]);
        setParticipantInput([{ participant_id: uuidv4() }]);
        setErrorParticipant(false);
      }
    },
  });

  // handle advisor
  const [advisorInput, setAdvisorInput] = useState([{ advisor_id: uuidv4() }]);
  const advisorRef = useRef([]);

  const handleAdvisor = (action, advisor_id) => {
    if (action === 'add') {
      const limitPerAdvisor = getProgramByIdState.result?.data?.limit_per_advisor;
      if (advisorInput.length < limitPerAdvisor) {
        setAdvisorInput([...advisorInput, { advisor_id: uuidv4() }]);
      }
    } else if (action === 'remove') {
      if (advisorInput.length > 1) {
        confirm({ description: 'ต้องการยืนยันรายชื่ออาจารย์ที่ปรึกษาหรือไม่?' }).then(
          () => {
            // todo
            let filter = advisorInput.filter((row) => {
              return row.advisor_id != advisor_id;
            });
            setAdvisorInput(filter);
          }
        );
      }
    }
  };

  // handle paticipant
  const [participantInput, setParticipantInput] = useState([
    { participant_id: uuidv4() },
  ]);
  const participantRef = useRef([]);

  const handelParticipant = (action, participant_id) => {
    if (action === 'add') {
      const limitPerTeam = getProgramByIdState.result?.data?.limit_per_team;
      if (participantInput.length < limitPerTeam) {
        setParticipantInput([...participantInput, { participant_id: uuidv4() }]);
      }
    } else if (action === 'remove') {
      if (participantInput.length > 1) {
        confirm({
          description: 'ต้องการยืนยันการลบรายชื่อผู้สมัครเข้าร่วมกิจกรรมหรือไม่?',
        }).then(() => {
          // todo
          let filter = participantInput.filter((row) => {
            return row.participant_id != participant_id;
          });
          setParticipantInput(filter);
        });
      }
    }
  };

  // protected
  if (user?.auth0) {
    return (
      <MainLayout menu={mainMenu}>
        <SubNavbar profile={profile}>
          <Box mb={3}>
            <Typography variant="h6">สมัครเข้าร่วมกิจกรรม</Typography>
          </Box>
          {getProgramByIdState.isFetching ? (
            <Loading />
          ) : (
            <div>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography variant="h6">
                  {getProgramByIdState.result?.data?.activity?.activity_name ?? ''}
                </Typography>
                <Typography variant="h6">
                  {getProgramByIdState.result?.data?.activity?.activity_type === 1
                    ? 'การประกวด/แข่งขัน'
                    : 'อบรม'}
                </Typography>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)' }}>
                    <TableRow>
                      <TableCell colSpan={2}>รายละเอียดการสมัครเข้าร่วมกิจกรรม</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ verticalAlign: 'top' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>ระดับ</TableCell>
                      <TableCell>
                        {getProgramByIdState.result?.data?.activity_level?.name ?? ''}
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ verticalAlign: 'top' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        จำกัดอาจารย์ที่ปรึกษา
                      </TableCell>
                      <TableCell>{`ทีมละไม่เกิน ${
                        getProgramByIdState.result?.data?.limit_per_advisor ?? ''
                      } คน`}</TableCell>
                    </TableRow>
                    <TableRow sx={{ verticalAlign: 'top' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        จำกัดจำนวนผู้สมัครต่อทีม
                      </TableCell>
                      <TableCell>
                        {`ทีมละไม่เกิน ${
                          getProgramByIdState.result?.data?.limit_per_team ?? ''
                        } คน`}
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ verticalAlign: 'top' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        จำกัดจำนวนทีมต่อโรงเรียน
                      </TableCell>
                      <TableCell>
                        {getProgramByIdState.result?.data?.limit_per_school == 0
                          ? 'ไม่จำกัด'
                          : `${getProgramByIdState.result?.data?.limit_per_school} ทีม`}
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ verticalAlign: 'top' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        จำกัดจำนวนทีมต่อโปรแกรมแข่งขัน
                      </TableCell>
                      <TableCell>
                        {getProgramByIdState.result?.data?.limit_per_program == 0
                          ? 'ไม่จำกัด'
                          : `${getProgramByIdState.result?.data?.limit_per_program} ทีม`}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <form onSubmit={formik.handleSubmit}>
                {getProgramByIdState.result?.data?.limit_per_advisor != 0 && (
                  <Box my={2}>
                    <Stack flexDirection="row" alignItems="center">
                      <div>
                        <Typography variant="subtitle1">
                          รายชื่ออาจารย์ที่ปรึกษา
                        </Typography>
                      </div>
                      <div>
                        <Button
                          onClick={() => handleAdvisor('add')}
                          sx={{ mx: 1 }}
                          variant="text"
                          endIcon={<AddIcon />}
                        >
                          เพิ่มชื่อ
                        </Button>
                      </div>
                    </Stack>
                    {advisorInput.map((row, index) => (
                      <Stack key={row.advisor_id} flexDirection="row" alignItems="center">
                        <TextField
                          type="text"
                          variant="outlined"
                          label="ชื่อ-นามสกุล"
                          size="small"
                          margin="dense"
                          defaultValue=""
                          fullWidth
                          required
                          inputRef={(element) => (advisorRef.current[index] = element)}
                        />
                        <IconButton
                          sx={{ ml: 1 }}
                          onClick={() => handleAdvisor('remove', row.advisor_id)}
                        >
                          <DeleteIcon color="primary" />
                        </IconButton>
                      </Stack>
                    ))}
                  </Box>
                )}
                <Box my={2}>
                  <Stack flexDirection="row" alignItems="center">
                    <div>
                      <Typography variant="subtitle1">
                        รายชื่อผู้สมัครเข้าร่วมกิจกรรม
                      </Typography>
                    </div>
                    <div>
                      <Button
                        onClick={() => handelParticipant('add')}
                        sx={{ mx: 1 }}
                        variant="text"
                        endIcon={<AddIcon />}
                      >
                        เพิ่มชื่อ
                      </Button>
                    </div>
                  </Stack>
                  {participantInput.map((row, index) => (
                    <Stack
                      key={row.participant_id}
                      flexDirection="row"
                      alignItems="center"
                    >
                      <TextField
                        type="text"
                        variant="outlined"
                        label="ชื่อ-นามสกุล"
                        size="small"
                        margin="dense"
                        fullWidth
                        required
                        inputRef={(element) => (participantRef.current[index] = element)}
                      />
                      <IconButton
                        sx={{ ml: 1 }}
                        onClick={() => handelParticipant('remove', row.participant_id)}
                      >
                        <DeleteIcon color="primary" />
                      </IconButton>
                    </Stack>
                  ))}
                </Box>
                <Stack spacing={2} mt={2} mb={1}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={
                      addCompetitionState.isFetching ||
                      momentUtil.competitionTime(
                        getProgramByIdState.result?.data?.apply_from,
                        getProgramByIdState.result?.data?.apply_to
                      ).isBefore ||
                      momentUtil.competitionTime(
                        getProgramByIdState.result?.data?.apply_from,
                        getProgramByIdState.result?.data?.apply_to
                      ).isAfter
                    }
                  >
                    {momentUtil.competitionTime(
                      getProgramByIdState.result?.data?.apply_from,
                      getProgramByIdState.result?.data?.apply_to
                    ).isBefore
                      ? 'ยังไม่เปิดรับสมัคร'
                      : momentUtil.competitionTime(
                          getProgramByIdState.result?.data?.apply_from,
                          getProgramByIdState.result?.data?.apply_to
                        ).isAfter
                      ? 'หมดเวลารับสมัคร'
                      : 'สมัครเข้าร่วม'}
                  </Button>
                </Stack>
              </form>
            </div>
          )}
        </SubNavbar>
      </MainLayout>
    );
  }
  return <></>;
};

export default Add;
