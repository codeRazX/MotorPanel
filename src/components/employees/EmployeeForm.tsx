import InputForm from "../ui/InputForm";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { EmployeeCreateFormType, EmployeeEditType } from "@/types/employee";
import ErrorMsg from "../ui/ErorMsg";
import { translationRole, translationProductivity } from "@/utils/index";
import { typeGuardErrorBackend } from "@/types/index";


type EmployeeFormProps = {
  register: UseFormRegister<EmployeeCreateFormType | EmployeeEditType>,
  errors: FieldErrors<EmployeeCreateFormType>,
  errorsBackend: Error | null,
  role: EmployeeCreateFormType['role'],
  productivity: EmployeeCreateFormType['productivity']
}

export default function EmployeeForm({register, errors, errorsBackend, role, productivity} : EmployeeFormProps) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <InputForm 
          id="name"
          type="text"
          label="Nombre"
          placeholder="Nombre del empleado"
          register={{...register('name', {
            required: 'El nombre del empleado es obligatorio',
            maxLength: {
              value: 100,
              message: 'Máximo 100 caracteres permitidos'
            }
          })}}
        />
        {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
        {typeGuardErrorBackend(errorsBackend) && errorsBackend.errors.name && <ErrorMsg>{errorsBackend.errors.name}</ErrorMsg>}
      </div>

      <div className="flex flex-col gap-3">
        <InputForm 
          id="contact"
          type="number"
          label="Contacto"
          placeholder="Número de contacto del empleado (opcional)"
          register={{...register('contact', {
            valueAsNumber: true,
            min: {
              value: 100000,
              message: 'Debe tener al menos 6 dígitos'
            },
            max: {
              value: 100000000000000,
              message: 'Máximo 15 digitos permitidos'
            }
          })}}
        />
        {errors.contact && <ErrorMsg>{errors.contact.message}</ErrorMsg>}
        {typeGuardErrorBackend(errorsBackend) && errorsBackend.errors.contact && <ErrorMsg>{errorsBackend.errors.contact}</ErrorMsg>}
      </div>

       <div className="flex flex-col gap-3">
        <InputForm 
          id="hireDate"
          type="date"
          label="Fecha alta"
          placeholder="Fecha de incorporación en la empresa (opcional)"
          register={{...register('hireDate', {
            validate: (value) => {
            if (!value) return true;

            const date = new Date(value);
            const today = new Date();

            if (isNaN(date.getTime())) return "Introduce una fecha válida";
            if (date > today) return "La fecha no puede ser futura";

            return true;
          }
          })}}
        />
        {errors.hireDate && <ErrorMsg>{errors.hireDate.message}</ErrorMsg>}
        {typeGuardErrorBackend(errorsBackend) && errorsBackend.errors.hireDate && <ErrorMsg>{errorsBackend.errors.hireDate}</ErrorMsg>}
      </div>

       <div className="flex flex-col gap-3">
        <InputForm 
          id="salary"
          type="number"
          label="Salario"
          placeholder="Salario del empleado (opcional)"
          register={{...register('salary', {
            valueAsNumber: true,
            min: {
              value: 100,
              message: 'Debe tener al menos 3 dígitos'
            },
            max: {
              value: 999999999,
              message: 'Ese salario parece demasiado alto'
            }
          })}}
        />
        {errors.salary && <ErrorMsg>{errors.salary.message}</ErrorMsg>}
        {typeGuardErrorBackend(errorsBackend) && errorsBackend.errors.salary && <ErrorMsg>{errorsBackend.errors.salary}</ErrorMsg>}
      </div>
      
       <div className="flex flex-col gap-3">
        <label className="font-bold text-2xl capitalize text-gray-700" htmlFor="role">Cargo</label>
        <select 
          id="role"
          className={`w-full p-3 border border-slate-300 focus:outline-0 focus:border-cyan-400 focus:text-gray-700 ${role === '' ? 'text-gray-400' : 'text-gray-700'}`}
          {...register('role', {
            required: 'Debes seleccionar un cargo',
            validate: (value) => {
              if (!(value in translationRole)){
                return 'Porfavor seleccione un cargo válido'
              }
            }
          })}
          >
          <option disabled value="">Seleccione un cargo</option>
          {Object.entries(translationRole).map(([value, label], index) => (
            <option key={`${value}-${index}`} className="capitalize" value={value}>{label}</option>
          ))}
        </select>
       
        {errors.role && <ErrorMsg>{errors.role.message}</ErrorMsg>}
        {typeGuardErrorBackend(errorsBackend) && errorsBackend.errors.role && <ErrorMsg>{errorsBackend.errors.role}</ErrorMsg>}
      </div>

      <div className="flex flex-col gap-3">
        <label className="font-bold text-2xl capitalize text-gray-700" htmlFor="productivity">Productividad</label>
        <select 
          id="productivity"
          className={`w-full p-3 border border-slate-300 focus:outline-0 focus:border-cyan-400 focus:text-gray-700 ${productivity === '' ? 'text-gray-400' : 'text-gray-700'}`}
          {...register('productivity', {
            required: 'Seleccione la productividad',
            validate: (value) => {
              if (!(value in translationProductivity)){
                return 'Porfavor seleccione una productividad válida'
              }
            }
          })}
          >
          <option disabled value="">Seleccione una opción</option>
          {Object.entries(translationProductivity).map(([value, label], index) => (
            <option key={`${value}-${index}`} className="capitalize" value={value}>{label}</option>
          ))}
        </select>
       
        {errors.productivity && <ErrorMsg>{errors.productivity.message}</ErrorMsg>}
        {typeGuardErrorBackend(errorsBackend) && errorsBackend.errors.productivity && <ErrorMsg>{errorsBackend.errors.productivity}</ErrorMsg>}
      </div>
    </>
  )
}
