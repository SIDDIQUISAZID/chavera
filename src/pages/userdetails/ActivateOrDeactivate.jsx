import { useUpdateUserStatusMutation } from "../../features/dashboard/dashboardAPI";
import { IC_Delete } from "../../assets/icons";

import { dishNetworkApi } from "../../app/services";
import { useAppDispatch } from "../../app/hooks";
import { toast } from "react-toastify";

const ActivateOrDeactivate = ({ onDeleteSuccess, userItem, isDelete }) => {

    console.log(!userItem?.status)
  const [deactivateUser] = useUpdateUserStatusMutation();
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    const payload = { userId: userItem?.userId,status:!userItem?.status };

    try {
      const deleteRes = await deactivateUser(payload).unwrap();
      if (deleteRes.status === 200) {
        dispatch(dishNetworkApi.util.invalidateTags(["userDelete"]));
        onDeleteSuccess();
        toast.success(deleteRes.message);
      } else {
        toast.error(deleteRes.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || "user not found");
    }
  };

  return (
    <div
      data-testid="logoutModal"
      className="flex flex-col  justify-center p-1 text-center md:p-2"
    >
      <IC_Delete className="mx-auto mb-2 h-10 w-10 text-coral" />

      <div className="mb-1 mt-1 flex justify-center text-center text-lg font-medium text-theme-black  ">
        <p>Are you sure?</p>
      </div>
      {/* <h1 className='text-4xl font-argent font-medium text-blue-dark'>Are you sure?</h1> */}
      <p className="text-xs font-normal text-theme-grey">
        {`Do you really want to ${
          !userItem?.status ?"activate":"deactivate"
        } these record?
   `}
      </p>
      <p className="mb-6  text-xs  font-normal text-theme-grey">
        {" "}
        This process cannot be undone.
      </p>
      <div className="flex flex-col justify-center space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
        <button
          title="Close popup"
          onClick={onDeleteSuccess}
          className="w-[90px] cursor-pointer rounded-md border-2 bg-white p-1 text-xs font-normal text-theme-black"
        >
          Cancel
        </button>
        <button
          title="Decline"
          onClick={handleDelete}
          className="w-[90px] cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default ActivateOrDeactivate;
