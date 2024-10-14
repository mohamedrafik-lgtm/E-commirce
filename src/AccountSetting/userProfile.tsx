



const UserProfile = ()=>{


    return(
      <div className="mt-7 w-full px-5 space-y-5 mb-7">
        
          <div className="mb-10">
            <h3 className="text-2xl ">My Profile</h3>
          </div>

          <div style={{
              borderRadius: "10px"
            }} className="border w-full flex  px-7 py-3  justify-between bg-gray-50">

            <div className="flex items-center space-x-7"><div>
              <img style={{
                borderRadius: "50%"
              }} className="w-48" src="/IMG/454375571_1646661866176465_6149835982982053363_n.jpg" alt="account image"/>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">User Name</h3>
              <p className="text-lg">Admin</p>
              <p className="text-lg">the address</p>
            </div></div>
            <div>
              <button style={{
                borderRadius: "5px"
              }} className="px-7 py-2 bg-orange-400 text-white hover:bg-orange-600 transition-all duration-300 flex space-x-1 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>

                <p>Edit</p>
                </button>
            </div>

          </div>


          <div style={{
              borderRadius: "10px"
            }} className="border w-full space-y-7  px-7 py-3 flex  justify-between bg-gray-50">
             <div> 
             <h3 className="text-2xl mb-10">Personal Information</h3>


                 <div className="w-96 space-y-7">
                    <div className="flex justify-between">
                      <div className="space-y-2">
                      <span>
                        First Name
                      </span>
                      <p className="text-xl">mohamed</p>
                      </div>
                      <div>
                      <span>
                        Last Name
                      </span>
                      <p className="text-xl">rafik</p>
                      </div>
                    </div>
                      <div className="flex justify-between">
                          <div className="space-y-2">
                             <span>Email address</span>
                             <p className="text-xl">cesey74025@skrank.com</p>
                          </div>
                          <div className="space-y-2">
                             <span>phone number</span>
                             <p className="text-xl">01066975648</p>
                          </div>
                      </div>
                      <div>
                        <span>Bio</span>
                       <p className="text-xl">front end</p>
                     </div>
                 </div>
             </div>
             <button style={{
                borderRadius: "5px"
              }} className="px-7 py-2 bg-orange-400 text-white h-fit hover:bg-orange-600 transition-all duration-300 flex space-x-1 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>

                <p>Edit</p>
                </button>
          </div>

          <div style={{
              borderRadius: "10px"
            }} className="border w-full space-y-7  px-7 py-3 flex  justify-between bg-gray-50">
             <div> 
             <h3 className="text-2xl mb-10">Address</h3>


                 <div className="w-96 space-y-7">
                    <div className="flex justify-between">
                      <div className="space-y-2">
                      <span>
                        Country
                      </span>
                      <p className="text-xl">Egypt</p>
                      </div>
                      <div>
                      <span>
                         City/State
                      </span>
                      <p className="text-xl">mansoura</p>
                      </div>
                    </div>
                      <div className="flex justify-between">
                          <div className="space-y-2">
                             <span>Postal Code</span>
                             <p className="text-xl">ERT 846523</p>
                          </div>
                          <div className="space-y-2">
                             <span>TAX ID</span>
                             <p className="text-xl">As564178969</p>
                          </div>
                      </div>
                      
                 </div>
             </div>
             <button style={{
                borderRadius: "5px"
              }} className="px-7 py-2 bg-orange-400 text-white h-fit hover:bg-orange-600 transition-all duration-300 flex space-x-1 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>

                <p>Edit</p>
                </button>
          </div>
        
      </div>
    )
} 
export default UserProfile