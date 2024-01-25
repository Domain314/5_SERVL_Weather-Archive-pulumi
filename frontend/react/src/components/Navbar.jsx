import React from "react";
import ButtonStandard from "./standards/ButtonStandard";
import Logo from "../assets/img/logo/logo-sky-200.png"

import { useNavigate } from "react-router-dom";



function Navbar({ }) {

    const navigate = useNavigate();

    const clickHandler = () => {
        navigate("/");
    }

    return (
        <div className="w-full z-[10000] pl-4 pt-4">
            <div className="w-full flex justify-center">
                <nav className="w-fit flex items-center ml-0 mr-auto p-4 max-w-full relative bg-sky-900/50 hover:bg-sky-900/80 text-sky-500 hover:text-sky-200 rounded hover:shadow-lg hover:shadow-sky-200/20 focus:shadow-lg focus:shadow-sky-200/50 transition-all duration-200 ease-in-out">
                    {/* Logo */}
                    <button
                        aria-label="scroll to top"
                        href="#hero"
                        className="navigation-scroll"
                        onClick={clickHandler}
                    >
                        <img className="h-[45px] md:h-[55px] lg:h-[60px]" src={Logo} alt="Logo" />
                    </button>

                    {/* className optional for overwriting classes (zB color) */}
                    <ButtonStandard content="The Weather Archive" onClick={clickHandler} className="p-4" />

                    <div className="flex gap-2 items-center ml-auto">
                    </div>
                </nav>
            </div>


        </div>


    );
}

export default Navbar;