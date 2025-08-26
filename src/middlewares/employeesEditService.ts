import { RequestHandler } from "express";
import Employee from "../models/Employees";
import { throwNewError } from "../utils";

export const employeesEditService: RequestHandler = async (req, res, next) => {
  //Obtener empleados entrantes y servicio actual
  const employees = req.employees!
  const service = req.service!

  //Si falla la cadena de middleware devolver error
  if (!employees || !service) {
    return throwNewError(next, 'Hubo un error interno, la acción no se pudo completar. Inténtalo de nuevo más tarde', 500)
  }

  //Extraer IDS empleados entrantes y actuales asignados al servicio
  const incomingEmployeesIds = employees.map((e) => e.id);
  const currentEmployeesIds = service.employees.map((e) => e?.id);

  //Si hay empleados entrantes ejecutar la lógica
  if (incomingEmployeesIds.length) {

    // Empleados que ya estaban pero han sido quitados
    const removeEmployees = currentEmployeesIds.filter(
      (e) => !incomingEmployeesIds.includes(e?.toString())
    )

    // Empleados nuevos
    const addEmployees = incomingEmployeesIds.filter(
      (id) => !currentEmployeesIds.includes(id)
    )

    //Hay algun cambio
    const hasChanges = removeEmployees.length || addEmployees.length;
    
    //Actualizar nuevos empleados y remover los antiguos
    if (hasChanges) {
      const removeEmployee = Employee.updateMany(
        {
          manager: req.user?.id,
          _id: { $in: removeEmployees },
        },
        { $pull: { services: service.id }, $set: { available: true } }
      );

      const addEmployee = Employee.updateMany(
        {
          manager: req.user?.id,
          _id: { $in: addEmployees },
        },
        { $addToSet: { services: service.id }, $set: { available: false } }
      );

      await Promise.all([removeEmployee, addEmployee]);
    }
  } else {
    //Si el array viene vacío eliminar empleados actuales
    const currentEmployeesIds = service.employees.map((e) => e?.id);

    if (currentEmployeesIds.length) {
      await Employee.updateMany(
        {
          manager: req.user?.id,
          _id: { $in: currentEmployeesIds },
        },
        { $pull: { services: service.id }, $set: { available: true } }
      );
    }
  }

  //En todo caso, asignar nuevos empleados/ninguno al servicio
  service.employees = incomingEmployeesIds;

  //Si todo sale bien pasar al controlador
  return next()
}
