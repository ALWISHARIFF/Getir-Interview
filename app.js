import express from "express";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import caseStudyRoutes from "./routes/caseStudyRoutes.js";
import { specs } from "./doc/config.js";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.options("*", cors());
//express parser
app.use(express.json());
//case study route
app.use("/api/casestudy", caseStudyRoutes);
app.use("/", swaggerUi.serve, swaggerUi.setup(specs));
app.use(notFound);
app.use(errorHandler);

export default app;
