import { useState, useMemo, useCallback, useEffect } from "react";

import { AppTable } from "../../components/Table";
import SearchInput from "../../components/Input/SearchInput";
import Modal from "../../components/Modal";
import { useCommonFilter } from "../../features/user/hooks";
import { TableContainer} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Input/Textarea";
import DatePicker from "../../components/Input/DatePicker";
import TimePicker from "../../components/Input/TimePicker";
import { getCommonData } from "../../features/user/utils/common";
import { Dropdown, Space } from "antd";
import { dishNetworkApi } from "../../app/services";
import { useAppDispatch } from "../../app/hooks";

import { Select } from "../../components/Select";
import { IC_STATUS } from "../../assets/icons";
import {
  useGetAllTestCaseQuery,
  useGetCategoryQuery,
  useGetAllUserRolesQuery,
  useCloneTestCaseMutation,
} from "../../features/dashboard/dashboardAPI";
import usePaginationSearch from "../../features/user/hooks/usePaginationSearch";
import PageLoader from "../../components/Loader/PageLoader";

import AppModal from "../../components/Modal/AppModal";
import DeleteTestCaseModal from "./DeleteTestCaseModal";

import {
  LeftChevIcon,
  RightChevIcon,
  ICExport,
  ICImport,
  Ic_Action,
  IV_RIGHT_SINGLE,
  IV_LeftArrow_Single,
} from "../../assets/icons";
import useMultiStep from "../../hooks/useMultiStep";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  initialPagination,
  paginationList,
} from "../../features/user/utils/pagination";
import { Testcase } from "../../utils/commonTextFile";
import { toast } from "react-toastify";
import Button from "../../components/Button";

