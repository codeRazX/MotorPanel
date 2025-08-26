import { Outlet } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import NavMenu from "@/components/ui/NavMenu";
import Logo from "@/components/ui/Logo";
import useAuthentication from "../hooks/useAuthentication";
import SkeletonLayout from "@/components/ui/skeletons/SkeletonLayoutApp";

export default function AppLayout() {

  const {data, isLoading} = useAuthentication()
  if (isLoading) return <SkeletonLayout />
  
  if (data) return (
    <>
      <header className="bg-gradient-to-l from-slate-600 via-slate-800 to-slate-700 shadow-xl py-10">
        <div className="max-w-screen-xl w-11/12 mx-auto flex flex-col items-center justify-between md:flex-row gap-5">
          <div className="w-72">
            <Link to={'/'}>
              <Logo />
            </Link>
          </div>
          <NavMenu name={data.name}/>
        </div>
      </header>

      <main className="mt-10 max-w-screen-xl w-11/12 mx-auto">
        <Outlet />
      </main>

      <footer className="py-10 w-full">
        <p 
        className="text-center font-light text-neutral-500 text-sm"
        >&copy;{new Date().getFullYear()} MotorPanel; Desarrollado por{' '}
          <Link 
          className="font-bold hover:text-neutral-600"
          to={'https://github.com/codeRazX'}
          target="_blank"
          rel="noopener noreferrer"
          >coderazX</Link>
        </p>
      </footer>

      <ToastContainer 
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        transition={Slide}
        theme="colored"
        hideProgressBar={true}
      />
    </>

   
  )
}
