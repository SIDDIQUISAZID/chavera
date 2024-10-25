import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { z } from "zod";
import { ROUTES } from "../../Router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FullScreenLoader } from "../../components/Loader";
import NetConnection from "../../components/NetConnection";
import { checkLocalTime, removeLocalTime } from "../../hooks/useIdleTimer";
import { useTokenStatusMutation } from "./authAPI";
import {
  selectAuthToken,
  selectCurrentUser,
} from "./authSlice";
import { IC_CHAVER_LOGO } from "../../assets/images";
import Footer from "../../components/Footer";

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
            navigate(ROUTES.LOGIN, { replace: true });
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

  const linkClasses = (path: any) => {
    return `text-theme-black font-medium tracking-wide hover:text-red-500 transition-colors duration-300 ease-in-out ${
      location?.pathname === path ? "underline text-theme-dark" : ""
    }`;
  };
  return (
    <>
      <header className="bg-white py-2 text-theme-black shadow-md">
        <div className="mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <img src={IC_CHAVER_LOGO} className="h-12" alt="Meditech Logo" />

          {/* Navigation */}

          <nav className="flex flex-wrap items-center space-x-4 font-poppins_cf text-sm text-theme-black">
            <Link to="/" className={linkClasses("/")}>
              HOME
            </Link>
            
            <Link
              to="/products/baxter"
              className={linkClasses("/products/baxter")}
            >
              PRODUCTS
            </Link>
            <Link to="/enquiry" className={linkClasses("/enquiry")}>
              ENQUIRY
            </Link>
            <Link to="/careers" className={linkClasses("/careers")}>
              CAREER
            </Link>

            <Link to="/contact" className={linkClasses("/contact")}>
              CONTACT US
            </Link>
            <Link to="/about" className={linkClasses("/about")}>
              ABOUT
            </Link>
          </nav>
          {/* Search Bar */}
        </div>
      </header>
      <div className="dashboardLayout overflow-overlay scrollbar-track-blue-lightest scrollbar-thumb-blue-dark  flex   w-full justify-center overflow-auto bg-[#14bfd916] scrollbar-thin ">

      <NetConnection>
        <Outlet />
      </NetConnection>
      </div>
      <Footer direction={""} />
    </>
  );
};

export default AuthLayout;
