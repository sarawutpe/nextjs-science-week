import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { memberMenu, menu1, menu2, menu3, menu4, menu5 } from 'utils/configMenu';

const useUser = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { data: user, mutate: mutateUser } = useSWR('/api/user');

  useEffect(() => {
    // protected routes
    if (!loading && user != undefined) {
      const page = router.pathname;
      const loginPath = '/auth/login';
      // member page (main)
      for (const i in memberMenu.main) {
        if (page === memberMenu.main[i].path && !user.auth0) {
          router.push(loginPath);
        }
      }
      // member page (account)
      for (const i in memberMenu.account) {
        if (page === memberMenu.account[i].path && !user.auth0) {
          router.push(loginPath);
        }
      }
      // view1 page
      for (const i in menu1) {
        if (page === menu1[i].path && !user.auth1) {
          router.push(loginPath);
        }
      }
      // view2 page
      for (const i in menu2) {
        if (page === menu2[i].path && !user.auth2) {
          router.push(loginPath);
        }
      }
      // view3 page
      for (const i in menu3) {
        if (page === menu3[i].path && !user.auth3) {
          router.push(loginPath);
        }
      }
      // view4 page
      for (const i in menu4) {
        if (page === menu4[i].path && !user.auth4) {
          router.push(loginPath);
        }
      }
      // view5 page
      for (const i in menu5) {
        if (page === menu5[i].path && !user.auth5) {
          router.push(loginPath);
        }
      }
    }
    setLoading(false);
  }, [user]);

  return { user, mutateUser };
};

export default useUser;
