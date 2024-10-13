import * as React from "react";
import TextField from "@mui/material/TextField";
import { Box, Grid, Stack, Button, Input } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import "../../css/addtestCase.css";
import { makeStyles } from "@mui/styles";
import { TesterRoles  } from "../../roles/roles";

export default function TestCaseAdd(props) {
  const validationSchema = yup.object({
    role: yup.string().required("Role is required"),
    name: yup
      .string("Enter your name")
      .required("Name is required")
      .max(40, "Name must be at most 40 characters")
      .matches(
        /^[a-zA-Z\s]*$/,
        "Numeric values or non-alphabetic characters are not allowed"
      ),
  });

  const useStyles = makeStyles((theme) => ({
    textField: {
      "& input:focus": {
        backgroundColor: "transparent", // Override the background color on focus
        outline: "none !important", // Remove the default focus outline
        boxShadow: "none !important", // Remove the default focus boxShadow
        borderColor: "none !important", // Override the border color
      },
    },
  }));

  const WithMaterialUI = () => {
    const [formValues, setFormValues] = React.useState({});
    const classes = useStyles();
    const formik = useFormik({
      initialValues: { name: "" },
      validationSchema: validationSchema,
      //   validateOnBlur: true,
      //  validateOnChange: true,
      onSubmit: async (values) => {
      },
    });

    return (
      <form onSubmit={formik.handleSubmit}>
        <div
          style={{
            boxShadow:
              "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            paddingBottom: "25px",
            paddingRight: "25px",
          }}
        >
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <label className="inputLable">User Name</label>{" "}
                <span style={{ color: "#EC1944", margin: "-4px" }}>*</span>
                <Stack>
                  <TextField
                    className={classes.textField}
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                    type="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    error={formik.values.name && Boolean(formik.errors.name)}
                    helperText={formik.values.name && formik.errors.name}
                    InputProps={{
                      style: { fontSize: "0.9rem" },
                    }}
                    style={{ marginBottom: "3%" }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <label className="inputLable">Role</label>{" "}
                <span style={{ color: "#EC1944", margin: "-4px" }}>*</span>
                <Stack>
                  <select
                    className="selectField"
                    value={formik.values.role}
                    name="role"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.values.role && Boolean(formik.errors.role)}
                    style={{
                      height: "30px",
                      fontSize: "0.8rem",
                      borderColor: "#E5E5E5",
                    }}
                  >
                    <option
                      style={{ fontSize: "0.9rem", color: "#606060" }}
                      val={""}
                    >
                      {"Select Role"}{" "}
                    </option>
                    {TesterRoles.map((val, key) => {
                      return (
                        <option
                          style={{
                            fontSize: "0.9rem",
                            lineHeight: "1.5",
                            color: "rgba(0, 0, 0, 0.6)",
                          }}
                          value={val}
                        >
                          {val}
                        </option>
                      );
                    })}
                  </select>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
          { <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <label className="inputLable"> Test Case Name</label>{" "}
                <span style={{ color: "#EC1944", margin: "-4px" }}>*</span>
                <Stack>
                  <TextField
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="testCaseName"
                    fullWidth
                    id="fullWidth"
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <label className="inputLable">Category</label>{" "}
                <span style={{ color: "#EC1944", margin: "-4px" }}>*</span>
                <Stack>
                  <select
                    className="selectField"
                    value={formik.values.category}
                    name="category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.values.Category && Boolean(formik.errors.Category)
                    }
                    style={{ height: "30px", fontSize: "0.9rem" }}
                  >
                    <option
                      style={{ fontSize: "0.9em", color: "#606060" }}
                      val={""}
                    >
                      {"Select Category"}{" "}
                    </option>
                    {TesterRoles.map((val, key) => {
                      return (
                        <option
                          style={{
                            fontSize: "0.9rem",
                            lineHeight: "1.5",
                            color: "#606060",
                          }}
                          value={val}
                        >
                          {val}
                        </option>
                      );
                    })}
                  </select>
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <label className="inputLable">Est. time</label>{" "}
                <span style={{ color: "#EC1944", margin: "-4px" }}>*</span>
                <Stack>
                  <TextField
                    id="time"
                    name="estTime"
                    placeholder="Enter EST Time"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.estTime}
                    error={
                      formik.values.estTime && Boolean(formik.errors.estTime)
                    }
                    helperText={formik.values.estTime && formik.errors.estTime}
                    InputProps={{
                      style: { fontSize: "0.9rem" },
                    }}
                    style={{ marginBottom: "3%" }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <label className="inputLable">No. of UE</label>{" "}
                <span style={{ color: "#EC1944", margin: "-4px" }}>*</span>
                <Stack>
                  <TextField
                    id="noUe"
                    name="noUe"
                    placeholder="Enter No Of UE"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.noUe}
                    error={formik.values.noUe && Boolean(formik.errors.noUe)}
                    helperText={formik.values.noUe && formik.errors.noUe}
                    InputProps={{
                      style: { fontSize: "0.9rem" },
                    }}
                    style={{ marginBottom: "3%" }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Stack>}

          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label className="inputLable"> Test Case Description</label>{" "}
                <span style={{ color: "#EC1944", margin: "-4px" }}>*</span>
                <Stack>
                  <TextareaAutosize
                    placeholder="Test Case Description"
                    name="testCaseDesc"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ width: "100%" }} // Adjust width as needed
                    minRows={3} // Minimum number of rows
                    maxRows={10} // Maximum number of rows
                    // Handle onChange event
                  />
                </Stack>
              </Grid>
            </Grid>
          </Stack>

          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <label className="inputLable">Platform</label>{" "}
                <span style={{ color: "#EC1944", margin: "-4px" }}>*</span>
                <Stack>
                  <select
                    className="selectField"
                    value={formik.values.platform}
                    name="platform"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.values.role && Boolean(formik.errors.role)}
                    style={{ height: "30px", fontSize: "0.9rem" }}
                  >
                    <option
                      style={{ fontSize: "1em", color: "#606060" }}
                      val={""}
                    >
                      {"Select Platform"}{" "}
                    </option>
                    {["IOS", "Android"].map((val, key) => {
                      return (
                        <option
                          style={{
                            fontSize: "0.9rem",
                            lineHeight: "1.5",
                            color: "rgba(0, 0, 0, 0.6)",
                          }}
                          value={val}
                        >
                          {val}
                        </option>
                      );
                    })}
                  </select>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <label className="inputLable">Feature</label>{" "}
                <span style={{ color: "#EC1944", margin: "-4px" }}>*</span>
                <Stack>
                  <select
                    className="selectField"
                    value={formik.values.feature}
                    name="feature"
                    onChange={(e) => {
                      formik.handleChange(e); // Handle change using Formik
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        [e.target.name]: e.target.value, // Update state with new value
                      }));
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.values.feature && Boolean(formik.errors.feature)
                    }
                    style={{ height: "30px", fontSize: "0.9rem" }}
                  >
                    <option
                      style={{ fontSize: "1em", color: "#606060" }}
                      val={""}
                    >
                      {"Select feature"}{" "}
                    </option>
                    {[
                      "FTP Check Connection",
                      "FTP -File Upload",
                      "FTP- File Download",
                      "Check Battery Percentage",
                      "Check Temperature/Voltage",
                    ].map((val, key) => {
                      return (
                        <option
                          style={{
                            fontSize: "0.9rem",
                            lineHeight: "1.5",
                            color: "rgba(0, 0, 0, 0.6)",
                          }}
                          value={val}
                        >
                          {val}
                        </option>
                      );
                    })}
                  </select>
                </Stack>
              </Grid>
            </Grid>
          </Stack>

          {formik.values.feature && formik.values.feature.includes('FTP') && <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <label className="inputLable">Server URL</label>{" "}
                <span style={{ color: "#EC1944", margin: "-4px" }}>*</span>
                <Stack>
                  <TextField
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="serverUrl"
                    InputProps={{
                      style: { fontSize: "0.9rem" },
                    }}
                    fullWidth
                    id="fullWidth"
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <label className="inputLable">Port</label>{" "}
                <span style={{ color: "#EC1944", margin: "-4px" }}>*</span>
                <Stack>
                  <TextField
                    id="port"
                    name="port"
                    placeholder="Enter Port No"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.estTime}
                    error={
                      formik.values.estTime && Boolean(formik.errors.estTime)
                    }
                    helperText={formik.values.estTime && formik.errors.estTime}
                    InputProps={{
                      style: { fontSize: "0.9rem" },
                    }}
                    style={{ marginBottom: "3%" }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <label className="inputLable">User Name</label>{" "}
                <span style={{ color: "#EC1944", margin: "-4px" }}>*</span>
                <Stack>
                  <TextField
                    id="uName"
                    name="uName"
                    placeholder="Enter User Name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.uName}
                    error={formik.values.uName && Boolean(formik.errors.uName)}
                    helperText={formik.values.uName && formik.errors.uName}
                    InputProps={{
                      style: { fontSize: "0.9rem" },
                    }}
                    style={{ marginBottom: "3%" }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <label className="inputLable">Password</label>{" "}
                <span style={{ color: "#EC1944", margin: "-4px" }}>*</span>
                <Stack>
                  <TextField
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={
                      formik.values.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.values.password && formik.errors.password
                    }
                    InputProps={{
                      style: { fontSize: "0.9rem" },
                    }}
                    style={{ marginBottom: "3%" }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Stack>}

          {formik.values.feature && formik.values.feature.includes('Upload') && <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label className="inputLable">File Upload</label>{" "}
                <span style={{ color: "#EC1944", margin: "-4px" }}>*</span>
                <Stack>
                  <Input
                    className={classes.textField}
                    id="file"
                    name="file"
                    placeholder="UPload a File"
                    type="file"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.file}
                    error={formik.values.file && Boolean(formik.errors.file)}
                    helperText={formik.values.file && formik.errors.file}
                    InputProps={{
                      style: { fontSize: "0.9rem" },
                    }}
                    style={{ marginBottom: "3%" }}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Stack>}

         {formik.values.feature && formik.values.feature.includes('Download') && <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <label className="inputLable">File Path</label>{" "}
                <span style={{ color: "#EC1944", margin: "-4px" }}>*</span>
                <Stack>
                  <TextField
                    placeholder="Test Case Description"
                    name="filePath"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{ width: "100%" }} // Adjust width as needed
                    // Maximum number of rows
                    // Handle onChange event
                  />
                </Stack>
              </Grid>
            </Grid>
          </Stack>}
        </div>

        <div className="buttonContainer">
          <Button
            className="saveButton"
            type="submit"
            sx={{
              opacity: !(formik.dirty && formik.isValid) ? 0.6 : 1,
              "&:hover": { backgroundColor: "rgba(236, 25, 68, 1)" },
            }}
            variant="contained"
            color="primary"
            disabled={!(formik.dirty && formik.isValid)}
          >
            Add
          </Button>
        </div>
      </form>
    );
  };

  return (
    <>
      <div className="header">Add TestCase</div>
      <WithMaterialUI />
    </>
  );
}
