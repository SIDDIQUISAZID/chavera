import { rest } from "msw";
import { endpoints } from "../../app/services";

const profileHandlers = [
  rest.get(endpoints.TRAINING, async (req, res, ctx) => {
    const resp = {
      statusCode: 200,
      message: "Data found",
      data: {},
    };
    return res(
      // ctx.delay(5000),
      ctx.status(200),
      ctx.json(resp)
    );
  }),
  rest.get(endpoints.CLINIC, async (req, res, ctx) => {
    const resp = {
      data: {},
      message: "Clinic data fetched successfully",
      statusCode: 200,
    };
    // return res(ctx.delay(5000), ctx.status(200), ctx.json(resp));
    return res(ctx.status(200), ctx.json(resp));
  }),
  rest.get(endpoints.PRACTICE_TYPE, async (req, res, ctx) => {
    const resp = {
      data: {},
      message: "data fetched successfully",
      statusCode: 200,
    };
    return res(
      // ctx.delay(5000),
      ctx.status(200),
      ctx.json(resp)
    );
  }),
];
export default profileHandlers;
