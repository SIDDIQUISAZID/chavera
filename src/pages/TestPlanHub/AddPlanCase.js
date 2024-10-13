import { useState, useMemo, useEffect } from "react";

import {
  useGetAllTestCaseQuery,
  useAddTestPlanHubMutation,
  useGetTestPlanDetailsListQuery,
  useUpdateTestPlanHubMutation,
} from "../../features/dashboard/dashboardAPI";
import PageLoader from "../../components/Loader/PageLoader";
import { Table, Input as InputTable } from "antd";


import { LeftArrow, IC_STATUS, DRAG_ICON } from "../../assets/icons";

import { useParams, useSearchParams } from "react-router-dom";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Input/Textarea";

import { AppTable } from "../../components/Table";
import { useNavigate, useLocation } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { dishNetworkApi } from "../../app/services";
import { useAppDispatch } from "../../app/hooks";

import dragula from "dragula";
import "dragula/dist/dragula.css";
import "./DraggableTable.css";

import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/Button";
import useMultiStep from "../../hooks/useMultiStep";
import {
  initialPagination,
  paginationList,
} from "../../features/user/utils/pagination";

import usePaginationSearch from "../../features/user/hooks/usePaginationSearch";

const getIndexInParent = (el) => Array.from(el.parentNode.children).indexOf(el);

