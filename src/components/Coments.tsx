import Rating from '@mui/material/Rating';


interface IComment{
    rating:number;
    comment:string;
}
const Comments = ({comment,rating}:IComment)=>{
    return(
        <div className="border p-4 space-y-3"style={{borderRadius:"15px"}}>
            <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <div className="ml-4">
                    <div className="font-bold">Mohamed Rafik</div>
                    <div className="text-gray-500">2 days ago</div>
                </div>
            </div>
            <div className='pl-2 flex flex-col '>
                <Rating name="size-small" defaultValue={rating} readOnly   size="medium" />
                <span className='text-lg'>{comment}</span>
            </div>
        </div>
    )

}
export default Comments;