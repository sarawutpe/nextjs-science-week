import React, { Fragment, useEffect, useMemo } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
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
import Button from '@mui/material/Button';

const Participant = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    dispatch(actions.getReportParticipantByAdminIdRequest(user?.id));
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const getReportParticipantByAdminIdState = useSelector(
    ({ getReportParticipantByAdminIdReducer }) => getReportParticipantByAdminIdReducer
  );

  // generate pdf memo
  const generatePDFMemo = useMemo(() => {
    let body = [];
    let data = getReportParticipantByAdminIdState.result?.data?.rows;
    // map array
    if (data?.length) {
      getReportParticipantByAdminIdState.result?.data?.rows?.map((row) => {
        body.push([
          {
            text: `${row?.activity_name ?? ''}`,
            colSpan: 6,
            margin: [0, 5],
            border: [false, true, false, false],
            fillColor: '#eeeeee',
          },
          {},
          {},
          {},
          {},
          {},
        ]);
        body.push([
          '#',
          'ระดับกิจกรรม',
          'ลำดับ',
          'รายชื่ออาจารย์ที่ปรึกษา',
          'รายชื่อผู้สมัคร',
          'สถานะเข้าร่วม',
        ]);
        row.programs?.map((row, index) => {
          if (index == 0 || row.competitions?.length == 1) {
            body.push([
              { text: `${index + 1}` },
              { text: `${row.activity_level?.name}` },
              { text: '1' },
              {
                text:
                  row.competitions[0]?.advisors?.map((row) => row.advisor_name + '\n').join('') ??
                  '',
              },
              {
                text:
                  row.competitions[0]?.participants
                    ?.map((row) => row.participant_name + '\n')
                    .join('') ?? '',
              },
              {
                text:
                  row.competitions[0]?.participants
                    ?.map((row) => (row.participant_active ? 'เข้าร่วม\n' : '-\n'))
                    .join('') ?? '',
              },
            ]);
          } else {
            body.push([
              { text: `${index + 1}`, rowSpan: row.competitions.length + 1 },
              {
                text: `${row.activity_level?.name}`,
                rowSpan: row.competitions.length + 1,
              },
              {},
              {},
              {},
              {},
            ]);
          }
          for (let index = 1; index < row.competitions?.length; index++) {
            body.push([
              '',
              '',
              `${index + 1}`,
              `${row.competitions[index]?.advisors?.map((row) => row.advisor_name + '\n').join('')}`,
              `${row.competitions[index]?.participants?.map((row) => row.participant_name + '\n').join('')}`,
              `${row.competitions[index]?.participants
                ?.map((row) => (row.participant_active ? 'เข้าร่วม\n' : '-\n'))
                .join('')}`,
            ]);
          }
        });
      });
    }
    return body;
  }, [router, getReportParticipantByAdminIdState]);

  // doc definition
  const docDefinition = {
    header: { text: formatter.momentShort(), margin: [10, 5] },
    content: [
      { text: 'รายงานรายชื่อผู้มาร่วมกิจกรรม', style: 'header' },
      { text: '\n' },
      {
        layout: 'lightHorizontalLines',
        table: {
          widths: ['*', '*'],
          body: [
            ['รายละเอียด', 'จำนวน'],
            [
              'จำนวนผู้สมัครเข้าร่วมกิจกรรม',
              `${getReportParticipantByAdminIdState.result?.data?.count_all ?? ''}`,
            ],
            [
              'จำนวนผู้มาร่วมกิจกรรม',
              `${getReportParticipantByAdminIdState.result?.data?.count ?? ''}`,
            ],
          ],
        },
      },
      { text: '\n' },
      {
        layout: 'lightHorizontalLines',
        table: {
          widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
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
    pdfMake.createPdf(docDefinition).download(Date.now());
  };

  // protected
  if (user?.auth2) {
    return (
      <AdminLayout menu={menu2} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Typography variant="h6">รายงานรายชื่อผู้มาร่วมกิจกรรม</Typography>
              <Button
                variant="outlined"
                onClick={downloadPDF}
                disabled={!getReportParticipantByAdminIdState.result?.data}
              >
                ดาวน์โหลด PDF
              </Button>
            </Stack>
          </Stack>
          {getReportParticipantByAdminIdState.isFetching ? (
            <Loading />
          ) : (
            <Fragment>
              <TableContainer sx={{ mb: 2 }} component={Paper}>
                <Table>
                  <TableHead sx={{ bgcolor: 'action.hover' }}>
                    <TableRow>
                      <TableCell>รายละเอียด</TableCell>
                      <TableCell>จำนวน</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow sx={{ verticalAlign: 'top' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        จำนวนผู้สมัครเข้าร่วมกิจกรรม
                      </TableCell>
                      <TableCell>
                        {getReportParticipantByAdminIdState.result?.data?.count_all ?? ''}
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ verticalAlign: 'top' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>จำนวนผู้มาร่วมกิจกรรม</TableCell>
                      <TableCell>
                        {getReportParticipantByAdminIdState.result?.data?.count ?? ''}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {getReportParticipantByAdminIdState.result?.data?.rows?.map((row, index) => (
                <Fragment key={row.activity_id}>
                  <Typography sx={{ m: 1 }} variant="body1">
                    {row.activity_name}
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>ระดับกิจกรรม</TableCell>
                          <TableCell>ลำดับ</TableCell>
                          <TableCell>รายชื่ออาจารย์ที่ปรึกษา</TableCell>
                          <TableCell>รายชื่อผู้สมัคร</TableCell>
                          <TableCell>สถานะเข้าร่วม</TableCell>
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
                                      <Typography key={index} variant="body2">
                                        {row.participant_name}
                                      </Typography>
                                    ))}
                                  </TableCell>
                                  <TableCell>
                                    {row.participants?.map((row) => (
                                      <pre key={row.participant_id} style={{ margin: 0 }}>
                                        {row.participant_active ? 'เข้าร่วม' : '-'}
                                      </pre>
                                    ))}
                                  </TableCell>
                                </TableRow>
                              </Fragment>
                            ))}
                          </Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Fragment>
              ))}
            </Fragment>
          )}
        </Box>
      </AdminLayout>
    );
  }
  return <></>;
};

export default Participant;
