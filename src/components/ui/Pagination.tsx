import { useMemo } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/20/solid"
import { ellipticalPagination, updatedQueryUrl } from "@/utils/index"

type PaginationProps = {
  totalPages: number,
  currentPage: number
}

export default function Pagination({totalPages, currentPage} : PaginationProps ) {
  const navigate = useNavigate()
  const pages = useMemo(() => ellipticalPagination(currentPage, totalPages), [currentPage, totalPages]) 


  return (
    <div className="w-max mx-auto flex gap-1 h-12">

      {+currentPage > 1 && (
        <ChevronLeftIcon 
          className="rounded-full px-4 py-2 text-sm text-slate-900 ring-inset ring-1 ring-slate-300 cursor-pointer size-12 bg-gradient-to-r from-cyan-50 to-cyan-100"
          onClick={() => navigate(updatedQueryUrl('page', +currentPage - 1))}
        />
      )}

      {pages.map((page, index) => (  
        page === '...' ? 
          (
            <span className="px-5 h-full text-sm text-gray-900 ring-1 ring-inset shadow ring-slate-300 rounded-full font-medium flex items-center bg-gradient-to-r from-cyan-50 to-cyan-100">{page}</span>
          ) : 
          (
            <Link
              key={`${page}-${index}`}
              to={updatedQueryUrl('page', page)}
              className={`px-5 h-full text-sm text-gray-900 ring-1 ring-inset shadow ring-slate-300 rounded-full font-medium flex items-center ${+currentPage === page? 'bg-cyan-200' : 'bg-gradient-to-r from-cyan-50 to-cyan-100'}`}
            >{page}</Link>
          )
        ))}

       {+currentPage < totalPages && (
        <ChevronRightIcon 
          className="rounded-full px-4 py-2 text-sm text-black ring-inset ring-1 ring-slate-300 cursor-pointer size-12 bg-gradient-to-r from-cyan-50 to-cyan-100"
          onClick={() => navigate(updatedQueryUrl('page',+currentPage + 1))}
        />
      )}
      
    </div>
  )
}
