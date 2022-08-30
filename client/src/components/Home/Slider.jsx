import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { sliderItems } from "../../data";

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    return (
        <>
            <div className="flex w-full overflow-hidden justify-between items-center h-[88vh] ">
                <div
                    className={`arrow-left ${currentIndex === 0 ? "opacity-0 pointer-events-none" : "block"} relative z-30 md:px-8 px-4 cursor-pointer`}
                    onClick={() => {
                        currentIndex > 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(sliderItems.length - 1);
                    }}
                >
                    <IoIosArrowBack size={"25px"} />
                </div>
                <div className=" absolute flex overflow-x-hidden">
                    {sliderItems.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`flex lg:flex-row flex-col min-w-full lg:gap-0 gap-5 h-[88vh] mx-0 pt-5 lg:pt-0bg-red-200 items-center transition-all-1000`}
                                style={{ transform: `translateX(-${currentIndex * 100}%)`, backgroundColor: `#${item.bg}` }}
                            >
                                <div className="img basis-5/12 bg-cover flex justify-center">
                                    <img src={item.img} alt="" className="lg:w-[400px] w-2/3" />
                                </div>
                                <div className="caption flex basis-7/12 w-5/6 flex-col gap-4 lg:text-start text-center lg:items-start items-center">
                                    <h1 className="lg:text-[70px] text-2xl mt-8 font-semibold">{item.title}</h1>
                                    <h1 className="lg:text-3xl text-xl ">{item.desc}</h1>
                                    <Link to={`/list-product/${item.title.split(" ")[0].toLowerCase()}`} className="border-2 text-center border-black w-40 mt-4 p-2 font-semibold hover:bg-black hover:text-white">
                                        SHOP NOW
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div
                    className={`arrow-right ${currentIndex === sliderItems.length - 1 ? "opacity-0 pointer-events-none" : "block"} relative z-30 md:px-8 px-4 cursor-pointer`}
                    onClick={() => {
                        currentIndex < sliderItems.length - 1 ? setCurrentIndex(currentIndex + 1) : setCurrentIndex(0);
                    }}
                >
                    <IoIosArrowForward size={"25px"} />
                </div>
            </div>
        </>
    );
};

export default Slider;
