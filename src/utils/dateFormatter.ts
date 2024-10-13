import { format } from "date-fns";
export const isStringValidDate = (dateString: string) => {
  const date = new Date(dateString);
  return !isNaN(date?.getTime());
};
//09/28/2023
export const dateFormat = ({
  dateStr,
  dateObj,
}: {
  dateStr?: unknown;
  dateObj?: Date;
}) => {
  if (dateObj instanceof Date) {
    return format(dateObj, "MM/dd/yyy");
    // return format(dateObj, "dd/MM/yyy");
  }
  if (typeof dateStr !== "string") {
    return;
  }
  return isStringValidDate(dateStr) && format(new Date(dateStr), "MM/dd/yyy");
};

export const dateTimeFormat = (dateStr: string) => {
  if (typeof dateStr !== "string") {
    return;
  }
  return isStringValidDate(dateStr) && format(new Date(dateStr), "LL/dd/yyyy hh:mm a");
};

export const dateAtTimeFormat = (dateStr: string) => {
  if (typeof dateStr !== "string") {
    return;
  }
  return isStringValidDate(dateStr) && format(new Date(dateStr), "LL/dd/yyyy") + " at" + format(new Date(dateStr), " hh:mm a");
};

export const formatLongDate = ({
  dateStr,
  dateObj,
}: {
  dateStr?: unknown;
  dateObj?: Date;
})=>{
  if (dateObj instanceof Date) {
    return format(dateObj, "EEEE, do MMMM, y");
  }
  if (typeof dateStr !== "string") {
    return;
  }
  return isStringValidDate(dateStr) && format(new Date(dateStr), "EEEE, do MMMM, y");
}
