interface IProp {
    imgUrl?: string; 
    brandName: string;
    brandId: number;
}

const BrandCart = ({ brandName, imgUrl }: IProp) => {
    return (
        <div className="relative w-fit cursor-pointer group">
            <div style={{ borderRadius: "15px" }} className="border w-[250px] h-[250px] overflow-hidden relative">
                {imgUrl ? (
                    <img width={250} height={250} src={imgUrl} alt={brandName} className="w-full h-full object-contain" /> 
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-500 text-lg">No image available</span>
                    </div>
                )}
                
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-2xl font-bold">{brandName.toUpperCase()}</span>
                </div>
            </div>
        </div>
    );
};

export default BrandCart;
