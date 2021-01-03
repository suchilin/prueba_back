import * as yup from "yup";

let carSchemaValidator = yup.object().shape({
  maker: yup.string().required("La marca es requerida"),
  model: yup.string().required("El modelo es requerido"),
  image: yup.string().required("La imagen es requerida"),
});

export default carSchemaValidator;
