import React from "react";
import { IC_Delete } from "../../assets/icons";
import { useDeleteDeviceMutation } from "../../features/dashboard/dashboardAPI";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";
import Button from "../../components/Button";
const DeleteUserBucketModal = ({ onDeleteSuccess, bucketItem }) => {
  const [deleteBucket] = useDeleteDeviceMutation();
  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    const payload = { deviceId: bucketItem?.deviceId };
    try {
      const deleteRes = await deleteBucket(payload).unwrap();
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

  return (
    <div
      data-testid="logoutModal"
      className="flex flex-col justify-center p-1 text-center md:p-2"
    >
      <IC_Delete className="mx-auto mb-2 h-8 w-8 text-coral" />

      <div className="mb-1 mt-1 flex w-full justify-center text-center text-lg font-medium text-theme-black  ">
        <p>Are you sure?</p>
      </div>
      <p className="text-xs font-poppins_cf font-normal mb-6 text-theme-grey">
        Do you really want to delete these record?
      </p>
      
      <div className="flex flex-col justify-center space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
        <Button
          title="Close popup"
          onClick={onDeleteSuccess}
          className="cursor-pointer font-poppins_cf rounded-md border-[1px] bg-white p-1 text-xs font-normal text-theme-black"
        >
          Cancel
        </Button>
        <Button
          title="Decline"
          onClick={handleDelete}
          className="cursor-pointer font-poppins_cf  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteUserBucketModal;
