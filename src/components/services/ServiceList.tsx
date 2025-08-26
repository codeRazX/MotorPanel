import { capitalizeLetter, formatDate, updatedQueryUrl } from "@/utils/index";
import { labelStatusService } from "@/utils/index";
import type { ServiceDashboardType } from "@/types/index";
import { useMemo } from "react";
import DropdownMenu from "../ui/DropdownMenu";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

type ServiceListProps = {
  service: ServiceDashboardType;
};

export default function ServiceList({ service }: ServiceListProps) {
  
  const location = useLocation()
  const navItemsMenu = useMemo(() => {
    return [
      {key: `view-${service._id}`, href: `/services/${service._id}`, textContent: 'Ver servicio'},
      {key: `edit-${service._id}`, href: `/services/${service._id}/edit`, textContent: 'Completar servicio'},
      {key: `delete-${service._id}`, href: updatedQueryUrl('delete', service._id), textContent: 'Eliminar servicio'}
    ]
  }, [ service])

  return (
    <>
    <li className="w-full ring-1 ring-cyan-300/5 px-10 bg-gradient-to-r  from-white to-slate-100 shadow-lg">
      <Link 
        to={`/services/${service._id}`} 
        className="flex flex-col gap-5"
        state={{from: location.pathname + location.search}}
      >
        <div className="text-sm text-gray-400 mt-5">
          <p>Registrado: {formatDate(service.createdAt)}</p>
          <p>Ultima actualización: {formatDate(service.updatedAt)}</p>
        </div>

        <div>
          <span
            className={`${
              labelStatusService[service.status].backgroundColor
            } p-2 px-5 text-white font-bold rounded-sm shadow-sm`}
          >
            {labelStatusService[service.status].translation}
          </span>
        </div>

        <div className="pb-5 flex flex-col gap-2">
          <p className="text-2xl font-bold text-slate-700">
            Cliente:{" "}
            <span className="text-slate-800 text-2xl font-normal break-words">
              {service.client.slug}
            </span>
          </p>
          <p className="text-medium font-bold text-slate-700">
            Vehículo:{" "}
            <span className="text-slate-800 text-base font-normal break-words capitalize">
              {service.vehicle}
            </span>
          </p>
          <p className="text-medium font-bold text-slate-700">
            Observaciones:{" "}
            <span className="text-slate-800 text-base font-normal break-words">
              {capitalizeLetter( service.symptoms )}
            </span>
          </p>
        </div>
      </Link>
        <DropdownMenu items={navItemsMenu}/>
    </li>

    </>
  );
}
