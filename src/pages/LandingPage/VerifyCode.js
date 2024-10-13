import { useEffect, useState } from "react";
import styled from "styled-components";
import OtpInput from "react-otp-input";
import ReplayIcon from "@mui/icons-material/Replay";
import {
  useVerifyOtpMutation,
  useForgetPasswordMutation,
} from "../../features/auth/authAPI";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IV_LOCK } from "../../assets/icons";
import { CircleLoader } from "../../components/Loader";

const Base = styled.div`
  margin: 1em;
  h4 {
    font-size: 3em;
    font-weight: 700;
  }
  p {
    font-size: 0.8em;
    color: #5a5a5b;
  }
  .form-action {
    margin: 7% 3%;
    display: flex;
    justify-content: center;
  }
  .text-clickable {
    cursor: pointer;
  }
  @media (min-width: 768px) and (max-width: 991px), (orientation: portrait) {
    margin: 1em;
    h4 {
      font-size: 2.5em;
    }
    p {
      font-size: 0.8em;
    }
  }
  @media (max-width: 767px) {
    margin: 0.8em;
    padding-top: 1em;
    h4 {
      font-size: 2em;
    }
    p {
      font-size: 0.8em;
    }
    .footer {
      margin-top: 0.5em !important;
    }
  }
`;

const VerifyCode = (props) => {
  const [toastMsg, setToastMsg] = useState("");
  const [otp, setOtp] = useState("");
  const [otpCompleted, setOtpCompleted] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [resendCode, setResendCode] = useState(false);
  const { handleSetActiveWindow, user } = props;
  const [verifyUser, { isLoading: isLoadingUser }] = useVerifyOtpMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgetPassword] = useForgetPasswordMutation();

  const validationSchema = yup.object({
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .max(40, "Password should be of maximum 40 characters length")
      .matches(/^\S*$/, "Password should not contain spaces")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain at least one letter, one number, and one special character"
      )
      .required("Password is required"),
    confpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  useEffect(() => {
    if (timeLeft === 0) {
      setResendCode(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const resetOtpTimer = () => {
    setTimeLeft(60);
    setResendCode(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const checkOtpValidation = async (values) => {
   
    try {
      const userResponse = await verifyUser({
        email: user,
        password: values.password,
        otp: otp,
      }).unwrap();

      if (userResponse?.status === 200) {
        setOtpCompleted(true);
        toast.success(userResponse?.message);
        props.handleSetActiveWindow("login");
      } else {
        toast.error(userResponse?.message);
      }
    } catch (err) {
      console.error("API error:", err);
      toast.error(err?.data?.message || err.status);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confpassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      checkOtpValidation(values);
    },
  });

  const handleResendOtp = async () => {
    const payload = {
      email: user,
    };
    try {
      const response = await forgetPassword(payload).unwrap();
      if (response?.status === 200) {
        resetOtpTimer();
        setOtp("");
        toast.success(response?.message);
        props?.getUserEmail(payload?.email);
        props.handleSetActiveWindow("verification");
      } else {
        toast.error(response?.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.status);
    }
  };

  return (
    <Base>
      {!otpCompleted && (
        <>
          <div className="text-center font-poppins_cf text-xl font-medium  text-theme-black">
            Verify Code
          </div>

          <div className="mx-auto w-4/5 py-2 text-center font-poppins_cf text-xs font-normal text-theme-grey">
            Please enter the verification code that we sent to your{" "}
            <span className="text-theme-dark">{props?.user || ""}</span>
          </div>
        </>
      )}

      <form
        className="form-control flex flex-col items-center p-5 pb-0 pt-2"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={formik.handleSubmit}
      >
        {!otpCompleted && (
          <>
            <div className="flex justify-center">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span></span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "40px",
                  height: "40px",
                  margin: "5px",
                  fontSize: "20px",
                  textAlign: "center",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div className="text-bas py-2 text-center text-theme-dark">
              {toastMsg}
            </div>
            <div className="grid pb-2 font-poppins_cf text-xs font-normal text-theme-grey">
              {resendCode ? (
                <div className="flex flex-col items-center justify-center ">
                  Resend{" "}
                  <ReplayIcon
                    className="cursor-pointer"
                    onClick={handleResendOtp}
                    style={{
                      color: "#EC1944",
                    }}
                  />
                </div>
              ) : (
                <div>{formattedTime}</div>
              )}
            </div>
          </>
        )}

        <div className="flex w-full flex-col ">
          <div className="pb-3 font-poppins_cf text-base font-medium">
            Reset Password
          </div>
          <TextField
            id="password"
            name="password"
            placeholder="New Password"
            type={showPassword ? "text" : "password"}
            variant="standard"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IV_LOCK fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={handleClickShowPassword}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? (
                    <VisibilityIcon fontSize="small" />
                  ) : (
                    <VisibilityOffIcon fontSize="small" />
                  )}
                </InputAdornment>
              ),
              style: {
                fontSize: "0.8em",
                borderBottom: "1px solid #E5E5E5",
                padding: "10px",
              },
            }}
            style={{ marginBottom: "1%", width: "100%" }}
          />

          <TextField
            id="confpassword"
            name="confpassword"
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="standard"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confpassword}
            error={
              formik.touched.confpassword && Boolean(formik.errors.confpassword)
            }
            helperText={
              formik.touched.confpassword && formik.errors.confpassword
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IV_LOCK fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={handleClickShowConfirmPassword}
                  style={{ cursor: "pointer" }}
                >
                  {showConfirmPassword ? (
                    <VisibilityIcon fontSize="small" />
                  ) : (
                    <VisibilityOffIcon fontSize="small" />
                  )}
                </InputAdornment>
              ),
              style: {
                fontSize: "0.8em",
                borderBottom: "1px solid #E5E5E5",
                padding: "10px",
              },
            }}
            style={{ marginBottom: "6%", width: "100%" }}
          />
        </div>

        <div className="w-full cursor-pointer">
          <Button
            type="submit"
            fullWidth
            style={{
              background: "#EC1944",
              marginBottom: "10px",
              marginTop: "1em",
              textTransform: "none",
              cursor: "pointer",
              opacity:
                !formik.isValid || formik.isSubmitting || !formik.dirty
                  ? 0.6
                  : 1,
              color: "white",
            }}
            variant="contained"
          >
            {isLoadingUser ? (
              <>
                <div className="mr-2">Loading.....</div>
                <CircleLoader className="ml-auto" />
              </>
            ) : (
              <>{otpCompleted ? "Reset Password" : "Continue"}</>
            )}
          </Button>
        </div>
      </form>
    </Base>
  );
};

export default VerifyCode;
