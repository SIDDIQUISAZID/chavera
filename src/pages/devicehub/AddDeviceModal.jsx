import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import PageLoader from "../../components/Loader/PageLoader";
import Input from "../../components/Input/Input";
import { Select } from "../../components/Select";
import { CircleLoader } from "../../components/Loader";
import Button from "../../components/Button";
import { useAppDispatch } from "../../app/hooks";
import {
  useAddDeviceMutation,
  useUpdateDeviceMutation,
  useGetUserListQuery,
} from "../../features/dashboard/dashboardAPI";
import { dishNetworkApi } from "../../app/services";
const AddDeviceModal = ({ onAddSuccess, bucketItem }) => {
  const dispatch = useAppDispatch();
  const [addDevice, { isLoading: isLoadingDevice }] = useAddDeviceMutation();
  const [updateDevice, { isLoading: isUpdatingDevice }] =
    useUpdateDeviceMutation();
  const { isLoading, data } = useGetUserListQuery({});
  const [userID, setUserID] = useState("");
  const UserSchema = z.object({
    deviceName: z.string().nonempty("Please enter device name"),
    imei1: z
      .string()
      .nonempty("Please enter IMEI 1")
      .length(15, "IMEI 1 must be exactly 15 digits"),
    imei2: z.string().optional(),
    userId: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      deviceName: bucketItem?.deviceName || "",
      imei1: bucketItem?.imei1 || "",
      imei2: bucketItem?.imei2 || "",
      userId: bucketItem?.userId || "",
    },
  });

  const filterOptionsUserName = useMemo(() => {
    if (!data?.data?.userDetails) {
      return [];
    }
    return data?.data?.userDetails?.map(({ userName, userId }) => ({
      label: userName,
      value: userId.toString(),
    }));
  }, [data?.data?.userDetails]);

  const onSelectChange = (name, selectedOption) => {
    setUserID(selectedOption?.value);
    setValue(name, selectedOption?.value || "");
  };

  const handleFormSubmit = async (formData) => {
    const payload = {
      imei1: formData.imei1,
      imei2: formData ? formData.imei2 : "",
      deviceName: formData.deviceName,
      assigneeUserId: Number(userID) || Number(bucketItem?.userId), // Use the selected userID or fallback to bucketItem's userId
    };

    try {
      const response = bucketItem
        ? await updateDevice({
            ...payload,
            deviceId: bucketItem?.deviceId,
          }).unwrap()
        : await addDevice(payload).unwrap();
      if (response?.status === 200) {
        dispatch(dishNetworkApi.util.invalidateTags(["deviceList"]));
        toast.success(response.message || "Device saved successfully!");
        // Reset the form and handle modal closing or other success actions
        reset();
        onAddSuccess();
      } else {
        toast.error(response.message || "Failed to save the device.");
      }
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred.");
    }
  };

  return (
    <div data-testid="logoutModal" className="flex-cols w-full ">
      <div className="w-full flex-col">
        {isLoading ? (
          <PageLoader
            containerAttr={{ className: "bg-blue-light/40" }}
            loaderColor={"#EC1944"}
          />
        ) : (
          <div className="rounded-sm  p-4">
            <form
              noValidate
              onSubmit={handleSubmit(handleFormSubmit)}
              className="mt-4 flex flex-col "
            >
              <div className="mb-8 flex gap-2 sm:w-full">
                <Input
                  name="deviceName"
                  type="text"
                  placeholder="Enter device name"
                  {...register("deviceName")}
                  errors={errors}
                  wrapperAttr={{ className: "h-[35px] w-full" }}
                  required
                >
                  Device Name
                </Input>
                <Input
                  name="PhoneNumber"
                  type="number"
                  placeholder="Enter phone number"
                  {...register("phoneNumber")}
                  errors={errors}
                  wrapperAttr={{ className: "h-[35px] w-full" }}
                  required
                >
                  Phone Number
                </Input>
              </div>
              <div className="flex   items-center  justify-center gap-4">
                <div className="sm:w-full">
                  <Input
                    name="imei1"
                    type="text"
                    maxLength="20"
                    placeholder="Enter IMEI 1"
                    {...register("imei1")}
                    errors={errors}
                    wrapperAttr={{ className: "h-[35px] w-full" }}
                    required
                    readOnly={bucketItem?.imei1 ? true : false}
                  >
                    IMEI
                  </Input>
                </div>

                <div className=" sm:w-full">
                  <Input
                    name="imei2"
                    type="text"
                    maxLength="20"
                    placeholder="Enter IMEI 2"
                    {...register("imei2")}
                    errors={errors}
                    wrapperAttr={{ className: "h-[35px] w-full" }}
                    readOnly={bucketItem?.imei2 ? true : false}
                  >
                    IMEI2
                  </Input>
                </div>

                <div className=" sm:w-full ">
                  <Select
                    customLabel="Assign To"
                    options={filterOptionsUserName}
                    value={filterOptionsUserName?.find(
                      (option) => option.value === getValues("userId")
                    )}
                    onChange={(selectedOption) =>
                      onSelectChange("userId", selectedOption)
                    }
                    placeholder="Select"
                    wrapperAttr={{ className: "h-[40px] mt-0  w-full" }}
                    searchable
                    clearable
                  />
                  {errors.userId ? (
                    <div className="text-xs text-theme-dark">
                      {errors.userId.message}
                    </div>
                  ) : (
                    <div className="h-2.5"></div>
                  )}
                </div>
              </div>
              <hr className="my-2" />

              <div className="mt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  title="Close popup"
                  onClick={onAddSuccess}
                  className="w-[90px] cursor-pointer rounded-md border-2 bg-white py-2 text-xs font-normal text-theme-black"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className={` cursor-pointer rounded-[5px]  py-2 font-poppins_cf text-xs font-medium text-white ${
                    isDirty ? "bg-theme-dark" : "bg-theme-dark opacity-60"
                  }`}
                  disabled={!isDirty}
                >
                  {isLoadingDevice || isUpdatingDevice ? (
                    <>
                      <div className="mr-2">Loading.....</div>
                      <CircleLoader className="ml-auto" />
                    </>
                  ) : (
                    <> {bucketItem ? "Save" : "Add"}</>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddDeviceModal;
