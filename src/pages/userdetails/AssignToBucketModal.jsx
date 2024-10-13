import { useMemo, useState } from "react";
import { Select } from "../../components/Select";

import { useGetUserBucketListQuery } from "../../features/dashboard/dashboardAPI";
const AssignToBucketModal = ({ onDeleteSuccess }) => {
  const { data: userBucketList } = useGetUserBucketListQuery({});

  const filterOptions = useMemo(() => {
    if (!userBucketList?.data?.BucketDetails) {
      return [];
    }
    const options = userBucketList?.data?.BucketDetails.map(
      ({ bucketName, bucketId }) => ({
        label: bucketName,
        bucketId,
      })
    );

    return options;
  }, [userBucketList?.data?.BucketDetails]);
  const [filter, setFilter] = useState(filterOptions?.[0]);
  const onFilterChange = (e) => {
    setFilter(e);
  };

  return (
    <div
      data-testid="logoutModal"
      className="flex  flex-col justify-center p-1 text-center md:p-2"
    >
      {/* <div className="mb-2 mt-1 flex w-full items-center  justify-between text-center text-lg font-medium text-theme-black  ">
        <p className="text-base font-medium">Assign to Bucket</p>
      </div>

      <hr className="my-4" /> */}
      {/* <h1 className='text-4xl font-argent font-medium text-blue-dark'>Are you sure?</h1> */}
      <div className="flex w-full flex-col items-start justify-start">
        <div className="text-xs text-theme-black">Bucket Name</div>
        <Select
          options={filterOptions}
          value={filter}
          onChange={onFilterChange}
          placeholder="Select"
          wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
          clearable
        />
      </div>
      <hr className="my-3" />

      <div className="flex flex-col justify-end space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
        <button
          title="Decline"
          onClick={onDeleteSuccess}
          className="mt-4 w-[90px]  cursor-pointer rounded-md bg-theme-dark py-2 text-xs font-normal text-white "
        >
          Assign
        </button>
      </div>
    </div>
  );
};

export default AssignToBucketModal;
