import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { typeGuardErrorBackend, type AuthLoginType } from "@/types/index";
import ErrorMsg from "@/components/ui/ErorMsg";
import { useMutation } from "@tanstack/react-query";
import { notifyError } from "@/utils/index";
import { loginFetching } from "@/api/authApi";
import { useNavigate } from "react-router-dom";
import InputSubmit from "@/components/ui/InputSubmit";
import InputForm from "@/components/ui/InputForm";

export default function LoginPage() {
  
  const navigate = useNavigate()
  const defaultValues : AuthLoginType = {email: '', password: ''}
  const {register, handleSubmit, formState: {errors}, reset} = useForm({defaultValues})

  const mutationLogin = useMutation({
    mutationFn: loginFetching,
    onError: notifyError,
    onSuccess: () =>  {
      reset()
      navigate('/')
    },
  })
  
  const handleLogin = (formData: AuthLoginType) => mutationLogin.mutate(formData)


  return (
    <>
      <form 
      className="bg-white p-10 space-y-5"
      noValidate
      onSubmit={handleSubmit(handleLogin)}
      >

        <div className="flex flex-col gap-3">
          <InputForm 
            id="email"
            type="email"
            placeholder="Correo electrónico de inicio de sesión"
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
          {typeGuardErrorBackend(mutationLogin.error) && mutationLogin.error.errors.email && <ErrorMsg>{mutationLogin.error.errors.email}</ErrorMsg>}
        </div>


         <div className="flex flex-col gap-3 relative">
          <InputForm 
            id="password"
            type="password"
            placeholder="Contraseña de inicio de sesión"
            label="Contraseña"
            isPassword={true}
            register={{...register('password', {
              required: 'La contraseña es obligatoria'
            })} }
          />
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
          {typeGuardErrorBackend(mutationLogin.error) && mutationLogin.error.errors.password && <ErrorMsg>{mutationLogin.error.errors.password}</ErrorMsg>}
        </div>
        
        <InputSubmit value="Iniciar Sesión"/>

      </form>

      <nav className="mt-10 flex flex-col">
        <Link 
          to={'/auth/account'} 
          className="text-center text-gray-300 font-normal"
        >¿Aún no tienes una cuenta?{' '}<span className="text-cyan-500 font-bold hover:text-cyan-300">Crear cuenta</span></Link>
      </nav>
    </>
  )
}
