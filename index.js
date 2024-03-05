require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const createError = require("http-errors");
const routes = require("./src/routes");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const corsOrigin = ["http://localhost:3000", "https://fe-blanja-team.vercel.app", "https://peworld-putrapr.vercel.app", "https://peworld-zeta.vercel.app", "https://fwm17-sample-next.vercel.app/"]

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: corsOrigin,
  })
);
app.use(morgan("dev"));

app.use("/v1", routes);

app.all("*", (req, res, next) => {
  next(new createError.NotFound());
});

app.use((err, req, res, next) => {
  const messError = err.message || "Internal Server Error";
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: messError,
  });
});

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});
