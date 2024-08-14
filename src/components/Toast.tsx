import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed inset-x-0 top-2 transform -translate-y-1/2 flex items-center justify-center z-50">
      <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg max-w-xs w-auto transition-transform transform duration-500 ease-in-out animate-slide-down">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium truncate">{message}</span>
          <button onClick={onClose} className="ml-4 text-xl font-bold text-white hover:text-gray-200 focus:outline-none">
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;


