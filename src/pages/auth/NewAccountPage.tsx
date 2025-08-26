import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMsg from "@/components/ui/ErorMsg";
import { typeGuardErrorBackend, type AuthRegistrationType } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { createAccountFetching } from "@/api/authApi";
import { notifyError, notifySuccess } from "@/utils/index";
import InputSubmit from "@/components/ui/InputSubmit";
import InputForm from "@/components/ui/InputForm";

export default function NewAccountPage() {

  const defaultValues : AuthRegistrationType = {
    email: '',
    name: '',
    password: '',
    confirm_password: ''
  }
  const {register, handleSubmit, formState: {errors}, watch, reset} = useForm({defaultValues})
  const password = watch('password')

  const mutationAccount = useMutation({
    mutationFn: createAccountFetching,
    onError: notifyError,
    onSuccess: (data) => {
      reset()
      notifySuccess(data)
    } 
  })

  const handleCreateAccount = (formData: AuthRegistrationType) => mutationAccount.mutate(formData)

  return (
    <>
    
      <h2 className="text-5xl font-black text-white break-words">Crear Cuenta</h2>
        <p className="text-2xl font-light text-neutral-200 mt-5 break-words">
          Rellena el siguiente formulario {" "}
          <span className=" text-cyan-500 font-bold">para crear tu cuenta</span>
      </p>

      <form 
        className="bg-white p-10 space-y-5 my-10" 
        noValidate
        onSubmit={handleSubmit(handleCreateAccount)}
        >

        <div className="flex flex-col gap-3">
          <InputForm 
            id="email"
            type="email"
            placeholder="Correo electrónico"
            label="Correo Electrónico"
            register={{...register('email', {
              required: 'El correo electrónico es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Introduce un correo electrónico válido'
              }
            })}}
          />
          {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
          {typeGuardErrorBackend(mutationAccount.error) && mutationAccount.error.errors.email && <ErrorMsg>{mutationAccount.error.errors.email}</ErrorMsg>}
        </div>

        <div className="flex flex-col gap-3">
          <InputForm 
            id="name"
            type="text"
            placeholder="Nombre o nombre de tu empresa"
            label="Nombre"
            register={{...register('name', {
              required: 'Un nombre es obligatorio',
              maxLength: {
                value: 100,
                message: 'Máximo 100 caracteres permitidos'
              }
            })}}
          />
          {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
          {typeGuardErrorBackend(mutationAccount.error) && mutationAccount.error.errors.name && <ErrorMsg>{mutationAccount.error.errors.name}</ErrorMsg>}
        </div>

        <div className="flex flex-col gap-3 relative">
          <InputForm 
            id="password"
            type="password"
            placeholder="Contraseña"
            label="Contraseña"
            isPassword={true}
            register={{...register('password', {
              required: 'Una contraseña es obligatoria',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener mínimo 8 caracteres'
              },
              maxLength: {
                value: 64,
                message: 'La contraseña debe tener máximo 64 caracteres'
              },
              pattern: {
                value: /[A-Z]/,
                message: 'La contraseña debe incluir mínimo una letra en mayúscula'
              }
            })}}
          />
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
          {typeGuardErrorBackend(mutationAccount.error) && mutationAccount.error.errors.password && <ErrorMsg>{mutationAccount.error.errors.password}</ErrorMsg>}
        </div>

        <div className="flex flex-col gap-3 relative">
          <InputForm 
            id="confirm_password"
            type="password"
            placeholder="Confirma la contraseña"
            label="Confirmar Contraseña"
            isPassword={true}
            register={{...register('confirm_password', {
              required: 'La contraseña debe ser confirmada',
              validate: (value) => value === password || 'Las contraseñas deben coincidir'
            })}}
          />
          {errors.confirm_password && <ErrorMsg>{errors.confirm_password.message}</ErrorMsg>}
          {typeGuardErrorBackend(mutationAccount.error) && mutationAccount.error.errors.confirm_password && <ErrorMsg>{mutationAccount.error.errors.confirm_password}</ErrorMsg>}
        </div>

        <InputSubmit value="Registrar Cuenta"/>
      </form>

      <nav className="flex flex-col">
        <Link
          to={"/auth/login"}
          className="text-center text-gray-300 font-normal"
        >
          ¿Ya tienes una cuenta?{" "}
          <span className="text-cyan-500 font-bold hover:text-cyan-300">
            Inicia sesión
          </span>
        </Link>
      </nav>
    </>
  );
}
