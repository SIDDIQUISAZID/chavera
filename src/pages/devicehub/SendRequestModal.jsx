import React,{useState,useMemo,useEffect} from "react";

import { useSendRequestToDeviceMutation } from "../../features/dashboard/dashboardAPI";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";

import { AppTable } from "../../components/Table";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/auth/authSlice";

import useMultiStep from "../../hooks/useMultiStep";
import { useSearchParams } from "react-router-dom";
import usePaginationSearch from "../../features/user/hooks/usePaginationSearch";
import PageLoader from "../../components/Loader/PageLoader";
import { CircleLoader } from "../../components/Loader";



import {
    initialPagination,
  } from "../../features/user/utils/pagination";
  import { useGetAllDeviceQuery } from "../../features/dashboard/dashboardAPI";


const SendRequestModal = ({ onDeleteSuccess, bucketItem }) => {

    const [searchParams] = useSearchParams();
    const [assignee, setAssignee] = useState("");

  const [searchName, setSearchName] = useState(() => {
    return searchParams.get("q") || "";
  })

    const userData = useAppSelector(selectCurrentUser);
  // const { userType } = userData;
  const userType = JSON.parse(localStorage.getItem("user")).userType;

  const {
    page,
    perPage,
    setTotalDataCount,
  } = useMultiStep(initialPagination({ searchParams }));

  const params = useMemo(() => {
    return {
      page: (page - 1),
      size: perPage,
      searchText: searchName,
      assignee: assignee,
      usedFor: userType === "Admin" ? "" : "unassignedDevice",
    };
  }, [page, perPage, searchName,userType,assignee]);
  const { data, isLoading } = useGetAllDeviceQuery({ params });
  useEffect(() => {
    if (Number.isInteger(data?.data?.totalCounts)) {
      setTotalDataCount(data?.data?.totalCounts || 1);
    }
  }, [data?.data?.totalCounts, setTotalDataCount]);
  usePaginationSearch({ page, perPage });




  const [onSendRequest,{ isLoading: isLoadingUser }] = useSendRequestToDeviceMutation();
  const dispatch = useAppDispatch();
  const handleDelete = async () => {


  
    const payload = { deviceIds: selectedRowKeys.toString()};
    try {
      const deleteRes = await onSendRequest(payload).unwrap();
      onDeleteSuccess();
      if (deleteRes.status === 200) {
        dispatch(dishNetworkApi.util.invalidateTags(["deviceList"]));
        toast.success(deleteRes.message);
      } else {
        toast.error(deleteRes.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || "Device not deleted");
    }
  };

  const tableStyle =
  "w-full truncate text-theme-grey text-xs	font-normal mx-2 font-poppins_cf ";

  const columns = [
    {
      title: "IMEI 1",
      dataIndex: "imei",
      key: "imei",

      render: (_, e) => <div className={tableStyle}>{e?.imei1}</div>,
    },
    {
      title: "IMEI 2",
      dataIndex: "imei2",
      key: "imei2",

      render: (_, e) => <div className={tableStyle}>{e?.imei2}</div>,
    },
    {
      title: "Make",
      dataIndex: "phoneNum",
      key: "phoneNum",

      render: (_,e) => (
        <div>
          <div className={tableStyle}>{e?.make}</div>
        </div>
      ),
    },
    {
      title: "Model",
      dataIndex: "phoneNum2",
      key: "phoneNum2",
      title: "Model",
      dataIndex: "model",
      key: "model",

      render: (_,e) => (
        <div>
          <div className={tableStyle}>{e?.model}</div>
        </div>
      ),
    },

   

   
   
  ];


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

  return (
    <div
      data-testid="logoutModal"
      className="flex flex-col justify-center p-1 text-center md:p-2"
    >
    <div className="flex flex-1 flex-col">
    {isLoading? <PageLoader
              containerAttr={{ className: "bg-blue-light/40" }}
              loaderColor={"#EC1944"}
            />:
          <AppTable
            rowKey={"deviceId"}
            className="border-blue-light  overflow-auto border  text-xs font-normal	text-theme-grey"
            pagination={false}
            size="small"
            dataSource={data?.data?.devices || []}
            columns={columns}

            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
          />}
          </div>
      {data?.data?.devices.length>0&&<div className="flex flex-col mt-4 justify-center space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
        <button
          title="Close popup"
          onClick={onDeleteSuccess}
          className="w-[90px] cursor-pointer rounded-md border-[1px] bg-white p-1 text-xs font-normal text-theme-black"
        >
          Cancel
        </button>
        <button
          title="Decline"
          onClick={handleDelete}
          className="w-[90px] cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
        >
          {isLoadingUser ? (
              <>
                <div className="mr-2">Loading.....</div>
                <CircleLoader className="ml-auto" />
              </>
            ) : (
              <>Send Request</>
            )}
        
        </button>
      </div>}
      
    </div>
  );
};

export default SendRequestModal;
