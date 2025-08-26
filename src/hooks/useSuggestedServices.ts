import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEmployeesAvailable } from "@/api/employeApi";
import { getSuggestedClients } from "@/api/clientsApi";
import useHandleQueryError from "./useHandleQueryError";
import { normalizeString } from "../utils";


export default function useSuggestedServices(clientName: string) {
  const {data, isLoading, error, isError} = useQuery({
    queryKey: ['suggested_services'],
    queryFn: async () => {
    const [employees, clients] = await Promise.all([getEmployeesAvailable(), getSuggestedClients()])
    return {
      employeesOption: employees.map(employe => ({value: employe._id , label: employe.slug})),
      clientsOption: clients.map(client => ({value: client._id , label: client.slug}) ),
      clients
    }
    },
    retry: false,
  })

  const vehiclesCurrentClient = useMemo(() => {
    if (data?.clients && clientName){
      const currentClient = data.clients.find(client => client.name === normalizeString(clientName))
      if (currentClient) return currentClient.vehicles.map(v => ({value: v, label: v}))
      return []
    }
  }, [data, clientName])
  useHandleQueryError(isError, error) 

  return {
    data,
    vehiclesCurrentClient,
    isLoading
  }

}
