import InputSkeleton from "./InputSkeleton"


export default function SkeletonFormServices() {
  return (
    <div className=" list-none space-y-5 bg-neutral-200 w-full absolute top-0 right-0 h-max p-10 z-20">
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <InputSkeleton />
      <div className="h-10 bg-neutral-300 rounded w-full mx-auto animate-pulse"></div>
    </div>
  )
}
