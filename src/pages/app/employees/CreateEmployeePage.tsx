import EmployeeForm from "@/components/employees/EmployeeForm";
import Heading from "@/components/ui/Heading";
import {useForm, useWatch} from 'react-hook-form'
import { useMutation } from "@tanstack/react-query";
import { createEmploye } from "@/api/employeApi";
import { notifyError, notifySuccess } from "@/utils/index";
import InputSubmit from "@/components/ui/InputSubmit";
import type { EmployeeCreateFormType } from "@/types/employee";
import ButtonBack from "@/components/ui/ButtonBack";


export default function CreateEmployeePage() {

  const defaultValues : EmployeeCreateFormType = {
    name: '',
    contact: null,
    hireDate: null,
    salary: null,
    role: '',
    productivity: ''
  }

  const {register, handleSubmit, formState: {errors}, reset, control} = useForm({defaultValues})

  const mutationEmployee = useMutation({
    mutationFn: createEmploye,
    onError: notifyError,
    onSuccess: (data) => {
      notifySuccess(data)
      reset()
    }
  })

  const handleCreateEmployee = (formData : EmployeeCreateFormType) => mutationEmployee.mutate(formData)
  const [role, productivity] = useWatch({
    control,
    name: ['role', 'productivity']
  })

  return (
    <div className="max-w-3xl mx-auto">
      <div>
        <Heading
          title="Nuevo Empleado"
          subtitle="Rellena el siguiente formulario"
          action="para registrar un nuevo empleado"
        />

        <nav className="mt-5 flex flex-col md:flex-row gap-5 md:items-center">
          <ButtonBack path="/employees" />
        </nav>

        <form
          className="my-10 bg-white shadow-lg p-10 space-y-5"
          noValidate
          onSubmit={handleSubmit(handleCreateEmployee)}
        >
          <EmployeeForm 
            register={register}
            errors={errors}
            errorsBackend={mutationEmployee.error}
            role={role}
            productivity={productivity}
          />

          <InputSubmit value="Crear Empleado"/>
        </form>
      </div>
    </div>
  )
}
