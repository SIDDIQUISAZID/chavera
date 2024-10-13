import { useMemo, useState } from "react";
import { Select } from "../../components/Select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";
import {
  useAssignToUserMutation,
  useGetUserListQuery,
} from "../../features/dashboard/dashboardAPI";
import { toast } from "react-toastify";

const AssignToOthers = ({ onAddSuccess, bucketItem }) => {
  const [assignToOther] = useAssignToUserMutation();

  const [userId, setUserId] = useState("");

  const dispatch = useAppDispatch();
  const { data: userNameList } = useGetUserListQuery({});

  const UserSchema = z.object({
    userId: z.number(),
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
    clearErrors,
  } = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      userId: bucketItem?.userId || "",
    },
  });

  const filterOptions = useMemo(() => {
    if (!userNameList?.data?.userDetails) {
      return [];
    }
    return userNameList?.data?.userDetails.map(({ userName, userId }) => ({
      label: userName,
      value: userId,
    }));
  }, [userNameList?.data?.userDetails]);

  const [filter, setFilter] = useState();

  const onFilterChange = (selectedOption) => {
    console.log(JSON.stringify(selectedOption));
    setFilter(selectedOption);
    setUserId(selectedOption?.value);

    // Update form value for userId in React Hook Form
    setValue("userId", selectedOption?.value, { shouldDirty: true });

    // Clear any errors related to userId once a selection is made
    clearErrors("userId");
  };

  const onSubmit = async (data) => {
    const payload = { deviceId: bucketItem?.deviceId, userId: userId };
    try {
      const deleteRes = await assignToOther(payload).unwrap();
      onAddSuccess();
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
      className="flex flex-col justify-center text-center md:p-2 "
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col items-start justify-start pt-4 ">
          <Select
            customLabel="Select Role"
            options={filterOptions}
            value={filter}
            onChange={onFilterChange}
            placeholder="Select Role"
            wrapperAttr={{ className: "h-[35px] w-full my-1" }}
            searchable
            clearable
          />
          {errors.userId && (
            <div className="text-xs text-theme-dark">
              {errors.userId.message}
            </div>
          )}
        </div>
        <hr className="my-3" />
        <div className="flex flex-col justify-end space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0">
          <button
            type="button"
            title="Close popup"
            onClick={onAddSuccess}
            className="w-[90px] cursor-pointer rounded-md border-2 bg-white p-1 text-xs font-normal text-theme-black"
          >
            Cancel
          </button>
          <button
            type="submit"
            title="Assign"
            className={`w-[90px] cursor-pointer rounded-md  py-2 text-xs font-normal text-white ${
              isDirty ? "bg-theme-dark" : "bg-theme-dark opacity-60"
            }`}
            disabled={!isDirty}
          >
            Assign
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssignToOthers;
