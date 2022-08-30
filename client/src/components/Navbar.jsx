import React, { useState } from "react";
import Annoucement from "../components/Home/Annoucement";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { US, ID } from "country-flag-icons/react/3x2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../redux/langRedux";
import { FaUserAlt, FaPowerOff, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const quantity = useSelector((state) => state.cart.quantity);
    const language = useSelector((state) => state.language.language);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [showLanguage, setShowLanguage] = useState(false);
    const [showAnnoucement, setShowAnnoucement] = useState(true);
    const [showProfileNavigation, setShowProfileNavigation] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            window.location.href = `/list-product/${searchInput}`;
        } else {
            return;
        }
    };

    return (
        <>
            {showAnnoucement && <Annoucement setShowAnnouncement={(value) => setShowAnnoucement(value)} />}
            <div className="flex justify-between p-7 py-10 h-14 z-50 shadow-lg relative items-center font-main">
                <div className="flex justify-evenly gap-4 items-center">
                    <div className="flex flex-col">
                        <h1
                            className="text-lg  flex items-center cursor-pointer"
                            onClick={() => {
                                setShowLanguage(!showLanguage);
                            }}
                        >
                            {language} <IoMdArrowDropdown />
                        </h1>
                        <div className={`w-20 h-20 flex left-4 ${showAnnoucement ? "top-24" : "top-20"} border-black border-2 z-10 flex-col justify-around items-center bg-white ${showLanguage ? "absolute" : "hidden"}`}>
                            <div
                                onClick={() => {
                                    dispatch(setLanguage("EN"));
                                    setShowLanguage(false);
                                }}
                                className=" flex justify-center items-center gap-2 font-semibold hover:bg-slate-200 w-full h-full"
                            >
                                <US className=" w-7" />
                                EN
                            </div>
                            <div
                                onClick={() => {
                                    dispatch(setLanguage("ID"));
                                    setShowLanguage(false);
                                }}
                                className=" flex justify-center items-center gap-2 font-semibold hover:bg-slate-200 w-full h-full"
                            >
                                <ID className=" w-7" />
                                ID
                            </div>
                        </div>
                    </div>
                    <div className="input md:flex hidden items-center border-2 border-black gap-2 p-2">
                        <input type="text" onChange={(e) => setSearchInput(e.target.value)} onKeyDown={(e) => handleSearch(e)} placeholder="shirt, jeans, blouse ..." className="bg-transparent outline-none" />
                        <AiOutlineSearch className=" cursor-pointer" onClick={() => (window.location.href = `/list-product/${searchInput}`)} />
                    </div>
                </div>
                <div className=" flex justify-center">
                    <Link to={"/"} className=" text-center text-3xl font-bold">
                        SHOPPIE
                    </Link>
                </div>
                <div className="flex gap-5 items-center">
                    <Link to={"/cart"} className="cart flex">
                        <AiOutlineShoppingCart className=" cursor-pointer mb-2" size={"30px"} />
                        <div className=" w-3 h-3 bg-black flex items-center justify-center p-3 text-xs text-white rounded-full relative right-2 bottom-1">{quantity}</div>
                    </Link>
                    {user.isLoggedIn ? (
                        <>
                            <div className=" flex items-center justify-center gap-2" onClick={() => setShowProfileNavigation(!showProfileNavigation)}>
                                <FaUserCircle size={"30px"} />
                                <h1 className="text-lg  flex items-center font-semibold cursor-pointer" onClick={() => setShowProfileNavigation(!showProfileNavigation)}>
                                    {user.user.username} <IoMdArrowDropdown size={"20px"} />
                                </h1>
                            </div>
                            <div className={`w-36 h-24 flex right-7 ${showProfileNavigation ? "top-16" : "top-18"} border-black border-2 z-10 flex-col justify-around items-center bg-white ${showProfileNavigation ? "absolute" : "hidden"}`}>
                                <Link to={"/"} className=" flex justify-center items-center gap-2 font-semibold hover:bg-slate-200 w-full h-full">
                                    <FaUserAlt />
                                    Profile
                                </Link>
                                <div onClick={() => handleLogout()} className=" flex justify-center items-center gap-2 font-semibold hover:bg-slate-200 w-full h-full">
                                    <FaPowerOff />
                                    Logout
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {" "}
                            <Link to={"/register"} className="text-lg md:block hidden cursor-pointer">
                                {language === "ID" ? "DAFTAR" : "REGISTER"}
                            </Link>
                            <Link to={"/login"} className="text-lg cursor-pointer">
                                {language === "ID" ? "MASUK" : "LOGIN"}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
