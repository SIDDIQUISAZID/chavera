import { SelectOption } from "../../../components/Select/CustomSelect";

export const getBucketData = [
  {
    label: "Bucket Name GN 1",
    value: "Bucket Name GN",
  },
  {
    label: "Bucket Name GN 2",
    value: "Bucket Name GN",
  },
  {
    label: "Bucket Name GN 3",
    value: "Bucket Name GN",
  },
] as const;

export type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};
export type BucketDataType = typeof getBucketData;
// type GenderDataKeys = keyof GenderDataType[number];
// type genderDataLabel = GenderDataType[number]["label"];
export type BucketDataVal = BucketDataType[number]["value"];
export type BucketDataOptionType = SelectOption<BucketDataVal>;