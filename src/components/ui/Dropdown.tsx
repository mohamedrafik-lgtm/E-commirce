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
        className={`z-50 transition-transform duration-300 ease-in-out transform ${
          showDropdown ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg`}
      >
        {options.map((option, index) => (
          <NavLink
            key={index}
            to={option.path}
            className={({ isActive }) =>
              ` px-4 py-2 text-gray-800 flex items-center transition-colors ${
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