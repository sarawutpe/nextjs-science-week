import { styled } from '@mui/material/styles';
import { useTheme, createStyles, makeStyles } from '@mui/styles';
import { height } from '@mui/system';

const useStyles = makeStyles((theme) =>
  createStyles({
    customMenu: {
      fontWeight: 'medium',
      justifyContent: 'flex-start',
      letterSpacing: 0,
      padding: '8px',
      width: '100%'
    },
  }),
);

const DashboardLayoutRoot = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const DashboardLayoutWrapper = styled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 280
    }
  })
);

const DashboardLayoutContainer = styled('div')({
  display: 'block',
  width: '100%',
  height: '100%',
  padding: '16px',
});

export {
  DashboardLayoutRoot,
  DashboardLayoutWrapper,
  DashboardLayoutContainer,
}

export default useStyles;