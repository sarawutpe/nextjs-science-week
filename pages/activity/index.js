import React, { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from 'templates/MainLayout/Index';
import Loading from 'components/Loading';
import { mainMenu } from 'utils/configMenu';
import actions from 'redux/actions';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const Index = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  // state
  const [search, setSearch] = useState('');

  // global state
  const getActivityState = useSelector(({ getActivityReducer }) => getActivityReducer);

  // initial state
  useEffect(() => {
    if (router.isReady) {
      dispatch(actions.getActivityRequest(router.query.search));
    }

    dispatch(actions.getActivityRequest());
    dispatch(actions.getActivityLevelRequest());
    dispatch(actions.getProgramRequest());
  }, [router]);

  return (
    <MainLayout menu={mainMenu}>
      <Stack mb={3} direction="row" justifyContent="space-between">
        <Typography variant="h6">รายการกิจกรรมการแข่งขัน</Typography>

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

      {getActivityState.isFetching ? (
        <Loading />
      ) : (
        <Grid container spacing={2}>
          {getActivityState.result?.data?.map((row, index) => (
            <Fragment key={index}>
              <List sx={{ width: '100%' }}>
                <ListItem disablePadding sx={{ background: 'rgba(0, 0, 0, 0.04)' }}>
                  <ListItemButton
                    component="a"
                    onClick={() => router.push(`${router.pathname}/detail/${row.activity_id}`)}
                  >
                    <ListItemText primary={row.activity_name} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Fragment>
          ))}
        </Grid>
      )}
    </MainLayout>
  );
};

// Index.get

export default Index;
