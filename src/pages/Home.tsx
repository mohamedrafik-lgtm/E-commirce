import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductSlider from "../components/ProductSlider";
import SliderCategory from "@/components/SliderCategory";
import ScrollAnimatedComponent from "@/components/ScrollAnimatedComponent";
import { lazy, memo, Suspense } from "react";
import BrandSlider from "@/components/BrandSlider";

const LazyLoadingAdvertisingBanner = lazy(() => import("@/components/ui/AdvertisingBanner"));
const LazyLoadingImageSlider = lazy(() => import("../components/Slider"));

export const Home = memo(() => {
  const images: { src: string; alt: string; loading: "eager" | "lazy" }[] = [
    { src: '/IMG/iphone-14-lg-fornece-tela-oled_2.webp', alt: 'iPhone 14 with OLED display', loading: 'lazy' },
    { src: '/IMG/iphone-14-lg-fornece-tela-oled_2.webp', alt: 'iPhone 14 with OLED display', loading: 'lazy' },
    { src: '/IMG/iphone-14-lg-fornece-tela-oled_2.webp', alt: 'iPhone 14 with OLED display', loading: 'lazy' },
  ];

  const newEst = "/api/Home/newest";
  const topSelling = '/api/Home/top-selling';
  const outOfStock = '/api/Home/out-of-stock';
  const onSale = "/api/Home/on-sale";
  const getAll = "/api/Category";

  document.title = "Home - Top Electronics, Latest iPhone Deals, and More | Shop Online";
  document.head.innerHTML += `
    <meta name="description" content="Discover the latest iPhone models, top-selling electronics, and exclusive deals on our online store. Shop now for the best offers on tech products!">
    <meta name="keywords" content="iPhone 14, top selling electronics, tech deals, new arrivals, sale electronics, online store">
    <script type="application/ld+json">
      ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Home",
        "description": "Discover the latest products, top-selling items, and amazing deals on our online store.",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://yourwebsite.com"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://yourwebsite.com/search?q={search_term}",
          "query-input": "required name=search_term"
        }
      })}
    </script>
  `;

  return (
    <div className="overflow-hidden space-y-8">
      <div className="mb-20">
        <Suspense fallback={<h3>Loading...</h3>}>
          <ScrollAnimatedComponent direction="top">
            <LazyLoadingImageSlider
              images={images.map((img) => ({
                src: img.src,
                alt: img.alt,
                loading: img.loading, // Make sure to pass these values correctly
              }))}
              width="1200px"
              height="320px"
            />
          </ScrollAnimatedComponent>
        </Suspense>
      </div>

      <div className="mr-3 ml-14">
        <Suspense fallback={<h3>Loading...</h3>}>
          <ScrollAnimatedComponent direction="right">
            
            <ProductSlider sliderTitle="NEW EST" endpoint={newEst} />
          </ScrollAnimatedComponent>
        </Suspense>
      </div>

      <div>
        <Suspense fallback={<h3>Loading...</h3>}>
          <ScrollAnimatedComponent direction="left">
            <LazyLoadingAdvertisingBanner />
          </ScrollAnimatedComponent>
        </Suspense>
      </div>

      <div className="mr-3">
        <Suspense fallback={<h3>Loading...</h3>}>
          <ScrollAnimatedComponent direction="left">
            
            <ProductSlider sliderTitle="Top Selling" endpoint={topSelling} />
          </ScrollAnimatedComponent>
        </Suspense>
      </div>

      <div className="mr-3">
        <Suspense fallback={<h3>Loading...</h3>}>
          <ScrollAnimatedComponent direction="left">
            <BrandSlider />
          </ScrollAnimatedComponent>
        </Suspense>
      </div>

      <div className="mr-3">
        <Suspense fallback={<h3>Loading...</h3>}>
          <ScrollAnimatedComponent direction="right">
            
            <ProductSlider sliderTitle="on sale" endpoint={onSale} />
          </ScrollAnimatedComponent>
        </Suspense>
      </div>

      <hr className="w-10/12 mx-auto" />

      <div className="w-10/12 mt-10 mx-auto">
        <Suspense fallback={<h3>Loading...</h3>}>
          <ScrollAnimatedComponent direction="right">
           
            <SliderCategory endpoint={getAll} sliderTitle={"Category"} />
          </ScrollAnimatedComponent>
        </Suspense>
      </div>

      <div className="mb-14 mr-3">
        <Suspense fallback={<h3>Loading...</h3>}>
          <ScrollAnimatedComponent direction="left">
            
            <ProductSlider sliderTitle="Out Of Stock" endpoint={outOfStock} />
          </ScrollAnimatedComponent>
        </Suspense>
      </div>
    </div>
  );
});

