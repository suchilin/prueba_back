import User, { IUser } from "../models/user";
import userSchemaValidator from "../validators/user.validator";

export const save = async (
  email: string,
  password: string,
  cb: Function
): Promise<void> => {
};
