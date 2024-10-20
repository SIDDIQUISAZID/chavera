import React, { lazy } from 'react';
import { Routes, Route } from "react-router-dom"
import DashboardLayout from './components/Layout/DashboardLayout/index';

import AuthLayout from './features/auth/AuthLayout';
import UserList from './pages/userdetails/UserList'
import AddNewUser from './pages/AddNewUser'
import AccessManagement from './pages/AccessManagement';
import BucketManagement from './pages/BucketManagement';
import BucketManagementDetails from './pages/BucketManagement/BucketManagementDetails';
import DeviceBucket from './pages/BucketManagement/DeviceBucket';
import UserAccessManagement from './pages/UserAccessManagement'
import TestCaseHub from './pages/TestCaseHub'
import ExecutedTestCase from './pages/TestCaseHub/ExecutedTestCase'
import IterationListTestResultHub from './components/TestCaseDetails/IterationListTestResultHub';
import TestingDetails from './components/TestCaseDetails/TestingDetails';
import CommandTestCase from './components/TestCaseDetails/CommandTestCase';
import TestCaseIteration from './components/TestCaseDetails/TestCaseIteration';
import AddTestCase from './pages/TestCaseHub/AddTestCase'
import AddPlanCase from './pages/TestPlanHub/AddPlanCase'
import TestCases from './pages/TestPlanHub/TestCases'
import TestPlanHub from './pages/TestPlanHub'
import DeviceList from './pages/devicehub/DeviceList'
import CheckdeviceAvailability from './pages/devicehub/CheckdeviceAvailability';
import TestResult from './components/TestResults/TestPlanResult';
import TestCaseList from './components/TestCaseDetails/TestCaseList';
import ViewDeviceDetails from './pages/devicehub/ViewDeviceDetails';
import NotificationsDetail from './pages/userdetails/NotificationsDetail';
import ServerConfig from './pages/ServerConfig/ServerConfig';
import TestPlanDetails from './pages/TestCaseHub/TestPlanDetails';
import ScheduleCalender from './pages/Schedule&Execute/ScheduleCalender';
import ScheduleTestPlan from './pages/Schedule&Execute/ScheduleTestPlan';
import ConfigFiles from './pages/ServerConfig/ConfigFiles';
import Baxter from './pages/Products/Baxter';
import BaxterViewList from './pages/Products/BaxterViewList';
import ProductDetail from './pages/Products/ProductDetails';
const NotFound = lazy(() => import('./pages/NotFound'));


const LandingPage = lazy(() => import('./pages/LandingPage'));
const LandingDashboard = lazy(() => import('./pages/dashboard/Dashboard'));
export const APP_TITLE = "Dish wireless";

//for all pages route
export const ROUTES = {
    LOGIN: "/login",
    DASHBOARD: "/",
    USER_LIST: '/user/userList',
    BUCKET_USER_LIST: '/user/userBucket',
    ACCESS_MANAGEMENT: '/deviceHub/access-management',
    DEVICE_LIST: '/deviceHub/deviceList',
    ADD_NEW_USER: '/user/userList/:user',
    USER_ACCESS_MANAGEMENT: '/user/roleList',
    TEST_CASE_LIST: '/testCaseHub/testCaseList',
    EXECUTED_TEST_CASE: '/testCaseHub/executedTestCase',
    ADD_TEST_CASE: '/testCaseHub/testCaseList/:addTestCase',
    ADD_TEST_CASE_LIST: '/testCaseHub/addTestCase',
    ITERATION_LIST: '/testCaseHub/iterationList/:iterationList',
    ITERATION_LIST_RESULT_HUB: '/testresultHub/iterationList',
    TEST_DETAILS: '/testresultHub/testDetails/:totalCounts/:totalCompleted/:totalInProgress/:totalYetToStart',
    TEST_Cases_Command: '/testresultHub/commandList/:tpScheduleId/:tpName',
    TEST_CASES_ITERATION: '/testresultHub/casesIteration/:tpScheduleId/:tpName',
    TEST_PLAN_LIST: '/testPlanHub/testPlanList',
    ADD_PLAN_CASE: '/testPlanHub/testPlanList/:addTestPlan/:id',
    ADD_PLAN_CASE_LIST: '/testPlanHub/addTestPlan',
    TEST_CASES: '/testPlanHub/testPlanList/testCases/:id',

    ADD_DEVICE_FROM_LIST: '/deviceHub/addDevice',
   
    VIEW_DEVICE_DETAILS:'/deviceHub/viewDeviceDetails/:deviceId',
    CHECK_DEVICE_AVAILABILITY: 'deviceHub/checkDeviceAvailability',
    TEST_RESULT_HUB: 'testresultHub',
    // TEST_PLAN_RESULT: 'testresultHub',
    BUCKET_MANAGEMENT: '/bucketManagement/userBucket',
    DEVICE_BUCKET: '/bucketManagement/deviceBucket',
    NOTIFICATIONS_DETAILS:'/usermanagment/notifications',
    BUCKET_MANAGEMENT_DETAILS: '/bucketManagement/userBucket/userBucketDetails/:userBucketDetails',
    SERVER_CONFIG:'serverConfig/serverList',
    SERVER_FILES:'serverConfig/configFiles',
    TEST_PLAN_DETAILS: '/testresultHub/testPlanDetails',
    SCHEDULE_EXECUTE: '/scheduleExecute',
    SCHEDULE_EXECUTE_PLAN: '/scheduleExecute/ScheduleTestPlan/:scheduleType/:startDate/:endDate',
    TEST_PLAN_RESULT: 'products/baxter',
    VIEW_BAXTER_DETAILS:'products/baxter/details/:id'

}
// as const


