import {
  ApiStandardResponse,
  dishNetworkApi,
  endpoints,
} from "../../app/services";

interface PracticeTypeI {
  createdby: number;
  createddate: string;
  modfieddate: string;
  modifiedby: number;
  practiceid: number;
  practicetype: string;
}
interface GetPracticeRes extends ApiStandardResponse {
  data: PracticeTypeI[];
}
export interface UserRes {
  address: string;
  biography?: string;
  city: string;
  clinicid: number;
  clinic_name?: string;
  country: string;
  email: string;
  customerid: string;
  // lastname: string;
  modfieddate: string;
  phonenumber: string;
  physicianname: string;
  procedurecost?: number;
  revenue?: number;
  selfie: string;
  specialist: string;
  state: string;
  zipcode: string;
  experience: number;
  estore: {
    cartridgestock: number;
    threshold: number;
  };
  tierStatus: {
    currentTier: string;
    myprofileStr: string;
  };
  isphysician: boolean;
  last_connect: {
    bytes: number;
    console_id: string[];
    customer_id: string;
    imei: string;
    last_connectivity: string;
    number_of_files: number;
    practice_name: string;
    sim: string;
    unique_id: number;
  }[];
}

export interface GetProfileResponse extends ApiStandardResponse {
  user: UserRes;
}

export interface GetTierResponse extends ApiStandardResponse {
  data: {
    currentTier: string;
    levelStr: string;
    memberStr: string;
    myprofileStr: string;
    nextTier: string;
    procedures: number;
    requiredProcedure: number;
    currentTierBackground: string;
    currentTierBadge: string;
  };
}

export interface GetLoyaltyResponse extends ApiStandardResponse {
  data: {
    id: number;
    rewards: {
      "Co-Op Spend": string | string[] | null;
      "EVE Event": string | string[] | null;
      "Locator Placement": string | string[];
      "Product Upgrade Discount": string | string[] | null;
      "Purchase Override": string | string[];
    };
    tier: string;
    tier_range: string;
  }[];
}
export interface UpdateProfileResponse extends ApiStandardResponse {
  user: boolean;
}
export interface PayloadJson {
  // address: string;
  zipcode?: string;
  physicianname?: string;
  // lastname?: string;
  // city?: string;
  country?: string;
  // state?: string;
  // clinicid?: number;
  specialist?: string;
  selfie?: string;
  experience?: number;
  isvideowatched?: boolean;
}
export interface UpdateProfileRequest {
  email: string;
  payload: FormData;
  payloadJson: PayloadJson;
}

export const profileApi = dishNetworkApi.injectEndpoints({
  endpoints: (builder) => ({
    //to get physician profile data
    getProfile: builder.query<
      GetProfileResponse | undefined,
      { email: string }
    >({
      query: (userDetails) => `${endpoints.PHYSICIAN}/${userDetails.email}`,
      providesTags: ["UserProfile"],
      // transformResponse: (response:GetProfileResponse) => {
      //   response.user.selfie = `${response.user.selfie}?${Date.now()}`
      //   return response;
      // },
      // async onQueryStarted(payload, { dispatch, queryFulfilled }) {
      //   // const patchResult = dispatch(
      //   //   profileApi.util.updateQueryData(
      //   //     "getProfile",
      //   //     { email: payload.email },
      //   //     (draft) => {
      //   //       // Object.assign(draft, { user: payload });
      //   //       // Object.assign(draft, { user: {...draft.user,...payload.payloadJson} });
      //   //       // console.log(JSON.stringify(draft), "before draft");
      //   //       // Object.assign(draft.user, payload.payloadJson);
      //   //       // console.log(JSON.stringify(draft), "after draft");
      //   //     }
      //   //   )
      //   // );
      //   try {
      //     const result = await queryFulfilled;
      //     if(!result.data?.user?.email){
      //       dispatch(setCredentials({ user: null, token: null }))
      //       // window.location.href = "./login"
      //     }
      //     // console.log({patchResult,result},"getProfile")
      //   } catch {
      //     // patchResult.undo();
      //   }
      // },
    }),
    //to update physician profile data
    updateProfile: builder.mutation<
      UpdateProfileResponse | undefined,
      UpdateProfileRequest
    >({
      query: (userDetails) => ({
        url: `${endpoints.PHYSICIAN}/${userDetails.email}`,
        method: "PUT",
        body: userDetails.payload,
        invalidatesTags: ["UserProfile"],
      }),
      // async onQueryStarted(payload, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     profileApi.util.updateQueryData(
      //       "getProfile",
      //       { email: payload.email },
      //       (draft) => {
      //         // Object.assign(draft, { user: payload });
      //         // Object.assign(draft, { user: {...draft.user,...payload.payloadJson} });
      //         // console.log(JSON.stringify(draft), "before draft");
      //         // Object.assign(draft.user, payload.payloadJson);
      //         // console.log(JSON.stringify(draft), "after draft");
      //       }
      //     )
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();

      //     /**
      //      * Alternatively, on failure you can invalidate the corresponding cache tags
      //      * to trigger a re-fetch:
      //      * dispatch(api.util.invalidateTags(['Post']))
      //      */
      //   }
      // },
    }),
    //to get all practice type for physician to select
    getPracticeType: builder.query<GetPracticeRes | undefined, void>({
      query: () => endpoints.PRACTICE_TYPE,
    }),
    //to get tier status
    getTierStatus: builder.query<
      GetTierResponse | undefined,
      { email: string }
    >({
      query: (userDetails) => `${endpoints.TIER_STATUS}/${userDetails.email}`,
      // providesTags: ["UserProfile"],
    }),
    //to get all loyalty data
    getLoyaltyData: builder.query<GetLoyaltyResponse | undefined, void>({
      query: () => `${endpoints.LOYALITY_PROGRAMDATA}`,
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetPracticeTypeQuery,
  useGetTierStatusQuery,
  useGetLoyaltyDataQuery,
} = profileApi;
