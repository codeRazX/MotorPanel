import type { ServiceType } from "@/types/service"
import FieldDetails from "../ui/FieldDetails"
import { capitalizeLetter, formatCurrency, formatDate, labelStatusService, translationTypeRepairs } from "@/utils/index"
import LinkWithAnim from "../ui/LinkWithAnim"
import { useState } from "react"
import FieldDetailslLabelList from "../ui/FieldDetailslLabelList"
import CreateNotes from "../Notes/CreateNotes"
import NoteList from "../Notes/NoteList"


type ServiceDetailsProps = {
  service: ServiceType
}

export default function ServicesDetails({service}: ServiceDetailsProps) {
  
  const [showEmployees, setShowEmployees] = useState(false)
  const [showRepairs, setShowRepairs] = useState(false)
  
  return (
    <div className="my-10 bg-white shadow-lg p-5 xs:p-10 space-y-5 divide-y divide-neutral-200">
      <div className="space-y-2 pb-5">
        <FieldDetails label="Servicio Número" value={service.serviceNumber.toString()} capitalize={false}/>
        <FieldDetails label="Registrado" value={formatDate(service.createdAt)} capitalize={false}/>
        <FieldDetails label="Última actualización" value={formatDate(service.updatedAt)} capitalize={false}/>
        <FieldDetails label="Fecha finalización" value={service.dateCompleted ? formatDate(service.dateCompleted) : 'A la espera de completar el servicio'} capitalize={false}/>
        <FieldDetails label="Estado" value={labelStatusService[service.status].translation}/>
      </div>

      <div className="space-y-2 pb-5">
        <FieldDetailslLabelList show={showEmployees} setShow={setShowEmployees} label="Listado empleados"/>
        {showEmployees && (
          service.employees.length > 0 ? (
              <ol className=" list-disc list-inside marker:text-slate-500 flex flex-col gap-2 max-h-56 bg-neutral-100 w-full mt-5 p-5 rounded overflow-x-hidden overflow-y-auto">
              {service.employees.map((employee) => (
                <li key={employee._id}>
                  <LinkWithAnim
                    value={employee.slug || ''}
                    path={`/employees/${employee._id}`}
                    sm={true}
                    target="_blank"
                  />
                </li>
              ))}
            </ol>
            ) : (
              <p className="text-slate-700 text-sm font-normal">
                Actualmente, este servicio no tiene asignado ningún empleado
              </p>
            )
        )}
       
      </div>

      <div className="space-y-2 pb-5">
        <p className="font-bold text-medium text-slate-700">
            Cliente:{' '}
            <LinkWithAnim
              value={service.client.slug}
              path={`/clients/${service.client._id}`}
              target={'_blank'}
            />
        </p>
        <FieldDetails label="Contacto cliente" value={service.client.contact?.toString() || 'Sin datos'} capitalize={false}/>
        <FieldDetails label="Vehículo" value={service.vehicle}/>
        <FieldDetails label="Observaciones" value={service.symptoms} capitalize={false}/>
        <FieldDetailslLabelList show={showRepairs} setShow={setShowRepairs} label="Reparaciones realizadas"/>
        {showRepairs && (
          service.repairs.length ? 
          (
             <div className="overflow-x-auto mt-5 max-h-56 rounded border border-neutral-300">
              <table className="min-w-full bg-neutral-100 text-sm">
                <thead className="sticky top-0 bg-neutral-200 z-10">
                  <tr className="text-slate-700 font-semibold text-left">
                    <th className="py-3 px-4">Descripción</th>
                    <th className="py-3 px-4">Precio</th>
                    <th className="py-3 px-4">Cantidad</th>
                    <th className="py-3 px-4">Tipo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-300">
                  {service.repairs.map((repair, index) => (
                    <tr
                      key={`repair-${index}-${repair.description}`}
                      className="hover:bg-neutral-200 transition-colors"
                    >
                      <td className="py-2 px-4 w-4/5 break-words text-slate-700 text-left">{capitalizeLetter(repair.description)}</td>
                      <td className="py-2 px-4 text-slate-700 text-center">{formatCurrency( repair.price )}</td>
                      <td className="py-2 px-4 text-slate-700 text-center">x{repair.quantity}</td>
                      <td className="py-2 px-4 text-slate-700 text-left">{translationTypeRepairs[repair.type]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
          ) 
          : 
          (
            <p className="text-slate-700 text-sm font-normal">A la espera de completar el servicio y asignar las repaciones</p>
          )
        )}
      </div>

      <div className="space-y-2 pb-5">
        <FieldDetails label="IVA aplicado" value={service.status === 'completed' ? service.vat.toString()+"%" : 'A la espera de completar el servicio y asignar el IVA'} capitalize={false}/>
        <FieldDetails label="Importe total" value={service.status === 'completed' && service.total ? formatCurrency(+service.total.toFixed(2)) : 'A la espera de completar el servicio y calcular el total'} capitalize={false}/>
        <FieldDetails label="Importe con IVA" value={service.status === 'completed' && service.total? formatCurrency(+(service.total * (1 + Number(service.vat) / 100)).toFixed(2)) : 'A la espera de completar el servicio y calcular el total con IVA aplicado'} capitalize={false}/>
      </div>

      <div>
        <p className="text-2xl font-bold text-slate-700">
          Notas{" "}
        </p>

        <CreateNotes model="service" itemId={service._id}/>
        {service.notes.length > 0 && 
          <ol className="mt-5 flex flex-col gap-5 list-none">
            {service.notes.map((note, index) => (
              <NoteList key={note._id + index} note={note} itemId={service._id} model="service"/>
            ))}
          </ol>
        }
      </div>
    </div>
  )
}
