import {Menu, MenuButton, MenuItem, MenuItems, Transition} from "@headlessui/react";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { Bars3Icon, TrashIcon, PencilSquareIcon, DocumentTextIcon } from "@heroicons/react/20/solid";
import { useLocation } from "react-router-dom";

type DropdownMenuProps = {
  items : {
    key: string;
    href: string;
    textContent: string;
  }[]
}

const renderIcons = (key:string) => {
  if (key.includes('view')){
    return <DocumentTextIcon className="size-5 text-cyan-800" />
  }
  else if (key.includes('edit')){
    return <PencilSquareIcon className="size-5 text-cyan-800" />
  }
  else if (key.includes('delete')){
    return <TrashIcon className="size-5 text-cyan-800" />
  }
}


export default function DropdownMenu({items} : DropdownMenuProps) {
  const location = useLocation()

  return (
    <Menu as="div" className="relative mb-2 text-right">
      <MenuButton className="cursor-pointer ">
        {({ active }) => (
          <>
            <span className="sr-only">Opciones</span>
            <Bars3Icon
              className={`size-10 text-slate-500 ${
                active ? "rotate-90 scale-110 text-slate-700" : ""
              } transition-transform duration-300 `}
            />
          </>
        )}
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-75"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-75"
      >
        <MenuItems className="absolute right-0 z-10 w-56 origin-top-right rounded-md shadow-xl ring-1 ring-gray-900/5 flex flex-col bg-white text-sm font-semibold text-gray-900 divide-y divide-neutral-300 justify-center focus:outline-0">
        
        {items.map(item => (
          <MenuItem key={item.key}>
            <Link 
              className="p-3 hover:text-cyan-950 hover:font-bold hover:bg-cyan-100 flex gap-2"
              to={item.href}  
              state={{from: location.pathname + location.search}}
            >
              {renderIcons(item.key)}
              {item.textContent}
            </Link>
          </MenuItem>
        ))}

        </MenuItems>
      </Transition>
    </Menu>
  );
}
