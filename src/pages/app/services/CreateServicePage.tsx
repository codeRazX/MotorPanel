import ServiceForm from "@/components/services/ServiceForm";
import Heading from "@/components/ui/Heading";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createService } from "@/api/servicesApi";
import { notifyError, notifySuccess } from "@/utils/index";
import InputSubmit from "@/components/ui/InputSubmit";
import { type ServiceCreateTypeForm } from "@/types/index";
import ButtonBack from "@/components/ui/ButtonBack";


export default function CreateServicePage() {
  const queryClient = useQueryClient()
  const methods = useForm<ServiceCreateTypeForm>({ defaultValues: {
    client: "",
    symptoms: '',
    vehicle: "",
    employees: [],
  }});

  const mutation = useMutation({
    mutationFn: createService,
    onError: notifyError,
    onSuccess: (data) => {
      notifySuccess(data)
      methods.reset()
      queryClient.invalidateQueries({queryKey: ['suggested_services']})
    }
  })
  
  const handleCreateService = (formData : ServiceCreateTypeForm) => mutation.mutate(formData)
  
  return (
    <div className="max-w-3xl mx-auto">
      <div>
        <Heading
          title="Nuevo Servicio"
          subtitle="Rellena el siguiente formulario"
          action="para registrar un servicio"
        />

        <nav className="mt-5 flex flex-col md:flex-row gap-5 md:items-center">
          <ButtonBack path="/services"/>
        </nav>

        <FormProvider {...methods}>
          <form
            className="my-10 bg-white shadow-lg p-5 sm:p-10 space-y-5 relative"
            noValidate
            onSubmit={methods.handleSubmit(handleCreateService)}
          >
            <ServiceForm 
              errors={methods.formState.errors} 
              errorsBackend={mutation.error}
            />

            <InputSubmit value="Crear servicio"/>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
