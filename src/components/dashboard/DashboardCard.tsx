import { Link } from "react-router-dom";

type DashboardCardProps = {
  card: {
    to: string,
    name: string,
    slug: string,
    description: string
  }
}

export default function DashboardCard({card} : DashboardCardProps) {
  return (
    
    <Link 
      to={card.to}
      className={`shadow-md bg-gradient-to-br from-cyan-800 via-cyan-600 to-cyan-500 ring-1 ring-cyan-300/5 p-10 rounded-lg space-y-5 ${card.slug === 'servicios' ? 'md:row-start-1 md:row-end-3 leading-7' : ''} hover:scale-105 md:hover:scale-110 hover:contrast-150 transition-transform duration-500 relative overflow-hidden`}
      >
    
      <h3 className=" text-neutral-200 text-3xl font-bold">{card.name}</h3>
      <p className="font-light text-neutral-50 text-shadow-2xs break-words">{card.description}</p>
      
      <div className={`hidden sm:block absolute -bottom-8 -right-8 -rotate-30 bg-neutral-100 rounded-full size-25 ${card.slug === 'servicios' ? 'md:size-30 lg:size-40 lg:-right-10 '  : 'xl:size-30'}`}>
        <picture className="w-full aspect-square" role="img" aria-label={`Imagen ${card.name}`}>
          <source srcSet={`/${card.slug}.webp`}/>
          <img src={`/${card.slug}.png`} alt={`Imagen ${card.name}`} className="w-full h-full object-contain" loading="lazy"/>
        </picture>
      </div>
    </Link>
  )
}
