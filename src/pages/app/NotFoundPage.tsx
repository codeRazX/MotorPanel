import ButtonTo from "@/components/ui/ButtonTo";
import Logo from "@/components/ui/Logo";



export default function NotFoundPage() {
  return (
    <div className="bg-gradient-to-bl from-slate-600 via-slate-800 to-slate-700 min-h-screen pt-10 pb-20">

      <div className="py-5 w-96 mx-auto">
        <Logo />
      </div>

      <div className="p-10 flex flex-col gap-5 max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-black break-words text-gray-100">404 - Página no encontrada</h1>
        <p className="text-2xl font-light text-gray-500 mt-5 break-words">
          Oops... la ruta no existe,{" "}
          <span className=" text-cyan-500 font-bold">quizás quieras</span>
        </p>
        <div className="mt-5 md:mx-auto flex flex-col">
          <ButtonTo path="/" value="Regresar"/>
        </div>
      </div>
    </div>
  )
}
