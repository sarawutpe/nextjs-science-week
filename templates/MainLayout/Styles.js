import { styled } from '@mui/material/styles';

const MenuWrapper = styled('div')(
  ({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    '&.active': {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      textAlign: 'left',
    },
  })
);

export {
  MenuWrapper,
}