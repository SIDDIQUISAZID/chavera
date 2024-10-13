import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SelectedOption } from "../../../components/Select/CustomSelect";
import { ActionDataVal, getActionData } from "../utils/action";
export const ACTION = "action";
const useActionFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedAction, setSelectedGender] = useState<SelectedOption<ActionDataVal>>(() => {
    const genderQuery = searchParams.get(ACTION)?.toLowerCase();
    return getActionData.find(
      (genderOption) => genderOption?.label?.toLowerCase() === genderQuery
    );
  });
  const onGenderChange = (o: SelectedOption) => {
    const currentGender = o?.value;
    if (typeof currentGender === "string") {
      searchParams.set(ACTION, currentGender);
    } else {
      searchParams.delete(ACTION);
    }
    setSearchParams(searchParams,{replace:true});
    setSelectedGender(o as SelectedOption<ActionDataVal>);
  };
  return { selectedAction, onGenderChange };
};
export default useActionFilter;
