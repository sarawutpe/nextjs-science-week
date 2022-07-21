import React, { Fragment, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from 'templates/MainLayout/Index';
import Loading from 'components/Loading';
import { mainMenu } from 'utils/configMenu';
import actions from 'redux/actions';
import pdfMake from 'utils/pdfmake';
import formatter from 'utils/formatter';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const NameList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // initial state
  useEffect(() => {
    if (router.isReady) {
      dispatch(actions.getReportCompetitionByIdRequest(router.query.id));
    }
  }, []);

  // global state
  const getReportCompetitionByIdState = useSelector(
    ({ getReportCompetitionByIdReducer }) => getReportCompetitionByIdReducer
  );

  // generate pdf table
  const generatePDFMemo = useMemo(() => {
    let body = [];
    let data = getReportCompetitionByIdState.result?.data?.competitions;
    // map array
    if (data?.length) {
      body.push(['#', 'รายชื่อผู้สมัคร', 'อาจารย์ที่ปรึกษา', 'สถานศึกษา']);
      data.map((row, index) => {
        body.push([
          `${index + 1}`,
          `${row.participants?.map((row) => row.participant_name + '\n').join('')}`,
          `${row.advisors?.map((row) => row.advisor_name + '\n').join('')}`,
          `${row.member?.school?.name ?? ''}`,
        ]);
      });
    }
    return body;
  }, [getReportCompetitionByIdState]);

  // doc definition
  const docDefinition = {
    header: { text: formatter.momentShort(), margin: [10, 5] },
    content: [
      { text: 'รายชื่อผู้สมัครเข้าร่วมกิจกรรม', style: 'header' },
      {
        text: `${
          getReportCompetitionByIdState.result?.data?.activity?.activity_name ?? ''
        }`,
        style: 'subheader',
      },
      {
        text: `${getReportCompetitionByIdState.result?.data?.activity_level?.name ?? ''}`,
        style: 'subheader',
      },
      { text: '\n' },
      {
        layout: 'lightHorizontalLines',
        table: {
          widths: ['auto', 'auto', 'auto', '*'],
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
    if (generatePDFMemo.length) {
      pdfMake.createPdf(docDefinition).download(Date.now());
    }
  };

  return (
    <MainLayout menu={mainMenu}>
      <Stack mb={3} direction="row" justifyContent="space-between">
        <Typography variant="h6">รายชื่อผู้สมัครเข้าร่วมกิจกรรม</Typography>
        <Button variant="outlined" disabled={!generatePDFMemo.length} onClick={downloadPDF}>
          ดาวน์โหลด PDF
        </Button>
      </Stack>
      {getReportCompetitionByIdState.isFetching ? (
        <Loading />
      ) : (
        <Fragment>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {getReportCompetitionByIdState.result?.data?.activity?.activity_name ?? ''}
          </Typography>
          <Typography variant="body1">
            {getReportCompetitionByIdState.result?.data?.activity_level?.name ?? ''}
          </Typography>
          <Box my={2}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>รายชื่อผู้สมัคร</TableCell>
                    <TableCell>อาจารย์ที่ปรึกษา</TableCell>
                    <TableCell>สถานศึกษา</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getReportCompetitionByIdState.result?.data?.competitions?.map(
                    (row, index) => (
                      <Fragment key={index}>
                        <TableRow sx={{ verticalAlign: 'top' }}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {row.participants?.map((row, index) => (
                              <pre key={index} style={{ margin: 0 }}>
                                {`${index + 1}. ${row.participant_name}`}
                              </pre>
                            ))}
                          </TableCell>
                          <TableCell>
                            {row.advisors?.map((row, index) => (
                              <Typography key={index} variant="body2">
                                {row.advisor_name}
                              </Typography>
                            ))}
                          </TableCell>
                          <TableCell>{row.member?.school?.name}</TableCell>
                        </TableRow>
                      </Fragment>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Fragment>
      )}
    </MainLayout>
  );
};

export default NameList;
