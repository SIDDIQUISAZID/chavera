import { SelectOption } from "../components/Select/CustomSelect";
import states from "./US_States_and_Cities.json";
// import indianState from "./IndianStatesDistricts.json";
import indianStateObj from "./India_States_and_Cities.json"
export const initialAllStateData = { ...states, ...indianStateObj }

export type StateList = {
  [stateName: string]: string[];
};
export type TypeofStates = typeof initialAllStateData;
export type StateKeys = keyof TypeofStates;
export type StateValues = TypeofStates[StateKeys];
// type CityVal = TypeofStates[StateKeys][number];

// export const stateToSelectOption = (obj: { [key: string]: string[] }) => {
//   return Object.keys(obj).reduce((acc: SelectOption[], curr: string) => {
//     acc.push({ label: curr, value: curr });
//     return acc;
//   }, []);
// };
export const stateDataArr = Object.keys(initialAllStateData).reduce(
  (acc: string[], curr: string) => {
    acc.push(curr);
    return acc;
  },
  []
);

type StateObjType = { [key: string]: string[] }
export const stateObjToArr = (initialAllStateData: StateObjType) => {
  return Object.keys(initialAllStateData).reduce(
    (acc: string[], curr: string) => {
      acc.push(curr);
      return acc;
    },
    []
  );
}

// export const stateData = stateToSelectOption(states as StateList);

// const stateKeys = keyof typeof states
export const formatArrToSelectOption = (arr: string[]): SelectOption[] =>
  arr.map((strName) => ({ label: strName, value: strName }));


export const convertStateToOptions = (stateObj: StateObjType) => {
  const stateDataArr = stateObjToArr(stateObj);
  return formatArrToSelectOption(stateDataArr)
}
export const stateData = formatArrToSelectOption(stateDataArr)
// const indianStateNameArr1 = indianState.states.map((d) => d.name)
const indianStateNameArr = Object.keys(indianStateObj).map((name) => name)
// console.log({indianStateNameArr1,indianStateNameArr})
export const IN_USA_stateData = formatArrToSelectOption([...stateDataArr])
export const getCityArrFromStateName = (stateName: StateKeys): string[] => initialAllStateData[stateName];

export const allCityDataArr: string[] = Object.keys(initialAllStateData as TypeofStates).reduce(
  (acc: string[], stateName) => {
    acc.push(...initialAllStateData[stateName as StateKeys]);
    return acc;
  },
  []
);

export const getAllCityDataArr = (stateCityObj: StateObjType)=>{
  return Object.keys(stateCityObj).reduce(
    (acc: string[], stateName) => {
      acc.push(...stateCityObj[stateName as StateKeys]);
      return acc;
    },
    []
  );
}

// export const allCityData: SelectOption[] = Object.keys(
//   states as TypeofStates
// ).reduce((acc: SelectOption[], stateName) => {
//   acc.push(
//     ...states[stateName as StateKeys].map((cityName) => ({
//       label: cityName,
//       value: cityName,
//     }))
//   );
//   return acc;
// }, []);
export const allCityData: SelectOption[] = allCityDataArr.map((cityName: string): SelectOption => ({
  label: cityName,
  value: cityName,
}));
