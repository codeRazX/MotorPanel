import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { deleteParamsUrl, notifyError, notifySuccess } from '../utils';


type DeleteHookParams = {
  mutationFn: (data: { itemId: string; queryKey: string }) => Promise<string>
  invalidateQuery: string 
}

export const useDeleteItem = ({ mutationFn, invalidateQuery }: DeleteHookParams) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryClient = useQueryClient()
  const itemId = searchParams.get('delete')

  const mutation = useMutation({
    mutationFn,
    onError: notifyError,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [invalidateQuery] });
      notifySuccess(data)
      setSearchParams(deleteParamsUrl(searchParams))
    }
  })

  const handleDelete = (itemId: string, queryKey: string) => {
    mutation.mutate({ itemId, queryKey })
  }

  return {
    itemId,
    handleDelete
  }
}
