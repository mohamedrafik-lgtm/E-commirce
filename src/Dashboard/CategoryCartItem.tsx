interface IProps{
    name:string,
}
const CategoryCartItem = ({name}:IProps)=>{
    const  DefineCtegoryImage = (name :string): string | null =>{
        if(name === "phone"){
          return "/IMG/e89299e60ad5ab5352de01f1536856df.jpg";
        }else if(name === "labtop"){
          return '/IMG/d84c891b4df125a86bf883bc3dea39b2.jpg'
        }else if(name === "Ipad"){
          return '/IMG/73cef35823138a24acd86ba674fd7cef.jpg'
        }else if(name === "smartWatch"){
           return "/IMG/8ce49fdb6a97356de8aa3c63a1c364d9.jpg"
        }else if(name === "headphones"){
          return "/IMG/17481a2423d5b5cfcf115578aa2b6025.jpg"
        }else if (name === "speakers"){
          return "/IMG/da9a8b046146a124707d5cb523200e88.jpg"
        }
        return null
      }
    const discription:string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ducimus quia, reiciendis quaerat velit fugit magni ipsam amet esse itaque!"
    return (
        <div style={{
            borderRadius: 15,
        }} className="space-y-3 p-3 !border mx-auto mt-10">
            <div className="w-64 h-full overflow-hidden mx-auto">
                <img 
             src={`${DefineCtegoryImage(name)}`}
             className="w-full h-64 object-top mx-auto" 
          style={{
            objectFit: "cover", 
            borderRadius: 15,
          }}/>
            </div>
            <div>
                <h3 className="mb-2 text-xl mt-2">{name}</h3>
                <p>{discription.length > 50 ? `${discription.slice(0, 50)}...` : discription}</p>
            </div>
            <div>
                <button className='w-full py-2 border hover:text-white hover:bg-black transition-all duration-300'>
                    Update Category
                </button>
            </div>
        </div>
    )
}

export default CategoryCartItem;