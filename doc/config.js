import swaggerJsdoc from "swagger-jsdoc";
import dotENV from 'dotenv';
dotENV.config()
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Getir Case Study Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a REST API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "ALWI SHARIFF",
        url: "https://juleybib.com",
        email: "alwishariff00001@gmail.com",
      },
    },
    servers: [
      {
        url: process.env.URL,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

export const specs = swaggerJsdoc(options);

