import { useMemo } from "react";
import DropdownMenu from "../ui/DropdownMenu";
import type { ClientSchemaType } from "@/types/client";
import { updatedQueryUrl } from "@/utils/index";
import { useLocation, Link } from "react-router-dom";

type ClientListProps = {
  client: ClientSchemaType;
};

export default function ClientList({ client }: ClientListProps) {
  
  const location = useLocation()
  const navItemsMenu = useMemo(() => {
    return [
      {key: `view-${client._id}`, href: `/clients/${client._id}`, textContent: 'Ver cliente'},
      {key: `edit-${client._id}`, href: `/clients/${client._id}/edit`, textContent: 'Editar cliente'},
      {key: `delete-${client._id}`, href: updatedQueryUrl('delete', client._id), textContent: 'Eliminar cliente'}
    ]
  }, [client])

  return (
    <li className="w-full ring-1 ring-cyan-300/5 px-10 pt-10 bg-gradient-to-r from-white to-slate-100 shadow-lg">
      <Link 
        to={`/clients/${client._id}`} 
        className="flex flex-col gap-5"
        state={{from: location.pathname + location.search}}
      >
        <div className="pb-5 flex flex-col gap-2">
          <p className="text-2xl font-bold text-slate-700">
            Cliente:{" "}
          <span className="text-slate-800 text-2-xl font-normal break-words ">{client.slug}</span>
          </p>
          <p className="text-medium font-bold text-slate-700">
            Servicios totales:{" "}
            <span className="text-slate-800 text-base font-normal break-words capitalize">
              {client.services.length}
            </span>
          </p>

          <span
            className={`text-white font-bold break-words ${
              client.regularCustomer ? "bg-lime-500" : "bg-cyan-500"
            } rounded shadow px-5 py-1 text-lg text-center max-w-max mt-2`}
          >
            Habitual: {' '}{client.regularCustomer ? 'Si' : 'No'}
          </span>
        </div>
      </Link>

      <DropdownMenu items={navItemsMenu} />
    </li>
  );
}
