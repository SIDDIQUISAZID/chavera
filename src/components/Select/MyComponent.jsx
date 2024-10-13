import React, { useState } from "react";
import { Select } from "../../components/Select";
const MyComponent = ({
  numSelects,
  getCommonData,
  getData,
  selectedPosition,
  selectedPrams,
}) => {
  // Initialize state for selected actions
  // const [selectedActions, setSelectedActions] = useState(selectedPrams[selectedPosition]?.devices);

  const [selectedActions, setSelectedActions] = useState(
    Array(numSelects).fill()
  );

  const handleSelectChange = (index, value) => {
    const newSelectedActions = [...selectedActions];
    newSelectedActions[index] = value;
    setSelectedActions(newSelectedActions);
    getData(newSelectedActions, selectedPosition);
  };

  // Filter options to exclude already selected values
  const getFilteredOptions = (index) => {
    const selectedValues = selectedActions.filter((_, i) => i !== index);
    return getCommonData.filter((option) => !selectedValues.includes(option));
  };

  return (
    <div className="mt-2 grid grid-cols-3 justify-between gap-8">
      {Array.from({ length: numSelects }, (_, index) => (
        <Select
          key={index}
          options={getCommonData}
          value={selectedPrams[selectedPosition].devices[index]}
          onChange={(e) => handleSelectChange(index, e)}
          // options={getFilteredOptions(index)}
          placeholder={`Select Device ${index + 1}`}
          clearable
          customLabel={`Device ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default MyComponent;
