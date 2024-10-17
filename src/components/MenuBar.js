import React, { useState } from "react";
import { makeStyles, createStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";

import IconExpandMore from "@mui/icons-material/ExpandMore";

import { useDispatch } from "react-redux";
import { setOpenCurrentTab } from "../features/tabManager";
import {
  settingsData,
  sideBarData,
  sideBarDataDeviceEngineer,
} from "./menuItems";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../features/auth/authSlice";
import {
  IV_INACTIVE_RESULT_HUB,
  IV_ACTIVE_RESULT_HUB,
  IV_RIGHT_ARROW,
  IV_EXPAND_MORE,
} from "../assets/icons";

const AppMenu = () => {
  const userData = useAppSelector(selectCurrentUser);
  const { userType } = userData ? userData : "Admin";

  const navigate = useNavigate();
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(
    window?.location?.pathname == "/"
      ? "/"
      : window?.location?.pathname.split("/")[1]
  );
  const [currentSubTab, setCurrentSubTab] = useState(
    window?.location?.pathname.split("/").splice(1, 2).join("/")
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState({
    user: currentTab === "user",
    deviceHub: currentTab === "deviceHub",
    resultHub: currentTab === "resultHub",
    accessManagement: currentTab === "accessManagement",
    testCaseHub: currentTab === "testCaseHub",
    testPlanHub: currentTab === "testPlanHub",
    testresultHub: currentTab === "testresultHub",
    bucketManagement: currentTab === "bucketManagement",
    serverConfig: currentTab === "serverConfig",
  });

  // const currentTab = "dashboard"

  const handleClick = (windowName, index) => {
    setCurrentTab(windowName);
    setOpen({
      user: windowName === "user",
      deviceHub: windowName === "deviceHub",
      resultHub: windowName === "resultHub",
      accessManagement: windowName === "accessManagement",
      testCaseHub: windowName === "testCaseHub",
      testPlanHub: windowName === "testPlanHub",
      testresultHub: windowName === "testresultHub",
      bucketManagement: windowName === "bucketManagement",
      serverConfig: windowName === "serverConfig",
    });
  };

  const handleClickDashBoard = (window) => {
    navigate(window);
    setCurrentTab(window);
    setCurrentSubTab();
    setOpen({
      user: false,
      deviceHub: false,
      resultHub: false,
      accessManagement: false,
      testCaseHub: false,
      testPlanHub: false,
      testresultHub: false,
      bucketManagement: false,
      serverConfig: false,
    });
  };

  return (
    <List disablePadding>
      <ListItem
        onClick={() => handleClickDashBoard("/")}
        selected={currentTab === "/"}
        sx={{
          borderBottom: "1px solid rgba(229, 229, 229, 1)",
          "& .MuiListItemIcon-root": {
            minWidth: "30px", // Set minimum width for the ListItemIcon
          },
          "&.Mui-selected": {
            borderBottom: "1px solid rgba(236, 25, 68, 1)",

            backgroundColor: "rgba(253, 53, 53, 0.15)", // Customize background color when selected
          },
        }}
      >
        <ListItemIcon>
          <img
            src={
              window?.location?.pathname === "/"
                ? `/img/iv_active_dashboard.svg`
                : `/img/graph.svg`
            }
            alt="Dish"
          />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              fontSize: "12px",
              fontWeight: 500,
              fontFamily: "Poppins CF",
              color: window?.location?.pathname === "/" ? "#EC1944" : "#606060",
              cursor: "pointer",
            },
            //color: currentTab === parent.node ? "#EC1944" : "#606060"
          }}
          variant="body1"
          primary="Dashboard"
          sx={{ flexGrow: 1 }}
        />
      </ListItem>

      {/* <div>
        {userType === "Admin"
          ? sideBarData.map((parent, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    borderBottom:
                      currentTab !== parent.node
                        ? "1px solid rgba(229, 229, 229, 1)"
                        : null,
                    "&.Mui-selected": {
                      backgroundColor: "white",
                      // Customize background color when selected
                    },
                    "& .MuiListItemIcon-root": {
                      minWidth: "30px", // Set minimum width for the ListItemIcon'
                    },
                  }}
                  onClick={() => handleClick(parent.node, index)}
                  selected={currentTab === parent.node} // Check if currentTab matches the URL
                >
                  <ListItemIcon className={classes.menuItemIcon}>
                    {currentTab == parent.node ? (
                      <parent.img />
                    ) : (
                      <parent.imgActive />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    disableTypography={false}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: "12px",
                        fontWeight: 500,
                        fontFamily: "Poppins CF",
                        color:
                          currentTab === parent.node ? "#EC1944" : "#606060",
                        cursor: "pointer", // Highlight active URL
                      },
                    }}
                    primary={parent.name}
                    sx={{ flexGrow: 1 }}
                  />
                  {open[parent.node] ? <IV_EXPAND_MORE /> : <IV_RIGHT_ARROW />}
                </ListItem>
                <Collapse in={open[parent.node]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {parent.children.map((child, childIndex) => (
                      <div
                        className={
                          currentSubTab === child.url
                            ? "bg-theme-headerColor py-1"
                            : "bg-theme-white py-1"
                        }
                        key={childIndex}
                        button
                        onClick={() => {
                          if (!child.clickable) return;

                          navigate(child.url);
                          setCurrentSubTab(child.url);
                          dispatch(setOpenCurrentTab(child.url));
                        }}
                        sx={{
                          marginLeft: "-26px",
                          "&.Mui-selected": {
                            backgroundColor: "rgba(0, 0, 0, 0.08)", // Customize background color when selected
                          },
                          "& .MuiListItemIcon-root": {
                            minWidth: "30px", // Set minimum width for the ListItemIcon
                          },
                        }}
                        selected={currentTab === child.url} // Check if currentTab matches the URL
                      >
                        <ListItemText
                          primaryTypographyProps={{
                            sx: {
                              fontSize: "12px",
                              fontWeight: "500",

                              color:
                                currentSubTab === child.url
                                  ? "#EC1944"
                                  : "#606060",
                              cursor: "pointer",
                            },
                          }}
                          inset
                          primary={child.name}
                        />
                      </div>
                    ))}
                    <Divider />
                  </List>
                </Collapse>
              </React.Fragment>
            ))
          : sideBarDataDeviceEngineer.map((parent, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    borderBottom: "1px solid rgba(229, 229, 229, 1)",
                    "&.Mui-selected": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      // Customize background color when selected
                    },
                    "& .MuiListItemIcon-root": {
                      minWidth: "30px", // Set minimum width for the ListItemIcon
                    },
                  }}
                  onClick={() => handleClick(parent.node, index)}
                  selected={currentTab === parent.node} // Check if currentTab matches the URL
                >
                  <ListItemIcon className={classes.menuItemIcon}>
                    {currentTab == parent.node ? (
                      <parent.img />
                    ) : (
                      <parent.imgActive />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    disableTypography={false}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: "12px",
                        fontWeight: 500,
                        fontFamily: "Poppins CF",
                        color:
                          currentTab === parent.node ? "#EC1944" : "#606060",
                        cursor: "pointer", // Highlight active URL
                      },
                    }}
                    primary={parent.name}
                    sx={{ flexGrow: 1 }}
                  />
                  {open[parent.node] ? <IV_EXPAND_MORE /> : <IV_RIGHT_ARROW />}
                </ListItem>
                <Collapse in={open[parent.node]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {parent.children.map((child, childIndex) => (
                      <ListItem
                        key={childIndex}
                        button
                        onClick={() => {
                          if (!child.clickable) return;

                          navigate(child.url);
                          setCurrentSubTab(child.url);
                          dispatch(setOpenCurrentTab(child.url));
                        }}
                        sx={{
                          marginLeft: "-26px",

                          "&.Mui-selected": {
                            backgroundColor: "rgba(0, 0, 0, 0.08)", // Customize background color when selected
                          },
                          "& .MuiListItemIcon-root": {
                            minWidth: "30px", // Set minimum width for the ListItemIcon
                          },
                        }}
                        selected={currentTab === child.url} // Check if currentTab matches the URL
                      >
                        <ListItemText
                          primaryTypographyProps={{
                            sx: {
                              fontSize: "12px",
                              fontWeight: "500",
                              color:
                                currentSubTab === child.url
                                  ? "#EC1944"
                                  : "#606060",
                              cursor: "pointer",
                            },
                          }}
                          inset
                          primary={child.name}
                        />
                      </ListItem>
                    ))}
                    <Divider />
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
      </div> */}

      {/* {userType === "Admin" && (
        <ListItem
          onClick={() => handleClickDashBoard("/testresultHub")}
          selected={currentTab === "/testresultHub"}
          sx={{
            borderBottom: "1px solid rgba(229, 229, 229, 1)",
            "& .MuiListItemIcon-root": {
              minWidth: "30px", // Set minimum width for the ListItemIcon
            },
            "&.Mui-selected": {
              borderBottom: "1px solid rgba(236, 25, 68, 1)",

              backgroundColor: "rgba(253, 53, 53, 0.15)", // Customize background color when selected
            },
          }}
        >
          <ListItemIcon>
            {window?.location?.pathname === "/testresultHub" ? (
              <IV_ACTIVE_RESULT_HUB />
            ) : (
              <IV_INACTIVE_RESULT_HUB />
            )}
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              sx: {
                fontSize: "12px",
                fontWeight: 500,
                fontFamily: "Poppins CF",
                color:
                  window?.location?.pathname === "/testresultHub"
                    ? "#EC1944"
                    : "#606060",
                cursor: "pointer",
              },
            }}
            variant="body1"
            primary="BAXTER"
            sx={{ flexGrow: 1 }}
          />
        </ListItem>
        
      )} */}

      {userType === "Admin" && (
        <ListItem
          onClick={() => handleClickDashBoard("/scheduleExecute")}
          selected={currentTab === "/scheduleExecute"}
          sx={{
            borderBottom: "1px solid rgba(229, 229, 229, 1)",
            "& .MuiListItemIcon-root": {
              minWidth: "30px", // Set minimum width for the ListItemIcon
            },
            "&.Mui-selected": {
              borderBottom: "1px solid rgba(236, 25, 68, 1)",

              backgroundColor: "rgba(253, 53, 53, 0.15)", // Customize background color when selected
            },
          }}
        >
          <ListItemIcon>
            {window?.location?.pathname === "/scheduleExecute" ? (
              <IV_ACTIVE_RESULT_HUB />
            ) : (
              <IV_INACTIVE_RESULT_HUB />
            )}
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              sx: {
                fontSize: "12px",
                fontWeight: 500,
                fontFamily: "Poppins CF",
                color:
                  window?.location?.pathname === "/scheduleExecute"
                    ? "#EC1944"
                    : "#606060",
                cursor: "pointer",
              },
              //color: currentTab === parent.node ? "#EC1944" : "#606060"
            }}
            variant="body1"
            primary="Schedule & Execute"
            sx={{ flexGrow: 1 }}
          />
        </ListItem>
      )}

      {userType === "Admin" && (
        <ListItem
          onClick={() => handleClickDashBoard("products/baxter")}
          selected={currentTab === "products/baxter"}
          sx={{
            borderBottom: "1px solid rgba(229, 229, 229, 1)",
            "& .MuiListItemIcon-root": {
              minWidth: "30px", // Set minimum width for the ListItemIcon
            },
            "&.Mui-selected": {
              borderBottom: "1px solid rgba(236, 25, 68, 1)",

              backgroundColor: "rgba(253, 53, 53, 0.15)", // Customize background color when selected
            },
          }}
        >
          <ListItemIcon>
            {window?.location?.pathname === "products/baxter" ? (
              <IV_ACTIVE_RESULT_HUB />
            ) : (
              <IV_INACTIVE_RESULT_HUB />
            )}
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              sx: {
                fontSize: "12px",
                fontWeight: 500,
                fontFamily: "Poppins CF",
                color:
                  window?.location?.pathname === "products/baxter"
                    ? "#EC1944"
                    : "#606060",
                cursor: "pointer",
              },
            }}
            variant="body1"
            primary="Test Results Hub"
            sx={{ flexGrow: 1 }}
          />
        </ListItem>
        
      )}
     
      <List component="nav">
        {userType === "Admin"
          ? settingsData.map((parent, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                   borderBottom: currentTab !== parent.node?"1px solid rgba(229, 229, 229, 1)":null,
                    "&.Mui-selected": {
                      backgroundColor: "white", // Customize background color when selected
                    },
                    "& .MuiListItemIcon-root": {
                      minWidth: "30px", // Set minimum width for the ListItemIcon
                    },
                  }}
                  onClick={() => handleClick(parent.node, index)}
                  selected={currentTab === parent.node} // Check if currentTab matches the URL
                >
                  <ListItemIcon className={classes.menuItemIcon}>
                    {currentTab == parent.node ? (
                      <parent.img />
                    ) : (
                      <parent.imgActive />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    disableTypography={false}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: "12px",
                        fontWeight: 500,
                        fontFamily: "Poppins CF",
                        color:
                          currentTab === parent.node ? "#EC1944" : "#606060",
                        cursor: "pointer", // Highlight active URL
                      },
                    }}
                    primary={parent.name}
                    sx={{ flexGrow: 1 }}
                  />
                  {open[parent.node] ? <IV_EXPAND_MORE /> : <IV_RIGHT_ARROW />}
                </ListItem>
                <Collapse in={open[parent.node]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {parent.children.map((child, childIndex) => (
                      <div
                        className={
                          currentSubTab === child.url
                            ? "bg-theme-headerColor py-1"
                            : "bg-theme-white py-1"
                        }
                        key={childIndex}
                        button
                        onClick={() => {
                          if (!child.clickable) return;

                          navigate(child.url);
                          setCurrentSubTab(child.url);
                          dispatch(setOpenCurrentTab(child.url));
                        }}
                        sx={{
                          marginLeft: "-26px",
                          "&.Mui-selected": {
                            backgroundColor: "rgba(0, 0, 0, 0.08)", // Customize background color when selected
                          },
                          "& .MuiListItemIcon-root": {
                            minWidth: "30px", // Set minimum width for the ListItemIcon
                          },
                        }}
                        selected={currentTab === child.url} // Check if currentTab matches the URL
                      >
                        <ListItemText
                          primaryTypographyProps={{
                            sx: {
                              fontSize: "12px",
                              fontWeight: "500",

                              color:
                                currentSubTab === child.url
                                  ? "#EC1944"
                                  : "#606060",
                              cursor: "pointer",
                            },
                          }}
                          inset
                          primary={child.name}
                        />
                      </div>
                    ))}
                    <Divider />
                  </List>
                </Collapse>
              </React.Fragment>
            ))
          : sideBarDataDeviceEngineer.map((parent, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)", // Customize background color when selected
                    },
                    "& .MuiListItemIcon-root": {
                      minWidth: "30px", // Set minimum width for the ListItemIcon
                    },
                  }}
                  onClick={() => handleClick(parent.node, index)}
                  selected={currentTab === parent.node} // Check if currentTab matches the URL
                >
                  <ListItemIcon className={classes.menuItemIcon}>
                    {currentTab == parent.node ? (
                      <parent.img />
                    ) : (
                      <parent.imgActive />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    disableTypography={false}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: "12px",
                        fontWeight: 500,
                        fontFamily: "Poppins CF",
                        color:
                          currentTab === parent.node ? "#EC1944" : "#606060",
                        cursor: "pointer", // Highlight active URL
                      },
                    }}
                    primary={parent.name}
                    sx={{ flexGrow: 1 }}
                  />
                  {open[parent.node] ? <IV_EXPAND_MORE /> : <IV_EXPAND_MORE />}
                </ListItem>
                <Collapse in={open[parent.node]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {parent.children.map((child, childIndex) => (
                      <ListItem
                        key={childIndex}
                        button
                        onClick={() => {
                          if (!child.clickable) return;

                          navigate(child.url);
                          setCurrentSubTab(child.url);
                          dispatch(setOpenCurrentTab(child.url));
                        }}
                        sx={{
                          marginLeft: "-26px",

                          "&.Mui-selected": {
                            backgroundColor: "rgba(0, 0, 0, 0.08)", // Customize background color when selected
                          },
                          "& .MuiListItemIcon-root": {
                            minWidth: "30px", // Set minimum width for the ListItemIcon
                          },
                        }}
                        selected={currentTab === child.url} // Check if currentTab matches the URL
                      >
                        <ListItemText
                          primaryTypographyProps={{
                            sx: {
                              fontSize: "12px",
                              fontWeight: "500",
                              color:
                                currentSubTab === child.url
                                  ? "#EC1944"
                                  : "#606060",
                              cursor: "pointer",
                            },
                          }}
                          inset
                          primary={child.name}
                        />
                      </ListItem>
                    ))}
                    <Divider />
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
      </List>
    </List>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    menuItem: {
      "&.MuiButtonBase-root": {
        color: "#606060",
        fontSize: "0.9rem",
      },
    },
    menuItemIcon: {
      color: "#606060",
    },
  })
);

export default AppMenu;
