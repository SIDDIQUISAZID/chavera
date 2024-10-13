import React, { useState } from "react";
import { toast } from "react-toastify";
import { IC_Delete } from "../../assets/icons";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";
import { useDeleteUserMutation } from "../../features/dashboard/dashboardAPI";
import { useDispatch } from "react-redux";

const UserListDeleteModal = ({ onDeleteSuccess, userId }) => {
  const [deleteUser] = useDeleteUserMutation();
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);
  const handleDelete = async () => {
    const payload = { userId: userId };

    try {
      const deleteRes = await deleteUser(payload).unwrap();
      onDeleteSuccess();

      console.log("deleteRes", JSON.stringify(deleteRes.status));
      if (deleteRes.status === 200) {
        dispatch(dishNetworkApi.util.invalidateTags(["userDelete"]));
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

      <div className="mb-2 mt-1 flex w-full justify-center text-center text-lg font-medium text-theme-black  ">
        <p>Are you sure?</p>
      </div>
      {/* <h1 className='text-4xl font-argent font-medium text-blue-dark'>Are you sure?</h1> */}
      <p className="mb-4 mt-4  font-poppins_cf text-theme-grey text-xs font-normal">
        {`Do you really want to ${
          isDelete ? "delete" : "deactivate"
        } these record?
             `}
      </p>
      <div className="flex flex-col justify-center space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
        <button
          title="Close popup"
          onClick={onDeleteSuccess}
          className="w-[90px] cursor-pointer rounded-md bg-white p-1 text-xs font-normal text-theme-black"
        >
          Cancel
        </button>
        {/* <button disabled={isLoading} title='Close popup' onClick={handleLogoutModalClose} className='border border-gray-light p-2 rounded-md text-gray-dark xs:w-20 w-full disabled:opacity-50'>Cancel</button> */}
        <button
          title="Decline"
          onClick={handleDelete}
          className="w-[90px] cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
        >
          Yes
        </button>
        {/* <button disabled={isLoading} title="LOGOUT" onClick={handleLogout} className='bg-coral text-white p-2 rounded-md xs:w-20 w-full disabled:opacity-50'>Yes</button> */}
      </div>
    </div>
  );
};

export default UserListDeleteModal;
