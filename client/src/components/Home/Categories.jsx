import React, { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../data";

const Categories = () => {
    const [isCategoryHovered, setIsCategoryHovered] = useState(false);
    return (
        <>
            <div className="flex md:flex-row flex-col justify-around m-5 mt-10  gap-5">
                {categories.map((category, index) => {
                    return (
                        <Link
                            key={index}
                            onMouseEnter={() => {
                                setIsCategoryHovered(true);
                            }}
                            onMouseLeave={() => {
                                setIsCategoryHovered(false);
                            }}
                            to={`/list-product/${category.category}`}
                            className="flex w-full md:h-[35rem] h-[25rem] z-30 relative justify-center items-center bg-cover"
                            style={{ backgroundImage: `url(${category.img})`, backgroundPosition: "center" }}
                        >
                            <div className="flex flex-col items-center w-full h-full relative transition-all justify-center">
                                <h1 className="text-[40px] text-white whitespace-nowrap font-bold">{category.title}</h1>
                                <Link to={`/list-product/${category.category}`} className=" w-40 mt-4 p-2 font-semibold bg-white hover:bg-slate-300 text-black">
                                    SHOP NOW
                                </Link>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <div className="flex md:flex-row flex-col justify-around gap-5 m-5">
                {[
                    { img: "https://images.unsplash.com/photo-1612722432474-b971cdcea546?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80", title: "NEW DRESSES", category: "dresses" },
                    { img: "https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80", title: "THE PERFECT JEANS", category: "jeans" },
                ].map((category, index) => {
                    return (
                        <div
                            onMouseEnter={() => {
                                setIsCategoryHovered(true);
                            }}
                            onMouseLeave={() => {
                                setIsCategoryHovered(false);
                            }}
                            key={index}
                            className="flex w-full md:h-[30rem] h-[20rem] justify-center items-center bg-cover"
                            style={{ backgroundImage: `url(${category.img})`, backgroundPosition: "center" }}
                        >
                            <div className="flex flex-col items-center">
                                <h1 className="text-[40px] text-white whitespace-nowrap font-bold">{category.title}</h1>
                                <Link to={`/list-product/${category.category}`} className=" w-40 mt-4 p-2 font-semibold bg-white hover:bg-slate-300 text-black">
                                    SHOP NOW
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Categories;
