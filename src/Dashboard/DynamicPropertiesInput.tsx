import { useState } from "react";

type DynamicPropertiesInputProps = {
  maxProperties: number; // الحد الأقصى لعدد الخصائص التي يمكن إدخالها
  propertyOptions: string[]; // الخيارات المحددة لاختيار الخصائص
};

const DynamicPropertiesInput: React.FC<DynamicPropertiesInputProps> = ({ maxProperties, propertyOptions }) => {
  const [properties, setProperties] = useState<Array<{ name: string; value: string }>>([]);

  const handleAddProperty = () => {
    if (properties.length < maxProperties && propertyOptions.length > 0) {
      const updatedOptions = propertyOptions.filter(option => !properties.some(prop => prop.name === option)); // استبعد الخيارات المحددة مسبقاً
      setProperties([...properties, { name: updatedOptions[0], value: '' }]);
    }
  };

  const handleRemoveProperty = (index: number) => {
    const updatedProperties = [...properties];
    updatedProperties.splice(index, 1);
    setProperties(updatedProperties);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const updatedProperties = [...properties];
    updatedProperties[index] = { ...updatedProperties[index], value };
    setProperties(updatedProperties);
  };

  return (
    <div className="dynamic-properties-input p-4 border border-gray-200 rounded-md shadow-md">
      <h3 className="text-lg font-bold mb-4">Product characteristics:</h3>
      {properties.map((property, index) => (
        <div key={index} className="flex items-center space-x-4 mb-2">
          <input
            type="text"
            value={property.name}
            readOnly
            className="px-3 py-2 w-1/2 border border-gray-300 rounded-md bg-gray-100"
          />
          <input
            type="text"
            value={property.value}
            onChange={(e) => handleChange(e, index)}
            className="px-3 py-2 w-1/2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => handleRemoveProperty(index)}
            className="px-3 py-2 text-sm text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white focus:outline-none focus:bg-red-500 focus:text-white"
          >
            Delete
          </button>
        </div>
      ))}
      {properties.length < maxProperties && (
        <button
          type="button"
          onClick={handleAddProperty}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add a feature
        </button>
      )}
    </div>
  );
}
  
  export default DynamicPropertiesInput;