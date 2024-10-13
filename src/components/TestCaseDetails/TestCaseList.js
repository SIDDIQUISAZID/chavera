import { useState, useMemo, useCallback, useEffect } from "react";
import { AppTable } from "../../components/Table";
import Modal from "../../components/Modal";
import { IV_FILTER_WHITE } from "../../assets/icons";
import SearchInput from "../../components/Input/SearchInput";
import PageLoader from "../Loader/PageLoader";
import { useNavigate } from "react-router-dom";
import { useGetScheduleListQuery } from "../../features/dashboard/dashboardAPI";
import usePaginationSearch from "../../features/user/hooks/usePaginationSearch";
import FilterModal from "./FilterModal";
import moment from "moment";
import Button from "../../components/Button";
import {
  LeftChevIcon,
  RightChevIcon,
  IC_Delete,
  IV_DELETE_TEST,
  IV_RIGHT_SINGLE,
  IV_LeftArrow_Single,
} from "../../assets/icons";
import useMultiStep from "../../hooks/useMultiStep";
import { useSearchParams } from "react-router-dom";
import {
  initialPagination,
  paginationList,
} from "../../features/user/utils/pagination";
import AppModal from "../Modal/AppModal";

const TestCaseList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchName, setSearchName] = useState(() => {
    return searchParams.get("q") || "";
  });
  const [logoutModal, setLogoutModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [userName, setUserName] = useState();
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState(moment().format("YYYY-MM-DD"));
  const [to, setTo] = useState(moment().add(1, "days").format("YYYY-MM-DD"));
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
      page: page - 1,
      size: perPage,
      searchText: searchName,
      filterStatus: status,
      filterFromDate: from + " 00:00:00.000",
      filterToDate: to + " 00:00:00.000",
      filterCreatedBy: userName,
    };
  }, [page, perPage, searchName, status, userName, to, from]);
  const {
    isLoading,
    data: scheduledList,
    isFetching,
  } = useGetScheduleListQuery(params);

  useEffect(() => {
    if (Number.isInteger(scheduledList?.data?.totalCounts)) {
      setTotalDataCount(scheduledList?.data?.totalCounts || 1);
    }
  }, [scheduledList?.data?.totalCounts, setTotalDataCount]);
  usePaginationSearch({ page, perPage });
  const tableStyle = "w-full truncate text-theme-grey text-xs font-normal mx-2";
  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-800";
      case "In Progress":
        return " text-[#FF6F2B]";
      case "NOT YET STARTED":
        return " text-red-800";
      default:
        return;
    }
  };

  const handleFilterSubmit = (startDate, endDate) => {
    setFrom(startDate);
    setTo(endDate);
  };

  const columns = useMemo(() => {
    return [
      {
        title: "Test Plan ID",
        dataIndex: "tpId",
        key: "tpId",
        render: (_, e) => (
          <div
            className={
              "mx-2 w-full cursor-pointer truncate text-xs font-normal text-theme-blue underline"
            }
            onClick={() =>
              navigate(
                `/testresultHub/testDetails/${scheduledList?.data?.totalCounts}/${scheduledList?.data?.totalCompleted}/${scheduledList?.data?.totalInProgress}/${scheduledList?.data?.totalYetToStart}`,
                {
                  state: {
                    tpName: e?.tpName,
                    tp_id: e?.tpScheduleId,
                  },
                }
              )
            }
          >
            TP-{e?.tpId}
          </div>
        ),
      },
      {
        title: "Test Plan",
        dataIndex: "tpName",
        key: "tpName",
        render: (_, e) => <div className={tableStyle}>{e?.tpName}</div>,
      },
      {
        title: "User Name",
        dataIndex: "userName",
        key: "userName",
        render: (_, e) => <div className={tableStyle}>{e?.userName}</div>,
      },
      {
        title: "No. of testcases",
        dataIndex: "noTestCases",
        key: "noTestCases",
        render: (_, e) => <div className={tableStyle}>{e?.noTestCases}</div>,
      },
      {
        title: "Timestamp",
        dataIndex: "Timestamp",
        key: "Timestamp",
        render: (_, e) => (
          <div className={tableStyle}>
            {moment
              .utc(e?.schedule_date_time)
              .local()
              .format("YYYY-MM-DD HH:mm:ss A")}
          </div>
        ),
      },
      {
        title: "Execution Status",
        dataIndex: "executionStatus",
        key: "executionStatus",
        render: (_, e) => (
          <div
            className={`mx-2 w-full truncate text-xs font-normal ${getStatusColor(
              e?.tpResultStatus
            )}`}
          >
            {e?.tpResultStatus || "--"}
          </div>
        ),
      },
    ];
  }, [scheduledList?.data?.TestPlans]);

  const handleLogout = async () => {
    setLogoutModal(false);
  };

  const handleLogoutModalClose = useCallback(() => {
    setLogoutModal(false);
    setFilterModal(filterModal);
    setFilterModal(false);
  }, []);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      setSelectedRowKeys(selectedRows.map((row) => row?.tcId));
    },
    onSelectAll: (selected) => {
      if (selected) {
        setSelectedRowKeys(
          scheduledList?.data?.TestPlans?.map((row) => row.tcId)
        );
      } else {
        setSelectedRowKeys([]);
      }
    },
  };

  return (
    <>
      <div className="w-full">
        <div className="mb-2">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="font-poppins text-xl font-medium text-theme-black">
              Test Result
            </div>

            <div className="flex  gap-2">
              <SearchInput
                searchName={searchName}
                setSearchName={setSearchName}
                placeholder={"Search... "}
              />
              <Button
                className="rounded border-[1px] bg-theme-dark px-3 font-poppins_cf text-xs font-medium text-theme-white sm:px-2"
                onClick={() => setFilterModal(true)}
              >
                <IV_FILTER_WHITE className="mr-1" />
                Filter
              </Button>
              <div
                size="small"
                color="primary"
                variant="outlined"
                className="rounded-[3px] p-2"
                style={{
                  color: "#EC1944",
                  backgroundColor: "white",
                  borderColor: "#EC1944",
                  borderWidth: ["1px"],
                }}
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: "400",

                  borderColor: "#EC1944",
                  borderWidth: ["1px"],
                }}
              >
                <IV_DELETE_TEST />
              </div>
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
              rowKey={"tpScheduleId"}
              className="border-blue-light orderDetailsProduct overflow-auto border text-xs font-normal text-theme-grey"
              pagination={false}
              size="small"
              dataSource={scheduledList?.data?.TestPlans || []}
              columns={columns}
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
            />
          )}

          <div className="mb-4 flex items-center justify-between space-x-2 py-2 text-[10px] xs:text-xs">
            <div className="flex items-center justify-end space-x-2 text-[10px] xs:text-xs">
              <div className="items-center font-poppins_cf text-xs text-theme-black">
                Total count {scheduledList?.data?.totalCounts || 0}
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
                          i === page ? (
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

      <AppModal
        show={filterModal}
        onClose={handleLogoutModalClose}
        title="Apply Filter"
        modalClass={"w-[calc(100%-80px)] md:w-auto rounded-[4px]"}
      >
        <FilterModal
          onDeleteSuccess={handleLogoutModalClose}
          onSubmit={handleFilterSubmit}
        />
      </AppModal>
      <Modal
        show={logoutModal}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-80px)] md:w-auto rounded-[4px]"}
      >
        <div
          data-testid="logoutModal"
          className="flex flex-col justify-center p-1 text-center md:p-2"
        >
          <IC_Delete className="mx-auto mb-2 h-10 w-10 text-coral" />

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

export default TestCaseList;
