import { Outlet } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import { Link } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";


export default function AuthLayout() {
  const location = useLocation()
  
  return (
   
    <div className="bg-gradient-to-bl from-slate-600 via-slate-800 to-slate-700 min-h-screen pt-10 pb-20">
      <div className="py-5 w-96 mx-auto">
        <Link className="cursor-pointer" to={'/auth/login'}>
          <Logo />
        </Link>
      </div>

      <div className="max-w-md lg:max-w-7xl w-[95%] lg:grid lg:grid-cols-2 mx-auto mt-10 items-start">

        <header className={`hidden lg:flex justify-center items-center ${location.pathname.includes('login') ? 'h-[300px]' : 'h-[600px]'} `}>
          <h1 className="text-6xl font-extrabold hidden leading-16 lg:block text-indigo-500">Inicia Sesión y Administra tu<span className="text-white"> Negocio</span></h1>
        </header>

        <section className="w-full">
          <Outlet />
        </section>
      </div>
    
    <ToastContainer 
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      transition={Slide}
      theme="colored"
      hideProgressBar={true}
    />
    </div>
  )
}
