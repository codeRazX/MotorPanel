
type HeadingProps = {
  title: string,
  subtitle: string,
  action?: string
}


export default function Heading ({title, subtitle, action}: HeadingProps) {

  return (
    <div className="text-center md:text-left">
      <h1 className="text-5xl font-black break-words">{title}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5 break-words">
          {subtitle}  {" "}
          <span className=" text-cyan-500 font-bold">{action}</span>
      </p>
    </div>
  )
}

