import InputSkeleton from "./InputSkeleton"



export default function SkeletonFormEmployees() {
  return (
    <div className="space-y-5 bg-neutral-200 w-full animate-pulse h-max p-10 mt-10">
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <div className="h-10 bg-neutral-300 rounded w-full mx-auto animate-pulse"></div>
    </div>
  )
}
