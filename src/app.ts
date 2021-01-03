import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import carRoutes from "./routes/car.routes";
import passport from "passport";
import passMidleware from "./midlewares/passport";

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passMidleware);

app.get("/ping", (_, res) => {
  res.send({ message: "pong" });
});

app.use(authRoutes);
app.use(carRoutes);

export default app;
