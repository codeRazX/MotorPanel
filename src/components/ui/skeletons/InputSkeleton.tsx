

export default function InputSkeleton() {
  return (
    <div className="flex flex-col gap-3"> 
      <div className="w-1/3 h-5 bg-neutral-300 animate-pulse"></div>
      <div className="h-10 bg-neutral-300 rounded w-full mx-auto animate-pulse"></div>
    </div>
  )
}
