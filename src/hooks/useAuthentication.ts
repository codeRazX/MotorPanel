import { userAuthenticationFetching } from "@/api/authApi"
import { useQuery } from "@tanstack/react-query"

export default function useAuthentication() {

  const {data, isLoading} = useQuery({
    queryKey: ['user'],
    queryFn: userAuthenticationFetching,
    retry: 5,
    refetchOnWindowFocus: false
  })

  return {
    data,
    isLoading  
  }
}
