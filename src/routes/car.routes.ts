import passport from "passport";
import { Router } from "express";
import {
  deleteCar,
  listCars,
  maintainCar,
  releaseCar,
  saveCar,
} from "../controllers/car.controller";

const router = Router();

router.get(
  "/cars",
  passport.authenticate("jwt", { session: false }),
  listCars
);

router.post(
  "/cars",
  passport.authenticate("jwt", { session: false }),
  saveCar
);

router.delete(
  "/cars/:id",
  passport.authenticate("jwt", { session: false }),
  deleteCar
);

router.post(
  "/cars/:id/maintenance",
  passport.authenticate("jwt", { session: false }),
  maintainCar
);

router.delete(
  "/cars/:id/maintenance",
  passport.authenticate("jwt", { session: false }),
  releaseCar
);

export default router;
