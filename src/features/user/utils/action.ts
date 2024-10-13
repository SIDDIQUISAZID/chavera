import { SelectOption } from "../../../components/Select/CustomSelect";

export const getActionData = [
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Approved",
    value: "Approved",
  },
  {
    label: "Decline",
    value: "Decline",
  },
] as const;

export type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};
export type ActionDataType = typeof getActionData;
// type GenderDataKeys = keyof GenderDataType[number];
// type genderDataLabel = GenderDataType[number]["label"];
export type ActionDataVal = ActionDataType[number]["value"];
export type ActionDataOptionType = SelectOption<ActionDataVal>;