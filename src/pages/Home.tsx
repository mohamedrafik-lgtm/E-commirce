import ProducrCard from "../components/ui/ProductCard"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageSlider from "../components/Slider";

export const Home =  () => {
    const images = [
        '/IMG/iphone-14-lg-fornece-tela-oled_2.jpg',
        '/IMG/iphone-14-lg-fornece-tela-oled_2.jpg',
        '/IMG/iphone-14-lg-fornece-tela-oled_2.jpg',
      ];

    return (
        <div>
            
            <div>
            <ImageSlider width="50%"   images={images} />
            </div>
            <ProducrCard description="HAVIT HV-G92 Gamepad" imgSrc="/IMG/26be56634ad9773c9d8f6315cac2cba7.jpg" price={150}/>
        </div>
    )
}