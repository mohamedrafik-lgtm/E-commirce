import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    <div className="relative inline-block " ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className=" font-semibold  inline-flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
           <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>

      </button>
      <div
        style={{
          // border: '1px solid',
          borderRadius: '15px',
        }} 
        className={`z-50 transition-transform !bg-gray-600/25 backdrop-blur-xl text-white duration-300 ease-in-out transform ${
          showDropdown ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} absolute right-0 mt-2 w-48 bg-white rounded-lg`}
      >
        {options.map((option, index) => (
          <NavLink
            key={index}
            to={option.path}
            className={
              ` px-4 py-2 flex items-center transition-colors !border-b-0`
            }
            onClick={() => {
              setShowDropdown(false)
              if(option.label === "log out"){
                localStorage.removeItem('loginData');
              }
            } }
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