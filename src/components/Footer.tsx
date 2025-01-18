
const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8" style={{padding:"30px 0px"}}>
          {/* Exclusive Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Exclusive</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Account</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Quick Link</a></li>
            </ul>
            <form className="flex border border-white mt-2" style={{borderRadius:"5px"}}>
              <input 
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-l-lg bg-black  text-white focus:outline-none"
              />
              <button
                type="button"
                className="bg-black hover:bg-white/30 text-white px-4 rounded-r-lg transition"
              >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                   </svg>

              </button>
            </form>
          </div>

          {/* Download App Section */}
          

          {/* Subscribe Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Subscribe</h3>
            <p className="text-gray-400 mb-4">Get 10% off your first order</p>
            <p className="text-gray-400 mb-4">111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
            
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:exclusive@gmail.com" className="text-gray-400 hover:text-white transition">exclusive@gmail.com</a></li>
              <li><a href="tel:+88015888889999" className="text-gray-400 hover:text-white transition">+88015-88888-9999</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Download App</h3>
            <div className="flex items-center space-x-2">
              {/* QR Code */}
              <div className="bg-white p-1 rounded-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                  alt="QR Code"
                  className="h-32 w-32"
                />
              </div>
              {/* App Store Badges */}
              <div className="space-y-2 flex flex-col">
                <a href="#" className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                  <span className="flex items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-6" />
                  </span>
                </a>
                <a href="#" className="inline-block bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                  <span className="flex items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-6" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>


        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            &copy; 2022 Exclusive. All rights reserved.
          </p>

          {/* Links */}
          <ul className="flex space-x-4">
            <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition">Terms Of Use</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;