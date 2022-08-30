import React, { useState } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { AiOutlineUser, AiOutlinePoweroff } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
// import { useSelector } from "react-redux";

const Topbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    // const user = useSelector((state) => state.user);

    return (
        <>
            <nav className="flex border-b-2 border-slate-200 fixed z-20 bg-white  w-full h-14 justify-between items-center p-5 px-10">
                <div className="logo">
                    <h1 className=" font-bold text-2xl text-indigo-600">Shoppie Admin</h1>
                </div>
                <div className="user-nav h-full flex gap-3 items-center">
                    <div className=" hover:bg-slate-200 p-2 items-center cursor-pointer justify-center flex transition-all hover:rounded-full">
                        <IoNotificationsSharp color="rgb(55 48 163)" size={"22px"} />
                    </div>
                    <div className=" hover:bg-slate-200 p-2 items-center cursor-pointer justify-center flex transition-all hover:rounded-full">
                        <IoMdMail color="rgb(55 48 163)" size={"22px"} />
                    </div>
                    <div className=" hover:bg-slate-200 p-2  items-center cursor-pointer justify-center flex transition-all hover:rounded-full">
                        <div
                            className="flex justify-center items-center gap-4"
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen);
                            }}
                        >
                            <div className="avatar online">
                                <div className="w-9 rounded-full">
                                    <img src="https://placeimg.com/192/192/people" alt="" />
                                </div>
                            </div>
                            {/* <h1 className="text-lg font-semibold">{user.user.username}</h1> */}
                            <RiArrowDropDownLine />
                        </div>
                        <div className={`${isMenuOpen ? "flex mt-40 transition-all" : "hidden mb-16 transition-all"} flex-col transition-all justify-center items-center absolute rounded-xl border-4 shadow-xl right-10 w-40 h-24 bg-white`}>
                            <div className=" w-full h-full flex justify-center items-center gap-3 rounded-t-lg hover:bg-slate-200">
                                <AiOutlineUser />
                                <h1 className=" text-md font-semibold">Profile</h1>
                            </div>
                            <div
                                onClick={() => {
                                    handleLogout();
                                }}
                                className=" w-full h-full flex justify-center items-center gap-3 rounded-b-lg hover:bg-slate-200"
                            >
                                <AiOutlinePoweroff />
                                <h1 className=" text-md font-semibold">Logout</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Topbar;
