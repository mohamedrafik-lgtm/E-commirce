import React, { useState } from "react";

interface ProductData {
  productId: number;
  productName: string;
  unitPrice: number;
  description: string | null;
  brand: string;
  category: string;
  unitsInStock: number;
  discontinued: boolean;
  productCode: string;
  companyName: string;
  contactName: string;
  isArchived: boolean;
  tags: string[];
  productAttributes: string[];
  productAttributesValues: string[];
  imageUrls: string[];
}

const ProductPage: React.FC<ProductData> = ({
  productName,
  unitPrice,
  description,
  brand,
  category,
  unitsInStock,
  discontinued,
  productCode,
  companyName,
  contactName,
  tags,
  productAttributes,
  productAttributesValues,
  imageUrls,
}) => {
  const [selectedImage, setSelectedImage] = useState(imageUrls[0]);
   
  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg max-w-7xl">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Main Product Image */}
        <div className="md:w-1/2">
          <img
            src={selectedImage}
            alt={productName}
            className="w-full h-96 object-contain rounded-lg shadow-md mb-4"
          />
          <div className="flex gap-3 justify-center">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-contain rounded-lg cursor-pointer border-2 ${
                  selectedImage === url ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(url)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
          <div className="justify-end text-right">
            <span className="inline-block bg-green-500 text-white text-sm px-3 py-1 rounded-full">
                  In Stock: {unitsInStock}
            </span>
            </div>
            
            <h1 className="text-4xl font-bold  text-wrap text-gray-800">
              {productName}
            </h1>
            
            
            <p className="text-3xl mt-4 font-semibold mb-6">
              ${unitPrice.toLocaleString()}
            </p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Overview
              </h2>
              <p className="text-gray-600 mb-4">
                {description || "No description available."}
              </p>

              <div className="flex flex-wrap gap-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  Brand: {brand}
                </span>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  Category: {category}
                </span>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  Code: {productCode}
                </span>
                
              </div>

              <p
                className={`mt-4 text-lg font-semibold flex items-center ${
                  discontinued ? "text-red-500" : "text-green-500"
                }`}
              >
                {discontinued ? "Discontinued" : "Available"}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Attributes
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {productAttributes.map((attr, index) => (
                  <li key={index}>
                    <span className="font-medium">{attr}:</span>{" "}
                    {productAttributesValues[index]}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Tags</h2>
              <div className="flex justify-between">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-sm content-center px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className="rounded-md bg-blue-500 py-2 px-6 text-sm font-medium text-white focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white">
              Buy Now</button>
              </div>
            </div>
          </div>

          <div className="border-t mt-6 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Company Information
            </h2>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Company Name:</span> {companyName}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Contact Name:</span> {contactName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProductPage;
