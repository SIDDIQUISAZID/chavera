import React,{useRef} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input/Input";
import { UserIcon } from "../../assets/icons";

// Define the schema using Zod
const userSchema = z.object({
  userName: z.string().nonempty("User Name is required"),
  email: z.string().email("Invalid email address"),
});

const UserProfileModal = ({ onClose, title }) => {

  // const [avatarURL, setAvatarURL] = useState(DefaultImage);
  const fileUploadRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle user data submission
  };

  return (
    <div className="p-3">
      <div className="flex items-center p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <UserIcon className="mr-4 h-24 w-24" />
        <div>
          <div className="text-theme-black font-poppins_cf text-md font-medium">{title}</div>
          <div className="text-theme-black font-poppins_cf text-xs font-light">
            Formats: png, jpg, gif, Max size: 1MB
          </div>
          <div className="flex justify-start mt-2 gap-2">
            <button
              type="button"
              title="Remove Photo"

              className="cursor-pointer rounded-md border-2 bg-white py-2 px-2 text-xs font-normal text-theme-black"
            >
              Remove Photo
            </button>
            <button
              type="button"
onClick={handleImageUpload}
              className="rounded-md py-2 px-2 text-xs font-normal cursor-pointer text-white bg-theme-dark"
            >
              Upload New Photo
            </button>
          </div>
        </div>
        <input 
            type="file" 
            id="file" 
            ref={fileUploadRef} 
            hidden />
      </div>

      <div className="text-theme-black font-poppins_cf text-sm font-medium mt-6 mb-2">Personal Information</div>
      <hr className="mb-10" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <Input
            name="userName"
            type="text"
            placeholder="Enter User Name"
            {...register("userName")}
            error={errors.userName?.message}
            wrapperAttr={{ className: "h-[35px] w-full" }}
            required
          >
            User Name
          </Input>
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            {...register("email")}
            error={errors.email?.message}
            wrapperAttr={{ className: "h-[35px] w-full" }}
            required
          >
            Email
          </Input>
        </div>
        <hr className="mt-4"></hr>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            title="Close popup"
            onClick={onClose}
            className="w-[90px] cursor-pointer rounded-md border-2 bg-white py-2 text-xs font-normal text-theme-black"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`rounded-md py-2 px-2 text-xs font-normal cursor-pointer text-white ${
              isDirty ? "bg-theme-dark" : "bg-theme-dark opacity-60"
            }`}
            disabled={!isDirty}
          >
            Save User Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileModal;
