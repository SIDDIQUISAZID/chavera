/* istanbul ignore file */

import {
  ApiStandardResponse,
  dishNetworkApi,
  endpoints,
} from "../../app/services";

export interface DashboardDataI {
  data: {
    userDetails: UserData;
    rolePermissions: Roles;
    totalCounts: number;
    BucketDetails: UserBucketList;
    roleFeatures: RolesList;
    Features: PermissionList;
    devices: DeviceList;
    callPerformance: DashboardDataPerformance;
    dataPerformance: DashboardDataPerformance;
    protocolPerformance: DashboardDataPerformance;
    roamingPerformance: DashboardDataPerformance;
    testCases: TestCaseListResponse;
    deviceRequests: DeviceStatusData;
    DeviceDetails: DeviceDetails;
    testPlanDetails: TestPlanItem;
    dateFilter: string;
    kpiData: KpiItem;
    TestPlans: ScheduleItem;
    totalCompleted: number;
    totalInProgress: number;
    totalYetToStart: number;
    commands: Commands;
    TestCaseIteration: TestCaseIteration;
    userInfo: UserInfo;
    deviceAvailability: DeviceAvailability;
  };
}

export type DeviceAvailability = {
  timeFrom: string;
  timeTo: string;
  scheduledCount: number;
  availableCount: number;
}[];

export type TestPlanDetails = {
  id: number;
  requestedBy: number;
  timeStamp: string;
  deviceId: number;
  status: string;
  userName: string;
  email: string;
  roleName: string;
  imei1: string;
  imei2: string;
  make: string;
  model: string;

  tpScheduleId: number;
  tpId: number;
  tpTestplanId: string;
  tpName: string;
  tpDuration: number;
  tpDevicesRequired: number;
  tpStartDateTime: string;

  testCases: TestCaseListResponse;
};

export type UserInfo = {
  // userName: string;
  // email: string;
  // roleName: string;
  // profileImgData: string;
  // features: Features;

  token: string;
  user_id: number;
  roleId: number;
  userType: string;
  // Include properties that you actually use or expect to use
  userName?: string; // Optional
  email?: string; // Optional
  roleName?: string; // Optional
  //nextPage?: string;  // Optional, as it's part of the response

  userId: number;

  status: string | null;
  lastLogin: string | null;
  features: any[];
}[];

export type Features = {
  featureName: string;
  featureId: number;
}[];

export type ScheduleItem = {
  tpId: number;
  tpTestplanId: string;
  tpName: string;
  tpScheduleId: number;
  userId: number;
  userName: string;
  noTestCases: number;
  tpStartDate: string;
}[];

export type TestCaseIteration = {
  tcIterationScheduleId: number;
  tcIterationOrderNo: number;
  tcIterationStartDate: string;
  tcIterationResultStatus: boolean;
  commands: Commands;
}[];

export type TestPlanItem = {
  tpId: number;
  tpTestPlanId: string;
  tpName: string;
  tpDescription: string;
  noOfTestcases: number;
}[];

export type KpiItem = {
  total: number;
  success: number;
  failure: number;
  dateFilter: number;
}[];

export type TestPlanDetailsItem = {
  tpTcMapId: number;
  tpId: number;
  tpTestPlanId: string;
  tcName: string;
  tcCategoryName: string;
  tcDutRequired: number;
  iteration: number;
  iterationDelay: number;
}[];

export type DeviceDetails = {
  deviceId: number;
  imei1: string;
  imei2: string;
  userId: string;
  deviceType: string;
  make: string;
  model: string;
  phoneNo: string;
  deviceNetwork: string;
  lastSynced: string;
  otp: string;
  authToken: string;
  createdAt: string;
  serialNo: string;
  modifiedAt: string;
  createdBy: string;
  osVersion: string;
  fcmToken: string;
  carrierName: string;
  batteryPercentage: number;
  networkState: string;
  operatorName: string;
  operatorCode: string;
  country: string;
  simTechnology: string;
  roaming: false;
  apnName: string;
  apnUrl: string;
  apnProxy: string;
  apnPort: string;
  apnServer: string;
  apnMmsc: string;
  apnMms: string;
  apnMcc: string;
  apnMnc: string;
  apnAuthenticationType: string;
  apnType: string;
  wifiStrength: number;
  cellStrength: number;
  esim: number;
};

