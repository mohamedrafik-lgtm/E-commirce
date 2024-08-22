// src/components/Sidebar.tsx// src/components/Sidebar.tsx

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBox ,faCartArrowDown} from '@fortawesome/free-solid-svg-icons';


const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const items = [
    { name: 'Add Product', icon: faCartArrowDown, path: '/Admin/AddProduct' },
    
    { name: 'Products', icon: faBox, path: '/Admin/products' },
  ];
  
  return (
    <div
    className={`border h-full  from-gray-800 to-gray-600 p-2  transition-all duration-300 ${isCollapsed ? 'w-20 ' : 'w-64'} z-50`}
    style={{ height: '100vh' }}
  >
    <div className="flex items-center justify-between p-4">
      <h2 className={`text-xl font-bold ${isCollapsed ? 'hidden' : ''}`}>Dashboard</h2>
      <button
        className="focus:outline-none"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <FontAwesomeIcon icon={faBars} className="text-xl" />
      </button>
    </div>
    <div className={`flex flex-col mt-6 ${isCollapsed ? 'items-center' : 'items-start'}`}>
      {items.map((item, index) => (
        
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            `py-2 px-4 flex items-center rounded-lg cursor-pointer  ${isActive ? 'bg-blue-500 text-white' : ''} ${isCollapsed ? 'w-12' : 'w-full'}`
          }
        >
          <FontAwesomeIcon icon={item.icon} className="text-xl" />
          <span className={`ml-3 ${isCollapsed ? 'hidden' : ''}`}>{item.name}</span>
        </NavLink>
      ))}
    </div>
  </div>
  );
};

export default Sidebar;

