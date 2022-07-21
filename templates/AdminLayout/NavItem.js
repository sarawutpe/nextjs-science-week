import Link from 'next/link'
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import useStyles from './Styles';

const NavItem = (props) => {
  const { link,  title, ...rest } = props;
  const router = useRouter();
  const classes = useStyles();
  return (
    <ListItem sx={{ display: 'flex', py: 0 }} {...rest}>
      <Link href={link}>
        <Button color={router.asPath === link ? 'primary' : 'inherit'} className={classes.customMenu}>
          <span>{title}</span>
        </Button>
      </Link>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
};

export default NavItem;