export type DeviceStatusData = {
  id: number;
  requestedBy: number;
  timeStamp: string;
  deviceId: number;
  status: string;
  userName: string;
  email: string;
  roleName: string;
  imei1: string;
  imei2: string;
  make: string;
  model: string;
};

export type DashboardDataPerformance = {
  moSMS: PerformanceTime;
  moVoiceCall: PerformanceTime;
  mtSMS: PerformanceTime;
  mtVoiceCall: PerformanceTime;
};
export type PerformanceTime = {
  total: number;
  success: number;
  failure: number;
  dateFilter: number;
}[];
export type WeekData = {
  value: number;
  day: string;
}[];
export type MonthData = {
  value: number;
  week: string;
}[];
export type yearData = {
  value: number;
  month: string;
}[];

export type DeviceList = {
  id: number;
  deviceId: string;
  imei: string;
  imei2: string;
  phoneNum: string;
  phoneNum2: string;
  commandDeviceExecutionResultId: number;
  deviceScheduleId: number;
  deviceName: string;
  imei1: string;
  phoneNo: string;
  primary: boolean;
}[];

export type PermissionList = {
  featureId: number;
  featureName: string;
}[];

export type RolesList = {
  roleId: number;
  roleName: string;
  roleDescription: string;
}[];

export type UserBucketList = {
  bucketName: string;
  bucketId: number;
  bucketDescription: string;
  createdBy: number;
}[];

export type Roles = {
  roleName: string;
  roleId: number;
  roleDescription: boolean;
  features: Permissions;
}[];

export type Permissions = {
  roleName: string;
  roleId: number;
}[];

export type UserData = {
  userName: string;
  email: string;
  roleId: number;
  status: boolean;
  tfa: boolean;
  userBucketId: number;
}[];

interface GetDashboardDetailsResponse extends ApiStandardResponse {
  data: DashboardDataI;
}

export type CommonReqPut = {};
export type ReqDashboardPerformance = {
  dataType: number;
  from: string;
  to: string;
  filterType: string;
};

export type BucketAddReqPut = {
  bucketName: string;
  bucketDescription: string;
};

export type DeviceAddReqPut = {
  imei: number;
  imei2: number;
  bucketId: number;
};

export interface GetUserBucketReq {
  page: number;
  size: number;
  searchBy?: string;
}
export interface GetTestCaseCategory {
  page: number;
  size: number;
}

export interface GetDashboardOverviewResponse {
  data: {
    deviceTotal: number;
    deviceFree: number;
    deviceInUse: number;
    testPlansCount: number;
    testCasesCount: number;
    // chartData: {
    //   totalTestPlans: number;
    //   deviceTotal: number;

    //   totalTestCases: number;
    //   executedTestResultPass: number;
    //   executedTestResultFail: number;

    //   deviceFree: number;
    //   deviceInUse: string;
    //   executedTestResultTotal: number;
    // };
  };
}

export type TestCaseAddReqPut = {
  tc_testcase_id: string;
  tc_name: string;
  tc_description: string;
  tc_category_id: string;
  tc_duration: string;
  createdAt: number;
  modifiedAt: number;
};

export type TestPlanReqPut = {
  tpName: string;
  tpDescription: string;
  tpDuration: string;
  testCases: TestCaseListReq;
};

export type TestCaseListReq = {
  testCaseId: number;
  orderNo: string;
  iteration: string;
  iterationDelay: string;
}[];

