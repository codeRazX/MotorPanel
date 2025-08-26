import Heading from "@/components/ui/Heading";
import InputSearch from "@/components/ui/InputSearch";
import ButtonTo from "@/components/ui/ButtonTo";
import { deleteService, getServices } from "@/api/servicesApi";
import ServiceList from "@/components/services/ServiceList";
import SkeletonLists from "@/components/ui/skeletons/SkeletonLists";
import ConfirmDelete from "@/components/ui/ConfirmDelete";
import { useMemo } from "react";
import { capitalizeName, keyDelete } from "@/utils/index";
import { useDeleteItem } from "@/hooks/useDeleteItem";
import useFetchingDataWithPagination from "@/hooks/useFetchingDataWithPagination";
import Pagination from "@/components/ui/Pagination";
import type { ServiceDashboardType } from "@/types/service";


export default function ServicesPage() {

  const {data:services, totalPages, isLoading, page, search} = useFetchingDataWithPagination<ServiceDashboardType>({
    queryKey: 'services',
    getFn: getServices
  })
  
  const {itemId:serviceId, handleDelete} = useDeleteItem({
    mutationFn: deleteService, invalidateQuery: 'services'
  })
  
  const dataClient = useMemo(() => {
    if (serviceId && services){
      const service= services.find(e => e._id === serviceId)
      return {client: service?.client.slug, vehicle: service?.vehicle}
    }
  }, [serviceId, services])
  

  return (
    <>
      <div>
        <Heading 
          title="Servicios"
          subtitle="Consulta aquí todos todos los trabajos realizados,"
          action="detalles al alcance de un clic"
        />

        <nav className="mt-5 flex flex-col md:flex-row gap-5 md:items-center">
          <ButtonTo path="/" value="Volver"/>
          <ButtonTo path="/services/create" value="Crear Servicio"/>
          <InputSearch placeholder="Filtra servicios por: cliente, vehículo, empleado, estado y total" path="/services" search={search}/> 
        </nav>
      </div>

      {isLoading ? <SkeletonLists /> : services && totalPages !== undefined && (
        services.length ? (
          <>
          <ul className="mt-10 list-none flex flex-col divide divide-y divide-neutral-200 pb-20 ">
            {services.map(service => (
              <ServiceList key={service._id} service={service}/>
            ))}
          </ul>
          <ConfirmDelete 
            title="Eliminar servicio" 
            description ={`Esta acción eliminará permanentemente el servicio al cliente "${ dataClient?.client}", vehículo "${capitalizeName( dataClient?.vehicle)}".`}
            keyConfirm={keyDelete.service}
            mutationDelete={handleDelete}
          />
          <Pagination totalPages={totalPages} currentPage={page}/>
          </>
        ) : search ? <p className="mt-10 text-center text-lg font-bold break-words text-red-500">Ups, no encontramos nada que coincida. Prueba con otros términos o resetea los filtros</p> : <p className="mt-10 text-center text-lg font-bold break-words">No hay servicios registrados</p>
      )}

    </>
  )
}
