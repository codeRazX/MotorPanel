

export default function ErrorMsg ({children}: {children: React.ReactNode}) {
  
  return (
    <p className=" text-center text-red-500 font-bold uppercase text-sm">{children}</p>
  )
}