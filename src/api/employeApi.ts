import api from "@/lib/axios";
import { EmployeesAvailableSchema, EmployeeSchema, EmployeesSchemaDashboard, type EmployeeCreateFormType, type EmployeeType } from "../types";
import { isAxiosError } from "axios";

export const createEmploye = async (employeData: EmployeeCreateFormType) => {
  try{
    const {data} = await api.post('/employees', employeData)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
    throw error
  }
}

export const getEmployees = async (page: number | null, search: string | null) => {
  try{
    const {data} = await api(`/employees/`, {
      params: {
        page,
        search
      }
    })
    
    const result = EmployeesSchemaDashboard.safeParse(data)
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


export const getEmployeesAvailable = async () => {
  try{
    const {data} = await api('/employees/available')
    const result = EmployeesAvailableSchema.safeParse(data)
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

export const getEmployeeById = async (employeeId : EmployeeType['_id']) => {
  try{
    const {data} = await api(`/employees/${employeeId}`)
    const result = EmployeeSchema.safeParse(data)
    if (result.success) {
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

export const updatedEmployee = async ({employeeId, employeeData}: {employeeId: EmployeeType['_id'], employeeData: EmployeeCreateFormType}) => {
  try{
    const {data} = await api.put(`/employees/${employeeId}`, employeeData)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
    throw error
  }
}

export const deleteEmployee = async ({queryKey, itemId:employeeId }: {itemId: EmployeeType['_id'], queryKey: string}) => {
  try{

    const {data} = await api.delete(`/employees/${employeeId}/?key=${queryKey}`)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
    throw error
  }
}