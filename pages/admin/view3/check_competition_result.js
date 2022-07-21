import React, { Fragment, useEffect } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
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
import Alert from '@mui/material/Alert';
import KeyIcon from '@mui/icons-material/Key';
import KeyOffIcon from '@mui/icons-material/KeyOff';

const CheckCompetitionResult = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  // initial state
  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    dispatch(actions.getCheckCompetitionResultRequest());
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const getCheckCompetitionResultState = useSelector(
    ({ getCheckCompetitionResultReducer }) => getCheckCompetitionResultReducer
  );

  // protected
  if (user?.auth3) {
    return (
      <AdminLayout menu={menu3} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Typography variant="h6">การส่งผลการแข่งขัน</Typography>
            </Stack>
          </Stack>

          {getCheckCompetitionResultState.isFetching ? (
            <Loading />
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>การประกวด / แข่งขัน</TableCell>
                    <TableCell>ระดับ</TableCell>
                    <TableCell>สถานะส่งผลการแข่งขัน</TableCell>
                    <TableCell>ปลดล็อค</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getCheckCompetitionResultState.result?.data?.map((row, index) => (
                    <Fragment key={index}>
                      <TableRow sx={{ verticalAlign: 'top' }}>
                        <TableCell rowSpan={row.programs.length + 1}>{index + 1}</TableCell>
                        <TableCell rowSpan={row.programs.length + 1}>{row.activity_name}</TableCell>
                      </TableRow>
                      {row.programs?.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.activity_level?.name}</TableCell>
                          <TableCell>
                            {row.confirm ? (
                              <Alert severity="success">ส่งแล้ว</Alert>
                            ) : (
                              <Alert severity="warning">ยังไม่ส่ง</Alert>
                            )}
                          </TableCell>
                          <TableCell align="left">
                            <IconButton
                              color="primary"
                              component="span"
                              onClick={() => {
                                if (row.confirm) {
                                  confirm({ description: 'ต้องการยืนยันการปลดล็อคผลการแข่งขันหรือไม่?' }).then(() => {
                                    dispatch(
                                      actions.updateCheckCompetitionResultRequest({
                                        activity_id: row.activity_id,
                                        activity_level_id: row.activity_level_id,
                                      })
                                    );
                                  });
                                }
                              }}
                            >
                              {row.confirm ? <KeyIcon /> : <KeyOffIcon />}
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
              {/* confirm dialog */}
            </TableContainer>
          )}
        </Box>
      </AdminLayout>
    );
  }
  return <></>;
};

export default CheckCompetitionResult;
