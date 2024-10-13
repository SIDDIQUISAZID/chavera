import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { MAIL } from "../../assets/icons";
import { IV_LOCK } from "../../assets/icons";
import { toast } from "react-toastify";
import { ROUTES } from "../../Router";

import '../devicehub/availity.css'
import {
  setCredentials,
  setOnboard,
  setEmailPassword,
} from "../../features/auth/authSlice";
import { CircleLoader } from "../../components/Loader";

import { useLoginMutation } from "../../features/auth/authAPI";
import { useAppSelector } from "../../app/hooks";
import {
  selectCurrentUser,
  selectEmailPassword,
  getEmailPassword,
  LOCALAUTH
} from "../../features/auth/authSlice";
import "../../css/register.css";


export default function Register(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      )
      .matches(/^\S*$/, "Email should not contain spaces")
      .max(40, "Email should be of maximum 40 characters length"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .max(40, "Password should be of maximum 40 characters length")
      // .matches(/^\S*$/, "Password should not contain spaces")
      // .matches(
      //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //   "Invalid Password"
      // )
      .required("Password is required"),
  });

  const WithMaterialUI = () => {
    const userData = useAppSelector(selectEmailPassword);

    const [emailValid, setEmailValid] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
   
    const [isLoggedIn, setLoggedIn] = useState(false);

    const [loginUser, { isLoading: isLoadingUser }] = useLoginMutation();

    const [isFill, setFill] = React.useState(userData!==null?true:false);
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const validate = (values) => {
      const errors = {};
      if (!values.email) {
        setEmailValid(false);
        errors.email = "Email is Required";
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)
      ) {
        setEmailValid(false);
        errors.email = "Invalid email address";
      }

      return errors;
    };

    const formik = useFormik({
      initialValues:
        userData !== null
          ? { email: userData?.email, password: userData?.password }
          : {},
      validationSchema: validationSchema,
      validate: validate,
      onSubmit: async (values) => {
        try {
          const userResponse = await loginUser(values).unwrap();

          if (userResponse?.status === 200 && userResponse?.success) {
            const { data } = userResponse;
            const { token, user_id, roleId } = data.userInfo;

            // Construct user object with roleType based on roleId
            const user = {
              token,
              user_id,
              email: values?.email,
              userType:
                roleId === 1
                  ? "Admin"
                  : roleId === 16
                  ? "CXO Engineer"
                  : "Device Engineer",
            };

            const emailPassword = {
              email: values?.email,
              password: values?.password,
            };

            if(isFill){
              dispatch(setEmailPassword({ emailPassword }));
            }else{
              localStorage.removeItem(LOCALAUTH.EMAIL_PASSWORD);
             
            }

          

            // Check for nextPage value and handle accordingly
            if (data.nextPage === "reset_pswd") {
              props?.getUserEmail(values?.email);
              props.handleSetActiveWindow("verification");
            } else {
              // Dispatch actions to Redux store
              dispatch(setCredentials({ user, token }));
              dispatch(setOnboard(data));

              setLoggedIn(true);
              toast.success(userResponse?.message);
            }
          } else {
            toast.error(userResponse?.message || "Login failed");
          }
        } catch (err) {
          console.error("Login error:", err);
          toast.error(
            err?.data?.message || err?.message || "An error occurred"
          );
        }
      },
    });

    useEffect(() => {
      if (isLoggedIn) {
        navigate(ROUTES.DASHBOARD, { replace: true });
        setLoggedIn(false);
      }
    }, [isLoggedIn]);

    const checkHandler = (e) => {
      setFill(e.currentTarget.checked)
     
    };

    return (
      <div className="justify-center">
        <form onSubmit={formik.handleSubmit}>
          <div className="registerForm ">
            <TextField
              id="email"
              name="email"
              placeholder="Enter Email"
              type="email"
              variant="standard"
              onChange={formik.handleChange}
              onBlurCapture={formik.handleBlur}
              // onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MAIL fontSize="0.9em" />
                  </InputAdornment>
                ),
                style: { fontSize: "0.8em", padding: "5px" },
              }}
              style={{ marginBottom: "5%" }}
            />
            <TextField
              id="password"
              name="password"
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.values.password && Boolean(formik.errors.password)}
              helperText={formik.values.password && formik.errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IV_LOCK fontSize="0.9em" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={handleClickShowPassword}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? (
                      <VisibilityIcon fontSize="1em" />
                    ) : (
                      <VisibilityOffIcon fontSize="1em" />
                    )}
                  </InputAdornment>
                ),
                style: { fontSize: "0.8em", padding: "5px" },
              }}
              style={{ marginBottom: "2%" }}
            />
            <div className="w-full mt-2">
              
                <label  className="flax gap-2">
                  <input type="checkbox" checked={isFill}  onClick={checkHandler}/>
                  <span className=" font-poppins_cf text-xs text-theme-grey items-top text-center ml-2 mb-1">Remember me</span>
                </label>
             
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                fontSize: "0.8em",
                marginBottom: "1em",
              }}
            >
              {/* <Link onClick={() => handleVerification('reset')} style={{ color: '#EC1944', marginBottom: '10px', textAlign: 'right' }} >Reset Password</Link> */}
              <div
                className="flex cursor-pointer justify-center pb-2 font-poppins_cf font-normal text-[#EC1944]  underline"
                onClick={() => props.handleSetActiveWindow("forget")}
              >
                Forgot Your Password?
              </div>
            </div>
            <Button
              type="submit"
              style={{
                background: "#EC1944",
                textTransform: "none",
                marginBottom: "5px",
                opacity:
                  !formik.isValid || formik.isSubmitting 
                    ? 0.6
                    : 1,
                color: "white",
              }}
              disabled={!formik.isValid || formik.isSubmitting }
              variant="contained"
            >
              {isLoadingUser ? (
                <>
                  <div className="mr-2">Loading.....</div>
                  <CircleLoader className="ml-auto" />
                </>
              ) : (
                <>Login</>
              )}
            </Button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="card ">
      {/* <CardActionArea> */}
      <CardContent>
        <div className="pb-2 pl-3   font-poppins_cf text-xl font-medium ">
          Login
        </div>
        <div className="headerContent pb-2  font-poppins_cf text-xs font-normal text-theme-grey">
          Log in with your account to continue{" "}
        </div>
        <div className="justify-center">
          {" "}
          <WithMaterialUI />
        </div>
      </CardContent>
    </div>
  );
}
