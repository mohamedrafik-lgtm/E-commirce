// src/components/Sidebar.tsx// src/components/Sidebar.tsx

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* زر الإظهار */}
      {!isOpen && (
        <div className="fixed top-4 left-4 z-50">
          <button
            className="text-white bg-gray-800 p-2 rounded-md"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      )}

      {/* الشريط الجانبي */}
      <div className={`fixed left-0 top-0 bottom-0 w-64 bg-gray-800 p-4 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
        <div className="bg-black opacity-50 fixed inset-0 z-10" onClick={toggleSidebar} />
        <ul className="flex flex-col space-y-2">
          <li>
            <NavLink to="/dashboard" className="text-white py-2 px-4 block hover:bg-gray-700">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className="text-white py-2 px-4 block hover:bg-gray-700">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/messages" className="text-white py-2 px-4 block hover:bg-gray-700">
              Messages
            </NavLink>
          </li>
          {/* أضف المزيد من العناصر كما تحتاج */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

