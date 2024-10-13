import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { setOpenCurrentModal } from "../../features/modalManager";
import * as yup from "yup";
import "../../css/TestCase.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const devices = ["Samsung", "One Plus", "MI", "Micromax"];

const initialValues = {};

export default function ExecuteTestcase() {
  const [testCaseId, setTestCaseId] = useState("50");
  const [executionTime, setExecutionTime] = useState("20");
  const [dut, setDut] = useState(1);
  const dispatch = useDispatch();

  const handleButtonClick = (buttonLabel) => {
    dispatch(setOpenCurrentModal(buttonLabel));
  };

  const handleCloseModal = () => {
    dispatch(setOpenCurrentModal(""));
  };

  const validationSchema = yup.object({
    iteration: yup
      .string("")
      .required("")
      .matches(/^[0-9\s]*$/, "Only numeric values allowed")
      .min(1, "Iteration can not be 0 "),
    buffer: yup
      .string("")
      .required("")
      .matches(/^[0-9\s]*$/, "Only numeric values allowed")
      .min(1, "Buffer can not be 0 "),
  });

  const handleSubmit = (values) => {
    handleButtonClick("Checking Prerequisites");
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
  });
  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="crossIconContainer">
            <button className="crossItconButton" onClick={handleCloseModal}>
              <CloseOutlinedIcon />
            </button>
          </div>
          <Formik initialValues={initialValues}>
            <>
              <div style={{ borderRadius: 0 }}>
                <div className="testCaseHeading">Execute Testcase</div>
                <div className="testCaseheader">
                  <div className="testCaseId">TP-{testCaseId}</div>
                  <div className="executionTime">
                    Expected Execution Time: {executionTime}min
                  </div>
                </div>
                <div className="availableDevice">
                  Select DUT from Available Devices
                </div>
                <Form>
                  <div className="testCaseFormContainer">
                    <div className="dutNumber">Required No. of DUT : {dut}</div>

                    <div className="testCaseForm">
                      <div className="formFieldContainer">
                        <div className="testCaseInputContainer">
                          <label className="inputLable">TimeStamp(UTC)</label>
                          <input
                            className={"inputFields"}
                            type="text"
                            name="imei1"
                            id="imei1"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            minLength="15"
                            maxLength="15"
                            defaultValue={"2024-01-24 11:55"}
                          />
                        </div>
                        <div className="testCaseInputContainer">
                          <label className="inputLable">Iteration</label>
                          <input
                            className="inputFields"
                            type="text"
                            name="iteration"
                            id="iteration"
                            value={formik.values.iteration}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            minLength="1"
                          />
                          {formik.errors.iteration &&
                            formik.values.iteration && (
                              <span className="errorText">
                                {formik.errors.iteration}
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="formFieldContainer">
                        <div className="testCaseInputContainer">
                          <label className="inputLable">Buffer (Min)</label>
                          <input
                          className="inputFields"
                            type="text"
                            name="buffer"
                            id="buffer"
                            value={formik.values.buffer}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            minLength="1"
                          />
                          {formik.errors.buffer && formik.values.buffer && (
                            <span className="errorText">
                              {formik.errors.buffer}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {Array.from({ length: dut }, (_, index) => (
                      <div className="formFieldContainer" key={index}>
                        <div className="testCaseInputContainer">
                          <label className="inputLable">
                            Device {index + 1}
                          </label>
                          <select
                            className="selectField"
                            name={`device${index + 1}`}
                            id={`device${index + 1}`}
                            value={formik.values[`device${index + 1}`]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          >
                            {devices.map((val, key) => {
                              return (
                                <option className="optionValue" value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </Form>
              </div>
              <div className="actionButtonContainer">
                <button
                  className="cancleButton"
                  type="submit"
                  onClick={() => {
                    handleCloseModal();
                  }}
                >
                  Cancel
                </button>
                <Button
                  className="saveButton"
                  onClick={() => {
                    handleSubmit(formik.values);
                  }}
                  sx={{
                    textTransform: "none",
                    opacity: !(formik.dirty && formik.isValid) ? 0.6 : 1,
                    "&:hover": { backgroundColor: "rgba(236, 25, 68, 1)" },
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  Ok
                </Button>
              </div>
            </>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