const AddPlanCase = () => {
  const navigate = useNavigate();
  const { addTestPlan, id } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const { state } = useLocation();
  const tableStyle = "w-full truncate text-theme-grey text-xs	font-normal mx-2 ";

  const params = useMemo(() => {
    if (id) {
      return {
        tpId: id,
      };
    }
    return null;
  }, [id]);

  const { data: selectedTestCaseList, isLoading: isLoadingSelected } =
    useGetTestPlanDetailsListQuery(params ? { params } : skipToken);

  const { page, setPage, perPage, setPerPage, setTotalDataCount } =
    useMultiStep(initialPagination({ searchParams }));
  const paramsTestCases = useMemo(() => {
    return {
      page: (page - 1)?.toString(),
      size: perPage?.toString(),
    };
  }, [page, perPage]);

  const { data: testCaseList, isLoading } =
    useGetAllTestCaseQuery(paramsTestCases);

  useEffect(() => {
    if (Number.isInteger(testCaseList?.data?.totalCounts)) {
      setTotalDataCount(testCaseList?.data?.totalCounts || 0);
    }
  }, [testCaseList?.data?.totalCounts, setTotalDataCount]);
  usePaginationSearch({ page, perPage });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [addTestCasePlan] = useAddTestPlanHubMutation();
  const [updateTestCasePlan] = useUpdateTestPlanHubMutation();

  const [nextView, setNextView] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);

  const [data, setData] = useState([]);
  const [totalDuration, setTotalDuration] = useState(0);



  // Converts seconds to mm:ss
  function convertMillisecondsToMMSS(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${paddedMinutes}:${paddedSeconds}`;
  }

  const columnsParents = useMemo(() => {
    return [
      {
        title: "Testcase ID",
        dataIndex: "testcaseId",
        key: "testcaseId",
        // width: "12%",

        render: (_, e) => <div className={tableStyle}>{e?.tcTestcaseId}</div>,
      },
      {
        title: "Testcase Name",
        dataIndex: "testcaseName",
        key: "testcaseName",
        // width: "35%",

        render: (_, e) => <div className={tableStyle}>{e?.tcName}</div>,
      },
      {
        title: "Command(s)",
        dataIndex: "commands", // Using "commands" from the response
        key: "command",
        // width: "20%",
        render: (_, record) => {
          const commandLimit = 2;
          const commandNames = record?.commands?.length
            ? record.commands.map((cmd) => cmd.commandName)
            : [];

          const displayedCommands = commandNames.slice(0, commandLimit);
          const remainingCommandsCount = commandNames.length - commandLimit;

          return (
            <div className="flex space-x-2">
              {displayedCommands.map((command, index) => (
                <div
                  key={index}
                  className="mx-2 items-center truncate rounded-xl bg-theme-headerColor px-2 py-1 text-center align-middle font-poppins_cf text-xs font-normal text-theme-grey"
                >
                  {command}
                </div>
              ))}

              {remainingCommandsCount > 0 && (
                <div className="mx-2 w-10 items-center truncate rounded-xl bg-theme-headerColor px-2 py-1 text-center align-middle font-poppins_cf text-xs font-normal text-theme-grey">
                  +{remainingCommandsCount}
                </div>
              )}
            </div>
          );
        },
      },
      {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
        // width: "10%",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>
              {convertMillisecondsToMMSS(e?.tcDuration)}
            </div>
          </div>
        ),
      },
    ];
  }, []);

  useEffect(() => {
    if (state?.item?.tpDuration) {
      setTotalDuration(state?.item?.tpDuration || 0);
    }

    if (selectedTestCaseList?.data?.testCases) {
      setSelectedRowKeys(
        selectedTestCaseList?.data?.testCases?.map((row) => row?.tcId)
      );

      let filteredArray = testCaseList?.data?.testCaseDetails.reduce(
        (acc, item) => {
          let matchingTestCase = selectedTestCaseList?.data?.testCases.find(
            (filterItem) => filterItem?.tcId == item?.tcId
          );

          if (matchingTestCase) {
            acc.push({
              ...item,
              // Add the new key here, for example:
              tc_delay: matchingTestCase?.iterationDelay,
              tc_iteration: matchingTestCase?.iteration,
            });
          }
          return acc;
        },
        []
      );

      setData(filteredArray);
    }
  }, [isLoading, isLoadingSelected]);

  const goBack = () => {
    navigate(-1);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      // isFormDirty(true);
      setIsFormDirty(true);
      setSelectedRowKeys(selectedKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      setSelectedRowKeys(selectedRows.map((row) => row?.tcId));
      setData(
        selectedRows?.map((row, index) => ({
          ...row,
          key: index,
        }))
      );
    },
    onSelectAll: (selected) => {
      if (selected) {
        setSelectedRowKeys(
          testCaseList?.data?.testCaseDetails?.map((row) => row.tcId)
        );

        setData(
          testCaseList?.data?.testCaseDetails?.map((row, index) => ({
            ...row,
            key: index,
          }))
        );
      } else {
        setSelectedRowKeys([]);
        setData([]);
      }
    },
  };

  const handleCancel = () => {
    setSelectedRowKeys([]);
    setNextView(false);
    setData([]);
  };
 

  const onInputChange = (key, index) => (e) => {
    const newData = [...data];
    newData[index][key] = Number(e.target.value);
    setTotal(newData, index);
    setData(newData);
    setIsFormDirty(true);
  };

  const setTotal = (data, index) => {
    // Set total
    data[index]["totalCount"] = Number(
      data[index]["goals"] + data[index]["assists"]
    );
  };

  const columns = [
    {
      title: "",
      dataIndex: "title",
      key: "title",
      width: "5%",
      render: (_) => <DRAG_ICON className="draggable" type="swap" />,
    },
    {
      title: "Testcase ID",
      dataIndex: "testcaseId",
      key: "testcaseId",
      width: "10%",

      render: (_, e) => <div className={tableStyle}>{e?.tcId}</div>,
    },
    {
      title: "TestCase Name",
      dataIndex: "testcaseName",
      key: "testcaseName",
      width: "10%",
      render: (_, e) => <div className={tableStyle}>{e?.tcName}</div>,
    },
    {
      title: "Iteration",
      dataIndex: "tc_iteration",
      key: "tc_iteration",
      editable: true,
      width: "10%",

      render: (number, record, index) => (
        <InputTable
          value={number}
          type="number"
          placeholder="Please enter no. of  iteration"
          className="text-xs font-normal	text-theme-grey"
          onChange={onInputChange("tc_iteration", index)}
        />
      ),
    },
    {
      title: "Delay",
      dataIndex: "tc_delay",
      key: "tc_delay",
      width: "10%",

      render: (number, record, index) => (
        <InputTable
          value={number}
          type="number"
          placeholder="Please enter delay"
          className="text-xs font-normal	text-theme-grey"
          onChange={onInputChange("tc_delay", index)}
        />
      ),
    },
  ];

  const handleReorder = (dragIndex, draggedIndex) => {
    setData((oldState) => {
      const newState = [...oldState];
      const item = newState.splice(dragIndex, 1)[0];
      newState.splice(draggedIndex, 0, item);
      return newState;
    });
  };

  useEffect(() => {
    let start;
    let end;

    const container = document.querySelector(".ant-table-tbody");

    const drake = dragula([container], {
      moves: (el) => {
        start = getIndexInParent(el);

        return true;
      },
      passive: false,
    });

    drake.on("drop", (el) => {
      end = getIndexInParent(el);
      handleReorder(start, end);
    });
    return () => {
      drake.destroy();
    };
  }, []);

 

  //////////API calling///////////
  

  const AddTestPlanSchema = z.object({
    tpName: z.string().nonempty("Please enter test plan name"),
    tpDescription: z.string().nonempty("Please enter test plan description"),
  });

  const {
    register,
    reset,
    handleSubmit: handleCreateUserSubmit,
    formState: { errors, isDirty: bucketFormDirty },
  } = useForm({
    resolver: zodResolver(AddTestPlanSchema),
    defaultValues: {
      tpName: state?.item?.tpName || "",
      tpDescription: state?.item?.tpDescription || "",
      tpDuration: "",
    },
  });

  useEffect(() => {
    if (state?.item) {
      reset({
        tpName: state.item.tpName || "",
        tpDescription: state.item.tpDescription || "",
        tpDuration: "",
      });
    }
  }, [state?.item, reset]);

  const handleAddTestPlan = async (values) => {
    if (selectedRowKeys.length === 0) {
      toast.error("Please select Add TestCase");
      return;
    }

    if (!nextView) {
      setNextView(true);
      return;
    }

    const totalDuration = data?.reduce(
      (n, { tcDuration, tc_iteration, tc_delay }) =>
        n + (tcDuration + tc_delay) * tc_iteration,
      0
    );

    if(isNaN(totalDuration) || totalDuration==0){
     toast.error("Please add iteration and delay at every testcase")
     return;
    }


    setTotalDuration(totalDuration);
   
    // Map the test case data to the required payload format
    const testCases = data.map(({ tcId, tc_iteration, tc_delay }, index) => ({
      testCaseId: tcId,
      numberOfIteration: tc_iteration,
      iterationDelay: tc_delay,
      orderNo: index + 1,
    }));

    // Construct the payload for either add or update
    const payload = {
      ...values,
      // tpDuration: totalDuration || 0,
      testCases,
    };


  

    try {
      let response;
      if (addTestPlan === "edit-test-plan") {
        response = await updateTestCasePlan({
          ...payload,
          tpId: id,
        }).unwrap();
      } else {
        // Handle adding a new test case plan
        response = await addTestCasePlan(payload).unwrap();
      }

      if (response?.status === 200) {
        dispatch(dishNetworkApi.util.invalidateTags(["testPlanDetails"]));
        toast.success(response.message || "Test plan updated successfully!");
        navigate(-1);
      } else {
        toast.error(
          "Failed to update test plan: " + (response.message || "Unknown error")
        );
      }
    } catch (error) {
      toast.error(
        "Failed to update test plan: " + (error.message || "Unknown error")
      );
    }
  };


  return (
    <>
      <div className="flex-cols  h-fit w-full">
        <div className="flex items-center">
          {(addTestPlan === "add-test-plan" ||
            addTestPlan === "edit-test-plan") && (
            <LeftArrow
              onClick={() => goBack()}
              className="mr-2 cursor-pointer"
            />
          )}
          <div className=" flex font-poppins_cf text-[10px]">
            Testcase Hub <div className="mx-2">|</div>
            {addTestPlan === "edit-test-plan" && (
              <div className="flex">
                {" "}
                <div>Testcase List</div> <div className="mx-2">|</div>
              </div>
            )}
            <div className="text-[10px] text-theme-dark">
              {addTestPlan !== "edit-test-plan" ? "Add Plan" : "Edit Test Plan"}
            </div>
          </div>
        </div>

        <div className="w-full flex-col">
          <div className="my-2 text-xl font-poppins_cf font-medium text-theme-black">
            {addTestPlan !== "edit-test-plan"
              ? "Add Test Plan"
              : "Edit Test Plan"}
          </div>

          <form
            novalidate="novalidate"
            onSubmit={handleCreateUserSubmit(handleAddTestPlan)}
            className="w-full"
          >
            <div className=" rounded-sm bg-white p-8 ">
              <div className="flex gap-3">
              
                  <Input
                    name="tpName"
                    type="text"
                    placeholder="Enter User Name"
                    {...register("tpName")}
                    errors={errors}
                    wrapperClass="mb-4"
                    autoComplete="off"
                    required
                    wrapperAttr={{ className: "h-[35px] my-1" }}
                  >
                    Test Plan Name
                  </Input>
             

                <div className="w-96">
                  <Input
                    value={convertMillisecondsToMMSS(totalDuration)}
                    placeholder="00:00"
                    clearable
                    customLabel="Duration (hh:mm)"
                    name="tpDuration"
                    {...register("tpDuration")}
                    errors={errors}
                    required
                    readOnly
                    wrapperAttr={{ className: "h-[35px] w-[90px]" }}
                  >
                    Duration (mm:ss)
                  </Input>
                </div>

               
                  <Input
                    name="tpDescription"
                    type="text"
                    placeholder="Testcase Description"
                    wrapperClass="mb-4"
                    {...register("tpDescription")}
                    errors={errors}
                    wrapperAttr={{ className: "w-full h-[35px]" }}
                    autoComplete="off"
                    required
                    customLabel="Testcase Description"
                  >
                    Test Plan Description
                  </Input>
                
              </div>

              {addTestPlan === "edit-test-plan" && <div></div>}

              <div className="my-2 text-lg font-medium text-theme-black">
                Add TestCase
              </div>

              <div>
                {!nextView &&
                  (isLoading ? (
                    <PageLoader
                      containerAttr={{ className: "bg-blue-light/40" }}
                      loaderColor={"#EC1944"}
                    />
                  ) : (
                    <div>
                      {/* <SearchInput placeholder={"Search user by name.."}
                /> */}
                      <AppTable
                        rowKey={"tcId"}
                        className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal	text-theme-grey"
                        dataSource={testCaseList?.data?.testCaseDetails || []}
                        columns={columnsParents}
                        pagination={false}
                        size="small"
                        rowSelection={{
                          type: "checkbox",
                          ...rowSelection,
                        }}
                      ></AppTable>

                      <div className="mt-2 flex justify-between gap-3 px-2 sm:px-0">
                        <div className="flex items-center space-x-2 text-[10px] xs:text-xs ">
                          <div className="font-poppins_cf text-xs text-theme-black">
                            {testCaseList?.data?.totalCounts} record’s
                          </div>
                          <div className="font-poppins_cf text-xs text-theme-black">
                            Showing Result
                          </div>
                          <select
                            className="rounded border-[1px] border-theme-border p-2"
                            value={perPage}
                            onChange={(e) => {
                              setPerPage(+e.target.value);
                              setPage(1);
                            }}
                            disabled={false}
                          >
                            {paginationList.map((pageV) => {
                              return (
                                <option key={pageV} value={pageV}>
                                  {pageV}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}

                <Table
                  size="small"
                  columns={columns}
                  pagination={false}
                  dataSource={data}
                  rowKey={"tcId"}
                  className={
                    nextView
                      ? "border-blue-light   orderDetailsProduct mt-6 overflow-auto  border text-xs font-normal	text-theme-grey"
                      : " hidden bg-black"
                  }
                />
              </div>
              <div className="mt-3 flex justify-end gap-3">
                <Button
                  type="outlined"
                  title="Close popup"
                  size="small"
                  onClick={handleCancel}
                  className=" rounded-md border-[1px] bg-theme-white py-2 font-poppins_cf text-xs text-black"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  type="submit"
                  disabled={!isFormDirty && !bucketFormDirty}
                  className=" rounded-md bg-theme-dark py-2 font-poppins_cf text-xs text-white"
                >
                  {nextView ? "Add" : "Next"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPlanCase;
