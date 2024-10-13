import { useState, useMemo, useCallback } from "react";
import { TableContainer, Button } from "@mui/material";
import { userdata } from "../../components/userdata";
import AddIcon from "@mui/icons-material/Add";
import { AppTable } from "../../components/Table";

import PageLoader from "../../components/Loader/PageLoader";

import Modal from "../../components/Modal";
import { Select } from "../../components/Select";
import SearchInput from "../../components/Input/SearchInput";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Input/Textarea";

import { useGetUserListQuery } from "../../features/dashboard/dashboardAPI";

import "./UserListStyles.css";
import {
  Ic_Active,
  Ic_InActive,
  LeftChevIcon,
  RightChevIcon,
  IC_Delete,
  IC_Edit,
  IC_Small_Delete,
  IC_DEACTIVATE,
  IC_Eye,
} from "../../assets/icons";
import useMultiStep from "../../hooks/useMultiStep";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CREATE_BUCKET } from "../../assets/icons";

import {
  initialPagination,
  paginationList,
} from "../../features/user/utils/pagination";

import { useBucketFilter } from "../../features/user/hooks";
import { getBucketData } from "../../features/user/utils/bucketName";

const BucketManagement = () => {
  const { isLoading, data } = useGetUserListQuery({});
  const [openModalCreateBucket, setModalCreateBucket] = useState(false);

  const [openModalDevice, setModalDeviceBucket] = useState(false);

  const navigate = useNavigate();
  const [isFetching, setFetching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedBucket, onBucketChange } = useBucketFilter();

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

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userData, setUserData] = useState(userdata);
  const [logoutModal, setLogoutModal] = useState(false);
  const [assignToBucket, setAssignToBucket] = useState(false);
  const [isDelete, setDelete] = useState(false);

  const handleAddUserClick = (user) => {
    navigate(`/user/userList/${user}`);
  };
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
        title: "Bucket Name",
        dataIndex: "bucketName",
        key: "bucketName",
        render: (_, e) => <div className={tableStyle}>{e.bucketName}</div>,
      },

      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        render: (_, e) => (
          <div className={tableStyle}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry......
          </div>
        ),
      },
      {
        title: "Users",
        dataIndex: "deviceCount",
        key: "deviceCount",
        render: (_, e) => <div className={tableStyle}>{e.deviceCount}</div>,
      },
      {
        title: "Device Bucket",
        dataIndex: "email",
        key: "email",
        width: "20%",
        render: (_, e) => (
          <div className="flex gap-1">
            <div className={tableStyle}>Device Bucket 1</div>
            <div
              onClick={() => setModalDeviceBucket(true)}
              className="mx-2 w-full truncate text-xs font-normal	text-theme-blue underline"
            >
              +2
            </div>
          </div>
        ),
      },

      {
        title: "Action",
        dataIndex: "total_amount",
        key: "total_amount",
        render: (_, e) => (
          <div className="flex gap-2">
            <IC_Edit
              className="cursor-pointer"
              onClick={() => {
                setModalCreateBucket(true);
              }}
            />

            <IC_Small_Delete
              className=" cursor-pointer"
              onClick={() => {
                setLogoutModal(true);
                setDelete(true);
              }}
            />
            <IC_Eye
              className="cursor-pointer"
              onClick={() =>
                navigate(
                  `/bucketManagement/userBucket/userBucketDetails/${e.serialNumber}`
                )
              }
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
        title: "Bucket Name",
        dataIndex: "userName",
        key: "userName",
        render: (_, e) => <div className={tableStyle}>{e.userName}</div>,
      },

      {
        title: "No. of Devices",
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
    ];
  }, [userData]);

  const handleLogout = async () => {
    setLogoutModal(false);
  };

  const handleAssign = async () => {
    setAssignToBucket(false);
  };

  const handleLogoutModalClose = useCallback(() => {
    setLogoutModal(false);
    setAssignToBucket(false);
    setModalCreateBucket(false);
    setModalDeviceBucket(false);
  }, []);

  return (
    <>
      <div>
        <div className="flex font-poppins_cf text-[10px]">
          Bucket Management<div className="mx-2">|</div>
          <div className="font-poppins_cf text-[10px] text-theme-dark ">
            Device Bucket
          </div>
        </div>
        <div className="my-4">
          <div className="bg-grey flex w-full items-center justify-between">
            <div className="font-poppins_w text-lg font-medium text-theme-black">
              Device Bucket
            </div>
            <div className="flex">
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
                  marginLeft: "8px",
                  // padding: "8px",
                }}
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  fontWeight: "400",
                }}
                startIcon={<CREATE_BUCKET />}
                // disabled={selectedItems.length === 0}
                onClick={() => {
                  setModalCreateBucket(true);
                }}
              >
                Create Device Bucket
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
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
        show={logoutModal}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-80px)] md:w-auto rounded-[4px]"}
      >
        <div
          data-testid="logoutModal"
          className="flex flex-col justify-center p-1 text-center md:p-2"
        >
          <IC_Delete className="mx-auto mb-2 h-10 w-10 text-coral" />

          <div className="mb-2 mt-1 flex w-full justify-center text-center text-lg font-medium text-theme-black  ">
            <p>Are you sure?</p>
          </div>
          {/* <h1 className='text-4xl font-argent font-medium text-blue-dark'>Are you sure?</h1> */}
          <p className="mb-4 mt-4 w-96 text-xs font-normal">
            Do you really want to delete these record? This process cannot be
            undone
          </p>
          <div className="flex flex-col justify-center space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
            <button
              title="Close popup"
              onClick={handleLogoutModalClose}
              className="w-[90px] cursor-pointer rounded-md bg-white p-1 text-xs font-normal text-theme-black"
            >
              Cancel
            </button>
            {/* <button disabled={isLoading} title='Close popup' onClick={handleLogoutModalClose} className='border border-gray-light p-2 rounded-md text-gray-dark xs:w-20 w-full disabled:opacity-50'>Cancel</button> */}
            <button
              title="Decline"
              onClick={handleLogout}
              className="w-[90px] cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
            >
              Decline
            </button>
            {/* <button disabled={isLoading} title="LOGOUT" onClick={handleLogout} className='bg-coral text-white p-2 rounded-md xs:w-20 w-full disabled:opacity-50'>Yes</button> */}
          </div>
        </div>
      </Modal>

      <Modal
        show={assignToBucket}
        onClose={handleLogoutModalClose}
        modalClass={"w-[calc(100%-80px)] md:w-auto rounded-[4px]"}
      >
        <div
          data-testid="logoutModal"
          className="flex w-80 flex-col justify-center p-1 text-center md:p-2"
        >
          <div className="mb-2 mt-1 flex w-full items-center  justify-between text-center text-lg font-medium text-theme-black  ">
            <p className="text-base font-medium">Assign to Bucket</p>
            <p className="text-xs text-theme-black">Total No. of User : 2</p>
          </div>

          <hr className="my-4" />
          {/* <h1 className='text-4xl font-argent font-medium text-blue-dark'>Are you sure?</h1> */}
          <div className="flex w-full flex-col items-start justify-start">
            <div className="text-xs text-theme-black">Bucket Name</div>
            <Select
              options={getBucketData}
              value={selectedBucket}
              onChange={(e) => {
                onBucketChange(e);
                if (e?.value) {
                  searchParams.set("action", "" + e?.value);
                  setSearchParams(searchParams);
                } else {
                  searchParams.delete("action");
                  setSearchParams(searchParams);
                }

                //searchParams.delete("action");
                // setSearchParams("");
              }}
              placeholder="Select"
              wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
              clearable
            />
          </div>
          <hr className="my-3" />

          <div className="flex flex-col justify-center space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
            {/* <button
              title="Close popup"
              onClick={handleLogoutModalClose}
              className="w-[90px] cursor-pointer rounded-md bg-white p-1 text-xs font-normal text-theme-black"
            >
              Cancel
            </button> */}
            {/* <button disabled={isLoading} title='Close popup' onClick={handleLogoutModalClose} className='border border-gray-light p-2 rounded-md text-gray-dark xs:w-20 w-full disabled:opacity-50'>Cancel</button> */}
            <button
              title="Decline"
              onClick={handleAssign}
              className="mt-4 w-[90px]  cursor-pointer rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
            >
              Assign
            </button>
            {/* <button disabled={isLoading} title="LOGOUT" onClick={handleLogout} className='bg-coral text-white p-2 rounded-md xs:w-20 w-full disabled:opacity-50'>Yes</button> */}
          </div>
        </div>
      </Modal>

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
              {"Create Group"}
            </button>
            {/* <button disabled={isLoading} title="LOGOUT" onClick={handleLogout} className='bg-coral text-white p-2 rounded-md xs:w-20 w-full disabled:opacity-50'>Yes</button> */}
          </div>
        </div>
      </Modal>
      {/* View Modal of bucket data? */}

      <Modal
        show={openModalDevice}
        onClose={handleLogoutModalClose}
        modalClass={" md:w-auto rounded-[4px]"}
      >
        <div className="my-4 flex items-center justify-between">
          <div className="font-poppins_w	 text-base	 text-theme-black">
            Device Bucket
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
              columns={columnsModal}
              dataSource={userData}
              pagination={false}
              size="small"
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default BucketManagement;
