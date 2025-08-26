import api from "@/lib/axios";
import {  ServiceSchema, ServicesDashboardSchema, type ServiceCreateTypeForm, type ServiceEditType, type ServiceType } from "../types";
import { isAxiosError } from "axios";


export const getServices = async (page: number | null, search: string | null) => {

  try{
    const {data} = await api(`/services/`, {
      params: {
        page,
        search
      }
    })
    
    const result = ServicesDashboardSchema.safeParse(data)
    if (result.success){
      return result.data
    }

    throw new Error('Respuesta no esperada')
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
    throw error
  }
}


export const getServiceById = async (serviceId: ServiceType['_id']) => {
  try{
    const {data} = await api(`/services/${serviceId}`)
    const result = ServiceSchema.safeParse(data)
   
    if (result.success){
      return result.data
    }

    throw new Error('Respuesta no esperada')
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
    throw error
  }
}

export const createService = async (dataService: ServiceCreateTypeForm) => {
  try{
    const {data} = await api.post('/services', dataService)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }

    throw error
  }
}

export const updateService = async ({serviceId, dataService}: {serviceId: ServiceType['_id'], dataService: ServiceEditType}) => {
  try{
    const {data} = await api.put(`services/${serviceId}`, dataService)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }

    throw error
  }
}

export const deleteService = async ({queryKey, itemId:serviceId }: {itemId: ServiceType['_id'], queryKey: string}) => {
  try{
    const {data} = await api.delete(`/services/${serviceId}/?key=${queryKey}`)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
    throw error
  }
}

