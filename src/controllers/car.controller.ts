import { Request, Response } from "express";
import Car, { ICar } from "../models/car";
import Maintenance from "../models/maintain";
import carSchemaValidator from "../validators/car.validator";
import maintenanceSchemaValidator from "../validators/maintenance.validator";

export const listCars = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let cars = await Car.find();
  const total = cars.length;
  if (total > 0) {
    cars = cars.map((car: ICar) => {
      return { maker: car.maker, model: car.submodel, image: car.image };
    });
  }
  return res
    .status(201)
    .json({ message: "Autos listados correctamente", total, data: cars });
};

export const saveCar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await carSchemaValidator.validate(req.body, { abortEarly: false });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Parametros incorrectos", errors: err.errors });
  }
  const { model, ...rest } = req.body;
  const car = new Car({ submodel: model, ...rest });
  const newCar = await car.save();
  return res
    .status(201)
    .json({ message: "Auto creado correctamente", data: newCar });
};

export const deleteCar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = parseInt(req.params.id);
  await Car.deleteOne({ id });
  return res
    .status(201)
    .json({ message: "Auto borrado correctamente", data: id });
};

export const maintainCar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    await maintenanceSchemaValidator.validate(req.body, { abortEarly: false });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Parametros incorrectos", errors: err.errors });
  }

  const car = parseInt(req.params.id);
  const carInMaintenance = await Maintenance.find({ car });
  if (carInMaintenance.length > 0) {
    return res
      .status(400)
      .json({ message: "El auto ya se encuentra en mantenimiento" });
  }
  const maintenance = new Maintenance({
    car,
    ...req.body,
  });
  const newMaintenance = await maintenance.save();
  return res.status(201).json({
    message: "Auto puesto en mantenimiento correctamente",
    data: newMaintenance,
  });
};

export const releaseCar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const car = parseInt(req.params.id);
  await Maintenance.deleteMany({ car });
  return res.status(201).json({
    message: "El auto se libero correctamente",
  });
};
