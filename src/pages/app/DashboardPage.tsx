import DashboardCard from "@/components/dashboard/DashboardCard";
import Heading from "@/components/ui/Heading";

const infoCards = [
  {to: '/services', name: 'Servicios', slug:'servicios', description: 'Administra todos los servicios realizados en el taller. Visualiza información detallada como el número de servicio, cliente, vehículo intervenido, reparaciones realizadas, empleados asignados, costos totales y estado. Lleva un seguimiento claro y organizado de cada intervención desde su creación hasta su finalización.'},
  {to: '/clients', name: 'Clientes', slug:'clientes', description: 'Consulta y administra la información de tus clientes: datos de contacto, historiales de servicios, y preferencias.'},
  {to: '/employees', name: 'Empleados', slug:'empleados', description: 'Visualiza y organiza los datos de tu equipo. Mantén el control y mejora la eficiencia del taller.'}
]

export default function DashboardPage() {
  
  return (
    <>
      <Heading 
        title="Tu centro de operaciones"
        subtitle="Toda la información que necesitas,"
        action="comienza a gestionar tu taller ahora"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
        {infoCards.map(card => (
         <DashboardCard card={card} key={card.name}/>
        ))}
      </div>
    </>
  )
}
