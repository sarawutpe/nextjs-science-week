import React, { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';
import MainLayout from 'templates/MainLayout/Index';
import Loading from 'components/Loading';
import { mainMenu } from 'utils/configMenu';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Image from 'next/image';
import imageUtil from 'utils/imageUtil';

const Index = ({ site, news }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // state
  const [search, setSearch] = useState('');
  const [load, setLoad] = useState(true);

  // global state
  const getFormScienceDayState = useSelector(
    ({ getFormScienceDayReducer }) => getFormScienceDayReducer
  );

  // initial state
  useEffect(() => {
    dispatch(actions.getFormScienceDayRequest());
    setLoad(false);
  }, [router]);

  return (
    <MainLayout menu={mainMenu}>
      <Stack mb={3} direction="row" justifyContent="space-between">
        <Typography variant="h6">ข่าวประชาสัมพันธ์</Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(search && `${router.pathname}?search=${search}`);
          }}
        >
          <InputBase
            sx={{ background: '#eee', px: 1 }}
            type="search"
            placeholder="ค้นหา..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </Stack>
      {load ? (
        <Loading />
      ) : (
        <Fragment>
          {/* banner */}
          {site?.site_banner ? (
            <Image
              src={imageUtil.getImage(site?.site_banner ?? '')}
              width={1000}
              height={300}
              layout="responsive"
              objectFit="contain"
            />
          ) : (
            <></>
          )}
          {/* news */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            {news?.map((row, index) => (
              <Fragment key={index}>
                <Stack className="custom-shadow" justifyContent="space-between" p={2}>
                  <div>
                    <Image
                      src={imageUtil.getImage(row?.news_img ?? '')}
                      alt={row.news_desc}
                      width={310}
                      height={300}
                    />
                    <Typography my={1} variant="body1">
                      {row.news_topic}
                    </Typography>
                  </div>
                  <div>
                    <Button
                      sx={{ my: 1 }}
                      variant="contained"
                      fullWidth
                      onClick={() => router.push(`/news/${row.news_id}`)}
                    >
                      อ่านเพิ่มเติม
                    </Button>
                  </div>
                </Stack>
              </Fragment>
            ))}
          </Box>
          {getFormScienceDayState.result?.data?.length ? (
            <Box mt={2}>
              <Typography variant="h6">แบบสำรวจความคิดเห็น</Typography>
              <Box mb={1} p={2} bgcolor="action.hover">
                <Typography variant="subtitle1">
                  {`ขอเชิญทำแบบสำรวจความคิดเห็นกิจกรรมงานสัปดาห์วิทยาศาสตร์แห่งชาติ  ประจำปี ${
                    new Date().getFullYear() + 543
                  } (ทำแบบสอบสำรวจแล้วได้รับเกียรติบัตรผู้เข้าร่วมกิจกรรม)`}
                </Typography>
                <Button variant="text" onClick={() => router.push('/form_science_day')}>
                  {'ไปที่ลิ้งก์...'}
                </Button>
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </Fragment>
      )}
    </MainLayout>
  );
};

export async function getServerSideProps(ctx) {
  // !ctx.query.search
  if (Object.keys(ctx.query).length && !ctx.query.search) {
    return {
      notFound: true,
    };
  }

  // set url
  const url = ctx.query.search
    ? `/news-management/news?search=${encodeURIComponent(ctx.query.search)}`
    : `/news-management/news`;
  const initialNews = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`);
  const news = await initialNews.json();
  return { props: { news: news.data } };
}

export default Index;
