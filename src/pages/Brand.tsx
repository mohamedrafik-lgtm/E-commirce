import { v4 as uuid } from 'uuid';
import ProductCard from "@/components/ui/ProductCard";
import { useEffect, useState } from "react";
import axiosInstance from "@/config/axios.config";
import { useParams } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
// Skeleton Card for loading state
const SkeletonCard = () => (
    <div className="bg-gray-200 animate-pulse rounded-lg shadow-lg p-4">
        <Stack spacing={1}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
    </div>
);

interface ProductCardProps {
    id: number;
    productId: number;
    productName: string;
    unitPrice: number;
    discount: number;
    rate: number;
    imageUrl: string;
    isLoading: boolean;
}

export const FilterByBrand = () => {
    const [productByBrand, setProductByBrand] = useState<ProductCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { brandId } = useParams();
    console.log(productByBrand)
    document.title = `Products by Brand`;
    useEffect(() => {
        const fetchProductsByBrand = async () => {
            try {
                const { data } = await axiosInstance.get(`/api/Product/brand/${brandId}`);
                console.log(data);

                // Validate that data is an array
                if (Array.isArray(data)) {
                    setProductByBrand(data);
                } else {
                    console.error("Unexpected data format:", data);
                    setProductByBrand([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setProductByBrand([]);
            } finally {
                setIsLoading(false);  // Set loading to false after fetching
            }
        };

        fetchProductsByBrand();
    }, [brandId]);

    // Render products or fallback message
    const renderFilterProduct =
        Array.isArray(productByBrand) &&
        productByBrand.map((product) => (
            <div
                key={uuid()}
                className="transition-all hover:scale-105"
            >
                <ProductCard
                    id={product.productId}
                    discount={product.discount}
                    imageUrl={product.imageUrl}
                    rate={product.rate}
                    unitPrice={product.unitPrice}
                    isLoading={product.isLoading}
                    productId={product.productId}
                    productName={product.productName}
                />
            </div>
        ));

    // Render skeleton loaders if loading
    const renderSkeletons = Array.from({ length: 6 }).map(() => (
        <div key={uuid()} className="transition-all hover:scale-105">
            <SkeletonCard />
        </div>
    ));

    return (
        <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4`}
        >
            {isLoading ? (
                renderSkeletons
            ) : Array.isArray(renderFilterProduct) && renderFilterProduct.length ? (
                renderFilterProduct
            ) : (
                <div className="flex flex-col items-center justify-center h-screen text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-12 h-12 text-gray-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                        />
                    </svg>
                    <h2 className="text-2xl font-semibold">No Products Found</h2>
                    <p className="text-lg text-gray-500">
                        There are no products available in this category.
                    </p>
                </div>
            )}
        </div>
    );
};
