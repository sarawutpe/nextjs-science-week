import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MainLayout from 'templates/MainLayout/Index';
import { mainMenu } from 'utils/configMenu';
import { IMAGE_URL } from 'utils/constants';
import formatter from 'utils/formatter';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const Index = ({ news }) => {
  const router = useRouter();

  // initial state
  useEffect(() => {}, [router]);

  return (
    <MainLayout menu={mainMenu}>
      <Stack mb={3} direction="column" justifyContent="space-between">
        <Typography variant="h6">ข่าวประชาสัมพันธ์</Typography>
      </Stack>

      <Stack direction="row" justifyContent="center" p={2}>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="h6">{news?.news_topic ?? ''}</Typography>
          <Typography variant="subtitle2">{news.createdAt ? formatter.momentLocal(news.createdAt) : ''}</Typography>
          <Box my={3}>
            <Image
              src={`${IMAGE_URL}/${news?.news_img ?? ''}`}
              alt={news?.news_desc ?? ''}
              width={310}
              height={300}
              layout="fixed"
              priority
            />
          </Box>
          <Box>
            <Typography my={1} variant="body1">
              {news?.news_desc ?? ''}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </MainLayout>
  );
};

export async function getServerSideProps(ctx) {
  // set url
  const url = `/news-management/news/${ctx.query.id}`;
  const initialNews = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`);
  const news = await initialNews.json();
  return { props: { news: news.data } };
}

export default Index;
