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

const ScienceDaySurvey = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    dispatch(actions.getFormScienceDaySurveyRequest());
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const getFormScienceDaySurveyState = useSelector(
    ({ getFormScienceDaySurveyReducer }) => getFormScienceDaySurveyReducer
  );

  // generate pdf memo
  const generatePDFMemo = useMemo(() => {
    let body = [];
    let data = getFormScienceDaySurveyState.result?.data;
    // map array
    if (data?.length) {
      body.push(['#', 'รหัสประชาชน', 'ชื่อ', 'ที่อยู่', 'ตำบล', 'อำเภอ', 'จังหวัด', 'รหัสไปรษณีย์']);
      data.map((row, index) => {
        body.push([
          `${index + 1}`,
          `${row.id_card}`,
          `${row.name}`,
          `${row.address}`,
          `${row.sub_district}`,
          `${row.district}`,
          `${row.province}`,
          `${row.postcode}`,
        ]);
      });
    }
    return body;
  }, [router, getFormScienceDaySurveyState]);

  // doc definition
  const docDefinition = {
    pageSize: 'A4',
    header: { text: formatter.momentShort(), margin: [10, 5] },
    content: [
      { text: 'รายชื่อผู้ประเมินความพึงพอใจวันวิทย์', style: 'header' },
      { text: '\n' },
      {
        layout: 'lightHorizontalLines',
        table: {
          widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
          body: generatePDFMemo,
        },
      },
    ],
    defaultStyle: {
      font: 'THSarabunNew',
      fontSize: 14,
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

  // protected
  if (user?.auth3) {
    return (
      <AdminLayout menu={menu3} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Typography variant="h6">รายชื่อผู้ประเมินความพึงพอใจวันวิทย์</Typography>
              <Button
                variant="outlined"
                onClick={downloadPDF}
                disabled={!getFormScienceDaySurveyState.result?.data}
              >
                ดาวน์โหลด PDF
              </Button>
            </Stack>
          </Stack>
        </Box>
        {getFormScienceDaySurveyState.isFetching ? (
          <Loading />
        ) : (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead sx={{ bgcolor: 'rgba(0, 0, 0, 0.04)' }}>
                      <TableRow sx={{ verticalAlign: 'top' }}>
                        <TableCell>#</TableCell>
                        <TableCell>รหัสประชาชน</TableCell>
                        <TableCell>ชื่อ</TableCell>
                        <TableCell>ที่อยู่</TableCell>
                        <TableCell>ตำบล</TableCell>
                        <TableCell>อำเภอ</TableCell>
                        <TableCell>จังหวัด</TableCell>
                        <TableCell>รหัสไปรษณีย์</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {getFormScienceDaySurveyState.result?.data?.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{row.id_card}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.address}</TableCell>
                        <TableCell>{row.sub_district}</TableCell>
                        <TableCell>{row.district}</TableCell>
                        <TableCell>{row.province}</TableCell>
                        <TableCell>{row.postcode}</TableCell>
                      </TableRow>
                         ))}
                    </TableBody>
                  </Table>
                </TableContainer>
         
        )}
      </AdminLayout>
    );
  }
  return <></>;
};

export default ScienceDaySurvey;
