import React, { Fragment, useState, useMemo, useEffect, useRef } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import CustomDialog from 'components/CustomDialog';
import { menu3 } from 'utils/configMenu';
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
import AddIcon from '@mui/icons-material/Add';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';

const FormScienceDay = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();

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

    setRadioInput([{ form_science_day_radio_id: uuidv4(), name: '' }]);

    // actions
    dispatch(actions.getActivityRequest());
    dispatch(actions.getFormScienceDayRequest());
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);

  // form science day state
  const addFormScienceDayState = useSelector(
    ({ addFormScienceDayReducer }) => addFormScienceDayReducer
  );
  const getFormScienceDayState = useSelector(
    ({ getFormScienceDayReducer }) => getFormScienceDayReducer
  );
  const updateFormScienceDayState = useSelector(
    ({ updateFormScienceDayReducer }) => updateFormScienceDayReducer
  );

  // set form science day max no
  const formActivityMaxNo = useMemo(() => {
    const formMaxNoList = getFormScienceDayState.result?.data?.length + 1;
    return formMaxNoList;
  }, [getFormScienceDayState]);

  // START ADD SECTION //
  // initial form science day
  const [initialFormScienceDay, setInitialFormScienceDay] = useState({
    form_science_day_id: '',
    no: '',
    type: '',
    name: '',
    required: true,
    form_science_day_radioes: [],
  });

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
    enableReinitialize: true,
    initialValues: {
      no: formActivityMaxNo,
      type: '1',
      name: '',
      required: true,
    },
    validate: (values) => {
      const errors = {};
      if (!values.no) {
        errors.no = 'จำเป็นต้องใช้';
      }
      if (!values.name) {
        errors.name = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: async (values) => {
      // for type radio
      var radioList = [];
      if (values.type == 2) {
        for await (const [i] of radioInputRef.current.entries()) {
          if (radioInputRef.current[i] === null || radioInputRef.current[i].value.trim() === '') {
            continue;
          }
          radioList.push({ name: radioInputRef.current[i].value.trim() });
        }
      }
      const data = {
        no: values.no,
        type: values.type,
        name: values.name,
        require: values.required,
        radio_list: radioList,
      };
      dispatch(actions.addFormScienceDayRequest(data));
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
    setOpenEditDialog(false);
    editFormik.setErrors({});
    editFormik.setTouched({});
  };

  // edit formik
  const editFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      no: initialFormScienceDay.no,
      name: initialFormScienceDay.name,
      type: initialFormScienceDay.type,
      required: initialFormScienceDay.required,
    },
    validate: (values) => {
      const errors = {};
      if (!values.no) {
        errors.no = 'จำเป็นต้องใช้';
      }
      if (!values.name) {
        errors.name = 'จำเป็นต้องใช้';
      }
      return errors;
    },
    onSubmit: async (values) => {
      // for type radio
      var data = {};
      var createRadioList = [];
      var updateeRadioList = [];
      if (values.type == 2) {
        for await (const [i] of radioInputRef.current.entries()) {
          if (radioInputRef.current[i] === null || radioInputRef.current[i].value.trim() === '') {
            continue;
          }
          // check create mode or update mode
          if (radioInputRef.current[i].name === 'create') {
            createRadioList.push({ name: radioInputRef.current[i].value.trim() });
          } else if (radioInputRef.current[i].name === 'update') {
            updateeRadioList.push({
              form_science_day_radio_id: radioInputRef.current[i].id,
              name: radioInputRef.current[i].value.trim(),
            });
          }
        }
      }
      data = {
        id: initialFormScienceDay.form_science_day_id,
        no: values.no,
        type: values.type,
        name: values.name,
        required: values.required,
        create_radio_list: createRadioList,
        update_radio_list: updateeRadioList,
        delete_radio_list: deleteRadioList,
      };
      // switch form type 2 (radio) to type 1 or 3
      if (initialFormScienceDay.type == 2 && (values.type == 1 || values.type == 3)) {
        // save id to delete
        var arr = [];
        for await (const [i] of radioInput.entries()) {
          arr.push({ form_science_day_radio_id: radioInput[i].form_science_day_radio_id });
        }
        data.delete_radio_list = arr;
      }
      dispatch(actions.updateFormScienceDayRequest(data));
    },
  });
  // END EDIT SECTION //

  // handle radio options
  const [radioInput, setRadioInput] = useState([{ form_science_day_radio_id: uuidv4(), name: '' }]);
  const [deleteRadioList, setDeleteRadioList] = useState([]);
  const radioInputRef = useRef([]);

  const handleRadioInput = (action, form_science_day_radio_id, createdAt, updatedAt) => {
    if (action === 'add') {
      setRadioInput([...radioInput, { form_science_day_radio_id: uuidv4() }]);
    } else if (action === 'remove') {
      if (radioInput.length > 1) {
        confirm({ description: 'ต้องการยืนยันรายชื่ออาจารย์ที่ปรึกษาหรือไม่?' }).then(() => {
          // save id to delete in the db
          if (createdAt && updatedAt) {
            setDeleteRadioList([
              ...deleteRadioList,
              { form_science_day_radio_id: form_science_day_radio_id },
            ]);
          }
          // filter and remove
          let filter = radioInput.filter((row) => {
            return row.form_science_day_radio_id != form_science_day_radio_id;
          });
          setRadioInput(filter);
        });
      }
    }
  };

  // protected
  if (user?.auth3) {
    return (
      <AdminLayout menu={menu3} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Box display="flex">
                <Typography variant="h6" mr={1}>
                  จัดการแบบสอบถามวันวิทย์
                </Typography>
                <Button
                  type="button"
                  variant="contained"
                  size="small"
                  onClick={handleOpenAddDialog}
                >
                  เพิ่มแบบสอบถามวันวิทย์
                </Button>
              </Box>
            </Stack>
          </Stack>

          {getFormScienceDayState.isFetching ? (
            <Loading />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>ลำดับ</TableCell>
                    <TableCell>รูปแบบ</TableCell>
                    <TableCell>ตัวอย่างคำถาม</TableCell>
                    <TableCell>ตั้งค่า</TableCell>
                    <TableCell>แก้ไข</TableCell>
                    <TableCell>ลบ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getFormScienceDayState?.result?.data?.map((row, index) => (
                    <Fragment key={index}>
                      <TableRow sx={{ verticalAlign: 'top' }}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.no}</TableCell>
                        <TableCell>
                          {row.type == 1
                            ? 'Text'
                            : row.type == 2
                            ? 'Radio'
                            : row.type == 3
                            ? 'Textarea'
                            : ''}
                        </TableCell>
                        <TableCell>
                          {row.type == 1 ? (
                            <Box>
                              <Typography sx={{ mr: 1 }} variant="body1">
                                {row.name}
                              </Typography>
                              <input type="text" disabled />
                            </Box>
                          ) : row.type == 2 ? (
                            <>
                              <Typography sx={{ mr: 1 }} variant="body1">
                                {row.name}
                              </Typography>
                              {row?.form_science_day_radioes?.map((row, index) => (
                                <Box key={index} display="flex" alignItems="center">
                                  <input type="radio" disabled />
                                  <label>{row.name}</label>
                                </Box>
                              ))}
                            </>
                          ) : row.type == 3 ? (
                            <Box>
                              <Typography sx={{ mr: 1 }} variant="body1">
                                {row.name}
                              </Typography>
                              <textarea rows="3" disabled />
                            </Box>
                          ) : (
                            <></>
                          )}
                        </TableCell>
                        <TableCell>{row.required ? 'จำเป็น' : '-'}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={() => {
                              setInitialFormScienceDay({
                                form_science_day_id: row.form_science_day_id,
                                no: row.no,
                                type: row.type,
                                name: row.name,
                                required: Boolean(row.required),
                              });
                              if (row?.form_science_day_radioes?.length) {
                                setRadioInput(row.form_science_day_radioes);
                              }
                              handleOpenEditDialog();
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            component="span"
                            onClick={() => {
                              confirm({
                                description: 'ต้องการยืนยันการลบแบบสอบถามวันวิทย์หรือไม่?',
                              }).then(() => {
                                dispatch(
                                  actions.deleteFormScienceDayRequest(row.form_science_day_id)
                                );
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
        <CustomDialog
          title="เพิ่มแบบสอบถามวันวิทย์"
          open={openAddDialog}
          onClose={handleCloseAddDialog}
        >
          <form onSubmit={addFormik.handleSubmit}>
            <TextField
              type="number"
              variant="outlined"
              label="ลำดับ"
              size="small"
              margin="dense"
              name="no"
              fullWidth
              value={addFormik.values.no}
              helperText={addFormik.touched.no && addFormik.errors.no}
              onChange={addFormik.handleChange}
            />
            <FormControl sx={{ mt: 1, width: '100%' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <div>
                  <Typography variant="subtitle1">รูปแบบ</Typography>
                  <RadioGroup
                    row
                    name="type"
                    value={addFormik.values.type}
                    onChange={addFormik.handleChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Text" />
                    <FormControlLabel value="2" control={<Radio />} label="Radio" />
                    <FormControlLabel value="3" control={<Radio />} label="Textarea" />
                  </RadioGroup>
                </div>
                <div>
                  <Typography variant="subtitle1">ตั้งค่า</Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        name="required"
                        checked={addFormik.values.required}
                        onChange={addFormik.handleChange}
                      />
                    }
                    label="จำเป็น"
                  />
                </div>
              </Box>
            </FormControl>
            <TextField
              type="text"
              variant="outlined"
              label="คำถาม"
              size="small"
              margin="dense"
              name="name"
              fullWidth
              value={addFormik.values.name}
              helperText={addFormik.touched.name && addFormik.errors.name}
              onChange={addFormik.handleChange}
            />
            {addFormik.values.type == 2 && (
              <>
                <Stack flexDirection="row" alignItems="center">
                  <div>
                    <Typography variant="subtitle1">ตัวเลือก</Typography>
                  </div>
                  <div>
                    <Button
                      onClick={() => handleRadioInput('add')}
                      sx={{ mx: 1 }}
                      variant="text"
                      endIcon={<AddIcon />}
                    >
                      เพิ่มตัวเลือก
                    </Button>
                  </div>
                </Stack>
                {radioInput?.map((row, index) => (
                  <Stack
                    key={row.form_science_day_radio_id}
                    flexDirection="row"
                    alignItems="center"
                  >
                    <TextField
                      type="text"
                      variant="outlined"
                      label="ชื่อตัวเลือก"
                      size="small"
                      margin="dense"
                      fullWidth
                      required
                      inputRef={(element) => (radioInputRef.current[index] = element)}
                    />
                    <IconButton
                      sx={{ ml: 1 }}
                      onClick={() => handleRadioInput('remove', row.form_science_day_radio_id)}
                    >
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </Stack>
                ))}
              </>
            )}
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={addFormScienceDayState.isFetching}
              >
                บันทึก
              </Button>
            </Stack>
          </form>
        </CustomDialog>

        {/* edit form section */}
        <CustomDialog
          title={'แก้ไขแบบสอบถามวันวิทย์'}
          open={openEditDialog}
          onClose={handleCloseEditDialog}
        >
          <form onSubmit={editFormik.handleSubmit}>
            <TextField
              type="number"
              variant="outlined"
              label="ลำดับ"
              size="small"
              margin="dense"
              name="no"
              fullWidth
              value={editFormik.values.no}
              helperText={editFormik.touched.no && editFormik.errors.no}
              onChange={editFormik.handleChange}
            />
            <FormControl sx={{ mt: 1, width: '100%' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <div>
                  <Typography variant="subtitle1">รูปแบบ</Typography>
                  <RadioGroup
                    row
                    name="type"
                    value={editFormik.values.type}
                    onChange={editFormik.handleChange}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Text" />
                    <FormControlLabel value="2" control={<Radio />} label="Radio" />
                    <FormControlLabel value="3" control={<Radio />} label="Textarea" />
                  </RadioGroup>
                </div>
                <div>
                  <Typography variant="subtitle1">ตั้งค่า</Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        name="required"
                        checked={editFormik.values.required}
                        onChange={editFormik.handleChange}
                      />
                    }
                    label="จำเป็น"
                  />
                </div>
              </Box>
            </FormControl>
            <TextField
              type="text"
              variant="outlined"
              label="คำถาม"
              size="small"
              margin="dense"
              name="name"
              fullWidth
              value={editFormik.values.name}
              helperText={editFormik.touched.name && editFormik.errors.name}
              onChange={editFormik.handleChange}
            />
            {editFormik.values.type == 2 && (
              <>
                <Stack flexDirection="row" alignItems="center">
                  <div>
                    <Typography variant="subtitle1">ตัวเลือก</Typography>
                  </div>
                  <div>
                    <Button
                      onClick={() => handleRadioInput('add')}
                      sx={{ mx: 1 }}
                      variant="text"
                      endIcon={<AddIcon />}
                    >
                      เพิ่มตัวเลือก
                    </Button>
                  </div>
                </Stack>
                {radioInput?.map((row, index) => (
                  <Stack
                    key={row.form_science_day_radio_id}
                    flexDirection="row"
                    alignItems="center"
                  >
                    <TextField
                      type="text"
                      variant="outlined"
                      label="ชื่อตัวเลือก"
                      size="small"
                      margin="dense"
                      defaultValue={row.name}
                      fullWidth
                      required
                      inputRef={(element) => (radioInputRef.current[index] = element)}
                      inputProps={{
                        id: row.form_science_day_radio_id,
                        name: row.createdAt && row.updatedAt ? 'update' : 'create',
                      }}
                    />
                    <IconButton
                      sx={{ ml: 1 }}
                      onClick={() =>
                        handleRadioInput(
                          'remove',
                          row.form_science_day_radio_id,
                          row.createdAt,
                          row.updatedAt
                        )
                      }
                    >
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </Stack>
                ))}
              </>
            )}
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={updateFormScienceDayState.isFetching}
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

export default FormScienceDay;
