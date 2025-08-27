import { DocumentPlusIcon, DocumentMinusIcon } from "@heroicons/react/20/solid";
import { useFormContext, useFieldArray, type FieldError } from "react-hook-form";
import type { ServiceEditType } from "@/types/service";
import { typeGuardErrorBackend } from "@/types/index";
import ErrorMsg from "../ui/ErorMsg";

type ServiceAddRepairProps = {
  backendErrors : Error | null
}

export default function ServiceAddRepair({backendErrors}: ServiceAddRepairProps) {

  const {control, register, formState:{errors}} = useFormContext<ServiceEditType>()
   const { fields, append, remove } = useFieldArray({
    control,
    name: "repairs",
  });

 
 
  return (
    <div className="flex flex-col gap-3 mt-5">
      <h3 className="font-bold text-2xl capitalize text-gray-700">Reparaciones</h3>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className=" border border-slate-200 p-3 rounded"
        >
        <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-[4fr_1fr_1fr_1fr] gap-3">
          <div className="col-span-4 md:col-auto">
            <label
              htmlFor={`repairs-${index}-description`}
              className="font-medium text-sm capitalize"
            >
              Descripción
            </label>
            <input
              type="text"
              id={`repairs-${index}-description`}
              placeholder="Ej: Cambio de neumáticos. Cantidad: 4. Precio: 150. Tipo: Unidad"
              className="w-full p-2 border border-slate-300 focus:outline-0 focus:border-cyan-400"
              {...register(`repairs.${index}.description`, {
                required: "La descripción es obligatoria",
                max: {
                  value: 100,
                  message: 'Máximo 100 caracteres permitidos para la descripción'
                }
              })}
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor={`repairs-${index}-quantity`}
              className="font-medium text-sm capitalize"
            >
              Cantidad
            </label>
            <input
              type="number"
              id={`repairs-${index}-quantity`}
              placeholder="Ej: 1"
              className="w-full p-2 border border-slate-300 focus:outline-0 focus:border-cyan-400 h-10"
              {...register(`repairs.${index}.quantity`, {
                required: 'La cantidad es obligatoria',
                valueAsNumber: true,
                min: { value: 1, message: "La cantidad debe ser un número mayor que 0" },
              })}
            />
          </div>

          <div className="col-span-1">
            <label
              htmlFor={`repairs-${index}-price`}
              className="font-medium text-sm capitalize"
            >
              Precio
            </label>
            <input
              type="number"
              id={`repairs-${index}-price`}
              placeholder="Ej: 50"
              className="w-full p-2 border border-slate-300 focus:outline-0 focus:border-cyan-400 h-10"
              {...register(`repairs.${index}.price`, {
                required: 'El precio es obligatorio',
                valueAsNumber: true,
                min: { value: 1, message: "El precio debe ser mayor que 0" },
              })}
            />
          </div>

          <div className="col-span-1">
            <label
              htmlFor={`repairs-${index}-type`}
              className="font-medium text-sm capitalize"
            >
              Tipo
            </label>
            <select
              id={`repairs-${index}-type`}
              className="w-full p-2 border border-slate-300 focus:outline-0 focus:border-cyan-400 h-10"
              defaultValue="Unit"
              {...register(`repairs.${index}.type`, {
                required: "El tipo es obligatorio",
                validate: value => ['unit', 'hour'].includes(value) || 'El tipo debe ser válido'
              })}
            >
              <option value="" disabled>Selecciona una opción</option>
              <option value="unit">Unidad</option>
              <option value="hour">Hora</option>
            </select>
          </div>
          </div>
            {errors.repairs && errors.repairs[index] && (
              <ul className="flex- flex-col gap-1 text-sm list-none text-red-500 font-medium mt-3">
                {Object.entries(errors.repairs[index]).map(([key, value], index) => {
                  const error = value as FieldError;
                  return error.message ? <li key={`${key}-${index}`}>{error.message}</li> : null;
                })}
              </ul>
            )}
            { typeGuardErrorBackend(backendErrors) && (
              <ul className="flex flex-col gap-1 text-sm list-none text-red-500 font-medium mt-3">
                {backendErrors.errors[`repairs[${index}].description`] && (
                  <li>{backendErrors.errors[`repairs[${index}].description`]}</li>
                )}
                {backendErrors.errors[`repairs[${index}].quantity`] && (
                  <li>{backendErrors.errors[`repairs[${index}].quantity`]}</li>
                )}
                {backendErrors.errors[`repairs[${index}].price`] && (
                  <li>{backendErrors.errors[`repairs[${index}].price`]}</li>
                )}
                {backendErrors.errors[`repairs[${index}].type`] && (
                  <li>{backendErrors.errors[`repairs[${index}].type`]}</li>
                )}
              </ul>
          )}
        </div>
      ))}
      {typeGuardErrorBackend(backendErrors) && backendErrors.errors.repairs && <ErrorMsg>{backendErrors.errors.repairs}</ErrorMsg>}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() =>
            append({
              description: "",
              quantity: 1,
              price: 1,
              type: "unit",
            })
          }
        >
          <DocumentPlusIcon className="text-cyan-600 hover:text-cyan-700 size-12 cursor-pointer" />
        </button>
        {fields.length > 1 && (
          <button type="button" onClick={() => remove(fields.length - 1)}>
            <DocumentMinusIcon className="text-red-400 hover:text-red-500 size-12 cursor-pointer" />
          </button>
        )}
      </div>
    </div>
  );
}
