import { useEffect, useRef } from "react"
import type { DefaultValues, FieldValues, UseFormReset } from "react-hook-form"


type useLoaderEditDataProps<T extends FieldValues> = {
  data: DefaultValues<T> | undefined,
  reset: UseFormReset<T>
}

export default function useLoaderEditData<T extends FieldValues>({data, reset} : useLoaderEditDataProps<T>) {
  const hasChanges = useRef(false)
  
  return (
    useEffect(() => {
      if (data && !hasChanges.current) {
        reset(data)
        hasChanges.current = true
      }
   
    }, [data, reset])
  )
}
