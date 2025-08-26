import {Popover, PopoverButton, PopoverPanel, Transition} from '@headlessui/react'
import { CogIcon, UserIcon, HomeIcon, PowerIcon  } from '@heroicons/react/20/solid'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logoutFetching } from '@/api/authApi'
import type { UserType } from '@/types/index'

type NavMenuProps = {
  name: UserType['name']
}
export default function NavMenu ({name} : NavMenuProps) {
  
  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn: logoutFetching,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user']})
    }
  })


  return (
    
    <Popover className='relative'>
     {({open, close}) => (
      <>
      <PopoverButton className={`transition-transform duration-300 hover:scale-110 p-1 rounded-lg bg-cyan-500 cursor-pointer hover:bg-cyan-600 ${open? 'rotate-[360deg]' : ''}`}>
        <CogIcon className='size-10 text-white' />
      </PopoverButton>
        
    
      <Transition
         as={Fragment}
          enter="transition ease-out duration-300 transform"
          enterFrom="opacity-0 scale-0"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-200 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-0"
      >
        <PopoverPanel className='absolute left-1/2 z-10 mt-5 flex w-[95vw] md:w-max -translate-x-1/2 md:-translate-x-48'>
          <div className='w-full md:w-56 rounded-xl bg-gradient-to-r from-cyan-50 to-cyan-100 p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5 divide-y divide-neutral-200'>
            <p className='text-center pb-2 text-cyan-950 font-bold break-word'>{name}</p>
           
            <div className='flex flex-col items-start gap-2'>
              <Link
                to='/profile'
                className=' p-2 hover:text-cyan-950 hover:font-bold flex gap-2 items-center hover:bg-cyan-100 w-full'
                onClick={() => close()}
              >
                 <UserIcon className='w-5 h-5 text-cyan-800' />
                Perfil
              </Link>
              <Link
                to='/'
                className=' p-2 hover:text-cyan-950 hover:font-bold flex gap-2 hover:bg-cyan-100 w-full'
                onClick={() => close()}
              >
                <HomeIcon  className='w-5 h-5 text-cyan-800'/>
                Inicio
              </Link>
              <button
                className=' p-2 hover:text-cyan-950 cursor-pointer hover:font-bold flex gap-2 hover:bg-cyan-100 w-full'
                type='button'
                onClick={()=> mutate()}
              >
                <PowerIcon  className='w-5 h-5 text-cyan-800'/>
                Cerrar sesión
              </button>
            </div>
          </div>
        </PopoverPanel>
      </Transition>
      </>
     )}
    </Popover>
  )
}