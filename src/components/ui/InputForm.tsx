import type { UseFormRegisterReturn } from "react-hook-form"
import ToggleTypePassword from "./ToggleTypePassword"
import { useState } from "react"

type InputFormTypeProps = {
  id: string,
  label: string,
  type: string,
  placeholder: string,
  register:  UseFormRegisterReturn<string>,
  sm?: boolean,
  isPassword?: boolean
}

const autoCompleteOptions: Record<string, string> = {
  email: 'email',
  text: 'name',
  password: 'off'
}

export default function InputForm({id, label, type, placeholder, register, sm = false, isPassword = false} : InputFormTypeProps) {
  const [showPassword, setShowPassword] = useState(true)
  let autocompleteValues = autoCompleteOptions[type] ?? 'off'
  if (isPassword) {
    autocompleteValues = 'off'  
  }

  return (
   <>
    <label htmlFor={id} className={`${sm ? "font-medium text-sm" : "font-bold text-2xl" } capitalize text-gray-700`}>{label}</label>
    <input 
      type={isPassword ? showPassword ? 'password' : 'text' : type}
      id={id}
      placeholder={placeholder}
      autoComplete={autocompleteValues}
      className={`w-full ${sm ? "p-2" : "p-3"} border border-slate-300 focus:outline-0 focus:border-cyan-400 text-gray-700 ${isPassword? 'pr-11' : ''}`}
      {...register}
    />
    {isPassword  && <ToggleTypePassword setShowPassword={setShowPassword} showPassword={showPassword}/>}
   </>
  )
}
