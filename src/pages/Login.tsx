import React, {  ChangeEvent,FormEvent,useState } from 'react';
import axios from 'axios';
const Login: React.FC = () => {
    const [userData, setUserData] = useState<{username:string,password:string}>({
        username: '',
        password: '',
    })
    const [response, setResponse] = useState <null | string>(null);
    console.log(response)
    console.log(userData)
    const handelChanged = (event:ChangeEvent<HTMLInputElement>) => {
        const  {value,name}= event.target
        setUserData({
            ...userData,
            [name]:value
        })
    };
    const onSubmit = async (e:FormEvent<HTMLFormElement>):Promise<void> =>{
        e.preventDefault()
        

        const url:string = 'https://94ed-197-160-202-76.ngrok-free.app/api/Auth/login'; 

        try {
            const res = await axios.post(url, userData);
            setResponse(res.data);
        } catch (error) {
            console.error('There was an error!', error);
            setResponse('Error occurred');
        }
      
     }
     

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={onSubmit} className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg border shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-900">Log In </h2>
                <div className="space-y-4">
                    <div className="form-group">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">username:</label>
                        <input
                            name='username'
                            type="text"
                            id="username"
                            value={userData.username}
                            onChange={handelChanged}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:shadow-xl"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">password:</label>
                        <input
                        name='password'
                            type="password"
                            id="password"
                            value={userData.password}
                            onChange={handelChanged}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:shadow-xl"
                        />
                    </div>
                </div>
                <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    log in 
                </button>
            </form>
        </div>
    );
};

export default Login;


