import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import userRoute from "./routes/UsersRoute.js";
import productRoute from "./routes/ProductRoute.js";

const app = express();

// (async () => {
//   await db.sync();
// })();

dotenv.config();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(userRoute);
app.use(productRoute);
app.listen(process.env.APP_PORT, () => {
  console.log("server sudah siap");
});
