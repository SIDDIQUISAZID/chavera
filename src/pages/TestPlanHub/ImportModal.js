import React, { ReactNode, useRef, useState } from "react";

import {
  useDeleteTestPlanMutation,
  useOnImportDeviceDataMutation,
} from "../../features/dashboard/dashboardAPI";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";

import { formatBytes } from "../../features/profile/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import { CircleLoader } from "../../components/Loader";
import { Button as ButtonUpload } from "../../components/Button";

export const MAX_FILE_SIZE = 25 * 1000 * 1000; //10mb
export const ACCEPTED_IMAGE_TYPES = ["text/csv"]; //"image/webp"
const ImageUploadSchema = z.object({
  file: z
    .object({
      file: z
        .any()
        .refine((value) => value instanceof File)
        .refine(
          (file) => file?.size <= MAX_FILE_SIZE,
          `Max text/csv size is 25MB.`
        )
        .refine(
          (file) => file && ACCEPTED_IMAGE_TYPES.includes(file?.type),
          "Only text/csv"
        )
        .optional(),
      value: z.string(),
    })
    .optional()
    .or(z.any()),
});

const ImportModal = ({ onDeleteSuccess }) => {
  const fileUploadRef = useRef();
  const [imageSrc, setImageSrc] = useState();

  const {
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError,
    setValue,
  } = useForm({
    resolver: zodResolver(ImageUploadSchema),
  });

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current?.click();
  };

  const [uploadFileToServer, { isLoading }] = useOnImportDeviceDataMutation();

  /* istanbul ignore next */
  const onSubmit = async (payload) => {
   
    try {
      // console.log({ payload }, "upload form")
      const formData = new FormData();


  

      if (!imageSrc) {
        formData.append("file", "");
      } else if (imageSrc) {
        formData.append("file", imageSrc);
      }

      const result = await uploadFileToServer(formData).unwrap();
      if (result?.status === 200) {
        toast.success(result?.message || "file uploaded successfully");
        onDeleteSuccess();
        reset({});
      } else {
        toast.error(result?.message || "File upload failed");
      }
    } catch (err) {
      toast.error(err?.data?.message || "File upload failed");
    }
  };

  //   const uploadFile = async () => {

  //     const formData = new FormData();

  //             const selfieFile = payload?.selfie?.file;
  //             const selfieValue = payload.selfie?.value;

  //             if (!selfieFile) {
  //                 formData.append("selfie", "");
  //             } else if (selfieFile) {
  //                 formData.append("selfie", selfieFile, selfieValue)
  //             }
  //     const payload = { tpId: bucketItem?.tpId };
  //     try {
  //       const deleteRes = await uploadFileToServer(payload).unwrap();
  //       onDeleteSuccess();
  //       if (deleteRes.status === 200) {
  //         dispatch(dishNetworkApi.util.invalidateTags(["testPlanList"]));
  //         toast.success(deleteRes.message);
  //       } else {
  //         toast.error(deleteRes.message);
  //       }
  //     } catch (err) {
  //       toast.error(err?.data?.message || "test plan not deleted");
  //     }
  //   };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      data-testid="openModal "
      className="flex  flex-col justify-center  p-1 text-center md:p-2"
    >
      

      <div className="my-2 flex items-center ">
        <Button
          variant="outlined"
          size="small"
          style={{
            borderColor: "#EC1944",
            color: "#EC1944",
          }}
          sx={{
            textTransform: "none",
            fontSize: "12px",
            fontWeight: "400",
          }}
          className="  font-poppins_cf text-xs text-theme-black border-[1px] rounded-md h-7"
          onClick={handleImageUpload}
        >
          Choose File
        </Button>

        <div className="mx-2 font-poppins_cf text-xs font-normal text-theme-grey">
          {imageSrc ? imageSrc?.name : "No file Selected"}
        </div>
        <input
          type="file"
          id="file"
          ref={fileUploadRef}
          hidden
          accept=".csv"
          onChange={
            /* istanbul ignore next */ async (event) => {
              const file = event.target.files?.[0];
              
              if (event.target.files?.length && file) {
                if (file && !ACCEPTED_IMAGE_TYPES.includes(file?.type)) {
                  setError("file", {
                    type: "validate",
                    message: "Invalid file type. Accepts text/csv",
                  });
                  return;
                }
                if (file.size > MAX_FILE_SIZE) {
                  setError("file", {
                    type: "max",
                    message:
                      "Pic size exceeds the maximum allowed size of " +
                      formatBytes(MAX_FILE_SIZE, 0),
                  });
                  return;
                }
               
                console.log("sdfsd2f",event.target.value);
                console.log("sdfsdf222",file);
                setImageSrc(file);

               

                setValue(
                  "file",
                  {
                    file: file,
                    value: event.target.value,
                  },
                  { shouldDirty: true, shouldValidate: true }
                );
              } else {
                setValue("file", undefined, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
                event.target.value = "";
              }
            }
          }
        />
      </div>

      <hr />

      <div className="mt-6 flex flex-col justify-end space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
        <button
          title="Close popup"
          onClick={onDeleteSuccess}
          className="w-[90px] cursor-pointer rounded-md border-[1px]   p-1 text-xs font-normal text-theme-black"
        >
          Cancel
        </button>
        {/* <button
              title="Decline"
              type='submit'
              className="w-[90px] cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
            >
              Assign
            </button> */}

        {(!errors?.file && imageSrc) && (
          <button
            theme="primary"
            className="w-[90px] cursor-pointer  rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
            type="submit"
            disabled={isLoading}
          >
            {" "}
            {isLoading ? <CircleLoader /> : "Upload"}
          </button>
        )}
      </div>
      {errors?.file && (
        <div className="mt-3 text-xs text-red-600">
          {errors.file.message?.toString()}
        </div>
      )}
    </form>
  );
};

export default ImportModal;
