import InputSkeleton from "./InputSkeleton";

export default function SkeletonServiceEdit() {
  return (
    <div className="space-y-5 bg-neutral-200 w-full animate-pulse h-max p-10 mt-10">
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <div className="flex flex-col gap-3"> 
        <div className="bt-neutral-300 w-1/3 h-5 bg-neutral-300 animate-pulse"></div>
        <div className="h-20 bg-neutral-300 rounded w-full mx-auto animate-pulse"></div>
      </div>
      <div className="h-10 bg-neutral-300 rounded w-full mx-auto animate-pulse"></div>
    </div>
  )
}
