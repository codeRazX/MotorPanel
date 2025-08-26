import DropdownMenu from "../ui/DropdownMenu";
import { useMemo } from "react";
import { translationRole, updatedQueryUrl } from "@/utils/index";
import type { EmployeDashboardType } from "@/types/employee";
import { Link, useLocation } from "react-router-dom";

type EmployeeListProps = {
  employee: EmployeDashboardType;
};

export default function EmployeeList({ employee }: EmployeeListProps) {

  const location = useLocation()
  const navItemsMenu = useMemo(() => {
  return [
    {key: `view-${employee._id}`, href: `/employees/${employee._id}`, textContent: 'Ver empleado'},
    {key: `edit-${employee._id}`, href: `/employees/${employee._id}/edit`, textContent: 'Editar empleado'},
    {key: `delete-${employee._id}`, href: updatedQueryUrl('delete', employee._id), textContent: 'Eliminar empleado'}
  ]
}, [employee])

  return (
    <li className="w-full ring-1 ring-cyan-300/5 px-10 pt-10 bg-gradient-to-r from-white to-slate-100 shadow-lg">
     
      <Link 
        to={`/employees/${employee._id}`} 
        className="flex flex-col gap-5"
        state={{from: location.pathname + location.search}}
      >
        <div className="pb-5 flex flex-col gap-2">
          <p className="text-2xl font-bold text-slate-700">
            Empleado:{" "}
            <span className="text-slate-800 text-2-xl font-normal break-words">{employee.slug}</span>
          </p>
          <p className="text-medium font-bold text-slate-700">
            Cargo:{" "}
            <span className="text-slate-800 text-base font-normal break-words capitalize">
              {translationRole[employee.role]}
            </span>
          </p>
          
            <span className={`text-white font-bold break-words ${employee.available? 'bg-lime-500' : 'bg-red-400'} rounded shadow px-5 py-1 text-lg text-center max-w-max mt-2`}>
              {employee.available ? 'Disponible' : 'Ocupado'}
            </span>        
        </div>
      </Link>

      <DropdownMenu items={navItemsMenu} />
    </li>
  );
}
