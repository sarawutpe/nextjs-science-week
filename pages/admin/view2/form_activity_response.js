import React, { Fragment, useState, useEffect, useMemo } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import { menu2 } from 'utils/configMenu';
import { Chart } from 'react-google-charts';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const FormActivityResponse = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  // activity id
  const [activityId, setActivityId] = useState('');

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    // actions
    if (activityId) {
      dispatch(actions.getFormActivityResponseByActivityIdRequest(activityId));
    } else {
      dispatch(actions.getActivityByAdminIdRequest({ id: user?.id }));
    }
    // default tab
    setTabPanel('1');
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const getActivityByAdminIdState = useSelector(
    ({ getActivityByAdminIdReducer }) => getActivityByAdminIdReducer
  );
  const getFormActivityResponseByActivityIdState = useSelector(
    ({ getFormActivityResponseByActivityIdReducer }) => getFormActivityResponseByActivityIdReducer
  );

  // watch for map reports
  const [reportList, setReportList] = useState([]);
  useMemo(async () => {
    return new Promise((resolve, reject) => {
      try {
        var data = [];
        if (getFormActivityResponseByActivityIdState?.result) {
          const rows = getFormActivityResponseByActivityIdState?.result?.data?.rows[0]?.form_activities;
          const reports = getFormActivityResponseByActivityIdState?.result?.data?.reports[0]?.form_activities;
          for (let i = 0; i < rows.length; i++) {
            const type = rows[i].type;
            if (type == 1 || type == 3) {
              data.push({
                form_activity_id: rows[i].form_activity_id,
                activity_id: rows[i].activity_id,
                no: rows[i].no,
                type: rows[i].type,
                name: rows[i].name,
                required: rows[i].required,
                createdAt: rows[i].createdAt,
                updatedAt: rows[i].updatedAt,
                count_all: rows[i].form_activity_responses.length,
                form_activity_responses: rows[i].form_activity_responses,
              });
            } else if (type == 2) {
              const objData = [];
              objData.push(['question', 'answer']);
              for (let j = 0; j < reports[i].form_activity_responses.length; j++) {
                objData.push([
                  reports[i].form_activity_responses[j].response,
                  reports[i].form_activity_responses[j].count,
                ]);
              }
              data.push({
                form_activity_id: rows[i].form_activity_id,
                activity_id: rows[i].activity_id,
                no: rows[i].no,
                type: rows[i].type,
                name: rows[i].name,
                required: rows[i].required,
                createdAt: rows[i].createdAt,
                updatedAt: rows[i].updatedAt,
                count_all: rows[i].form_activity_responses.length,
                form_activity_responses: objData,
              });
            } else {
              break;
            }
            // next
            resolve();
          }
          setReportList(data);
        }
      } catch (error) {
        reject();
      }
    });
  }, [router, user, getFormActivityResponseByActivityIdState]);

  // tabs
  const [tabPanel, setTabPanel] = useState('1');
  // handle change tab
  const handleChangeTab = (event, newTab) => {
    setTabPanel(newTab);
  };

  // protected
  if (user?.auth2) {
    return (
      <AdminLayout menu={menu2} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Typography variant="h6">การตอบกลับแบบสอบถามกิจกรรม</Typography>
            </Stack>
          </Stack>
          <TabContext value={tabPanel}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChangeTab} aria-label="tabs">
                <Tab label="เลือกแบบฟอร์ม" value="1" />
                <Tab
                  label="คำถาม"
                  value="2"
                  disabled={!getFormActivityResponseByActivityIdState?.result}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              {getActivityByAdminIdState.isFetching ? (
                <Loading />
              ) : (
                <Fragment>
                  {getActivityByAdminIdState.result?.data?.map((row, index) => (
                    <List key={index}>
                      <ListItem
                        onClick={() => {
                          setActivityId(row.activity_id);
                          dispatch(
                            actions.getFormActivityResponseByActivityIdRequest(row.activity_id)
                          );
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
              {getFormActivityResponseByActivityIdState.isFetching ? <Loading /> : <></>}
              {reportList?.length != 0 && (
                <Fragment>
                  <Typography mt={2} mb={1} variant="h6">
                    {getFormActivityResponseByActivityIdState?.result?.data?.rows[0]
                      ?.activity_name ?? ''}
                  </Typography>
                  <Typography mt={2} mb={1} variant="subtitle1">
                    คำตอบทั้งหมด{' '}
                    {getFormActivityResponseByActivityIdState?.result?.data?.form_responses ?? '0'}{' '}
                    ข้อ
                  </Typography>
                  {reportList?.map((row, index) => (
                    <Card key={index} sx={{ my: 2 }}>
                      <CardContent>
                        <Typography variant="body1">{row.name}</Typography>
                        <Typography variant="subtitle2">คำตอบ {row?.count_all ?? 0} ข้อ</Typography>
                        <div>
                          {row.type == 1 ? (
                            <>
                              {row.form_activity_responses?.map((row, index) => (
                                <>
                                  <Box key={index}>
                                    <List sx={{ bgcolor: 'background.paper' }}>
                                      <ListItem sx={{ bgcolor: 'action.hover' }}>
                                        <ListItemText primary={row.response} />
                                      </ListItem>
                                    </List>
                                  </Box>
                                </>
                              ))}
                            </>
                          ) : row.type == 2 ? (
                            <>
                              <Chart
                                key={index}
                                chartType="PieChart"
                                data={row?.form_activity_responses}
                                options={{ title: '' }}
                                width={'100%'}
                                height={'300px'}
                              />
                            </>
                          ) : row.type == 3 ? (
                            <>
                              {row.form_activity_responses?.map((row, index) => (
                                <List key={index} sx={{ bgcolor: 'background.paper' }}>
                                  <ListItem sx={{ bgcolor: 'action.hover' }}>
                                    <ListItemText primary={row.response} />
                                  </ListItem>
                                </List>
                              ))}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </Fragment>
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </AdminLayout>
    );
  }
  return <></>;
};

export default FormActivityResponse;
