import {  type FieldErrors, useFormContext, useWatch, Controller } from "react-hook-form"
import ErrorMsg from "../ui/ErorMsg";
import SkeletonForm from "../ui/skeletons/SkeletonFormServices";
import CustomSelect from "../ui/CustomSelect";
import InputTextSuggested from "../ui/InputTextSuggested";
import useSuggestedServices from "@/hooks/useSuggestedServices";
import { typeGuardErrorBackend, type ServiceCreateTypeForm } from "@/types/index";

type ServiceFormProps = {
  errors: FieldErrors<ServiceCreateTypeForm>,
  errorsBackend: Error | null,
}


export default function ServiceForm ({errors, errorsBackend} : ServiceFormProps) {
 
  const { register, control } = useFormContext<ServiceCreateTypeForm>()
  const clientName = useWatch({
    control,
    name: 'client'
  })

  const {data, isLoading, vehiclesCurrentClient} = useSuggestedServices(clientName)

  if (isLoading) return <SkeletonForm />
  return (
    <>
    <div className="flex flex-col gap-3">
      <InputTextSuggested 
        id="client"
        label="Cliente"
        placeholder="Nombre del cliente"
        noOptions="Cliente no existe, se registrará uno nuevo"
        fieldName="client"
        register={{...register('client', {
          required: 'El nombre del cliente es obligatorio',
          maxLength: {
            value: 100,
            message: 'Máximo 100 caracteres permitidos'
          }
        })}}
        options={data?.clientsOption}
      />
      {errors.client && <ErrorMsg>{errors.client.message}</ErrorMsg>}
      {typeGuardErrorBackend(errorsBackend) && errorsBackend.errors.client && <ErrorMsg>{errorsBackend.errors.client}</ErrorMsg>}
    </div>

    <div className="flex flex-col gap-3">
      <InputTextSuggested 
        id="vehicle"
        label="Vehículo"
        placeholder="Vehículo a reparar"
        noOptions="Sin datos del vehículo"
        fieldName="vehicle"
        register={{...register('vehicle', {
          required: 'Un vehículo es obligatorio',
          maxLength: {
            value: 100,
            message: 'Máximo 100 caracteres permitidos'
          }
        })}}
        options={vehiclesCurrentClient}
      />
    
      {errors.vehicle && <ErrorMsg>{errors.vehicle.message}</ErrorMsg>}
      {typeGuardErrorBackend(errorsBackend) && errorsBackend.errors.vehicle && <ErrorMsg>{errorsBackend.errors.vehicle}</ErrorMsg>}
    </div>

    <div className="flex flex-col gap-3">
      <label htmlFor="employees" className={"font-bold text-2xl capitalize text-gray-700"}>Empleados</label>
      <Controller
        name="employees"
        control={control}
        render={({field}) => (
          <CustomSelect<ServiceCreateTypeForm, "employees">
            inputId="employees"
            data={data?.employeesOption} 
            field={field}
            holder="Seleccionar empleados disponibles para el servicio (opcional)"
            noOption="No hay empleados para seleccionar"
          />
        )}
      />
    </div>
    

    <div className="flex flex-col gap-3">
      <label htmlFor="symptoms" className={"font-bold text-2xl capitalize text-gray-700"}>Observaciones</label>
      <textarea 
        id="symptoms"
        placeholder="Averías o problemas detectados al recepcionar el vehículo"
        className={`w-full p-3 border border-slate-300 focus:outline-0 focus:border-cyan-400 resize-y min-h-20 max-h-50 text-gray-700 `}
        {...register('symptoms', {
          required: 'Debes informar las observaciones del vehículo',
          maxLength: {
            value: 500,
            message: 'Máximo 500 caracteres permitidos'
          }
        })}
      >
      </textarea>
      {errors.symptoms && <ErrorMsg>{errors.symptoms.message}</ErrorMsg>}
      {typeGuardErrorBackend(errorsBackend) && errorsBackend.errors.symptoms && <ErrorMsg>{errorsBackend.errors.symptoms}</ErrorMsg>}
    </div>
      
    </>
  )
}