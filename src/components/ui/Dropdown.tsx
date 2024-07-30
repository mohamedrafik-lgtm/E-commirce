

// import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
// import { NavLink } from 'react-router-dom'

// export default function AccountDropdownWithaccount() {
//   return (
//     <div className="ml-3">
//       <div className="flex gap-8">
//         <Popover __demoMode>
//           <PopoverButton className="block text-sm/6 font-semibold text-black focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-black">
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
//          </svg>
//           </PopoverButton>
//           <PopoverPanel
//             transition
//             anchor="bottom"
//             className="divide-y divide-white/5 rounded-xl bg-white  text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
//           >
//             <div className="p-3">
//               <div className="rounded-lg py-2 px-3 transition hover:bg-white flex space-x-3" >
//                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
//                   </svg>
//                   <NavLink to={'/Admin'}>
//                 <p className="font-semibold">Manage My Account</p>
//                   </NavLink>
//               </div>

//               <a className="block rounded-lg py-2 px-3 transition hover:bg-white flex space-x-3" href="#">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
//                 </svg>
//                 <p className="font-semibold ">My Order</p>
//               </a>
//               <a className="block rounded-lg py-2 px-3 transition hover:bg-white flex space-x-3" href="#">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
//                 </svg>
//                 <p className="font-semibold">My Reviews</p>
//               </a>
//               <a className="block rounded-lg py-2 px-3 transition hover:bg-white flex space-x-3" href="#">
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
//                 </svg>
//                 <p className="font-semibold">Logout</p>
//               </a>
//             </div>
            
//           </PopoverPanel>
//         </Popover>
        
//       </div>
//     </div>
//   )
// }


import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface DropdownProps {
  options: { label: string, icon: IconProp, path: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className=" font-semibold  inline-flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
      </button>
      <div
        className={`transition-transform duration-300 ease-in-out transform ${
          showDropdown ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg`}
      >
        {options.map((option, index) => (
          <NavLink
            key={index}
            to={option.path}
            className={({ isActive }) =>
              `block px-4 py-2 text-gray-800 flex items-center transition-colors ${
                isActive ? 'bg-gray-100 text-blue-600' : 'hover:bg-gray-100'
              } ${isActive ? 'border-b-2 border-blue-500' : ''}`
            }
            onClick={() => setShowDropdown(false)}
          >
            <FontAwesomeIcon icon={option.icon} className="mr-2" />
            {option.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;






