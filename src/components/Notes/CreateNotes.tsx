import {useForm} from 'react-hook-form'
import { useState } from 'react'
import ErrorMsg from '../ui/ErorMsg'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notifyError, notifySuccess } from '@/utils/index'
import { createNotes } from '@/api/notesApi'
import { typeGuardErrorBackend } from '@/types/index'


type NotesType = {
  notes: string,
}

const modelTranslation = {
  service: 'servicio',
  client: 'cliente',
  employee: 'empleado'
} as const
Object.freeze(modelTranslation)

type CreateNotesProps = {
  model: keyof typeof modelTranslation,
  itemId: string
}

export default function CreateNotes({model, itemId} : CreateNotesProps) {

  const queryClient = useQueryClient()
  const [isFocused, setIsFocused] = useState(false)
  const {register, reset, handleSubmit, formState: {errors}} = useForm<NotesType>({defaultValues: {notes: ''}})

  const mutateNote = useMutation({
    mutationFn: createNotes,
    onError: notifyError,
    onSuccess: (data) => {
      notifySuccess(data)
      queryClient.invalidateQueries({queryKey: [model, itemId]})
      reset()
    }
  })

  const handleCreateNote = (noteData: NotesType) => {
    const data = {model, itemId, noteData}
    mutateNote.mutate(data)
  }
  

  return (
    <form 
      noValidate
      autoComplete="off"
      className="mt-5 w-full"
      onSubmit={handleSubmit(handleCreateNote)}
    >
      <div className={`w-full border ${isFocused ? 'border-cyan-400' : 'border-slate-300'} flex flex-col gap-3 sm:flex-row mb-3`}>
       <input 
        type="text" 
        id='notes'
        placeholder={`Escribe aquí para agregar notas al ${modelTranslation[model]} (opcional)`}
        className='w-full p-3 focus:outline-0 text-gray-700'
        {...register('notes', {
          required: 'El campo no puede ir vacío',
          maxLength: {
            value: 100,
            message: 'Máximo 100 caracteres permitidos'
          }
        })}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
        <input 
          type="submit" 
          value={'Crear'}
          className='py-3 px-5 bg-gradient-to-tl from-cyan-500 via-cyan-600 to-cyan-700 hover:contrast-125 text-white font-extrabold uppercase cursor-pointer text-xl text-shadow-md'
        />
      </div>

      {errors.notes && <ErrorMsg>{errors.notes.message}</ErrorMsg>}
      {typeGuardErrorBackend(mutateNote.error) && mutateNote.error.errors && <ErrorMsg>{mutateNote.error.errors.notes}</ErrorMsg>}
    </form>
  )
}
