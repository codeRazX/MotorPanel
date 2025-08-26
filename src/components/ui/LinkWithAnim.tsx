import { Link } from "react-router-dom";

type LinkWithAnimProps = {
  path: string,
  value: string,
  sm?: boolean,
  target?: string
}

export default function LinkWithAnim({path, value, sm= false, target = '_self'} : LinkWithAnimProps) {
  return (
    <Link
      to={path}
      className={`${sm ? 'text-slate-700 text-sm' : 'text-slate-800 text-2-xl'} font-normal break-words capitalize cursor-pointer relative before:content-[''] before:absolute before:left-1/2 before:bottom-0 before:h-[1px] before:w-0 before:bg-slate-800 before:transition-all before:duration-300 before:origin-center hover:before:left-0 hover:before:w-full`}
      target={target}
    >{value}</Link>
  )
}
