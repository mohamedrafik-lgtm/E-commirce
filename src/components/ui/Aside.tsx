import React from 'react';

interface SidebarProps {
  items: string[];
  onItemClick: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, onItemClick }) => {
  return (
    <div className="w-64 h-screen bg-gray-100 border-r p-4">
      <ul className="list-none p-0">
        {items.map((item, index) => (
          <li
            key={index}
            className="py-2 px-4 cursor-pointer hover:bg-gray-200"
            onClick={() => onItemClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
