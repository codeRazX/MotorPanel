import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { ClientSchema, ClientsSchemasDashboard, ClientsSuggestedSchema, type ClientEditType, type ClientType } from "../types"

export const getClients = async (page: number | null, search: string | null) => {
  try{
    const {data} = await api(`/clients/`, {
      params: {
        page,
        search
      }
    })
    const result = ClientsSchemasDashboard.safeParse(data)
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


export const getSuggestedClients = async () => {
  try{
    const {data} = await api('/clients/suggested')
    const result = ClientsSuggestedSchema.safeParse(data)
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


export const getClientById = async (clientId: ClientType['_id']) => {
  try{
    const {data} = await api(`/clients/${clientId}`)
    const result = ClientSchema.safeParse(data)
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


export const uptadeClient = async ({clientId, clientData}: {clientId: ClientType['_id'], clientData: ClientEditType}) => {
  try{
    const {data} = await api.put(`/clients/${clientId}`, clientData)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }

    throw error
  }
}


export const deleteClient = async ({queryKey, itemId:clientId }: {itemId: ClientType['_id'], queryKey: string}) => {
  try{
    const {data} = await api.delete(`/clients/${clientId}/?key=${queryKey}`)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
    throw error
  }
}