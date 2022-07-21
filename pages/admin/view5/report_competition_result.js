import React, { Fragment, useEffect, useMemo } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import { menu5 } from 'utils/configMenu';
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

const ReportCompetitionResult = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    dispatch(actions.getReportCompetitionResultRequest());
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const getReportCompetitionResultState = useSelector(
    ({ getReportCompetitionResultReducer }) => getReportCompetitionResultReducer
  );

  // generate pdf memo
  const generatePDFMemo = useMemo(() => {
    let body = [];
    let data = getReportCompetitionResultState.result?.data;
    // map array
    if (data?.length) {
      getReportCompetitionResultState.result?.data?.map((row) => {
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
        body.push(['#', 'ระดับกิจกรรม', 'ลำดับ', 'อาจารย์ที่ปรึกษา', 'สถานศึกษา', 'ผลการแข่งขัน']);
        row.programs?.map((row, index) => {
          if (index == 0 || row.competitions?.length == 1) {
            body.push([
              { text: `${index + 1}` },
              { text: `${row.activity_level?.name ?? ''}` },
              { text: '1' },
              { text: row.competitions[0]?.advisors?.map((row) => row.advisor_name + '\n').join('') ?? '' },
              { text: row.competitions[0]?.member?.school?.name ?? '' },
              { text: row.competitions[0]?.competition_result?.award_level?.award_level_name ?? '' },
            ]);
          } else {
            body.push([
              { text: `${index + 1}`, rowSpan: row.competitions?.length ?? 0 },
              { text: `${row.activity_level?.name ?? ''}`, rowSpan: row.competitions?.length ?? 0},
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
              `${row.competitions[index]?.advisors?.map((row) => row.advisor_name + '\n').join('') ?? ''}`,
              `${row.competitions[index]?.member?.school?.name ?? ''}`,
              `${row.competitions[index]?.competition_result?.award_level?.award_level_name ?? ''}`,
            ]);
          }
        });
      });
    }
    return body;
  }, [router, getReportCompetitionResultState]);

  // doc definition
  const docDefinition = {
    header: { text: formatter.momentShort(), margin: [10, 5] },
    content: [
      { text: 'รายงานผลการแข่งขัน', style: 'header' },
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
  if (user?.auth5) {
    return (
      <AdminLayout menu={menu5} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Typography variant="h6">รายงานผลการแข่งขัน</Typography>
              <Button variant="outlined" onClick={downloadPDF} disabled={!getReportCompetitionResultState.result?.data}>
                ดาวน์โหลด PDF
              </Button>
            </Stack>
          </Stack>
        </Box>
        {getReportCompetitionResultState.isFetching ? (
          <Loading />
        ) : (
          <Stack spacing={2}>
            {getReportCompetitionResultState.result?.data?.map((row, index) => (
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
                        <TableCell>อาจารย์ที่ปรึกษา</TableCell>
                        <TableCell>สถานศึกษา</TableCell>
                        <TableCell>ผลการแข่งขัน</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.programs?.map((row, index) => (
                        <Fragment key={index}>
                          <TableRow>
                            <TableCell sx={{ verticalAlign: 'top' }} rowSpan={row.competitions.length + 1}>
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
                              <TableCell>
                                {row.advisors?.map((row, index) => (
                                  <Typography key={index} variant="body2">
                                    {row.advisor_name}
                                  </Typography>
                                ))}
                              </TableCell>
                              <TableCell>{row.member?.school?.name}</TableCell>
                              <TableCell>{row.competition_result?.award_level?.award_level_name}</TableCell>
                            </TableRow>
                          ))}
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

export default ReportCompetitionResult;
