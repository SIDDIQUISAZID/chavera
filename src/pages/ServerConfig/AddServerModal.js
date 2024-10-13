import { useForm } from "react-hook-form";
import React, { useState , useEffect} from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import PageLoader from "../../components/Loader/PageLoader";
import Input from "../../components/Input/Input";
import { CircleLoader } from "../../components/Loader";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";
import { Select } from "../../components/Select";

import {
  useAddServerMutation,
  useUpdateServerMutation,
} from "../../features/dashboard/dashboardAPI";
const AddServerModal = ({ onDeleteSuccess, serverItem }) => {
  const dispatch = useAppDispatch();

  const [addServer, { isLoading:isLoadingAdd }] = useAddServerMutation();
  const [updateServer, { isLoading: isLoadingUpdate}] =
    useUpdateServerMutation();

  const ServerSchema = z.object({
    serverName: z.string().nonempty("Please enter Server Name"),
    //serverType: z.string().nonempty("Please select server type"),
    serverIP: z.string().nonempty("Please enter  ip address"),
    // portRangeStart: z
    //   .string()
    //   .length(7, {
    //     message: "Port number must contain exactly 4 character(s)",
    //   }),
    portRangeEnd: z
      .string().nonempty("Please enter Port/Range	")
    
  });

  const initialData = {
    serverName: serverItem?.serverName || "",
    serverType:  "",
    serverIP: serverItem?.serverIP || "",
    portRangeStart:"",
    portRangeEnd: serverItem?.portRangeEnd || "",
  };

  const {
    register,
    handleSubmit: handleCreateUserSubmit,
    formState: { errors: orderErrors, isDirty: bucketFormDirty },
    setValue,
    setError,
    getValues,
    reset,
    clearErrors,
  } = useForm({
    resolver: zodResolver(ServerSchema),
    defaultValues: initialData,
  });   

  const handleSubmitAddServer = async (data) => {


    console.log(serverItem)
    console.log(formData);
    if (formData?.serverType == undefined) {
      setError("serverType", {
        message: "Please select server type",
        type: "validate",
      });
      return;
    }

    const payload = {
      ...data,
      serverType: formData?.serverType,
    };
    try {
      const userResponse =
      !serverItem
          ? await addServer(payload).unwrap()
          : await updateServer({
              ...payload,
              serverId: serverItem?.serverId,
            }).unwrap();
      if (userResponse?.status === 200) {
        toast.success(userResponse?.message);
        onDeleteSuccess();
    
        dispatch(dishNetworkApi.util.invalidateTags(["serverList"]));
        reset();
      } else {
        toast.error(userResponse?.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.status);
    }
  };

  const statusFilter = [
    { value: "http", label: "HTTP" },
    { value: "https", label: "HTTPS" },
  ];

  const [formData, setFormData] = useState(initialData);

  const onSelectChange = (name, selectedOption) => {
    // console.log("name", name)
    // setValue(name, selectedOption?.value || "");
    setFormData({ ...formData, [name]: selectedOption?.value });
  };
 
  

  return (
    <div data-testid="logoutModal" className="flex-cols w-full ">
      <div className="w-full flex-col">
      <div className="rounded-sm  p-4">
            <form
              noValidate
              onSubmit={handleCreateUserSubmit(handleSubmitAddServer)}
              className="mt-4 flex flex-col gap-3"
            >
              <div className="flex gap-4">
                <div className="sm:w-full">
                  <Input
                    name="serverName"
                    type="text"
                    placeholder="Enter Server Name"
                    {...register("serverName")}
                    errors={orderErrors}
                    wrapperAttr={{ className: "h-[35px] w-full" }}
                    required
                  >
                    Server Name
                  </Input>
                </div>
              </div>
              <div className=" flex ">
                {/* <div className=" sm:w-full">
                  <div className="flex-grow ">
                    <Select
                      customLabel="Server Type"
                      options={statusFilter}
                      value={statusFilter.find(
                        (option) => option?.value === formData?.serverType
                      )}
                      onChange={(selectedOption) => {
                        setValue("serverType", selectedOption?.value, {
                          shouldDirty: true,
                        });
                        onSelectChange("serverType", selectedOption);
                        clearErrors();
                      }}
                      placeholder="Select"
                      wrapperAttr={{ className: "h-[35px] w-full my-1" }}
                      clearable
                      required
                    />

                    <div className="h-5 text-[9px] text-red-600 xs:text-xs">
                      {orderErrors?.serverType?.message}
                    </div>
                  </div>
                </div> */}
                {/* <div className=" mt-1 sm:w-full">
                  <Input
                    name="serverIP"
                    type="text"
                    placeholder="Enter IP"
                    {...register("serverIP")}
                    errors={orderErrors}
                    required
                    wrapperAttr={{ className: "h-[35px] w-full" }}
                  >
                    IP Address
                  </Input>
                </div> */}
              </div>

              <div className="flex gap-4">
                {/* <div className=" sm:w-full">
                  <Input
                    name="portRangeStart"
                    type="number"
                    placeholder="Enter port"
                    {...register("portRangeStart")}
                    errors={orderErrors}
                    required
                    wrapperAttr={{ className: "h-[35px] w-full" }}
                  >
                    Port Start Range
                  </Input>
                </div> */}

                <div className="flex-3">
                  <Input
                    name="serverIP"
                    type="text"
                    placeholder="Enter IP"
                    {...register("serverIP")}
                    errors={orderErrors}
                    required
                    wrapperAttr={{ className: "h-[35px] w-fit" }}
                  >
                    IP Address
                  </Input>
                </div>
                <div className="flex-1">
                  <Input
                    name="portRangeEnd"
                    type="string"
                    placeholder="Enter port"
                    {...register("portRangeEnd")}
                    // maxLength={4}
                    errors={orderErrors}
                    required
                    wrapperAttr={{ className: "h-[35px] w-fit" }}
                  >
                   Port/Range (5000, 5001-04)
                  </Input>
                </div>
              </div>
              <hr  />

              <div className=" flex justify-end gap-2">
                <button
                  type="button"
                  title="Close popup"
                  onClick={onDeleteSuccess}
                  className="w-[90px] cursor-pointer rounded-md border-[1px] bg-white py-2 text-xs font-normal text-theme-black"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={`w-[90px] cursor-pointer rounded-md py-2 text-xs font-normal text-white ${
                    bucketFormDirty
                      ? "bg-theme-dark"
                      : "bg-theme-dark opacity-60"
                  }`}
                  disabled={!bucketFormDirty}
                >
                  {  (isLoadingAdd ||isLoadingUpdate) ? (
                    <>
                      <div >Loading.....</div>
                      <CircleLoader className="ml-auto" />
                    </>
                  ) : (
                    <>{serverItem ? "Edit" : "Add"}</>
                  )}
                </button>
              </div>
            </form>
          </div>
      </div>
    </div>
  );
};

export default AddServerModal;
