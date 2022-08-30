import React from "react";
import { IoMdClose } from "react-icons/io";

const Annoucement = ({ setShowAnnouncement }) => {
    return (
        <>
            <div className="flex items-center font-main bg-teal-600">
                <h1 className=" mx-auto text-center font-semibold text-white p-1 text-lg">GET DISCOUNT UP TO 75%!</h1>
                <div className="flex justify-end">
                    <IoMdClose color="white" className=" cursor-pointer mr-3" onClick={() => setShowAnnouncement(false)} size={"20px"} />
                </div>
            </div>
        </>
    );
};

export default Annoucement;
