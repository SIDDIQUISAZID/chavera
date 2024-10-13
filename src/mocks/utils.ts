export type ToJson<T> = {
  [k in keyof T]: string;
};
export type RequestParams<T> = {
  [paramName: string]: T | any;
};

// Utility function to generate a random integer between min and max (inclusive)
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
