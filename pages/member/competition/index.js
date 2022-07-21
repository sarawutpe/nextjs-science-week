import React, { useState, useEffect, useRef } from 'react';
import useUser from 'hoc/useUser';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import actions from 'redux/actions';
import MainLayout from 'templates/MainLayout/Index';
import SubNavbar from 'templates/MainLayout/SubNavbar';
import CustomDialog from 'components/CustomDialog';
import { mainMenu } from 'utils/configMenu';
import { DOCUMENT_URL } from 'utils/constants';
import formatter from 'utils/formatter';
import Loading from 'components/Loading';
import { useConfirm } from 'material-ui-confirm';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
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
import AddIcon from '@mui/icons-material/Add';

const Index = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  // search
  const [search, setSearch] = useState('');

  // initial state
  useEffect(() => {
    dispatch(actions.getCompetitionByMemberIdRequest({ id: user?.id, search: search }));
    // clear
    setOpenEditDialog(false);
  }, [router, user]);

  // global state
  const profile = useSelector(({ getMemberByIdReducer }) => getMemberByIdReducer);
  const getCompetitionByMemberIdState = useSelector(
    ({ getCompetitionByMemberIdReducer }) => getCompetitionByMemberIdReducer
  );
  const updateCompetitionState = useSelector(
    ({ updateCompetitionReducer }) => updateCompetitionReducer
  );

  // handle advisor
  const [advisorInput, setAdvisorInput] = useState([{ advisor_id: uuidv4() }]);
  const [deleteAdvisorList, setDeleteAdvisorList] = useState([]);
  const advisorRef = useRef([]);

  const handleAdvisor = (action, advisor_id, createdAt, updatedAt) => {
    if (action === 'add') {
      if (advisorInput.length < initialCompetition.limit_per_advisor) {
        setAdvisorInput([...advisorInput, { advisor_id: uuidv4() }]);
      }
    } else if (action === 'delete') {
      if (advisorInput.length > 1) {
        confirm({
          description: 'ต้องการยืนยันการลบรายชื่ออาจารย์ที่ปรึกษาหรือไม่?',
        }).then(() => {
          // save id to delete in the db
          if (createdAt && updatedAt) {
            setDeleteAdvisorList([...deleteAdvisorList, { advisor_id: advisor_id }]);
          }
          // todo
          let filter = advisorInput.filter((row) => {
            return row.advisor_id !== advisor_id;
          });
          setAdvisorInput(filter);
        });
      }
    }
  };

  // handle participant
  const [participantInput, setParticipantInput] = useState([]);
  const [deleteParticipantList, setDeleteParticipantList] = useState([]);
  const participantRef = useRef([]);

  const handleParticipant = (action, participant_id, createdAt, updatedAt) => {
    if (action === 'add') {
      if (participantInput.length < initialCompetition.limit_per_team) {
        setParticipantInput([...participantInput, { participant_id: uuidv4() }]);
      }
    } else if (action === 'delete') {
      if (participantInput.length > 1) {
        confirm({
          description: 'ต้องการยืนยันการลบรายชื่อผู้สมัครเข้าร่วมกิจกรรมหรือไม่?',
        }).then(() => {
          // save id to delete in the db
          if (createdAt && updatedAt) {
            setDeleteParticipantList([
              ...deleteParticipantList,
              { participant_id: participant_id },
            ]);
          }
          // todo
          let filter = participantInput.filter((row) => {
            return row.participant_id !== participant_id;
          });
          setParticipantInput(filter);
        });
      }
    }
  };

  const [initialCompetition, setInitialCompetition] = useState({
    competition_id: '',
    member_id: '',
    program_id: '',
    limit_per_advisor: '',
    limit_per_team: '',
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
  };

  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    validate: (values) => {
      const errors = {};
      return errors;
    },
    onSubmit: async (values) => {
      const createAdvisorList = [];
      const updateAdvisorList = [];
      const createParticipantList = [];
      const updateParticipantList = [];
      // create advisor list
      for await (const [i] of advisorRef.current.entries()) {
        if (advisorRef.current[i] === null || advisorRef.current[i].value.trim() === '') {
          continue;
        }
        if (advisorRef.current[i].name === 'create') {
          createAdvisorList.push({ advisor_name: advisorRef.current[i].value.trim() });
        } else if (advisorRef.current[i].name === 'update') {
          updateAdvisorList.push({
            advisor_id: advisorRef.current[i].id,
            advisor_name: advisorRef.current[i].value.trim(),
          });
        }
      }
      // create participant list
      for await (const [i] of participantRef.current.entries()) {
        if (participantRef.current[i] === null || participantRef.current[i].value.trim() === '') {
          continue;
        }
        if (participantRef.current[i].name === 'create') {
          createParticipantList.push({
            participant_name: participantRef.current[i].value.trim(),
          });
        } else if (participantRef.current[i].name === 'update') {
          updateParticipantList.push({
            participant_id: participantRef.current[i].id,
            participant_name: participantRef.current[i].value.trim(),
          });
        }
      }
      // create data
      const data = {
        competition_id: initialCompetition.competition_id,
        program_id: initialCompetition.program_id,
        school_id: profile.result?.data?.school_id,
        create_advisor_list: createAdvisorList,
        update_advisor_list: updateAdvisorList,
        delete_advisor_list: deleteAdvisorList,
        create_participant_list: createParticipantList,
        update_participant_list: updateParticipantList,
        delete_participant_list: deleteParticipantList,
      };
      confirm({
        description: 'ต้องการยืนยันการแก้ไขรายชื่อผู้สมัครเข้าร่วมกิจกรรมหรือไม่?',
      }).then(() => {
        // action
        dispatch(actions.updateCompetitionRequest(data));
      });
    },
  });

  // protected
  if (user?.auth0) {
    return (
      <MainLayout menu={mainMenu}>
        <SubNavbar profile={profile}>
          <Box display="flex" flexDirection="row" justifyContent="space-between" mb={3}>
            <Typography variant="h6">กิจกรรมที่เข้าร่วม</Typography>
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
          </Box>

          {getCompetitionByMemberIdState.isFetching ? (
            <Loading />
          ) : (
            <Box mb={4}>
              {getCompetitionByMemberIdState.result?.data?.map((row, index) => (
                <Box key={index} mb={6}>
                  {/* activity */}
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6">{row.activity_name}</Typography>
                    <Typography variant="h6">
                      {row.activity_type === 1 ? 'การประกวด/แข่งขัน' : 'อบรม'}
                    </Typography>
                  </Box>
                  {/* program section */}
                  {row.programs?.map((row, index) => (
                    <Box
                      key={index}
                      sx={{
                        border: 2,
                        borderColor: 'text.disabled',
                        mb: 2,
                        p: 1,
                      }}
                    >
                      {/* activity level */}
                      <div style={{ marginBottom: 8 }}>
                        <Box bgcolor="action.hover">
                          <Typography variant="subtitle1" fontWeight="bold">
                            ระดับกิจกรรม
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <Typography variant="body1" mr={1}>
                            ระดับกิจกรรม:
                          </Typography>
                          <Typography variant="body1">{row.activity_level?.name}</Typography>
                        </Box>
                      </div>
                      {/* join detail */}
                      <div style={{ marginBottom: 8 }}>
                        <Box bgcolor="action.hover">
                          <Typography variant="subtitle1" fontWeight="bold">
                            ข้อจำกัด
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <Typography variant="body1" mr={1}>
                            จำกัดอาจารย์ที่ปรึกษา:
                          </Typography>
                          <Typography variant="body1">{`ทีมละไม่เกิน ${row.limit_per_advisor} คน`}</Typography>
                        </Box>
                        <Box display="flex">
                          <Typography variant="body1" mr={1}>
                            จำกัดจำนวนผู้สมัครต่อทีม:
                          </Typography>
                          <Typography variant="body1">{`ทีมละไม่เกิน ${row.limit_per_team} คน`}</Typography>
                        </Box>
                        <Box display="flex">
                          <Typography variant="body1" mr={1}>
                            จำกัดจำนวนทีมต่อโรงเรียน:
                          </Typography>
                          <Typography variant="body1">
                            {row.limit_per_school == 0 ? 'ไม่จำกัด' : `${row.limit_per_school} ทีม`}
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <Typography variant="body1" mr={1}>
                            จำกัดจำนวนทีมต่อโปรแกรมแข่งขัน:
                          </Typography>
                          <Typography variant="body1">
                            {row.limit_per_program == 0
                              ? 'ไม่จำกัด'
                              : `${row.limit_per_program} ทีม`}
                          </Typography>
                        </Box>
                      </div>
                      {/* detail */}
                      <div style={{ marginBottom: 8 }}>
                        <Box bgcolor="action.hover">
                          <Typography variant="subtitle1" fontWeight="bold">
                            รายละเอียดกิจกรรม
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <Typography variant="body1" mr={1}>
                            วันที่รับสมัคร:
                          </Typography>
                          <Typography variant="body1">
                            {row?.apply_from ? formatter.momentLocal(row.apply_from) : ''}
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <Typography variant="body1" mr={1}>
                            วันที่ปิดรับสมัคร:
                          </Typography>
                          <Typography variant="body1">
                            {row?.apply_to ? formatter.momentLocal(row.apply_to) : ''}
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <Typography variant="body1" mr={1}>
                            วันที่แข่งขัน:
                          </Typography>
                          <Typography variant="body1">
                            {row?.start_date ? formatter.momentLocal(row.start_date) : ''}
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <Typography variant="body1" mr={1}>
                            วันที่ประกาศผล:
                          </Typography>
                          <Typography variant="body1">
                            {row?.result_date ? formatter.momentLocal(row.result_date) : ''}
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <Typography variant="body1" mr={1}>
                            สถานที่/วิธีการแข่งขัน:
                          </Typography>
                          <Typography variant="body1">{row?.location ?? ''}</Typography>
                        </Box>
                      </div>
                      {/* coordinator */}
                      <div style={{ marginBottom: 8 }}>
                        <Box bgcolor="action.hover">
                          <Typography variant="subtitle1" fontWeight="bold">
                            ผู้ประสานงานการแข่งขัน
                          </Typography>
                        </Box>
                        {row.coordinators?.map((row, index) => (
                          <Typography key={index} variant="body1">
                            {row.coordinator_name}
                          </Typography>
                        ))}
                      </div>
                      {/* document */}
                      <div style={{ marginBottom: 8 }}>
                        <Box bgcolor="action.hover">
                          <Typography variant="subtitle1" fontWeight="bold">
                            เอกสารกิจกรรม
                          </Typography>
                        </Box>
                        {row.documents?.map((row, index) => (
                          <Box key={index} display="flex">
                            <Typography key={index} variant="body1" mr={1}>
                              {row.document_name}
                            </Typography>
                            <a href={`${DOCUMENT_URL}/${row.document_src}`}> {row.document_src}</a>
                          </Box>
                        ))}
                      </div>
                      {/* link */}
                      <div style={{ marginBottom: 8 }}>
                        <Box bgcolor="action.hover">
                          <Typography variant="subtitle1" fontWeight="bold">
                            ลิ้งก์กิจกรรม
                          </Typography>
                        </Box>
                        {row.links?.map((row, index) => (
                          <Box key={index} display="flex">
                            <Typography key={index} variant="body1" mr={1}>
                              {row.link_name}
                            </Typography>
                            <a href={row.link_src} target="_blank">
                              {row.link_src}
                            </a>
                          </Box>
                        ))}
                      </div>
                      {/* competition */}
                      <Box bgcolor="action.hover">
                        <Typography variant="subtitle1" fontWeight="bold">
                          รายการสมัครเข้าร่วมกิจกรรม
                        </Typography>
                      </Box>
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>#</TableCell>
                              {row.activity?.activity_type == 1 && (
                                <TableCell>อาจารย์ที่ปรึกษา</TableCell>
                              )}
                              <TableCell>รายชื่อผู้สมัคร</TableCell>
                              <TableCell>สถานะเข้าร่วม</TableCell>
                              <TableCell align="center">แก้ไข</TableCell>
                              <TableCell align="center">ลบ</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.competitions?.map((row, index) => (
                              <TableRow key={index}>
                                <TableCell sx={{ verticalAlign: 'top' }}>{index + 1}</TableCell>
                                {row.program?.activity?.activity_type == 1 && (
                                  <TableCell>
                                    {row.advisors?.map((row, index) => (
                                      <Typography key={index} variant="body2">
                                        {row.advisor_name}
                                      </Typography>
                                    ))}
                                  </TableCell>
                                )}
                                <TableCell sx={{ verticalAlign: 'top' }}>
                                  {row.participants?.map((row, index) => (
                                    <Typography key={index} variant="body2">
                                      {row.participant_name}
                                    </Typography>
                                  ))}
                                </TableCell>
                                <TableCell>
                                  {row.participants?.map((row, index) => (
                                    <Typography key={index} variant="body2">
                                      {row.participant_active ? 'เข้าร่วม' : '-'}
                                    </Typography>
                                  ))}
                                </TableCell>
                                <TableCell align="center" sx={{ verticalAlign: 'top' }}>
                                  <IconButton
                                    color="primary"
                                    component="span"
                                    disabled={row?.program?.confirm}
                                    onClick={() => {
                                      if (!row?.program?.confirm) {
                                        // initial state
                                        setInitialCompetition({
                                          competition_id: row.competition_id,
                                          member_id: row.member_id,
                                          program_id: row.program_id,
                                          limit_per_advisor: row.program?.limit_per_advisor,
                                          limit_per_team: row.program?.limit_per_team,
                                        });
                                        setAdvisorInput(row.advisors);
                                        setParticipantInput(row.participants);
                                        handleOpenEditDialog();
                                      }
                                    }}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </TableCell>
                                <TableCell align="center" sx={{ verticalAlign: 'top' }}>
                                  <IconButton
                                    color="primary"
                                    component="span"
                                    disabled={row?.program?.confirm}
                                    onClick={() => {
                                      if (!row?.program?.confirm) {
                                        confirm({
                                          description:
                                            'ต้องการยืนยันการลบกิจกรรมที่เข้าร่วมหรือไม่',
                                        }).then(() => {
                                          dispatch(
                                            actions.deleteCompetitionRequest(row.competition_id)
                                          );
                                        });
                                      }
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          )}
          {/* form section */}
          <CustomDialog
            title="แก้ไขรายชื่อผู้สมัครเข้าร่วมกิจกรรม"
            size="md"
            open={openEditDialog}
            onClose={handleCloseEditDialog}
          >
            <form onSubmit={formik.handleSubmit}>
              <Box mb={2}>
                <Stack flexDirection="row" alignItems="center" mb={1}>
                  <div>
                    <Typography variant="subtitle1">รายชื่ออาจารย์ที่ปรึกษา</Typography>
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
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: 'action.hover' }}>
                      <TableRow>
                        <TableCell>ชื่อ-นามสกุล</TableCell>
                        <TableCell align="center">ลบ</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {advisorInput?.map((row, index) => (
                        <TableRow key={row.advisor_id}>
                          <TableCell>
                            <TextField
                              type="text"
                              variant="outlined"
                              label="ชื่อ-นามสกุล"
                              size="small"
                              margin="dense"
                              defaultValue={row.advisor_name}
                              fullWidth
                              required
                              inputRef={(element) => (advisorRef.current[index] = element)}
                              inputProps={{
                                id: row.advisor_id,
                                name: row.createdAt && row.updatedAt ? 'update' : 'create',
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              color="primary"
                              component="span"
                              onClick={() =>
                                handleAdvisor(
                                  'delete',
                                  row.advisor_id,
                                  row.createdAt,
                                  row.updatedAt
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box my={2}>
                <Stack flexDirection="row" alignItems="center" mb={1}>
                  <div>
                    <Typography variant="subtitle1">รายชื่อผู้สมัครเข้าร่วมกิจกรรม</Typography>
                  </div>
                  <div>
                    <Button
                      onClick={() => handleParticipant('add')}
                      sx={{ mx: 1 }}
                      variant="text"
                      endIcon={<AddIcon />}
                    >
                      เพิ่มชื่อ
                    </Button>
                  </div>
                </Stack>
                <TableContainer>
                  <Table>
                    <TableHead sx={{ bgcolor: 'action.hover' }}>
                      <TableRow>
                        <TableCell>ชื่อ-นามสกุล</TableCell>
                        <TableCell align="center">ลบ</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {participantInput?.map((row, index) => (
                        <TableRow key={row.participant_id}>
                          <TableCell>
                            <TextField
                              type="text"
                              variant="outlined"
                              label="ชื่อ-นามสกุล"
                              size="small"
                              margin="dense"
                              defaultValue={row.participant_name}
                              fullWidth
                              required
                              inputRef={(element) => (participantRef.current[index] = element)}
                              inputProps={{
                                id: row.participant_id,
                                name: row.createdAt && row.updatedAt ? 'update' : 'create',
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              color="primary"
                              component="span"
                              onClick={() =>
                                handleParticipant(
                                  'delete',
                                  row.participant_id,
                                  row.createdAt,
                                  row.updatedAt
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Stack mt={2} mb={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={updateCompetitionState.isFetching}
                >
                  แก้ไข
                </Button>
              </Stack>
            </form>
          </CustomDialog>
        </SubNavbar>
      </MainLayout>
    );
  }
  return <></>;
};

export default Index;
