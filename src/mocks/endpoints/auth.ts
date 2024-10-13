import { nanoid } from "@reduxjs/toolkit";
import { rest } from "msw";
import { z } from "zod";
import { ApiStandardResponse, endpoints } from "../../app/services";
import { TokenStatusRequest, User } from "../../features/auth/authAPI";
import { ToJson } from "../utils";

import { UpdateProfileResponse } from "../../features/profile/profileAPI";
import { userRoleId } from "../../features/auth/authSlice";

const updateProfileSchema = z.object({
  address: z.string().max(253),
  zipcode: z.string().max(6),
  physicianname: z.string().max(52).min(2),
});
export const authHandler = [
  // rest.post("/login", (req, res, ctx) => {
  //   // Persist user's authentication in the session
  //   sessionStorage.setItem("is-authenticated", "true");
  //   return res(
  //     // Respond with a 200 status code
  //     ctx.status(200)
  //   );
  // }),

  rest.post<TokenStatusRequest, ToJson<ApiStandardResponse>>(
    endpoints.TOKEN_STATUS,
    async (req, res, ctx) => {
      const payload = await req.json();
      if (
        payload.email === "anurag.chindaliya@amantyatech.com" &&
        payload.roleid === userRoleId
      ) {
        const response = {
          message: "Token valid",
          statusCode: 200,
        };
        return res(
          // ctx.delay(2000),
          ctx.status(200),
          ctx.json(response)
        );
      }
      const errRes = {
        statusCode: 500,
        message: "Signature failed",
      };
      return res(
        // ctx.delay(2000),
        ctx.status(200),
        ctx.json(errRes)
      );
    }
  ),
  rest.get<User, ToJson<UpdateProfileResponse & { [key: string]: any }>>(
    `${endpoints.PHYSICIAN}/:email`,
    async (req, res, ctx) => {
      if (!req?.params?.email) {
        return res(
          // ctx.delay(2000),
          ctx.status(401),
          ctx.json({
            statusCode: 400,
            message: "Please check email msw",
            user: false,
          })
        );
      }
      const response = {};
      return res(
        // ctx.delay(2000),
        ctx.status(200),
        ctx.json(response)
      );
    }
  ),
  rest.put<User, ToJson<UpdateProfileResponse>>(
    `${endpoints.PHYSICIAN}/:email`,
    async (req, res, ctx) => {
      // @ts-ignore
      if (!req?.params?.email) {
        return res(
          // ctx.delay(2000),
          ctx.status(401),
          ctx.json({
            statusCode: 400,
            message: "Please check email msw",
            user: false,
          })
        );
      }
      const payload = (await req.json()) as User;
      console.log({ req }, "msw");
      const result = updateProfileSchema.safeParse(payload);
      if (!result.success) {
        console.log(result.error.format(), "format msw zod");
        return res(
          // ctx.delay(2000),
          ctx.status(401),
          ctx.json({
            statusCode: 400,
            message: "Please check email msw",
            user: false,
          })
        );
      }
      // if (
      //   payload.email.length > 4 &&
      //   payload.Address &&
      //   payload.username.length > 2 &&
      //   payload.phone.length === 10
      // ) {

      // }
      // const errRes: UpdateProfileResponse = {
      //   statusCode: 400,
      //   message: "Please check details msw",
      //   user: false,
      // };
      // return res(ctx.delay(2000), ctx.status(401), ctx.json(errRes));
    }
  ),
  rest.post<User, ToJson<UpdateProfileResponse>>(
    endpoints.LOGOUT,
    async (req, res, ctx) => {
      const payload = await req.json();
      if (payload?.email && payload?.token) {
        const response = {
          statusCode: 200,
          message: "Logout successful msw",
          user: true,
        };
        return res(
          // ctx.delay(2000),
          ctx.status(200),
          ctx.json(response)
        );
      }

      const errRes = {
        statusCode: 400,
        message: "Logout failure msw",
        user: false,
      };
      return res(
        // ctx.delay(2000),
        ctx.status(401),
        ctx.json(errRes)
      );
    }
  ),
  // rest.get(endpoints.PHYSICIAN, (req, res, ctx) => {
  //   // Check if the user is authenticated in this session
  //   const isAuthenticated = sessionStorage.getItem("is-authenticated");

  //   if (!isAuthenticated) {
  //     // If not authenticated, respond with a 403 error
  //     return res(
  //       ctx.status(403),
  //       ctx.json({
  //         errorMessage: "Not authorized msw",
  //       })
  //     );
  //   }

  //   // If authenticated, return a mocked user details
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       username: "admin",
  //     })
  //   );
  // }),
];
export default authHandler;
