import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SelectedOption } from "../../../components/Select/CustomSelect";
import { BucketDataVal, getBucketData } from "../utils/bucketName";
export const ACTION = "action";
const useBucketFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedBucket, setSelectedBucket] = useState<SelectedOption<BucketDataVal>>(() => {
    const genderQuery = searchParams.get(ACTION)?.toLowerCase();
    return getBucketData.find(
      (genderOption) => genderOption?.label?.toLowerCase() === genderQuery
    );
  });
  const onBucketChange = (o: SelectedOption) => {
    const currentGender = o?.value;
    if (typeof currentGender === "string") {
      searchParams.set(ACTION, currentGender);
    } else {
      searchParams.delete(ACTION);
    }
    setSearchParams(searchParams,{replace:true});
    setSelectedBucket(o as SelectedOption<BucketDataVal>);
  };
  return { selectedBucket, onBucketChange };
};
export default useBucketFilter;
