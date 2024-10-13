import { SelectOption } from "../../../components/Select/CustomSelect";

export const getCommonData = [
  {
    label: "Samsung note",
    value: "Samsung note",
  },
  {
    label: "iPhone  15",
    value: "iPhone  15",
  },
  {
    label: "iPhone 14",
    value: "iPhone 14",
  },
] as const;

export type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};
export type CommonDataType = typeof getCommonData;
// type GenderDataKeys = keyof GenderDataType[number];
// type genderDataLabel = GenderDataType[number]["label"];
export type CommonDataVal = CommonDataType[number]["value"];
export type CommonDataOptionType = SelectOption<CommonDataVal>;
