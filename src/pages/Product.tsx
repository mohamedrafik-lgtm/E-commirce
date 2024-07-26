import PaginationControlled from "../components/ui/Paginator";



const ProductPage = () =>{
    const Products = [
        {
            name:"labtop",
            type:"elctronic",
            stocks:100,
            sku:"123456789",
            price:"1000$",
            variants:[{color:"black", size:"13"}],
            Edite:"edite"
        },
        {
            name:"labtop",
            type:"elctronic",
            stocks:100,
            sku:"123456789",
            price:"1000$",
            variants:[{color:"black", size:"13"}],
            Edite:"edite"
        },
        {
            name:"labtop",
            type:"elctronic",
            stocks:100,
            sku:"123456789",
            price:"1000$",
            variants:[{color:"black", size:"13"}],
            Edite:"edite"
        }
        ,{
            name:"labtop",
            type:"elctronic",
            stocks:100,
            sku:"123456789",
            price:"1000$",
            variants:[{color:"black", size:"13"}],
            Edite:"edite"
        }
        ,{
            name:"labtop",
            type:"elctronic",
            stocks:100,
            sku:"123456789",
            price:"1000$",
            variants:[{color:"black", size:"13"}],
            Edite:"edite"
        }
        ,{
            name:"labtop",
            type:"elctronic",
            stocks:100,
            sku:"123456789",
            price:"1000$",
            variants:[{color:"black", size:"13"}],
            Edite:"edite"
        },
        {
            name:"labtop",
            type:"elctronic",
            stocks:100,
            sku:"123456789",
            price:"1000$",
            variants:[{color:"black", size:"13"}],
            Edite:"edite"
        },
        {
            name:"labtop",
            type:"elctronic",
            stocks:100,
            sku:"123456789",
            price:"1000$",
            variants:[{color:"black", size:"13"}],
            Edite:"edite"
        },
        {
            name:"labtop",
            type:"elctronic",
            stocks:100,
            sku:"123456789",
            price:"1000$",
            variants:[{color:"black", size:"13"}],
            Edite:"edite"
        },
        {
            name:"labtop",
            type:"elctronic",
            stocks:100,
            sku:"123456789",
            price:"1000$",
            variants:[{color:"black", size:"13"}],
            Edite:"edite"
        },{
            name:"labtop",
            type:"elctronic",
            stocks:100,
            sku:"123456789",
            price:"1000$",
            variants:[{color:"black", size:"13"}],
            Edite:"edite"
        }
    ]
     const renderProducts = Products.map((product,idx) => <div key={idx} className="w-full h-min p-2 flex justify-between">
        <div>{product.name}</div>
        <div>{product.type}</div>
        <div>{product.stocks}</div>
        <div>{product.sku}</div>
        <div>{product.price}</div>
        
        <div>{product.variants.map(ele => <span>size: {ele.size}</span>)}</div>
        <div>{product.Edite}</div>
     </div>)
    return (
        <div className="w-full h-min m-5 border rounded-md flex flex-col">
            <ul className="w-full h-min p-2 flex justify-between bg-slate-200">
                <li>PRODUCT</li>
                <li>TYPE</li>
                <li>STOCKS</li>
                <li>SKU</li>
                <li>PRICE</li>
                <li>VARIANTS</li>
                <li>ACTIONS</li>
            </ul>
            <div className="border-b">
            {renderProducts}
            </div>
            <div className="p-2 flex items-center justify-center">
                <PaginationControlled/>
            </div>
        </div>
    )
}

export default ProductPage;