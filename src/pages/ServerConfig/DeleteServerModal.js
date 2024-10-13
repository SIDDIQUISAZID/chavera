import React from "react";
import { IC_Delete } from "../../assets/icons";
import { useDeleteServerMutation } from "../../features/dashboard/dashboardAPI";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";
const DeleteServerModal = ({ onDeleteSuccess, serverItem}) => {
    console.log(onDeleteSuccess, "serverId");
  const [deleteServer] = useDeleteServerMutation();
  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    const payload = { serverId: serverItem?.serverId };
    try {
      const serverRes = await deleteServer(payload).unwrap();
      onDeleteSuccess();
      if (serverRes.status === 200) {
        dispatch(dishNetworkApi.util.invalidateTags(["serverList"]));
        toast.success(serverRes.message);
        
      } else {
        toast.error(serverRes.message);
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
      <p className="  text-xs font-normal">
        Do you really want to delete these record?
      </p>
      <p className="mb-6   text-xs font-normal">
        This process cannot be undone
      </p>
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
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteServerModal;
