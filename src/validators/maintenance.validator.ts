import * as yup from "yup";

let maintenanceSchemaValidator = yup.object().shape({
  person: yup.string().required("La persona es requerida"),
  description: yup.string().required("La descripcion es requerida"),
  estimatedDate: yup
    .date()
    .typeError("Fecha invalida")
    .required("La fecha estimada es requerida"),
});

export default maintenanceSchemaValidator;
