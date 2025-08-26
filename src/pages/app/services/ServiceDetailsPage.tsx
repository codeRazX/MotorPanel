import { getServiceById } from "@/api/servicesApi";
import ServicesDetails from "@/components/services/ServicesDetails";
import ButtonBack from "@/components/ui/ButtonBack";
import Heading from "@/components/ui/Heading";
import SkeletonDetails from "@/components/ui/skeletons/SkeletonDetails";
import useHandleQueryError from "@/hooks/useHandleQueryError";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";


export default function ServiceDetailsPage() {
  const params = useParams()
  const serviceId = params.serviceId!
 

  const {data, isLoading, error, isError} = useQuery({
    queryKey: ['service', serviceId],
    queryFn: ()=> getServiceById(serviceId),
    retry: false,
  })
 


  useHandleQueryError(isError, error)
  return (
    <div className="max-w-3xl mx-auto">
      <div>
        <Heading
          title="Detalles Servicio"
          subtitle="Toda la información sobre tu servicio,"
          action="consulta los datos y añade notas relevantes"
        />

        <nav className="mt-5 flex flex-col md:flex-row gap-5 md:items-center">
          <ButtonBack path="/services" />
        </nav>

        {isLoading ? <SkeletonDetails />: (
          <ServicesDetails service={data!}/>
        )}

      </div>
    </div>
  );
}
