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
    <div className="relative inline-block " ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className=" font-semibold  inline-flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
      </button>
      <div
        style={{
          border: '1px solid',
          borderRadius: '15px',
        }} 
        className={`z-50 transition-transform bg-white/5 backdrop-blur-xl duration-300 ease-in-out transform ${
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