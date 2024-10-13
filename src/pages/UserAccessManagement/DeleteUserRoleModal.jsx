import React from "react";
import { IC_Delete } from "../../assets/icons";
import { useDeleteRoleMutation } from "../../features/dashboard/dashboardAPI";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";
import Button from "../../components/Button";
const DeleteUserRoleModal = ({ onRoleAddSuccess, roleId, roleItem }) => {
  const [deleteRole] = useDeleteRoleMutation();
  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    const payload = { roleId: roleId };
    try {
      const deleteRes = await deleteRole(payload).unwrap();
      onRoleAddSuccess();
      if (deleteRes.status === 200) {
        dispatch(dishNetworkApi.util.invalidateTags(["rolesList"]));
        toast.success(deleteRes.message);
      } else {
        toast.error(deleteRes.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || "Role not deleted");
    }
  };

  return (
    <div
      data-testid="logoutModal"
      className="flex flex-col justify-center p-1 text-center md:p-2"
    >
      <IC_Delete className="mx-auto  h-10 w-10 text-coral" />

      <div className=" mt-1 flex w-full justify-center text-center text-lg font-medium text-theme-black  ">
        <p>Are you sure?</p>
      </div>
      <p className="mt-2 my-2 text-xs font-normal">
        Do you really want to delete these record?
      </p>
      
      <div className="mt-3 flex flex-col justify-center space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
        <Button
          title="Close popup"
          onClick={onRoleAddSuccess}
          className="cursor-pointer rounded-md border-2 bg-white p-1 text-xs font-normal font-poppins_cf text-theme-black"
        >
          Cancel
        </Button>
        <Button
          title="Decline"
          onClick={handleDelete}
          className="cursor-pointer font-poppins_cf rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteUserRoleModal;
