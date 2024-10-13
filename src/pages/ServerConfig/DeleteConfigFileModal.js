import React from "react";
import { IC_Delete } from "../../assets/icons";
import { useDeleteServerMutation } from "../../features/dashboard/dashboardAPI";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";
import Button from "../../components/Button";
const DeleteConfigFileModal = ({ onDeleteSuccess, serverItem}) => {
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
      <p className=" font-poppins_cf text-theme-grey text-xs font-normal mb-4">
        Do you really want to delete these record?
      </p>
     
      <div className="flex flex-col justify-center space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
        <Button
          title="Close popup"
          onClick={onDeleteSuccess}
          className="cursor-pointer rounded-md border-[1px] bg-white p-1 text-xs font-normal text-theme-black"
        >
          Cancel
        </Button>
        <Button
          title="Decline"
          onClick={handleDelete}
          className="cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfigFileModal;
