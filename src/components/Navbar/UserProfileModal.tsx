import React, { ReactNode, useRef, useState} from "react";
import { CrossIcon, UserIcon } from "../../assets/icons";
import useKeyPress from "../../hooks/useKeyPress";
import { cn } from "../../utils";
import Input from "../Input/Input";
import { toast } from "react-toastify";
import { CircleLoader } from "../../components/Loader";
import Button from "../../components/Button";

import {
  useUpdateProfileImageMutation,
  useUpdateFCMMutation,
  ProfileImagePayload,
  FcmTokenPayload
} from "../../features/auth/authAPI";

import {useGetMyProfileQuery } from "../../features/dashboard/dashboardAPI";


// Define the type for UserInfo
export interface UserInfo {
  userId: number;
  userName: string;
  email: string;
  roleId: number;
  roleName: string | null;
  status: string | null;
  lastLogin: string | null;
  features: any[]; // Adjust type as needed for features
}

type AppModalProps = {
  userData: UserInfo; // Update type to an array of UserInfo
  show: boolean;
  onClose?: () => void;
  closeButton?: React.ReactNode;
  isWindow?: boolean;
  modalClass?: string;
  title?: string;
  customTitle?: ReactNode;
  
};

const UserProfileModal = ({
  show,
  onClose,
  closeButton,
  isWindow,
  modalClass,
  title,
  customTitle,
  userData,
}: AppModalProps) => {
  const [isMaximize, setMaximize] = useState(false);
  const fileUploadRef = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [updateProfileImage, { isLoading }] = useUpdateProfileImageMutation();

 
  // const [updateFCMToken] = useUpdateFCMMutation();
  const dialogRef = useRef<HTMLDivElement>(null);

 

  const handleImageUpload = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    fileUploadRef.current?.click();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageSrc(reader.result as string); // Update the image source
      };

      reader.readAsDataURL(file); // Read the uploaded file
    }
  };

  const onSubmit = async () => {
    if (imageSrc === null) {
      toast.error("Please select user profile photo");
      return;
    }
    // Create payload for updating profile image
    const payload: ProfileImagePayload = {
      profileImgData: imageSrc || "",
    };

    if (payload.profileImgData) {
      try {
        const userResponse = await updateProfileImage(payload).unwrap();
        if (userResponse?.status === 200) {
          toast.success(userResponse.message);
        } else {
          toast.error("Failed to update profile image");
        }
      } catch (error) {
        console.error("Failed to update profile image", error);
      }
    }
  };

  useKeyPress("Escape", () => {
    onClose?.();
  });

  if (!show) {
    return null;
  }

  return (
    <div
      ref={dialogRef}
      className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/20"
    >
      <div
        className={cn(
          `scrollbar-track-blue-lightest scrollbar-thumb-blue-dark relative m-0 flex w-full flex-col overflow-auto rounded bg-white p-0 shadow-2xl transition-transform scrollbar-thin md:w-[400px] ${
            isMaximize ? "!h-full !w-full" : "max-h-[calc(100vh-150px)]"
          }`,
          modalClass
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-2 top-2 rounded-full"
              title="Close"
            >
              <CrossIcon className="text-blue-dark h-7 cursor-pointer hover:text-coral" />
            </button>
          )}
          <div className="w-full">
            <div className="m-0 flex w-full items-center bg-gradient-to-r from-[#F4505F] to-[#B01367] p-4">
              {imageSrc ? (
                <img
                  className="mr-4 h-24 w-24 rounded-full"
                  src={imageSrc}
                  alt="Uploaded Preview"
                  style={{
                    marginTop: "20px",
                    maxWidth: "300px",
                    maxHeight: "300px",
                  }}
                />
              ) : (
                <UserIcon className="mr-4 h-24 w-24" />
              )}

              <div>
                <div className="text-md font-poppins_cf font-medium text-theme-white">
                  {title}
                </div>
                <div className="font-poppins_cf text-xs font-light text-theme-white">
                  Formats: png, jpg, gif, Max size: 1MB
                </div>
                <div className="mt-2 flex justify-start gap-2">
                  {/* <button
                    type="button"
                    title="Remove Photo"
                    className="cursor-pointer rounded-md bg-theme-white px-2 py-2 text-xs font-normal text-theme-black"
                    onClick={() => setImageSrc(null)} // Implement remove functionality
                  >
                    Remove Photo
                  </button> */}
                  <Button
                    type="button"
                    onClick={handleImageUpload}
                    className="cursor-pointer rounded-md bg-theme-white py-2 text-xs font-normal font-poppins_cf text-theme-black"
                  >
                    Upload New Photo
                  </Button>
                </div>
              </div>
              <input
                type="file"
                id="file"
                ref={fileUploadRef}
                hidden
                accept="image/*" // Optional: specify file type
                onChange={handleFileChange}
              />
            </div>
            <div className="p-4">
              <div className="mb-2 mt-6 font-poppins_cf text-sm font-medium text-theme-black">
                Personal Information
              </div>
              <hr className="mb-10" />
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Enter User Name"
                  // {...register("username")}
                  name={"username"}
                 value={userData?.userName||""}
                  //   errors={errors}
                  wrapperAttr={{ className: "h-[35px] w-full" }}
                  readOnly
                >
                  User Name
                </Input>
                <Input
                  type="email"
                  placeholder="Enter Email"
                  // {...register("email")}
                  // errors={errors}
                  name={"email"}
                 value={userData.email||""}
                  readOnly
                  wrapperAttr={{ className: "h-[35px] w-full" }}
                >
                  Email Id
                </Input>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  onClick={onClose}
                  className="bg-blue-dark hover:bg-blue-dark border-[1px] cursor-pointer rounded-md  py-2 text-xs font-poppins_cf font-medium text-theme-black"
                >
                  Cancel
                </Button>
                <Button
                  // type="submit"

                  disabled={isLoading}
                  onClick={() => onSubmit()}
                  className="cursor-pointer rounded-md bg-coral  py-2 text-xs font-poppins_cf font-medium  text-white hover:bg-red-600"
                >
                  {isLoading ? (
                    <div className="flex">
                      <div className="mr-2">Loading.....</div>
                      <CircleLoader className="ml-auto" />
                    </div>
                  ) : (
                    <> {"Save User Details"}</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
