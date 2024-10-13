import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import Input from "../../components/Input/Input";
import { Select } from "../../components/Select";
import { IC_dOCUMENT_UPLOAD } from "../../assets/icons";
import Button from "../../components/Button";

const AddConfigFilesModal = ({ onDeleteSuccess, configFile }) => {
  const MAX_FILE_SIZE_MB = 5;

  // Define Zod schema for validation
  const ConfigFileSchema = z.object({
    fileName: z.string().nonempty("Please enter a file name"),
    fileType: z.enum(["Audio", "Video", "Text", "Image"], {
      errorMap: () => ({ message: "Please select a file type" }),
    }),
    fileSize: z.enum(["10 MB", "20 MB", "100 MB"], {
      errorMap: () => ({ message: "Please select a file size" }),
    }),
    file: z
      .instanceof(File)
      .refine((file) => file.size / (1024 * 1024) <= MAX_FILE_SIZE_MB, {
        message: `File must be less than ${MAX_FILE_SIZE_MB} MB`,
      })
      .optional(),
  });

  const initialData = {
    fileName: configFile?.fileName || "",
    fileType: configFile?.fileType || "",
    fileSize: configFile?.fileSize || "",
    file: null,
  };

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors, isDirty },
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(ConfigFileSchema),
    defaultValues: initialData,
  });

  const [formData, setFormData] = useState(initialData);

  // Handle select input changes
  const onSelectChange = (name, selectedOption) => {
    setFormData({ ...formData, [name]: selectedOption?.value });
  };

  // File change handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file });
    }
  };

  // Submission handler
  const handleSubmit = async (data) => {
    if (!formData?.fileType) {
      setError("fileType", {
        message: "Please select file type",
        type: "validate",
      });
      return;
    }

    if (!formData?.fileSize) {
      setError("fileSize", {
        message: "Please select file size",
        type: "validate",
      });
      return;
    }

    const payload = {
      ...data,
      fileType: formData?.fileType,
      fileSize: formData?.fileSize,
      file: formData?.file,
    };
    reset();
    toast.success("File uploaded successfully!");
  };

  const fileTypeOptions = [
    { value: "Audio", label: "Audio" },
    { value: "Video", label: "Video" },
    { value: "Text", label: "Text" },
    { value: "Image", label: "Image" },
  ];

  return (
    <div className="flex-cols w-full">
      <div className="w-full flex-col">
        <div className="rounded-sm p-4">
          <form
            noValidate
            onSubmit={handleFormSubmit(handleSubmit)}
            className="mt-4 flex flex-col gap-3"
          >
            <Input
              name="fileName"
              type="text"
              placeholder="Enter File Name"
              {...register("fileName")}
              errors={errors}
              wrapperAttr={{ className: "h-[35px] w-full" }}
              required
            >
              File Name
            </Input>
            <Select
              name="fileType"
              options={fileTypeOptions}
              value={fileTypeOptions.find(
                (option) => option.value === formData.fileType
              )}
              onChange={(selected) => onSelectChange("fileType", selected)}
              placeholder="Select File Type"
              errors={errors}
              required
            />
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-theme-black">
                Upload File
              </label>
              <div className="flex flex-col items-center border-[1px] border-dashed border-theme-grey p-2 text-center">
                <IC_dOCUMENT_UPLOAD />
                <input
                  type="file"
                  accept="*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer rounded-md p-2 font-poppins_cf text-sm font-medium"
                >
                  {formData.file
                    ? formData.file.name
                    : "Drag & drop or Choose file"}
                </label>
              </div>
              {errors.file && (
                <p className="text-red-500">{errors.file.message}</p>
              )}
              <div className="flex justify-between font-poppins_cf text-sm text-theme-grey">
                <div>Supported formats: CSV</div>
                <div>Maximum size: 5MB</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                onClick={onDeleteSuccess}
                className="cursor-pointer rounded-md border-[1px] bg-white py-2 text-xs font-normal text-theme-black"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={`cursor-pointer rounded-md py-2 text-xs font-normal text-white ${
                  isDirty ? "bg-theme-dark" : "bg-theme-dark opacity-60"
                }`}
                disabled={!isDirty}
              >
                {configFile ? "Edit" : "Add"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddConfigFilesModal;
