import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const drawerWidth = 240;

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
   
    return (
       
           <AppBar position="fixed" sx={{ background: "white" }} open={open}>
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
              >
                <ViewSidebarIcon />
              </IconButton>
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

       

    )
}

export default Navbar