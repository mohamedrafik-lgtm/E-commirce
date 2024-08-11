import React, { useState } from 'react';
import ProductCard from './ProductCard'; // تأكد من المسار الصحيح

interface Product {
  productId: number;
  productName: string;
  unitPrice: number;
  discount: number;
  rate: number;
  imageUrl: string | null;
}

interface SliderProps {
  products: Product[];
}

const Slider: React.FC<SliderProps> = ({ products }) => {
  const productsPerPage = 7; // عدد المنتجات المعروضة في كل مرة
  const [currentPage, setCurrentPage] = useState(0); // الصفحة الحالية

  // حساب عدد الصفحات
  const totalPages = Math.ceil(products.length / productsPerPage);

  // الحصول على المنتجات المعروضة في الصفحة الحالية
  const getVisibleProducts = () => {
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const visibleProducts = products.slice(startIndex, endIndex);

    // إذا كانت المنتجات المتبقية أقل من العدد المطلوب، قم بإضافة منتجات من بداية القائمة لتكوين العدد الكامل
    if (visibleProducts.length < productsPerPage) {
      const remainingCount = productsPerPage - visibleProducts.length;
      const remainingProducts = products.slice(0, remainingCount);
      return [...visibleProducts, ...remainingProducts];
    }

    return visibleProducts;
  };

  // التبديل إلى الصفحة التالية
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prevPage => prevPage + 1);
    } else {
      // إذا كنا في آخر صفحة، نعود إلى الصفحة الأولى
      setCurrentPage(0);
    }
  };

  // التبديل إلى الصفحة السابقة
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1);
    } else {
      // إذا كنا في الصفحة الأولى، ننتقل إلى آخر صفحة
      setCurrentPage(totalPages - 1);
    }
  };

  const visibleProducts = getVisibleProducts();

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        {currentPage > 0 && (
          <button
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-l"
            onClick={prevPage}
          >
            &#10094;
          </button>
        )}
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentPage * 100)}%)`,
              width: `${Math.ceil(products.length / productsPerPage) * 100}%`,
            }}
          >
            {visibleProducts.map(product => (
              <div
                key={product.productId}
                className="w-full p-2 flex-shrink-0"
                style={{ width: `${100 / productsPerPage}%` }}
              >
                <ProductCard
                  productId={product.productId}
                  productName={product.productName}
                  unitPrice={product.unitPrice}
                  discount={product.discount}
                  rate={product.rate}
                  imageUrl={product.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>
        {currentPage < totalPages - 1 && (
          <button
            className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-r"
            onClick={nextPage}
          >
            &#10095;
          </button>
        )}
      </div>
    </div>
  );
};

export default Slider;
