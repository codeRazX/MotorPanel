import { capitalizeName } from "@/utils/index";
import { useState } from "react"
import { useFormContext, type UseFormRegisterReturn, useWatch } from "react-hook-form";
import Select from "react-select";

type OptionType = {
  label: string;
  value: string;
};

type InputTextSuggestedProps = {
  id: string,
  label: string,
  placeholder: string,
  noOptions: string,
  register:  UseFormRegisterReturn<string>,
  options?: OptionType[],
  fieldName: string
}

export default function InputTextSuggested({id, label, placeholder, noOptions, register, options, fieldName} : InputTextSuggestedProps) {
  
  const [menuOpen, setMenuOpen] = useState(false)
  const {control, setValue} = useFormContext()
  const value = useWatch({
    control,
    name: fieldName
  })

  return (
     
    <>
      <div className="relative flex flex-col gap-3">
        <label htmlFor={id} className="font-bold text-2xl capitalize text-gray-700">{label}</label>
        <input 
          type="text"
          autoComplete="off"
          id={id}
          placeholder={placeholder}
          className={`w-full p-3 border border-slate-300 focus:outline-0 focus:border-cyan-400 text-gray-700`}
          {...register}
          onInput={() => setMenuOpen(true)}
          onBlur={() => setMenuOpen(false)}
          />
          <Select
          options={options}
          closeMenuOnSelect={true}
          inputValue={value} 
          onChange={(option) => {
            if(option){
              setValue(fieldName, capitalizeName( option.label ))
              setMenuOpen(false)
            }
          }}
          menuIsOpen={menuOpen} 
          noOptionsMessage={() => noOptions}
          styles={{
            input: () => ({ display: 'none' }), 
            control: (base) => ({ ...base, display: 'none' }),
            container: (base) => ({...base,   position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              margin: 0,
              padding: 0,
              zIndex: 99
            }),
            menu: (base) => ({
              ...base,
              borderRadius: 0,
              color: "#374151",
              fontWeight: "600",
            }),
            option: (base) => ({
              ...base,
              textTransform: 'capitalize'
            })
          }}
        />
      </div>
    </>
  )
}
