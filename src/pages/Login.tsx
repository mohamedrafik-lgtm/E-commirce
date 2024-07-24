import { LOGIN_INPUT } from '../data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validations';
import InputErrorMsg from '../components/ui/InputErrorMsg';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axiosInstance from '../config/axios.config';
const Login: React.FC = () => {
    const { register, handleSubmit,formState:{errors} } = useForm<{email:string;password:string}>({
        resolver:yupResolver(loginSchema)
    })
    const navigate = useNavigate()
    
     const onSubmit: SubmitHandler<{ email: string; password: string; }> =async (data) => {
        
        const url:string = '/api/Auth/login'; 
        
        try {
           const {status} = await axiosInstance.post(url, data);
           if (status === 200) {
            toast.success("You will navigate to the home page in 2 seconds!", {
              position: "bottom-center",
              duration: 1500,
              style: {
                backgroundColor: "black",
                color: "white",
                width: "fit-content",
              },
            });
            setTimeout(() => {
              navigate("/home");
            }, 2000);
          }
        } catch (error) {
             
        console.error(error)
            
        }
     }
     const render = LOGIN_INPUT.map(({name,plassholder,type,validation,label},idx) =><div key={idx} className="form-group">
     <label htmlFor={label} className="block text-sm font-medium text-gray-700">{name}:</label>
     <input
         placeholder={plassholder}
         type={type}
         {...register(name, validation)}
         className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:shadow-xl"
     />
     {errors[name] && <InputErrorMsg msg={errors[name]?.message}/>}
 </div>)
     

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg border shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-900">Log In </h2>
                <div className="space-y-4">
                    {render}
                    
                </div>
                <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    log in 
                </button>
            </form>
        </div>
    );
};

export default Login;







