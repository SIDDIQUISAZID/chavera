import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CardContent from "@mui/material/CardContent";
import { Button, CardActions, FormLabel } from "@mui/material";
import { useFormik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { emailExistsUrl, sendOtp, regUser } from "../EndPoints";
import "../css/register.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { roles } from "../roles/roles";
import { Api } from "./Api";
import ToastService from './Toast/ToastService';

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function Register(props) {
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
    role: yup.string().required("Role is required"),
    password: yup
      .string("Enter your password")
      .required("Password is required")
      .min(8, "Password should be of minimum 8 characters length")
      .max(40, "Password should be of maximum 40 characters length")
      .matches(/^\S*$/, "Password should not contain spaces")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must contain at least one letter, one number and one special character"
      ),
    name: yup
      .string("Enter your name")
      .required("Name is required")
      .max(40, "Name must be at most 40 characters")
      .matches(
        /^[a-zA-Z\s]*$/,
        "Numeric values or non-alphabetic characters are not allowed"
      ),

    confpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const WithMaterialUI = () => {
    const [emailValid, setEmailValid] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
    const handleClickShowConfirmPassword = () => {
      setShowConfirmPassword(!showConfirmPassword);
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
      } else if (emailValid) {
        errors.email = "User Already Exists!";
      }
      if (values.password !== values.confpassword) {
        errors.confpassword = "Passwords do not match";
      }
      return errors;
    };
    const formik = useFormik({
      initialValues: { name: "" },
      validationSchema: validationSchema,
      validate: validate,
      //   validateOnBlur: true,
      //  validateOnChange: true,
      onSubmit: async (values) => {
        const outputData = {
          email: values.email,
          name: values.name,
          password: values.password,
          termsAndCondition: values.tc,
          roleType: values.role.replace(/\s+/g, ""), // Using the provided value of role
        };

        if (values.role === "Select Role") {
          formik.errors.role = "Role is Required";
        }
        let response = await Api.signUser(regUser, outputData);
                if (response.statusCode === 200) {
                 
                  response.data.modalType = "register"
                  let userData = response.data
                  props.getUserDetails(userData);  
                  props.handleSetActiveWindow('verification')   
                }
                else{
                   ToastService.Toast("error", `${response.message}`);
                }
      },
    });

    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="registerForm">
          <TextField
            id="name"
            name="name"
            placeholder="Enter Name"
            type="name"
            variant="standard"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.values.name && Boolean(formik.errors.name)}
            helperText={formik.values.name && formik.errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src="/img/profile.svg"
                    alt="profile"
                    style={{
                      height: "15px",
                      width: "15px",
                    }}
                  />
                </InputAdornment>
              ),
              style: { fontSize: "0.9em",color: "rgba(0, 0, 0, 0.6)", },
            }}
            style={{ marginBottom: "0.6em",font: 'inherit'}}
          />

          <TextField
            id="email"
            name="email"
            placeholder="Enter Email"
            type="email"
            variant="standard"
            onChange={formik.handleChange}
            onBlur={async () => {
              if (formik.values.email && !Boolean(formik.errors.email)) {
                let resEmail = await Api.checkEmailExists(
                  emailExistsUrl,
                  formik.values?.email.toLowerCase()
                );
                if (resEmail && resEmail.statusCode === 200) {
                  formik.errors.email = "User Already Exists!";
                  setEmailValid(true);
                } else {
                  setEmailValid(false);
                }
              }
            }}
            onBlurCapture={formik.handleBlur}
            error={formik.values.email && Boolean(formik.errors.email)}
            helperText={formik.values.email && formik.errors.email}
            value={formik.values.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src="/img/sms.svg"
                    alt="sms"
                    style={{
                      height: "15px",
                      width: "15px",
                    }}
                  />
                </InputAdornment>
              ),
              style: { fontSize: "0.9em",color: "rgba(0, 0, 0, 0.6)",},
            }}
            style={{ marginBottom: "0.6em",font: 'inherit' }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
              alignItems: "center",
            }}
          >
            <img
              src="/img/setting.svg"
              alt="sms"
              style={{
                height: "15px",
                width: "15px",
                marginLeft: "2%",
              }}
            />
            <select
              value={formik.values.role}
              name="role"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.values.role && Boolean(formik.errors.role)}
              style={{
                height: "30px",
                fontSize: "0.8em",
                border: "none",
                outline: "none", // Remove the outline
                color: "rgba(0, 0, 0, 0.6)",
                width: "92%",
                marginLeft: "1%",
                fontWeight: 500,
              
              }}
            >
              <option value="" disabled selected hidden style={{ display: "none" }}>
                Select User Role
              </option>
              
              {roles.map((val, key) => {
                return (
                  <option
                    style={{
                      fontSize: "0.9em",
                      lineHeight: "1.5",
                      color: "rgba(0, 0, 0, 0.6)",
                      font: 'inherit',
                    }}
                    value={val}
                  >
                    {val}
                  </option>
                );
              })}
            </select>
          </div>

          {formik.errors.role && formik.touched.role && (
            <div style={{ color: "#d32f2f", fontSize: "0.8em" }}>
              {formik.errors.role}
            </div>
          )}

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
                  <img
                    src="/img/lock.svg"
                    alt="profile"
                    style={{
                      height: "15px",
                      width: "15px",
                    }}
                  />
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
              style: { fontSize: "0.9em",color: "rgba(0, 0, 0, 0.6)", },
            }}
            style={{ marginBottom: "0.6em" ,marginTop: "0.6em",font: 'inherit'}}
          />
          {/* <div style= {{fontSize:'0.6em', color: 'rgba(0, 0, 0, 0.6)', marginBottom: '2%' ,}}> Password must contain at least one letter, one number, one special character, and be at least 8 characters long</div> */}
          <TextField
            id="password"
            name="confpassword"
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="standard"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confpassword}
            error={
              formik.values.confpassword && Boolean(formik.errors.confpassword)
            }
            helperText={
              formik.touched.confpassword && formik.errors.confpassword
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src="/img/lock.svg"
                    alt="profile"
                    style={{
                      height: "15px",
                      width: "15px",
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={handleClickShowConfirmPassword}
                  style={{ cursor: "pointer" }}
                >
                  {showConfirmPassword ? (
                    <VisibilityIcon fontSize="1em" />
                  ) : (
                    <VisibilityOffIcon fontSize="1em" />
                  )}
                </InputAdornment>
              ),
              style: { fontSize: "0.9em",color: "rgba(0, 0, 0, 0.6)", },
            }}
            style={{ marginBottom: "0.9em" ,font: 'inherit'}}
          />

          <div className="ckeckboxContain">
            <label class="checkboxContainer">
              <input
                type="checkbox"
                checked={formik.values.myCheckbox}
                id="myCheckbox"
                name="tc"
                onChange={(e) => formik.setFieldValue("tc", e.target.checked)}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.myCheckbox && Boolean(formik.errors.myCheckbox)
                }
                {...label}
              />
              <span class="checkmark"></span>
            </label>
            <div>
              <div className="checkboxText">
                By Signing up , you agree to our
              </div>
              <span className="checkboxSpan">
                Terms and Conditions
              </span>
            </div>
          </div>
          <Button
            type="submit"
            style={{
              background: "#EC1944",
              marginBottom: "10px",
              opacity:
                !formik.isValid || formik.isSubmitting || !formik.values.tc
                  ? 0.6
                  : 1,
              color: "white",
            }}
            disabled={
              !formik.isValid || formik.isSubmitting || !formik.values.tc
            }
            variant="contained"
          >
            Send OTP To Email
          </Button>
          <div style={{ fontSize: "0.8em" }}>
            {" "}
            Already have an Account?
            <span
              style={{
                color: "#EC1944",
                cursor: "pointer",
                textDecoration: "underline",
                marginLeft: "0.4em",
              }}
              onClick={() => {
                props.handleSetActiveWindow("login");
              }}
            >
              Login
            </span>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className="card">
      <CardContent>
        <div className="registerHeader">Create New Account</div>
        <div className="headerContent">Please fill details to continue</div>

        <WithMaterialUI />
      </CardContent>
      <CardActions></CardActions>
    </div>
  );
}
