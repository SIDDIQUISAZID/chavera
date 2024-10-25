import { useState } from "react";
import "../../css/landingpage.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import VerificationForm from "./VerifyCode";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import Login from "./Login";
import { IC_CHAVER_LOGO } from "../../assets/images";
import { Link } from "react-router-dom";
// import {
//   InActiveProfileIcon,
// } from "../../assets/icons";
import { login } from "../../utils/commonTextFile";
import LandingPageBody from "../../components/LandingPageBody";
// import { IV_NEW_LOGO } from "../../assets/icons";

const LandingPage = ({ title }: { title: string }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 370,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 1,
  };
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [activeWindow, setActiveWindow] = useState({
    create: true,
    verification: false,
    login: false,
    forget: false,
    reset: false,
  });

  console.log(user, "user");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSetActiveWindow = (windowName: any) => {
    // Create a new state object with all keys set to false
    const newActiveWindow = {
      create: false,
      verification: false,
      login: false,
      forget: false,
      reset: false,
    } as any;
    newActiveWindow[windowName] = true;
    setActiveWindow(newActiveWindow);

    if (windowName == "close") {
      handleClose();
    }
  };

  const getUserDetails = (data: any) => {
    setUser(data);
  };

  return (
    <div style={{ overflow: "hidden" }} className="h-fit">
      <div className=" flex flex-col justify-between ">
   
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <button
              style={{
                float: "right",
                padding: "2%",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseOutlinedIcon />
            </button>

            {activeWindow.verification && (
              <VerificationForm
                 handleSetActiveWindow={(e: any) => handleSetActiveWindow(e)}
                user={user}
                // handleSetActiveWindow={(e: any) => {
                //   handleSetActiveWindow(e);
                //   handleClose();
                // }}
              />
            )}
            {activeWindow.login && (
              <Login
                handleSetActiveWindow={(e: any) => handleSetActiveWindow(e)}
                getUserEmail={getUserDetails}
              />
            )}
            {activeWindow.forget && (
              <ForgetPassword
                handleSetActiveWindow={(e: any) => handleSetActiveWindow(e)}
                getUserEmail={getUserDetails}
              />
            )}
            {activeWindow.reset && (
              <ResetPassword
                reset={activeWindow.reset}
                user={user}
                // handleSetActiveWindow={(e: any) => { handleSetActiveWindow(e), handleClose() }}
              />
            )}
          </Box>
        </Modal>
        <LandingPageBody />
      </div>
    </div>
  );
};

export default LandingPage;
