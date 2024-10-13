import Input from "../../components/Input/Input";
import Textarea from "../../components/Input/Textarea";
import { toast } from "react-toastify";
import {
  useAddBucketMutation,
  useEditBucketMutation,
} from "../../features/dashboard/dashboardAPI";
import { useAppDispatch } from "../../app/hooks";
import { dishNetworkApi } from "../../app/services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../components/Button";
import { z } from "zod";
const AddEditUserBucketModal = ({
  onUpdateSuccess,
  isEditBucket,
  bucketItem,
}) => {
  const [addBucket] = useAddBucketMutation();
  const [editBucket] = useEditBucketMutation();
  const dispatch = useAppDispatch();
  const initialData = {
    bucketId: bucketItem?.bucketId,
    bucketName: bucketItem?.bucketName,
    bucketDescription: bucketItem?.bucketDescription,
  };

  const OrderProductSchema = z.object({
    bucketName: z
      .string()
      .nonempty("Please enter bucket name")
      .default("sadaskds"),
    bucketDescription: z.string().nonempty("Please enter description"),
  });

  const {
    register: register,
    handleSubmit: handleBucketCreateSubmit,
    formState: { errors: orderErrors, isDirty: bucketFormDirty },
  } = useForm({
    resolver: zodResolver(OrderProductSchema),
    defaultValues: initialData,
  });
  const onSubmit = async (data) => {
    const createdBy = 3;
    const payload = { ...data, createdBy };
    try {
      const userResponse = isEditBucket
        ? await editBucket({
            ...payload,
            bucketId: bucketItem?.bucketId,
          }).unwrap()
        : await addBucket(payload).unwrap();

      console.log(userResponse);
      if (userResponse.status === 200) {
        onUpdateSuccess();
        dispatch(dishNetworkApi.util.invalidateTags(["deleteUserBucket"]));
        toast.success(userResponse?.message);
      } else {
        toast.error(userResponse?.message);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.status);
    }
  };

  return (
    <div>
      <form
        novalidate="novalidate"
        onSubmit={handleBucketCreateSubmit(onSubmit)}
      >
        <div
          data-testid="openModal "
          className="flex   flex-col justify-center  p-1 text-center md:p-2"
        >
          <div className="my-4">
            <Input
              type="text"
              name="bucketName"
              placeholder="Bucket Name GN"
              wrapperClass="mb-4 "
              onFocus={() => {}}
              autoComplete="off"
              {...register("bucketName")}
              errors={orderErrors}
              required
              wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
            >
              Bucket Name
            </Input>
          </div>

          <div className="">
            <Textarea
              name="bucketDescription"
              type="text"
              placeholder="Write Something.."
              {...register("bucketDescription")}
              wrapperClass="mb-4 "
              errors={orderErrors}
              onFocus={() => {}}
              required
              autoComplete="off"
              wrapperAttr="h-[75px] w-full my-1 "
            >
              Description
            </Textarea>
          </div>
          <hr className="mt-2" />
          <div className="mt-6 flex flex-col justify-end space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
            {" "}
            <Button
              disabled={!bucketFormDirty}
              type="submit"
              theme="primary"
              className=" rounded-md bg-theme-dark py-2 font-poppins_cf text-xs text-white"
            >
              {!isEditBucket ? "Create Group" : "Edit Group"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditUserBucketModal;
