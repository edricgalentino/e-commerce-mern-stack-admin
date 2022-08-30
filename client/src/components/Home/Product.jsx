import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Swal from "sweetalert2";

const Product = ({ product, key }) => {
    const [info, setInfo] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        if (cart.products.length > 0) {
            // eslint-disable-next-line array-callback-return
            cart.products.map((item) => {
                if (item.id === product._id) {
                    setIsAddedToCart(true);
                }
            });
        }
    }, [cart.products, product._id]);

    // useEffect(() => {
    //     if (userData.wishlist.length > 0) {
    //         userData.wishlist.map((item) => {
    //             if (item.id === product._id) {
    //                 setIsWishlisted(true);
    //             }
    //         });
    //     }
    // }, [userData.wishlist]);

    // useEffect(() => {
    //     if (product.wishlist.includes(localStorage.getItem("userId"))) {
    //         setIsWishlisted(true);
    //     }
    // }, [product.wishlist]);

    // useEffect(() => {
    //     if (product.cart.includes(localStorage.getItem("userId"))) {
    //         setIsAddedToCart(true);
    //     }
    // }, [product.cart]);

    return (
        <>
            <div key={key} className={`w-full z-10 relative transition-all bg-white rounded-lg hover:ring-8 p-1 border-slate-200 hover:ring-slate-200 shadow-xl`}>
                <div onMouseEnter={() => setInfo(true)} onMouseLeave={() => setInfo(false)} className="flex justify-center items-center w-full -z-10">
                    <Link to={`/detail-product/${product._id}`}>
                        <img src={product.img} alt="" className="-z-10 rounded-lg rounded-b-md md:w-96 object-cover md:h-[300px] w-[200px] h-[200px]" />
                    </Link>
                    <div className={`hidden md:mt-0 mt-72 justify-center items-center md:gap-4 gap-2`}>
                        <Link to={`/detail-product/${product._id}`} className={`icon z-50 bg-white hover:bg-slate-200 rounded-full p-3 ${isAddedToCart ? "pointer-events-none" : ""}`}>
                            {isAddedToCart ? <BsCheck2 size={"24px"} color={"green"} /> : <AiOutlineShoppingCart size={"24px"} color={"green"} />}
                        </Link>
                        <Link to={`/detail-product/${product._id}`} className="icon bg-white hover:bg-slate-200 rounded-full p-3">
                            <AiOutlineSearch size={"24px"} color={"blue"} />
                        </Link>
                        <button
                            onClick={() => {
                                setIsWishlisted(!isWishlisted);
                            }}
                            className="icon z-50 bg-white hover:bg-slate-200 rounded-full p-3"
                        >
                            {isWishlisted ? <AiFillHeart size={"24px"} color={"red"} /> : <AiOutlineHeart size={"24px"} color={"red"} />}
                        </button>
                    </div>
                </div>
                <div className="info flex flex-col justify-start text-start items-start w-full p-2 py-3">
                    <h1 className=" text-xl ">{product.name}</h1>
                    <h1 className=" font-semibold text-2xl pt-1">$ {product.price}</h1>
                </div>
            </div>
        </>
    );
};
// ${info ? "hidden md:flex md:absolute" : "hidden md:absolute"}

export default Product;
