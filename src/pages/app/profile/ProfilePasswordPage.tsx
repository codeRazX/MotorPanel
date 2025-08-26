import ErrorMsg from '@/components/ui/ErorMsg'
import InputForm from '@/components/ui/InputForm'
import {useForm} from 'react-hook-form' 
import { useMutation } from '@tanstack/react-query'
import InputSubmit from '@/components/ui/InputSubmit'
import { updateProfilePassword } from '@/api/authApi'
import { notifyError, notifySuccess } from '@/utils/index'
import type { UserProfilePassword } from '@/types/user'
import { typeGuardErrorBackend } from '@/types/index'


export default function ProfilePasswordPage() {

  const {register, handleSubmit, formState:{errors}, reset, watch} = useForm<UserProfilePassword>({
      defaultValues: {
        current_password: '',
        password: '',
        confirm_password: ''
      }
  })
  const password = watch('password')

  const mutationProfile = useMutation({
      mutationFn: updateProfilePassword,
      onError: notifyError,
      onSuccess: (data) => {
        notifySuccess(data)
        reset()
      }
    })
  const handleEditProfilePassword = (profileData: UserProfilePassword) => mutationProfile.mutate(profileData)
  

  return (
    <section className="divide-y divide-gray-900/5 bg-white">
      <div className="text-center py-10 md:py-5">
        <h2 className="text-3xl font-black break-words">Contraseña</h2>
        <p className="text-lg font-light text-gray-500 mt-5 break-words">Utiliza el siguiente formulario{' '}<span className="text-cyan-500 font-bold">para cambiar tu contraseña</span></p>
      </div>
      
      <form 
        className=" max-w-3xl mx-auto p-10 space-y-5"
        noValidate
        onSubmit={handleSubmit(handleEditProfilePassword)}
        >
          <div className="flex flex-col gap-3 relative">
          <InputForm 
            id="current_password"
            type="password"
            placeholder="Contraseña actual"
            label="Contraseña actual"
            isPassword={true}
            register={{...register('current_password', {
              required: 'La contraseña actual es obligatoria'
            })}}
          />
          {errors.current_password && <ErrorMsg>{errors.current_password.message}</ErrorMsg>}
          {typeGuardErrorBackend(mutationProfile.error) && mutationProfile.error.errors && <ErrorMsg>{mutationProfile.error.errors.current_password}</ErrorMsg>}
        </div>

        <div className="flex flex-col gap-3 relative">
          <InputForm 
            id="password"
            type="password"
            placeholder="Nueva contraseña"
            label="Contraseña"
            isPassword={true}
            register={{...register('password', {
              required: 'La nueva contraseña es obligatoria',
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
          {typeGuardErrorBackend(mutationProfile.error) && mutationProfile.error.errors && <ErrorMsg>{mutationProfile.error.errors.password}</ErrorMsg>}
        </div>

        <div className="flex flex-col gap-3 relative">
          <InputForm 
            id="confirm_password"
            type="password"
            placeholder="Confirma la nueva contraseña"
            label="Confirmar Contraseña"
            isPassword={true}
            register={{...register('confirm_password', {
              required: 'La contraseña debe ser confirmada',
              validate: (value) => value === password || 'Las contraseñas deben coincidir'
            })}}
          />
          {errors.confirm_password && <ErrorMsg>{errors.confirm_password.message}</ErrorMsg>}
          {typeGuardErrorBackend(mutationProfile.error) && mutationProfile.error.errors && <ErrorMsg>{mutationProfile.error.errors.confirm_password}</ErrorMsg>}
        </div>

        <InputSubmit value='Registrar cambios'/>
      </form>
    
    </section>
  )
}
