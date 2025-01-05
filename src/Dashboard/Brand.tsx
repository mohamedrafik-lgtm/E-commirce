import AddBrandModel from "@/components/AddBrandModel";
import BrandItem from "@/components/BrandItem";
import useAuthenticatedQuery from "@/hook/useAuthenticatedQuery";


const Brand = ()=>{
      interface IBrand {
        id: number;
        name: string;
        imageUrl: string;
    }
     const brand = useAuthenticatedQuery({
        queryKey: ['brand'],
        url: '/api/Brand',
    })

    
    return (
        <div className="p-2 flex flex-wrap space-x-3">
            {
                brand.data?.map((brand:IBrand)=> <BrandItem key={brand.id} imgURL={brand.imageUrl} BrandName={brand.name} id={brand.id}/>)
            }
            <AddBrandModel/>
              
        </div>
    )
}

export default Brand;