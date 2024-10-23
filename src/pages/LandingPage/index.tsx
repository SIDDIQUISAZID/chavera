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
      <header className="bg-white text-theme-black py-4 shadow-md">
      <div className="mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <img src={IC_CHAVER_LOGO} className="h-12" alt="Meditech Logo" />

        {/* Navigation */}
        <nav className="space-x-6 text-theme-black text-base font-poppins_cf font-normal">
          <Link
            to="/"
            className="text-theme-black font-medium tracking-wide hover:text-red-500 transition-colors duration-300 ease-in-out"
          >
            HOME
          </Link>
          <Link
            to="/about"
            className="text-theme-black font-medium tracking-wide hover:text-red-500 transition-colors duration-300 ease-in-out"
          >
            ABOUT
          </Link>
          <Link
            to="/products"
            className="text-theme-black font-medium tracking-wide hover:text-red-500 transition-colors duration-300 ease-in-out"
          >
            PRODUCTS
          </Link>
          <Link
            to="/enquiry"
            className="text-theme-black font-medium tracking-wide hover:text-red-500 transition-colors duration-300 ease-in-out"
          >
            ENQUIRY
          </Link>
          <Link
            to="/careers"
            className="text-theme-black font-medium tracking-wide hover:text-red-500 transition-colors duration-300 ease-in-out"
          >
            CAREER
          </Link>
          <Link
            to="/contact"
            className="text-theme-black font-medium tracking-wide hover:text-red-500 transition-colors duration-300 ease-in-out"
          >
            CONTACT US
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="What you are looking for?.."
            className="rounded-full border border-gray-300 text-sm font-poppins_cf py-2 pl-4 pr-10 text-gray-800 focus:outline-none focus:border-red-500 transition duration-300 ease-in-out"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 transition duration-300 ease-in-out">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </header>
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
