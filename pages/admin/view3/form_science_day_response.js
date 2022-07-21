import React, { Fragment, useState, useEffect, useMemo } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import { menu3 } from 'utils/configMenu';
import { Chart } from 'react-google-charts';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
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

  // initial state
  useEffect(() => {
    // actions
    dispatch(actions.getAdminByIdRequest(user?.id));
    dispatch(actions.getFormScienceDayResponseRequest());
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const getFormScienceDayResponseState = useSelector(
    ({ getFormScienceDayResponseReducer }) => getFormScienceDayResponseReducer
  );

  // watch for map reports
  const [reportList, setReportList] = useState([]);
  useMemo(async () => {
    return new Promise((resolve, reject) => {
      try {
        var data = [];
        if (getFormScienceDayResponseState?.result) {
          const rows = getFormScienceDayResponseState?.result?.data?.rows;
          const reports = getFormScienceDayResponseState?.result?.data?.reports;
          for (let i = 0; i < rows.length; i++) {
            const type = rows[i].type;
            if (type == 1 || type == 3) {
              data.push({
                form_science_day_id: rows[i].form_science_day_id,
                no: rows[i].no,
                type: rows[i].type,
                name: rows[i].name,
                required: rows[i].required,
                createdAt: rows[i].createdAt,
                updatedAt: rows[i].updatedAt,
                count_all: rows[i].form_science_day_responses.length,
                form_science_day_responses: rows[i].form_science_day_responses,
              });
            } else if (type == 2) {
              const objData = [];
              objData.push(['question', 'answer']);
              for (let j = 0; j < reports[i].form_science_day_responses.length; j++) {
                objData.push([
                  reports[i].form_science_day_responses[j].response,
                  reports[i].form_science_day_responses[j].count,
                ]);
              }
              data.push({
                form_science_day_id: rows[i].form_science_day_id,
                no: rows[i].no,
                type: rows[i].type,
                name: rows[i].name,
                required: rows[i].required,
                createdAt: rows[i].createdAt,
                updatedAt: rows[i].updatedAt,
                count_all: rows[i].form_science_day_responses.length,
                form_science_day_responses: objData,
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
  }, [router, user, getFormScienceDayResponseState]);

  // protected
  if (user?.auth3) {
    return (
      <AdminLayout menu={menu3} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Typography variant="h6">การตอบกลับแบบสอบถามวันวิทย์</Typography>
            </Stack>
          </Stack>
          {getFormScienceDayResponseState.isFetching ? <Loading /> : <></>}
          {reportList?.length != 0 && (
            <Fragment>
              <Typography mt={2} mb={1} variant="subtitle1">
                คำตอบทั้งหมด {getFormScienceDayResponseState?.result?.data?.form_responses ?? '0'}{' '}
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
                          {row.form_science_day_responses?.map((row, index) => (
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
                            data={row?.form_science_day_responses}
                            options={{ title: '' }}
                            width={'100%'}
                            height={'300px'}
                          />
                        </>
                      ) : row.type == 3 ? (
                        <>
                          {row.form_science_day_responses?.map((row, index) => (
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
        </Box>
      </AdminLayout>
    );
  }
  return <></>;
};

export default FormActivityResponse;
