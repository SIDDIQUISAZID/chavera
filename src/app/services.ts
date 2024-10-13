import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { baseUrl } from "../serverConfig";
import { logoutAction } from "../features/auth/authSlice";
export interface ApiStandardResponse {
  status: number;
  message: string;
  success: boolean;
}

export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    const user = (getState() as RootState).auth.user;

   
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    if (user?.user_id) {
      headers.set("UserId", `${user?.user_id}`);
    }
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Headers", "X-Requested-With");
    return headers;
  },
  // credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // @ts-ignore
  if (result?.error?.status === 401 || result?.data?.statusCode === 401) {
    // removeLocalTime();
    api.dispatch(logoutAction());
  }
  return result;
};

export const dishNetworkApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "UserProfile",
    "Note",
    "ReferralImage",
    "GetReferrals",
    "GetPatientOverview",
    "DashboardDetails",
    "CommentList",
    "NotificationList",
    "NotificationCount",
    "TokenStatus",
    "userDelete",
    "deleteUserBucket",
    "rolesList",
    "permissionList",
    "deviceList",
    "requestedDeviceList",
    "testPlanList",
    "testPlanDetailsList",
    "testCaseList",
    "testPlanDetails",
    "scheduledTestPlanList",
    "syncedDeviceDetails",
    "scheduledTestCaseList",
    "testCaseDelete",
    "iterationList",
    "serverList",
    "serverDelete",
    "scheduleList"

  ],
  endpoints: () => ({}),
  refetchOnMountOrArgChange: 1,
});
const endpointsUrl = {
  EMAIL_VALIDATION: "emailvalidation",
  OTP_GENERATION: "otpgeneration",
  OTP_VALIDATION: "otpvalidation",
  LOGOUT: "v1/auth/logout",
  TOKEN_STATUS: "tokenstatus",
  PATIENTS: "referralpatient",
  PHYSICIAN: "physician",
  TRAINING: "trainingvideo",
  DASHBOARD_DETAILS: "referralsdashboard",
  DOCTORS: "doctors",
  CLINIC: "clinic",
  PRACTICE_TYPE: "practicetype",
  PROCEDURES: "procedures",
  PROCEDURES_TAKEN: "proceduresTaken",
  PROCEDURES_NOT_TAKEN: "proceduresNotTaken",
  // REVIEWS: "reviews",

  // phyisician
  REVIEWS: "reviewandratings",
  REVIEWS_COUNT: "reviewandratingscount",

  //procedure
  PROC_REVIEWS: "procreviewandratings",
  PROC_REVIEWS_COUNT: "procreviewandratingscount",

  REFERRALS: "refferals",
  PATIENT_OVERVIEW: "overview",
  PATIENT_PROCEDURE: "dashboardprocedure",
  PATIENT_REVIEW: "dashboardreviewrating",
  PATIENT_SELFIES: "physcompareselfie",
  SHOPIFY: "shopifygraphql",

  FEEDBACK: "cytrellisreview",

  STATE_CITY: "state-city",
  CONFIRM_REQUEST: "confirmrequest",

  REFERRAL_IMAGE: "physcompareselfie",
  UPLOAD_SELFIE: "physuploadselfie",
  FETCH_PATIENT: "fetchpatient",
  ADD_REFERRAL: "addreferral",
  UPDATE_REFERRAL_STATUS: "updatereferral",
  NOTE: "notes",
  UPDATE_CARTRIDGE: "updatecartridge",

  SIM_DATA: "simconnectivitydata",
  PROCEDURE_LIST: "physicianlistpagedata",

  LOYALITY_PROGRAMDATA: "loyalityprogramdata",
  TIER_STATUS: "tierstatus",
  CUSTOMER_INFO: "customerinfo",
  ADMIN_REVIEWANDRATINGS: "adminreviewandratings",

  PRODUCT_LIST: "productlist",
  ADDRESS_DETAILS: "adressdetails",
  ACCOUNT_DETAILS: "accountdetails",
  PLACE_ORDER: "placeorder",
  ADD_CONTACT: "addcontact",
  ORDER_LIST: "orderlist",
  ORDER_DETAILS: "orderdeatils",
  COMMENT: "comment",
  NOTIFICATION_LIST: "physnotificationlist",
  NOTIFICATION_COUNT: "commentcount",
  NOTIFICATION_STATUS: "physnotificationstatus",

  USER_LIST: "v1/user/get-users",
  ADD_BUCKET: "v1/bucket/add",
  ROLES: "v1/user/get-roles",
  USER_BUCKET_LIST: "v1/bucket/fetch-all",
  ADD_USER: "v1/user/add-user",
  UPDATE_USER: "v1/user/update-user",
  DELETE_USER: "v1/user/delete-user",

  BUCKET_DELETE: "v1/bucket/delete",
  EDIT_BUCKET: "v1/bucket/update",

  /////Auth API///////
  LOGIN: "v1/auth/login",
  FORGET_PASSWORD: "v1/auth/forgotPassword",
  RESET_PASSWORD: "v1/auth/resetPassword",
  // VERIFY_OTP: "v1/auth/verifyOtp",
  GET_ROLES: "v1/roles/getAllRoles",
  GET_ALL_PERMISSION: "v1/user/get-all-features",
  GET_ALL_USER_ROLES: "v1/user/get-roles",
  ADD_ROLES: "v1/user/add-role",
  EDIT_ROLES: "v1/user/update-role",
  DELETE_ROLE: "v1/user/delete-role",
  VERIFY_OTP: "v1/auth/verifyOtpAndResetPassword",
  DEVICE_LIST: "v1/device/get-devices",
  DELETE_DEVICE: "v1/device/delete-device",
  ADD_DEVICE:'v1/device/add-device',
  UPDATE_DEVICE:'v1/device/update-device',
  OVERVIEW:'v1/device/get-device-chart-kpi-data',
  TEST_PLAN_OVERVIEW:'v1/testplan/get-testplans-chart-kpi-data',
  TEST_CASE_OVERVIEW:'v1/testcase/get-testcases-chart-kpi-data',


  PERFORMANCE:"dish/device-service/api/v1/dashboard/performance",
  GET_ALL_TEST_CASE:"v1/testcase/get-testcases",
  ADD_TEST_CASE:'v1/testcase/add-test-case',
  GET_CATEGORY:'v1/testcase/get-commands',
  DEVICE_REQUESTED_LIST:'v1/device/get-device-requests',
  DEVICE_REQUESTED_APPROVED:'v1/device/update-device-request',
  ASSIGN_TO_USER:'v1/device/assign-to-user',
  SEND_DEVICE_REQUEST:'v1/device/send-devices-request',
  DEVICE_DETAILS:'v1/device/get-device-details',
  ADD_TEST_PLAN:'v1/testplan/add-testplan',
  TEST_PLAN_LIST:'v1/testplan/get-testplans',
  TEST_PLAN_DETAILS:'v1/testplan/get-testcases-of-testplan',
  RESULT_DETAILS:'v1/schedule/get-testcase-result',
  UPDATE_TEST_PLAN:'v1/testplan/update-testplan',
  DELETE_TEST_PLAN:'v1/testplan/delete-testplan',
  DELETE_TEST_CASE:'v1/testcase/delete-testcase',
  UPDATE_TEST_CASE:'v1/testcase/update-testcase',
  ADD_TEST_SCHEDULE:'v1/schedule/schedule-testplan',
  UPDATE_USER_STATUS:'v1/user/update-user-status',
  GET_SCHULEDTEST_TEST_PLAN_LIST:'dish/testcase-service/api/v1/testcase-result/getSchuledTestPlanList',
  SYNC:'v1/device/sync-device',
  SCHEDULED_TEST_CASE:'dish/testcase-service/api/v1/testcase-result/getSchuledTestCaseList',
  IMPORT_DEVICE_DATA:'v1/device/import-device-data',
  ITRATION_LIST:'dish/testcase-service/api/v1/testcase-result/getSchuledIterationList',
  UPDATE_FCM:"v1/user/update-fcm",
  UPDATE_PROFILE_IMAGE:"v1/user/update-profile-image",
  GET_PROFILE:"v1/user/get-profile",
  ADD_SERVER:'v1/testcase/add-server',
  UPDATE_SERVER:'v1/testcase/update-server',
  GET_SERVER_LIST:'v1/testcase/get-servers',
  DELETE_SERVER:'v1/testcase/delete-server',
  CLONE_TEST_CASE:'v1/testcase/clone-test-case',
  CLONE_TEST_PLAN:'v1/testplan/clone-testplan',
  SCHEDULE_LIST:'v1/schedule/get-testplan-result',
  SCHEDULE_DETAILS:'v1/schedule/get-scheduled-testplan',
  CommandList:'v1/schedule/get-command-result',
  TestCasesIteration:'v1/schedule/get-testcase-iteration-result',
  DELETE_SCHEDULED:'v1/schedule/delete-scheduled-testplan',
  DEVICE_AVAILABILITY:'v1/device/get-device-availability-data',
} as const;

type EndpointsType = typeof endpointsUrl;
type EndpointsKeys = keyof EndpointsType;
// type EndpointValues = EndpointsType[EndpointsKeys];
export const endpoints = Object.entries(endpointsUrl).reduce(
  (acc, [key, val]) => ({
    ...acc,
    [key]: `${baseUrl}/${val}`,
  }),
  {}
) as { [k in EndpointsKeys]: EndpointsType[k] };
