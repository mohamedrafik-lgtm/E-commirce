

const AdvertisingBanner = ()=>{
    return(
        <div className=" mx-auto">
          {/* <div className="flex space-x-3 justify-center items-center mb-7">
            <div className="h-0.5 w-full bg-black mt-3"></div>
            <h3 className="text-2xl">offer</h3>
            <div className="h-0.5 w-full mt-3 bg-black"></div>
          </div> */}
        <div className="bg-black flex justify-around py-5 AdvertisingBanner">
            
            <div className="text-white space-y-3">
                <span className="text-green-500 text-xl">watch</span>
                <p className="text-4xl w-96 block tracking-widest">Enjoy the Apple Watch experience</p>

                <div style={{marginTop:"25px"}} className="flex space-x-5">
                 <div className="text-black flex flex-col justify-center text-center w-16 h-16 rounded-full bg-white">
                 <span>05</span>
                 <p>days</p>
                 </div>
                 <div className="text-black flex flex-col justify-center text-center w-16 h-16 rounded-full bg-white">
                 <span>7</span>
                 <p>hours</p>
                 </div>
                 <div className="text-black flex flex-col justify-center text-center w-16 h-16 rounded-full bg-white">
                 <span>23</span>
                 <p>minute</p>
                 </div>
                 <div className="text-black flex flex-col justify-center text-center w-16 h-16 rounded-full bg-white">
                 <span>30</span>
                 <p>Second</p>
                 </div>
                </div>
                <div style={{marginTop:"19px",borderRadius:'8px',}} className="shadow-lg shadow-green-400 w-fit transition duration-300 transform hover:translate-x-2">
                   <button style={{
                    borderRadius:'8px',
                    transitionDuration:"600ms"
                   }} className="bg-green-500  px-10 py-2  hover:bg-green-600  ">Buy Now!</button>
                </div>
            </div>
            <div>
                <img style={{
                    width:"500px"
                }} className=" object-contain h-full" src="/IMG/maxresdefault.jpg" alt="" />
            </div>
            
        </div>
        </div>
    )
}

export default AdvertisingBanner;

