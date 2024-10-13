import { rest } from "msw";
import { endpoints } from "../../app/services";

const feedbackHandlers = [
    rest.post(endpoints.FEEDBACK, async (req, res, ctx) => {
        const resp = {
            statusCode: 200,
            message: "Thanks for the feedback",
        };
        return res(
            ctx.status(200), ctx.json(resp));
    }),
];
export default feedbackHandlers;
