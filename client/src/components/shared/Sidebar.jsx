import {
    RiHome6Line,
    RiSettingsLine,
    RiLogoutCircleRLine
} from "react-icons/ri";
import { GrDocumentConfig } from "react-icons/gr";
import { MdOutlinePointOfSale } from "react-icons/md";
import { BrowserRouter, NavLink } from "react-router-dom";
import { VitecLogo } from "../../utils/VitecLogo";
import axios from "axios";
import { useAuthContext } from "../providers/AuthProvider";

export function Sidebar({ onItemClick, activedCats, showMenu }) {

    const activatedLink = "p-4 flex justify-center rounded-xl";
    const { setIsAuthenticated } = useAuthContext();

    const logOut = async () => {
        try {
            console.log('Cerrando sesión...');
            const response = await axios.post('http://localhost:3000/api/auth/signout', {}, {
                withCredentials: true,
            });
            console.log('Sesión cerrada exitosamente');
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.warn('El usuario no tiene token o es inválido');
            } else {
                console.error('Error verificando el token:', error);
            }
            return null;
        }
    }

    const handleLogout = async () => {
        const result = await logOut();
    
        if (result) {
            setIsAuthenticated(false);
        } else {
            console.warn('No se pudo cerrar sesión correctamente.');
        }
    }

    return (
        <div className={`bg-neutral-800 fixed lg:left-0 top-0 w-24 h-full flex flex-col justify-between py-6 rounded-tr-xl rounded-br-xl z-50 transition-all ${showMenu ? "left-0" : "-left-full"}`}>
            <BrowserRouter>
                <div>
                    <ul className="pt-2">
                        <li>
                            <VitecLogo />
                        </li>
                        <li className="hover:bg-[#333332d8] px-4 rounded-tl-lg rounded-bl-xl">
                            <NavLink
                                to="/"
                                onClick={() => onItemClick('Home')}
                                className={`p-4 flex justify-center rounded-xl text-[#5c9c19d8] ${activedCats = 'Home' ? activatedLink : ""}`}
                            >
                                <div className="flex flex-col items-center">
                                    <RiHome6Line className="text-3xl" />
                                    <span className="text-[12px]">Inicio</span>
                                </div>
                            </NavLink>
                        </li>
                        <li className=" hover:bg-[#333332d8] px-4 rounded-tl-lg rounded-bl-xl group transition-colors">
                            <NavLink
                                to="/"
                                onClick={() => onItemClick('Ventas')}
                                className={`p-4 flex justify-center rounded-xl text-[#5c9c19d8] ${activedCats = 'Ventas' ? activatedLink : ""}`}
                            >
                                <div className="flex flex-col items-center">
                                    <MdOutlinePointOfSale className="text-2xl" />
                                    <span className="text-[12px]">Venta</span>
                                </div>
                            </NavLink>
                        </li>
                        <li className=" hover:bg-[#333332d8] px-4 rounded-tl-lg rounded-bl-xl group transition-colors">
                            <NavLink
                                to="/"
                                onClick={() => onItemClick('Control')}
                                className={`p-4 flex justify-center rounded-xl text-[#5c9c19d8] ${activedCats = 'Control' ? activatedLink : ""}`}
                            >
                                <div className="flex flex-col items-center">
                                    <GrDocumentConfig className="text-2xl" />
                                    <span className="text-[12px]">Control</span>
                                </div>
                            </NavLink>
                        </li>
                        {/* <li className=" hover:bg-[#262837] px-4 rounded-tl-lg rounded-bl-xl group transition-colors">
                        <NavLink
                        to="/"
                        onClick={() => onItemClick('Usuarios')}
                        className={`p-4 flex justify-center rounded-xl text-[#5c9c19d8] ${activedCats='Usuarios' ? activatedLink : ""}`}
                    >
                        <div className="flex flex-col items-center">
                            <FaUserGear className="text-2xl" />
                            <span className="text-[12px]">Usuarios</span>
                        </div>
                    </NavLink>
                    </li> */}
                        <li className=" hover:bg-[#333332d8] px-4 rounded-tl-lg rounded-bl-xl group transition-colors">
                            <NavLink
                                to="/"
                                onClick={() => onItemClick('Configuracion')}
                                className={`p-4 flex justify-center rounded-xl text-[#5c9c19d8] ${activedCats = 'Configuracion' ? activatedLink : ""}`}
                            >
                                <div className="flex flex-col items-center">
                                    <RiSettingsLine className="text-2xl" />
                                    <span className="text-[12px]">Config</span>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li className=" hover:bg-[#333332d8] px-4 rounded-tl-lg rounded-bl-xl group transition-colors">
                            <NavLink
                                to="/"
                                onClick={handleLogout}
                                className={`p-4 flex justify-center rounded-xl text-[#5c9c19d8] ${activedCats = 'Logout' ? activatedLink : ""}`}
                            >
                                <div className="flex flex-col items-center">
                                    <RiLogoutCircleRLine className="text-2xl" />
                                    <span className="text-[12px]">Salir</span>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </BrowserRouter>
        </div>
    );
};