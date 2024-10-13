import { useState, useMemo, useCallback, useEffect } from "react";
import { AppTable } from "../../components/Table";
import SearchInput from "../../components/Input/SearchInput";
import AddIcon from "@mui/icons-material/Add";
import usePaginationSearch from "../../features/user/hooks/usePaginationSearch";
import AppModal from "../../components/Modal/AppModal";
import AddDeviceModal from "./AddDeviceModal";
import DeleteDeviceModal from "./DeleteDeviceModal";
import SendRequestModal from "./SendRequestModal";
import { Dropdown, Space } from "antd";
import ImportModal from "../TestPlanHub/ImportModal";
import {
  LeftChevIcon,
  RightChevIcon,
  IC_ChartSmall,
  IC_WIFI,
  IC_BATTERY_FULL,
  IC_BATTERY_EMPTY,
  IC_BATTERY_Half,
  Ic_Action,
  IC_STATUS,
  IC_ChartHalf,
  IC_ChartSingle,
  IC_ChartEmpty,
  IC_WIFI_EMPTY,
  IC_WIFI_SINGLE,
  IC_WIFI_HALF,
  IV_RIGHT_SINGLE,
  IV_LeftArrow_Single,
} from "../../assets/icons";
import useMultiStep from "../../hooks/useMultiStep";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  initialPagination,
  paginationList,
} from "../../features/user/utils/pagination";
import {
  useGetAllDeviceQuery,
  useGetUserListQuery,
} from "../../features/dashboard/dashboardAPI";
import AssignToOthers from "./AssignToOthers";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/auth/authSlice";
import PageLoader from "../../components/Loader/PageLoader";
import Button from "../../components/Button";

