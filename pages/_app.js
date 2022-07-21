import React, { useEffect, createContext } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SWRConfig, useSWR } from 'swr';
import fetchJson from 'hoc/fetchJson';
import storeWrapper from 'redux/store';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ThemeProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';
import theme from 'templates/theme';
import '../styles.css';

const AppContext = createContext('');

const MyApp = ({ Component, pageProps, site}) => {
  const router = useRouter();

  const handleRouteChange = (url) => {
    window.gtag('config', 'G-4TMPQ540TV', {
      page_path: url,
    });
  };
  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // default material-ui-confirm
  const defaultMUIConfirm = {
    title: 'แจ้งเตือน',
    dialogProps: { maxWidth: 'xs' },
    confirmationText: 'ยืนยัน',
    cancellationText: 'ยกเลิก',
    confirmationButtonProps: { variant: 'contained', size: "small" },
    cancellationButtonProps: { variant: 'text', size: "small" },
  };

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Head>
          <title>{site?.site_title ?? ''}</title>
        </Head>
        <AppContext.Provider value={site}>
          <ThemeProvider theme={theme}>
            <ConfirmProvider defaultOptions={defaultMUIConfirm}>
              <Component site={site} {...pageProps} />
            </ConfirmProvider>
          </ThemeProvider>
        </AppContext.Provider>
      </LocalizationProvider>
    </SWRConfig>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  const initialSite = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/site-management/site`);
  const site = await initialSite.json();
  return { site: site.data};
};

export { AppContext };
export default storeWrapper.withRedux(MyApp);
