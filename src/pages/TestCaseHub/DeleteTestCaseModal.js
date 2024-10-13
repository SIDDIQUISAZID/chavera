import { useDeleteTestCaseMutation } from "../../features/dashboard/dashboardAPI";
import { IC_Delete } from "../../assets/icons";
import { dishNetworkApi } from "../../app/services";
import { useAppDispatch } from "../../app/hooks";
import { toast } from "react-toastify";
import Button from "../../components/Button";

const DeleteTestCaseModal = ({ onDeleteSuccess,onDeleteCancel, testCaseItem, isDelete }) => {
    console.log(testCaseItem,"testCaseItem")
  const [deleteTestCase] = useDeleteTestCaseMutation();
  const dispatch = useAppDispatch();


  const handleDelete = async () => {
    const payload = { tcId: testCaseItem?.tcId};
    try {
      const deleteRes = await deleteTestCase(payload).unwrap();
      if (deleteRes.status === 200) {
        dispatch(dishNetworkApi.util.invalidateTags(["testCaseList"]));
        onDeleteSuccess();
        toast.success("Test case deleted successfully!");
      } else {
        toast.error(deleteRes.message || "Failed to delete test case.");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Test case not deleted");
    }
  };

  return (
    <div
      data-testid="deleteTestCaseModal"
      className="flex flex-col justify-center p-1 text-center md:p-2"
    >
      <IC_Delete className="mx-auto mb-2 h-10 w-10 text-coral" />

      <div className="mb-1 mt-1 flex w-full justify-center text-center text-lg font-medium text-theme-black">
        <p>Are you sure?</p>
      </div>
      <p className="text-xs mb-4 font-poppins_cf font-normal text-theme-grey">
      Do you really want to delete these record?
        {/* {`Do you really want to ${
          isDelete ? "delete" : "delete"
        } this test case?`} */}
      </p>
     
      <div className="flex flex-col justify-center space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0">
        <Button
          title="Close popup"
          onClick={onDeleteCancel}
          className="cursor-pointer rounded-md border-2 font-poppins_cf bg-white p-1 text-xs font-normal text-theme-black"
        >
          Cancel
        </Button>
        <Button
          title="Delete Test Case"
          onClick={handleDelete}
          className="cursor-pointer font-poppins_cf rounded-md bg-theme-dark py-2 text-xs font-normal text-white"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteTestCaseModal;
