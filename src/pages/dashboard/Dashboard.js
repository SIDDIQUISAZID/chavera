import CardContainer from "./CardContainer";

import BarChartContainer from "./BarChartContainer";
import CXOContainer from "./CXOContainer";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/auth/authSlice";

import BarChartContainerCXO from "./BarChartContainerCXO";
export default function Dashboard() {
  const userData = useAppSelector(selectCurrentUser);
  

   const {userType} = userData?userData:"Admin"
 
  return (
    <>
      <div className="h-fit w-full items-center justify-between">
        <CardContainer />
        {userType === "Admin" ? (
          <BarChartContainer />
        ) : userType === "CXO Engineer" ? (
          <BarChartContainerCXO userType={userType} />
        ) : (
          <div>
            <CXOContainer />
          </div>
        )}
      </div>
    </>
  );
}
