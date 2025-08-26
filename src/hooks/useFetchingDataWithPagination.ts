import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useHandleQueryError from "./useHandleQueryError";
import { useEffect } from "react";

import { deleteParamsUrl } from "../utils";

type PaginationHookType<T>= {
  queryKey: string;
  getFn: (page: number | null, search: string | null) => Promise<{data: T[], count: number; limit: number }>;
};

export default function useFetchingDataWithPagination<T>({queryKey, getFn} : PaginationHookType<T>) {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page") || 1) 
  const search = searchParams.get('search')

  const {data, isError, isLoading, error} = useQuery({
    queryKey: [queryKey, page, search],
    queryFn: async () => {
      const {count, limit, data} = await getFn(page , search)
      const totalPages = Math.ceil(count / limit)
      return {
        data,
        totalPages
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000
  })


  useEffect(() => {
    if (data && (page < 1 || page > data.totalPages)) {
      setSearchParams( deleteParamsUrl(searchParams, 'page'), {replace: true})
    }
  }, [data, page, setSearchParams, searchParams]);
   
  useHandleQueryError(isError,error)
  return {
    page: page,
    isLoading,
    data : data?.data,
    totalPages: data?.totalPages,
    search
  }
}
