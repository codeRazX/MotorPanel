import type { ClientType, ClientServicesPopulate } from "@/types/client";
import {  capitalizeLetter, formatCurrency, formatDate } from "@/utils/index";
import { useMemo, useState } from "react";
import LinkWithAnim from "../ui/LinkWithAnim";
import FieldDetails from "../ui/FieldDetails";
import FieldDetailslLabelList from "../ui/FieldDetailslLabelList";
import CreateNotes from "../Notes/CreateNotes";
import NoteList from "../Notes/NoteList";

type ClientDetailsProps = {
  client: ClientType;
};

export default function ClientDetails({ client }: ClientDetailsProps) {

  const totalServices = useMemo(() => {
    return (client.services as ClientServicesPopulate[]).reduce((acc, service) => acc + service.total ,0)
  }, [client])

  const servicesPending = useMemo(() => {
    return (client.services as ClientServicesPopulate[]).filter(service => service.status === 'pending')
  }, [client])

  const [showServicesPending, setServicesPending] = useState(false)

  return (
    <div className="my-10 bg-white shadow-lg p-10 space-y-5 divide-y divide-neutral-200">
      <div className="space-y-2 pb-5">
        <FieldDetails label="Nombre" value={client.slug}/>
        <FieldDetails label="Contacto" value={client.contact ? client.contact.toString() : "No hay datos"} capitalize={false}/>
        <FieldDetails label="Cliente habitual" value={client.regularCustomer ? 'Si' : 'No'}/>
      </div>

      <div className="space-y-2 pb-5">
        <FieldDetails label="Servicios totales" value={client.services.length.toString()}/>
        <FieldDetails label="Último servicio" value={(typeof client.services[0] === 'object' && 'createdAt' in client.services[0] && formatDate( client.services[0].createdAt )) || 'No hay datos'} capitalize={false}/>
       <FieldDetails label=" Total en servicios" value={formatCurrency( totalServices )}/>

        <FieldDetailslLabelList show={showServicesPending} setShow={setServicesPending} label="Servicios pendientes"/>
        {showServicesPending && (
          <ul className="max-h-56 bg-neutral-100 w-full mt-5 p-5 rounded overflow-x-hidden overflow-y-auto divide-y divide-neutral-300">
            {servicesPending.length ? (
              servicesPending.map(service => (
                <li key={service._id} className="space-y-1 py-5 last-of-type:pb-0 first-of-type:pt-0">

                   <p className="font-bold text-sm text-slate-600">
                    Servicio N<sup>o</sup>:{" "}
                    <LinkWithAnim
                        value={service.serviceNumber.toString()}
                        path={`/services/${service._id}`}
                        sm={true}
                        target={'_blank'}
                      />
                  </p>
                  <FieldDetails label="Registrado" value={formatDate(service.createdAt)} capitalize={false} sm={true}/>
                  <FieldDetails label="Vehículo" value={service.vehicle} sm={true}/>
                  <FieldDetails label="Observaciones" value={capitalizeLetter(service.symptoms)} sm={true} capitalize={false}/>
                    <div>
                      <p className="font-bold text-sm text-slate-600">
                        Listado empleados:{" "}
                      </p>
                      {service.employees.length ? (
                        <ol className="list-disc list-inside marker:text-slate-500 flex flex-col gap-2">
                          {service.employees.map((employee) => (
                            <li key={employee._id}>
                              <LinkWithAnim
                                value={employee.slug || ''}
                                path={`/employees/${employee._id}`}
                                sm={true}
                                target={'_blank'}
                              />
                            </li>
                          ))}
                        </ol>
                      ): (<p className="text-slate-700 text-sm font-normal">Actualmente, este servicio no tiene asignado ningún empleado</p>)}
                    </div>
                </li>
              ))
            ) : (
              <li className="text-slate-700 text-sm font-normal">
                No hay ningún servicio pendiente con este cliente
              </li>
            )}
          </ul>
        )}

      </div>

      <div className="space-y-2 pb-5">
        <p className="text-medium font-bold text-slate-700">
          Vehículos:{" "}
        </p>
        {client.vehicles.length ? (
           <ol className="list-disc list-inside marker:text-slate-500 flex flex-col gap-2">
          {client.vehicles.map((vehicle, index) => (
            <li 
              key={`${index}-${vehicle}`}
              className="text-slate-800 text-base font-normal break-words capitalize">
              {vehicle}
            </li>
          ))}
          </ol>

        ) : (
          <p className="text-slate-800 text-base font-normal break-words capitalize">El cliente no tiene ningún vehículo asociado</p>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-700">
          Notas{" "}
        </p>

        <CreateNotes model="client" itemId={client._id}/>
        {client.notes.length > 0 && 
          <ol className="mt-5 flex flex-col gap-5 list-none">
            {client.notes.map((note, index) => (
              <NoteList key={client._id + index} note={note} itemId={client._id} model="client"/>
            ))}
          </ol>
        }
      </div>

      
    </div>
  );
}
