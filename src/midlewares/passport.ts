import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import userModel from "../models/user";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.APP_SECRET,
};
export default new Strategy(options, async (payload, done) => {
  try {
    const user = await userModel.findById(payload.id);
    if (!user) {
      done(null, false);
    }
    done(null, user);
  } catch (err) {
    done(null, false);
  }
});
