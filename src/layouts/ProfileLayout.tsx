import { Link, Outlet } from "react-router-dom";
import { UserIcon, FingerPrintIcon } from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";
import ButtonTo from "@/components/ui/ButtonTo";



export default function ProfileLayout() {
  const location = useLocation()
 
   return (
    <>
    <div className="my-10">
      <ButtonTo path='/' value="Volver"/>
    </div>

    <div className=" flex flex-col md:flex-row shadow-md mb-10">
      <nav className=" md:basis-60 md:border-r md:border-gray-900/5 bg-gradient-to-r from-cyan-50 to-cyan-100 ring-1 ring-gray-900/5">

        <ul className="divide-y divide-slate-200">
          <li className={`flex gap-2 items-center pl-3 py-4 md:py-3 ${location.pathname === '/profile'? 'bg-cyan-200' : ''}`}>
            <UserIcon className="size-5 text-cyan-800" />
            <Link className="text-gray-900 font-medium hover:text-cyan-950 hover:font-bold" to={'/profile'}>Mi perfil</Link>
          </li>

            <li className={`flex gap-2 items-center pl-3 py-4 md:py-3 ${location.pathname === '/profile/password'? 'bg-cyan-200' : ''}`}>
            <FingerPrintIcon className="size-5 text-cyan-800" />
            <Link className=" text-gray-900 font-medium hover:text-cyan-950 hover:font-bold" to={'/profile/password'}>Cambiar contraseña</Link>
          </li>
        </ul>
      </nav>
     

      <div className=" flex-1 ring-1 ring-gray-900/5">
        <Outlet /> 
      </div>
    </div>
    
    </>
  )
}
