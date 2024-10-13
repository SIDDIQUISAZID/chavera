import { useState, useMemo, useCallback } from "react";

import { userdata } from "../../components/userdata";
import { AppTable } from "../../components/Table";
import SearchInput from "../../components/Input/SearchInput";
import Modal from "../../components/Modal";
import { useActionFilter } from "../../features/user/hooks";
import { TableContainer, Button } from "@mui/material";
import { IC_STATUS } from "../../assets/icons";
import PageLoader from "../../components/Loader/PageLoader";

import {
  LeftChevIcon,
  RightChevIcon,
  IC_Accept,
  IC_Reject,
  IC_Player,
  IC_Eye,
  IC_Edit,
  IC_Small_Delete,
  IC_Pause,
  IC_Download,
  IV_RIGHT_SINGLE,
  IV_LeftArrow_Single,
} from "../../assets/icons";
import useMultiStep from "../../hooks/useMultiStep";
import { useSearchParams } from "react-router-dom";
import {
  initialPagination,
  paginationList,
} from "../../features/user/utils/pagination";
import { Test_Hub } from "../../utils/commonTextFile";
import Input from "../../components/Input/Input";
import { theme } from "antd";

const AccessManagement = () => {
  const [searchParams] = useSearchParams();
  const { selectedAction, onGenderChange } = useActionFilter();
  const [searchName, setSearchName] = useState(() => {
    return searchParams.get("q") || "";
  });

  const [openModal, setModal] = useState(false);
  const [isPermission, setPermission] = useState(false);

  const [isFetching, setFetching] = useState(false);

  const [isAssignToBucketModalOpen, setAssignToBucketModalOpen] =
    useState(false);
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
  } = useMultiStep(initialPagination({ searchParams }));

  const [selectedItems, setSelectedItems] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userData, setUserData] = useState(userdata);

  const tableStyle = "w-full truncate text-theme-grey text-xs	font-normal mx-2";

  const permissionData = [
    {
      name: "Manage Test Account",
      isActive: false,
    },
    {
      name: "Test Features – Android , IOS",
      isActive: false,
    },
    {
      name: "Device Monitoring",
      isActive: true,
    },
    {
      name: "Test Case Hub, Test Plan Hub, Test Schedule Hub",
      isActive: false,
    },
    {
      name: "Results and Reports",
      isActive: false,
    },
    {
      name: "Network KPI’s",
      isActive: false,
    },
    {
      name: "Test Case Execution History",
      isActive: false,
    },
  ];

  const columns = useMemo(() => {
    return [
      {
        title: "S.No",
        dataIndex: "serialNumber",
        key: "serialNumber",
        width: "10%",
        render: (_, e) => <div className={tableStyle}>{e.serialNumber}</div>,
      },
      {
        title: "Exec. Testcase ID",
        dataIndex: "execTestcaseID",
        key: "execTestcaseID",
        width: "20%",

        render: (_, e) => (
          <div
            className={
              "mx-2 w-full truncate text-xs font-normal	text-theme-blue underline"
            }
          >
            {e.execTestcaseID}
          </div>
        ),
      },
      {
        title: "Testcase Name",
        dataIndex: "testcaseName",
        key: "testcaseName",
        width: "20%",

        render: (_, e) => <div className={[tableStyle]}>{e.testcaseName}</div>,
      },
      {
        title: "Feature",
        dataIndex: "feature",
        key: "feature",
        width: "20%",
        //filterIcon: () => <IC_Filter />,

        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e.feature}</div>
          </div>
        ),
      },
      {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration",
        width: "15%",
        //filterIcon: () => <IC_Filter />,

        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e.iteration}</div>
          </div>
        ),
      },
      {
        title: "Est. Time(Sec)",
        dataIndex: "estTime",
        key: "estTime",
        width: "15%",
        //filterIcon: () => <IC_Filter />,

        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e.estTime}</div>
          </div>
        ),
      },
      {
        title: (
          <div className="flex items-center">
            Status
            <IC_STATUS className="mr-2" />
          </div>
        ),
        dataIndex: "status",
        key: "status",
        width: "20%",
        //filterIcon: () => <IC_Filter />,

        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e.status}</div>
          </div>
        ),
      },

      {
        title: "Execution",
        dataIndex: "description",
        key: "description",
        width: "25%",
        //filterIcon: () => <IC_Filter />,

        render: (_, e) => (
          <div>
            <IC_Pause />
          </div>
        ),
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: "20%",
        //filterIcon: () => <IC_Filter />,

        render: (_, e) => (
          <div className="flex">
            <IC_Download className="mx-2" />
          </div>
        ),
      },
    ];
  }, [userData]);

  const handleLogout = async () => {
    setModal(false);
    setPermission(false);
  };

  const handleLogoutModalClose = useCallback(() => {
    setModal(false);
    setPermission(false);
  }, []);

  return (
    <>
      <div>
        {/* <div className="flex text-[10px]">
          {Test_Hub} <div className="mx-2">|</div>
          <div className="text-[10px] text-theme-dark"> Executed Test Case</div>
        </div> */}
        <div className="my-2">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="text-lg font-medium text-theme-black">
              Executed Testcase
            </div>

            <div className="flex  justify-between">
              <Button
                variant="outlined"
                size="small"
                style={{
                  borderColor: "#EC1944",
                  color: "#EC1944",
                  marginLeft: "8px",
                  padding: "8px",
                }}
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
                // disabled={selectedItems.length === 0}
                onClick={() => {
                  setModal(true);
                }}
              >
                Download Log
              </Button>

              <Button
                variant="contained"
                size="small"
                color="primary"
                style={{
                  backgroundColor: "#EC1944",
                  color: "white",
                  marginLeft: "8px",
                  padding: "8px",
                }}
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
                // disabled={selectedItems.length === 0}

                onClick={() => {
                  setModal(true);
                }}
              >
                Download Summary
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <AppTable
            rowKey={"tracking_id"}
            className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal	text-theme-grey"
            dataSource={userData}
            columns={columns}
            pagination={false}
            size="small"
          ></AppTable>

<div className="flex items-center justify-between space-x-2 py-2 text-[10px] xs:text-xs">
            <div className="flex items-center justify-end space-x-2 text-[10px] xs:text-xs">
              <div className="items-center font-poppins_cf text-xs text-theme-black">
                Total count { 0}
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
      <Modal
        show={openModal}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-90px)] md:w-auto rounded-[4px]"}
      >
        <div
          data-testid="openModal"
          className="flex flex-col justify-center p-1 text-center md:p-2"
        >
          <div className="flex items-center justify-between ">
            <div className="text-xl font-medium text-theme-black">
              View Role Permission
            </div>
            {!isPermission && (
              <div
                className="text-xs font-medium text-theme-dark underline"
                onClick={() => setPermission(true)}
              >
                Permission
              </div>
            )}
          </div>

          <div className="my-6 w-[500px]">
            <div className="flex items-end justify-between">
              <div className="h-12 w-[70%] content-center items-center rounded-t-lg  bg-theme-dark text-sm font-medium text-white ">
                Permission
              </div>

              <div className="ml-[0.5px] h-16 w-[30%]  content-center items-center rounded-t-lg bg-theme-purple text-sm font-medium text-white ">
                Test Engineer
              </div>
            </div>

            {permissionData.map((item) => (
              <div className="flex  items-center justify-between border-b-[1px] border-l-[1px] border-r-[1px] px-2">
                <div className="h-8  w-[71%] content-center  self-center  border-r-[1px] text-left text-xs font-medium">
                  {item.name}
                </div>
                <div className=" flex w-[29%] justify-center self-center">
                  {item.isActive ? (
                    <IC_Accept className="bg-center" />
                  ) : (
                    <IC_Reject />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div>
            <Input
              name="patient"
              type="text"
              placeholder="Write something here..."
              //value={searchTerm}
              onChange={(e) => {
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
              Description
            </Input>
          </div>

          {isPermission && (
            <div className="flex flex-col justify-end space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
              <button
                title="Close popup"
                onClick={handleLogoutModalClose}
                className="w-[90px] cursor-pointer rounded-md border-[1px] border-theme-dark   bg-white p-1 text-xs font-normal text-theme-dark"
              >
                Cancel
              </button>
              {/* <button disabled={isLoading} title='Close popup' onClick={handleLogoutModalClose} className='border border-gray-light p-2 rounded-md text-gray-dark xs:w-20 w-full disabled:opacity-50'>Cancel</button> */}
              <button
                title="Decline"
                onClick={handleLogout}
                className="w-[90px] cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
              >
                {"Done"}
              </button>
              {/* <button disabled={isLoading} title="LOGOUT" onClick={handleLogout} className='bg-coral text-white p-2 rounded-md xs:w-20 w-full disabled:opacity-50'>Yes</button> */}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default AccessManagement;
