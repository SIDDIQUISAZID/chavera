import { useState,useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";




import DeleteTestCaseModal from "./DeleteTestCaseModal";
import AppModal from "../../components/Modal/AppModal";


const CommandCard = ({
  title,
  duration,
  iteration,
  delay,
  device,
  paramsInfo,
}) => {
  let parsedParams = null;


  // Check if paramsInfo is a valid JSON string before parsing
  try {
    parsedParams = paramsInfo ? JSON.parse(paramsInfo) : null;
  } catch (error) {
    console.log("Invalid paramsInfo JSON", error);
  }


  // Define necessary keys for each command title
  const commandKeysMapping = {
    "MO-MT Call": [],
    "Conference Call (5+1)": [],
    "MO-MT SMS": ["message_text"],
    "RCS SMS": ["message_text"], // No parameters to show
    "Throughput IPerf": [
      "throughput_hostname",
      "throughput_port",
      "throughput_direction",
      "throughput_protocol",
      "throughput_bitrate",

    ],
    "Throughput Http": [
      "throughput_hostname",
      "throughput_port",
      "throughput_direction",
      "throughput_protocol",
      "throughput_username",
      "throughput_password",
    ],
    "Throughput Ftp": [
      "throughput_hostname",
      // "throughput_port",
      "throughput_direction",
      // "throughput_protocol",
      "throughput_username",
      "throughput_password",
    ],
    "RCS Message With File": [],
    "MO-MT Video Call": [],
    "Register IMS": [],
    "De-Register IMS": ["tcDevicesRequired"],
    "Call Forwarding": ["tcDevicesRequired"],
    "Call Waiting": [],
    "MO-MT WiFi Call": ["tcDevicesRequired"],
    "Enable Wifi Calling": ["tcDevicesRequired"],
    "Disable Wifi Calling": ["tcDevicesRequired"],
    "Verify Contacts": ["contact_number"],
    "HTTP Browsing": ["tcDevicesRequired"],
    Delay: [], // No parameters to show
    "MO-MT Facetime Video Call": ["tcDevicesRequired"],
  };

  // Get the keys for the current command title
  const necessaryKeys = commandKeysMapping[title] || [];

  return (
    <div className=" gap-4">
      <h3 className="mb-2 font-poppins_cf text-xs font-medium">{title}</h3>
      <div className="flex flex-col space-y-2 ">
        {/* Duration */}
        <div className="flex w-fit items-center justify-center gap-1 rounded-[8px] border-[1px] px-4 border-[#E5E5E5] py-1">
          <div className="font-poppins_cf text-[10px] font-normal text-[#666666]">
            Duration (s)
          </div>
          <div className="font-poppins_cf text-[10px] font-normal text-[#666666]">
            -
          </div>
          <div className="font-poppins_cf text-[10px] font-semibold text-[#666666]">
            {duration}
          </div>
        </div>

        {/* Iteration */}
        <div className="flex w-fit items-center justify-center gap-1 rounded-[8px] border-[1px] border-[#E5E5E5] px-4 py-1">
          <div className="font-poppins_cf text-[10px] font-normal text-[#666666]">
            Iteration
          </div>
          <div className="font-poppins_cf text-[10px] font-normal text-[#666666]">
            -
          </div>
          <div className="font-poppins_cf text-[10px] font-semibold text-[#666666]">
            {iteration}
          </div>
        </div>

        {/* Delay */}
        <div className="flex w-fit items-center justify-center gap-1 rounded-[8px] border-[1px] border-[#E5E5E5] px-4 py-1">
          <div className="font-poppins_cf text-[10px] font-normal text-[#666666]">
            Delay (s)
          </div>
          <div className="font-poppins_cf text-[10px] font-normal text-[#666666]">
            -
          </div>
          <div className="font-poppins_cf text-[10px] font-semibold text-[#666666]">
            {delay}
          </div>
        </div>

        {/* Device Required */}
        <div className="flex w-fit items-center justify-center gap-1 rounded-[8px] border-[1px] border-[#E5E5E5] px-4 py-1">
          <div className="font-poppins_cf text-[10px] font-normal text-[#666666]">
            Device Required
          </div>
          <div className="font-poppins_cf text-[10px] font-normal text-[#666666]">
            -
          </div>
          <div className="font-poppins_cf text-[10px] font-semibold text-[#666666]">
            {device}
          </div>
        </div>

        {/* Conditionally render the paramsInfo section if it exists and has keys to show */}
        {parsedParams && Object.keys(parsedParams).length > 0 && (
          <div className="mt-2 grid grid-cols-2 gap-2">
            {Object.entries(parsedParams)
              .filter(([key]) => necessaryKeys.includes(key)) // Filter based on necessary keys
              .map(([key, value]) => (
                <div
                  key={key}
                  className="border-[1px] flex w-fit items-center justify-center gap-1 rounded-[8px] border-[#DADAFF] bg-[#FAF1DD] px-4 py-1"
                >
                  <div className="font-poppins_cf text-[10px] font-normal text-[#666666]">
                    {key.replace(/_/g, " ")}
                  </div>
                  <div className="font-poppins_cf text-[10px] font-normal text-[#666666]">
                    -
                  </div>
                  {value  ?<div className="font-poppins_cf text-[10px] font-semibold text-[#666666]">
                    {value}
                  </div>:<div className="font-poppins_cf text-[10px] font-semibold text-[#666666]">
                    No value
                  </div>}
                  
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

// TestPlanDetails Component
const TestPlanDetails = () => {
  const location = useLocation();
  const { testCaseDetails,from } = location.state || {}; // Accessing the passed state
  const [deviceRequired, setDeviceRequired] = useState(
    testCaseDetails?.tcDevicesRequired || 8
  ); // Default to 8 if not available
  const navigate = useNavigate();
  const [isDelete, setDelete] = useState(false);

  const handleEdit = () => {
    navigate(`/testCaseHub/testCaseList/edit-test-cases`, {
      state: { item: testCaseDetails },
    });
  };


  const handleBack=()=>{
    navigate(-1);
  }

  const groupCommandsByOrderNo = (commands) => {
    return commands?.reduce((acc, command) => {
      if (!acc[command?.commandOrderNo]) {
        acc[command?.commandOrderNo] = [];
      }
      acc[command?.commandOrderNo].push(command);
      return acc;
    }, {});
  };

  const groupedCommands = groupCommandsByOrderNo(testCaseDetails?.commands);


  const handleLogoutModalClose = useCallback(() => {
    setDelete(false);
    navigate(-1);
   
  }, []);


  const onDeleteCancel = useCallback(() => {
    setDelete(false);
  
  }, []);

  return (
    <div className="w-full h-fit rounded-md p-2">
      <div className="flex items-center justify-between gap-2">
        <div className=" flex  align-bottom items-baseline justify-center gap-1">

        <div className=" text-theme-black text-xl font-poppins_cf ">
        {testCaseDetails?.tcName}
          </div>
        
          <div className="text-xs text-theme-dark font-poppins_cf ">
            {" "}
            (Test Case Id:{testCaseDetails?.tcTestcaseId})
          </div>
        </div>

        <Button
          variant="contained"
          size="small"
          color="primary"
          style={{
            backgroundColor: "#EC1944",
            color: "white",
            padding: "6px",
            paddingLeft:"10px",
           
            paddingRight:'10px'
          }}
          sx={{
            textTransform: "none",
            fontSize: "12px",
            fontWeight: "400",
           
          }}
          startIcon={<ArrowBack />}
         onClick={()=>handleBack()}
        >
          Back
        </Button>
      </div>

      {/* Test Case Description Section */}
      <div className="mb-6 mt-4 bg-white p-4">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="mb-2 font-poppins_cf text-lg font-medium text-theme-black">
              Test Case Description
            </h2>
            <p className="mb-4 font-poppins_w text-xs font-normal text-theme-grey">
              {testCaseDetails?.tcDescription || "No description available"}
            </p>
          </div>

          {/* Device Required Section */}
          <div className="mb-4 flex w-fit items-center justify-center rounded-[4px] border border-[#FFD6DD] bg-[#F6ECEC] p-2">
            <span className="p-2 font-poppins_cf text-xs font-medium text-theme-black">
              Device Required
            </span>
            <span className="rounded-[4px] bg-[#FF6F2B] px-4 py-1 font-poppins_cf  text-xs font-medium text-white">
              {deviceRequired}
            </span>
          </div>
        </div>

        {/* Commands Section */}
        <h2 className="mb-4 bg-[#FFE9ED] p-2 font-poppins_cf text-lg font-medium text-theme-black">
          Commands
        </h2>

        {/* Command List */}
        <div>
          {testCaseDetails?.commands?.length > 0 &&
            Object.keys(groupedCommands).map((orderNo) => (
              <div
                key={orderNo}
                className="mb-4 flex gap-8 border-t border-gray-300 p-4"
              >
                {groupedCommands[orderNo]?.map((command, index) => (
                  <CommandCard
                    key={index}
                    title={command.commandName}
                    duration={command.commandIterationDuration}
                    iteration={command.commandIteration}
                    delay={command.commandIterationDelay}
                    device={command.commandDevicesRequired}
                    paramsInfo={command.commandParamInfo}
                  />
                ))}
              </div>
            ))}
        </div>

        {/* Action Buttons */}

        {/* {from!==undefined &&
        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            title="Edit Test Case"
            className="w-[90px] cursor-pointer rounded-md border-[1px] bg-white py-2 text-xs font-normal text-theme-black"
            onClick={handleEdit}
            
          >
            Edit
          </button>
          <button
            type="button"
            onClick={()=> setDelete(true)}
            title="Complete Test Case"
            className="w-[90px] cursor-pointer rounded-md bg-theme-dark py-2 text-xs font-normal text-theme-white"
          >
            Delete
          </button>
        </div>} */}


        <AppModal show={isDelete}>
        <DeleteTestCaseModal
          onDeleteSuccess={handleLogoutModalClose}
          testCaseItem={testCaseDetails}
          onDeleteCancel={onDeleteCancel}
        />
      </AppModal>
      </div>
    </div>
  );
};

export default TestPlanDetails;
