const path = require("path");
const express = require("express");
const morgan = require("morgan");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const ApiError = require("./Utils/apiError");
const globalError = require("./middlewares/errormiddleware");
const dbConnection = require("./Config/database");
const categoryRoute = require("./Routes/categoryRoute");
const subCategoryRoute = require("./Routes/subCategoryRoute");

// express app
const app = express();

// connction with database
dbConnection();

// Midlewares
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'uploads')));


if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(process.env.NODE_ENV);
}

//Mount router

app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/categories", subCategoryRoute);

app.all("*", (req, res, next) => {
  next(
    new ApiError(`can not found page for this url : ${req.originalUrl}`, 400)
  );
});

//err handlaing middleware

app.use(globalError);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`server is reunning ....... ${PORT}`);
});

// handling error outside express

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection error ${err.name} | ${err.message}`);

  server.close(() => {
    console.log("shutting down......");
    process.exit(1);
  });
});
