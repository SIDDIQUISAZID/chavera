import React from "react";
import { IC_Delete } from "../../assets/icons";
import { useDeleteTestCaseMutation } from "../../features/dashboard/dashboardAPI";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";
import Button from "../../components/Button";
const DeleteTestCaseModal = ({ onDeleteSuccess, bucketItem }) => {
  const [deleteTestCase] = useDeleteTestCaseMutation();
  const dispatch = useAppDispatch();
  const handleDelete = async () => {
    const payload = { TestCaseId: bucketItem?.tc_id };
    try {
      const deleteRes = await deleteTestCase(payload).unwrap();
      onDeleteSuccess();
      if (deleteRes.status === 200) {
        dispatch(dishNetworkApi.util.invalidateTags(["testCaseList"]));
        toast.success(deleteRes.message);
      } else {
        toast.error(deleteRes.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || "test case not deleted");
    }
  };

  return (
    <div
      data-testid="logoutModal"
      className="flex flex-col justify-center p-1 text-center md:p-2"
    >
      <IC_Delete className="mx-auto mb-2 h-8 w-8 text-coral" />
      <div className="mt-1 flex w-full justify-center text-center text-xl font-medium text-theme-black  ">
        <p>Are you sure?</p>
      </div>
      <p className="mb-4 mt-4 items-center text-center align-middle font-poppins_cf text-xs font-normal leading-5 text-theme-grey">
        Do you really want to delete this record?
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

export default DeleteTestCaseModal;
