import Heading from "@/components/ui/Heading";
import InputForm from "@/components/ui/InputForm";
import InputSubmit from "@/components/ui/InputSubmit";
import {useForm, Controller} from 'react-hook-form'
import { useMemo } from "react";
import ErrorMsg from "@/components/ui/ErorMsg";
import { useParams } from "react-router-dom";
import { getClientById, uptadeClient } from "@/api/clientsApi";
import { notifyError, notifySuccess } from "@/utils/index";
import { useMutation } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useHandleQueryError from "@/hooks/useHandleQueryError";
import SekeletonFormClient from "@/components/ui/skeletons/SekeletonFormClient";
import useLoaderEditData from "@/hooks/useLoaderEditData";
import { typeGuardErrorBackend } from "@/types/index";
import type { ClientEditType } from "@/types/client";
import CustomSelect from "@/components/ui/CustomSelect";
import ButtonBack from "@/components/ui/ButtonBack";

export default function EditClientsPage() {

  const queryClient = useQueryClient()
  const params = useParams()
  const clientId = params.clientId!

  const {data, error, isLoading, isError} = useQuery({
    queryKey: ['client', clientId],
    queryFn: ()=> getClientById(clientId),
    retry: false,
    refetchOnWindowFocus: false
  })
  useHandleQueryError(isError, error)
  const defaultValues : ClientEditType = {name: '', contact:  null, vehicles: '', regularCustomer: ''}
  const {register, handleSubmit, formState: {errors}, watch, reset, control} = useForm({defaultValues})
  const regularCustomer = watch('regularCustomer')
  const vehiclesOptions = useMemo(()=> data?.vehicles.map(v => ({label: v, value: v})),[data])

  useLoaderEditData<ClientEditType>({
    data: isLoading || !data
    ? undefined
    : 
    {
      name: data.slug ,
      contact: data.contact,
      vehicles: '',
      regularCustomer: String(data.regularCustomer),
      vehicles_remove: []
    }
  , reset})

  const clientMutation = useMutation({
    mutationFn: uptadeClient,
    onError: notifyError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['client', clientId]})
      reset({vehicles_remove: [], vehicles: ''})
      notifySuccess(data)
    }
  })

  const handleEditClient = (formData : ClientEditType) => { 
    const clientData = {...formData, regularCustomer: formData.regularCustomer === 'true'}
    const data = {clientId, clientData}
    clientMutation.mutate(data)
  }



  return (
    <div className="max-w-3xl mx-auto">
      <div>
        <Heading
          title="Editar Cliente"
          subtitle="Actualiza el siguiente formulario"
          action="para editar la información de un cliente"
        />

        <nav className="mt-5 flex flex-col md:flex-row gap-5 md:items-center">
          <ButtonBack path="/clients" />
        </nav>

        {isLoading ? <SekeletonFormClient /> 
        : (
          <form
            className="my-10 bg-white shadow-lg p-5 sm:p-10 space-y-5"
            noValidate
            onSubmit={handleSubmit(handleEditClient)}
          >
            <div className="flex flex-col gap-3">
              <InputForm 
                id="name"
                type="text"
                label="Nombre"
                placeholder="Nombre del cliente"
                register={{...register('name', {
                  required: 'El nombre del cliente es obligatorio',
                  maxLength: {
                    value: 100,
                    message: 'Máximo 100 caracteres permitidos'
                  }
                })}}
              />
              {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
              {typeGuardErrorBackend(clientMutation.error) && clientMutation.error.errors.name && <ErrorMsg>{clientMutation.error.errors.name}</ErrorMsg>}  
            </div>

            <div className="flex flex-col gap-3">
              <InputForm 
                id="contact"
                type="number"
                label="Contacto"
                placeholder="Número de contacto del cliente (opcional)"
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
                {typeGuardErrorBackend(clientMutation.error) && clientMutation.error.errors.contact && <ErrorMsg>{clientMutation.error.errors.contact}</ErrorMsg>}   
            </div>

            <div className="flex flex-col gap-3">
              <InputForm 
                id="vehicle"
                type="text"
                label="Vehículo"
                placeholder="Agregar un nuevo vehículo asociado al cliente (opcional)"
                register={{...register('vehicles', {
                  maxLength: {
                    value: 100,
                    message: 'Máximo 100 caracteres permitidos'
                  }
                })}}
              />
              {errors.vehicles && <ErrorMsg>{errors.vehicles.message}</ErrorMsg>}
              {typeGuardErrorBackend(clientMutation.error) && clientMutation.error.errors.vehicles && <ErrorMsg>{clientMutation.error.errors.vehicles}</ErrorMsg>}
            </div>
              <div className="flex flex-col gap-3 mt-5">
                <label htmlFor="vehicles_remove" className={"font-bold text-2xl capitalize text-gray-700"}>Eliminar vehículo</label>
                <Controller
                  name="vehicles_remove"
                  control={control}
                  rules={{
                    validate: value => {
                      const allExist = value?.every(v =>
                        vehiclesOptions?.some(opt => opt.value === v.value)
                      )
                      return allExist || 'Un vehículo no está asociado al cliente, revise los datos'
                    }
                  }}
                  render={({field}) => (
                    <CustomSelect<ClientEditType, "vehicles_remove">
                      inputId="vehicles_remove"
                      data={vehiclesOptions} 
                      field={field}
                      holder="Eliminar vehículos asociados al cliente (opcional)"
                      noOption="No hay vehículos para eliminar"
                    />
                  )}
                />
                {errors.vehicles_remove && <ErrorMsg>{errors.vehicles_remove.message}</ErrorMsg>}
                {typeGuardErrorBackend(clientMutation.error) && clientMutation.error.errors.vehicles_remove && <ErrorMsg>{clientMutation.error.errors.vehicles_remove}</ErrorMsg>}
              </div>

            <div className="flex flex-col gap-3">
              <label className="font-bold text-2xl capitalize text-gray-700" htmlFor="regularCustomer">Cliente Habitual</label>
              <select 
                id="regularCustomer"
                className={`w-full p-3 border border-slate-300 focus:outline-0 focus:border-cyan-400 focus:text-gray-700 ${regularCustomer === '' ? 'text-gray-400' : 'text-gray-700'}`}
                {...register('regularCustomer', {
                  required: 'Debes seleccionar si el cliente es habitual'
                })}
                >
                  <option value="" disabled >Seleccione una opción</option>
                  <option value="true">Si</option>
                  <option value="false">No</option>
              </select>
              {errors.regularCustomer && <ErrorMsg>{errors.regularCustomer.message}</ErrorMsg>}
              {typeGuardErrorBackend(clientMutation.error) && clientMutation.error.errors.regularCustomer && <ErrorMsg>{clientMutation.error.errors.regularCustomer}</ErrorMsg>}
            </div>
            
            <InputSubmit value="Registrar cambios"/>
            
         </form>

        )}
      </div>
    </div>
  )
}
