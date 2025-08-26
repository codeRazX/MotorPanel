import { useState } from "react";
import type { EmployeeType } from "@/types/employee";
import { capitalizeLetter, formatCurrency, formatDate, labelStatusService, translationProductivity, translationRole } from "@/utils/index";
import LinkWithAnim from "../ui/LinkWithAnim";
import FieldDetails from "../ui/FieldDetails";
import FieldDetailslLabelList from "../ui/FieldDetailslLabelList";
import CreateNotes from "../Notes/CreateNotes";
import NoteList from "../Notes/NoteList";

type EmployeeDetailsProps = {
  employee: EmployeeType
};

export default function EmployeeDetails({ employee }: EmployeeDetailsProps) {

  const [showServices, setShowServices] = useState(false)

  return (
    <div className="my-10 bg-white shadow-lg p-10 space-y-5 divide-y divide-neutral-200">

      <div className="space-y-2 pb-5">
        <FieldDetails label="Registrado" value={formatDate(employee.createdAt)}/>
        <FieldDetails label="Nombre" value={employee.slug}/>
        <FieldDetails label="Contacto" value={employee.contact?.toString() || "No hay datos"} capitalize={false}/>
        <FieldDetails label="Cargo" value={translationRole[employee.role]}/>
      </div>

      <div className="space-y-2 pb-5">
        <FieldDetails label="Fecha de alta" value={employee.hireDate? formatDate(employee.hireDate) : "No hay datos"} capitalize={false}/>
        <FieldDetails label="Salario" value={employee.salary? formatCurrency(employee.salary) : "No hay datos"} capitalize={false}/>
        <FieldDetails label="Productividad" value={translationProductivity[employee.productivity]}/>
        <FieldDetails label="Disponibilidad" value={employee.available ? "Disponible" : "Ocupado"}/>
      </div>

      <div className="space-y-2 pb-5">
        
        <FieldDetailslLabelList show={showServices} setShow={setShowServices} label="Servicio actual"/>
        {showServices && (
          <ul className="max-h-56 bg-neutral-100 w-full mt-5 p-5 rounded overflow-x-hidden overflow-y-auto divide-y divide-neutral-300">
            
            {employee.services.length ? (
              <li className="space-y-1">
                <p className="font-bold text-sm text-slate-600">
                  Servicio N<sup>o</sup>:{" "}
                  <LinkWithAnim
                    value={employee.services[0].serviceNumber.toString()}
                    path={`/services/${employee.services[0]._id}`}
                    sm={true}
                    target={'_blank'}
                  />
                </p>
                <FieldDetails label="Registrado" value={formatDate(employee.services[0].createdAt)} capitalize={false} sm={true}/>
                <FieldDetails label="Estado" value={labelStatusService[employee.services[0].status].translation} sm={true} />
                <p className="font-bold text-sm text-slate-600">
                  Cliente:{" "}
                  <LinkWithAnim
                    value={employee.services[0].client.slug}
                    path={`/clients/${employee.services[0].client._id}`}
                    sm={true}
                    target={'_blank'}
                  />
                </p>

                <FieldDetails label="Vehículo" value={employee.services[0].vehicle} sm={true} />
                <FieldDetails label="Observaciones" value={capitalizeLetter( employee.services[0].symptoms )} sm={true} capitalize={false}/>
              </li>
            ) : (
              <li className="text-slate-700 text-sm font-normal">
                El empleado no está asignado a ningún servicio actualmente
              </li>
            )}
          </ul>
        )}
      </div>

      <div>
        <p className="text-2xl font-bold text-slate-700">
          Notas{" "}
        </p>

        <CreateNotes model="employee" itemId={employee._id}/>
        {employee.notes.length > 0 && 
          <ol className="mt-5 flex flex-col gap-5 list-none">
            {employee.notes.map((note, index) => (
              <NoteList key={note._id + index} note={note} itemId={employee._id} model="employee"/>
            ))}
          </ol>
        }
      </div>
    </div>
  );
}
