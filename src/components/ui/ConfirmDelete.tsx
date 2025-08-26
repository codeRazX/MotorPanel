import { Fragment, useEffect } from "react";
import {Dialog, Transition, DialogPanel, DialogTitle, Description} from "@headlessui/react";
import { useSearchParams } from "react-router-dom";
import {useForm} from 'react-hook-form'
import ErrorMsg from "./ErorMsg";
import { deleteParamsUrl } from "@/utils/index";



type ConfirmDeleteProps = {
  title: string,
  description: string,
  keyConfirm: string,
  mutationDelete : (itemId: string, queryKey: string) => void
}

type DeleteType = {
  delete: string
}

export default function ConfirmDelete({title, description, keyConfirm, mutationDelete} : ConfirmDeleteProps) {

  const [searchParams, setSearchParams] = useSearchParams();
  const itemId = searchParams.get("delete");
  const isOpen = !!itemId;


  const {register, watch, handleSubmit, formState:{errors}, reset} = useForm<DeleteType>()
  const isSameKey = watch('delete')
  
  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset])

  const handleDelete = (formData: DeleteType) => {
    if (itemId){
      mutationDelete(itemId, formData.delete)
      
    }
  }


  return (
    <>
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-50"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-200"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-10"
      >
        <Dialog
          as="div"
          className="fixed inset-0 z-50 flex items-center justify-center bg-cyan-900/30 px-10"
          onClose={() => setSearchParams(deleteParamsUrl(searchParams))}
        >
          <DialogPanel className="bg-white rounded max-w-xl  w-full p-5 md:p-10 ring-1 ring-red-500/30">
            <DialogTitle className="text-2xl text-center md:text-left font-bold text-gray-700 break-words">
              {title}
            </DialogTitle>
            <Description className="mt-2 text-md md:text-lg text-gray-700 font-medium">
              {description} 
            </Description>

            <p className="mt-2 text-md md:text-lg text-gray-600">Para continuar, escribe{" "}<span className="text-red-500 font-medium">"{keyConfirm}"</span>{" "}en el siguiente campo.</p>
            <form 
              noValidate 
              autoComplete="off"
              className="mt-5"
              onSubmit={handleSubmit(handleDelete)}
            >
              <input 
                type="text" 
                className="border border-red-400 w-full p-3 rounded focus:outline-0 focus:border-red-500 bg-neutral-50 mb-3" 
                placeholder="Escribe aquí para confirmar"
                {...register('delete', {
                  required: 'Debes confirmar la acción para continuar'
                })}
              />
              {errors.delete && <ErrorMsg>{errors.delete.message}</ErrorMsg>}
              <div className="flex justify-center md:justify-end gap-x-2 mt-5">
                <button
                  className="px-3 py-1 text-lg text-cyan-700 font-bold hover:text-cyan-800 cursor-pointer"
                  type="button"
                  onClick={() => setSearchParams(deleteParamsUrl(searchParams), { replace: true })}
                >
                  Cancelar
                </button>
                <button
                  className="px-5 py-1 font-medium bg-red-500 text-lg text-white rounded  hover:contrast-120 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                  type="submit"  
                  disabled={isSameKey !== keyConfirm}
                >
                  Confirmar
                </button>
              </div>
            </form>

          </DialogPanel>
        </Dialog>
      </Transition>
    </>
  );
}
