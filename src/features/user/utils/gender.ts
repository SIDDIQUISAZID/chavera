import { SelectOption } from "../../../components/Select/CustomSelect";

export const genderData = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
  {
    label: "Other",
    value: "Other",
  },
] as const;

export type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};
export type GenderDataType = typeof genderData;
// type GenderDataKeys = keyof GenderDataType[number];
// type genderDataLabel = GenderDataType[number]["label"];
export type GenderDataVal = GenderDataType[number]["value"];
export type GenderDataOptionType = SelectOption<GenderDataVal>;
