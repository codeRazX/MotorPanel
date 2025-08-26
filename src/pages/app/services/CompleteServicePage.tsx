import Heading from "@/components/ui/Heading";
import {useForm, FormProvider, useWatch} from 'react-hook-form'
import { useParams } from "react-router-dom";
import {  labelStatusService, notifyError, notifySuccess, typesVat } from "@/utils/index";
import ErrorMsg from "@/components/ui/ErorMsg";
import InputSubmit from "@/components/ui/InputSubmit";
import ServiceForm from "@/components/services/ServiceForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getServiceById, updateService } from "@/api/servicesApi";
import type { ServiceEditType } from "@/types/service";
import useHandleQueryError from "@/hooks/useHandleQueryError";
import SkeletonServiceEdit from "@/components/ui/skeletons/SkeletonServiceEdit";
import useLoaderEditData from "@/hooks/useLoaderEditData";
import ServiceAddRepair from "@/components/services/ServiceAddRepair";
import { typeGuardErrorBackend } from "@/types/index";
import ButtonBack from "@/components/ui/ButtonBack";


export default function CompleteServicePage () {
 
  const queryClient = useQueryClient()
  const params = useParams()
  const serviceId = params.serviceId!
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['service', serviceId],
    queryFn: () => getServiceById(serviceId),
    retry: false
  })


  useHandleQueryError(isError, error)
  
  const methods = useForm<ServiceEditType>()
  const {register, handleSubmit, formState:{errors}, reset, control} = methods
  useLoaderEditData<ServiceEditType>({
    data: isLoading || !data ? undefined 
    : 
    {
      status: data.status,
      vat: data.vat,
      client:  data.client.slug ,
      symptoms: data.symptoms,
      vehicle: data.vehicle,
      employees: data.employees.map(employe => ({value: employe._id , label: employe.slug})),
      repairs: data.repairs.length ? data.repairs : [{description: "",quantity: 1,price: 1, type: "unit"}]
    }, reset})

  const [status, vat] = useWatch({
    control,
    name: ['status', 'vat', 'client']
  })
  
  const mutationEditService = useMutation({
    mutationFn: updateService,
    onError: notifyError,
    onSuccess: (data) => {
      notifySuccess(data)
      queryClient.invalidateQueries({queryKey: ['service', serviceId]})
    }
  })
  
  const handleEditService = (formData: ServiceEditType) => {
    const data = {serviceId, dataService: {...formData}}
    mutationEditService.mutate(data)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Heading
        title="Editar Servicio"
        subtitle="Actualiza el siguiente formulario"
        action="para editar o completar un servicio"
      />

      <nav className="mt-5 flex flex-col md:flex-row gap-5 md:items-center">
        <ButtonBack path="/services" />
      </nav>
    {isLoading ? <SkeletonServiceEdit /> : (
      <FormProvider {...methods}>
        <form
          className="my-10 bg-white shadow-lg p-10 space-y-5"
          noValidate
          onSubmit={handleSubmit(handleEditService)}
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="status" className="font-bold text-2xl capitalize text-gray-700">Progreso</label>
            <select 
              id="status"
              className={`w-full p-3 border border-slate-300 focus:outline-0 focus:border-cyan-400 focus:text-gray-700 ${status === '' ? 'text-gray-400' : 'text-gray-700'}`}
              {...register('status', {
                required: 'Debes seleccionar el progreso de tu servicio',
                validate: value => ['pending', 'in progress', 'completed'].includes(value) || 'Selecciona un progreso válido'
              })}
            >
              <option value="" disabled>Actualiza o completa el servicio</option>
              {Object.entries(labelStatusService).map(([key, {translation}], index) => (
                <option key={`${key}-${index}`} value={key}>{translation}</option>
              ))}
            </select>
              {errors.status && <ErrorMsg>{errors.status.message}</ErrorMsg>}
              {typeGuardErrorBackend(mutationEditService.error) && mutationEditService.error.errors.status && <ErrorMsg>{mutationEditService.error.errors.status}</ErrorMsg>}
          </div>

          {status === 'completed' && (
            <div className="flex flex-col gap-3">
              <label htmlFor="vat" className="font-bold text-2xl capitalize text-gray-700">IVA</label>
              <select 
                id="vat"
                className={`w-full p-3 border border-slate-300 focus:outline-0 focus:border-cyan-400 focus:text-gray-700 ${vat === '' ? 'text-gray-400' : 'text-gray-700'}`}
                {...register('vat', {
                  required: 'Debes seleccionar el tipo de IVA a aplicar',
                  validate: (value) => ["22", "21", "20", "19", "18", "17", "16"].includes(value) || 'Selecciona un tipo de IVA válido'
                })}
              >
                <option value="" disabled>Selecciona un tipo de IVA a aplicar</option>
                {typesVat.map((vat, index) => (
                  <option key={`${vat}-${index}`} value={vat}>{vat}</option>
                ))}
              </select>
              {errors.vat && <ErrorMsg>{errors.vat.message}</ErrorMsg>}
              {typeGuardErrorBackend(mutationEditService.error) && mutationEditService.error.errors.vat && <ErrorMsg>{mutationEditService.error.errors.vat}</ErrorMsg>}
            </div>
          )}
          
          <ServiceForm 
            errors={errors} 
            errorsBackend={mutationEditService.error}
          />
          {status === 'completed' &&  <ServiceAddRepair backendErrors={mutationEditService.error} />}
        
          <InputSubmit value="Registrar Cambios" />
          </form>
        </FormProvider>
    )}
    </div>
    
  )


         
   
  
}
