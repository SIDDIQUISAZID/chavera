import { useState } from "react";
import { Select } from "../../components/Select";
import { IV_RIGHT_ARROW_WHITE } from "../../assets/icons";

export default function PreferenceSelector({ onClickTab }) {
  const [selectedTab, setSelectedTab] = useState(0); // State to keep track of the selected tab

 
  const [selected, setSelected] = useState();
  const [selectedOptions, setSelectedOptions] = useState({
    performance: null,
    mark: null,
    mode: null,
    deviceName: null,
  })

  const dropdownData = [
    {
      key: "performance",
      placeholder: "Select Performance",
      data: [
        { label: "Call Performance", value: "Call Performance" },
        { label: "SMS Performance", value: "SMS Performance" },
       
      ],
    },
    {
      key: "mark",
      placeholder: "Select Mark",
      data: [
        { label: "Samsung", value: "Samsung" },
        { label: "Motorola", value: "Motorola" },
        
      ],
    },
    {
      key: "mode",
      placeholder: "Select Mode",
      data: [
        { label: "Galaxy A35 5G", value: "Galaxy A35 5G" },
        { label: "Galaxy A55 5G", value: "Galaxy A55 5G" },
       
      ],
    },
    {
      key: "deviceName",
      placeholder: "Device Name",
      data: [
        { label: "Samsung", value: "Samsung" },
        { label: "Motorola", value: "Motorola" },
        { label: "Galaxy A35 5G", value: "Galaxy A35 5G" },
        { label: "Galaxy A55 5G", value: "Galaxy A55 5G" },
       
      ],
    },
  ];

   // Function to handle the selection change
   const handleSelectChange = (key, selectedOption) => {
    const isAllSelected = selectedOption?.value === "ALL";

    // If "ALL" is selected, update all dropdowns to "ALL"
    if (isAllSelected) {
      const updatedOptions = Object.keys(selectedOptions).reduce(
        (acc, curr) => ({ ...acc, [curr]: "ALL" }),
        {}
      );
      setSelectedOptions(updatedOptions);
    } else {
      // Otherwise, just update the specific dropdown
      setSelectedOptions((prevState) => ({
        ...prevState,
        [key]: selectedOption.value,
      }));
    }
  };


  return (
    <div className=" hidden items-center  lg:block">

    <div className="flex items-center gap-4">
    <div className="flex gap-4 font-poppins_cf text-xs font-normal">
      {dropdownData.map((dropdown, index) => (
        <Select
          key={index}
          options={dropdown.data}
          value={dropdown.data.find(
            (option) => option.value === selectedOptions[dropdown.key]
          )}
          placeholder={dropdown.placeholder}
          onChange={(selectedOption) =>
            handleSelectChange(dropdown.key, selectedOption)
          }
          wrapperAttr={{ className: "h-[20px] w-fit my-1" }}
          required
        />
      ))}
    </div>
     <div className="bg-theme-dark flex gap-8 rounded-sm items-center px-3 py-1.5 cursor-pointer ">
     <div className="text-theme-white font-poppins_cf text-[10px] ">GO</div>
     <IV_RIGHT_ARROW_WHITE/>
     </div>
      </div>
    </div>
  );
}
