import { SelectOption } from "../../../components/Select/CustomSelect";
export type AgeValueType = {
  min_age: string;
  max_age: string;
}
export const ageData = [
  {
    label: "21-29",
    value: {
      min_age: "21",
      max_age: "29"
    }
  },
  {
    label: "30-39",
    value: {
      min_age: "30",
      max_age: "39"
    }
  },
  {
    label: "40-49",
    value: {
      min_age: "40",
      max_age: "49"
    }
  },
  {
    label: "50-59",
    value: {
      min_age: "50",
      max_age: "59"
    }
  },
  {
    label: "60-Above",
    value: {
      min_age: "60",
      max_age: "above"
    }
  },
  // {
  //   label: "30-39",
  //   value: "30-39"
  // },
  // {
  //   label: "40-49",
  //   value: "40-49"
  // },
  // {
  //   label: "50-59",
  //   value: "50-59"
  // },
  // {
  //   label: "60-Above",
  //   value: "60-above"
  // },
] as const;

export const ageDataChar = [
  {
    label: "21 - 29",
    value: "21 - 29",
  },
  {
    label: "30 - 39",
    value: "30 - 39",
  },
  {
    label: "40 - 49",
    value: "40 - 49",
  },
  {
    label: "50 - 59",
    value: "50 - 59",
  },
  {
    label: "60 - Above",
    value: "60 - Above",
  },
] as const;

export type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};
export type AgeDataType = typeof ageData;
export type AgeDataCharType = typeof ageDataChar;
// type GenderDataKeys = keyof AgeDataType[number];
// type genderDataLabel = AgeDataType[number]["label"];
export type AgeDataVal = AgeDataType[number]["value"];
export type AgeDataOptionType = SelectOption<AgeDataVal>;
