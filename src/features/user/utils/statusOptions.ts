import { SelectOption } from "../../../components/Select/CustomSelect";

const statusOptionValue = ["New", "Existing"] as const;

export type StatusOptionValType = (typeof statusOptionValue)[number];
// export type StatusDataType = SelectOption<StatusOptionValType>;
export const statusData = statusOptionValue.map((dv) => ({
  label: dv,
  value: dv,
}));
const statusDataConfig = [
  {
    label: "New",
    value: "N",
  },
  {
    label: "Existing",
    value: "Y",
  },
] as const;

type StatusDataType = typeof statusDataConfig;
// type StatusDataTypeKey = keyof StatusDataType[number];
// type StatusDataTypeLabels = StatusDataType[number]["label"];
export type StatusOptionValues = StatusDataType[number]["value"];

export type StatusOptionDataType = SelectOption<StatusOptionValues>;
