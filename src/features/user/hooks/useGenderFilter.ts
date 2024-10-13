import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SelectedOption } from "../../../components/Select/CustomSelect";
import { GenderDataVal, genderData } from "../utils/gender";
export const GENDER = "gender";
const useGenderFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGender, setSelectedGender] = useState<SelectedOption<GenderDataVal>>(() => {
    const genderQuery = searchParams.get(GENDER)?.toLowerCase();
    return genderData.find(
      (genderOption) => genderOption?.label?.toLowerCase() === genderQuery
    );
  });
  const onGenderChange = (o: SelectedOption) => {
    const currentGender = o?.value;
    if (typeof currentGender === "string") {
      searchParams.set(GENDER, currentGender);
    } else {
      searchParams.delete(GENDER);
    }
    setSearchParams(searchParams,{replace:true});
    setSelectedGender(o as SelectedOption<GenderDataVal>);
  };
  return { selectedGender, onGenderChange };
};
export default useGenderFilter;
