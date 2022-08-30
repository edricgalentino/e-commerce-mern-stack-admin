import React from "react";

const PaymentSuccess = () => {
    return (
        <>
            <div className="flex justify-center items-center h-screen w-full gap-5 flex-col">
                <span className=" bg-teal-700 text-3xl p-2 px-9 rounded-full text-white hover:ring-4 hover:ring-slate-400 transition-all">Success!</span>
                <span className="text-xl">Your order is being prepared. Thanks for choosing Shoppie.</span>
            </div>
        </>
    );
};

export default PaymentSuccess;
