import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

type ButtonToProps = {
  path: string
}

export default function ButtonBack ({path} : ButtonToProps) {

  const location = useLocation()
  const from = location.state?.from || path

  return (
    <Link
      to={from.includes(path) ? from : path}
      className="py-3 px-5 bg-gradient-to-tl from-cyan-500 via-cyan-600 to-cyan-700 hover:contrast-125 text-white font-extrabold capitalize cursor-pointer text-xl text-shadow-md w-full md:w-auto text-center"
    >Volver</Link>
  )
}