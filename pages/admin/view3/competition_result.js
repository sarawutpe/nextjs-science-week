import React, { Fragment, useState, useEffect, useMemo } from 'react';
import useUser from 'hoc/useUser';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import actions from 'redux/actions';
import CustomDialog from 'components/CustomDialog';
import AdminLayout from 'templates/AdminLayout/Index';
import Loading from 'components/Loading';
import { menu3 } from 'utils/configMenu';
import pdfMake from 'utils/pdfmake';
import certificateUtil from 'utils/certificateUtil';
import { setCookie } from 'utils/cookie';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import { grey } from '@mui/material/colors';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const CompetitionResult = (props) => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAdminByIdRequest(user?.id));
    dispatch(actions.getCompetitionResultByOverviewRequest({ activity: '', activity_level: '' }));
    dispatch(actions.getCertificateByTypeRequest());

    // initial certificate background
    if (props.certificate_background) {
      const v = props?.certificate_background;
      if (v == 'true') {
        setCertificateBackground(true);
      } else {
        setCertificateBackground(false);
      }
    }
  }, [router, user]);

  // global state
  const profile = useSelector(({ getAdminByIdReducer }) => getAdminByIdReducer);
  const getCompetitionResultByOverviewState = useSelector(
    ({ getCompetitionResultByOverviewReducer }) => getCompetitionResultByOverviewReducer
  );

  const getCertificateByTypeState = useSelector(
    ({ getCertificateByTypeReducer }) => getCertificateByTypeReducer
  );

  const [certificateBackground, setCertificateBackground] = useState(true);
  // handle setting certificiate
  const handleSettingCertificate = (event) => {
    setCertificateBackground(event.target.checked);
    setCookie('certificate_background', event.target.checked);
  };

  // certificate dialog
  const [openCertificateDialog, setOpenCertificateDialog] = useState(false);

  // handle open certificate dialog
  const handleOpenCertificateDialog = () => {
    setOpenCertificateDialog(true);
  };

  // handle close certificate dialog
  const handleCloseCertificateDialog = () => {
    setOpenCertificateDialog(false);
  };

  // certificate data
  const [certificateText, setCertificateText] = useState({
    activity: {
      activity_name: '',
      activity_type: '',
    },
    activity_level: {
      name: '',
    },
    award_level: {
      award_level_name: '',
    },
    advisors: [],
    participants: [],
  });

  // handle prepare certificate
  const handlePrepareCertificate = (action, row) => {
    if (action == 'advisor') {
      // add selected
      const newAdvisor = row.advisors.filter((row) => (row.selected = true));
      setCertificateText({
        activity: {
          activity_name: row.program?.activity?.activity_name,
          activity_type: row.program?.activity?.activity_type,
        },
        activity_level: {
          name: row.program?.activity_level?.name,
        },
        award_level: {
          award_level_name: row.competition_result?.award_level?.award_level_name,
        },
        advisors: newAdvisor,
        participants: [],
      });
      const test = certificateUtil.test('advisor', row);
      if (test) {
        // open dialog
        handleOpenCertificateDialog();
      }
    } else if (action == 'participant') {
      // filter participant active only
      const filterParticipantActive = row.participants.filter((row) => {
        if (row.participant_active == 1) {
          row.selected = true;
          return true;
        }
      });
      setCertificateText({
        activity: {
          activity_name: row.program?.activity?.activity_name,
          activity_type: row.program?.activity?.activity_type,
        },
        activity_level: {
          name: row.program?.activity_level?.name,
        },
        award_level: {
          award_level_name: row.competition_result?.award_level?.award_level_name,
        },
        advisors: [],
        participants: filterParticipantActive,
      });
      const test = certificateUtil.test('participant', row);
      if (test) {
        // open dialog
        handleOpenCertificateDialog();
      }
    }
  };

  // handle custom certificate name
  const handleCustomCertificateName = (action, id) => {
    if (action == 'advisor') {
      const updateSelected = certificateText?.advisors?.filter((row) => {
        if (row.advisor_id == id) {
          row.selected = !row.selected;
        }
        return row;
      });
      setCertificateText({ ...certificateText, participants: updateSelected });
    } else if (action == 'participant') {
      const updateSelected = certificateText?.participants?.filter((row) => {
        if (row.participant_id == id) {
          row.selected = !row.selected;
        }
        return row;
      });
      setCertificateText({ ...certificateText, participants: updateSelected });
    } else {
      return;
    }
  };

  // generate pdf table
  const certificateNameMemo = useMemo(() => {
    if (certificateText?.advisors?.length) {
      return certificateUtil.justifyAdvisorFont(certificateText);
    } else if (certificateText?.participants?.length) {
      return certificateUtil.justifyParticipantFont(certificateText);
    }
    return '';
  }, [certificateText]);

  const autoFontSize = (size, value) => {
    if (size === 'medium') {
      if (value <= 4) {
        return 25;
      } else if (value <= 8) {
        return 23;
      } else if (value <= 12) {
        return 21;
      }
      return 20;
    } else if (size === 'small') {
      if (value <= 4) {
        return 23;
      } else if (value <= 8) {
        return 21;
      } else if (value <= 12) {
        return 19;
      }
      return 18;
    }
  };

  const autoMarginSize = (size, value) => {
    if (size === 'medium') {
      if (value <= 4) {
        return [0, 165, 0, 0];
      } else if (value <= 8) {
        return [0, 155, 0, 0];
      } else if (value <= 12) {
        return [0, 147, 0, 0];
      }
    } else if (size === 'small') {
      if (value <= 4) {
        return [0, 5, 0, 0];
      } else if (value <= 8) {
        return [0, 4, 0, 0];
      } else if (value <= 12) {
        return [0, 3, 0, 0];
      }
      return [0, 4, 0, 0];
    }
  };

  // doc certificate 1
  const docCertificateParticipantActivity1 = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    pageMargins: [40, 60, 40, 60],
    background: [
      certificateBackground &&
        getCertificateByTypeState?.result?.data?.img_base64_type1 && {
          image: getCertificateByTypeState?.result?.data?.img_base64_type1,
          width: 842,
          height: 595,
        },
    ],
    content: [
      {
        text: certificateNameMemo?.name,
        fontSize: autoFontSize('medium', certificateNameMemo?.count),
        bold: true,
        color: '#7D3A01',
        alignment: 'center',
        margin: autoMarginSize('medium', certificateNameMemo?.count),
      },
      {
        text: `ได้รับรางวัล ${certificateText?.award_level?.award_level_name}`,
        fontSize: autoFontSize('small', certificateNameMemo?.count),
        bold: true,
        color: '#7D3A01',
        alignment: 'center',
        margin: autoMarginSize('small', certificateNameMemo?.count),
      },
      {
        text: `${certificateText?.activity?.activity_name}`,
        fontSize: autoFontSize('small', certificateNameMemo?.count),
        bold: true,
        color: '#7D3A01',
        alignment: 'center',
        margin: autoMarginSize('small', certificateNameMemo?.count),
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

  // doc certificate 2
  const docCertificateParticipantActivity2 = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    pageMargins: [40, 60, 40, 60],
    background: [
      certificateBackground &&
        getCertificateByTypeState?.result?.data?.img_base64_type2 && {
          image: getCertificateByTypeState?.result?.data?.img_base64_type2,
          width: 842,
          height: 595,
        },
    ],
    content: [
      {
        text: certificateNameMemo?.name,
        fontSize: autoFontSize('medium', certificateNameMemo?.count),
        bold: true,
        color: '#7D3A01',
        alignment: 'center',
        margin: autoMarginSize('medium', certificateNameMemo?.count),
      },
      {
        text: `ได้ผ่านการอบรมเรื่อง “${certificateText?.activity?.activity_name}”`,
        fontSize: autoFontSize('small', certificateNameMemo?.count),
        bold: true,
        color: '#7D3A01',
        alignment: 'center',
        margin: autoMarginSize('small', certificateNameMemo?.count),
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

  const docCertificateAdvisor = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    pageMargins: [40, 60, 40, 60],
    background: [
      certificateBackground &&
        getCertificateByTypeState?.result?.data?.img_base64_type1 && {
          image: getCertificateByTypeState?.result?.data?.img_base64_type1,
          width: 842,
          height: 595,
        },
    ],
    content: [
      {
        text: certificateNameMemo?.name,
        fontSize: autoFontSize('medium', certificateNameMemo?.count),
        bold: true,
        color: '#7D3A01',
        alignment: 'center',
        margin: [0, 165, 0, 0],
      },
      {
        text: `ได้นำนักเรียน/นักศึกษาเข้าร่วมกิจกรรม ${certificateText?.activity?.activity_name}`,
        fontSize: autoFontSize('small', certificateNameMemo?.count),
        bold: true,
        color: '#7D3A01',
        alignment: 'center',
        margin: autoMarginSize('small', certificateNameMemo?.count),
      },
      {
        text: `ระดับ${certificateText?.activity_level?.name} ได้รับรางวัล ${certificateText.award_level.award_level_name}`,
        fontSize: autoFontSize('small', certificateNameMemo?.count),
        bold: true,
        color: '#7D3A01',
        alignment: 'center',
        margin: autoMarginSize('small', certificateNameMemo?.count),
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
  const downloadCertificatePDF = () => {
    if (certificateText?.advisors?.length) {
      pdfMake.createPdf(docCertificateAdvisor).download(`cert_${Date.now()}`);
    } else if (certificateText?.participants?.length) {
      if (certificateText.activity.activity_type == 1) {
        pdfMake.createPdf(docCertificateParticipantActivity1).download(`cert_${Date.now()}`);
      } else if (certificateText.activity.activity_type == 2) {
        pdfMake.createPdf(docCertificateParticipantActivity2).download(`cert_${Date.now()}`);
      } else {
        return;
      }
    }
    return;
  };

  // protected
  if (user?.auth3) {
    return (
      <AdminLayout menu={menu3} profile={profile}>
        <Box marginBottom={3}>
          <Stack mt={1} mb={1}>
            <Stack mb={1} direction="row" justifyContent="space-between">
              <Typography variant="h6">ผลการแข่งขัน</Typography>
            </Stack>
          </Stack>
          <div>
            {getCompetitionResultByOverviewState.isFetching ? (
              <Loading />
            ) : (
              <Box mb={4}>
                {getCompetitionResultByOverviewState.result?.data?.map((row, index) => (
                  <Box key={index} mb={6}>
                    {/* activity */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="h6">{row.activity_name}</Typography>
                      <Typography variant="h6">
                        {row.activity_type === 1 ? 'การประกวด/แข่งขัน' : 'อบรม'}
                      </Typography>
                    </Box>
                    {row.programs?.map((row, index) => (
                      <TableContainer
                        key={index}
                        component={Paper}
                        sx={{ mb: 2, bgcolor: 'palette.success.light' }}
                      >
                        <Typography variant="body1" p={1} bgcolor="success.light" color="white">
                          {row.activity_level?.name}
                        </Typography>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>#</TableCell>
                              {row.activity?.activity_type == 1 && (
                                <TableCell>อาจารย์ที่ปรึกษา</TableCell>
                              )}
                              <TableCell>รายชื่อผู้สมัคร</TableCell>
                              <TableCell>สถานะเข้าร่วม</TableCell>
                              <TableCell>ผลการแข่งขัน</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.competitions?.map((row, index) => (
                              <Fragment key={index}>
                                <TableRow>
                                  <TableCell sx={{ verticalAlign: 'top' }}>{index + 1}</TableCell>
                                  {row.program?.activity?.activity_type == 1 && (
                                    <TableCell>
                                      {row.advisors?.map((row, index) => (
                                        <Typography key={index} variant="body2">
                                          {row.advisor_name}
                                        </Typography>
                                      ))}
                                    </TableCell>
                                  )}
                                  <TableCell sx={{ verticalAlign: 'top' }}>
                                    {row.participants?.map((row, index) => (
                                      <Typography key={index} variant="body2">
                                        {row.participant_name}
                                      </Typography>
                                    ))}
                                  </TableCell>
                                  <TableCell>
                                    {row.participants?.map((row, index) => (
                                      <Typography key={index} variant="body2">
                                        {row.participant_active ? 'เข้าร่วม' : '-'}
                                      </Typography>
                                    ))}
                                  </TableCell>
                                  <TableCell>
                                    {row.competition_result?.award_level?.award_level_name}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell colSpan={11}>
                                    <Fragment>
                                      {row.program?.activity?.activity_type == 1 && (
                                        <div>
                                          <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            mb={1}
                                            p={1}
                                            sx={{
                                              border: `1px solid ${grey[300]}`,
                                              borderRadius: 2,
                                            }}
                                          >
                                            <Typography variant="body1">
                                              เกียรติบัตรอาจารย์
                                            </Typography>
                                            <Button
                                              variant="text"
                                              disabled={!certificateUtil.test('advisor', row)}
                                              color="primary"
                                              onClick={() =>
                                                handlePrepareCertificate('advisor', row)
                                              }
                                            >
                                              ดาวน์โหลด
                                            </Button>
                                          </Box>
                                        </div>
                                      )}
                                      <div>
                                        <Box
                                          display="flex"
                                          justifyContent="space-between"
                                          alignItems="center"
                                          mb={1}
                                          p={1}
                                          sx={{
                                            border: `1px solid ${grey[300]}`,
                                            borderRadius: 2,
                                          }}
                                        >
                                          <Typography variant="body1">
                                            เกียรติบัตรผู้สมัคร
                                          </Typography>
                                          <Button
                                            variant="text"
                                            color="secondary"
                                            disabled={!certificateUtil.test('participant', row)}
                                            onClick={() =>
                                              handlePrepareCertificate('participant', row)
                                            }
                                          >
                                            ดาวน์โหลด
                                          </Button>
                                        </Box>
                                      </div>
                                    </Fragment>
                                  </TableCell>
                                </TableRow>
                              </Fragment>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ))}
                  </Box>
                ))}
              </Box>
            )}

            {/* certiciate dialog section*/}
            {certificateText?.advisors?.length ? (
              <>
                <CustomDialog
                  title="เลือกรายชื่อเกียรติบัตร"
                  open={openCertificateDialog}
                  onClose={handleCloseCertificateDialog}
                >
                  <Fragment>
                    {/* setting certificate background */}
                    <Box sx={{ mb: 2, p: 2, bgcolor: 'action.hover' }}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={certificateBackground}
                              onChange={(event) => handleSettingCertificate(event)}
                            />
                          }
                          label="รูปภาพพื้นหลัง"
                        />
                      </FormGroup>
                    </Box>
                    <TableContainer>
                      <Table size="small">
                        <TableBody>
                          {certificateText?.advisors?.map((row) => (
                            <TableRow key={row.advisor_id}>
                              <TableCell>
                                <Typography variant="body1">{row.advisor_name}</Typography>
                              </TableCell>
                              <TableCell>
                                <Checkbox
                                  defaultChecked
                                  onChange={() =>
                                    handleCustomCertificateName('advisor', row.advisor_id)
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Stack mt={2} mb={1}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={!certificateText?.advisors?.length || !certificateNameMemo?.count}
                        onClick={() => {
                          if (certificateNameMemo != '') {
                            downloadCertificatePDF();
                          }
                        }}
                      >
                        ตกลง
                      </Button>
                    </Stack>
                  </Fragment>
                </CustomDialog>
              </>
            ) : certificateText?.participants?.length ? (
              <>
                <CustomDialog
                  title="เลือกรายชื่อเกียรติบัตร"
                  open={openCertificateDialog}
                  onClose={handleCloseCertificateDialog}
                >
                  <Fragment>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      เฉพาะผู้ที่เข้าร่วมกิจกรรมเท่านั้น*
                    </Alert>
                    {/* setting certificate background */}
                    <Box sx={{ mb: 2, p: 2, bgcolor: 'action.hover' }}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={certificateBackground}
                              onChange={(event) => handleSettingCertificate(event)}
                            />
                          }
                          label="รูปภาพพื้นหลัง"
                        />
                      </FormGroup>
                    </Box>
                    <TableContainer>
                      <Table size="small">
                        <TableBody>
                          {certificateText?.participants?.map((row) => (
                            <TableRow key={row.participant_id}>
                              <TableCell>
                                <Typography variant="body1">{row.participant_name}</Typography>
                              </TableCell>
                              <TableCell>
                                <Checkbox
                                  defaultChecked
                                  onChange={() =>
                                    handleCustomCertificateName('participant', row.participant_id)
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Stack mt={2} mb={1}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={
                          !certificateText?.participants?.length || !certificateNameMemo?.count
                        }
                        onClick={() => {
                          if (certificateNameMemo != '') {
                            downloadCertificatePDF();
                          }
                        }}
                      >
                        ตกลง
                      </Button>
                    </Stack>
                  </Fragment>
                </CustomDialog>
              </>
            ) : (
              <></>
            )}
          </div>
        </Box>
      </AdminLayout>
    );
  }
  return <></>;
};

export async function getServerSideProps(context) {
  const c = context?.req?.cookies?.certificate_background;
  return {
    props: { certificate_background: c || null },
  };
}

export default CompetitionResult;
