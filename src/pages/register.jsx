import { useState } from 'react';
import './registerForm.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function register() {

    /*
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");

    async function register() {
        let registerPersons = { name, email, password, confirmPass, role, status };
        console.warn(registerPersons);1 

        let result = await fetch("http://localhost:4000/users", {
            method: 'POST',
            body: JSON.stringify(registerPersons),
            headers: {
                "content-Type": 'application/json',
                "Accept": 'application/json'
            }

        });
        result = result.json();
        console.log("result", result);

    }*/

    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const registerUser = async (data) => {
        try {
            const request = { ...data, status: 'active' };
            await axios.post('http://localhost:4000/users', request);
            navigate('/login')  ;
            toast.success("Registration Succuessful..!")
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='wrapclass'>
            <div className="registration-form w-svw">
                <h2>User Registration</h2>
                <form onSubmit={handleSubmit(registerUser)}>
                    <label htmlFor="username">Username</label>
                    <input type="text" {...register('username')} placeholder='User-Name'/*value={name} onChange={(event) => setName(event.target.value)}*/ id="username" name="username" required />

                    <label htmlFor="email">Email</label>
                    <input type="email" {...register('email')} placeholder='Email' /*value={email} onChange={(event) => setEmail(event.target.value)}*/ id="email" name="email" />

                    <label htmlFor="password">Password</label>
                    <input type="password" {...register('password')} placeholder='Password' /*value={password} onChange={(event) => setPassword(event.target.value)}*/ id="password" name="password" required />

                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" {...register('confirm-password')} placeholder='Confirm Password' /*value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)}*/ id="confirm-password" name="confirm-password" required />

                    <label htmlFor="text">Role</label>
                    <input type="text" {...register('role')} /*value={role} onChange={(event) => setRole(event.target.value)}*/ id="role" name="Role" required placeholder='Admin/User' />

                    <label htmlFor="text">Status</label>
                    <input className="" type="text" {...register('status')} /*value={status} onChange={(event) => setStatus(event.target.value)}*/ id="status" name="Status" required placeholder='Active/Inactive' />
                    <button type='submit' className='registerButton' href="#" onClick={register}>Register</button>
                    <a
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-40"
                        href="/"
                    >
                        Already registered?
                    </a>
                </form>
            </div>
        </div>
    )

}

export default register;