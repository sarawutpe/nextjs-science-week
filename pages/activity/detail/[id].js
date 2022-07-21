import React, { useEffect } from 'react';
import useUser from 'hoc/useUser';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from 'templates/MainLayout/Index';
import Loading from 'components/Loading';
import { mainMenu } from 'utils/configMenu';
import actions from 'redux/actions';
import { DOCUMENT_URL } from 'utils/constants';
import formatter from 'utils/formatter';
import momentUtil from 'utils/momentUtil';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const Index = () => {
  const { user } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  // initial state
  useEffect(() => {
    if (router.isReady && user) {
      if (user?.auth0) {
        // member
        dispatch(
          actions.getProgramDetailByActivityIdRequest({ activity: router.query.id, user: user?.id })
        );
      } else if (user?.auth1 || user?.auth2 || user?.auth3 || user?.auth4 || user?.auth5) {
        // admin
        dispatch(
          actions.getProgramDetailByActivityIdRequest({ activity: router.query.id, user: -1 })
        );
      } else {
        // public
        dispatch(
          actions.getProgramDetailByActivityIdRequest({ activity: router.query.id, user: '' })
        );
      }
    }
  }, [router, user]);

  // global state
  const getProgramDetailByActivityIdState = useSelector(
    ({ getProgramDetailByActivityIdReducer }) => getProgramDetailByActivityIdReducer
  );

  return (
    <MainLayout menu={mainMenu}>
      <Stack mb={3} direction="row" justifyContent="space-between">
        <Typography variant="h6">รายละเอียดกิจกรรมประกวด/แข่งขัน</Typography>
      </Stack>

      <Box mb={3}>
        <div>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6">
              {getProgramDetailByActivityIdState.result?.data?.activity_name ?? ''}
            </Typography>
            <Typography variant="h6">
              {getProgramDetailByActivityIdState.result?.data?.activity_type === 1
                ? 'การประกวด/แข่งขัน'
                : 'อบรม'}
            </Typography>
          </Box>

          {getProgramDetailByActivityIdState.isFetching ? (
            <Loading />
          ) : (
            getProgramDetailByActivityIdState.result?.data?.programs?.map((row, index) => (
              <Paper key={index} elevation={3} sx={{ mb: 3, pl: 1, pr: 1, pt: 2, pb: 2 }}>
                {/* activity level */}
                <div style={{ marginBottom: 8 }}>
                  <Box bgcolor="action.hover">
                    <Typography variant="subtitle1" fontWeight="bold">
                      ระดับกิจกรรม
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Typography variant="body1" mr={1}>
                      ระดับ:
                    </Typography>
                    <Typography variant="body1">{row.activity_level?.name}</Typography>
                  </Box>
                </div>
                {/* join detail */}
                <div style={{ marginBottom: 8 }}>
                  <Box bgcolor="action.hover">
                    <Typography variant="subtitle1" fontWeight="bold">
                      ข้อจำกัด
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Typography variant="body1" mr={1}>
                      จำกัดอาจารย์ที่ปรึกษา:
                    </Typography>
                    <Typography variant="body1">{`ทีมละไม่เกิน ${row.limit_per_advisor} คน`}</Typography>
                  </Box>
                  <Box display="flex">
                    <Typography variant="body1" mr={1}>
                      จำกัดจำนวนผู้สมัครต่อทีม:
                    </Typography>
                    <Typography variant="body1">{`ทีมละไม่เกิน ${row.limit_per_team} คน`}</Typography>
                  </Box>
                  <Box display="flex">
                    <Typography variant="body1" mr={1}>
                      จำกัดจำนวนทีมต่อโรงเรียน:
                    </Typography>
                    <Typography variant="body1">
                      {row.limit_per_school == 0 ? 'ไม่จำกัด' : `${row.limit_per_school} ทีม`}
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Typography variant="body1" mr={1}>
                      จำกัดจำนวนทีมต่อโปรแกรมแข่งขัน:
                    </Typography>
                    <Typography variant="body1">
                      {row.limit_per_program == 0 ? 'ไม่จำกัด' : `${row.limit_per_program} ทีม`}
                    </Typography>
                  </Box>
                </div>
                {/* detail */}
                <div style={{ marginBottom: 8 }}>
                  <Box bgcolor="action.hover">
                    <Typography variant="subtitle1" fontWeight="bold">
                      รายละเอียดกิจกรรม
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Typography variant="body1" mr={1}>
                      วันที่รับสมัคร:
                    </Typography>
                    <Typography variant="body1">
                      {row?.apply_from ? formatter.momentLocal(row.apply_from) : ''}
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Typography variant="body1" mr={1}>
                      วันที่ปิดรับสมัคร:
                    </Typography>
                    <Typography variant="body1">
                      {row?.apply_to ? formatter.momentLocal(row.apply_to) : ''}
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Typography variant="body1" mr={1}>
                      วันที่แข่งขัน:
                    </Typography>
                    <Typography variant="body1">
                      {row?.start_date ? formatter.momentLocal(row.start_date) : ''}
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Typography variant="body1" mr={1}>
                      วันที่ประกาศผล:
                    </Typography>
                    <Typography variant="body1">
                      {row?.result_date ? formatter.momentLocal(row.result_date) : ''}
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Typography variant="body1" mr={1}>
                      สถานที่/วิธีการแข่งขัน:
                    </Typography>
                    <Typography variant="body1">{row?.location ?? ''}</Typography>
                  </Box>
                </div>
                {/* coordinator */}
                <div style={{ marginBottom: 8 }}>
                  <Box bgcolor="action.hover">
                    <Typography variant="subtitle1" fontWeight="bold">
                      ผู้ประสานงานการแข่งขัน
                    </Typography>
                  </Box>
                  {row.coordinators?.map((row, index) => (
                    <Typography key={index} variant="body1">
                      {row.coordinator_name}
                    </Typography>
                  ))}
                </div>
                {/* document */}
                <div style={{ marginBottom: 8 }}>
                  <Box bgcolor="action.hover">
                    <Typography variant="subtitle1" fontWeight="bold">
                      เอกสารกิจกรรม
                    </Typography>
                  </Box>
                  {row.documents?.map((row, index) => (
                    <Box key={index} display="flex">
                      <Typography key={index} variant="body1" mr={1}>
                        {row.document_name}
                      </Typography>
                      <a href={`${DOCUMENT_URL}/${row.document_src}`}> {row.document_src}</a>
                    </Box>
                  ))}
                </div>

                {getProgramDetailByActivityIdState?.result?.joined[index] ? (
                  <>
                    {/* link */}
                    <div style={{ marginBottom: 8 }}>
                      <Box bgcolor="action.hover">
                        <Typography variant="subtitle1" fontWeight="bold">
                          ลิ้งก์กิจกรรม
                        </Typography>
                      </Box>
                      {row.links?.map((row, index) => (
                        <Box key={index} display="flex">
                          <Typography key={index} variant="body1" mr={1}>
                            {row.link_name}
                          </Typography>
                          <a href={row.link_src} target="_blank">
                            {row.link_src}
                          </a>
                        </Box>
                      ))}
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {/* action */}
                <div>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
                    <div>
                      {user?.isLoggedIn && user?.auth0 ? (
                        <Button
                          onClick={() => router.push(`/member/competition/add/${row.program_id}`)}
                          fullWidth
                          disabled={
                            momentUtil.competitionTime(row.apply_from, row.apply_to).isBefore ||
                            momentUtil.competitionTime(row.apply_from, row.apply_to).isAfter
                          }
                        >
                          {momentUtil.competitionTime(row.apply_from, row.apply_to).isBefore
                            ? 'ยังไม่เปิดรับสมัคร'
                            : momentUtil.competitionTime(row.apply_from, row.apply_to).isAfter
                            ? 'หมดเวลารับสมัคร'
                            : 'สมัครเข้าร่วม'}
                        </Button>
                      ) : (
                        <Button onClick={() => router.push('/auth/login')} fullWidth>
                          เข้าสู่ระบบ
                        </Button>
                      )}
                    </div>
                    <div>
                      <Button
                        onClick={() =>
                          router.push(`/activity/report/participant_list/${row.program_id}`)
                        }
                        variant="text"
                        fullWidth
                      >
                        ดูรายชื่อผู้สมัคร
                      </Button>
                    </div>
                    <div>
                      <Button
                        onClick={() =>
                          router.push(`/activity/report/result_list/${row.program_id}`)
                        }
                        variant="text"
                        fullWidth
                      >
                        ดูผลการแข่งขัน
                      </Button>
                    </div>
                  </Box>
                </div>
              </Paper>
            ))
          )}
        </div>
      </Box>
    </MainLayout>
  );
};

export default Index;
