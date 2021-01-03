import * as yup from "yup";

let userSchemaValidator = yup.object().shape({
  email: yup
    .string()
    .email("Debes introducir un email valido")
    .required("El email es requerido"),
  password: yup
    .string()
    .min(6, "El password debe ser minimo 6 caracteres")
    .required("El password es requerido"),
});

export default userSchemaValidator;