export type TestCaseListResponse = {
  tpTcMapId: number;
  tpId: number;
  tcId: number;
  tpTestPlanId: string;
  tcName: string;
  tcCategoryName: string;
  tcDutRequired: number;
  iteration: number;
  iterationDelay: number;
  tpScheduleId: number;
  tpTestplanId: string;
  tpName: string;
  tpDuration: number;
  tpDevicesRequired: number;
  tpStartDateTime: number;
  commands: Commands;
  devices: DeviceList;
}[];

export type Commands = {
  commandScheduleId: number;
  tcCommandMapId: number;
  commandId: number;
  commandName: string;
  commandDevicesRequired: number;
  commandScheduledParamInfo: string;
  commandDuration: number;
  commandIteration: number;
  commandIterationDelay: number;
  commandOrderNo: number;
  commandStartDate: string;
  commandIsLogCapture: boolean;
  commandIterations: CommandIterations;
}[];

export type CommandIterations = {
  commandExecutionInfoId: number;
  commandExecutionOrderNo: number;
  commandExecutionStartDate: string;
  commandExecutionResultStatus: boolean;
  devices: Devices;
}[];

export type Devices = {
  commandDeviceExecutionResultId: number;
  deviceScheduleId: number;
  deviceId: number;
  deviceName: string;
  imei1: string;
  phoneNo: string;
  isPrimary: boolean;
  fileName: string;
  events: string;
  resultInfo: string;
  commandDeviceExecutionResultStatus: boolean;
}[];

export interface GetCategoryResponse extends ApiStandardResponse {
  data: {
    permissions: {
      tc_category_id: number;
      tc_category_name: string;
      tc_dut_required: number;
    }[];
    totalCounts: number;
  };
}

export interface GetAllTestCaseParams {
  page: string;
  size: string;
  searchText: string;
  query: Array<{ name: string; value: string[] }>;
}

