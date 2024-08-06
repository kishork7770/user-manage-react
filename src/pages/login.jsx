
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function Login() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [users, setUsers] = useState();
    const { handleLogin } = useOutletContext();
    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:4000/users');
            setUsers(data);
        }
        catch (error) {
            console.log(error);
        }
    };
    const loginUser = async (data) => {
        try {
            const isUserExsist = users.find(user => user.email === data.email && user.password === data.password)
            if (isUserExsist) {
                if (isUserExsist.status === 'inactive') {
                    toast.error("user inactive");
                    return;
                }
                toast.success('Login Succuessful..');
                handleLogin();
                navigate("/home");
                localStorage.setItem('user', JSON.stringify(isUserExsist));
            } else {
                toast.error('Invaild username and Password');
            }
        } catch (error) {
            toast.error("erro");
        }
    }

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen w-svw">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
                <form onSubmit={handleSubmit(loginUser)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Email
                        </label>
                        <input {...register('email')}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input {...register('password')}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="********"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"

                        >
                            Sign In
                        </button>
                        <a
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            href="/register"
                        >
                            Create Account?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Login;