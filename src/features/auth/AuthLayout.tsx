import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { ROUTES } from "../../Router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FullScreenLoader } from "../../components/Loader";
import NetConnection from "../../components/NetConnection";
import { checkLocalTime, removeLocalTime } from "../../hooks/useIdleTimer";
import { useTokenStatusMutation } from "./authAPI";
import {
  logoutAction,
  selectAuthToken,
  selectCurrentUser,
  setOnboard,
  userRoleId,
} from "./authSlice";

const AuthLayout = () => {
  const token = useAppSelector(selectAuthToken);
  const userData = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [checkTokenStatus] = useTokenStatusMutation();
  // will create custom hook later
  const loginCheck = async () => {
    if (!token || !userData?.email || checkLocalTime()) {
      removeLocalTime();
      setLoading(false);
      if (ROUTES.LOGIN !== pathname) {
        // window.location.replace(ROUTES.LOGIN)
        navigate(ROUTES.LOGIN, { replace: true });
      }
      return;
    }
    if (!!token && !!userData?.email) {
      const emailSchema = z
        .string()
        .email({ message: "Invalid email address" });
      const emailResult = emailSchema.safeParse(userData?.email);
      if (emailResult.success) {
        console.log("pathname", pathname);

        //  const tokenStatusResult = store.dispatch(authApi.endpoints.checkToken.initiate());
        // const tokenStatusResult = checkTokenStatus({ email: userData.email, roleid: userRoleId });
        // z.string().email({ message: "Invalid email address" });
        try {
          if (pathname === ROUTES.LOGIN) {
            navigate(ROUTES.DASHBOARD, { replace: true });
          }
          //navigate(ROUTES.DASHBOARD, { replace: true })
          // const response = await tokenStatusResult.unwrap()
          // if (response?.status === 200) {

          //     dispatch(setOnboard(response.user))

          //     if (pathname === ROUTES.LOGIN) {
          //         navigate(ROUTES.DASHBOARD, { replace: true })
          //     }
          //     // setLoading(false)
          // } else {
          //     dispatch(logoutAction())

          //     if (response?.status !== 401) {
          //         toast.error(response?.message || "User not found");
          //     }
          //     return;
          // }
          // return response
        } catch (e) {
          // see https://reactrouter.com/en/main/fetch/redirect
          ROUTES.LOGIN !== pathname &&
            navigate(ROUTES.LOGIN, { replace: true });
          return;
        } finally {
          // tokenStatusResult.unsubscribe()
          setLoading(false);
          return;
        }
      }
      // locally override token for development
      // setLoading(false)
      // navigate(ROUTES.HOME)
      toast.error(emailResult.error?.toString());
    } else {
      setLoading(false);
      ROUTES.LOGIN !== pathname && navigate(ROUTES.LOGIN, { replace: true });
    }
  };
  useEffect(() => {
    if (isLoading) {
      loginCheck();
    }
  }, [
    token,
    userData?.email,
    dispatch,
    navigate,
    checkTokenStatus,
    isLoading,
    pathname,
  ]);
  // useEffect(() => {
  //     if (checkLocalTime()) {
  //         setLoading(false)
  //         navigate(ROUTES.LOGIN)
  //         return;
  //     }
  // }, [])
  // useWindowFocus({
  //     onFocus: () => {
  //         const token = getTokenFromLocal();
  //         const user = getUserFromLocal();
  //         if (!token || !user?.email) {
  //             // dispatch(logoutAction());
  //             console.log("navigateData",pathname,ROUTES.LOGIN,pathname !== ROUTES.LOGIN)
  //             if (pathname !== ROUTES.LOGIN) {
  //                 console.log("navigate")
  //                 navigate(ROUTES.LOGIN)
  //             }
  //         } else {
  //             loginCheck()
  //         }
  //     }
  // })
  if (isLoading) {
    return <FullScreenLoader title="Authorizing..." />;
  }
  return (
    <>
      <NetConnection>
        <Outlet />
      </NetConnection>
    </>
  );
};

export default AuthLayout;
