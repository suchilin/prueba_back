import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import userSchemaValidator from "../validators/user.validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;
  try {
    await userSchemaValidator.validate(
      { email, password },
      { abortEarly: false }
    );
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Parametros incorrectos", errors: err.errors });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "El usuario ya existe", email });
  }
  const newUser = new User({ email, password });
  await newUser.save();
  const data = {
    id: newUser._id,
    email: newUser.email,
  };

  return res
    .status(201)
    .json({ message: "Usuario creado correctamente", data });
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "El usuario no se encuentra" });
  }
  const valid = bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: "Credenciales erroneas" });
  }
  const token = jwt.sign(
    { id: user.id, email: user.email },
    config.APP_SECRET
  );
  res.status(200).json({ message: "Inicio de sesion correctamente", token });
};
