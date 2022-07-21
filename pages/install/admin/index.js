import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Index = ({ res }) => {
  const router = useRouter();
  // initial state
  useEffect(() => {
    alert(res.data);
    router.push('/auth/login');
  }, [router]);

  return <></>;
};

export async function getServerSideProps(ctx) {
  // set url
  const url = '/account-management/initial/admin';
  const initialAdmin = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`);
  const res = await initialAdmin.json();
  return { props: { res: res } };
}

export default Index;
