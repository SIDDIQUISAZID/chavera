import { useState, useMemo, useCallback, useEffect } from "react";
import { AppTable } from "../../components/Table";
import { TableContainer, Button } from "@mui/material";
import usePaginationSearch from "../../features/user/hooks/usePaginationSearch";
import AppModal from "../../components/Modal/AppModal";
import AcceptOrDeclineModal from "./AcceptOrDeclineModal";
import { useGetDeviceRequestedQuery } from "../../features/dashboard/dashboardAPI";
import {
  LeftChevIcon,
  RightChevIcon,
  IC_Accept,
  IC_Reject,
  IC_STATUS,
  IV_RIGHT_SINGLE,
  IV_LeftArrow_Single,
} from "../../assets/icons";
import useMultiStep from "../../hooks/useMultiStep";
import { useSearchParams } from "react-router-dom";
import {
  initialPagination,
  paginationList,
} from "../../features/user/utils/pagination";
import { Declined_Approval } from "../../utils/commonTextFile";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/auth/authSlice";
const AccessManagement = () => {
  const userData = useAppSelector(selectCurrentUser);
  const { userType } = userData;
  const [logoutModal, setLogoutModal] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [status, setStatus] = useState("PENDING");
  const [searchParams] = useSearchParams();
  const [deviceData, setDevice] = useState();
  const [searchName, setSearchName] = useState(() => {
    return searchParams.get("q") || "";
  });
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
      page: (page - 1).toString(),
      size: perPage?.toString(),
      status: status,
      searchText: searchName,
    };
  }, [page, perPage, searchName, status]);
  const { data, isFetching } = useGetDeviceRequestedQuery({
    params,
  });
  useEffect(() => {
    if (Number.isInteger(data?.data?.totalCounts)) {
      setTotalDataCount(data?.data?.totalCounts || 1);
    }
  }, [data?.data?.totalCounts, setTotalDataCount]);
  usePaginationSearch({ page, perPage });

  const tableStyle = "w-full truncate text-theme-grey text-xs	font-normal mx-2";
  const columns = useMemo(() => {
    return [
      userType == "Admin"
        ? {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
            width: "15%",
            sorter: true,
            render: (_, e) => <div className={tableStyle}>{e.userName}</div>,
          }
        : {
            title: "",
            dataIndex: "",
            key: "",
          },
      userType == "Admin"
        ? {
            title: "Role",
            dataIndex: "role",
            key: "role",
            width: "15%",
            filterIcon: (filtered) => <IC_STATUS />,

            filters: [
              { text: "Test Engineer", value: "test engineer" },
              { text: "Engineer", value: "engineer" },
            ],
            render: (_, e) => (
              <div>
                <div className={tableStyle}>{e.roleName}</div>
              </div>
            ),
          }
        : {
            title: "",
            dataIndex: "",
            key: "",
          },

      userType == "Admin"
        ? {
            title: "Email ID",
            dataIndex: "email",
            key: "email",
            width: "20%",
            render: (_, e) => <div className={tableStyle}>{e.email}</div>,
          }
        : {
            title: "",
            dataIndex: "",
            key: "",
          },
      {
        title: "Date & Time ",
        dataIndex: "email",
        key: "email",
        width: "10%",
        render: (_, e) => <div className={tableStyle}>{e?.timeStamp}</div>,
      },

      {
        title: "IMEI 1",
        dataIndex: "email",
        key: "email",
        width: "15%",
        render: (_, e) => <div className={tableStyle}>{e?.imei1}</div>,
      },
      {
        title: "IMEI 2",
        dataIndex: "imei2",
        key: "imei2",
        width: "10%",
        render: (_, e) => <div className={tableStyle}>{e?.imei2}</div>,
      },
      {
        title: "Make & Modal",
        dataIndex: "email",
        key: "email",
        width: "20%",
        render: (_, e) => <div className={tableStyle}>{e?.make}</div>,
      },
      // {
      //   title: "Modal",
      //   dataIndex: "email",
      //   key: "email",
      //   width: "30%",
      //   render: (_, e) => <div className={tableStyle}>{e?.model}</div>,
      // },

      userType == "Admin"
        ? status == "PENDING"
          ? {
              title: "Action",
              dataIndex: "action",
              key: "action",
              width: "40%",
              render: (_, e) => (
                <div className="mx-2 flex w-full truncate text-xs font-normal	text-theme-dark underline">
                  <IC_Accept
                    className="mx-2 cursor-pointer"
                    onClick={() => {
                      setLogoutModal(true);
                      setDelete(true);
                      setDevice(e);
                    }}
                  />
                  <IC_Reject
                    className="cursor-pointer"
                    onClick={() => {
                      setLogoutModal(true);
                      setDelete(false);
                      setDevice(e);
                    }}
                  />{" "}
                </div>
              ),
            }
          : status == "REJECTED"
          ? {
              title: "Action",
              dataIndex: "action",
              key: "action",
              width: "40%",
              render: (_, e) => (
                <div
                  className="mx-2 flex w-full truncate text-xs font-normal	text-theme-dark underline"
                  onClick={() => {
                    setLogoutModal(true);
                    setDelete(true);
                    setDevice(e);
                  }}
                >
                  Reapprove
                </div>
              ),
            }
          : {
              title: "",
              dataIndex: "",
              key: "",
              width: "30%",
            }
        : {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: "30%",
            render: (_, e) => <div className={tableStyle}>{e?.status}</div>,
          },
    ];
  }, [data?.data?.deviceRequests]);

  const handleLogout = async () => {
    setLogoutModal(false);
  };

  const handleLogoutModalClose = useCallback(() => {
    setLogoutModal(false);
  }, []);

  const onChangeStatus = (status) => {
    setStatus(status);
  };

  return (
    <>
      <div className="w-full ">
        <div className="mb-2">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="text-lg font-medium text-theme-black">
              {Declined_Approval}
            </div>

            <div className="flex justify-between gap-2">
              <Button
                variant="outlined"
                size="small"
                style={
                  status == "PENDING"
                    ? {
                        backgroundColor: "#EC1944",
                        color: "white",

                        //padding: "4px",
                      }
                    : {
                        borderColor: "#EC1944",
                        color: "#EC1944",

                        //padding: "4px",
                      }
                }
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
                onClick={() => {
                  onChangeStatus("PENDING");
                }}
              >
                Pending
              </Button>
              <Button
                variant="outlined"
                size="small"
                style={
                  status == "APPROVED"
                    ? {
                        backgroundColor: "#EC1944",
                        color: "white",
                      }
                    : {
                        borderColor: "#EC1944",
                        color: "#EC1944",
                      }
                }
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
                // disabled={selectedItems.length === 0}
                onClick={() => {
                  onChangeStatus("APPROVED");
                }}
              >
                Approved
              </Button>
              <Button
                variant="outlined"
                size="small"
                style={
                  status == "REJECTED"
                    ? {
                        backgroundColor: "#EC1944",
                        color: "white",
                      }
                    : {
                        borderColor: "#EC1944",
                        color: "#EC1944",
                      }
                }
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
                onClick={() => {
                  onChangeStatus("REJECTED");
                }}
              >
                Decline
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <AppTable
            rowKey={"tracking_id"}
            className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal	text-theme-grey"
            dataSource={data?.data?.deviceRequests || []}
            columns={columns}
            pagination={false}
            size="small"
          ></AppTable>
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
      </div>

      <AppModal show={logoutModal}>
        <AcceptOrDeclineModal
          onDeleteSuccess={handleLogoutModalClose}
          bucketItem={deviceData}
          isDelete={isDelete}
        />
      </AppModal>
    </>
  );
};

export default AccessManagement;
