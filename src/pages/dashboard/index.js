import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import AppMenu from "../../components/MenuBar";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";

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
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MiniDrawer = () => {
  const navigate = useNavigate();
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

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ background: "#EC1944" }} open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                marginLeft: "1%",
                ...(open && { display: "none" }),
              }}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                marginRight: "1em",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  padding: "0.5em 2em",
                  background: "none",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "16px",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 500,
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                <LogoutOutlinedIcon
                  style={{ fontSize: "18px", marginRight: "0.3em" }}
                />
                Logout
              </button>
            </div>
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontFamily: "Poppins",
              }}
              noWrap
              component="div"
            ></Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader
            style={{
              background:
                "linear-gradient(268.81deg, #9D2236 0.24%, #E10C32 51%, #EC1944 96.74%)",
            }}
          >
            <ListSubheader
              style={{
                display: "flex",
                background: "none",
                marginRight: "10%",
              }}
            >
              <img
                src="/img/dish_white.png"
                alt="Dish"
                style={{ marginTop: "5%" }}
              />
            </ListSubheader>
            <Divider />
            <IconButton
              style={{
                width: "34px",
                height: "34px",
                left: "18px",
                background: "white",
                borderRadius: "17px",
              }}
              onClick={handleDrawerClose}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <AppMenu />
        </Drawer>
      </Box>
    </>
  );
};

export default MiniDrawer;
