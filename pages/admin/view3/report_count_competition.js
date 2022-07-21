import React, { Fragment, useEffect, useMemo } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import { menu3 } from 'utils/configMenu';
import pdfMake from 'utils/pdfmake';
import formatter from 'utils/formatter';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ReportCountCompetition = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    dispatch(actions.getReportCompetitionRequest());
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const getReportCompetitionState = useSelector(
    ({ getReportCompetitionReducer }) => getReportCompetitionReducer
  );

  // count advisor by level
  const getCountAdvisorByLevel = (competitionList) => {
    if (competitionList?.length) {
      let count = 0;
      competitionList.map((row) => {
        count += row?.advisors?.length;
      });
      return count;
    } else {
      return '';
    }
  };

  // count participant by level
  const getCountParticipantByLevel = (competitionList) => {
    if (competitionList?.length) {
      let count = 0;
      competitionList.map((row) => {
        count += row?.participants?.length;
      });
      return count;
    } else {
      return '';
    }
  };

  // generate pdf memo
  const generatePDFMemo = useMemo(() => {
    let body = [];
    let data = getReportCompetitionState.result?.data?.rows;
    // map array
    if (data?.length) {
      getReportCompetitionState.result?.data?.rows?.map((row) => {
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
          'จำนวนทีม',
          'จำนวนอาจารย์ที่ปรึกษา',
          'จำนวนผู้สมัคร',
        ]);
        row.programs?.map((row, index) => {
          if (index == 0 || row.competitions?.length == 1) {
            body.push([
              { text: `${index + 1}` },
              { text: `${row.activity_level?.name ?? ''}` },
              { text: '1' },
              { text: '1' },
              { text: row.competitions[0]?.advisors?.length ?? 0 },
              { text: row.competitions[0]?.participants?.length ?? 0 },
            ]);
          } else {
            body.push([
              { text: `${index + 1}` },
              { text: `${row.activity_level?.name ?? ''}`, rowSpan: row.competitions?.length ?? 0 },
              '',
              '',
              '',
              '',
            ]);
          }
          for (let index = 1; index < row.competitions.length; index++) {
              body.push([
              '',
              '',
              `${index + 1}`,
              '1',
              `${row.competitions[index].advisors?.length ?? 0}`,
              `${row.competitions[index].participants?.length ?? 0}`,
            ]);
          }
          body.push([
            { text: 'รวม' },
            '',
            '',
            `${row.competitions?.length}`,
            `${getCountAdvisorByLevel(row.competitions)}`,
            `${getCountParticipantByLevel(row.competitions)}`,
          ]);
        });
      });
    }
    return body;
  }, [router, getReportCompetitionState]);

  // doc definition
  const docDefinition = {
    header: { text: formatter.momentShort(), margin: [10, 5] },
    content: [
      { text: 'รายงานสรุปจำนวนผู้สมัครเข้าร่วมกิจกรรม', style: 'header' },
      { text: '\n' },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['*', '*'],
          body: [
            ['รายละเอียด', 'จำนวน'],
            ['จำนวนทีมสมัคร', `${getReportCompetitionState.result?.data?.count_team ?? ''}`],
            [
              'จำนวนผู้สมัครเข้าร่วมกิจกรรม',
              `${getReportCompetitionState.result?.data?.count_participant ?? ''}`,
            ],
            [
              'จำนวนอาจารย์ที่ปรึกษา',
              `${getReportCompetitionState.result?.data?.count_advisor ?? ''}`,
            ],
          ],
        },
      },
      { text: '\n' },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
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
  if (user?.auth3) {
    return (
      <AdminLayout menu={menu3} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Typography variant="h6">รายงานสรุปจำนวนผู้สมัครเข้าร่วมกิจกรรม</Typography>
              <Button
                variant="outlined"
                onClick={downloadPDF}
                disabled={!getReportCompetitionState.result?.data}
              >
                ดาวน์โหลด PDF
              </Button>
            </Stack>
          </Stack>
        </Box>
        {getReportCompetitionState.isFetching ? (
          <Loading />
        ) : (
          <Stack spacing={2}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)' }}>
                  <TableRow>
                    <TableCell>รายละเอียด</TableCell>
                    <TableCell>จำนวน</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ verticalAlign: 'top' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>จำนวนทีมสมัคร</TableCell>
                    <TableCell>
                      {getReportCompetitionState.result?.data?.count_team ?? ''}
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ verticalAlign: 'top' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>จำนวนผู้สมัครเข้าร่วมกิจกรรม</TableCell>
                    <TableCell>
                      {getReportCompetitionState.result?.data?.count_participant ?? ''}
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ verticalAlign: 'top' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>จำนวนอาจารย์ที่ปรึกษา</TableCell>
                    <TableCell>
                      {getReportCompetitionState.result?.data?.count_advisor ?? ''}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {getReportCompetitionState.result?.data?.rows?.map((row, index) => (
              <Fragment key={index}>
                <Typography variant="body1" m={1} fontWeight="bold">
                  {row.activity_name}
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)' }}>
                      <TableRow sx={{ verticalAlign: 'top' }}>
                        <TableCell>#</TableCell>
                        <TableCell sx={{ maxWidth: '20px' }}>ระดับกิจกรรม</TableCell>
                        <TableCell>ลำดับ</TableCell>
                        <TableCell>จำนวนทีม</TableCell>
                        <TableCell>จำนวนอาจารย์ที่ปรึกษา</TableCell>
                        <TableCell>จำนวนผู้สมัคร</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.programs?.map((row, index) => (
                        <Fragment key={index}>
                          <TableRow>
                            <TableCell
                              sx={{ verticalAlign: 'top' }}
                              rowSpan={row.competitions.length + 1}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell
                              sx={{ verticalAlign: 'top', maxWidth: 250 }}
                              rowSpan={row.competitions.length + 1}
                            >
                              {row.activity_level?.name} <br />
                              รูปแบบ{row.activity_level?.level_type}
                            </TableCell>
                          </TableRow>
                          {row.competitions?.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell sx={{ verticalAlign: 'top' }}>{index + 1}</TableCell>
                              <TableCell>1</TableCell>
                              <TableCell sx={{ verticalAlign: 'top' }}>
                                {row.advisors?.length ?? ''}
                              </TableCell>
                              <TableCell sx={{ verticalAlign: 'top' }}>
                                {row.participants?.length ?? ''}
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)' }}>
                            <TableCell colSpan={3} sx={{ fontWeight: 'bold' }}>
                              รวม
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                              {row.competitions?.length.toString()}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                              {getCountAdvisorByLevel(row.competitions)}
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                              {getCountParticipantByLevel(row.competitions)}
                            </TableCell>
                          </TableRow>
                        </Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Fragment>
            ))}
          </Stack>
        )}
      </AdminLayout>
    );
  }
  return <></>;
};

export default ReportCountCompetition;
