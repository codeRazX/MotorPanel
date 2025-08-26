import api from "@/lib/axios"
import { UserSchema, type AuthLoginType, type AuthRegistrationType, type UserProfilePassword, type UserProfileType } from "../types"
import { isAxiosError } from "axios"

export const createAccountFetching = async (userData: AuthRegistrationType) => {
  try{
    const {data} = await api.post('/auth/account', userData)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
    throw error
  }
}


export const loginFetching = async (loginData: AuthLoginType) => {
  try{
    const {data} = await api.post('/auth/login', loginData)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
    throw error
  }
}

export const userAuthenticationFetching = async () => {
  try{
    const {data} = await api.get('/auth/user')
    const result = UserSchema.safeParse(data)
    if (result.success){
      return result.data
    }
    throw new Error('Error al validar la respuesta')
  }
  catch(error){
    console.log(error)
    throw error
  }
}

export const logoutFetching = async () => {
  try{
    const {data} = await api.post('/auth/logout')
    return data
  }
  catch(error){
    console.log(error)
    throw error
  }
}

export const updateProfile = async (profileData: UserProfileType) => {
  try{
    const {data} = await api.put('/auth/profile', profileData)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
    throw error
  }
}

export const updateProfilePassword = async (profileData: UserProfilePassword) => {
  try{
    const {data} = await api.put('/auth/profile/password', profileData)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
    throw error
  }
}


