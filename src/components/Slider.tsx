
import React, { memo, Suspense } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NavLink } from 'react-router-dom';


interface ImageSliderProps {

  images: { src: string; alt: string; loading: "eager" | "lazy" | undefined }[];

  width: string;

  height?: string;

}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, width, height }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className={`mx-auto`} style={{ width, height }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="p-2">
            <div style={{height:"330px",width:width}} className="flex space-x-10  text-white justify-between bg-black w-fit px-5 py-3">
            <div className="flex flex-col space-y-8">
                <div className="flex items-center space-x-3">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="60"  height="49"  viewBox="0 0 24 24"  fill="currentColor"  className=" icon icon-tabler icons-tabler-filled icon-tabler-brand-apple"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15.079 5.999l.239 .012c1.43 .097 3.434 1.013 4.508 2.586a1 1 0 0 1 -.344 1.44c-.05 .028 -.372 .158 -.497 .217a4.15 4.15 0 0 0 -.722 .431c-.614 .461 -.948 1.009 -.942 1.694c.01 .885 .339 1.454 .907 1.846c.208 .143 .436 .253 .666 .33c.126 .043 .426 .116 .444 .122a1 1 0 0 1 .662 .942c0 2.621 -3.04 6.381 -5.286 6.381c-.79 0 -1.272 -.091 -1.983 -.315l-.098 -.031c-.463 -.146 -.702 -.192 -1.133 -.192c-.52 0 -.863 .06 -1.518 .237l-.197 .053c-.575 .153 -.964 .226 -1.5 .248c-2.749 0 -5.285 -5.093 -5.285 -9.072c0 -3.87 1.786 -6.92 5.286 -6.92c.297 0 .598 .045 .909 .128c.403 .107 .774 .26 1.296 .508c.787 .374 .948 .44 1.009 .44h.016c.03 -.003 .128 -.047 1.056 -.457c1.061 -.467 1.864 -.685 2.746 -.616l-.24 -.012z" /><path d="M14 1a1 1 0 0 1 1 1a3 3 0 0 1 -3 3a1 1 0 0 1 -1 -1a3 3 0 0 1 3 -3z" /></svg>                    
                <p className="text-2xl ">iPhone 14 Series</p>
                </div>
                <h3 className="text-4xl ml-3">
                    Up to 10% <br/>off Voucher
                </h3>
                <p className="ml-3 text-xl underline underline-offset-4 flex items-center space-x-1 "><NavLink to={""}>Shop Now</NavLink> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
                </p>
            </div>

            <div>
              <picture>
                <source srcSet={image.src.replace('.jpg', '.webp')} type="image/webp" />
                <Suspense fallback={<h3>Loading...</h3>}>
                <img src={image.src} alt={image.alt} className="object-contain h-full" loading={image.loading} />
                </Suspense>
                {/* <img src={image} alt={`slide-${index}`} className="object-contain h-full" loading="lazy" /> */}
              </picture>
            </div>
        </div>
            
          </div>
        ))}
      </Slider>
      
    </div>
  );
};

const MemoizedImageSlider = memo(ImageSlider);
export default MemoizedImageSlider;


