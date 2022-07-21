import React, { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MenuWrapper } from './Styles';
import Stack from '@mui/material/Stack';
import useUser from 'hoc/useUser';

const Menu = (props) => {
  const { menu } = props;
  const router = useRouter();
  const { user } = useUser();

  const DashboardMenu = () => {
    if (user?.auth0) {
      return (
        <Link href={'/member'}>
          <MenuWrapper className={router.asPath === '/member' && 'active'}>จัดการข้อมูล</MenuWrapper>
        </Link>
      );
    } else if (user?.auth1) {
      return (
        <Link href={'/admin/view1'}>
          <MenuWrapper className={router.asPath === '/admin/view1' && 'active'}>จัดการข้อมูล</MenuWrapper>
        </Link>
      );
    } else if (user?.auth2) {
      return (
        <Link href={'/admin/view2'}>
          <MenuWrapper className={router.asPath === '/admin/view2' && 'active'}>จัดการข้อมูล</MenuWrapper>
        </Link>
      );
    } else if (user?.auth3) {
      return (
        <Link href={'/admin/view3'}>
          <MenuWrapper className={router.asPath === '/admin/view3' && 'active'}>จัดการข้อมูล</MenuWrapper>
        </Link>
      );
    } else if (user?.auth4) {
      return (
        <Link href={'/admin/view4'}>
          <MenuWrapper className={router.asPath === '/admin/view4' && 'active'}>จัดการข้อมูล</MenuWrapper>
        </Link>
      );
    } else if (user?.auth5) {
      return (
        <Link href={'/admin/view5'}>
          <MenuWrapper className={router.asPath === '/admin/view5' && 'active'}>จัดการข้อมูล</MenuWrapper>
        </Link>
      );
    } else {
      return <></>;
    }
  };

  return (
    <Fragment>
      <Stack direction={{ xs: 'column', sm: 'column', lg: 'row' }} spacing={2}>
        {menu.map((item, index) => (
          <Link key={index} href={item.path}>
            <MenuWrapper className={router.asPath === item.path && 'active'}>{item.name}</MenuWrapper>
          </Link>
        ))}

        {!user?.isLoggedIn && (
          <Fragment>
            <Link href={'/auth/login'}>
              <MenuWrapper className={router.asPath === '/auth/login' && 'active'}>เข้าสู่ระบบ</MenuWrapper>
            </Link>
            <Link href={'/auth/register'}>
              <MenuWrapper className={router.asPath === '/auth/register' && 'active'}>ลงทะเบียน</MenuWrapper>
            </Link>
          </Fragment>
        )}

        <DashboardMenu />
      </Stack>
    </Fragment>
  );
};

export default Menu;
