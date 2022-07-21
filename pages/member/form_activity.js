import React, { useState, useEffect, Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useUser from 'hoc/useUser';
import { useFormik } from 'formik';
import MainLayout from 'templates/MainLayout/Index';
import SubNavbar from 'templates/MainLayout/SubNavbar';
import Loading from 'components/Loading';
import { mainMenu } from 'utils/configMenu';
import Typography from '@mui/material/Typography';
import actions from 'redux/actions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const FormActivity = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  // form ref
  const formRef = useRef([]);

  // initial state
  useEffect(() => {
    dispatch(actions.getMemberByIdRequest(user?.id));
    dispatch(actions.getFormActivityByMemberIdRequest(user?.id));
  }, [router, user]);

  // global state
  const profile = useSelector(({ getMemberByIdReducer }) => getMemberByIdReducer);
  const addFormActivityResponseState = useSelector(
    ({ addFormActivityResponseReducer }) => addFormActivityResponseReducer
  );
  const getFormActivityByMemberIdState = useSelector(
    ({ getFormActivityByMemberIdReducer }) => getFormActivityByMemberIdReducer
  );

  // state
  const [formActivity, setFormActivity] = useState({ activity_id: '', activity_name: '' });
  const [formResponses, setFormResponses] = useState([]);

  // tabs
  const [tabPanel, setTabPanel] = useState('1');
  // handle change tab
  const handleChangeTab = (event, newTab) => {
    setTabPanel(newTab);
  };

  // formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    validate: () => {
      const errors = {};
      return errors;
    },
    onSubmit: () => {
      const responseList = [];
      for (let i = 0; i < formRef.current.length; i++) {
        const input = formRef.current[i].type;
        // for input type text, textarea
        if (input === 'text' || input === 'textarea') {
          responseList.push({
            form_activity_id: formRef.current[i].id,
            response: formRef.current[i].value.trim() || '-',
          });
        } else {
          // for input type radio
          for (let j = 0; j < formRef.current[i].children.length; j++) {
            if (formRef.current[i].children[j].control.checked) {
              responseList.push({
                form_activity_id: formRef.current[i].children[j].id,
                response: formRef.current[i].children[j].control.value || '-',
              });
            }
          }
        }
      }
      // create data
      const data = {
        member_id: user?.id,
        form_activity_id: formActivity.activity_id,
        response_list: responseList,
      };
      dispatch(actions.addFormActivityResponseRequest(data));
      setTabPanel('1');
    },
  });

  // protected
  if (user?.auth0) {
    return (
      <MainLayout menu={mainMenu}>
        <SubNavbar profile={profile}>
          <Box mb={3}>
            <Typography variant="h6">ทำแบบสอบถามกิจกรรม</Typography>
          </Box>
          <TabContext value={tabPanel}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChangeTab} aria-label="tabs">
                <Tab label="เลือกแบบฟอร์ม" value="1" />
                <Tab label="ฟอร์ม" value="2" disabled={!formResponses.length} />
              </TabList>
            </Box>
            <TabPanel value="1">
              {getFormActivityByMemberIdState.isFetching ? (
                <Loading />
              ) : (
                <Fragment>
                  {getFormActivityByMemberIdState.result?.data?.map((row, index) => (
                    <List key={row.activity_id}>
                      <ListItem
                        onClick={() => {
                          setFormActivity({
                            activity_id: row.activity_id,
                            activity_name: row.activity_name,
                          });
                          setFormResponses(row.form_activities);
                          setTabPanel('2');
                        }}
                        disablePadding
                        sx={{ background: 'white', border: '1px solid #ddd' }}
                      >
                        <ListItemButton>
                          <ListItemText primary={row.activity_name} />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  ))}
                </Fragment>
              )}
            </TabPanel>
            <TabPanel value="2">
              {false ? (
                <Loading />
              ) : (
                <Fragment>
                  <Typography variant="h6" my={1}>
                    {formActivity.activity_name ? formActivity.activity_name : ''}
                  </Typography>
                  <form onSubmit={formik.handleSubmit}>
                    {formResponses?.map((row, index) => (
                      <Card key={index} sx={{ mb: 2, p: 2 }}>
                        <Typography variant="subtitle1">{row.name}</Typography>
                        {row.type == 1 ? (
                          <>
                            <TextField
                              type="text"
                              variant="outlined"
                              label="คำตอบของคุณ"
                              size="small"
                              margin="dense"
                              fullWidth
                              required={row.required ? true : false}
                              inputRef={(element) => (formRef.current[index] = element)}
                              inputProps={{
                                id: row.form_activity_id,
                              }}
                            />
                          </>
                        ) : row.type == 2 ? (
                          <>
                            <FormControl>
                              <RadioGroup ref={(element) => (formRef.current[index] = element)}>
                                {row.form_activity_radioes.map((row, key) => (
                                  <FormControlLabel
                                    id={row.form_activity_id}
                                    key={key}
                                    value={row.name}
                                    control={
                                      <Radio
                                        required={row.form_science_day?.required ? true : false}
                                      />
                                    }
                                    label={row.name}
                                  />
                                ))}
                              </RadioGroup>
                            </FormControl>
                          </>
                        ) : row.type == 3 ? (
                          <>
                            <TextField
                              type="text"
                              variant="outlined"
                              label="คำตอบของคุณ"
                              size="small"
                              margin="dense"
                              name="address"
                              multiline
                              minRows={2}
                              maxRows={3}
                              fullWidth
                              required={row.required ? true : false}
                              inputRef={(element) => (formRef.current[index] = element)}
                              inputProps={{
                                id: row.form_activity_id,
                              }}
                            />
                          </>
                        ) : (
                          <></>
                        )}
                      </Card>
                    ))}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={addFormActivityResponseState.isFetching}
                    >
                      ส่ง
                    </Button>
                  </form>
                </Fragment>
              )}
            </TabPanel>
          </TabContext>
        </SubNavbar>
      </MainLayout>
    );
  }
  return <></>;
};

export default FormActivity;
