import React, { Fragment, useState, useEffect, useRef } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import { useConfirm } from 'material-ui-confirm';
import { menu2 } from 'utils/configMenu';
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
import CustomDialog from 'components/CustomDialog';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';

const Participant = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    dispatch(actions.getParticipantByAdminIdRequest(user?.id));
    dispatch(actions.getProgramRequest());
    // clear
    setOpenEditDialog(false);
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const getParticipantByAdminIdState = useSelector(
    ({ getParticipantByAdminIdReducer }) => getParticipantByAdminIdReducer
  );
  const updateParticipantState = useSelector(
    ({ updateParticipantReducer }) => updateParticipantReducer
  );

  // initial competition
  const [initialCompetition, setInitialCompetition] = useState({
    competition_id: '',
    member_id: '',
    program_id: '',
    limit_per_advisor: '',
    limit_per_team: '',
  });

  // open dialog
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
    formik.setErrors({});
    formik.setTouched({});
  };

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
        confirm({ description: 'ต้องการยืนยันการลบรายชื่ออาจารย์ที่ปรึกษาหรือไม่?' }).then(() => {
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
  const participnatActiveRef = useRef([]);

  const handleParticipant = (action, participant_id, createdAt, updatedAt) => {
    if (action === 'add') {
      if (participantInput.length < initialCompetition.limit_per_team) {
        setParticipantInput([...participantInput, { participant_id: uuidv4() }]);
      }
    } else if (action === 'delete') {
      if (participantInput.length > 1) {
        confirm({ description: 'ต้องการยืนยันการลบรายชื่อผู้สมัครเข้าร่วมกิจกรรมหรือไม่?' }).then(
          () => {
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
          }
        );
      }
    }
  };

  // edit formik
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
          createParticipantList.push({ participant_name: participantRef.current[i].value.trim() });
        } else if (participantRef.current[i].name === 'update') {
          updateParticipantList.push({
            participant_id: participantRef.current[i].id,
            participant_name: participantRef.current[i].value.trim(),
            participant_active: participnatActiveRef.current[i].checked,
          });
        }
      }
      // create data
      const data = {
        competition_id: initialCompetition.competition_id,
        program_id: initialCompetition.program_id,
        school_id: initialCompetition.school_id,
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
        dispatch(actions.updateParticipantRequest(data));
      });
    },
  });

  // START DELETE SECTION
  // Handle selected id
  const [selectedDeleteId, setSelectedDeleteId] = useState('');
  // Handle callback dialog
  const [confirmDialog, setConfirmDialog] = useState(false);
  // Set confirm dialog
  const handleOpenConfirmDialog = (id) => {
    setConfirmDialog(true);
    setSelectedDeleteId(id);
  };

  // protected
  if (user?.auth2) {
    return (
      <AdminLayout menu={menu2} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Typography variant="h6">จัดการรายชื่อรายชื่อผู้มาร่วมกิจกรรม</Typography>
            </Stack>
          </Stack>
          {getParticipantByAdminIdState.isFetching ? (
            <Loading />
          ) : (
            <Fragment>
              {getParticipantByAdminIdState.result?.data?.map((row, index) => (
                <Box key={index} mb={8}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6">{row.activity_name}</Typography>
                    <Typography variant="h6">
                      {row.activity_type === 1 ? 'การประกวด/แข่งขัน' : 'อบรม'}
                    </Typography>
                  </Box>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>ระดับกิจกรรม</TableCell>
                          <TableCell>ลำดับเข้าร่วม</TableCell>
                          <TableCell>รายชื่ออาจารย์ที่ปรึกษา</TableCell>
                          <TableCell>รายชื่อผู้สมัคร</TableCell>
                          <TableCell>สถานะเข้าร่วม</TableCell>
                          <TableCell>แก้ไข</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.programs?.map((row, index) => (
                          <Fragment key={row.program_id}>
                            <TableRow sx={{ verticalAlign: 'top' }}>
                              <TableCell rowSpan={(row.competitions.length + 1).toString()}>
                                {index + 1}
                              </TableCell>
                              <TableCell rowSpan={(row.competitions.length + 1).toString()}>
                                {row.activity_level?.name}
                              </TableCell>
                            </TableRow>
                            {row.competitions?.map((row, index) => (
                              <Fragment key={row.competition_id}>
                                <TableRow sx={{ verticalAlign: 'top' }}>
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>
                                    {row.advisors?.map((row, index) => (
                                      <Typography key={index} variant="body2">
                                        {row.advisor_name}
                                      </Typography>
                                    ))}
                                  </TableCell>
                                  <TableCell>
                                    {row.participants?.map((row, index) => (
                                      <pre key={index} style={{ margin: 0 }}>
                                        {`${index + 1}. ${row.participant_name}`}
                                      </pre>
                                    ))}
                                  </TableCell>
                                  <TableCell>
                                    {row.participants?.map((row) => (
                                      <pre key={row.participant_id} style={{ margin: 0 }}>
                                        {row.participant_active ? 'เข้าร่วม' : '-'}
                                      </pre>
                                    ))}
                                  </TableCell>
                                  <TableCell sx={{ verticalAlign: 'top' }}>
                                    <IconButton
                                      color="primary"
                                      component="span"
                                      onClick={() => {
                                        // initial
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
                                      }}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              </Fragment>
                            ))}
                          </Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ))}
            </Fragment>
          )}
        </Box>

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
                              handleAdvisor('delete', row.advisor_id, row.createdAt, row.updatedAt)
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
                      <TableCell>สถานะเข้าร่วม</TableCell>
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
                        <TableCell>
                          <Checkbox
                            inputRef={(element) => (participnatActiveRef.current[index] = element)}
                            inputProps={{
                              id: row.participant_id,
                              name: row.createdAt && row.updatedAt ? 'update' : 'create',
                            }}
                            defaultChecked={row.participant_active === 1 ? true : false}
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
                disabled={updateParticipantState.isFetching}
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

export default Participant;
