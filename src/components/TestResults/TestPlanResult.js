import { useState, useMemo, useCallback } from "react";
import { TableContainer } from "@mui/material";
import { deviceData } from "../userdata";
import { useDispatch } from "react-redux";
import { AppTable } from "../Table";
import { Select } from "../Select";
import SearchInput from "../Input/SearchInput";
import Modal from "../Modal";
import { getActionData } from "../../features/user/utils/action";
import { useActionFilter } from "../../features/user/hooks";
import { testcaseresult } from "../userdata";
import { IC_STATUS } from "../../assets/icons";

import DatePicker from "../../components/Input/DatePicker";

import { DOWNLOAD_SUMMARY } from "../../utils/commonTextFile";
import { TEST_PLAN_RESULT } from "../../utils/commonTextFile";
import { Button } from "@mui/material";
import {
  LeftChevIcon,
  RightChevIcon,
  IC_Filter,
  IC_Accept,
  IC_Reject,
  IC_Delete,
  IC_Approved,
  IV_RIGHT_SINGLE,
  IV_LeftArrow_Single,
} from "../../assets/icons";
import useMultiStep from "../../hooks/useMultiStep";
import { useSearchParams, useNavigate } from "react-router-dom";
import PageLoader from "../Loader/PageLoader";

import {
  initialPagination,
  paginationList,
} from "../../features/user/utils/pagination";

const TestPlanResult = () => {
  const [searchParams] = useSearchParams();
  const { selectedAction, onGenderChange } = useActionFilter();
  const [date, setDate] = useState(new Date());
  const [searchName, setSearchName] = useState(() => {
    return searchParams.get("q") || "";
  });
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);
  const [isDelete, setDelete] = useState(false);

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
    setTotalDataCount,
  } = useMultiStep(initialPagination({ searchParams }));

  const [selectedItems, setSelectedItems] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userData, setUserData] = useState(deviceData);

  const dispatch = useDispatch();

  const tableStyle = "w-full truncate text-theme-grey text-xs font-normal mx-2";
  console.log(selectedItems);

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
        title: "Testcase ID",
        dataIndex: "userName",
        key: "testcaseId",
        width: "10%",
        render: (_, e) => <div className={tableStyle}>TC-202</div>,
      },
      {
        title: "Testcase Name",
        dataIndex: "testcaseName",
        key: "testcaseName",
        width: "20%",
        render: (_, e) => <div className={tableStyle}>Test Case 2</div>,
      },
      {
        title: "Category",
        dataIndex: "Category",
        key: "Category",
        width: "10%",
        render: (_, e) => <div className={tableStyle}>Download Policy</div>,
      },
      {
        title: "Timestamp",
        dataIndex: "Timestamp",
        key: "Timestamp",
        width: "10%",
        render: (_, e) => <div className={tableStyle}>2024-06-02 10:49:14</div>,
      },
      {
        title: (
          <div className="flex items-center">
            Status
            <IC_STATUS className="mr-2" />
          </div>
        ),
        dataIndex: "Status",
        key: "Status",
        width: "10%",
        render: (_, e) => <div className={tableStyle}>Passed</div>,
      },
      {
        title: "Logs File",
        dataIndex: "Logs File",
        key: "Logs File",
        width: "10%",
        render: (_) => (
          <div className={tableStyle}>
            <img src="/img/frame.svg"></img>
          </div>
        ),
      },
      {
        title: "Reason",
        dataIndex: "Reason",
        key: "Reason",
        width: "20%",
        render: (_, e) => <div className={tableStyle}>Invalid Input</div>,
      },
    ];
  }, [userData, selectedItems]);

  const handleLogout = async () => {
    setLogoutModal(false);
  };

  const handleLogoutModalClose = useCallback(() => {
    setLogoutModal(false);
  }, []);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      setSelectedRowKeys(selectedRows.map((row) => row.deviceId));
    },
    onSelectAll: (selected, selectedRows) => {
      if (selected) {
        setSelectedRowKeys(userData?.map((row) => row.deviceId));
      } else {
        setSelectedRowKeys([]);
      }
    },
  };

  return (
    <>
      <div>
        <div className="flex text-[10px]">
          Test Result Hub<div className="mx-2">|</div>
          <div className="text-[10px] text-theme-dark"> {TEST_PLAN_RESULT}</div>
        </div>
        <div className="my-4">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="font-poppins text-lg font-medium text-theme-black">
              {TEST_PLAN_RESULT}
            </div>

            <div className="flex  gap-2">
              <DatePicker
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
                wrapperAttr={{ className: "h-[35px] w-full  my-1 " }}
              />

              <Button
                variant="contained"
                size="small"
                color="primary"
                style={{
                  backgroundColor: "#EC1944",
                  color: "white",

                  // padding: "8px",
                }}
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: "400",
                  width: "300px",
                }}
              >
                {DOWNLOAD_SUMMARY}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          {false ? (
            <PageLoader
              containerAttr={{ className: "bg-blue-light/40" }}
              loaderColor={"#EC1944"}
            />
          ) : (
            <AppTable
              rowKey={"serialNumber"}
              className="border-blue-light orderDetailsProduct overflow-auto border text-xs font-normal text-theme-grey"
              dataSource={userData}
              columns={columns}
              pagination={false}
              size="small"
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
            ></AppTable>
          )}

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
                  <div className="flex">
                    {" "}
                    <LeftChevIcon />
                    <IV_LeftArrow_Single />
                  </div>
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
      <Modal
        show={logoutModal}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-80px)] md:w-auto rounded-[4px]"}
      >
        <div
          data-testid="logoutModal"
          className="flex flex-col justify-center p-1 text-center md:p-2"
        >
          {!isDelete ? (
            <IC_Delete className="mx-auto mb-2 h-10 w-10 text-coral" />
          ) : (
            <IC_Approved className="mx-auto mb-2 h-10 w-10 text-coral" />
          )}

          {!isDelete && (
            <div className="mb-2 mt-1 flex w-full justify-center text-center text-lg font-medium text-theme-black">
              <p>Are you sure?</p>
            </div>
          )}
          <p className="mb-4 mt-2 w-72 text-xs font-normal">
            {isDelete
              ? "Do you wish to approve the request? Please press 'Yes' to confirm."
              : "Are you sure you want to decline the request?"}
          </p>
          <div className="flex flex-col justify-center space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0">
            <button
              title="Close popup"
              onClick={handleLogoutModalClose}
              className="w-[90px] cursor-pointer rounded-md bg-white p-1 text-xs font-normal text-theme-black"
            >
              Cancel
            </button>
            <button
              title="Decline"
              onClick={handleLogout}
              className="w-[90px] cursor-pointer rounded-md bg-theme-dark py-2 text-xs font-normal text-white"
            >
              {isDelete ? "Yes" : "Decline"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TestPlanResult;
