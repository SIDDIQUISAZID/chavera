import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SelectedOption } from "../../../components/Select/CustomSelect";
import { CommonDataVal, getCommonData } from "../utils/common";
export const ACTION = "action";
const useCommonFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedAction, setSelectedGender] = useState<
    SelectedOption<CommonDataVal>
  >(() => {
    const genderQuery = searchParams.get(ACTION)?.toLowerCase();
    return getCommonData.find(
      (commonOption) => commonOption?.label?.toLowerCase() === genderQuery
    );
  });
  const onCommonChange = (o: SelectedOption) => {
    const currentGender = o?.value;
    if (typeof currentGender === "string") {
      searchParams.set(ACTION, currentGender);
    } else {
      searchParams.delete(ACTION);
    }
    setSearchParams(searchParams, { replace: true });
    setSelectedGender(o as SelectedOption<CommonDataVal>);
  };
  return { selectedAction, onCommonChange };
};
export default useCommonFilter;
