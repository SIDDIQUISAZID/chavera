import { useDeleteUserMutation } from "../../features/dashboard/dashboardAPI";
import { IC_Delete } from "../../assets/icons";

import { dishNetworkApi } from "../../app/services";
import { useAppDispatch } from "../../app/hooks";
import { toast } from "react-toastify";
import Button from "../../components/Button";

const DeleteUserModal = ({ onDeleteSuccess, userItem, isDelete }) => {
  const [deleteUser] = useDeleteUserMutation();
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const payload = { userId: userItem?.userId };

    try {
      const deleteRes = await deleteUser(payload).unwrap();
      if (deleteRes.status === 200) {
        dispatch(dishNetworkApi.util.invalidateTags(["userDelete"]));
        onDeleteSuccess();
        toast.success(deleteRes.message);
      } else {
        toast.error(deleteRes.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || "user not deleted");
    }
  };

  return (
    <div
      data-testid="logoutModal"
      className="flex flex-col justify-center p-1 text-center md:p-2"
    >
      <IC_Delete className="mx-auto mb-2 h-10 w-10 text-coral" />

      <div className="mb-1 mt-1 flex w-full justify-center text-center text-lg font-medium text-theme-black  ">
        <p>Are you sure?</p>
      </div>
      <p className=" mb-6 font-poppins_cf  text-xs font-normal text-theme-grey">
        {`Do you really want to ${
          isDelete ? "delete" : "deactivate"
        } these record?
   `}
      </p>
      
      <div className="flex flex-col justify-center space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
        <Button
          title="Close popup"
          onClick={onDeleteSuccess}
          className="cursor-pointer rounded-md border-2 font-poppins_cf bg-white text-xs font-normal text-theme-black"
        >
          Cancel
        </Button>
        <Button
          title="Decline"
          onClick={handleDelete}
          className="cursor-pointer p-2 font-poppins_cf  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
        >
          Yes
        </Button>
      </div>
    </div>
  );
};

export default DeleteUserModal;
