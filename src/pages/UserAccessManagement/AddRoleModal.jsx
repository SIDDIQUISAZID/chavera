import { useState, useEffect } from "react";
import Input from "../../components/Input/Input";
import TextArea from "../../components/Input/Textarea";
import { IcInActiveCheckBox, IC_CHECKED } from "../../assets/icons";
import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/Button";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";
import { CircleLoader } from "../../components/Loader";

import {
  useGetAllPermissionQuery,
  useAddRoleMutation,
  useUpdateRoleMutation,
} from "../../features/dashboard/dashboardAPI";

const AddRoleModal = ({
  onRoleAddSuccess,
  isEditRole,
  roleId,
  roleItem,
  viewRole,
  onEditModal
}) => {
  const { data } = useGetAllPermissionQuery({});
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [isFormDirty, setIsFormDirty] = useState(false);


  console.log('viewRole',viewRole)
  

  const dispatch = useAppDispatch();
  const [addRole, { isLoading: isLoadingUser }] = useAddRoleMutation();
  const [editRole, { isLoading: isUpdatingUser }] = useUpdateRoleMutation();

  const initialData = {
    roleName:
      isEditRole == true ? (roleItem?.roleName ? roleItem.roleName : "") : "",
    roleDescription:
      isEditRole == true
        ? roleItem?.roleDescription
          ? roleItem.roleDescription
          : ""
        : "",
  };

  useEffect(() => {
    if (isEditRole) {
      const ids = roleItem?.features.map((feature) => feature?.featureId);
      setSelectedPermissions(ids);
    } else {
      setSelectedPermissions([]);
    }
  }, []);

  const RoleSchema = z.object({
    roleName: z.string().nonempty("Please enter bucket name"),
    roleDescription: z.string().nonempty("Please enter description"),
  });

  const {
    register,
    handleSubmit: handleCreateRoleSubmit,
    formState: { errors: orderErrors, isDirty: bucketFormDirty },
  } = useForm({
    resolver: zodResolver(RoleSchema),
    defaultValues: initialData,
  });

  const handleCheckboxChange = (featureId) => {
    if (viewRole) return;
    setSelectedPermissions((prevSelected) => {
      const updatedPermissions = prevSelected.includes(featureId)
        ? prevSelected.filter((id) => id !== featureId)
        : [...prevSelected, featureId];
      setIsFormDirty(true);

      return updatedPermissions;
    });
  };

  const onSubmit = async (data,event) => {
    event.preventDefault(); 
    const payload = { ...data, featuresIds: selectedPermissions.join(",") };
    try {
      const userResponse = isEditRole
        ? await editRole({
            ...payload,
            roleId: roleId,
          }).unwrap()
        : await addRole(payload).unwrap();
      console.log(userResponse);
      if (userResponse.status === 200) {
        onRoleAddSuccess();

        dispatch(dishNetworkApi.util.invalidateTags(["rolesList"]));

        toast.success(userResponse?.message);
      } else {
        toast.error(userResponse?.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.status);
    }
  };

  const isChecked = (featureId) => {
    return selectedPermissions.includes(featureId);
  };

 

  return (
    <form novalidate="novalidate" action onSubmit={handleCreateRoleSubmit(onSubmit)}>
      <div
        data-testid="openModal "
        className="flex flex-col justify-center p-1 text-center md:p-2"
      >
        <div className="flex gap-2">
          <Input
            name="roleName"
            type="text"
            placeholder="Write something here..."
            {...register("roleName")}
            errors={orderErrors}
            required
            wrapperClass="mb-4"
            onFocus={() => {}}
            autoComplete="off"
            readOnly={viewRole}
            wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
          >
            Role
          </Input>
          {viewRole && (
            <Button
              title="Close popup"
              type="button"
              onClick={()=>onEditModal()}
              className="w-[190px] h-[39px] cursor-pointer rounded-sm border-[1px] border-theme-dark   bg-white p-1 text-xs font-normal text-theme-dark"
            >
              Edit Permission
            </Button>
          )}
        </div>

        <div className="mb-8 w-[500px]">
        <div className="flex items-end justify-between">
            <div className="h-12 w-[70%] content-center items-center rounded-tl-lg  bg-theme-dark text-sm font-medium text-white ">
              Permission
            </div>

            <div className="ml-[0.5px] h-12 w-[30%]  content-center items-center rounded-tr-lg bg-theme-grey text-sm font-medium text-white ">
              Access
            </div>
          </div>

          {data?.data?.Features?.map((item) => (
            <div
              key={item?.featureId}
              className="flex  items-center justify-between border-b-[1px] border-l-[1px] border-r-[1px]  px-2"
            >
              <div className="flex  h-8 w-[71%] content-center items-center  self-center  border-r-[1px] ">
                <div className="text-left font-poppins_w text-xs">
                  {" "}
                  {item?.featureName}
                </div>
              </div>
              <div className=" flex w-[29%] justify-center self-center">
                {isChecked(item?.featureId) ? (
                  <IC_CHECKED
                    className="cursor-pointer bg-center"
                    onClick={() => {
                      handleCheckboxChange(item?.featureId);
                    }}
                  />
                ) : (
                  <IcInActiveCheckBox
                    className="cursor-pointer bg-center"
                    onClick={() => handleCheckboxChange(item?.featureId)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="mt-8">
            <TextArea
              name="roleDescription"
              type="text"
              placeholder="Write something here..."
              wrapperClass=" mt-6"
              onFocus={() => {}}
              {...register("roleDescription")}
              errors={orderErrors}
              required
              autoComplete="off"
              readOnly={viewRole}
              wrapperAttr={{ className: " w-full my-1 " }}
            >
              Description
            </TextArea>
          </div>
        </div>{(!viewRole)&&<div className="flex flex-col justify-end space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
          <button
            title="Close popup"
            onClick={onRoleAddSuccess}
            className="w-[90px] cursor-pointer rounded-md border-[1px] border-theme-dark   bg-white p-1 text-xs font-normal text-theme-dark"
          >
            Cancel
          </button>

          <Button
            disabled={!isFormDirty && !bucketFormDirty}
            type="submit"
            theme="primary"
            className=" rounded-md bg-theme-dark py-2 font-poppins_cf text-xs text-white"
          >
            {isLoadingUser || isUpdatingUser ? (
              <>
                <div className="mr-2">Loading.....</div>
                <CircleLoader className="ml-auto" />
              </>
            ) : (
              <>{isEditRole ? "Save" : "Done"}</>
            )}
          </Button>
        </div>}

    
      </div>
    </form>
  );
};

export default AddRoleModal;