export const dashboardApi = dishNetworkApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserList: builder.query<
      GetDashboardDetailsResponse | undefined,
      { params: GetUserBucketReq }
    >({
      query: ({ params }) => {
        return {
          url: `${endpoints.USER_LIST}`,
          method: "POST",
          body: { ...params },
          providesTags: ["userDelete"],
        };
      },
      providesTags: ["userDelete"],
    }),



    addBucket: builder.mutation<
      ApiStandardResponse | undefined,
      BucketAddReqPut
    >({
      query: (body) => ({
        url: endpoints.ADD_BUCKET,
        method: "POST",
        body,
      }),
    }),
    getRoles: builder.query<
      GetDashboardDetailsResponse | undefined,
      CommonReqPut
    >({
      query: (body) => {
        return {
          url: endpoints.ROLES,
          method: "GET",
        };
      },
    }),

    getUserBucketList: builder.query<
      GetDashboardDetailsResponse | undefined,
      { params: GetUserBucketReq }
    >({
      query: ({ params }) => {
        return {
          url: `${endpoints.USER_BUCKET_LIST}`,
          method: "PUT",
          body: { ...params },
        };
      },
      providesTags: ["deleteUserBucket"],
    }),

    addUser: builder.mutation<ApiStandardResponse | undefined, DeviceAddReqPut>(
      {
        query: (body) => ({
          url: endpoints.ADD_USER,
          method: "POST",
          body,
        }),
      }
    ),

    updateUser: builder.mutation<
      ApiStandardResponse | undefined,
      BucketAddReqPut
    >({
      query: (body) => ({
        url: endpoints.UPDATE_USER,
        method: "PUT",
        body,
      }),
    }),

    deleteUser: builder.mutation({
      query: (body) => ({
        url: `${endpoints.DELETE_USER}`,
        method: "DELETE",
        body: body,
        // invalidatesTags: () => ["ClinicProfile"],
      }),
    }),

    deleteBucket: builder.mutation({
      query: (body) => ({
        url: `${endpoints.BUCKET_DELETE}`,
        method: "DELETE",
        body: body,
      }),
    }),

    deleteRole: builder.mutation({
      query: (body) => ({
        url: `${endpoints.DELETE_ROLE}`,
        method: "DELETE",
        body: body,
      }),
    }),

    editBucket: builder.mutation({
      query: (body) => ({
        url: `${endpoints.EDIT_BUCKET}`,
        method: "PUT",
        body: body,
      }),
    }),

    getRolesList: builder.query<
      GetDashboardDetailsResponse | undefined,
      { params: CommonReqPut }
    >({
      query: ({ params }) => {
        return {
          url: `${endpoints.GET_ROLES}`,
          method: "PUT",
          body: { ...params },
        };
      },
      providesTags: ["rolesList"],
    }),

    getAllPermission: builder.query<
      GetDashboardDetailsResponse | undefined,
      { params: CommonReqPut }
    >({
      query: ({ params }) => {
        return {
          url: `${endpoints.GET_ALL_PERMISSION}`,
          method: "PUT",
          body: { ...params },
        };
      },
      providesTags: ["permissionList"],
    }),

    getAllUserRoles: builder.query<
      GetDashboardDetailsResponse | undefined,
      { params: CommonReqPut }
    >({
      query: ({ params }) => {
        return {
          url: `${endpoints.GET_ALL_USER_ROLES}`,
          method: "GET",
        };
      },
      providesTags: ["rolesList"],
    }),

    addRole: builder.mutation<ApiStandardResponse | undefined, BucketAddReqPut>(
      {
        query: (body) => ({
          url: endpoints.ADD_ROLES,
          method: "POST",
          body,
        }),
      }
    ),

    updateRole: builder.mutation<
      ApiStandardResponse | undefined,
      BucketAddReqPut
    >({
      query: (body) => ({
        url: endpoints.EDIT_ROLES,
        method: "PUT",
        body,
      }),
    }),

    getAllDevice: builder.query<
      GetDashboardDetailsResponse | undefined,
      { params: CommonReqPut }
    >({
      query: ({ params }) => {
        return {
          url: `${endpoints.DEVICE_LIST}`,
          method: "POST",
          body: { ...params },
        };
      },
      providesTags: ["deviceList"],
    }),

    deleteDevice: builder.mutation({
      query: (body) => ({
        url: `${endpoints.DELETE_DEVICE}`,
        method: "DELETE",
        body: body,
      }),
    }),

    addDevice: builder.mutation<
      ApiStandardResponse | undefined,
      BucketAddReqPut
    >({
      query: (body) => ({
        url: endpoints.ADD_DEVICE,
        method: "POST",
        body,
      }),
    }),

    updateDevice: builder.mutation<
      ApiStandardResponse | undefined,
      BucketAddReqPut
    >({
      query: (body) => ({
        url: endpoints.UPDATE_DEVICE,
        method: "PUT",
        body,
      }),
    }),

    getDashboardOverview: builder.query<
      GetDashboardOverviewResponse | undefined,
      void
    >({
      query: () => ({
        url: endpoints.OVERVIEW,
        method: "GET",
      }),
    }),

    getDashboardTestPlanOverview: builder.query<
      GetDashboardOverviewResponse | undefined,
      void
    >({
      query: () => ({
        url: endpoints.TEST_PLAN_OVERVIEW,
        method: "GET",
      }),
    }),

    getDashboardTestCaseOverview: builder.query<
      GetDashboardOverviewResponse | undefined,
      void
    >({
      query: () => ({
        url: endpoints.TEST_CASE_OVERVIEW,
        method: "GET",
      }),
    }),

    getDashboardPerformance: builder.query<
      DashboardDataI | undefined,
      { params: ReqDashboardPerformance }
    >({
      query: ({ params }) => ({
        url: endpoints.PERFORMANCE,
        method: "PUT",
        body: { ...params },
      }),
    }),

    addTestCase: builder.mutation<
      ApiStandardResponse | undefined,
      TestCaseAddReqPut
    >({
      query: (body) => ({
        url: endpoints.ADD_TEST_CASE,
        method: "POST",
        body,
      }),
    }),

    getAllTestCase: builder.query<DashboardDataI | undefined, CommonReqPut>({
      query: (params) => ({
        url: endpoints.GET_ALL_TEST_CASE,
        method: "POST",
        body: { ...params },
      }),
      providesTags: ["testCaseList"],
    }),

    cloneTestCase: builder.mutation<DashboardDataI | undefined, CommonReqPut>({
      query: (params) => ({
        url: endpoints.CLONE_TEST_CASE,
        method: "POST",
        body: { ...params },
      }),
    }),

    cloneTestPlan: builder.mutation<DashboardDataI | undefined, CommonReqPut>({
      query: (params) => ({
        url: endpoints.CLONE_TEST_PLAN,
        method: "POST",
        body: { ...params },
      }),
    }),

    getDeviceRequested: builder.query<
      DashboardDataI | undefined,
      { params: CommonReqPut }
    >({
      query: ({ params }) => {
        return {
          url: `${endpoints.DEVICE_REQUESTED_LIST}`,
          method: "POST",
          body: { ...params },
        };
      },
      providesTags: ["requestedDeviceList"],
    }),

    getCategory: builder.query<
      GetCategoryResponse | undefined,
      { page: number; size: number }
    >({
      query: ({ page, size }) => ({
        url: endpoints.GET_CATEGORY,
        method: "PUT",
        body: { page, size },
      }),
    }),

    getDeviceRequestedAccept: builder.mutation({
      query: (body) => ({
        url: `${endpoints.DEVICE_REQUESTED_APPROVED}`,
        method: "PUT",
        body: body,
      }),
    }),

    assignToUser: builder.mutation({
      query: (body) => ({
        url: `${endpoints.ASSIGN_TO_USER}`,
        method: "PUT",
        body: body,
      }),
    }),

    //   getDeviceDetails: builder.query<
    //   DashboardDataI | undefined,
    //   { params: GetUserBucketReq }
    // >({
    //   query: ({ params }) => {
    //     return {
    //       url: `${endpoints.DEVICE_DETAILS}`,
    //       method: "PUT",
    //       body: { ...params },
    //     };
    //   },

    // }),

    getDeviceDetails: builder.query<
      GetDashboardDetailsResponse | undefined,
      CommonReqPut
    >({
      query: (body) => {
        return {
          url: endpoints.DEVICE_DETAILS,
          method: "PUT",
          body: body,
        };
      },
      providesTags: ["syncedDeviceDetails"],
    }),

    sync: builder.mutation<
      GetDashboardDetailsResponse | undefined,
      CommonReqPut
    >({
      query: (body) => {
        return {
          url: endpoints.SYNC,
          method: "PUT",
          body: body,
        };
      },
    }),

    sendRequestToDevice: builder.mutation({
      query: (body) => ({
        url: `${endpoints.SEND_DEVICE_REQUEST}`,
        method: "POST",
        body: body,
      }),
    }),

    addTestPlanHub: builder.mutation<
      ApiStandardResponse | undefined,
      TestPlanReqPut
    >({
      query: (body) => ({
        url: endpoints.ADD_TEST_PLAN,
        method: "POST",
        body,
      }),
    }),

    getTestPlanList: builder.query<
      DashboardDataI | undefined,
      { params: CommonReqPut }
    >({
      query: ({ params }) => {
        return {
          url: `${endpoints.TEST_PLAN_LIST}`,
          method: "POST",
          body: { ...params },
        };
      },
      providesTags: ["testPlanList"],
    }),

    getTestPlanDetailsList: builder.query<
      DashboardDataI | undefined,
      { params: CommonReqPut }
    >({
      query: ({ params }) => {
        return {
          url: `${endpoints.TEST_PLAN_DETAILS}`,
          method: "PUT",
          body: { ...params },
        };
      },
      providesTags: ["testPlanDetails"],
    }),

    getResultDetails: builder.query<
      DashboardDataI | undefined,
      { params: CommonReqPut }
    >({
      query: ({ params }) => {
        return {
          url: `${endpoints.RESULT_DETAILS}`,
          method: "POST",
          body: { ...params },
        };
      },
      providesTags: ["testPlanDetails"],
    }),

    getSchuledTestPlanList: builder.query<
      DashboardDataI | undefined,
      { page: number; size: number; searchText: string }
    >({
      query: (params) => ({
        url: endpoints.GET_SCHULEDTEST_TEST_PLAN_LIST,
        method: "PUT",
        body: params,
      }),
      providesTags: ["scheduledTestPlanList"],
    }),

    getSchuledTestCase: builder.query<
      DashboardDataI | undefined,
      { tpId: number }
    >({
      query: (params) => ({
        url: endpoints.SCHEDULED_TEST_CASE,
        method: "PUT",
        body: params,
      }),
      providesTags: ["scheduledTestCaseList"],
    }),

    getIterationList: builder.query<
      DashboardDataI | undefined,
      { tp_tc_map_id: number; scheduled_tp_id: number }
    >({
      query: (params) => ({
        url: endpoints.ITRATION_LIST,
        method: "PUT",
        body: params,
      }),
      providesTags: ["iterationList"],
    }),

    updateTestPlanHub: builder.mutation<
      ApiStandardResponse | undefined,
      TestPlanReqPut
    >({
      query: (body) => ({
        url: endpoints.UPDATE_TEST_PLAN,
        method: "PUT",
        body,
      }),
    }),

    deleteTestPlan: builder.mutation({
      query: (body) => ({
        url: `${endpoints.DELETE_TEST_PLAN}`,
        method: "DELETE",
        body: body,
      }),
    }),

    deleteTestCase: builder.mutation({
      query: (body) => ({
        url: `${endpoints.DELETE_TEST_CASE}`,
        method: "DELETE",
        body: body,
      }),
    }),

    updateTestCase: builder.mutation<
      ApiStandardResponse | undefined,
      TestPlanReqPut
    >({
      query: (body) => ({
        url: endpoints.UPDATE_TEST_CASE,
        method: "PUT",
        body,
      }),
    }),

    addTestCaseSchedule: builder.mutation<
      ApiStandardResponse | undefined,
      TestPlanReqPut
    >({
      query: (body) => ({
        url: endpoints.ADD_TEST_SCHEDULE,
        method: "POST",
        body,
      }),
    }),

    updateUserStatus: builder.mutation<
      ApiStandardResponse | undefined,
      TestPlanReqPut
    >({
      query: (body) => ({
        url: endpoints.UPDATE_USER_STATUS,
        method: "PUT",
        body,
      }),
    }),

    onImportDeviceData: builder.mutation<
      ApiStandardResponse | undefined,
      TestPlanReqPut
    >({
      query: (body) => ({
        url: endpoints.IMPORT_DEVICE_DATA,
        method: "POST",
        body,
      }),
    }),

    addServer: builder.mutation<
      ApiStandardResponse | undefined,
      DeviceAddReqPut
    >({
      query: (body) => ({
        url: endpoints.ADD_SERVER,
        method: "POST",
        body,
      }),
    }),

    updateServer: builder.mutation<
      ApiStandardResponse | undefined,
      BucketAddReqPut
    >({
      query: (body) => ({
        url: endpoints.UPDATE_SERVER,
        method: "PUT",
        body,
      }),
    }),

    deleteServer: builder.mutation({
      query: (body) => ({
        url: `${endpoints.DELETE_SERVER}`,
        method: "DELETE",
        body: body,
        // invalidatesTags: () => ["ClinicProfile"],
      }),
      invalidatesTags: ["serverDelete"],
    }),

    deleteScheduled: builder.mutation({
      query: (body) => ({
        url: `${endpoints.DELETE_SCHEDULED}`,
        method: "DELETE",
        body: body,
      }),
    }),

    getServerList: builder.query<GetDashboardDetailsResponse | undefined, void>(
      {
        query: (body) => {
          return {
            url: endpoints.GET_SERVER_LIST,
            method: "GET",
            body: body,
          };
        },
        providesTags: ["serverList"],
      }
    ),

    getScheduleList: builder.query<
      GetDashboardDetailsResponse | undefined,
      void
    >({
      query: (body) => {
        return {
          url: endpoints.SCHEDULE_LIST,
          method: "POST",
          body: body,
        };
      },
      providesTags: ["scheduleList"],
    }),

    getScheduleDetails: builder.query<
      GetDashboardDetailsResponse | undefined,
      void
    >({
      query: (body) => {
        return {
          url: endpoints.SCHEDULE_DETAILS,
          method: "POST",
          body: body,
        };
      },
    }),

    getScheduleCommand: builder.query<
      GetDashboardDetailsResponse | undefined,
      void
    >({
      query: (body) => {
        return {
          url: endpoints.CommandList,
          method: "POST",
          body: body,
        };
      },
    }),

    getCasesIteration: builder.query<
      GetDashboardDetailsResponse | undefined,
      void
    >({
      query: (body) => {
        return {
          url: endpoints.TestCasesIteration,
          method: "POST",
          body: body,
        };
      },
    }),

    getMyProfile: builder.query<DashboardDataI | undefined, void>({
      query: () => {
        return {
          url: endpoints.GET_PROFILE,
          method: "GET",
          // body: body,
        };
      },
    }),


    getDeviceAvailability: builder.query<
    DashboardDataI | undefined,
    { params: GetUserBucketReq }
  >({
    query: ({ params }) => {
      return {
        url: `${endpoints.DEVICE_AVAILABILITY}`,
        method: "POST",
        body: { ...params },
       
      };
    }
  }),
  }),
});

