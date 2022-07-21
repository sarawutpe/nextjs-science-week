import React, { Fragment, useState, useEffect, useRef } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import moment from 'moment';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import { menu2 } from 'utils/configMenu';
import Loading from 'components/Loading';
import CustomDialog from 'components/CustomDialog';
import momentUtil from 'utils/momentUtil';
import { useConfirm } from 'material-ui-confirm';
import FormControl from '@mui/material/FormControl';
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';

const Program = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  // initial activity
  const [initialProgram, setInitialProgram] = useState({
    program_id: '',
    activity_id: '',
    activity_level_id: '',
    limit_per_advisor: '',
    limit_per_team: '',
    limit_per_school: '',
    limit_per_program: '',
    apply_from: '',
    apply_to: '',
    start_date: '',
    result_date: '',
    location: '',
    confirm: '',
    createdAt: '',
    updatedAt: '',
  });

  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    dispatch(actions.getActivityByAdminIdRequest({ id: user?.id }));
    dispatch(actions.getActivityLevelRequest());

    // clear dialog
    if (openAddDialog) {
      setOpenAddDialog(false);
      addFormik.handleReset();
    } else if (openEditDialog) {
      setOpenEditDialog(false);
      editFormik.handleReset();
    }

    // clear state
    setCoordinatorList([]);
    setDocumentList([]);
    setLinkList([]);

    // router is ready!
    if (router.isReady && user) {
      dispatch(
        actions.getProgramByAdminIdRequest({ id: user?.id, search: router.query.search })
      );
    }
  }, [router, user]);

  // state
  const [search, setSearch] = useState('');

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const addProgramState = useSelector(({ addProgramReducer }) => addProgramReducer);
  const getActivityByAdminState = useSelector(
    ({ getActivityByAdminIdReducer }) => getActivityByAdminIdReducer
  );
  const getActivityLevelState = useSelector(
    ({ getActivityLevelReducer }) => getActivityLevelReducer
  );
  const getProgramByAdminIdState = useSelector(
    ({ getProgramByAdminIdReducer }) => getProgramByAdminIdReducer
  );
  const updateProgramState = useSelector(
    ({ updateProgramReducer }) => updateProgramReducer
  );

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

  // coordinator
  const coordinatorNameRef = useRef();
  const [coordinatorList, setCoordinatorList] = useState([]);
  const [coordinatorDeleteList, setCoordinatorDeleteList] = useState([]);

  // handle coordinator list
  const handleCoordinator = (action, coordinator_id, createdAt, updatedAt) => {
    if (action === 'add') {
      // check empty value
      if (coordinatorNameRef.current.value.trim()) {
        setCoordinatorList([
          ...coordinatorList,
          {
            coordinator_id: coordinatorList.length + 1,
            coordinator_name: coordinatorNameRef.current.value,
            createdAt: '',
            updatedAt: '',
          },
        ]);
      }
      // clear ref
      coordinatorNameRef.current.value = '';
    } else if (action === 'update') {
      confirm({ description: 'ต้องการยืนยันการลบผู้ประสานงานการแข่งขันหรือไม่?' }).then(
        () => {
          // save id to delete in the db
          if (createdAt && updatedAt) {
            setCoordinatorDeleteList([
              ...coordinatorDeleteList,
              { coordinator_id: coordinator_id },
            ]);
          }
          // filter and remove
          let filtered = coordinatorList.filter((row) => {
            return row.coordinator_id != coordinator_id;
          });
          // set new state
          setCoordinatorList(filtered);
        }
      );
    } else {
      return;
    }
  };

  // document state
  const documentRef = useRef([]);
  const [documentList, setDocumentList] = useState([]);
  const [documentDeleteList, setDocumentDeleteList] = useState([]);

  // handle document list
  const handleDocument = (action, document_id, createdAt, updatedAt) => {
    if (action === 'add') {
      // check empty value
      if (documentRef.current[0].value.trim() && documentRef.current[1].files[0]) {
        setDocumentList([
          ...documentList,
          {
            document_id: documentList.length + 1,
            document_name: documentRef.current[0].value,
            document_src: documentRef.current[1].files[0],
          },
        ]);
      }
      // clear ref
      documentRef.current[0].value = '';
      documentRef.current[1].value = '';
    } else if (action === 'update') {
      confirm({ description: 'ต้องการยืนยันการลบไฟล์กิจกรรมหรือไม่?' }).then(() => {
        // save id to update in the db
        if (createdAt && updatedAt) {
          setDocumentDeleteList([...documentDeleteList, { document_id: document_id }]);
        }
        // filter and remove
        let filtered = documentList.filter((row) => {
          return row.document_id != document_id;
        });
        // set new state
        setDocumentList(filtered);
      });
    } else {
      return;
    }
  };

  // link state
  const linkRef = useRef([]);
  const [linkList, setLinkList] = useState([]);
  const [linkDeleteList, setLinkDeleteList] = useState([]);

  // handle link list
  const handleLink = (action, link_id, createdAt, updatedAt) => {
    if (action === 'add') {
      // check empty value
      if (linkRef.current[0].value.trim() && linkRef.current[1].value.trim()) {
        setLinkList([
          ...linkList,
          {
            link_id: linkList.length + 1,
            link_name: linkRef.current[0].value,
            link_src: linkRef.current[1].value,
          },
        ]);
      }
      // clear ref
      linkRef.current[0].value = '';
      linkRef.current[1].value = '';
    } else if (action === 'update') {
      confirm({ description: 'ต้องการยืนยันการลบลิ้งก์กิจกรรมหรือไม่?' }).then(() => {
        // save id to update in the db
        if (createdAt && updatedAt) {
          setLinkDeleteList([...linkDeleteList, { link_id: link_id }]);
        }
        // filter and remove
        let filtered = linkList.filter((row) => {
          return row.link_id != link_id;
        });
        // set new state
        setLinkList(filtered);
      });
    } else {
      return;
    }
  };

  // initial add Formik
  const initialAddFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      activity_id: getActivityByAdminState?.result?.data[0]?.activity_id ?? '',
      activity_level_id: getActivityLevelState?.result?.data[0]?.activity_level_id ?? '',
    },
  });

  // add formik
  const addFormik = useFormik({
    initialValues: {
      limit_per_advisor: '2',
      limit_per_team: '1',
      limit_per_school: '0',
      limit_per_program: '0',
      apply_from: moment(new Date()).format('yyyy[-]MM[-]DD[T]HH:mm'),
      apply_to: moment(new Date()).format('yyyy[-]MM[-]DD[T]HH:mm'),
      start_date: moment(new Date()).format('yyyy[-]MM[-]DD[T]HH:mm'),
      result_date: moment(new Date()).format('yyyy[-]MM[-]DD[T]HH:mm'),
      location: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.limit_per_advisor && values.limit_per_advisor != 0) {
        errors.limit_per_advisor = 'จำเป็นต้องใช้';
      } else if (!/^[0-9]*$/i.test(values.limit_per_advisor)) {
        errors.limit_per_advisor = 'รูปแบบไม่ถูกต้อง';
      } else if (values.limit_per_advisor > 12) {
        errors.limit_per_advisor = 'จำกัดไม่เกิน 12 คนต่อทีม';
      }
      if (!values.limit_per_team) {
        errors.limit_per_team = 'จำเป็นต้องใช้';
      } else if (!/^[0-9]*$/i.test(values.limit_per_team) || values.limit_per_team < 1) {
        errors.limit_per_team = 'รูปแบบไม่ถูกต้อง';
      } else if (values.limit_per_team > 12) {
        errors.limit_per_team = 'จำกัดไม่เกิน 12 คนต่อทีม';
      }
      if (!values.limit_per_school && values.limit_per_school != 0) {
        errors.limit_per_school = 'จำเป็นต้องใช้';
      } else if (!/^[0-9]*$/i.test(values.limit_per_school)) {
        errors.limit_per_school = 'รูปแบบไม่ถูกต้อง';
      }
      if (!values.limit_per_program && values.limit_per_program != 0) {
        errors.limit_per_program = 'จำเป็นต้องใช้';
      } else if (!/^[0-9]*$/i.test(values.limit_per_program)) {
        errors.limit_per_program = 'รูปแบบไม่ถูกต้อง';
      }
      if (momentUtil.timeExpired(values.apply_from)) {
        errors.apply_from = 'ไม่สามารถเลือกวันที่ย้อนหลังได้';
      }
      if (momentUtil.timeExpired(values.apply_to)) {
        errors.apply_to = 'ไม่สามารถเลือกวันที่ย้อนหลังได้';
      }
      if (momentUtil.timeExpired(values.start_date)) {
        errors.start_date = 'ไม่สามารถเลือกวันที่ย้อนหลังได้';
      }
      if (momentUtil.timeExpired(values.result_date)) {
        errors.result_date = 'ไม่สามารถเลือกวันที่ย้อนหลังได้';
      }
      if (!values.location) {
        errors.location = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      // create form data
      const formData = new FormData();
      formData.append('activity_id', initialAddFormik.values.activity_id);
      formData.append('activity_level_id', initialAddFormik.values.activity_level_id);
      formData.append('limit_per_advisor', values.limit_per_advisor);
      formData.append('limit_per_team', values.limit_per_team);
      formData.append('limit_per_school', values.limit_per_school);
      formData.append('limit_per_program', values.limit_per_program);
      formData.append('apply_from', moment(values.apply_from).format());
      formData.append('apply_to', moment(values.apply_to).format());
      formData.append('start_date', moment(values.start_date).format());
      formData.append('result_date', moment(values.result_date).format());
      formData.append('location', values.location);
      formData.append('confirm', false);

      // generate coordinator obj
      if (coordinatorList.length) {
        for (const [i] of coordinatorList.entries()) {
          formData.append('coordinator_name', coordinatorList[i].coordinator_name);
        }
      } else {
        formData.append('coordinator_name', '');
      }

      // generate document obj
      if (documentList.length) {
        for (const [i] of documentList.entries()) {
          formData.append('document_name', documentList[i].document_name);
          formData.append('document_src', documentList[i].document_src);
        }
      } else {
        formData.append('document_name', '');
        formData.append('document_src', '');
      }

      // generate link obj
      if (linkList.length) {
        for (const [i] of linkList.entries()) {
          formData.append('link_name', linkList[i].link_name);
          formData.append('link_src', linkList[i].link_src);
        }
      } else {
        formData.append('link_name', '');
        formData.append('link_src', '');
      }
      // action
      dispatch(actions.addProgramRequest(formData));
    },
  });
  // END ADD SECTION //

  // START EDIT SECTION //
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
    // clear state
    setCoordinatorList([]);
    setDocumentList([]);
    setLinkList([]);
    // clear formik
    editFormik.setErrors({});
    editFormik.setTouched({});
  };

  // initial edit Formik
  const initialEditFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      activity_id: initialProgram?.activity_id ?? '',
      activity_level_id: initialProgram?.activity_level_id ?? '',
    },
  });

  // edit formik
  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      limit_per_advisor: initialProgram?.limit_per_advisor,
      limit_per_team: initialProgram?.limit_per_team ?? '',
      limit_per_school: initialProgram?.limit_per_school ?? '',
      limit_per_program: initialProgram.limit_per_program ?? '',
      apply_from: moment(initialProgram.apply_from ?? '').format(
        'yyyy[-]MM[-]DD[T]HH:mm'
      ),
      apply_to: moment(initialProgram.apply_to ?? '').format('yyyy[-]MM[-]DD[T]HH:mm'),
      start_date: moment(initialProgram.start_date ?? '').format(
        'yyyy[-]MM[-]DD[T]HH:mm'
      ),
      result_date: moment(initialProgram.result_date ?? '').format(
        'yyyy[-]MM[-]DD[T]HH:mm'
      ),
      location: initialProgram.location ?? '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.limit_per_advisor && values.limit_per_advisor != 0) {
        errors.limit_per_advisor = 'จำเป็นต้องใช้';
      } else if (!/^[0-9]*$/i.test(values.limit_per_advisor)) {
        errors.limit_per_advisor = 'รูปแบบไม่ถูกต้อง';
      } else if (values.limit_per_advisor > 12) {
        errors.limit_per_advisor = 'จำกัดไม่เกิน 12 คนต่อทีม';
      }
      if (!values.limit_per_team) {
        errors.limit_per_team = 'จำเป็นต้องใช้';
      } else if (!/^[0-9]*$/i.test(values.limit_per_team) || values.limit_per_team < 1) {
        errors.limit_per_team = 'รูปแบบไม่ถูกต้อง';
      } else if (values.limit_per_team > 12) {
        errors.limit_per_team = 'จำกัดไม่เกิน 12 คนต่อทีม';
      }
      if (!values.limit_per_school && values.limit_per_school != 0) {
        errors.limit_per_school = 'จำเป็นต้องใช้';
      } else if (!/^[0-9]*$/i.test(values.limit_per_school)) {
        errors.limit_per_school = 'รูปแบบไม่ถูกต้อง';
      }
      if (!values.limit_per_program && values.limit_per_program != 0) {
        errors.limit_per_program = 'จำเป็นต้องใช้';
      } else if (!/^[0-9]*$/i.test(values.limit_per_program)) {
        errors.limit_per_program = 'รูปแบบไม่ถูกต้อง';
      }
      if (!values.apply_from) {
        errors.apply_from = 'จำเป็นต้องใช้';
      }
      if (!values.apply_to) {
        errors.apply_to = 'จำเป็นต้องใช้';
      }
      if (!values.start_date) {
        errors.start_date = 'จำเป็นต้องใช้';
      }
      if (!values.result_date) {
        errors.result_date = 'จำเป็นต้องใช้';
      }
      if (!values.location) {
        errors.location = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: (values) => {
      // create form data
      const formData = new FormData();
      formData.append('id', initialProgram.program_id ?? '');
      formData.append('activity_id', initialEditFormik.values.activity_id);
      formData.append('activity_level_id', initialEditFormik.values.activity_level_id);
      formData.append('limit_per_advisor', values.limit_per_advisor);
      formData.append('limit_per_team', values.limit_per_team);
      formData.append('limit_per_school', values.limit_per_school);
      formData.append('limit_per_program', values.limit_per_program);
      formData.append('apply_from', moment(values.apply_from).format());
      formData.append('apply_to', moment(values.apply_to).format());
      formData.append('start_date', moment(values.start_date).format());
      formData.append('result_date', moment(values.result_date).format());
      formData.append('location', values?.location ?? '');

      // generate coordinator add obj
      if (coordinatorList.length) {
        for (const [i] of coordinatorList.entries()) {
          if (coordinatorList[i].createdAt && coordinatorList[i].updatedAt) continue;
          formData.append('coordinator_name', coordinatorList[i].coordinator_name);
        }
      } else {
        formData.append('coordinator_name', '');
      }
      // generate coordinator delete obj
      if (coordinatorDeleteList.length) {
        for (const [i] of coordinatorDeleteList.entries()) {
          formData.append(
            'delete_coordinator_id',
            coordinatorDeleteList[i].coordinator_id
          );
        }
      } else {
        formData.append('delete_coordinator_id', '');
      }

      // generate document obj
      if (documentList.length) {
        for (const [i] of documentList.entries()) {
          if (documentList[i].createdAt && documentList[i].updatedAt) continue;
          formData.append('document_name', documentList[i].document_name);
          formData.append('document_src', documentList[i].document_src);
        }
      } else {
        formData.append('document_name', '');
      }

      // generate document delete obj
      if (documentDeleteList.length) {
        for (const [i] of documentDeleteList.entries()) {
          formData.append('delete_document_id', documentDeleteList[i].document_id);
        }
      } else {
        formData.append('delete_document_id', '');
      }

      // generate link obj
      if (linkList.length) {
        for (const [i] of linkList.entries()) {
          if (linkList[i].createdAt && linkList[i].updatedAt) continue;
          formData.append('link_name', linkList[i].link_name);
          formData.append('link_src', linkList[i].link_src);
        }
      } else {
        formData.append('link_name', []);
      }
      // generate coordinator delete obj
      if (linkDeleteList.length) {
        for (const [i] of linkDeleteList.entries()) {
          formData.append('delete_link_id', linkDeleteList[i].link_id);
        }
      } else {
        formData.append('delete_link_id', []);
      }

      // action
      dispatch(actions.updateProgramRequest(formData));
    },
  });
  // END EDIT SECTION //

  // protected
  if (user?.auth2) {
    return (
      <AdminLayout menu={menu2} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Box display="flex">
                <Typography variant="h6" mr={1}>
                  จัดการโปรแกรมแข่งขัน
                </Typography>
                <Button
                  type="button"
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleOpenAddDialog}
                >
                  เพิ่มโปรแกรมแข่งขัน
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

          {getProgramByAdminIdState.isFetching ? (
            <Loading />
          ) : (
            getProgramByAdminIdState.result?.data?.map((row, index) => (
              <Box key={index} mb={8}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="h6">{row.activity_name}</Typography>
                  <Typography variant="h6">
                    {row.activity_type === 1 ? 'การประกวด/แข่งขัน' : 'อบรม'}
                  </Typography>
                </Box>
                {row.programs?.map((row, index) => (
                  <TableContainer
                    key={index}
                    component={Paper}
                    sx={{ mb: 2, bgcolor: 'palette.success.light' }}
                  >
                    <Typography
                      variant="body1"
                      p={1}
                      bgcolor="success.light"
                      color="white"
                    >
                      {row.activity_level?.name}
                    </Typography>
                    <Table sx={{ minWidth: 650 }}>
                      <TableHead>
                        <TableRow>
                          <TableCell>จำกัดอาจารย์ที่ปรึกษา</TableCell>
                          <TableCell>จำกัดจำนวนผู้สมัครต่อทีม</TableCell>
                          <TableCell>จำกัดจำนวนทีมต่อโรงเรียน</TableCell>
                          <TableCell>จำกัดจำนวนทีมต่อโปรแกรมแข่งขัน</TableCell>
                          <TableCell>วันที่รับสมัคร</TableCell>
                          <TableCell>วันที่ปิดรับสมัคร</TableCell>
                          <TableCell>วันที่แข่งขัน</TableCell>
                          <TableCell>วันที่ประกาศผล</TableCell>
                          <TableCell>สถานที่/วิธีการแข่งขัน</TableCell>
                          <TableCell>แก้ไข</TableCell>
                          <TableCell>ลบ</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ verticalAlign: 'top' }}>
                        <TableRow sx={{ verticalAlign: 'top', mb: 10 }}>
                          <TableCell>{row.limit_per_advisor}</TableCell>
                          <TableCell>{row.limit_per_team}</TableCell>
                          <TableCell>{row.limit_per_school}</TableCell>
                          <TableCell>{row.limit_per_program}</TableCell>
                          <TableCell>
                            {moment(row.apply_from).add(543, 'year').format('l')}
                          </TableCell>
                          <TableCell>
                            {moment(row.apply_to).add(543, 'year').format('l')}
                          </TableCell>
                          <TableCell>
                            {moment(row.start_date).add(543, 'year').format('l')}
                          </TableCell>
                          <TableCell>
                            {moment(row.result_date).add(543, 'year').format('l')}
                          </TableCell>
                          <TableCell>{row.location}</TableCell>
                          <TableCell sx={{ p: 1 }}>
                            <IconButton
                              color="primary"
                              component="span"
                              onClick={() => {
                                // initial state
                                setInitialProgram({
                                  program_id: row.program_id,
                                  activity_id: row.activity_id,
                                  activity_level_id: row.activity_level_id,
                                  limit_per_advisor: row.limit_per_advisor,
                                  limit_per_team: row.limit_per_team,
                                  limit_per_school: row.limit_per_school,
                                  limit_per_program: row.limit_per_program,
                                  apply_from: row.apply_from,
                                  apply_to: row.apply_to,
                                  start_date: row.start_date,
                                  result_date: row.result_date,
                                  location: row.location,
                                  confirm: row.confirm,
                                  createdAt: row.createdAt,
                                  updatedAt: row.updatedAt,
                                });
                                setCoordinatorList(row.coordinators);
                                setDocumentList(row.documents);
                                setLinkList(row.links);

                                // open edit dialog
                                handleOpenEditDialog();
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell sx={{ p: 1 }}>
                            <IconButton
                              color="primary"
                              component="span"
                              onClick={() => {
                                confirm({
                                  description: 'ต้องการยืนยันการลบโปรแกรมแข่งขันหรือไม่?',
                                }).then(() => {
                                  dispatch(
                                    actions.deleteActivityRequest(row.activity_id)
                                  );
                                });
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell colSpan={11}>
                            <Box
                              sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: 4,
                              }}
                            >
                              <Box
                                sx={{ bgcolor: 'action.hover', p: 1, borderRadius: 2 }}
                              >
                                <Typography variant="body1">
                                  ผู้ประสานงานการแข่งขัน
                                </Typography>
                                {row.coordinators?.map((row, index) => (
                                  <Typography key={index} variant="body2">
                                    {`${index + 1}. ${row.coordinator_name}`}
                                  </Typography>
                                ))}
                              </Box>
                              <Box
                                sx={{ bgcolor: 'action.hover', p: 1, borderRadius: 2 }}
                              >
                                <Typography variant="body1">ไฟล์กิจกรรม</Typography>
                                {row.documents?.map((row, index) => (
                                  <Typography key={index} variant="body2">
                                    {`${index + 1}. ${row.document_name} | ${
                                      row.document_src
                                    }`}
                                  </Typography>
                                ))}
                              </Box>
                              <Box
                                sx={{ bgcolor: 'action.hover', p: 1, borderRadius: 2 }}
                              >
                                <Typography variant="body1">ลิ้งก์กิจกรรม</Typography>
                                {row.links?.map((row, index) => (
                                  <Typography key={index} variant="body2">
                                    {`${index + 1}. ${row.link_name} | ${row.link_src}`}
                                  </Typography>
                                ))}
                              </Box>
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                ))}
              </Box>
            ))
          )}
        </Box>

        {/* add form section */}
        <CustomDialog
          title="เพิ่มโปรแกรมแข่งขัน"
          size="md"
          open={openAddDialog}
          onClose={handleCloseAddDialog}
        >
          <form onSubmit={addFormik.handleSubmit}>
            {/* start textfield */}
            <Box mb={2}>
              <Typography variant="subtitle1">เลือกกิจกรรม / ระดับการแข่งขัน</Typography>
              <FormControl fullWidth margin="dense" size="small">
                <Select
                  name="activity_id"
                  value={initialAddFormik.values.activity_id}
                  onChange={initialAddFormik.handleChange}
                >
                  {getActivityByAdminState.result?.data?.map((row, index) => (
                    <MenuItem key={index} value={row.activity_id}>
                      {row.activity_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="dense" size="small">
                <Select
                  name="activity_level_id"
                  value={initialAddFormik.values.activity_level_id}
                  onChange={initialAddFormik.handleChange}
                >
                  {getActivityLevelState.result?.data?.map((row, index) => (
                    <MenuItem key={index} value={row.activity_level_id}>
                      {row.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">ข้อจำกัด</Typography>
              <Alert sx={{ mb: 1 }} severity="info">
                0 = ไม่ระบุ
              </Alert>
              <TextField
                sx={{ mb: 1 }}
                type="text"
                variant="outlined"
                label="จำกัดอาจารย์ที่ปรึกษา"
                size="small"
                margin="dense"
                name="limit_per_advisor"
                fullWidth
                value={addFormik.values.limit_per_advisor}
                helperText={
                  addFormik.touched.limit_per_advisor &&
                  addFormik.errors.limit_per_advisor
                }
                onChange={addFormik.handleChange}
                onBlur={addFormik.handleBlur}
              />
              <TextField
                sx={{ mb: 1 }}
                type="text"
                variant="outlined"
                label="จำกัดจำนวนผู้สมัครต่อทีม"
                size="small"
                margin="dense"
                name="limit_per_team"
                fullWidth
                value={addFormik.values.limit_per_team}
                helperText={
                  addFormik.touched.limit_per_team && addFormik.errors.limit_per_team
                }
                onChange={addFormik.handleChange}
                onBlur={addFormik.handleBlur}
              />
              <FormControl sx={{ mb: 1 }} fullWidth>
                <TextField
                  sx={{ mb: 1 }}
                  type="text"
                  variant="outlined"
                  label="จำกัดจำนวนทีมต่อโรงเรียน"
                  size="small"
                  margin="dense"
                  name="limit_per_school"
                  value={addFormik.values.limit_per_school}
                  helperText={
                    addFormik.touched.limit_per_school &&
                    addFormik.errors.limit_per_school
                  }
                  onChange={addFormik.handleChange}
                  onBlur={addFormik.handleBlur}
                />
              </FormControl>
              <FormControl sx={{ mb: 1 }} fullWidth>
                <TextField
                  sx={{ mb: 1 }}
                  type="text"
                  variant="outlined"
                  label="จำกัดจำนวนทีมต่อโปรแกรมแข่งขัน"
                  size="small"
                  margin="dense"
                  name="limit_per_program"
                  value={addFormik.values.limit_per_program}
                  helperText={
                    addFormik.touched.limit_per_program &&
                    addFormik.errors.limit_per_program
                  }
                  onChange={addFormik.handleChange}
                  onBlur={addFormik.handleBlur}
                />
              </FormControl>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">รายละเอียดการแข่งขัน</Typography>
              <TextField
                type="datetime-local"
                variant="outlined"
                label="วันที่รับสมัคร"
                size="small"
                margin="dense"
                name="apply_from"
                fullWidth
                value={addFormik.values.apply_from}
                helperText={addFormik.touched.apply_from && addFormik.errors.apply_from}
                onChange={addFormik.handleChange}
              />
              <TextField
                type="datetime-local"
                variant="outlined"
                label="วันที่ปิดรับสมัคร"
                size="small"
                margin="dense"
                name="apply_to"
                fullWidth
                value={addFormik.values.apply_to}
                helperText={addFormik.touched.apply_to && addFormik.errors.apply_to}
                onChange={addFormik.handleChange}
              />
              <TextField
                type="datetime-local"
                variant="outlined"
                label="วันที่แข่งขัน"
                size="small"
                margin="dense"
                name="start_date"
                fullWidth
                value={addFormik.values.start_date}
                helperText={addFormik.touched.start_date && addFormik.errors.start_date}
                onChange={addFormik.handleChange}
              />
              <TextField
                type="datetime-local"
                variant="outlined"
                label="วันที่ประกาศผล"
                size="small"
                margin="dense"
                name="result_date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={addFormik.values.result_date}
                helperText={addFormik.touched.result_date && addFormik.errors.result_date}
                onChange={addFormik.handleChange}
              />
              <TextField
                type="text"
                variant="outlined"
                label="สถานที่/วิธีการแข่งขัน"
                size="small"
                margin="dense"
                multiline
                minRows={2}
                maxRows={4}
                name="location"
                fullWidth
                value={addFormik.values.location}
                helperText={addFormik.touched.location && addFormik.errors.location}
                onChange={addFormik.handleChange}
                onBlur={addFormik.handleBlur}
              />
            </Box>

            {/* manage coordinator */}
            <Box mb={2}>
              <Typography variant="subtitle1">ผู้ประสานงานการแข่งขัน</Typography>
              <TextField
                type="text"
                variant="outlined"
                size="small"
                margin="dense"
                placeholder="ชื่อ-นามสกุล"
                fullWidth
                inputRef={coordinatorNameRef}
              />
              <Button
                type="button"
                variant="contained"
                size="small"
                color="inherit"
                startIcon={<AddIcon />}
                fullWidth
                onClick={() => handleCoordinator('add')}
                sx={{ mt: 1 }}
              >
                เพิ่มรายชื่อ
              </Button>
              <Box sx={{ bgcolor: '', border: '1px dashed rgba(0, 0, 0, 0.5)', mt: 1 }}>
                {coordinatorList.length ? (
                  coordinatorList.map((row, index) => (
                    <Fragment key={index}>
                      <ListItem
                        key={index}
                        className="custom-space"
                        sx={{ bgcolor: 'action.hover' }}
                        secondaryAction={
                          <IconButton
                            onClick={() =>
                              handleCoordinator('update', row.coordinator_id)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          style={{ overflow: 'hidden' }}
                          secondary={row.coordinator_name}
                        />
                      </ListItem>
                    </Fragment>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText
                      style={{ overflow: 'hidden' }}
                      secondary={'ไม่ได้เพิ่มรายชื่อ'}
                    />
                  </ListItem>
                )}
              </Box>
            </Box>

            {/* manage document */}
            <Box sx={{ mt: 2 }}>
              <Box display="flex" flexDirection="column">
                <Stack flexDirection="row" alignItems="center">
                  <Box mr={2}>
                    <Typography variant="subtitle1">ไฟล์กิจกรรม</Typography>
                  </Box>
                  <div></div>
                </Stack>
                <Box>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    placeholder="คำอธิบาย"
                    fullWidth
                    inputRef={(element) => (documentRef.current[0] = element)}
                  />
                  <input
                    style={{ fontSize: 16, marginTop: 4, marginBottom: 8 }}
                    type="file"
                    accept="application/pdf"
                    ref={(element) => (documentRef.current[1] = element)}
                  />
                </Box>

                <Button
                  type="button"
                  variant="contained"
                  size="small"
                  color="inherit"
                  startIcon={<AddIcon />}
                  fullWidth
                  onClick={() => handleDocument('add')}
                >
                  เพิ่มไฟล์
                </Button>
                <Box sx={{ bgcolor: '', border: '1px dashed rgba(0, 0, 0, 0.5)', mt: 1 }}>
                  {documentList.length ? (
                    documentList.map((row, index) => {
                      return (
                        <ListItem
                          key={index}
                          className="custom-space"
                          sx={{ bgcolor: 'action.hover' }}
                          secondaryAction={
                            <IconButton
                              onClick={() => handleDocument('update', row.document_id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            style={{ overflow: 'hidden' }}
                            secondary={`${row.document_name} | ${row.document_src.name}`}
                          />
                        </ListItem>
                      );
                    })
                  ) : (
                    <ListItem>
                      <ListItemText
                        style={{ overflow: 'hidden' }}
                        secondary={'ไม่ได้เพิ่มไฟล์'}
                      />
                    </ListItem>
                  )}
                </Box>
              </Box>
            </Box>

            {/* manage link */}
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mt: 2 }}>
                <Stack flexDirection="row" alignItems="center">
                  <Box mr={2}>
                    <Typography variant="subtitle1">ลิ้งก์กิจกรรม </Typography>
                  </Box>
                </Stack>
                <Box>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    placeholder="คำอธิบาย"
                    fullWidth
                    inputRef={(element) => (linkRef.current[0] = element)}
                  />
                  <TextField
                    type="url"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    placeholder="ลิ้งก์ https://"
                    fullWidth
                    inputRef={(element) => (linkRef.current[1] = element)}
                  />
                </Box>
                <Button
                  type="button"
                  variant="contained"
                  size="small"
                  color="inherit"
                  startIcon={<AddIcon />}
                  fullWidth
                  onClick={() => handleLink('add')}
                >
                  เพิ่มลิ้งก์
                </Button>
                <Box sx={{ bgcolor: '', border: '1px dashed rgba(0, 0, 0, 0.5)', mt: 1 }}>
                  {linkList.length ? (
                    linkList.map((row, index) => {
                      return (
                        <ListItem
                          className="custom-space"
                          sx={{ bgcolor: 'action.hover' }}
                          key={index}
                          secondaryAction={
                            <IconButton onClick={() => handleLink('update', row.link_id)}>
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            style={{ overflow: 'hidden' }}
                            secondary={`${row.link_name} | ${row.link_src}`}
                          />
                        </ListItem>
                      );
                    })
                  ) : (
                    <ListItem>
                      <ListItemText
                        style={{ overflow: 'hidden' }}
                        secondary={'ไม่ได้เพิ่มลิ้งก์'}
                      />
                    </ListItem>
                  )}
                </Box>
              </Box>
            </Box>
            {/* end textfield */}
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={addProgramState.isFetching}
              >
                บันทึก
              </Button>
            </Stack>
          </form>
        </CustomDialog>

        {/* edit form section */}
        <CustomDialog
          title="แก้ไขโปรแกรมแข่งขัน"
          size="md"
          open={openEditDialog}
          onClose={handleCloseEditDialog}
        >
          <form onSubmit={editFormik.handleSubmit}>
            {/* start textfield */}
            <Box mb={2}>
              <Typography variant="subtitle1">เลือกกิจกรรม / ระดับการแข่งขัน</Typography>
              <FormControl fullWidth margin="dense" size="small">
                <Select
                  name="activity_id"
                  value={initialEditFormik.values.activity_id}
                  onChange={initialEditFormik.handleChange}
                >
                  {getActivityByAdminState.result?.data?.map((row, index) => (
                    <MenuItem key={index} value={row.activity_id}>
                      {row.activity_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="dense" size="small">
                <Select
                  name="activity_level_id"
                  value={initialEditFormik.values.activity_level_id}
                  onChange={initialEditFormik.handleChange}
                >
                  {getActivityLevelState.result?.data?.map((row, index) => (
                    <MenuItem key={index} value={row.activity_level_id}>
                      {row.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">ข้อจำกัด</Typography>
              <Alert sx={{ mb: 1 }} severity="info">
                0 = ไม่ระบุ
              </Alert>
              <TextField
                sx={{ mb: 1 }}
                type="text"
                variant="outlined"
                label="จำกัดอาจารย์ที่ปรึกษา"
                size="small"
                margin="dense"
                name="limit_per_advisor"
                fullWidth
                value={editFormik.values.limit_per_advisor}
                helperText={
                  editFormik.touched.limit_per_advisor &&
                  editFormik.errors.limit_per_advisor
                }
                onChange={editFormik.handleChange}
                onBlur={editFormik.handleBlur}
              />
              <TextField
                sx={{ mb: 1 }}
                type="text"
                variant="outlined"
                label="จำกัดจำนวนผู้สมัครต่อทีม"
                size="small"
                margin="dense"
                name="limit_per_team"
                fullWidth
                value={editFormik.values.limit_per_team}
                helperText={
                  editFormik.touched.limit_per_team && editFormik.errors.limit_per_team
                }
                onChange={editFormik.handleChange}
                onBlur={editFormik.handleBlur}
              />
              <FormControl sx={{ mb: 1 }} fullWidth>
                <TextField
                  sx={{ mb: 1 }}
                  type="text"
                  variant="outlined"
                  label="จำกัดจำนวนทีมต่อโรงเรียน"
                  size="small"
                  margin="dense"
                  name="limit_per_school"
                  value={editFormik.values.limit_per_school}
                  helperText={
                    editFormik.touched.limit_per_school &&
                    editFormik.errors.limit_per_school
                  }
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                />
              </FormControl>
              <FormControl sx={{ mb: 1 }} fullWidth>
                <TextField
                  sx={{ mb: 1 }}
                  type="text"
                  variant="outlined"
                  label="จำกัดจำนวนทีมต่อโปรแกรมแข่งขัน"
                  size="small"
                  margin="dense"
                  name="limit_per_program"
                  value={editFormik.values.limit_per_program}
                  helperText={
                    editFormik.touched.limit_per_program &&
                    editFormik.errors.limit_per_program
                  }
                  onChange={editFormik.handleChange}
                  onBlur={editFormik.handleBlur}
                />
              </FormControl>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle1">รายละเอียดการแข่งขัน</Typography>
              <TextField
                type="datetime-local"
                variant="outlined"
                label="วันที่รับสมัคร"
                size="small"
                margin="dense"
                name="apply_from"
                fullWidth
                value={editFormik.values.apply_from}
                helperText={editFormik.touched.apply_from && editFormik.errors.apply_from}
                onChange={editFormik.handleChange}
              />
              <TextField
                type="datetime-local"
                variant="outlined"
                label="วันที่ปิดรับสมัคร"
                size="small"
                margin="dense"
                name="apply_to"
                fullWidth
                value={editFormik.values.apply_to}
                helperText={editFormik.touched.apply_to && editFormik.errors.apply_to}
                onChange={editFormik.handleChange}
              />
              <TextField
                type="datetime-local"
                variant="outlined"
                label="วันที่แข่งขัน"
                size="small"
                margin="dense"
                name="start_date"
                fullWidth
                value={editFormik.values.start_date}
                helperText={editFormik.touched.start_date && editFormik.errors.start_date}
                onChange={editFormik.handleChange}
              />
              <TextField
                type="datetime-local"
                variant="outlined"
                label="วันที่ประกาศผล"
                size="small"
                margin="dense"
                name="result_date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={editFormik.values.result_date}
                helperText={
                  editFormik.touched.result_date && editFormik.errors.result_date
                }
                onChange={editFormik.handleChange}
              />
              <TextField
                type="text"
                variant="outlined"
                label="สถานที่/วิธีการแข่งขัน"
                size="small"
                margin="dense"
                multiline
                minRows={2}
                maxRows={4}
                name="location"
                fullWidth
                value={editFormik.values.location}
                helperText={editFormik.touched.location && editFormik.errors.location}
                onChange={editFormik.handleChange}
                onBlur={editFormik.handleBlur}
              />
            </Box>

            {/* manage coordinator */}
            <Box mb={2}>
              <Typography variant="subtitle1">ผู้ประสานงานการแข่งขัน</Typography>
              <TextField
                type="text"
                variant="outlined"
                size="small"
                margin="dense"
                placeholder="ชื่อ-นามสกุล"
                fullWidth
                inputRef={coordinatorNameRef}
              />
              <Button
                type="button"
                variant="contained"
                size="small"
                color="inherit"
                startIcon={<AddIcon />}
                fullWidth
                onClick={() => handleCoordinator('add')}
                sx={{ mt: 1 }}
              >
                เพิ่มรายชื่อ
              </Button>
              <Box sx={{ bgcolor: '', border: '1px dashed rgba(0, 0, 0, 0.5)', mt: 1 }}>
                {coordinatorList.length ? (
                  coordinatorList.map((row, index) => {
                    return (
                      <ListItem
                        key={index}
                        className="custom-space"
                        sx={{ bgcolor: 'action.hover' }}
                        secondaryAction={
                          <IconButton
                            onClick={() =>
                              handleCoordinator(
                                'update',
                                row.coordinator_id,
                                row.createdAt,
                                row.updatedAt
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          style={{ overflow: 'hidden' }}
                          secondary={row.coordinator_name}
                        />
                      </ListItem>
                    );
                  })
                ) : (
                  <ListItem>
                    <ListItemText
                      style={{ overflow: 'hidden' }}
                      secondary={'ไม่ได้รายชื่อ'}
                    />
                  </ListItem>
                )}
              </Box>
            </Box>

            {/* manage document */}
            <Box sx={{ mt: 2 }}>
              <Box display="flex" flexDirection="column">
                <Stack flexDirection="row" alignItems="center">
                  <Box mr={2}>
                    <Typography variant="subtitle1">ไฟล์กิจกรรม</Typography>
                  </Box>
                  <div></div>
                </Stack>
                <Box>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    placeholder="คำอธิบาย"
                    fullWidth
                    inputRef={(element) => (documentRef.current[0] = element)}
                  />
                  <input
                    style={{ fontSize: 16, marginTop: 4, marginBottom: 8 }}
                    type="file"
                    accept="application/pdf"
                    ref={(element) => (documentRef.current[1] = element)}
                  />
                </Box>

                <Button
                  type="button"
                  variant="contained"
                  size="small"
                  color="inherit"
                  startIcon={<AddIcon />}
                  fullWidth
                  onClick={() => handleDocument('add')}
                >
                  เพิ่มไฟล์
                </Button>
                <Box sx={{ bgcolor: '', border: '1px dashed rgba(0, 0, 0, 0.5)', mt: 1 }}>
                  {documentList.length ? (
                    documentList.map((row, index) => {
                      return (
                        <ListItem
                          key={index}
                          className="custom-space"
                          sx={{ bgcolor: 'action.hover' }}
                          secondaryAction={
                            <IconButton
                              onClick={() =>
                                handleDocument(
                                  'update',
                                  row.document_id,
                                  row.createdAt,
                                  row.updatedAt
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            style={{ overflow: 'hidden' }}
                            secondary={`${row.document_name} | ${
                              row.document_src?.name ?? row.document_src
                            }`}
                          />
                        </ListItem>
                      );
                    })
                  ) : (
                    <ListItem>
                      <ListItemText
                        style={{ overflow: 'hidden' }}
                        secondary={'ไม่ได้เพิ่มไฟล์'}
                      />
                    </ListItem>
                  )}
                </Box>
              </Box>
            </Box>

            {/* manage link */}
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mt: 2 }}>
                <Stack flexDirection="row" alignItems="center">
                  <Box mr={2}>
                    <Typography variant="subtitle1">ลิ้งก์กิจกรรม</Typography>
                  </Box>
                </Stack>
                <Box>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    placeholder="คำอธิบาย"
                    fullWidth
                    inputRef={(element) => (linkRef.current[0] = element)}
                  />
                  <TextField
                    type="url"
                    variant="outlined"
                    size="small"
                    margin="dense"
                    placeholder="ลิ้งก์ https://"
                    fullWidth
                    inputRef={(element) => (linkRef.current[1] = element)}
                  />
                </Box>
                <Button
                  type="button"
                  variant="contained"
                  size="small"
                  color="inherit"
                  startIcon={<AddIcon />}
                  fullWidth
                  onClick={() => handleLink('add')}
                >
                  เพิ่มลิ้งก์
                </Button>
                <Box sx={{ bgcolor: '', border: '1px dashed rgba(0, 0, 0, 0.5)', mt: 1 }}>
                  {linkList.length ? (
                    linkList.map((row, index) => {
                      return (
                        <ListItem
                          className="custom-space"
                          sx={{ bgcolor: 'action.hover' }}
                          key={index}
                          secondaryAction={
                            <IconButton
                              onClick={() =>
                                handleLink(
                                  'update',
                                  row.link_id,
                                  row.createdAt,
                                  row.updatedAt
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            style={{ overflow: 'hidden' }}
                            secondary={`${row.link_name} | ${row.link_src}`}
                          />
                        </ListItem>
                      );
                    })
                  ) : (
                    <ListItem>
                      <ListItemText
                        style={{ overflow: 'hidden' }}
                        secondary={'ไม่ได้เพิ่มลิ้งก์'}
                      />
                    </ListItem>
                  )}
                </Box>
              </Box>
            </Box>
            {/* end textfield */}
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={updateProgramState.isFetching}
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

export default Program;
