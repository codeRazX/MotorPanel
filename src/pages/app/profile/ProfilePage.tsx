import {useForm, useWatch} from 'react-hook-form'
import { useMemo } from 'react'
import ErrorMsg from '@/components/ui/ErorMsg'
import useAuthentication from '@/hooks/useAuthentication'
import useLoaderEditData from '@/hooks/useLoaderEditData'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import InputForm from '@/components/ui/InputForm'
import { updateProfile } from '@/api/authApi'
import { notifyError, notifySuccess } from '@/utils/index'
import { typeGuardErrorBackend } from '@/types/index'
import type { UserProfileType } from '@/types/user'



export default function ProfilePage() {

  const queryClient = useQueryClient()
  const {data, isLoading} = useAuthentication()
  const {register, handleSubmit, formState:{errors}, reset, control} = useForm<UserProfileType>({
    defaultValues: {
      name: '',
      email: ''
    }
  })

  useLoaderEditData<UserProfileType>({
    data: isLoading || !data ? undefined 
    : 
    {
      name: data.name,
      email: data.email
    }, reset})

  const [name, email] = useWatch({
    control,
    name: ['name', 'email']
  })
  
  const hasChange = useMemo(() => (data?.email === email && data?.name === name ) , [data, email, name])
  
  const mutationProfile = useMutation({
    mutationFn: updateProfile,
    onError: notifyError,
    onSuccess: (data) => {
      notifySuccess(data)
      queryClient.invalidateQueries({queryKey: ['user']})
    }
  })

  const handleEditProfile = (profileData: UserProfileType) => mutationProfile.mutate(profileData)
  
  if (data) return (
    <section className="divide-y divide-gray-900/5 bg-white">
      <div className="text-center py-10 md:py-5">
        <h2 className="text-3xl font-black break-words">Mi perfil</h2>
        <p className="text-lg font-light text-gray-500 mt-5 break-words">Aquí puedes{' '}<span className="text-cyan-500 font-bold">modificar tu perfil</span></p>
      </div>
      
        <form 
          className=" max-w-3xl mx-auto p-5 sm:p-10 space-y-5"
          noValidate
          onSubmit={handleSubmit(handleEditProfile)}
          >
          <div className='flex flex-col gap-3'>
            <InputForm 
              id='name'
              label='Nombre'
              type='text'
              placeholder='Nombre o nombre de tu empresa'
              register={{...register('name', {
              required: 'Un nombre es obligatorio',
              maxLength: {
                value: 100,
                message: 'Máximo 100 caracteres permitidos'
              }
            })}}
            />
            {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
            {typeGuardErrorBackend(mutationProfile.error) && mutationProfile.error.errors && <ErrorMsg>{mutationProfile.error.errors.name}</ErrorMsg>}
          </div>

          <div className='flex flex-col gap-3'>
           <InputForm 
            id='email'
            label='Correo Electrónico'
            type='email'
            placeholder='Correo electrónico'
            register={{...register('email', {
              required: 'El correo electrónico es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Introduce un correo electrónico válido'
              }
            })}}
          />
            {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
            {typeGuardErrorBackend(mutationProfile.error) && mutationProfile.error.errors && <ErrorMsg>{mutationProfile.error.errors.email}</ErrorMsg>}
          </div>

           <input
            type="submit"
            value="Registrar Cambios"
            className={`py-3 bg-gradient-to-tl from-cyan-500 via-cyan-600 to-cyan-700 hover:contrast-125 w-full text-white font-extrabold uppercase cursor-pointer text-xl text-shadow-md disabled:opacity-30 disabled:cursor-not-allowed`}
            disabled={hasChange}
          />
        </form>
    
    </section>

  )
}
