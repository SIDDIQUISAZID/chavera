import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { TestGraph } from "./TestGraph";
import TestList from "./TestList";

const TestResult = () => {
  const [selectedResult, setSelectedResult] = useState("Testcase Result");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleResultChange = (event) => {
    setSelectedResult(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <div style={{ fontSize:'22px' }}>Test Result Hub</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <RadioGroup
            aria-label="result"
            name="result"
            value={selectedResult}
            onChange={handleResultChange}
            row
          >
            {["Testcase Result", "Test Plan Result", "Device Result"].map(
              (label) => (
                <FormControlLabel
                  key={label}
                  value={label}
                  control={
                    <Radio
                      sx={{
                        color: "#EC1944",
                        "&.Mui-checked": { color: "#EC1944" },
                      }}
                    />
                  }
                  label={label}
                />
              )
            )}
          </RadioGroup>

          <TextField
            id="date"
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={(e) => handleDateChange(new Date(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ marginLeft: "8px" }}
          />
          <Button
            variant="contained"
            size="small"
            color="primary"
            sx={{
              backgroundColor: "#EC1944",
              color: "white",
              marginLeft: "8px",
              textTransform: "none",
            }}
            //   onClick={() => handleAddUserClick("userCreation")}
          >
            Download Summary
          </Button>
        </div>
      </Toolbar>
      <TestGraph />
      <TestList />
    </>
  );
};

export default TestResult;
