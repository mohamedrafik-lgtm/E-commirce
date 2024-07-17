import React, { ChangeEvent, useState } from 'react';

const Register: React.FC = () => {
    interface IProp{
        username: string;
        email: string;
        password: string;
        confirmPassword: string;
    }
    
    const [RegisterData,setRegisterData] = useState<IProp>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    console.table(RegisterData)

    const handelChanged = (event:ChangeEvent<HTMLInputElement>):void => {
       const {value,name} = event.target
       setRegisterData({
        ...RegisterData,
         [name]: value
       })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle register logic here
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg border shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-900">Register</h2>
                <div className="space-y-4">
                    <div className="form-group">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">username:</label>
                        <input
                            type="text"
                            id="username"
                            name='username'
                            value={RegisterData.username}
                            onChange={handelChanged}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email:</label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            value={RegisterData.email}
                            onChange={handelChanged}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700"> password:</label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            value={RegisterData.password}
                            onChange={handelChanged}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">confirm password:</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name='confirmPassword'
                            value={RegisterData.confirmPassword}
                            onChange={handelChanged}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
                <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Register;
