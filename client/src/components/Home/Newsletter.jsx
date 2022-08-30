import React from "react";
import { IoSend } from "react-icons/io5";

const Newsletter = () => {
    return (
        <>
            <div className="flex w-full h-[27rem] justify-center items-center flex-col gap-5 bg-pink-50">
                <h1 className=" text-center font-bold text-black md:text-7xl text-5xl">Newsletter</h1>
                <h1 className=" text-center  text-black md:text-2xl text-xl">Get timely updates from your favorite products</h1>
                <div className="input flex items-center md:w-1/3 w-3/4 justify-between p-2 gap-1">
                    <input type="text" placeholder="Your email" className="bg-transparent w-full border-2 outline-slate-400 rounded-none border-slate-300 p-2" />
                    <IoSend className={`cursor-pointer bg-teal-600 w-20 h-11 p-2 hover:bg-teal-800`} size={"24px"} color={"white"} />
                </div>
            </div>
        </>
    );
};

export default Newsletter;
