import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export { default as states } from "./US_States_and_Cities.json";
export { default as country } from "./country-by-abbreviation.json";
export * from "./numberFormatter";
export * from "./dateFormatter";

// DECLARE DEBOUNCE FUNCTION
export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = callback(...args);
    }, waitFor);
    return result;
  };
};

export function getStartAndEndDateOfWeek() {
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  
  // Calculate the start date of the current week (assuming Monday as the start of the week)
  const startDate = new Date(currentDate);
  startDate.setDate(currentDate.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1));

  // Calculate the end date of the current week
  const endDate = new Date(currentDate);
  endDate.setDate(startDate.getDate() + 6);

  return {
    startDate:currentDate,
    endDate
  };
}
// export const debounce = <T extends (...args: any[]) => any>(
//   callback: T,
//   waitFor: number
// ) => {
//   let timeout: ReturnType<typeof setTimeout>;
//   return (...args: Parameters<T>): Promise<ReturnType<T>> => {
//     return new Promise((resolve) => {
//       timeout && clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         const result = callback(...args);
//         resolve(result);
//       }, waitFor);
//     });
//   };
// };
// const debounce = (fn: Function, ms = 300) => {
//   let timeoutId: ReturnType<typeof setTimeout>;
//   return function (this: any, ...args: any[]) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => fn.apply(this, args), ms);
//   };
// };
// export function parseJSON<T>(value: string | null): T | undefined {
//   try {
//     return value === "undefined" ? undefined : JSON.parse(value ?? "");
//   } catch {
//     console.log("parsing error on", { value });
//     return undefined;
//   }
// }

export const NO_SP_CHAR_NUM_EMOJI_2SPACE  = /([^\w\s0-9]|_|\s{2,}|\d|\p{Emoji})/;
export  const NO_SP_CHAR_EMOJI_2SPACE  = /([^\w\s]|_|\s{2,}|\p{Emoji})/;

export function parseJSON<T>(value: string | null): T | undefined {
  if (!value) {
    return;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    console.log("parsing error:", error);
    return undefined;
  }
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const consecutiveSpaces=(str:string):boolean =>{
  const consecutiveSpace = / {2,}/;
  return consecutiveSpace.test(str)
}