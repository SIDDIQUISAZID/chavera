import { ordinalSuffix } from "../../../utils";
export const procedureOptionFormat = (procedure:number)=>{
  return {
    label: `${ordinalSuffix(procedure)} Treatment`,
    value: procedure,
  }
}
export const procedureDataOptionFormat = (length: number) => {
  return Array.from({ length }, (_, i) => i + 1).map((c) => procedureOptionFormat(c));
};

export const countryCode = {
  "United States": "+1",
  "India": "+91"
} as const
export type CountryType = keyof typeof countryCode;