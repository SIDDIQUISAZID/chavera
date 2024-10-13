import React from "react";
import Card from "@mui/material/Card";
import { IC_ARROW_RIGHT, IV_TEST_HUB, IV_TEST_CASE } from "../../assets/icons";
import { useNavigate, useLocation } from "react-router-dom";

const InfoCard = ({ title, dashboardData,dashboardTestCaseData }) => {


  const navigate = useNavigate();

  const gotoTestPlan=(url)=>{

    navigate(url)
  }
  return (
    <Card
      variant="outlined"
      className=" flex w-full flex-col justify-between p-4 shadow-lg"
    >
      <div className="flex justify-between">
        <div className="font-poppins_w text-base text-theme-black">{title}</div>
      </div>
      {dashboardData && (
        <div className="mt-6 flex items-center justify-between gap-4 ">
          <div className="flex  w-full h-[100px]  gap-4 rounded-md border-gray-300 bg-theme-darkLight p-2 py-4">
          <IV_TEST_HUB />

            <div>
              <div className="font-poppins_cf text-2xl  text-theme-black font-bold">
              {dashboardData?.testPlansCount}
              </div>

              <div className="mb-2 font-poppins_cf text-xs font-normal text-theme-grey">
                Testplan
              </div>
              <IC_ARROW_RIGHT className="cursor-pointer" onClick={()=>gotoTestPlan("/testPlanHub/testPlanList")} />
            </div>
          </div>

          <div className="flex  w-full h-[100px]   gap-4 rounded-md border-gray-300 bg-theme-darkLight p-2 py-4">
            
            <IV_TEST_CASE />
            <div className="flex flex-col gap-1">
              <div className="font-poppins_cf text-2xl  text-theme-black font-bold">
                {dashboardTestCaseData?.testCasesCount}
              </div>

              <div className="font-poppins_cf text-xs font-normal text-theme-grey">
                Testcase
              </div>
              <IC_ARROW_RIGHT className="cursor-pointer"  onClick={()=>gotoTestPlan("/testCaseHub/testCaseList")} />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default InfoCard;
