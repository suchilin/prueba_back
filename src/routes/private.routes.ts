import passport from "passport";
import { Router } from "express";

const router = Router();

router.get(
  "/private",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ message: "Welcome" });
  }
);

export default router;
