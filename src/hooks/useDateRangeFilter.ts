import { useState } from "react";
import { useSearchParams } from "react-router-dom";
export const DATE_RANGE = "date";
const MIN_DATE = "min_date"
const MAX_DATE = "max_date";
export type DateRangeType = {
  min_date: string;
  max_date: string;
}
const useDateRangeFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDateRange, setSelectedDateRange] = useState(() => {
    const min_date = searchParams.get(MIN_DATE);
    const max_date = searchParams.get(MAX_DATE);
    if (min_date && max_date) {
      try {
        return {
          min_date: window.atob(min_date),
          max_date: window.atob(max_date)
        }
      } catch (e) {
        console.log(e)
      }
    }
    // searchParams.delete(MIN_DATE);
    // searchParams.delete(MAX_DATE);
    // setSearchParams(searchParams, { replace: true });

    return {
      max_date: "",
      min_date: ""
    }

  });
  const onDateRangeChange = (o: DateRangeType) => {
    const currentDateRange = o;
    if (currentDateRange?.min_date && currentDateRange?.max_date) {
      // const dateRange = `${currentDateRange.min_date}-${currentDateRange.max_date}`;
      // searchParams.set(DATE_RANGE, dateRange);
      const max_date = window.btoa(currentDateRange.max_date)
      const min_date = window.btoa(currentDateRange.min_date)
      searchParams.set(MIN_DATE, min_date);
      searchParams.set(MAX_DATE, max_date);
    } else {
      searchParams.delete(MIN_DATE);
      searchParams.delete(MAX_DATE);
    }
    // if (typeof currentGender === "string") {
    //   searchParams.set(DATE_RANGE, currentGender);
    // } else {
    //   searchParams.delete(DATE_RANGE);
    // }
    setSearchParams(searchParams, { replace: true });
    setSelectedDateRange(o);
  };
  return { selectedDateRange, onDateRangeChange };
};
export default useDateRangeFilter;
