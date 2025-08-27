

export default function Spinner() {
  return (
    <div className="h-screen flex justify-center items-center bg-neutral-100">
      <div className="border-4 border-slate-400 rounded-full size-20 mx-auto relative animate-bounce ">
        <div className="border-3 border-b-0 border-l-0 border-cyan-500 rounded-full size-20 animate-spin absolute top-1/2 left-1/2 -translate-1/2"></div>
      </div>
    </div>
  )
}