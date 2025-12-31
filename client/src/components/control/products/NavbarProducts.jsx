import { BrowserRouter, NavLink } from "react-router-dom";
import { useState } from "react";

export function NavbarProducts({ onCategoryChange }) {

    const [activedCats, setActivedCats] =
    useState({
      List: true,
      Upload: false,
      Update: false
    });

    const handleClick = (option) => {
        setActivedCats({
          List: option === 'List',
          Upload: option === 'Upload',
          Update: option === 'Update'
        });
        onCategoryChange(option);
      };

    const activatedLink = "border border-[#5c9c19d8] border-b-0 bg-neutral-800";

    return (
        <nav className="text-gray-300 flex flex-row items-center justify-start w-auto md:gap-1 text-xl p-auto productsnav">
            <BrowserRouter>
                <NavLink
                    to="/"
                    onClick={() => handleClick('List')}
                    className={`text-gray-300 rounded-t-md px-3 ${activedCats.List ? activatedLink : "bg-[#333332d8]"}`}
                >
                    Productos
                </NavLink>
                <NavLink
                    to="/"
                    onClick={() => handleClick('Upload')}
                    className={`text-gray-300 rounded-t-md px-3 ${activedCats.Upload ? activatedLink : "bg-[#333332d8]"}`}
                >
                    +
                </NavLink>
            </BrowserRouter>
        </nav>
    );
};