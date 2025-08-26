import EmployeeForm from "@/components/employees/EmployeeForm";
import Heading from "@/components/ui/Heading";
import {useForm} from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEmployeeById, updatedEmployee } from "@/api/employeApi";
import {  extractDate, notifyError, notifySuccess } from "@/utils/index";
import { useParams } from "react-router-dom";
import useHandleQueryError from "@/hooks/useHandleQueryError";
import SkeletonFormEmployees from "@/components/ui/skeletons/SkeletonFormEmployees";
import useLoaderEditData from "@/hooks/useLoaderEditData";
import InputSubmit from "@/components/ui/InputSubmit";
import ErrorMsg from "@/components/ui/ErorMsg";
import { typeGuardErrorBackend } from "@/types/index";
import type{ EmployeeEditType } from "@/types/employee";
import ButtonBack from "@/components/ui/ButtonBack";


export default function EditEmployeesPage() {

  const queryClient = useQueryClient()
  const params = useParams()
  const employeeId = params.employeeId!

  const {data, isLoading, error, isError} = useQuery({
    queryKey: ['employee', employeeId],
    queryFn: ()=> getEmployeeById(employeeId),
    retry: false
  })
  
  useHandleQueryError(isError, error)

  const {register, handleSubmit, watch, formState:{errors}, reset} = useForm<EmployeeEditType>()
  useLoaderEditData<EmployeeEditType>({
    data: isLoading || !data ? undefined 
    : 
    {
      name: data.slug,
      contact: data.contact,
      hireDate: extractDate(data.hireDate),
      salary: data.salary,
      role: data.role,
      productivity: data.productivity,
      available: String(data.available)
    }, reset})

  const role = watch('role')
  const productivity = watch('productivity')
  const available = watch('available')

  const mutationEditEmployee = useMutation({
    mutationFn: updatedEmployee,
    onError: notifyError,
    onSuccess: (data) => {
      notifySuccess(data)
      queryClient.invalidateQueries({queryKey: ['employee', employeeId]})
    }
  })

  const handleEditEmployee = (formData: EmployeeEditType) => {
    const employeeData = {...formData, available: formData.available === 'true'}
    const data = {employeeId, employeeData}
    mutationEditEmployee.mutate(data)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Heading
        title="Editar Empleado"
        subtitle="Actualiza el siguiente formulario"
        action="para editar la información de un empleado"
      />

      <nav className="mt-5 flex flex-col md:flex-row gap-5 md:items-center">
        <ButtonBack path="/employees" />
      </nav>

      {isLoading ? <SkeletonFormEmployees /> 
      : (
        <form
          className="my-10 bg-white shadow-lg p-10 space-y-5"
          noValidate
          onSubmit={handleSubmit(handleEditEmployee)}
        >
          <EmployeeForm 
            register={register}
            errors={errors}
            errorsBackend={mutationEditEmployee.error}
            role={role}
            productivity={productivity}
          />
          {!data?.available && (
            <div className="flex flex-col gap-3">
              <label className="font-bold text-2xl capitalize text-gray-700" htmlFor="available">Disponibilidad</label>
              <select 
                id="available"
                className={`w-full p-3 border border-slate-300 focus:outline-0 focus:border-cyan-400 focus:text-gray-700 ${available === '' ? 'text-gray-400' : 'text-gray-700'}`}
                {...register('available', {
                  required: 'Debes seleccionar si el empleado está disponible para un servicio'
                })}
                >
                  <option value="" disabled >Selecciona para marcar al empleado como disponible</option>
                  <option value="true">Disponible</option>
                  <option value="false">Ocupado</option>
              </select>
              {errors.available && <ErrorMsg>{errors.available.message}</ErrorMsg>}
              {typeGuardErrorBackend(mutationEditEmployee.error) && mutationEditEmployee.error.errors.available && <ErrorMsg>{mutationEditEmployee.error.errors.available}</ErrorMsg>}
            </div>
          )}

          <InputSubmit value="Registrar Cambios"/>
        </form>
      )}
    </div>
  )
}
