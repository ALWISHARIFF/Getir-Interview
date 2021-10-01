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
//configure Cors
app.options("*", cors());
//express parser
app.use(express.json());


//case study route
app.use("/api/casestudy", caseStudyRoutes);
app.use("/", swaggerUi.serve, swaggerUi.setup(specs));
//404 Route
app.use(notFound);
// Error Handler
app.use(errorHandler);

export default app;
