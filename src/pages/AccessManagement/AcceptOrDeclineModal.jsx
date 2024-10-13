import React from "react";
import { IC_Delete, IC_Approved } from "../../assets/icons";
import { useGetDeviceRequestedAcceptMutation } from "../../features/dashboard/dashboardAPI";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";

const AcceptOrDeclineModal = ({ onDeleteSuccess, bucketItem, isDelete }) => {
  console.log(JSON.stringify(bucketItem));
  const [deleteBucket] = useGetDeviceRequestedAcceptMutation();
  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    const payload = {
      requestId: Number(bucketItem?.deviceId),
      status: isDelete ? "APPROVED" : "REJECTED",
    };
    try {
      const deleteRes = await deleteBucket(payload).unwrap();
      onDeleteSuccess();
      if (deleteRes.status === 200) {
        dispatch(dishNetworkApi.util.invalidateTags(["requestedDeviceList"]));
        toast.success(deleteRes.message);
      } else {
        toast.error(deleteRes.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || "something went wrong");
    }
  };

  return (
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
        <div className="mb-2 mt-1 flex w-full justify-center text-center text-lg font-medium text-theme-black  ">
          <p>Are you sure?</p>
        </div>
      )}

    <div className="flex justify-center">  
      <p className="mb-4 mt-2 w-72 text-xs text-center  font-normal">
        {isDelete
          ? "Do you wish to approve the request? Please press 'Yes' to confirm."
          : "Are you sure you want to decline the request?"}
      </p></div>
      <div className="flex flex-col justify-center space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
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
          {isDelete ? "Yes" : "Decline"}
        </button>
      </div>
    </div>
  );
};

export default AcceptOrDeclineModal;
