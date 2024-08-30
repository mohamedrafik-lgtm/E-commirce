import SliderCategory from "../components/SliderCategory";

const ContactPage = () => {
    
    return (
        <div className="w-4/6 mx-auto">
            <SliderCategory visibleProducts={5} endpoint={"/GetAll"} sliderTitle={"Category"}/>
        </div>
    )
}


export default ContactPage;