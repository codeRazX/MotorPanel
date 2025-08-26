import { getEmployeeById } from "@/api/employeApi";
import Heading from "@/components/ui/Heading";
import useHandleQueryError from "@/hooks/useHandleQueryError";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import EmployeeDetails from "@/components/employees/EmployeeDetails";
import SkeletonDetails from "@/components/ui/skeletons/SkeletonDetails";
import ButtonBack from "@/components/ui/ButtonBack";


export default function EmployeeDetailsPage() {

  const params = useParams()
  const employeeId = params.employeeId!
 

  const {data, isLoading, error, isError} = useQuery({
    queryKey: ['employee', employeeId],
    queryFn: ()=> getEmployeeById(employeeId),
    retry: false
  })
 

  useHandleQueryError(isError, error)
  return (
    <div className="max-w-3xl mx-auto">
      <div>
        <Heading
          title="Detalles Empleado"
          subtitle="Toda la información sobre tu empleado,"
          action="consulta los datos y añade notas relevantes"
        />

        <nav className="mt-5 flex flex-col md:flex-row gap-5 md:items-center">
          <ButtonBack path="/employees" />
        </nav>

        {isLoading ? <SkeletonDetails />: (
          <EmployeeDetails employee={data!}/>
        )}

      </div>
    </div>
  );
}
