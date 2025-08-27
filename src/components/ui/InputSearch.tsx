import {useForm} from 'react-hook-form'
import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toastError } from '@/utils/index'
import { useState } from 'react'


type InputSearchProps = {
  placeholder : string,
  path: string,
  search: string | null
}

type SearchType = {
  search: string
}

export default function InputSearch({placeholder, path, search} : InputSearchProps) {
  const navigate = useNavigate()
  const {register, handleSubmit, reset, watch} = useForm<SearchType>()
  const [, setSearchParams] = useSearchParams()
  const show = !!search
  const isContent = watch('search')
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (formData: SearchType) => {
    if (formData.search.length > 50){
      toastError('El filtro de busqueda no puede superar los 50 caracteres')
      navigate(path)
      reset()
      return;
    }
    if(!formData.search) return;
    setSearchParams(`?search=${formData.search}`, {replace: true})
  }

  return (
    <div className="relative w-full md:flex-1 flex gap-5">
      <ArrowPathIcon 
        onClick={()=> {
          navigate(path)
          reset()
          setIsFocused(false)
        }}
        className={` mx-auto text-shadow-md transition-all ease-in-out duration-500 size-12 cursor-pointer rounded-full p-1 hover:contrast-125 overflow-hidden ${show ? 'text-white bg-gradient-to-tl pointer-events-auto from-cyan-500 via-cyan-600 to-cyan-700 rotate-360' : 'bg-cyan-950 text-cyan-800 pointer-events-none'}`}
      />

      <form 
        noValidate
        onSubmit={handleSubmit(handleSearch)}
        className='flex-1'
        autoComplete='off'
      >
        <label htmlFor="search" className='sr-only'>Escribe en el siguiente campo los filtros de búsqueda:</label>
        <input 
          type="text" 
          id='search'
          className={`py-3 border border-slate-300 rounded-full pl-10 pr-2 focus:outline-0 focus:border-slate-400 w-full ${isFocused ? 'md:w-full ' : 'md:w-22'} block md:inline text-gray-700 transition-[width] duration-1000 ease-in-out `}
          placeholder={placeholder}
          {...register('search')}
          onFocus={() => setIsFocused(true)}
          onBlur={() => isContent === '' && setIsFocused(false)}
        />
        <button 
          type="submit" 
          className="cursor-pointer absolute top-1/2 left-19 -translate-y-1/2" onMouseDown={(e) => e.preventDefault()}
        >
          <MagnifyingGlassIcon className=" size-8 text-slate-400 hover:text-slate-500"/>
        </button>
      </form>
    </div>
   
    
  )
}
