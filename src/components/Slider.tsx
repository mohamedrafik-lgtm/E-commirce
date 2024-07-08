import Slider from "react-slick";
import SliderContent from "./ui/SliderContent";

function Resizable() {
 

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container">
      
      <div
        style={{
          width: "40%",
          
        }}
      >
        <Slider {...settings}>
          <div>
          <SliderContent/>
          </div>
          <div>
          <SliderContent/>
          </div>
          <div>
          <SliderContent/>
          </div>
          <div>
          <SliderContent/>
          </div>
          <div>
          <SliderContent/>
          </div>
          <div>
          <SliderContent/>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Resizable;
