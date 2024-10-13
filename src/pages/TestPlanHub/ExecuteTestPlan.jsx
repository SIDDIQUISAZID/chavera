import { useState, useMemo, useEffect } from "react";
import { IC_CHECKED, IC_UN_CHECKED } from "../../assets/icons";
import {
  useGetTestPlanDetailsListQuery,
  useAddTestCaseScheduleMutation,
  useGetAllDeviceQuery,
} from "../../features/dashboard/dashboardAPI";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";
import { useCommonFilter } from "../../features/user/hooks";
import Input from "../../components/Input/Input";
import MyComponent from "../../components/Select/MyComponent";
import PageLoader from "../../components/Loader/PageLoader";
import moment from "moment";

const ExecuteTestPlan = ({ onDeleteSuccess, testPlanItem }) => {
  const [addTestTextSchedule, { isLoading: isLoadingAddTestSchedule }] =
    useAddTestCaseScheduleMutation();


  const [isChecked, setChecked] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [selectedPrams, setSelectedParams] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedPosition, setSelectedPosition] = useState(0);



  const params_ = useMemo(() => {
    return {
      page: "0",
      size: "100",

      unassignedDevice: "admin",
      isDeviceEngineerRequest: "false",
    };
  }, []);

  const { data: deviceDataList } = useGetAllDeviceQuery({
    params:params_});


    const filterOptionsUserName = useMemo(() => {
      if (!deviceDataList?.data?.devices) {
        return [];
      }
      return deviceDataList?.data?.devices?.map(({ imei1, deviceId }) => ({
        label: imei1,
        value: deviceId.toString(),
      }));
    }, [deviceDataList?.data?.devices]);

  const params = useMemo(() => {
    return {
      tpId: testPlanItem?.tpId,
    };
  }, [testPlanItem?.tpId]);

  const { data, isLoading } = useGetTestPlanDetailsListQuery({ params });

  useEffect(() => {
    if (data?.data?.testCases) {
      setSelectedItem(data?.data?.testCases[0]);
    }
  }, [data?.data?.testCases]);


  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    console.log(selectedDate);

    if (!isChecked) {
      if (selectedDate == undefined) {
        toast.error("Please select Date");
        return;
      }

      if (selectedTime == undefined) {
        toast.error("Please select time");
        return;
      }
    }

    // if (selectedDevices.length !== selectedItem?.tcDutRequired) {
    //   toast.error("Please select Devices");
    // }

    const payload = {
      tpId: testPlanItem?.tpId,
      timestamp: isChecked
        ? moment(new Date()).format("YYYY-MM-DDTHH:mm:ss.SSSZ") 
        : moment(`${selectedDate} ${selectedTime}`).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      tpDuration: testPlanItem?.tpDuration,
      testCases: selectedPrams,
    };

 
    try {
      const addScheduleRes = await addTestTextSchedule(payload).unwrap();
      onDeleteSuccess();
      if (addScheduleRes.status === 200) {
        dispatch(dishNetworkApi.util.invalidateTags(["testPlanList"]));
        toast.success(addScheduleRes.message);
      } else {
        toast.error(addScheduleRes.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || "Schedule Test Case not added");
    }
  };

  const onChecked = () => {
    setChecked(!isChecked);
  };

  const onSelectedItem = (item,index) => {
    setSelectedItem(item);
    setSelectedPosition(index);
  };
 
  // const getAllData = (allData,index) => {

  
  //   var deviceParams = data?.data?.testCases?.map(({ tpTcMapId, tcId,tcDutRequired }) => ({
  //     tpTcMapId: tpTcMapId,
  //     tcId: tcId,
  //     tcDutRequired:tcDutRequired,
  //     devices: allData?.slice(0, tcDutRequired),
  //   }));

  //   deviceParams[selectedPosition].devices[index] = allData[index];
  // // console.log('deviceParams[selectedPosition]?.devices[index]',deviceParams)
  //   // console.log(deviceParams,"deviceParams");
    
  //   // console.log(allData,"allData")
  //   // console.log(selectedPrams,"selectedPrams")
  //   setSelectedDevices(allData);

  //   setSelectedParams(deviceParams);
  // };


  const getAllData = (allData, index) => {
    // Initialize deviceParams with a map over testCases
    let deviceParams = data?.data?.testCases?.map(({ tpTcMapId, tcId, tcDutRequired }) => ({
      tpTcMapId,
      tcId,
      tcDutRequired,
      devices: allData?.slice(0, tcDutRequired), // Get devices based on required count
    }));
  
    if (
      typeof selectedPosition !== 'undefined' && 
      deviceParams[selectedPosition] && 
      deviceParams[selectedPosition].devices
    ) {
      // Validate that index is within bounds of the devices array
      if (index >= 0 && index < deviceParams[selectedPosition].devices.length) {
        // Create a deep copy of the devices array to avoid mutating state directly
        const updatedDevices = [...deviceParams[selectedPosition].devices];
  
        // Update the specific device at the provided index
        updatedDevices[index] = allData[index];
  
        // Update deviceParams with the new devices array
        deviceParams[selectedPosition] = {
          ...deviceParams[selectedPosition],
          devices: updatedDevices,
        };
        setSelectedDevices(allData);
        setSelectedParams(deviceParams);
      } else {
        console.error('Index is out of bounds for devices array.');
      }
    } else {
      console.error('selectedPosition or devices array is undefined.');
    }
  };
  
  const maxScoreMathMax = data?.data?.testCases.reduce((prev, current) =>
  +prev.tcDutRequired > +current.tcDutRequired ? prev : current
)?.tcDutRequired;

  return (
    <div
      data-testid="logoutModal"
      className="flex flex-col justify-center p-1 text-center md:p-2"
    >
      <div
        data-testid="openModal "
        className="flex  flex-col justify-center  p-1 text-center md:p-2"
      >
        <div className="flex items-center gap-3">
          <div className="text-left text-xl  font-medium text-theme-black ">
            Schedule TestPlan
          </div>
          <div className="text-xs font-semibold text-theme-dark	">
            {testPlanItem?.tpTestPlanId}
          </div>
        </div>
        <hr className="my-3" />

        <div className=" w-full rounded-[4px] border-[1px] border-theme-border bg-theme-greyLight ">
          <div className="mt-3 flex justify-between gap-3 p-3 pb-0 ">
            <Input
              name="patient"
              type="date"
              placeholder="Write something here..."
              min={moment(new Date()).format("YYYY-MM-DD")}
              // onSubmit={handleDateChange}
              onSubmit={(formData) => {
                console.log(formData);
              }}
              readOnly={!isChecked ? false : true}
              onChange={(e) => {
                setSelectedDate(e.target.value);
              }}
              wrapperClass="mb-4"
              required
              autoComplete="off"
              wrapperAttr={{ className: "h-[35px] w-full  my-1 " }}
            >
              Start Date
            </Input>

            <Input
              name="patient"
              type="time"
              placeholder="Write something here..."
              wrapperClass="mb-4"
              readOnly={!isChecked ? false : true}
              onChange={(e) => {
                setSelectedTime(e.target.value);
              }}
              autoComplete="off"
              required
              wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
            >
              Start Time
            </Input>
          </div>

          {selectedDate && selectedTime && (
            <div className="mb-3 px-3 text-left  text-xs font-medium text-theme-green">
              Expected End Time: {selectedDate}, {selectedTime}
            </div>
          )}
          <hr />
        </div>

        <div className="my-2 flex items-center  gap-2">
          <div className="cursor-pointer" onClick={onChecked}>
            {isChecked ? <IC_CHECKED /> : <IC_UN_CHECKED />}
          </div>

          <div className="text-xs  text-theme-dark	">
            Click for immediate execution
          </div>
        </div>

        <div className=" mt-3    text-left text-xs font-medium text-theme-black">
          No. of Devices to be in use
        </div>

        <div className="w-44 rounded-[4px] border-[1px] border-theme-border px-3  py-3  text-left  text-xs text-theme-black">
        {maxScoreMathMax === undefined
            ? "DUT not available"
            : maxScoreMathMax}
        </div>

        <div className=" mt-4 flex w-full rounded-[4px] border-[1px] border-theme-border bg-theme-white ">
          {isLoading ? (
            <PageLoader
              containerAttr={{ className: "bg-blue-light/40" }}
              loaderColor={"#EC1944"}
            />
          ) : (
            <div>
              {data?.data?.testCases?.map((item,index) => (
                <div
                  className={
                    selectedItem?.tcId === item?.tcId
                      ? "mx-0  items-center justify-end border bg-theme-white px-4 py-2 "
                      : "mx-0 cursor-pointer items-center justify-end border bg-theme-greyLight px-4 py-2 "
                  }
                  onClick={() => onSelectedItem(item,index)}
                >
                  <div
                    className={
                      selectedItem?.tcId === item?.tcId
                        ? "font-poppins_cf text-[10px] text-theme-dark"
                        : "text-theme-back font-poppins_cf text-[10px]"
                    }
                  >
                    TC- {item?.tcId}
                  </div>
                  <div className="font-poppins_cf text-[10px] text-theme-grey">
                    {item?.tcName}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div>
            <div className="mt-8 flex justify-between gap-2 px-3">
              <Input
                name="patient"
                type="text"
                placeholder="Enter"
                value={selectedItem?.iteration}
                wrapperClass="mb-4"
                autoComplete="off"
                readOnly
                wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
              >
                Iteration
              </Input>
              <Input
                name="patient"
                type="text"
                placeholder="Enter"
                readOnly
                value={selectedItem?.iterationDelay}
                wrapperClass="mb-4 "
                autoComplete="off"
                wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
              >
                Buffer (Min)
              </Input>
              <Input
                name="patient"
                type="text"
                placeholder="Enter"
                wrapperClass="mb-4 "
                value={selectedItem?.tcDutRequired}
                autoComplete="off"
                readOnly
                wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
              >
                No. of Devices
              </Input>
            </div>
            <div className=" justify-between px-3">
              <MyComponent
                numSelects={selectedItem?.tcDutRequired}
                getCommonData={filterOptionsUserName}
                getData={getAllData}
                // selectedAction={selectedOption}
                //onCommonChange={handleSelectChange}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-end space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
          <button
            title="Close popup"
            onClick={onDeleteSuccess}
            className="w-[90px] cursor-pointer rounded-md border-[1px] bg-white p-1 text-xs font-normal text-theme-black"
          >
            Cancel
          </button>
          {maxScoreMathMax &&
          <button
            title="Decline"
            onClick={handleDelete}
            className="w-[90px] cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
          >
            {"Done"}
          </button>
          }
        </div>
      </div>
    </div>
  );
};

export default ExecuteTestPlan;
