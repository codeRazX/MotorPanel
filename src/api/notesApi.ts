import api from "@/lib/axios"
import { isAxiosError } from "axios"

type createNotesType = {
  model: string,
  itemId: string,
  noteData: {
    notes: string
  }
}

type deleteNotesType = {
  model: string,
  itemId: string,
  noteId: string
}

export const createNotes = async ({model, itemId, noteData} : createNotesType) => {
  try{
    const {data} = await api.post(`/notes/${itemId}/?model=${model}`, {...noteData})
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
    throw error
  }
}

export const deleteNotes = async ({model, itemId, noteId} : deleteNotesType) => {
  try{
    const {data} = await api.delete(`/notes/${itemId}/${noteId}/?model=${model}`)
    return data
  }
  catch(error){
    if (isAxiosError(error) && error.response){
      throw error.response.data
    }
    throw error
  }
}