export const {
  useGetUserListQuery,
  useAddBucketMutation,
  useGetRolesQuery,
  useGetUserBucketListQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useDeleteBucketMutation,
  useEditBucketMutation,
  useUpdateUserMutation,
  useGetRolesListQuery,
  useGetAllPermissionQuery,
  useGetAllUserRolesQuery,
  useAddRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetAllDeviceQuery,
  useDeleteDeviceMutation,
  useAddDeviceMutation,
  useUpdateDeviceMutation,
  useGetDashboardOverviewQuery,
  useGetDashboardPerformanceQuery,
  useAddTestCaseMutation,
  useGetAllTestCaseQuery,
  useGetCategoryQuery,
  useGetDeviceRequestedQuery,
  useGetDeviceRequestedAcceptMutation,
  useAssignToUserMutation,
  useGetDeviceDetailsQuery,
  useSendRequestToDeviceMutation,
  useAddTestPlanHubMutation,
  useGetTestPlanListQuery,
  useGetTestPlanDetailsListQuery,
  useUpdateTestPlanHubMutation,
  useDeleteTestPlanMutation,
  useDeleteTestCaseMutation,
  useUpdateTestCaseMutation,
  useAddTestCaseScheduleMutation,
  useUpdateUserStatusMutation,
  useGetSchuledTestPlanListQuery,
  useSyncMutation,
  useGetSchuledTestCaseQuery,
  useOnImportDeviceDataMutation,
  useGetIterationListQuery,

  useAddServerMutation,
  useUpdateServerMutation,
  useDeleteServerMutation,
  useGetServerListQuery,
  useCloneTestCaseMutation,
  useCloneTestPlanMutation,
  useGetDashboardTestPlanOverviewQuery,
  useGetDashboardTestCaseOverviewQuery,
  useGetScheduleListQuery,
  useGetScheduleDetailsQuery,
  useGetResultDetailsQuery,
  useGetScheduleCommandQuery,
  useGetCasesIterationQuery,
  useGetMyProfileQuery,
  useDeleteScheduledMutation,
  useGetDeviceAvailabilityQuery
} = dashboardApi;
