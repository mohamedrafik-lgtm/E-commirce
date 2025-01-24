import axiosInstance from '@/config/axios.config';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import VerificationCode from './VerifcationCode';
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink } from 'react-router-dom';
interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
const Register: React.FC = () =>  {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, },
      } = useForm<FormData>();
        const [getEmail,setGetEmail] = useState("")
      const onSubmit: SubmitHandler<FormData> =async (userData) => {
        setIsLoading(true);
        try {
          const {data:{email},status}= await axiosInstance.post('/api/Auth/register',userData)
          setGetEmail(email)
          if (status === 200){
            toast.success("You will navigate to the Verification Code page in 2 seconds!", {
                position: "top-right",
                duration: 2000,
                style: {
                  backgroundColor: "green",
                  color: "white",
                  width: "fit-content",
                },
              });
          }
          setIsLoading(false)
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }
    if(getEmail) return <VerificationCode email={getEmail}/>
      return (
        <div className="min-h-screen bg-black flex justify-center items-center">
          <div className="flex flex-col md:flex-row bg-black rounded-lg  w-full max-w-7xl " style={{
            borderRadius: '20px',
            boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.7)'
          }}>
            {/* Left Side */}
            <div className=" text-white p-10 flex flex-col justify-center w-full md:w-1/2" style={{
                borderRadius: '20px',
                background: 'linear-gradient(0deg, rgba(9,7,7,1) 19%, rgba(167,45,253,1) 100%)',
                }}>
              <h1 className="text-4xl font-bold mb-4">Get Started with Us</h1>
              <p className="text-lg mb-6" style={{
            borderRadius: '20px',}}>
                Complete these easy steps to register your account.
              </p>
              <div className="flex justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-48">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                 </svg>
              </div>
            </div>
    
            {/* Right Side */}
            <div className="bg-black p-10 w-full md:w-1/2 rounded-r-lg" style={{
            borderRadius: '20px',}}>
              <h2 className="text-2xl font-bold text-white mb-6">Sign Up Account</h2>
              <p className="text-zinc-400 mb-6">
                Enter your personal data to create your account.
              </p>
              {/* <div className="flex space-x-4 mb-6">
                <button className="bg-zinc-700 py-2 px-4 rounded-lg flex-grow text-white"
                style={{
                    borderRadius: '20px',}}>
                  Google
                </button>
                <button className="bg-zinc-700 py-2 px-4 rounded-lg flex-grow text-white"
                style={{
                    borderRadius: '20px',}}>
                  GitHub
                </button>
              </div> */}
              <div className='flex items-center space-x-1 mb-2'>
                <div className='h-0.5 bg-white w-full'></div>
                <div className="text-zinc-400 text-center">or</div>
                <div className='h-0.5 bg-white w-full'></div>
              </div>
    
              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      style={{
                        borderRadius: '15px',}}
                      type="text"
                      placeholder="userName"
                      className={`w-full bg-zinc-800 focus:bg-zinc-800  p-2 text-white border ${errors.username ? 'border-red-500' : 'border-zinc-700'}`}
                      {...register('username', { required: 'First name is required' })}
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                    )}
                  </div>
                  <div>
                  <input
                    style={{
                    borderRadius: '15px',}}
                    type="email"
                    placeholder="Email"
                    className={`w-full bg-zinc-800 focus:bg-zinc-800  p-2 rounded-lg text-white border ${errors.email ? 'border-red-500' : 'border-zinc-700'}`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                </div>
                
                <div className="mt-4">
                  <input
                    style={{
                    borderRadius: '15px',}}
                    type="password"
                    placeholder="Password"
                    className={`w-full bg-zinc-800 focus:bg-zinc-800  p-2 rounded-lg text-white border ${errors.password ? 'border-red-500' : 'border-zinc-700'}`}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>
                <div className="mt-4">
                    <input
                      style={{
                        borderRadius: '15px',}}
                      type="password"
                      placeholder="confirmPassword"
                      className={`w-full bg-zinc-800 focus:bg-zinc-800 p-2 rounded-lg text-white border ${errors.confirmPassword ? 'border-red-500' : 'border-zinc-700'}`}
                      {...register('confirmPassword', { required: 'Last name is required' })}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                <button
                style={{
                    borderRadius: '15px',}}
                  type="submit"
                  className={`mt-6 bg-purple-700 py-2 px-4 rounded-lg w-full text-white hover:bg-purple-600 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {
                        isLoading ? 
                        <CircularProgress color="success" />
                        : "Sign Up"
                    }
                  
                </button>
              </form>
    
              <p className="text-zinc-400 text-center mt-4">
                Already have an account?{' '}
                <NavLink to="/user/Login" className="text-purple-500 hover:underline">
                  Log in
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      );
}

export default Register;