const AccessManagement = () => {
  const userData = useAppSelector(selectCurrentUser);
  const { userType } = userData;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchName, setSearchName] = useState(() => {
    return searchParams.get("q") || "";
  });
  const [openModalAssignBucket, setModalAssignBucket] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [isAdd, setAdd] = useState(false);
  const [openModalImport, setModalImport] = useState(false);
  const [openModalSendRequest, setModalSendRequest] = useState(false);
  const [deviceItem, setDeviceItem] = useState();
  const [assignee, setAssignee] = useState("");
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
      filterAssignee: assignee,
      usedFor: userType === "Admin" ? "" : "unassignedDevice",
    };
  }, [page, perPage, searchName, userType, assignee]);

  const { isLoading, data, isFetching } = useGetAllDeviceQuery({ params });
  useEffect(() => {
    if (Number.isInteger(data?.data?.totalCounts)) {
      setTotalDataCount(data?.data?.totalCounts || 1);
    }
  }, [data?.data?.totalCounts, setTotalDataCount]);
  usePaginationSearch({ page, perPage });
  const { data: userList } = useGetUserListQuery({});

  const filterOptionsUserName = useMemo(() => {
    if (!userList?.data?.userDetails) {
      return [];
    }
    return userList?.data?.userDetails?.map(({ userName, userId }) => ({
      text: userName,
      value: userId.toString(),
    }));
  }, [userList?.data?.userDetails]);

  const tableStyle =
    "w-full truncate text-theme-grey text-xs	font-normal font-poppins_cf ";
  const items =
    userType === "Admin"
      ? [
          { key: "1", label: "View" },
          { key: "2", label: "Edit" },
          { key: "3", label: "Delete" },
          { key: "4", label: "Assign to Role" },
        ]
      : [{ key: "1", label: "View" }];

  const assignToOther = (device) => {
    setModalAssignBucket(true);
    setDeviceItem(device);
  };
  const handleDropdownItemClick = (item, device) => {
    if (item?.key === "1") {
      navigate(`/deviceHub/viewDeviceDetails/${device?.deviceId}`);
    } else if (item?.key === "2") {
      setAdd(true);
      setDeviceItem(device);
    } else if (item?.key === "3") {
      setDelete(true);
      setDeviceItem(device);
    } else if (item?.key === "4") {
      setModalAssignBucket(true);
      setDeviceItem(device);
    }
  };

  const columns = useMemo(
    () => [
      {
        title: "Device Name",
        dataIndex: "deviceName",
        key: "deviceName",
        width: "15%",
        render: (_, e) => <div className={tableStyle}>{e?.deviceName}</div>,
      },
      {
        title: "IMEI 1",
        dataIndex: "imei1",
        key: "imei1",
        render: (_, e) => <div className={tableStyle}>{e?.imei1}</div>,
      },
      {
        title: "Phone No.",
        dataIndex: "phoneno",
        key: "phoneno",
        render: (_, e) => <div className={tableStyle}>{e?.phoneno}</div>,
      },
      {
        title: "Make & Model",
        dataIndex: "phoneNum",
        key: "phoneNum",
        render: (_, e) => (
          <div>
            {e?.make ? (
              <div className={tableStyle}>{e?.make}</div>
            ) : (
              <div className={tableStyle}>....</div>
            )}
          </div>
        ),
      },
      userType === "Admin"
        ? {
            title: "Assignee",
            filterSearch: true,
            filters: [...filterOptionsUserName],
            dataIndex: "assignee",
            key: "asignee",
            filterIcon: (filtered) => (
              <div className="mr-2">
                <IC_STATUS />
              </div>
            ),
            render: (_, e) => (
              <div>
                {e?.userName !== "No User" ? (
                  <div className="mx-2 w-full truncate font-poppins_cf text-xs font-normal text-theme-black ">
                    {e?.userName}
                  </div>
                ) : (
                  <div
                    className="mx-2 w-full cursor-pointer truncate font-poppins_cf text-xs font-normal  text-theme-blue underline"
                    onClick={() => assignToOther(e)}
                  >
                    {e?.userName}
                  </div>
                )}
              </div>
            ),
          }
        : {
            title: "",
            dataIndex: "assignee",
            key: "asignee",
          },
      {
        title: "Last Synced",
        dataIndex: "phoneNum",
        key: "phoneNum",
        render: (_, e) => (
          <div>
            {e?.lastSynced ? (
              <div className={tableStyle}>{e?.lastSynced}</div>
            ) : (
              <div className={tableStyle}>....</div>
            )}
          </div>
        ),
      },
      {
        title: <div className="flex justify-center">Device health</div>,
        dataIndex: "description",
        key: "description",
        render: (_, e) => (
          <div className="flex justify-center gap-2">
            {e?.batteryPercentage < 34 ? (
              <IC_BATTERY_EMPTY className="cursor-pointer" />
            ) : e?.batteryPercentage < 67 ? (
              <IC_BATTERY_Half className="cursor-pointer" />
            ) : (
              <IC_BATTERY_FULL className="cursor-pointer" />
            )}

            {e?.cellStrength < 26 ? (
              <IC_ChartEmpty className="cursor-pointer" />
            ) : e?.cellStrength < 51 ? (
              <IC_ChartSingle className="cursor-pointer" />
            ) : e?.cellStrength < 76 ? (
              <IC_ChartHalf className="cursor-pointer" />
            ) : (
              <IC_ChartSmall className="cursor-pointer" />
            )}

            {e?.wifiStrength < 26 ? (
              <IC_WIFI_EMPTY className="cursor-pointer" />
            ) : e?.wifiStrength < 51 ? (
              <IC_WIFI_SINGLE className="cursor-pointer" />
            ) : e?.wifiStrength < 76 ? (
              <IC_WIFI_HALF className="cursor-pointer" />
            ) : (
              <IC_WIFI className="cursor-pointer" />
            )}
          </div>
        ),
      },
      userType === "Admin"
        ? {
            title: <div className="flex justify-center">Action</div>,
            dataIndex: "action",
            key: "action",
            render: (_, e) => (
              <div className="flex items-center justify-center">
                <Space size="small">
                  <Dropdown
                    className="cursor-pointer"
                    menu={{
                      items,
                      onClick: (index) => handleDropdownItemClick(index, e),
                    }}
                  >
                    <Ic_Action />
                  </Dropdown>
                </Space>
              </div>
            ),
          }
        : {
            title: <div className="flex justify-center">Action</div>,
            dataIndex: "action",
            key: "action",
            render: (_, e) => (
              <div className="flex justify-center">
                <Space size="small">
                  <Dropdown
                    className="cursor-pointer"
                    menu={{
                      items,
                      onClick: (index) => handleDropdownItemClick(index, e),
                    }}
                  >
                    <Ic_Action />
                  </Dropdown>
                </Space>
              </div>
            ),
          },
    ],
    [
      filterOptionsUserName,
      userType,
      tableStyle,
      handleDropdownItemClick,
      items,
    ]
  );

  const handleLogoutModalClose = useCallback(() => {
    setModalAssignBucket(false);
    setDelete(false);
    setAdd(false);
    setModalImport(false);
    setModalSendRequest(false);
  }, []);



  return (
    <>
      <div className="w-full">
        <div className="mb-2">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="font-poppins_cf text-xl font-medium text-theme-black">
              Device List
            </div>

            {userType === "Admin" ? (
              <div className="flex  justify-between gap-2">
                <SearchInput
                  searchName={searchName}
                  setSearchName={setSearchName}
                  placeholder={"Search user by name.."}
                />
                <Button
                  className="rounded border-[1px] bg-theme-dark px-3 font-poppins_cf text-xs font-medium text-theme-white sm:px-2"
                  onClick={() => {
                    setAdd(true);
                    setDeviceItem();
                  }}
                >
                  <AddIcon /> Add
                </Button>
              </div>
            ) : (
              <div className="flex  justify-between gap-2">
                <SearchInput
                  searchName={searchName}
                  setSearchName={setSearchName}
                  placeholder={"Search user by name.."}
                />
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  style={{
                    backgroundColor: "#EC1944",
                    color: "white",
                  }}
                  sx={{
                    textTransform: "none",
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                  onClick={() => setModalSendRequest(true)}
                >
                  Request Device
                </Button>
              </div>
            )}
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
              rowKey={"serialNumber"}
              className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal	text-theme-grey"
              pagination={false}
              size="small"
              loading={isLoading}
              dataSource={data?.data?.devices || []}
              onChange={(sort, filters) => {
                handleFilter(filters);
              }}
              columns={columns}
            />
          )}

          <div className="mb-4 flex items-center justify-between space-x-2 py-2 text-[10px] xs:text-xs">
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

      {/* modal for Assign to others(userName) */}
      <AppModal
        show={openModalAssignBucket}
        onClose={handleLogoutModalClose}
        title="Assign to Role"
      >
        <AssignToOthers
          onAddSuccess={handleLogoutModalClose}
          bucketItem={deviceItem}
        />
      </AppModal>
      {/* delete device */}
      <AppModal show={isDelete}>
        <DeleteDeviceModal
          onClose={handleLogoutModalClose}
          onDeleteSuccess={handleLogoutModalClose}
          bucketItem={deviceItem}
        />
      </AppModal>
      {/* Add device  & update device*/}
      <AppModal
        show={isAdd}
        onClose={handleLogoutModalClose}
        title={deviceItem ? "Edit Device Details" : "Add Device"}
        modalClass={"w-[calc(100%-90px)] md:w-auto rounded-[4px]"}
      >
        <AddDeviceModal
          onAddSuccess={handleLogoutModalClose}
          bucketItem={deviceItem}
        />
      </AppModal>

      <AppModal show={openModalImport} title="Import Devices">
        <ImportModal onDeleteSuccess={handleLogoutModalClose} />
      </AppModal>

      <AppModal
        show={openModalSendRequest}
        title="Send Device Request "
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-90px)] md:w-auto rounded-[4px]"}
      >
        <SendRequestModal onDeleteSuccess={handleLogoutModalClose} />
      </AppModal>
    </>
  );
};

export default AccessManagement;
