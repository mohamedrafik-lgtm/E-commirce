import { useEffect, useState } from "react";
import axiosInstance from "../config/axios.config";
import CategoryCard from "./ui/CategoryCart";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

interface IProps {
  endpoint: string;
  sliderTitle: string;
}

interface ICategoryCard {
  name: string;
  description: string;
  imageUrl: string;
  id: number;
}

const SliderCategory = ({ endpoint, sliderTitle }: IProps) => {
  const [loading, setLoading] = useState(true);
  const [products, setProduct] = useState<ICategoryCard[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth); // لتتبع عرض النافذة

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get(endpoint);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [endpoint]);

  useEffect(() => {
    // عند تغيير حجم النافذة، نقوم بتحديث `windowWidth`
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // تنظيف الحدث عند الخروج من المكون
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? products.length - visibleProducts() : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex >= products.length - visibleProducts();
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // تحديد عدد المنتجات المعروضة بناءً على حجم النافذة
  const visibleProducts = () => {
    if (windowWidth <= 640) {
      return 2; // موبايل
    } else if (windowWidth <= 768) {
      return 3; // أجهزة لوحية
    } else if (windowWidth <= 1024) {
      return 4; 
    } else {
      return 6; 
    }
  };

  const SkeletonCard = () => (
    <div className="flex-shrink-0 duration-300 h-fit hover:scale-105 p-2">
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width={210} height={140} />
        <Skeleton variant="text" width={150} height={20} />
        <Skeleton variant="text" width={180} height={15} />
      </Stack>
    </div>
  );

  if (!products.length && loading) {
    return (
      <div style={{ borderRadius: '15px' }} className="relative w-full">
        <h3 className="text-2xl p-2 ml-6 mb-4 sliderTitle">{sliderTitle} :</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-6">
          {Array.from({ length: visibleProducts() }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ borderRadius: '15px' }} className="relative w-full">
      <h3 className="text-2xl p-2 ml-6 mb-4 sliderTitle">{sliderTitle} :</h3>

      <button
        onClick={goToPrevious}
        className="absolute top-1/2 transform -translate-y-1/2 -left-5 w-7 h-7 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300 z-10"
      >
        ❮
      </button>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleProducts())}%)`,
          }}
        >
          {products.map((Category, index) => (
            <div
              key={index}
              className="flex-shrink-0 duration-300 h-fit hover:scale-105 p-2"
              style={{
                width: `${100 / visibleProducts()}%`,
              }}
            >
              <div className="flex w-full justify-center">
                <CategoryCard
                  id={Category.id}
                  name={Category.name}
                  description={"The apple is one of the pome (fleshy) fruits. Apples at harvest vary widely in size"}
                  imgUrl={Category.imageUrl}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={goToNext}
        className="absolute top-1/2 transform -translate-y-1/2 -right-5 w-7 h-7 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300 z-10"
      >
        ❯
      </button>
    </div>
  );
};

export default SliderCategory;
