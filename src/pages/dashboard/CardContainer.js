import React, { useEffect, useState } from "react";
import InfoCard from "./InfoCard";
import Device from "./Device";
import ExecutedTest from "./ExecutedTest";
import {
  useGetDashboardOverviewQuery,
  useGetDashboardTestPlanOverviewQuery,
  useGetDashboardTestCaseOverviewQuery,
} from "../../features/dashboard/dashboardAPI";
import PageLoader from "../../components/Loader/PageLoader";

import LatestQuery from "./LatestQuery";
import DeviceCXO from "./DeviceCXO";

import TotalQueryCXO from "./TotalQueryCXO";

import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser } from "../../features/auth/authSlice";

export default function CardContainer() {
  const { data, isLoading, isFetching } = useGetDashboardOverviewQuery();
  const { data: dataOverviewTestPlan, isLoading: isLoadingTestPlan } =
    useGetDashboardTestPlanOverviewQuery();
  const { data: dataOverviewTestCase, isLoading: isLoadingTestCase } =
    useGetDashboardTestCaseOverviewQuery();
  const [dashboardData, setDashboardData] = useState(null);

  const userData = useAppSelector(selectCurrentUser);
  const userType = userData?.userType;

  useEffect(() => {
    if (data) {
      setDashboardData(data);
    }
  }, [data]);

  // if (isLoading || isFetching || isLoadingTestCase) {
  //   return (
  //     <div className="mt-6 flex items-center justify-center">
  //       <PageLoader />
  //     </div>
  //   );
  // }

  return (
    <div className="mb-3 flex flex-col justify-between gap-6 lg:flex-row">
      {dashboardData &&
        (userType === "CXO Engineer" ? (
          <>
            <DeviceCXO title="Devices" dashboardData={dashboardData} />
            <TotalQueryCXO title="Queries" dashboardData={dashboardData} />
            <LatestQuery title="Latest Queries" />
          </>
        ) : (
          <>
            <InfoCard
              title="Test Hub"
              dashboardData={dataOverviewTestPlan?.data}
              dashboardTestCaseData={dataOverviewTestCase?.data}
            />
            <ExecutedTest title="Test Results" dashboardData={dashboardData} />
            <Device title="Devices" dashboardData={dashboardData} />
          </>
        ))}
    </div>
  );
}
