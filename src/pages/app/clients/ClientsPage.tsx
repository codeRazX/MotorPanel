import { deleteClient, getClients } from "@/api/clientsApi";
import ClientList from "@/components/clients/ClientList";
import ButtonTo from "@/components/ui/ButtonTo";
import Heading from "@/components/ui/Heading";
import InputSearch from "@/components/ui/InputSearch";
import SkeletonLists from "@/components/ui/skeletons/SkeletonLists";
import { keyDelete } from "@/utils/index";
import { useMemo } from "react";
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import { useDeleteItem } from "@/hooks/useDeleteItem";

import Pagination from "@/components/ui/Pagination";
import useFetchingDataWithPagination from "@/hooks/useFetchingDataWithPagination";
import type { ClientSchemaType } from "@/types/client";

export default function ClientsPage() {

  const {data:clients, totalPages, isLoading, page, search} = useFetchingDataWithPagination<ClientSchemaType>({
    queryKey: 'clients',
    getFn: getClients
  })

  const {itemId:clientId, handleDelete} = useDeleteItem({
    mutationFn: deleteClient, invalidateQuery: 'clients'
  })

  const client = useMemo(() => {
    if (clientId && clients){
      return clients.find(e => e._id === clientId)?.slug
    }
  }, [clientId, clients])


  return (
    <>
      <div>
        <Heading
          title="Clientes"
          subtitle="El sistema gestiona automáticamente los datos de tus clientes al registrar servicios,"
          action="consulta o edita su información fácilmente desde esta página"
        />

        <nav className="mt-5 flex flex-col md:flex-row gap-5 md:items-center">
          <ButtonTo path="/" value="Volver" />
          <InputSearch placeholder="Filtra clientes por: nombre, número de contacto y vehículos" path="/clients" search={search}/>
        </nav>
      </div>

      {isLoading  ? <SkeletonLists /> : clients && totalPages !== undefined && (
        clients.length > 0 ? (
          <>
          <ul className="mt-10 list-none flex flex-col divide divide-y divide-neutral-200 pb-20 ">
            {clients.map(client => (
              <ClientList key={client._id} client={client}/>
            ))}
          </ul>

          <ConfirmDelete 
            title="Eliminar cliente" 
            description ={`Esta acción eliminará permanentemente al cliente "${client}" y los servicios a los que estuviera asociado.`}
            keyConfirm={keyDelete.client}
            mutationDelete={handleDelete}
          />
          <Pagination totalPages={totalPages} currentPage={page}/>
        </>
        ) : search ? <p className="mt-10 text-center text-lg font-bold break-words text-red-500">Ups, no encontramos nada que coincida. Prueba con otros términos o resetea los filtros</p> : <p className="mt-10 text-center text-lg font-bold break-words">No hay clientes registrados</p>
      )}
    </>
  )
  
}
