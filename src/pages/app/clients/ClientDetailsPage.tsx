import { getClientById } from "@/api/clientsApi";
import ClientDetails from "@/components/clients/ClientDetails";
import ButtonBack from "@/components/ui/ButtonBack";
import Heading from "@/components/ui/Heading";
import SkeletonDetails from "@/components/ui/skeletons/SkeletonDetails";
import useHandleQueryError from "@/hooks/useHandleQueryError";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";


export default function ClientDetailsPage() {
  const params = useParams()
  const clientId = params.clientId!
 

  const {data, isLoading, error, isError} = useQuery({
    queryKey: ['client', clientId],
    queryFn: ()=> getClientById(clientId),
    retry: false
  })
 

  useHandleQueryError(isError, error)
  return (
    <div className="max-w-3xl mx-auto">
      <div>
        <Heading
          title="Detalles Cliente"
          subtitle="Toda la información sobre tu cliente,"
          action="consulta los datos y añade notas relevantes"
        />

        <nav className="mt-5 flex flex-col md:flex-row gap-5 md:items-center">
          <ButtonBack path="/clients" />
        </nav>

        {isLoading ? <SkeletonDetails />: (
          <ClientDetails client={data!}/>
        )}

      </div>
    </div>
  );
}
