
export default function SkeletonLayout() {

  return (
   <>
      <header className="bg-slate-800 py-5 animate-pulse">
        <div className="max-w-screen-xl w-11/12 mx-auto flex flex-col items-center justify-between md:flex-row p-5">
          <div className="w-56 h-18 bg-slate-700 rounded" />
          <div className="size-12 bg-slate-700 rounded mt-4 md:mt-0" />
        </div>
      </header>

      <main className="mt-10 max-w-screen-xl w-11/12 mx-auto animate-pulse space-y-4">
        <div className="h-6 bg-neutral-200 rounded w-3/4" />
        <div className="h-6 bg-neutral-200 rounded w-1/2" />
        <div className="h-60 bg-neutral-200 rounded w-full mt-10" />
      </main>

      <footer className="py-10 w-full animate-pulse">
        <div className="h-4 bg-neutral-300 rounded w-1/2 mx-auto" />
      </footer>
    </>
  )
}
