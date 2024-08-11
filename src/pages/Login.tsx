import { LOGIN_INPUT } from '../data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validations';
import InputErrorMsg from '../components/ui/InputErrorMsg';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios.config';
import Toast from "../components/Toast";
import { useState } from 'react';
const Login: React.FC = () => {
    const [showToast, setShowToast] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>({
        resolver: yupResolver(loginSchema)
    });
    const navigate = useNavigate();
      // استيراد useToast
   
    

    const onSubmit: SubmitHandler<{ email: string; password: string }> = async (userData) => {
        const url: string = '/api/Auth/login';

        try {
            const { status, data } = await axiosInstance.post(url, userData);
            console.log(status);
            console.log(data);
            if (status === 200){
                setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 3000); 
            navigate("/")
              }
        } catch (error) {
            console.log(error);
        }
    };
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
                {showToast && (
        <Toast message="add product successfully!" onClose={() => setShowToast(false)} />
      )}
            </form>
        </div>
    );
};

export default Login;







