import { rest } from "msw";
import { endpoints } from "../../app/services";
// import trainingVideos from "../fixtures/training.json";

const trainingHandlers = [
  rest.get(endpoints.TRAINING, async (req, res, ctx) => {
    const resp = {
      statusCode: 200,
      message: "Data found",
      // data: trainingVideos.data,
      data: [],
    };
    return res(
      // ctx.delay(5000),
       ctx.status(200), ctx.json(resp));
  }),
];
export default trainingHandlers;
