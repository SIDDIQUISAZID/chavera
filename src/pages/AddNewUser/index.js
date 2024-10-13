import { useState, useMemo } from "react";
import Input from "../../components/Input/Input";
import { LeftArrow } from "../../assets/icons";
import { add_new_user, editUser } from "../../utils/commonTextFile";
import { useNavigate } from "react-router-dom";
import { IC_CreateUser } from "../../assets/icons";
import { useParams, useLocation } from "react-router-dom";
import PageLoader from "../../components/Loader/PageLoader";
import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/Button";
import {CircleLoader} from "../../components/Loader";
import {
  useGetRolesQuery,
  useAddUserMutation,
  useUpdateUserMutation,
} from "../../features/dashboard/dashboardAPI";
import { Select } from "../../components/Select";

const CreateUser = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialData = {
    roleId: state?.item?.roleId || "",
    status: state?.item?.status || "",
    userBucketId: state?.item?.userBucketId || "",
    userName: state?.item?.userName || "",
    email: state?.item?.email || "",
    password: "",
  };

  const { isLoading, data: userRole } = useGetRolesQuery({page:'0',size:'20'});

  const [addUser, { isLoading: isLoadingUser }] = useAddUserMutation();
  const [updateUser, { isLoading: isLoadingUpdateUser }] =
    useUpdateUserMutation();

  const UserSchema = z.object({
    userName: z.string().nonempty("Please enter full name"),
    email: z
      .string()
      .nonempty("Please enter email id")
      .email("Please enter a valid email")
      .min(5, "Email should be at least 5 characters long")
      .max(100, "Email should be at most 100 characters long")
      .regex(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Email should not contain spaces or invalid characters"
      ),
    
  });

  const {
    register: register,
    handleSubmit: handleCreateUserSubmit,
    formState: { errors: orderErrors, isDirty: bucketFormDirty },
    setValue,
    setError,
    reset,
    clearErrors,
  } = useForm({
    resolver: zodResolver(UserSchema),
    defaultValues: initialData,
  });

  const filterOptions = useMemo(() => {
    if (!userRole?.data?.roles) {
      return [];
    }
    return userRole?.data?.roles.map(({ roleName, roleId }) => ({
      label: roleName,
      value: roleId,
    }));
  }, [userRole]);

 

  const statusFilter = [
    { value: true, label: "Active" },
    { value: false, label: "Inactive" },
  ];

  const [formData, setFormData] = useState(initialData);

  const onSelectChange = (name, selectedOption) => {
    
    setFormData({ ...formData, [name]: selectedOption?.value });
  };

  const handleSubmitUser = async (data) => {
    console.log(formData);
    if (!formData?.roleId) {
      setError("roleId", {
        message: "Please select user role",
        type: "validate",
      });
      return;
    }

    if (formData?.status == undefined) {
      setError("status", {
        message: "Please select user status",
        type: "validate",
      });
      return;
    }

  

    const payload = {
      userName: data.userName,
      email: data.email,
      // password: data.password,
      roleId: formData.roleId,
      status: formData.status,
      // userBucketId: formData.userBucketId,
    };
    try {
      const userResponse =
        user === "add-user"
          ? await addUser(payload).unwrap()
          : await updateUser({
              ...payload,
              userId: state?.item?.userId,
            }).unwrap();
      if (userResponse?.status === 200) {
        reset();

        const initialData = {
          roleId: "",
          status: "",
          userBucketId: "",
          userName: "",
          email: "",
          // password: "",
        };

        setFormData({ ...initialData });
        toast.success(userResponse?.message);
        navigate(-1);
      } else {
        toast.error(userResponse?.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.status);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleCancel = () => {
    navigate('/user/userList')
    reset(initialData); // reset form fields to initial data
    setFormData(initialData); // reset formData to initial data
  };

  return (
    <>
      <div className="flex-cols w-full">
        <div className="flex items-center">
          <LeftArrow onClick={goBack} className="cursor-pointer" />
          <div className="ml-4 flex text-[10px]">
            Users | User Management <div className="mx-2">|</div>
            <div className="text-[10px] text-theme-dark">
              {user === "add-user" ? add_new_user : editUser}
            </div>
          </div>
        </div>

        <div className="w-full flex-col">
          <div className="my-2 text-lg font-medium text-theme-black">
            {user === "add-user" ? add_new_user : editUser}
          </div>

          {isLoading ? (
            <PageLoader
              containerAttr={{ className: "bg-blue-light/40" }}
              loaderColor={"#EC1944"}
            />
          ) : (
            <div className="flex flex-col rounded-sm bg-white p-6 lg:flex-row lg:justify-between">
              <div>
                <form
                  novalidate="novalidate"
                  onSubmit={handleCreateUserSubmit(handleSubmitUser)}
                  className="w-full"
                >
                  <div className="text-sm font-medium text-theme-black">
                    User Info
                  </div>
                  <hr className="my-5" />
                  <div className="grid grid-cols-1 gap-2 pt-5 sm:grid-cols-2 md:grid-cols-3">
                    <div className="flex-grow">
                      <Input
                        type="text"
                        name="userName"
                        placeholder="Enter Name"
                        {...register("userName")}
                        wrapperClass="mb-4"
                        autoComplete="off"
                        required
                        errors={orderErrors}
                        wrapperAttr={{ className: "h-[35px] w-full my-1" }}
                      >
                        Full Name
                      </Input>
                    </div>
                    <div className="flex-grow">
                      <Input
                        type="text"
                        name="email"
                        placeholder="Enter Email"
                        {...register("email")}
                        wrapperClass="mb-4"
                        errors={orderErrors}
                        autoComplete="off"
                        readOnly={user !== "add-user"}
                        required
                        wrapperAttr={{ className: "h-[35px] w-full my-1" }}
                      >
                        Email
                      </Input>
                    </div>
                    {/* <div className="relative flex-grow">
                      <Input
                        type="password"
                        name="password"
                        placeholder="********"
                        {...register("password")}
                        autoComplete="off"
                        errors={orderErrors}
                        required
                        wrapperAttr={{
                          className: "h-[35px] w-full my-1 pl-10 pr-10",
                        }}
                      >
                        Password
                      </Input>
                      <IC_PASSWORD_EYE className="absolute inset-y-0 right-3 top-3 flex cursor-pointer items-center" />
                    </div> */}
                  </div>

                  <div className="text-sm font-medium text-theme-black">
                    User Type & Permission
                  </div>
                  <hr className="my-5 mb-10" />
                  <div className=" grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 ">
                    <div className="flex-grow ">
                      <Select
                        customLabel="User Role"
                        options={filterOptions}
                        value={filterOptions.find(
                          (option) => option?.value === formData?.roleId
                        )}
                        onChange={(selectedOption) => {
                          setValue("roleId", selectedOption?.value, {
                            shouldDirty: true,
                          })
                          onSelectChange("roleId", selectedOption);
                          clearErrors();
                        }}
                        placeholder="Select"
                        required
                        wrapperAttr={{ className: "h-[35px] w-full my-1" }}
                        clearable
                      />
                      <div className="h-5 text-[9px] text-red-600 xs:text-xs">
                        {orderErrors?.roleId?.message}
                      </div>
                    </div>
                    <div className="flex-grow ">
                      <Select
                        customLabel="Status"
                        options={statusFilter}
                        value={statusFilter.find(
                          (option) => option?.value === formData?.status
                        )}
                        onChange={(selectedOption) => {
                          setValue("status", selectedOption?.value, {
                            shouldDirty: true,
                          })
                          onSelectChange("status", selectedOption);
                          clearErrors();
                        }}
                        placeholder="Select"
                        wrapperAttr={{ className: "h-[35px] w-full my-1" }}
                        clearable
                        required
                      />

                      <div className="h-5 text-[9px] text-red-600 xs:text-xs">
                        {orderErrors?.status?.message}
                      </div>
                    </div>
              
                  </div>
                  <hr style={{ margin: "20px 0" }} />
                  <div className="flex justify-end gap-2">    <button
                  type="button"
                  title="Close popup"
                  onClick={handleCancel}
                  className="w-[90px] cursor-pointer rounded-md border-2 bg-white py-2 text-xs font-normal text-theme-black"
                >
                  Cancel
                </button>
                  <Button
                    type="submit"
                    disabled={!bucketFormDirty || isLoadingUser || isLoadingUpdateUser}
                    variant="contained"
                    className=" rounded-md bg-theme-dark py-2 font-poppins_cf text-xs text-white"
                  >
                    {isLoadingUser || isLoadingUpdateUser ? (
                      <div className="flex">
                        <div className="mr-2">Loading.....</div>
                        <CircleLoader className="ml-auto" />
                      </div>
                    ) : (
                      <>{user === "add-user" ? add_new_user : editUser}</>
                    )}
                  </Button></div>

               
                </form>
              </div>
              <div>
                <IC_CreateUser />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateUser;
