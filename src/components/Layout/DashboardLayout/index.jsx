import React, {
  Suspense,
  useEffect,
  // useRef
} from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AppMenu from "../../../components/MenuBar";
import Footer from "../../Footer";
import { useLogoutMutation } from "../../../features/auth/authAPI";
import { Outlet, useNavigate } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import { toast } from "react-toastify";
import ProfileDropdown from "../../Navbar/ProfileDropdown";
import PageLoader from "../../Loader/PageLoader";
import "./index.scss";
import { AppLogoWhite,IV_HAMBURGER,IV_LOGOUT} from "../../../assets/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { IC_CHAVER_LOGO } from "../../../assets/images";
import {
  getTokenFromLocal,
  getUserFromLocal,
  logoutAction,
  selectAuthToken,
  selectCurrentUser,
} from "../../../features/auth/authSlice";
import {useGetMyProfileQuery } from "../../../features/dashboard/dashboardAPI";


import useWindowFocus from "../../../hooks/useWindowFocus";
import {
  setCredentials
} from "../../../features/auth/authSlice";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} - 17px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} - 17px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  borderBlockEnd: "black",

  flexShrink: 0,

  whiteSpace: "nowrap",
  // boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// import useTooltipStatus from '../../Tooltip/useTooltipStatus'
// import { useWindowSize } from '../../../hooks/useWindowSize'

//this dashboard layout component to capsulate navbar, footer and content
const DashboardLayout = () => {
  // const navigate = useNavigate();
  const currentTab = "userList";


  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [isAuthorized, setIsAuthorized] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("loginInfo"));
    if (loginData && loginData.token) setIsAuthorized(true);
    else setIsAuthorized(false);
  }, []);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const [isModal, setModal] = useState(false);
  const [logout] = useLogoutMutation();
  const token = useAppSelector(selectAuthToken);
  const userData = useAppSelector(selectCurrentUser);

  const { data:userProfile, isLoading:isLoadingProfile } = useGetMyProfileQuery();
  React.useEffect(() => {
    if(userProfile?.data?.userInfo[0]!==undefined){
      const { token } = userData;
      let user={...userData,...userProfile?.data?.userInfo[0]}

      dispatch(setCredentials({ user, token }));
    }

   
   
  }, [userProfile?.data?.userInfo]);

  const dispatch = useAppDispatch();
  /* istanbul ignore next */
  const handleLogout = async () => {
    if (!userData?.email) {
      toast.error("Email missing");
      //dispatch(logoutAction());
      return;
    }
    if (token) {
      try {
        const logoutRes = await logout({
          email: userData.email,
          token,
        }).unwrap();
        if (logoutRes?.statusCode === 200) {
          toast.success(logoutRes?.message);
          return;
        }
        toast.error(logoutRes?.message);
      } catch (err) {
        toast.error(err?.data?.message || "Server Logout failed");
      }
    }
    // dispatch(logoutAction());
  };
  /* istanbul ignore next */
  const onIdle = () => {
    handleLogout();
    // navigate(ROUTES.LOGIN)

    // console.log("timer Idle")
  };

  // console.log({userData,onboardData})

  // const onActive = () => {
  //     console.log("timer Active")

  // }

  // const onAction = () => {
  //     // setCount(count + 1)
  //     console.log("timer Action")

  // }
  useIdleTimer({
    onIdle,
    // onActive,
    // onAction,
    timeout: 36_00_000 * 24,
    throttle: 500,
    crossTab: true,
    disabled: !token || !userData?.email,
  }) || (() => ({}))();
  // console.log("is idle", isIdle());

  // useEffect(() => {
  //     const interval = setInterval(() => {
  //         setRemaining(Math.ceil(getRemainingTime() / 1000))
  //     }, 1000)

  //     return () => {
  //         clearInterval(interval)
  //     }
  // })
  // console.log("timer remaining", remaining);
  useEffect(() => {
    if (!token || !userData?.email) {
      dispatch(logoutAction());
      // navigate(ROUTES.LOGIN)
    }
  }, [token, userData?.email]);

  /* istanbul ignore next */
  useWindowFocus({
    onFocus: () => {
      const token = getTokenFromLocal();
      const user = getUserFromLocal();
      if (!token || !user?.email) {
        dispatch(logoutAction());
        //  navigate(ROUTES.LOGIN)
      }
    },
  });

  return (
    <>
      <div className="bg-white-700">
        {/* <div className="flex w-full  "> */}
        

          
             <div elevation={0} className="py-4 flex justify-between">
              <img src={IC_CHAVER_LOGO} className="h-6"></img>
            <div data-testid="ProfileDropdown">
                  <div className="relative flex items-center ">
                    <ProfileDropdown userData={userData} />
                  </div>
                </div>
            </div>
          {/* <AppBar
            elevation={1}
            // position="fixed"
            
            sx={{ background: "white", border: "none",   }}
            open={open}
          >
         
          </AppBar> */}
         
        {/* </div> */}
        <div className="dashboardLayout overflow-overlay scrollbar-track-blue-lightest scrollbar-thumb-blue-dark  flex h-[calc(100vh-60px)] w-full justify-center overflow-auto bg-[#FAF5FE] p-4 px-4 scrollbar-thin md:h-[calc(100vh-110px)] ">
          <Suspense fallback={<PageLoader />}>
            <Outlet className="bg-black" />
          </Suspense>
        </div>
      </div>
      <Footer direction={theme.direction} />
    </>
  );
};

export default DashboardLayout;
