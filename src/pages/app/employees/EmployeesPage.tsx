import { useMemo } from "react";
import { deleteEmployee, getEmployees } from "@/api/employeApi";
import EmployeeList from "@/components/employees/EmployeeList";
import ButtonTo from "@/components/ui/ButtonTo";
import Heading from "@/components/ui/Heading";
import InputSearch from "@/components/ui/InputSearch";
import SkeletonLists from "@/components/ui/skeletons/SkeletonLists";
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import { keyDelete } from "@/utils/index";
import { useDeleteItem } from "@/hooks/useDeleteItem";
import Pagination from "@/components/ui/Pagination";
import useFetchingDataWithPagination from "@/hooks/useFetchingDataWithPagination";
import type { EmployeDashboardType } from "@/types/employee";



export default function EmployeesPage() {
  
  const {data:employees, totalPages, isLoading, page, search} = useFetchingDataWithPagination<EmployeDashboardType>({
    queryKey: 'employees',
    getFn: getEmployees
  })
  
  const {itemId:employeeId, handleDelete} = useDeleteItem({
    mutationFn: deleteEmployee, invalidateQuery: 'employees'
  })

  const employee = useMemo(() => {
    if (employeeId && employees){
      return employees.find(e => e._id === employeeId)?.slug
    }
  }, [employeeId, employees])
  
  
  return (
    <>
    <div>
      <Heading
        title="Empleados"
        subtitle="Gestiona y consulta la información de tu equipo,"
        action="registra, edita o revisa sus detalles fácilmente"
      />

      <nav className="mt-5 flex flex-col md:flex-row gap-5 md:items-center">
        <ButtonTo path="/" value="Volver" />
        <ButtonTo path="/employees/create" value="Crear Empleado" />
        <InputSearch placeholder="Filtra empleados por: nombre, número de contacto, disponibilidad, puesto, salario y productividad" path="/employees" search={search}/>
       
      </nav>
    </div>

    {isLoading ? <SkeletonLists /> : employees && totalPages !== undefined && (
      employees.length > 0 ? (
        <>
          <ul className="mt-10 list-none flex flex-col divide divide-y divide-neutral-200 pb-20 ">
            {employees.map(employee => (
              <EmployeeList key={employee._id} employee={employee}/>
            ))}
          </ul>

          <ConfirmDelete 
            title="Eliminar empleado" 
            description ={`Esta acción eliminará permanentemente al empleado "${employee}" y actualizará los servicios a los que estuviera asociado.`}
            keyConfirm={keyDelete.employee}
            mutationDelete={handleDelete}
          />
          <Pagination totalPages={totalPages} currentPage={page}/>
        </>
      ) : search ? <p className="mt-10 text-center text-lg font-bold break-words text-red-500">Ups, no encontramos nada que coincida. Prueba con otros términos o resetea los filtros</p> : <p className="mt-10 text-center text-lg font-bold break-words">No hay empleados registrados</p>
    )}
  
  </>
  )
}
