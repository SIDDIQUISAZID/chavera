import { useState, useMemo, useCallback } from "react";
import { TableContainer, Button } from "@mui/material";
import { userdata } from "../../components/userdata";
import AddIcon from "@mui/icons-material/Add";
import { AppTable } from "../../components/Table";

import PageLoader from "../../components/Loader/PageLoader";

import Modal from "../../components/Modal";

import "./UserListStyles.css";
import {
  LeftChevIcon,
  RightChevIcon,
  IC_Small_Delete,
  IC_Delete,
  LeftArrow,
} from "../../assets/icons";
import useMultiStep from "../../hooks/useMultiStep";
import { useSearchParams, useNavigate } from "react-router-dom";

import {
  initialPagination,
  paginationList,
} from "../../features/user/utils/pagination";

const BucketManagementDetails = () => {
  const [openModalCreateBucket, setModalCreateBucket] = useState(false);

  const navigate = useNavigate();
  const [isFetching, setFetching] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

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
  } = useMultiStep(initialPagination({ searchParams }));

  const [userData, setUserData] = useState(userdata);
  const [isDelete, setDelete] = useState(false);

  const tableStyle = "w-full truncate text-theme-grey text-xs	font-normal mx-2";

  const columns = useMemo(() => {
    return [
      {
        title: "S.No",
        dataIndex: "serialNumber",
        key: "serialNumber",
        render: (_, e) => <div className={tableStyle}>{e.serialNumber}</div>,
      },

      {
        title: "User Name",
        dataIndex: "bucketName",
        key: "bucketName",
        render: (_) => <div className={tableStyle}>Shayam Singh</div>,
      },

      {
        title: "Email Id",
        dataIndex: "description",
        key: "description",
        render: (_) => <div className={tableStyle}>shayam_s@dish.com</div>,
      },
      {
        title: "Last Login(GMT)",
        dataIndex: "deviceCount",
        key: "deviceCount",
        render: (_) => <div className={tableStyle}>16/01/2024, 06:00 PM</div>,
      },
      {
        title: "Device Bucket",
        dataIndex: "email",
        key: "email",
        render: (_) => (
          <div>
            <div className={tableStyle}>+2</div>
          </div>
        ),
      },

      {
        title: "Action",
        dataIndex: "total_amount",
        key: "total_amount",
        render: (_) => (
          <div className="ml-2 flex">
            <IC_Small_Delete
              className=" cursor-pointer"
              onClick={() => {
                setDelete(true);
              }}
            />
          </div>
        ),
      },
    ];
  }, [userData]);

  const columnsModal = useMemo(() => {
    return [
      {
        title: "S.No",
        dataIndex: "serialNumber",
        key: "serialNumber",
        render: (_, e) => <div className={tableStyle}>{e.serialNumber}</div>,
      },
      {
        title: "User Name",
        dataIndex: "userName",
        key: "userName",
        render: (_, e) => <div className={tableStyle}>{e.userName}</div>,
      },
      {
        title: "Role",
        dataIndex: "roleId",
        key: "roleId",
        render: (_, e) => <div className={tableStyle}>33</div>,
      },
      {
        title: "Device Count",
        dataIndex: "deviceCount",
        key: "deviceCount",
        render: (_, e) => <div className={tableStyle}>32</div>,
      },
      {
        title: "Bucket Name",
        dataIndex: "bucketName",
        key: "bucketName",
        render: (_, e) => <div className={tableStyle}>{e.bucketName}</div>,
      },
      {
        title: "Email ID",
        dataIndex: "email",
        key: "email",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e.email}</div>
          </div>
        ),
      },
      {
        title: "Last Login (GMT)",
        dataIndex: "lastLogin",
        key: "lastLogin",
        render: (_, e) => (
          <div>
            <div className={tableStyle}>{e.lastLogin}</div>
          </div>
        ),
      },
    ];
  }, [userData]);

  const handleLogoutModalClose = useCallback(() => {
    setModalCreateBucket(false);
    setDelete(false);
  }, []);

  const handleLogout = async () => {
    setDelete(false);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      setSelectedRowKeys(selectedRows.map((row) => row.serialNumber));
    },
    onSelectAll: (selected, selectedRows) => {
      if (selected) {
        setSelectedRowKeys(userData?.map((row) => row.serialNumber));
      } else {
        setSelectedRowKeys([]);
      }
    },
  };
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div>
        <div className="flex font-poppins_cf text-[10px]">
          <LeftArrow onClick={() => goBack()} className="mr-2 cursor-pointer" />{" "}
          Bucket Management | User Bucket<div className="mx-1">|</div>
          <div className="font-poppins_cf text-[10px] text-theme-dark ">
            User List
          </div>
        </div>
        <div className="my-4">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="font-poppins_w text-lg font-medium text-theme-black">
                User List
              </div>

              <div className="font-poppins_w text-xs font-medium text-theme-grey">
                (Bucket Name: Bucket Name 3)
              </div>
            </div>
            <div className="flex">
              <Button
                variant="contained"
                size="small"
                color="primary"
                style={{
                  backgroundColor: "#EC1944",
                  color: "white",
                  marginLeft: "8px",
                  // padding: "8px",
                }}
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
                startIcon={<AddIcon />}
                // disabled={selectedItems.length === 0}
                onClick={() => {
                  setModalCreateBucket(true);
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
        <div className="flex  flex-1 flex-col">
          {isLoading ? (
            <PageLoader
              containerAttr={{ className: "bg-blue-light/40" }}
              loaderColor={"#EC1944"}
            />
          ) : (
            <AppTable
              rowKey={"serialNumber"}
              className="border-blue-light orderDetailsProduct overflow-auto border  text-xs font-normal	text-theme-grey"
              // rowSelection={{
              //   type: selectionType,
              //   ...rowSelection,
              // }}
              columns={columns}
              dataSource={userData}
              pagination={false}
              size="small"
            />
          )}

          <div className="mt-2 flex px-2 sm:px-0">
            <div className="flex items-center space-x-2 text-[10px] xs:text-xs ">
              <div>Showing Result</div>
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
            <div className="ml-auto flex items-center space-x-2 rounded border-[1px] border-theme-border bg-white p-2">
              <button
                onClick={goPrev}
                className={`${canPrev ? "" : "opacity-50"}`}
                disabled={!canPrev || isFetching}
              >
                <LeftChevIcon
                  className={`
         text-black`}
                />
              </button>
              <div className="text-[10px] xs:text-xs" data-testid="pageCount">
                Page {page} of{" "}
                {isFetching ? (
                  <span className="inline-block animate-pulse rounded-md  bg-gray-300 text-gray-300">
                    00
                  </span>
                ) : (
                  lastPage
                )}
              </div>
              <button
                onClick={goNext}
                className={`${canNext ? "" : "opacity-50"}`}
                disabled={!canNext || isFetching}
              >
                <RightChevIcon className="text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={openModalCreateBucket}
        onClose={handleLogoutModalClose}
        modalClass={" md:w-auto rounded-[4px]"}
      >
        <div className="my-4 flex items-center justify-between">
          <div className="font-poppins_w	 text-base	 text-theme-black">
            User List
          </div>
          <Button
            variant="contained"
            size="small"
            color="primary"
            style={{
              backgroundColor: "#EC1944",
              color: "white",
              marginLeft: "8px",
              // padding: "8px",
            }}
            sx={{
              textTransform: "none",
              fontSize: "12px",
              fontWeight: "400",
            }}
            // disabled={selectedItems.length === 0}
            onClick={() => {
              // setModalCreateBucket(true);
            }}
          >
            Add
          </Button>
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
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columnsModal}
              dataSource={userData}
              pagination={false}
              size="small"
            />
          )}
        </div>
      </Modal>

      <Modal
        show={isDelete}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-80px)] md:w-auto rounded-[4px]"}
      >
        <div
          data-testid="logoutModal"
          className="flex flex-col justify-center p-1 text-center md:p-2"
        >
          <IC_Delete className="mx-auto mb-2 h-10 w-10 text-coral" />

          <div className="mb-2 mt-1 flex w-full justify-center text-center text-lg font-medium text-theme-black">
            <p>Are you sure?</p>
          </div>

          <p className="mb-4 mt-2 w-72 text-xs font-normal">
            Do you really want to delete these record? This process cannot be
            undone.
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
      {/* {currentModal === 'Delete Device' && <DeleteDevice/>} */}
    </>
  );
};

export default BucketManagementDetails;
