import { useForm, SubmitHandler } from "react-hook-form"
import InputComponent from "../components/ui/InputComponent";
import InputErrorMsg from "../components/ui/InputErrorMsg";
import { yupResolver } from "@hookform/resolvers/yup"
import RENDERER_INPUTS from "../data";
import { registerSchema } from "../validations";
import axiosInstance from "../config/axios.config";
import VerificationCode from "./VerifcationCode";
import { useState } from "react";
import toast from "react-hot-toast";

const Register: React.FC = () => {

    interface IProp{
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    }
    
    const [getEmail,setGetEmail] = useState("")
    
    //  handlers
const { register, handleSubmit,formState:{errors} } = useForm<IProp>({
    resolver:yupResolver(registerSchema)
})
    const onSubmit: SubmitHandler<IProp> =async (userData) => {
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
          
        } catch (error) {
            console.log(error)
        }
    }



    
    // render
    const renderInputForm = RENDERER_INPUTS.map(({name,plassholder,type,validation},idx)=> <div key={idx} className="form-group">
                        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{name}:</label>
                        <InputComponent
                        placeholder={plassholder}
                            type={type}
                            {...register(name,validation)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors[name] && <InputErrorMsg msg={errors[name]?.message}/>}
                    </div>)

                    
                        if(getEmail) return <VerificationCode email={getEmail}/>
                    
    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg border shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-900">Register</h2>
                <div className="space-y-4">
                    {renderInputForm}
                </div>
                <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Register
                </button>
                
            </form>
            
        </div>
    );
};

export default Register;

