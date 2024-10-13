import { useState, useMemo, useEffect } from "react";
import { IV_ADD_DEVICE, IV_EDIT_DEVICE } from "../../assets/icons";
import {
  useGetTestPlanDetailsListQuery,
  useGetAllDeviceQuery,
  useGetTestPlanListQuery,
  useAddTestCaseScheduleMutation,
  useGetScheduleDetailsQuery,
} from "../../features/dashboard/dashboardAPI";
import Input from "../../components/Input/Input";
import MyComponent from "../../components/Select/MyComponent";
import PageLoader from "../../components/Loader/PageLoader";
import moment from "moment";
import { TableContainer } from "@mui/material";
import { AppTable } from "../../components/Table";
import AppModal from "../../components/Modal/AppModal";
import { CircleLoader } from "../../components/Loader";
import { Select } from "../../components/Select";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";
import { IV_CheckMark } from "../../assets/icons";
import SelectedDeviceModal from "./SelectedDeviceModal";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { skipToken } from "@reduxjs/toolkit/query/react";

const ScheduleTestPlan = () => {
  const { startDate, scheduleType } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [addTestTextSchedule, { isLoading: isLoadingAddTestSchedule }] =
    useAddTestCaseScheduleMutation();

  const [selectedItem, setSelectedItem] = useState(false);
  const [selectedPrams, setSelectedParams] = useState([]);

  const [selectedPosition, setSelectedPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [open, setOpen] = useState(false);

  const [isAddDevice, setIsAddDevice] = useState(false);
  const paramsReschedule = useMemo(() => {
    if (scheduleType !== "addSchedule") {
      return {
        tpScheduleId: scheduleType,
      };
    }
    return null;
  }, [scheduleType]);

  const { data: scheduleDetails, isLoading: isReschedule } =
    useGetScheduleDetailsQuery(paramsReschedule ? paramsReschedule : skipToken);
  const [selectedPlan, setSelectedPlan] = useState(undefined);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRowsData, setSelectedRowsData] = useState([]);

  const params_ = useMemo(() => {
    return {
      page: "0",
      size: "50",
      searchText: "",
    };
  }, []);

  const { data: testPlanList } = useGetTestPlanListQuery({
    params: params_,
  });

  const [dateTime, setDateTime] = useState(
    scheduleType !== "addSchedule"
      ? moment(scheduleDetails?.data?.testPlanDetails?.tpStartDateTime)?.format(
          "YYYY-MM-DD"
        )
      : moment(startDate)?.format("YYYY-MM-DD")
  );

  const [time, setTime] = useState(
    scheduleType !== "addSchedule"
      ? moment(startDate)?.format("HH:mm")
      : moment(startDate)?.format("HH:mm")
  );
  const filterOptionsTestPlanName = useMemo(() => {
    if (!testPlanList?.data?.testPlanDetails) {
      return [];
    }
    return testPlanList?.data?.testPlanDetails?.map(
      ({ tpTestPlanId, tpName, tpId, tpDuration }) => ({
        label: tpTestPlanId + " - " + tpName,
        value: tpId.toString(),
        tpDuration: tpDuration,
      })
    );
  }, [testPlanList?.data?.testPlanDetails]);

  const filterSelectedDevice = useMemo(() => {
    if (!selectedRowsData) {
      return [];
    }

    return selectedRowsData?.map(({ deviceName, deviceId }) => ({
      label: deviceName,
      deviceId: deviceId,
      isPrimary: false,
    }));
  }, [selectedRowsData]);

  const params = useMemo(() => {
    return {
      tpId: selectedPlan?.value,
    };
  }, [selectedPlan?.value]);

  const { data, isLoading } = useGetTestPlanDetailsListQuery({ params });
  const { data: deviceLIst } = useGetAllDeviceQuery({ params: params_ });

  useEffect(() => {
    if (scheduleType !== "addSchedule") {
      setSelectedRowKeys(
        scheduleDetails?.data?.testPlanDetails?.testCases[0]?.devices?.map(
          (row) => row?.deviceId
        )
      );

      setSelectedPlan({
        label:
          scheduleDetails?.data?.testPlanDetails?.tpTestplanId +
          " - " +
          scheduleDetails?.data?.testPlanDetails?.tpName,
        value: scheduleDetails?.data?.testPlanDetails?.tpId.toString(),
      });

      const transformedData =
        scheduleDetails?.data?.testPlanDetails?.testCases?.map((item) => ({
          ...item,
          devices: item.devices.map((device) => ({
            ...device,
            isPrimary: device?.primary,
            label: device?.deviceName, // Change deviceName to label
            // deviceName: undefined // Optionally remove the original deviceName
          })),
        }));

      if (transformedData !== undefined) {
        console.log("transformedData[0]?.devices", transformedData[0]?.devices);
        setSelectedRowsData(transformedData[0]?.devices || []);
      }

      setSelectedParams(transformedData);
    }
  }, [scheduleDetails?.data?.testPlanDetails]);

  useEffect(() => {
    if (data?.data?.testCases) {
      setSelectedItem(data?.data?.testCases[0]);
    }
  }, [data?.data?.testCases]);

  const onSelectedItem = (item, index) => {
    setSelectedItem(item);
    setSelectedPosition(index);
  };

  const maxScoreMathMax =
    scheduleType === "addSchedule"
      ? data?.data?.testCases.reduce((prev, current) =>
          +prev.tcDevicesRequired > +current.tcDevicesRequired ? prev : current
        )?.tcDevicesRequired
      : scheduleDetails?.data?.testPlanDetails?.tpDevicesRequired;

  const tableStyle = "w-full truncate text-theme-grey text-xs	font-normal mx-2";

  const columns = useMemo(() => {
    return [
      {
        title: "Device Name",
        dataIndex: "deviceName",
        key: "deviceName",
        render: (_, e) => <div className={tableStyle}>{e?.deviceName}</div>,
      },
      {
        title: "Make & Model",
        dataIndex: "email",
        key: "email",
        render: (_, e) => <div className={tableStyle}>{e?.make}</div>,
      },
      {
        title: "IMEI1",
        dataIndex: "isAuthenticatedDate",
        key: "isAuthenticatedDate",
        render: (_, e) => <div className={tableStyle}>{e?.imei1}</div>,
      },
      {
        title: "IMEI2",
        dataIndex: "isAuthenticatedDate",
        key: "isAuthenticatedDate",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e?.imei2}</div>
          </div>
        ),
      },
    ];
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const getAllData = (allData, index) => {
    const updatedData = [...selectedPrams];
    updatedData[index].devices = allData;

    setSelectedParams(updatedData);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      // Set both the selected row keys (imei1) and the full row data
      setSelectedRowKeys(selectedRows.map((row) => row?.deviceId));
      setSelectedRowsData(selectedRows); // Store the whole row data
    },
    onSelectAll: (selected, selectedRows) => {
      if (selected) {
        // Select all rows
        setSelectedRowKeys(
          selectedRows.map((row) => row?.deviceId) // Set selected row keys (imei1)
        );
        setSelectedRowsData(selectedRows); // Store the full row objects
      } else {
        // Deselect all rows
        setSelectedRowKeys([]);
        setSelectedRowsData([]);
      }
    },
  };

  const onClickAt = (item) => {
    const deviceParams = selectedRowsData?.map(
      ({ imei1, imei2, deviceName, deviceId }) => ({
        imei2: imei2,
        deviceName: deviceName,
        label: deviceName,
        imei1: imei1,
        deviceId: deviceId,
        isPrimary: deviceId == item?.deviceId,
      })
    );

    setOpen(false);
    setSelectedRowsData(deviceParams);
    setIsAddDevice(false);

    let device = data?.data?.testCases?.map(
      ({ tpTcMapId, tcId, tcDevicesRequired }) => ({
        tpTcMapId,
        tcId,
        tcDevicesRequired,
        devices: deviceParams, // Get devices based on required count
      })
    );

    setSelectedParams(device);
  };

  const onSelectedDevice = async () => {
    const currentDate = moment();
    if (
      !currentDate.isBefore(
        moment(dateTime + " " + time, "YYYY-MM-DD HH:mm").format(
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        )
      )
    ) {
      toast.error("Please select another date and time ");

      return;
    }

    if (scheduleType !== "addSchedule") return;

    if (isAddDevice) {
      if (filterSelectedDevice?.length < maxScoreMathMax) {
        toast.error(
          `Test Plan ${selectedPlan?.value} requires ${maxScoreMathMax} devices in order to schedule.`
        );
        return;
      }
      setOpen(true);
    } else {
      if (selectedPrams?.length == 0) {
        toast.error(`Please Select all requires  devices`);
        return;
      }

      const hasInvalidDevices = selectedPrams?.some((param) =>
        param.devices.some((device) => device == null)
      );

      if (hasInvalidDevices) {
        toast.error(`Please Select all requires  devices`);
        return;
      }

      let device = selectedPrams?.map(
        ({ tpTcMapId, tcId, tcDevicesRequired, devices }) => ({
          tpTcMapId,
          tcId,
          tcDevicesRequired,
          devices: devices?.slice(0, tcDevicesRequired), // Get devices based on required count
        })
      );

      const payload = {
        tpId: selectedPlan?.value,
        scheduleDateTime: moment(
          dateTime + " " + time,
          "YYYY-MM-DD HH:mm"
        ).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        testCases: device?.filter((item) => item.devices.length > 0),
      };

      try {
        const addScheduleRes = await addTestTextSchedule(payload).unwrap();
        if (addScheduleRes.status === 200) {
          dispatch(dishNetworkApi.util.invalidateTags(["scheduleList"]));
          navigate(-1);
          toast.success(addScheduleRes.message);
        } else {
          toast.error(addScheduleRes.message);
        }
      } catch (err) {
        toast.error(err?.data?.message || "Schedule Test Case not added");
      }
    }
  };

  const convertSecondsToMMSS = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = remainingSeconds.toString().padStart(2, "0");
    return `${paddedMinutes}:${paddedSeconds}`;
  };

  return (
    <div className="flex h-fit w-full gap-8">
      {/* First div with 70% width */}
      <div className="w-full  ">
        <div>
          <div className="flex items-center gap-3">
            <div className="text-left font-poppins_cf text-xl font-medium text-theme-black">
              Schedule & Execute
            </div>
          </div>

          <div className="mt-4 bg-theme-white p-4">
            <div className="w-full rounded-[4px] border-[1px] border-theme-border bg-theme-white">
              <div className="mt-3 flex  gap-3 p-6">
                <div className=" min-w-96">
                  <Select
                    customLabel="Select Test Plan"
                    options={filterOptionsTestPlanName}
                    value={selectedPlan}
                    onChange={(selectedOption) => {
                      console.log("selectedOption", selectedOption);

                      setDuration(
                        convertSecondsToMMSS(selectedOption?.tpDuration || 0)
                      );
                      setSelectedPlan(selectedOption);
                    }}
                    placeholder="Select"
                    wrapperAttr={{ className: "h-[40px] mt-0 w-" }}
                    clearable
                    required
                  />
                </div>
                <div className=" w-40">
                  <Input
                    name="patient"
                    type="date"
                    placeholder="Start Date"
                    defaultValue={moment(dateTime).format("YYYY-MM-DD")}
                    wrapperAttr={{ className: "h-[35px]  my-1" }}
                    required
                    onChange={(e) =>
                      setDateTime(
                        moment(e.target.value).format(
                          "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
                        )
                      )
                    }
                    autoComplete="off"
                  >
                    Start Date
                  </Input>
                </div>
                <div className=" w-40">
                  <Input
                    name="time"
                    type="time"
                    placeholder="Start Time"
                    defaultValue={time}
                    wrapperAttr={{ className: "h-[35px] w-full my-1" }}
                    required
                    // min={new Date().toJSON().slice(0, 10)}
                    onChange={(e) => {
                      console.log("e.target.value", e.target.value);
                      setTime(e.target.value);
                    }}
                    autoComplete="off"
                  >
                    Start Time
                  </Input>
                </div>

                <div className=" w-40">
                  <Input
                    name="time"
                    type="text"
                    placeholder="Start Time"
                    defaultValue={duration}
                    value={duration}
                    wrapperAttr={{ className: "h-[35px] w-full my-1" }}
                    readOnly
                    autoComplete="off"
                  >
                    Duration(mm:ss)
                  </Input>
                </div>
              </div>
            </div>

            {selectedPlan && !isAddDevice && (
              <div>
                {" "}
                {filterSelectedDevice?.length==0 && (
                  <div className="mt-4 flex items-center justify-between rounded-[4px] border p-2">
                    <div className="items-center font-poppins_cf text-xs font-normal text-theme-dark">
                      Devices Required (
                      {maxScoreMathMax == undefined
                        ? "DUT not available"
                        : maxScoreMathMax}
                      )
                    </div>

                    <div
                      className={
                        scheduleType !== "addSchedule"
                          ? "flex cursor-pointer items-center justify-between gap-1  bg-white px-2 py-2 text-xs font-normal text-theme-dark"
                          : "flex cursor-pointer items-center justify-between gap-1 rounded-md border border-theme-dark bg-white px-2 py-2 text-xs font-normal text-theme-dark"
                      }
                      onClick={() => setIsAddDevice(true)}
                    >
                      {scheduleType !== "addSchedule" ? (
                        <IV_EDIT_DEVICE />
                      ) : (
                        <div className="flex">
                          {" "}
                          <IV_ADD_DEVICE />
                          <button title="Close popup" className="w-[90px] ">
                            Add Devices
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {filterSelectedDevice?.length !== 0 && (
                  <div>
                    <div className="mt-4 ">
                     <div className="mb-2 bg-[#FFE9ED] border-[1px] border-[#EFEFEF] p-2 py-3 font-poppins_cf text-sm font-medium text-theme-black flex justify-between">
                     <div className=" font-poppins_cf text-sm font-medium text-theme-black">
                        Selected Devices
                      </div>

                      <IV_EDIT_DEVICE  onClick={()=> setIsAddDevice(true)}/>

                     </div>

                      <div className="flex flex-wrap gap-2">
                        {selectedRowsData
                          ?.sort((a, b) => b.isPrimary - a.isPrimary)
                          ?.map((item, index) =>
                            item?.isPrimary ? (
                              <div className="flex items-center justify-center rounded-full border bg-green-100 px-3 py-1 text-xs text-green-600">
                                <IV_CheckMark className="mr-2" /> {item?.label}
                              </div>
                            ) : (
                              <div className="flex cursor-pointer items-center justify-center rounded-full border bg-purple-100 px-3  py-1 text-xs text-theme-black">
                                {item?.label}
                              </div>
                            )
                          )}
                      </div>
                    </div>
                    <div className="my-4  ">
                      {/* Tab Header */}
                      {isLoading ? (
                        <PageLoader
                          containerAttr={{ className: "bg-blue-light/40" }}
                          loaderColor={"#EC1944"}
                        />
                      ) : (
                        <div className="flex gap-[1px] border-b border-theme-black">
                          {data?.data?.testCases?.map((item, index) => (
                            <div
                              className={
                                selectedItem?.tcId === item?.tcId
                                  ? "mx-0  items-center justify-end border bg-[#696565] px-4 py-2 "
                                  : "mx-0 cursor-pointer items-center justify-end border bg-[#E5E5E5] px-4 py-2 "
                              }
                              onClick={() => onSelectedItem(item, index)}
                            >
                              <div
                                className={
                                  selectedItem?.tcId === item?.tcId
                                    ? "font-poppins_cf text-[10px] text-theme-white"
                                    : "text-theme-back font-poppins_cf text-[10px] text-[#B9B4B4] "
                                }
                              >
                                TC- {item?.tcId}
                              </div>
                              {/* <div className="font-poppins_cf text-[10px] text-theme-grey">
                    {item?.tcName}
                  </div> */}
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Tab Content */}
                      <div className="my-2  text-[12px] font-poppins_w text-black">
                          <div>{selectedItem?.tcName}</div>           
                      </div>

                      <div className="flex gap-2">
                        {selectedItem?.command?.map((item) => (
                          <div className="mb-4 mt-2 flex  gap-2">
                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-600">
                              {item?.commandName}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className=" justify-between pt-2 ">
                        <MyComponent
                          numSelects={selectedItem?.tcDevicesRequired}
                          getCommonData={filterSelectedDevice || []}
                          getData={getAllData}
                          clearable
                          selectedPrams={selectedPrams}
                          selectedPosition={selectedPosition}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isAddDevice && (
              <div>
                <div className="flex flex-1 flex-col">
                  {isLoading ? (
                    <PageLoader
                      containerAttr={{ className: "bg-blue-light/40" }}
                      loaderColor={"#EC1944"}
                    />
                  ) : (
                    <AppTable
                      rowKey={"deviceId"}
                      className="border-blue-light mt-4 overflow-auto border text-xs font-normal text-theme-grey"
                      columns={columns}
                      dataSource={deviceLIst?.data?.devices || []}
                      pagination={{ size: 10 }}
                      rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                      }}
                      size="small"
                    />
                  )}
                </div>
              </div>
            )}
            {selectedPlan && filterSelectedDevice?.length !== 0 && (
              <div className="mt-6 flex flex-row justify-end gap-2 ">
                <button
                  title="Close popup"
                  onClick={() => navigate(-1)}
                  className="w-[90px] cursor-pointer rounded-md border bg-white py-2 text-xs font-normal text-theme-black"
                >
                  Cancel
                </button>
                <button
                  title="Close popup"
                  onClick={() => onSelectedDevice()}
                  className="w-[90px] cursor-pointer rounded-md bg-theme-dark py-2 text-xs font-normal text-white"
                >
                  {isAddDevice ? (
                    "Done"
                  ) : isLoadingAddTestSchedule ? (
                    <div className="flex gap-2">
                      {/* <div className="mr-2">Loading.....</div> */}
                      <CircleLoader className="ml-auto" />
                    </div>
                  ) : (
                    <>
                      {scheduleType !== "addSchedule"
                        ? "Reschedule"
                        : "Schedule"}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AppModal
        show={open}
        onClose={handleClose}
        title="Select Primary Device"
        modalClass={"w-[calc(100%-90px)] md:w-[calc(50%)] rounded-[4px]"}
      >
        <SelectedDeviceModal
          handleClose={handleClose}
          selectedData={selectedRowsData}
          onClickAt={onClickAt}
        />
      </AppModal>
    </div>
  );
};

export default ScheduleTestPlan;
