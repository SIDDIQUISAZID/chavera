import { useState } from "react";
import {
  Button,
} from "@mui/material";

import * as Yup from "yup";
import { LeftArrow } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Input from "../../components/Input/Input";
import { Select } from "../../components/Select";
import { useCommonFilter } from "../../features/user/hooks";

import { getCommonData } from "../../features/user/utils/common";



const AddDevice = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { selectedAction, onCommonChange } = useCommonFilter();


  const { addDevice } = useParams();
  const navigate = useNavigate();


  

  const initialValues = {
    userRole: "",
    status: "",
    bucketName: "",
    fullName: "",
    email: "",
    password: "",
  };

 

  return (
    <>
      <div className="flex-cols  w-full">
        <div className="flex items-center">
          {(addDevice === "add-device" || addDevice === "edit-device") && (
            <LeftArrow
              onClick={() => goBack()}
              className="mr-2 cursor-pointer"
            />
          )}
          <div className=" flex font-poppins_cf text-[10px]">
            Device Hub <div className="mx-2">|</div>
            {addDevice === "edit-device" && (
              <div className="flex">
                {" "}
                <div>Device List</div> <div className="mx-2">|</div>
              </div>
            )}
            <div className="text-[10px] text-theme-dark">
              {addDevice !== "edit-device" ? "Add New Device" : "Edit Device"}
            </div>
          </div>
        </div>

        <div className="w-full flex-col">
          <div className="my-2 text-lg font-medium text-theme-black">
            {addDevice !== "edit-device" ? "Add New Device" : "Edit Device"}
          </div>

          <div className=" rounded-sm bg-white p-8 ">
            <div className="flex  w-1/2 gap-3">
              <Input
                name="patient"
                type="text"
                placeholder="Device ID"
                //value={searchTerm}
                onChange={() => {
                  // setSearchTerm(e.target.value)
                }}
                wrapperClass="mb-4 "
                onFocus={() => {
                  // if (!isOpen && patientList.length > 0) {
                  //     setIsOpen(true)
                  // }
                }}
                autoComplete="off"
                required
                wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
              >
                Device ID
              </Input>

              <Select
                options={getCommonData}
                value={selectedAction}
                onChange={(e) => {
                  //setPage(1)
                  onCommonChange(e);
                }}
                placeholder="SIM Inserted"
                clearable
                customLabel="SIM Inserted"
                wrapperAttr={{ className: "h-[35px]" }}
              />
            </div>

            <hr className="my-3" />

            <div className="mt-1 font-poppins_w text-sm text-black">
              Device Details
            </div>

            <div className="mt-8  flex  gap-3">
              <Input
                name="patient"
                type="text"
                placeholder="Enter User Name"
                //value={searchTerm}
                onChange={() => {
                  // setSearchTerm(e.target.value)
                }}
                wrapperClass="mb-4 "
                onFocus={() => {
                  // if (!isOpen && patientList.length > 0) {
                  //     setIsOpen(true)
                  // }
                }}
                autoComplete="off"
                required
                wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
              >
                IMEI 1
              </Input>

              <Input
                name="patient"
                type="text"
                placeholder="Enter User Name"
                //value={searchTerm}
                onChange={() => {
                  // setSearchTerm(e.target.value)
                }}
                wrapperClass="mb-4 "
                onFocus={() => {
                  // if (!isOpen && patientList.length > 0) {
                  //     setIsOpen(true)
                  // }
                }}
                autoComplete="off"
                required
                wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
              >
                Phone Number
              </Input>

              <Input
                name="patient"
                type="text"
                placeholder="Enter"
                //value={searchTerm}
                onChange={() => {
                  // setSearchTerm(e.target.value)
                }}
                wrapperClass="mb-4 "
                onFocus={() => {
                  // if (!isOpen && patientList.length > 0) {
                  //     setIsOpen(true)
                  // }
                }}
                autoComplete="off"
                required
                wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
              >
                Carrier Name 1
              </Input>
              <Input
                name="patient"
                type="text"
                placeholder="Enter"
                //value={searchTerm}
                onChange={() => {
                  // setSearchTerm(e.target.value)
                }}
                wrapperClass="mb-4 "
                onFocus={() => {
                  // if (!isOpen && patientList.length > 0) {
                  //     setIsOpen(true)
                  // }
                }}
                autoComplete="off"
                required
                wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
              >
                Device Network
              </Input>
            </div>

            <div className="my-6">
              <div className="w-1/4">
                <Input
                  name="patient"
                  type="text"
                  placeholder="yes"
                  //value={searchTerm}
                  onChange={() => {
                    // setSearchTerm(e.target.value)
                  }}
                  wrapperClass="mb-4 "
                  onFocus={() => {
                    // if (!isOpen && patientList.length > 0) {
                    //     setIsOpen(true)
                    // }
                  }}
                  autoComplete="off"
                  required
                  wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
                >
                  Engineered Device
                </Input>
              </div>

              <div className="mt-1 font-poppins_w text-sm text-black">
                Assign To
              </div>

              <hr className="my-8 mt-4" />

              <div className="w-1/4">
                <Select
                  options={getCommonData}
                  value={selectedAction}
                  onChange={(e) => {
                    //setPage(1)
                    onCommonChange(e);
                  }}
                  placeholder="Bucket Name"
                  clearable
                  customLabel="Select Bucket"
                  wrapperAttr={{ className: "h-[35px]" }}
                />
              </div>
            </div>

            <div>
              <div className="mt-6 flex justify-end">
                <Button
                  variant="outlined"
                  size="small"
                  style={{
                    borderColor: "#EC1944",
                    color: "white",
                    background: "#EC1944",
                  }}
                  sx={{
                    textTransform: "none",
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                  className="  font-poppins_cf text-xs text-theme-black"
                  // disabled={selectedItems.length === 0}
                  onClick={() => {
                    //setModalCreateBucket(true);
                  }}
                >
                  Save Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDevice;
