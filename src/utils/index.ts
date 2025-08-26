import { toast } from 'react-toastify'


export const formatErrorNetwork = (error : Error) : string => 'code' in error && error.code === 'ERR_NETWORK'? 'Hubo un error al procesar su solicitud, porfavor intenta de nuevo más tarde' : error.message

export const toastError = (message: string) => toast.error(message, {
  toastId: message,
  className: 'font-bold z-999'
})

export const toastSuccess = (data: string) => toast.success(data, {
  toastId: data,
  className: 'font-bold  z-999'
})

export const notifyError = (error: Error) => {
  
 if ('errors' in error){
  if (!error.errors) {
    toastError(error.message)
  } 
  } else {
    const message = formatErrorNetwork(error)
    toastError(message)
 }
}

export const notifySuccess = (data: string) => {
  toastSuccess(data)
}

export const typeEnumWorkService = {
  unidad: 'unidad',
  hora: 'hora'
} as const

export const translationTypeRepairs = {
  unit: 'Unidad',
  hour: 'Hora'
} as const
Object.freeze(translationTypeRepairs)
Object.freeze(typeEnumWorkService)

export const formatDate = (dateString: string) => new Date(dateString.split('T')[0]).toLocaleDateString(navigator.language, {
  month: 'long',
  day: '2-digit',
  year: 'numeric'
})

export const extractDate = (dateString: string | null) => {
  if (dateString) {
    return dateString.split('T')[0]
  }
}

export const labelStatusService = {
  pending: {translation: 'Pendiente', backgroundColor: 'bg-indigo-500'},
  ['in progress'] : {translation: 'En progreso', backgroundColor: 'bg-amber-500'},
  completed: {translation: 'Completado', backgroundColor: 'bg-lime-500'},
}

export const capitalizeLetter = (str: string) : string => str[0].toUpperCase() + str.slice(1)

export const capitalizeName = (name: string | undefined) => {
  if (name){
    return name.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')
  }
}

export const normalizeString = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase()

export const formatCurrency = (currency: number) => new Intl.NumberFormat(navigator.language, {
  style: 'currency',
  currency: 'EUR'
}).format(currency)

export const deleteParamsUrl = ( searchParams: URLSearchParams, params: string = 'delete') => {
  const newParams = new URLSearchParams(searchParams.toString());
  newParams.delete(params);
  return newParams
}

export const updatedQueryUrl = (query: string, newValue: number | string) => {
  const params = new URLSearchParams(location.search);
  params.set(query, String(newValue));
  return `${location.pathname}?${params.toString()}`;
};

export const ellipticalPagination = (currentPage:number, totalPages: number) : ( number | string )[] => {
  const pages = []
  const range = 1
  let lastPage = 0;

  for (let i = 1; i <= totalPages; i++){
    if (i === 1 || i=== totalPages || (i >= currentPage - range && i <= currentPage + range )){
      if (lastPage && i - lastPage > 1) {
        pages.push('...');
      }
      pages.push(i)
      lastPage = i
    }
  }

  return pages
}

export const translationRole = {
  mechanic: 'Mecánico',
  ['workshop_boss']: 'Jefe de Taller',
  ['body_and_paint']: 'Chapa y Pintura',
  trainee: 'Aprendiz',
  dealer: 'Repartidor',
  ['sales_representative'] : 'Comercial',
  administration: 'Administración',
  assistant: 'Asistente',
  other: 'Otro'
} as const

export const translationProductivity = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta'
} as const

export const keyDelete = {
  employee: 'Eliminar/empleado',
  client: 'Eliminar/cliente',
  service: 'Eliminar/servicio',
} as const

export const typesVat = ["22", "21", "20", "19", "18", "17", "16"] as const
Object.freeze(translationRole)
Object.freeze(translationProductivity)
Object.freeze(keyDelete)