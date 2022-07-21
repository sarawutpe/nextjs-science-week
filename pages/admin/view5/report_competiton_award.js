import React, { Fragment, useEffect, useMemo } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import { menu5 } from 'utils/configMenu';
import formatter from 'utils/formatter';
import pdfMake from 'utils/pdfmake';
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

const ReportCompetitonAward = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    dispatch(actions.getReportCompetitionAwardRequest());
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const getReportCompetitionAwardState = useSelector(
    ({ getReportCompetitionAwardReducer }) => getReportCompetitionAwardReducer
  );

  // generate pdf memo
  const generatePDFMemo = useMemo(() => {
    let body = [];
    let data = getReportCompetitionAwardState.result?.data?.rows;
    // map array
    if (data?.length) {
      getReportCompetitionAwardState.result?.data?.rows?.map((row) => {
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
          'รายชื่อผู้สมัคร',
          'สถานศึกษา',
          'จำนวนเงิน',
        ]);
        row.programs?.map((row, index) => {
          if (index == 0 || row.competitions?.length == 1) {
            body.push([
              { text: `${index + 1}` },
              { text: `${row.activity_level?.name ?? ''}` },
              { text: '1' },
              {
                text:
                  row.competitions[0]?.participants
                    ?.map((row) => row.participant_name + '\n')
                    .join('') ?? '',
              },
              { text: row.competitions[0]?.member?.school?.name ?? '' },
              {
                text: formatter.thb(
                  row.competitions[0]?.competition_result?.amount ?? ''
                ),
              },
            ]);
          } else {
            body.push([
              { text: `${index + 1}`, rowSpan: row.competitions?.length ?? 0 },
              {
                text: `${row.activity_level?.name}`,
                rowSpan: row.competitions?.length ?? 0,
              },
              {},
              {},
              {},
              {},
            ]);
          }
          for (let index = 1; index < row.competitions?.length; index++) {
            body.push([
              {},
              {},
              `${index + 1}`,
              `${
                row.competitions[index]?.participants
                  ?.map((row) => row.participant_name + '\n')
                  .join('') ?? ''
              }`,
              `${row.competitions[index]?.member?.school?.name ?? ''}`,
              `${formatter.thb(
                row.competitions[index]?.competition_result?.amount ?? ''
              )}`,
            ]);
          }
        });
      });
    }

    return body && body;
  }, [router, getReportCompetitionAwardState]);

  // doc definition
  const docDefinition = {
    header: { text: formatter.momentShort(), margin: [10, 5] },
    content: [
      { text: 'รายงานรายชื่อผู้ที่ได้รับรางวัล', style: 'header' },
      { text: '\n' },
      {
        layout: 'lightHorizontalLines',
        table: {
          widths: ['*', '*'],
          body: [
            ['รายละเอียด', 'จำนวน'],
            [
              'จำนวนทีมทั้งหมด',
              `${getReportCompetitionAwardState.result?.data?.count_team ?? ''}`,
            ],
            [
              'จำนวนทีมที่ได้รับรางวัล',
              `${
                getReportCompetitionAwardState.result?.data?.count_competition_award ?? ''
              }`,
            ],
          ],
        },
      },
      { text: '\n' },
      {
        layout: 'lightHorizontalLines',
        table: {
          widths: ['auto', 'auto', 'auto', '*', '*', '*'],
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
  if (user?.auth5) {
    return (
      <AdminLayout menu={menu5} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Typography variant="h6">รายงานรายชื่อผู้ที่ได้รับรางวัล</Typography>
              <Button
                variant="outlined"
                onClick={downloadPDF}
                disabled={!getReportCompetitionAwardState.result?.data}
              >
                ดาวน์โหลด PDF
              </Button>
            </Stack>
          </Stack>
          {getReportCompetitionAwardState.isFetching ? (
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
                      <TableCell sx={{ fontWeight: 'bold' }}>จำนวนทีมทั้งหมด</TableCell>
                      <TableCell>
                        {getReportCompetitionAwardState.result?.data?.count_team ?? ''}
                      </TableCell>
                    </TableRow>
                    <TableRow sx={{ verticalAlign: 'top' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        จำนวนทีมที่ได้รับรางวัล
                      </TableCell>
                      <TableCell>
                        {getReportCompetitionAwardState.result?.data
                          ?.count_competition_award ?? ''}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {getReportCompetitionAwardState.result?.data?.rows?.map((row, index) => (
                <Fragment key={index}>
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
                          <TableCell>รายชื่อผู้สมัคร</TableCell>
                          <TableCell>สถานศึกษา</TableCell>
                          <TableCell>จำนวนเงิน</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.programs?.map((row, index) => (
                          <Fragment key={row.program_id}>
                            <TableRow sx={{ verticalAlign: 'top' }}>
                              <TableCell
                                rowSpan={(row.competitions.length + 1).toString()}
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell
                                rowSpan={(row.competitions.length + 1).toString()}
                              >
                                {row.activity_level?.name}
                              </TableCell>
                            </TableRow>
                            {row.competitions?.map((row, index) => (
                              <Fragment key={row.competition_id}>
                                <TableRow sx={{ verticalAlign: 'top' }}>
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
                                    {formatter.thb(row.competition_result?.amount)}
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

export default ReportCompetitonAward;
