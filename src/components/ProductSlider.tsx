import { useEffect, useState } from "react";
import { Products } from "../interface";
import axiosInstance from "../config/axios.config";
import ProductCard from "./ui/ProductCard";
import Variants from "./ui/Scilaton";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useMediaQuery } from "@mui/material";

// Skeleton Card for loading state (modified for slider)
const SkeletonCard = () => (
  <div className="bg-gray-200 animate-pulse rounded-lg shadow-lg p-4">
    <Stack spacing={1}>
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
  </div>
);

interface IProps {
  endpoint: string;
  sliderTitle: string;
}

const ProductSlider = ({ endpoint, sliderTitle }: IProps) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Products[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Responsive logic for visible products
  const isSmallScreen = useMediaQuery("(max-width: 640px)"); // Mobile
  const isMediumScreen = useMediaQuery("(max-width: 1024px)"); // Tablet
  const isLaptopScreen = useMediaQuery("(max-width: 1280px)"); // Laptop/Small Desktop
  const isLargeScreen = useMediaQuery("(min-width: 1281px)"); // Large Desktop
  
  // Adjust number of visible products based on screen size
  const visibleProducts = isSmallScreen
    ? 1
    : isMediumScreen
    ? 2
    : isLaptopScreen
    ? 3
    : isLargeScreen
    ? 6 // Display 6 products on large screens
    : 4; // Default to 4 on large screens

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get(endpoint);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [endpoint]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? products.length - visibleProducts : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex >= products.length - visibleProducts;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (loading) return <Variants />;

  if (!products.length) return null;

  return (
    <div className="relative w-full">
      <div className="mb-5">
        <h3 className="text-2xl p-2 text-center">{sliderTitle}</h3>
        <hr className="w-3/4 mx-auto" />
      </div>
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 transform -translate-y-1/2 left-4 w-7 h-7 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300 z-10"
      >
        ❮
      </button>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleProducts)}%)`,
          }}
        >
          {loading
            ? Array.from({ length: visibleProducts }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 p-4"
                  style={{ width: `${100 / visibleProducts}%` }}
                >
                  <SkeletonCard />
                </div>
              ))
            : products.map((product) => (
                <div
                  key={product.productId}
                  className="flex-shrink-0 duration-300 hover:scale-105 p-4"
                  style={{ width: `${100 / visibleProducts}%` }}
                >
                  <ProductCard
                    key={product.productId}
                    id={product.id}
                    discount={product.discount}
                    imageUrl={product.imageUrl}
                    rate={product.rate}
                    unitPrice={product.unitPrice}
                    isLoading={loading}
                    productId={product.productId}
                    productName={product.productName}
                  />
                </div>
              ))}
        </div>
      </div>
      <button
        onClick={goToNext}
        className="absolute top-1/2 transform -translate-y-1/2 right-4 w-7 h-7 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300 z-10"
      >
        ❯
      </button>
    </div>
  );
};

export default ProductSlider;
