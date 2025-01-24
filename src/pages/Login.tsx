import { LOGIN_INPUT } from '../data';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validations';
import InputErrorMsg from '../components/ui/InputErrorMsg';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios.config';
import Toast from "../components/Toast";
import { useState } from 'react';
import toast from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';


const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<{ email: string; password: string }>({
        resolver: yupResolver(loginSchema)
    });
    const navigate = useNavigate();
   
    

    const onSubmit: SubmitHandler<{ email: string; password: string }> = async (userData) => {
        setLoading(true);
        const url: string = '/api/Auth/login';

        try {
            const { status, data } = await axiosInstance.post(url, userData);
            
            if (status === 200) {
                toast.success("You will navigate to the login page in 2 seconds!", {
                  position: "top-right",
                  duration: 2000,
                  style: {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    backdropFilter: 'blur(20px)',
                    color: "green",
                    width: "fit-content",
                  },
                });
                localStorage.setItem("loginData", JSON.stringify(data));
                setTimeout(() => {
                  navigate("/");
                }, 2000);
              }
              setLoading(false);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    };
     const render = LOGIN_INPUT.map(({name,plassholder,type,validation,label},idx) =><div key={idx} className="form-group">
     <label htmlFor={label} className="block text-sm font-medium text-white">{name}:</label>
     <input
         placeholder={plassholder}
         type={type}
         {...register(name, validation)}
         className="w-full bg-zinc-800 focus:bg-zinc-800  p-2 text-white"
         style={{borderRadius: '20px',}}
     />
     {errors[name] && <InputErrorMsg msg={errors[name]?.message}/>}
 </div>)
     

    return (
        <div className="flex items-center justify-center min-h-screen" style={{
            background: 'linear-gradient(0deg, rgba(9,7,7,1) 19%, rgba(167,45,253,1) 100%)',
            }}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 space-y-6 border-black shadow-xl" style={{
                borderRadius: '20px',
                boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.7)'
            }}>
                <h2 className="text-3xl font-bold text-center text-white">Log In </h2>
                <div className="space-y-4">
                    {render}
                    
                </div>

                <div className='space-y-3'>
                <button type="submit" className="w-full px-4 py-2 font-semibold text-white border border-black hover:bg-black hover:text-white transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-black"
                style={{borderRadius: '20px',}}>
                    {
                                            loading ? 
                                            <CircularProgress color="success" />
                                            : "Log in"
                                        }
                </button>
                <div className="text-xl mr-10 flex items-center space-x-1.5">
                    <p className='text-base'>Create an account</p> 
                    <NavLink className="text-base text-white" to={"/user/Register"}>Register</NavLink>
                    </div>
                </div>
                {showToast && (
                <Toast message="add product successfully!" onClose={() => setShowToast(false)} />
      )}
            </form>
        </div>
    );
};

export default Login;







