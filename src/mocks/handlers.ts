import authHandler from "./endpoints/auth";

import trainingHandlers from "./endpoints/trainingVideos";
// import dashboardHandlers from "./endpoints/d";

// import proceduresHandlers from "./endpoints/procedures";
import feedbackHandlers from "./endpoints/feedback";

export const handlers = [
  ...authHandler,
  ...trainingHandlers,
  // ...dashboardHandlers,
  ...feedbackHandlers,
];
