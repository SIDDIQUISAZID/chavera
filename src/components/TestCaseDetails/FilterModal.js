import { useState } from "react";
import Input from "../Input/Input";
import moment from "moment";

const FilterModal = ({ onDeleteSuccess, onSubmit}) => {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();

  const handleSubmit = () => {
    onSubmit(selectedDate, selectedTime);
    onDeleteSuccess();
  };
  const isButtonDisabled = !selectedDate || !selectedTime;

  return (
    <div
      data-testid="logoutModal"
      className="flex flex-col justify-center p-1 text-center md:p-2"
    >
      <div className="mt-3 flex justify-between gap-4">
        <div className="mt-3 flex justify-between gap-3 p-3 pb-0 ">
          <Input
            name="patient"
            type="date"
            placeholder="Write something here..."
            max={moment(new Date()).format("YYYY-MM-DD")}
            onChange={(e) => {
              setSelectedDate(e.target.value);
            }}
            wrapperClass="mb-4"
            required
            autoComplete="off"
            wrapperAttr={{ className: "h-[35px] w-full  my-1 " }}
          >
            Start Date
          </Input>

          <Input
            name="patient"
            type="date"
            placeholder="Write something here..."
            wrapperClass="mb-4"
            readOnly={!selectedDate}
            min={moment(selectedDate).format("YYYY-MM-DD")}
            onChange={(e) => {
              setSelectedTime(e.target.value);
            }}
            autoComplete="off"
            required
            wrapperAttr={{ className: "h-[35px] w-full my-1 " }}
          >
            End Date
          </Input>
        </div>
      </div>

      <div className="mt-3 border-t"></div>

      <div className="mt-2 flex flex-col justify-end space-y-3 text-xs xs:flex-row xs:space-x-3 xs:space-y-0 ">
        <button
          title="Close popup"
          onClick={onDeleteSuccess}
          className="w-[90px] cursor-pointer rounded-md border-[1px] bg-white p-1 text-xs font-normal text-theme-black "
        >
          Cancel
        </button>
        <button
          title="Apply"
          onClick={handleSubmit}
          className={`w-[90px] cursor-pointer rounded-md py-2 text-xs font-normal text-white ${
            isButtonDisabled ? "bg-theme-dark opacity-60" : "bg-theme-dark"
          }`}
          disabled={isButtonDisabled}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