const AccessManagement = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { selectedAction, onCommonChange } = useCommonFilter();
  const [searchName, setSearchName] = useState(() => {
    return searchParams.get("q") || "";
  });
  const [openModal, setModal] = useState(false);
  const [openModalCreateBucket, setModalCreateBucket] = useState(false);
  const [openModalAssignBucket, setModalAssignBucket] = useState(false);
  const [openModalTestCase, setModalTestCase] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [openModalImport, setModalImport] = useState(false);
  const [category, setCategory] = useState();
  const [createdBy, setCreatedBy] = useState("");
  const {
    page,
    setPage,
    perPage,
    setPerPage,
    lastPage,
    goNext,
    goPrev,
    canNext,
    canPrev,
    setTotalDataCount,
  } = useMultiStep(initialPagination({ searchParams }));

  const params = useMemo(() => {
    return {
      page: (page - 1)?.toString(),
      size: perPage?.toString(),
      searchText: searchName,
      filterCreatedBy: createdBy,
      filterCommand: category,
    };
  }, [page, perPage, searchName, createdBy, category]);
  const { data, isLoading, isFetching } = useGetAllTestCaseQuery(params);
  const { data: categoriesData } = useGetCategoryQuery({});
  const { data: userRoleList } = useGetAllUserRolesQuery({ params: {} });
  const [cloneTestCase, { loading, error }] = useCloneTestCaseMutation();

  const filterOptionsCategoryName = useMemo(() => {
    if (!categoriesData?.data?.commands) {
      return [];
    }
    return categoriesData?.data?.commands?.map(
      ({ commandName, commandId }) => ({
        text: commandName,
        value: commandId.toString(),
      })
    );
  }, [categoriesData?.data?.commands]);

  const filterOptionsRoleName = useMemo(() => {
    if (!userRoleList?.data?.roles) {
      return [];
    }
    return userRoleList?.data?.roles?.map(({ roleName, roleId }) => ({
      text: roleName,
      value: roleId.toString(),
    }));
  }, [userRoleList?.data?.roles]);

  useEffect(() => {
    if (Number.isInteger(data?.data?.totalCounts)) {
      setTotalDataCount(data?.data?.totalCounts || 0);
    }
  }, [data?.data?.totalCounts, setTotalDataCount]);
  usePaginationSearch({ page, perPage });

  const handleCloneTestCase = async (testCaseId) => {
    const payload = {
      tcId: testCaseId,
    };

    try {
      const response = await cloneTestCase(payload);
      console.log(response, "res");

      if (response?.data?.status === 200) {
        toast.success(
          response?.data?.message || "Test case cloned successfully!"
        );
        dispatch(dishNetworkApi.util.invalidateTags(["testCaseList"]));
      } else {
        toast.error(response?.data?.message || "Failed to clone test case.");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const [selectedItems, setSelectedItems] = useState();
  const tableStyle = "w-full truncate text-theme-grey text-xs	font-normal ";

  const items = [
    { key: "3", label: "Clone" },
    { key: "4", label: "View" },
    { key: "1", label: "Edit" },
    { key: "2", label: "Delete" },
  ];

  const handleDropdownItemClick = (item, testPlanItem) => {
    if (item.key === "3") {
      handleCloneTestCase(testPlanItem?.tcId);
    }
    if (item.key === "1") {
      navigate(`/testCaseHub/testCaseList/edit-test-cases`, {
        state: { item: testPlanItem },
      });
    } else if (item.key === "2") {
      setDelete(true);
      setSelectedItems(testPlanItem);
    } else if(item.key === "4"){
      navigate(`/testresultHub/testPlanDetails`, {
        state: {
          testCaseDetails: testPlanItem,
          from:"testcase" // Pass the entire testcase details object as state
        },
      })
    }
  };

  const convertSecondsToMMSS = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${paddedMinutes}:${paddedSeconds}`;
  };

  const columns = useMemo(() => {
    return [
      {
        title: "Testcase ID",
        dataIndex: "testcaseId",
        key: "testcaseId",
        width: "12%",
        render: (_, e) => (
          <div 
            onClick={() =>
              navigate(`/testresultHub/testPlanDetails`, {
                state: {
                  testCaseDetails: e,
                  from:"testcase"  // Pass the entire testcase details object as state
                },
              })
            }
            className="mx-2 w-full truncate text-xs font-normal text-theme-blue underline cursor-pointer"
          >
            {e?.tcTestcaseId}
          </div>
        ),
      },
      {
        title: "Testcase Name",
        dataIndex: "testcaseName",
        key: "testcaseName",
        width: "20%",
        render: (_, e) => <div className={tableStyle}>{e?.tcName}</div>,
      },
      {
        title: "Created By",
        dataIndex: "createdBy",
        key: "createdBy",
        width: "15%",
        render: (_, e) => <div className={tableStyle}>{e?.createdBy}</div>,
      },
      {
        title: "Access Role",
        dataIndex: "accessRole",
        filterSearch: true,
        filters: [...filterOptionsRoleName],
        key: "accessRole",
        width: "20%",
        filterIcon: (filtered) => (
          <div className="mr-2">
            <IC_STATUS />
          </div>
        ),
        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e?.roleName}</div>
          </div>
        ),
      },

      {
        title: "DUT Required",
        dataIndex: "DUTRequired",
        key: "DUTRequired",
        width: "20%",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e?.tcDevicesRequired}</div>
          </div>
        ),
      },
      {
        title: "Command",
        dataIndex: "Category",
        filterSearch: true,
        filters: [...filterOptionsCategoryName],
        key: "cammand",
        width: "20%",
        filterIcon: (filtered) => (
          <div className="mr-2">
            <IC_STATUS />
          </div>
        ),
        render: (_, record) => {
          const commandLimit = 2;
          const commandNames = record?.commands?.length
            ? record.commands.map((cmd) => cmd.commandName)
            : [];

          const displayedCommands = commandNames.slice(0, commandLimit); // First 2 commands
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
        title: "Duration(mm:ss)",
        dataIndex: "duration",
        key: "duration",
        width: "10%",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>
              {convertSecondsToMMSS(e?.tcDuration)}
            </div>
          </div>
        ),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: "20%",
        render: (_, e) => (
          <Space size="small">
            <Dropdown
              className="cursor-pointer"
              menu={{
                items,
                onClick: (index) => handleDropdownItemClick(index, e),
              }}
            >
              <div>
                <Ic_Action />
              </div>
            </Dropdown>
          </Space>
        ),
      },
    ];
  }, [
    data?.data?.testCaseDetails,
    filterOptionsRoleName,filterOptionsCategoryName,
    handleDropdownItemClick,
  ]);

  const handleLogout = async () => {
    setModal(false);
    setModalCreateBucket(false);
    setModalAssignBucket(false);
    setModalTestCase(false);
    setDelete(false);
    setModalImport(false);
  };

  const handleLogoutModalClose = useCallback(() => {
    setModal(false);
    setModalCreateBucket(false);
    setModalAssignBucket(false);
    setModalTestCase(false);
    setDelete(false);
    setModalImport(false);
  }, []);
  const onDeleteCancel = useCallback(() => {
    setDelete(false);
  
  }, []);

  const handleFilter = (filters) => {
   
    if (filters.accessRole && filters.accessRole.length > 0) {
      const roleId = filters.accessRole.join(",");
      setCreatedBy(roleId);
    } else {
      setCreatedBy("");
    }
    if (filters.cammand && filters.cammand.length > 0) {
      const cammand = filters.cammand.join(",");
      setCategory(cammand);
    } else {
      setCategory("");
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="mb-2">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="text-xl font-poppins_cf font-medium text-theme-black">
              {Testcase}
            </div>

            <div className="flex  justify-between gap-2">
              <SearchInput
                searchName={searchName}
                setSearchName={setSearchName}
                placeholder={"Search testcase by name.."}
              />

              <Button
                className="bg-theme-dark text-theme-white font-poppins_cf text-xs font-medium px-3 sm:px-2 rounded border-[1px]"
                onClick={() => {
                  navigate(`/testCaseHub/testCaseList/:addTestCase`);
                }}
              >
               <AddIcon /> Create
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          {isLoading ? (
            <PageLoader
              containerAttr={{ className: "bg-blue-light/40" }}
              loaderColor={"#EC1944"}
            />
          ) : (
            <AppTable
              rowKey={"tracking_id"}
              className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal	text-theme-grey"
              dataSource={data?.data?.testCaseDetails || []}
              onChange={(sort, filters) => {
                handleFilter(filters);
              }}
              columns={columns}
              pagination={false}
              size="small"
            ></AppTable>
          )}

          <div className="flex items-center justify-between space-x-2 py-2 text-[10px] xs:text-xs">
            <div className="flex items-center justify-end space-x-2 text-[10px] xs:text-xs">
              <div className="items-center font-poppins_cf text-xs text-theme-black">
                Total count {data?.data?.totalCounts || 0}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="items-center font-poppins_cf text-xs text-theme-black">
                Results per page
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

              <div className="flex items-center space-x-2 rounded border-[1px] border-theme-border bg-white p-1.5">
                <button
                  onClick={goPrev}
                  className={`${canPrev ? "" : "opacity-50"}`}
                  disabled={!canPrev || isFetching}
                >
                <div className="flex">  <LeftChevIcon />
                  <IV_LeftArrow_Single /></div>
                </button>
                <div
                  className="flex items-center gap-2 text-[10px] xs:text-xs"
                  data-testid="pageCount"
                >
                  {/* Page {page} of{" "} */}
                  {isFetching ? (
                    <span className="inline-block animate-pulse rounded-md bg-gray-300 text-gray-300">
                      00
                    </span>
                  ) : (
                    (() => {
                      const elements = [];
                      for (let i = 1; i < lastPage + 1; i++) {
                        elements.push(
                          i == page ? (
                            <div className="flex flex-row gap-2 rounded-[2px] bg-theme-dark px-1.5 py-0.5 text-theme-white">
                              <span className="gap-2" key={i}>
                                {i}
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-row gap-2 text-black">
                              <span className="gap-2" key={i}>
                                {i}
                              </span>
                            </div>
                          )
                        );
                      }
                      return elements;
                    })()
                  )}{" "}
                </div>
                <button
                  onClick={goNext}
                  className={`${canNext ? "" : "opacity-50"}`}
                  disabled={!canNext || isFetching}
                >
                  <div className="flex">
                    <IV_RIGHT_SINGLE />
                    <RightChevIcon className="text-black" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppModal show={isDelete}>
        <DeleteTestCaseModal
          onDeleteSuccess={handleLogoutModalClose}
          testCaseItem={selectedItems}

          onDeleteCancel={onDeleteCancel}
        />
      </AppModal>
      <Modal
        show={openModal}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-90px)] md:w-auto rounded-[4px]"}
      >
        <div
          data-testid="openModal "
          className="flex  flex-col justify-center  p-1 text-center md:p-2"
        >
          <div className="text-left text-xl  font-medium text-theme-black ">
            Schedule Testcase
          </div>

          <div className="my-3 flex gap-4">
            <div className="text-xs font-semibold text-theme-dark	">TC-50</div>

            <div className="text-xs font-medium text-theme-green ">
              Expected Execution Time: 20min
            </div>
          </div>
          <div className="text-left text-sm font-medium text-theme-black ">
            Select DUT from Available Devices
          </div>
          <hr className="my-3" />

          <div className="mb-1 text-left text-xs font-medium text-theme-black">
            Required No. of DUT : 3
          </div>

          <div className=" w-full rounded-[4px] border-[1px] border-theme-border bg-theme-greyLight ">
            <div className="mt-3 flex justify-between gap-3 p-3 pb-0 ">
              <DatePicker
                name="patient"
                type="text"
                placeholder="Write something here..."
                onChange={() => {
                  // setSearchTerm(e.target.value)
                }}
                wrapperClass="mb-4"
                onFocus={() => {
                  // if (!isOpen && patientList.length > 0) {
                  //     setIsOpen(true)
                  // }
                }}
                required
                autoComplete="off"
                wrapperAttr={{ className: "h-[35px] w-full  my-1 " }}
              >
                Start Date
              </DatePicker>

              <TimePicker
                name="patient"
                type="text"
                placeholder="Write something here..."
                //value={searchTerm}
                onChange={() => {
                  // setSearchTerm(e.target.value)
                }}
                wrapperClass="mb-4"
                onFocus={() => {
                  // if (!isOpen && patientList.length > 0) {
                  //     setIsOpen(true)
                  // }
                }}
                autoComplete="off"
                required
                wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
              >
                Start Time
              </TimePicker>
            </div>

            <div className="my-3 px-3 text-left  text-xs font-medium text-theme-green">
              Expected End Time: 2024-01-01, Mon 06:50PM
            </div>
            <hr />

            <div className="mt-8 flex justify-between gap-2 px-3">
              <TimePicker
                name="patient"
                type="text"
                placeholder="Write something here..."
                //value={searchTerm}
                onChange={() => {
                  // setSearchTerm(e.target.value)
                }}
                wrapperClass="mb-4"
                onFocus={() => {
                  // if (!isOpen && patientList.length > 0) {
                  //     setIsOpen(true)
                  // }
                }}
                autoComplete="off"
                wrapperAttr={{ className: "h-[50px] w-full my-1 " }}
              >
                TimeStamp(UTC)
              </TimePicker>
              <Input
                name="patient"
                type="text"
                placeholder="Enter"
                //value={searchTerm}
                onChange={() => {
                  // setSearchTerm(e.target.value)
                }}
                wrapperClass="mb-4"
                onFocus={() => {
                  // if (!isOpen && patientList.length > 0) {
                  //     setIsOpen(true)
                  // }
                }}
                autoComplete="off"
                wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
              >
                Iteration
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
                wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
              >
                Buffer (Min)
              </Input>
            </div>
          </div>

          <div className="my-8  flex justify-between gap-2">
            <Select
              options={getCommonData}
              value={selectedAction}
              onChange={(e) => {
                //setPage(1)
                onCommonChange(e);
              }}
              placeholder="Select Device"
              clearable
              customLabel="Device 1"
            />
            <Select
              options={getCommonData}
              value={selectedAction}
              onChange={(e) => {
                //setPage(1)
                onCommonChange(e);
              }}
              placeholder="Select Device"
              clearable
              customLabel="Device 2"
            />
            <Select
              options={getCommonData}
              value={selectedAction}
              onChange={(e) => {
                //setPage(1)
                onCommonChange(e);
              }}
              placeholder="Select Device"
              clearable
              customLabel="Device 3"
            />
          </div>
          <hr />

          <div className="mt-6 flex flex-col justify-end space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
            <button
              title="Close popup"
              onClick={handleLogoutModalClose}
              className="w-[90px] cursor-pointer rounded-md    p-1 text-xs font-normal text-theme-black"
            >
              Cancel
            </button>
            <button
              title="Decline"
              onClick={handleLogout}
              className="w-[90px] cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
            >
              {"Done"}
            </button>
          </div>
        </div>
      </Modal>
      {/*  Create Bucket modal */}
      <Modal
        show={openModalCreateBucket}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-90px)] md:w-auto rounded-[4px]"}
      >
        <div
          data-testid="openModal "
          className="flex  w-72 flex-col justify-center  p-1 text-center md:p-2"
        >
          <div className="text-left text-base  font-medium text-theme-black ">
            Create Bucket
          </div>

          <hr className="my-2" />

          <div className="my-4">
            <Input
              name="patient"
              type="text"
              placeholder="Bucket Name GN"
              //value={searchTerm}
              onChange={(e) => {
                console.log(e.target.value);
                // setSearchTerm(e.target.value)
              }}
              wrapperClass="mb-4 "
              onFocus={() => {
                // if (!isOpen && patientList.length > 0) {
                //     setIsOpen(true)
                // }
              }}
              autoComplete="off"
              wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
            >
              Bucket Name
            </Input>
          </div>

          <div className="">
            <Textarea
              name="patient"
              type="text"
              placeholder="Write Something.."
              //value={searchTerm}
              onChange={(e) => {
                console.log(e.target.value);

                // setSearchTerm(e.target.value)
              }}
              wrapperClass="mb-4 "
              onFocus={() => {
                // if (!isOpen && patientList.length > 0) {
                //     setIsOpen(true)
                // }
              }}
              autoComplete="off"
              wrapperAttr="h-[75px] w-full my-1 "
            >
              Description
            </Textarea>
          </div>

          <hr className="mt-2" />

          <div className="mt-6 flex flex-col justify-end space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
            <button
              title="Decline"
              onClick={handleLogout}
              className="w-[90px] cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
            >
              {"Create Group"}
            </button>
            {/* <button disabled={isLoading} title="LOGOUT" onClick={handleLogout} className='bg-coral text-white p-2 rounded-md xs:w-20 w-full disabled:opacity-50'>Yes</button> */}
          </div>
        </div>
      </Modal>

      {/*  Assign Bucket modal */}
      <Modal
        show={openModalAssignBucket}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-90px)] md:w-auto rounded-[4px]"}
      >
        <div
          data-testid="openModal "
          className="flex  w-80 flex-col justify-center  p-1 text-center md:p-2"
        >
          <div className="flex items-center justify-between">
            <div className="text-left text-base  font-medium text-theme-black ">
              Assign to Bucket
            </div>
            <div className="text-xs text-theme-black">
              Total No. of Test Case : 2
            </div>
          </div>

          <hr className="my-2" />

          <div className="my-4">
            <Select
              options={getCommonData}
              value={selectedAction}
              onChange={(e) => {
                //setPage(1)
                onCommonChange(e);
              }}
              placeholder="Bucket Name GN"
              clearable
              customLabel="Bucket Name"
            />
          </div>

          <hr />

          <div className="mt-6 flex flex-col justify-end space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
            {/* <button
              title="Close popup"
              onClick={handleLogoutModalClose}
              className="w-[90px] cursor-pointer rounded-md    p-1 text-xs font-normal text-theme-black"
            >
              Cancel
            </button> */}
            {/* <button disabled={isLoading} title='Close popup' onClick={handleLogoutModalClose} className='border border-gray-light p-2 rounded-md text-gray-dark xs:w-20 w-full disabled:opacity-50'>Cancel</button> */}
            <button
              title="Decline"
              onClick={handleLogout}
              className="w-[90px] cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
            >
              Assign
            </button>
            {/* <button disabled={isLoading} title="LOGOUT" onClick={handleLogout} className='bg-coral text-white p-2 rounded-md xs:w-20 w-full disabled:opacity-50'>Yes</button> */}
          </div>
        </div>
      </Modal>

      {/*  Test Case details modal */}
      <Modal
        show={openModalTestCase}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-90px)] md:w-auto rounded-[4px]"}
      >
        <div
          data-testid="openModal "
          className="flex  w-80 flex-col justify-center  p-1 text-center md:p-2"
        >
          <div className="text-left text-base  font-medium text-theme-black ">
            Testcase Details
          </div>

          <hr className="my-2" />
        </div>
      </Modal>

      {/*  Import Export testcase */}
      <Modal
        show={openModalImport}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-90px)] md:w-auto rounded-[4px]"}
      >
        <div
          data-testid="openModal "
          className="flex  w-80 flex-col justify-center  p-1 text-center md:p-2"
        >
          <div className="text-left font-poppins_w  text-xl text-theme-black ">
            Import Testcase
          </div>

          <div className="my-2 flex items-center ">
            <Button
              variant="outlined"
              size="small"
              style={{
                borderColor: "#EC1944",
                color: "#EC1944",
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
              Choose File
            </Button>

            <div className="mx-2 font-poppins_cf text-xs font-normal text-theme-grey">
              No file Selected
            </div>
          </div>

          <hr />

          <div className="mt-6 flex flex-col justify-end space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
            <button
              title="Close popup"
              onClick={handleLogoutModalClose}
              className="w-[90px] cursor-pointer rounded-md    p-1 text-xs font-normal text-theme-black"
            >
              Cancel
            </button>
            {/* <button disabled={isLoading} title='Close popup' onClick={handleLogoutModalClose} className='border border-gray-light p-2 rounded-md text-gray-dark xs:w-20 w-full disabled:opacity-50'>Cancel</button> */}
            <button
              title="Decline"
              onClick={handleLogout}
              className="w-[90px] cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
            >
              Assign
            </button>
            {/* <button disabled={isLoading} title="LOGOUT" onClick={handleLogout} className='bg-coral text-white p-2 rounded-md xs:w-20 w-full disabled:opacity-50'>Yes</button> */}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AccessManagement;
