// src/components/AddProductForm.tsx

import React from 'react';

const AddProductForm: React.FC<{  loading?: boolean }> = ({  loading }) => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <button
        
        className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:bg-blue-500 focus:ring-opacity-50"
        disabled={loading}
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProductForm;

