import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import OtpInput from "react-otp-input";
import ReplayIcon from "@mui/icons-material/Replay";
import ToastService from "./Toast/ToastService";
import { useVerifyOtpMutation } from "../features/auth/authAPI";

const Base = styled.div`
  margin: 1em;
  h4 {
    font-size: 3em;
    font-weight: 700;
  }
  p {
    font-size: 1.25em;
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
      font-size: 1.15em;
    }
  }
  @media (max-width: 767px) {
    margin: 0.8em;
    padding-top: 1em;
    h4 {
      font-size: 2em;
    }
    p {
      font-size: 1em;
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
  const [timeLeft, setTimeLeft] = useState(60);
  const [resendCode, setResendCode] = useState(false);

  const { user } = props;
  const [verifyUser, { isLoading }] = useVerifyOtpMutation();

  useEffect(() => {
    if (timeLeft === 0) {
      setResendCode(true);
    }
    if (otp.length === 4) setOtpCompleted(true);
  }, [otp, timeLeft]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer); // Stop the timer when time reaches 0
          return 0;
        }
      });
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Format the time with leading zeros
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const checkOtpValidation = async () => {
    try {
      const userResponse = await verifyUser({
        email: user,
        otp: otp,
      }).unwrap();


      if (userResponse?.status === 200) {
      } else {
      }
    } catch (err) {
      console.error("Error during OTP verification:", err);
      ToastService.Toast("error", err?.data?.message || err.status, 3000);
      if (user[0]?.modalType === "register") {
        handleSetActiveWindow("verification");
      } else {
        handleSetActiveWindow("forget");
      }
    }
  };

  return (
    <Base>
      <div
        style={{
          padding: "0.3em",
          fontSize: "1.5em",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {"Verify Code"}
      </div>

      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "85%",
          marginLeft: "1em",
          textAlign: "center",
          paddingBottom: "2em",
          color: "#686868",
        }}
      >
        {"Please enter the verification code that we sent to your"}{" "}
        <span style={{ color: "#EC1944" }}>{props?.user[0]?.email || ""}</span>
      </div>
      <form className="form-control">
        <div>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: "40px", // Example CSS properties
              height: "40px",
              margin: "5px",
              fontSize: "20px",
              textAlign: "center",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div
          style={{
            color: "#EC1944",
            fontSize: "1em",
            margin: "2% 3%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {toastMsg}
        </div>
        <div style={{ display: "grid", margin: "1em 8em" }}>
          Resend {formattedTime}
          <ReplayIcon
            // onClick={fetchOtpData}
            style={{
              color: "#EC1944",
              marginLeft: "1.5em",
              opacity: !resendCode ? 0.6 : 1,
            }}
            disabled={!resendCode}
          />
        </div>
        <div className="form-action">
          <Button
            style={{
              background: "#EC1944",
              color: "white",
              width: "85%",
              opacity: !otpCompleted ? 0.6 : 1,
            }}
            onClick={checkOtpValidation}
            disabled={!otpCompleted || isLoading}
          >
            Continue
          </Button>
        </div>
      </form>
    </Base>
  );
};

export default VerifyCode;
