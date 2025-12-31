import React, { useState } from 'react';
import axios from "axios";
import { VitecLogo } from '../../utils/VitecLogo';

export const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(email, password);
            const response = await axios.post('http://localhost:3000/api/auth/signin', {
                email: email,
                password: password
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                onLoginSuccess();
            } else {
                setError('Email o contraseña incorrecta');
            }
        } catch (err) {
            setError('Email o contraseña incorrecta');
        }
    };

    return (
        <div className='flex flex-row w-full justify-center py-6 bg-[#333332d8]'>
            <form onSubmit={handleSubmit} className='flex 
                flex-col 
                items-center 
                gap-4 
                w-full 
                max-w-[500px] 
                px-8 pb-4 
                bg-neutral-800 
                rounded-xl
                shadow-lg'
            >
                <VitecLogo />
                <span className='text-3xl text-[#adadad]'>STACK-STORE v2.1.0</span>
                <span className='w-full flex flex-col gap-2'>
                    <label for="email" className="text-[#5c9c19d8] self-start font-semibold">Email</label>
                    <input type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        placeholder="Correo electrónico" 
                        className='text-[#adadad] 
                            px-3 py-2
                            rounded-lg 
                            w-full 
                            flex 
                            items-center 
                            gap-2 
                            border-none 
                            bg-[#9c9c9c60] 
                            outline-[2px] 
                            focus:outline-[2px]
                        ' 
                    />
                </span>
                <span className='w-full flex flex-col gap-2'>
                    <label for="password" className="text-[#5c9c19d8] self-start font-semibold">Contraseña</label>
                    <input type="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        placeholder="Password" 
                        className='text-[#adadad] 
                            px-3 py-2
                            rounded-lg 
                            w-full 
                            flex 
                            items-center 
                            gap-2 
                            border-none 
                            bg-[#9c9c9c60] 
                            outline-[2px] 
                            focus:outline-[2px]
                        ' 
                    />
                </span>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <span className='text-[#9c9c9c60]'><a href="#">Forgot password?</a></span>
                <input type="submit" value="INICIAR SESION" className='w-full 
                    py-2 px-2
                    translate-x-1
                    flex 
                    items-center 
                    gap-2 
                    rounded-lg 
                    cursor-pointer 
                    font-semibold 
                    text-lg 
                    border-none
                    max-w-[200px]
                    text-[#adadad]
                    bg-[#9c9c9c60]
                    hover:bg-[#5c9c19d8]' 
                />
                <span className="no-underline text-[#9c9c9c60]">No tienes cuenta? <a className="no-underline text-[#5c9c19d8]" href="#">Registrarse</a></span>
            </form>
        </div>
    );
};