type RouteType = typeof ROUTES;
type RouteKey = keyof RouteType;
export type RouteValue = RouteType[RouteKey]

const Router = () => {
    return (
        <Routes>

            <Route element={<AuthLayout />}>
                <Route path={ROUTES.LOGIN} element={<LandingPage title={`Login | ${APP_TITLE}`} />} />
                <Route element={<DashboardLayout />} >
                    <Route path={ROUTES.DASHBOARD} element={<LandingDashboard />} />
                    <Route path={ROUTES.USER_LIST} element={<UserList />} />
                    <Route path={ROUTES.ACCESS_MANAGEMENT} element={<AccessManagement />} />
                    <Route path={ROUTES.BUCKET_MANAGEMENT} element={<BucketManagement />} />
                    <Route path={ROUTES.DEVICE_BUCKET} element={<DeviceBucket />} />
                    <Route path={ROUTES.USER_ACCESS_MANAGEMENT} element={<UserAccessManagement />} />
                    <Route path={ROUTES.BUCKET_MANAGEMENT_DETAILS} element={<BucketManagementDetails />} />
                    <Route path={ROUTES.DEVICE_LIST} element={<DeviceList />} />
                    <Route path={ROUTES.ADD_NEW_USER} element={<AddNewUser />} />
                    <Route path={ROUTES.TEST_CASE_LIST} element={<TestCaseHub />} />
                    <Route path={ROUTES.EXECUTED_TEST_CASE} element={<ExecutedTestCase />} />
                    <Route path={ROUTES.ADD_TEST_CASE} element={<AddTestCase />} />
                    {/* <Route path={ROUTES.ADD_NEW_TEST_CASE} element={<AddNewTestCase />} /> */}
                    <Route path={ROUTES.ADD_TEST_CASE_LIST} element={<AddTestCase />} />
                    <Route path={ROUTES.ITERATION_LIST_RESULT_HUB} element={<IterationListTestResultHub />} />
                    <Route path={ROUTES.TEST_DETAILS} element={<TestingDetails />} />
                    <Route path={ROUTES.TEST_Cases_Command} element={<CommandTestCase />} />
                    <Route path={ROUTES.TEST_CASES_ITERATION} element={<TestCaseIteration />} />
                    <Route path={ROUTES.TEST_PLAN_LIST} element={<TestPlanHub />} />
                    <Route path={ROUTES.ADD_PLAN_CASE} element={<AddPlanCase />} />
                    <Route path={ROUTES.ADD_PLAN_CASE_LIST} element={<AddPlanCase />} />
                    <Route path={ROUTES.TEST_CASES} element={<TestCases />} />
                    <Route path={ROUTES.SERVER_CONFIG} element={<ServerConfig />} />
                    <Route path={ROUTES.SERVER_FILES} element={<ConfigFiles />} />
                    <Route path={ROUTES.TEST_PLAN_DETAILS} element={<TestPlanDetails />} />
                    <Route path={ROUTES.SCHEDULE_EXECUTE} element={<ScheduleCalender />} />
                    <Route path={ROUTES.SCHEDULE_EXECUTE_PLAN} element={<ScheduleTestPlan />} />

                   
                    <Route path={ROUTES.VIEW_DEVICE_DETAILS} element={<ViewDeviceDetails />} />
                    <Route path={ROUTES.CHECK_DEVICE_AVAILABILITY} element={<CheckdeviceAvailability />} />
                    <Route path={ROUTES.TEST_RESULT_HUB} element={<TestCaseList />} />
                    <Route path={ROUTES.TEST_PLAN_RESULT} element={<Baxter />} />
                    <Route path={ROUTES.NOTIFICATIONS_DETAILS} element={<NotificationsDetail />} />
                    <Route path={ROUTES.VIEW_BAXTER_DETAILS} element={<ProductDetail />} />
                    <Route path={"*"} element={<NotFound title={`Page Not Found | ${APP_TITLE}`} />} />

                </Route>

            </Route>
        </Routes>
    )
}

export default Router