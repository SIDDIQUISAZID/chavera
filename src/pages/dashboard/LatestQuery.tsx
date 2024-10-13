import React from "react";
import Card from "@mui/material/Card";
import { IC_ARROW_RIGHT } from "../../assets/icons";

interface LatestQueryProps {
  title: string;
}

const LatestQuery: React.FC<LatestQueryProps> = ({ title }) => {
  return (
    <Card
      variant="outlined"
      className="flex w-full flex-col justify-between p-4 shadow-lg "
    >
      <div className="flex justify-between">
        <div className="font-poppins_w text-base text-theme-black">{title}</div>
      </div>

      <div className=" mt-3 items-center justify-between">
        <div>
          <div className="font-poppins_cf text-[12px] font-semibold text-theme-black">
            Query 123
          </div>
          <div className="flex cursor-pointer gap-2">
            <div className="mb-2 font-poppins_cf text-[10px] text-xs font-normal text-theme-grey">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. 
            </div>
          </div>
        </div>

        <div className="border-gray-300  mt-3">
          <div className="font-poppins_cf text-[12px] font-semibold text-theme-black">
            Query 123
          </div>
          <div className="flex cursor-pointer gap-2">
            <div className="mb-2 font-poppins_cf text-[10px] text-xs font-normal text-theme-grey">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. 
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LatestQuery;
