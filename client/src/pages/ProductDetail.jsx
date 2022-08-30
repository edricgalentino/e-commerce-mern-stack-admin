import React, { useEffect, useState } from "react";
import Select from "react-select";
import { BiPlus, BiMinus } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API, configJSON } from "../config/api";
import Swal from "sweetalert2";
import { addProduct } from "./../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Product = () => {
    const [count, setCount] = useState(1);
    const [data, setData] = useState([]);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isWishlistHovered, setIsWishlistHovered] = useState(false);
    const [isBackLinkHovered, setIsBackLinkHovered] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("black");
    const idInUrl = window.location.href.split("/")[window.location.href.split("/").length - 1];
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const userData = useSelector((state) => state.user);
    const language = useSelector((state) => state.language.language);
    console.log(data);
    const navigate = useNavigate();
    const selectedItem = {
        productId: data?.id || data?._id,
        quantity: count,
        size: selectedSize,
        color: selectedColor,
        price: data?.price,
        name: data?.name,
        img: data?.img,
    };
    console.log(cart);

    const handleAddToCart = () => {
        // check if value of selectedItem is empty
        if (Object.values(selectedItem).includes("")) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Size must be selected!",
            });
        } else {
            // check if user is logged in from token
            if (localStorage.getItem("token")) {
                // dispatch(addProduct({ product: selectedItem, quantity: count, total: data.price * count }));
                // Swal.fire({
                //     icon: "success",
                //     title: "Success",
                //     text: "Product added to cart!",
                // });
                let dataProduct = cart.products.concat(selectedItem);
                const newItemToCart = {
                    userId: userData.user?.id || userData.user?._id,
                    quantity: cart.quantity + count,
                    total: cart.total + data?.price * count,
                    products: dataProduct,
                };
                if (cart.products.length > 0) {
                    API.put(
                        `/cart/${userData.user?.id || userData.user?._id}`,
                        newItemToCart,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        },
                        configJSON
                    )
                        .then((res) => {
                            Swal.fire({
                                title: "Success",
                                text: "Product has been added to cart",
                                icon: "success",
                                confirmButtonText: "OK",
                            });
                            console.log("put");
                            dispatch(addProduct({ product: selectedItem, quantity: count, total: data.price * count }));
                        })
                        .catch((err) => {
                            console.log(err);
                            Swal.fire({
                                title: "Error",
                                text: "Failed to add product to cart",
                                icon: "error",
                                confirmButtonText: "OK",
                            });
                        });
                } else {
                    API.post(
                        `/cart/`,
                        newItemToCart,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        },
                        configJSON
                    )
                        .then((res) => {
                            Swal.fire({
                                title: "Success",
                                text: "Product has been added to cart",
                                icon: "success",
                                confirmButtonText: "OK",
                            });
                            console.log("add");
                            dispatch(addProduct({ product: selectedItem, quantity: count, total: data.price * count }));
                        })
                        .catch((err) => {
                            console.log(err);
                            Swal.fire({
                                title: "Error",
                                text: "Failed to add product to cart",
                                icon: "error",
                                confirmButtonText: "OK",
                            });
                        });
                }
            } else {
                Swal.fire({
                    title: "You must be logged in to add to cart",
                    text: "Redirecting to login page...",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                }).then(() => {
                    navigate("/login");
                });
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await API.get(`/product/find/${idInUrl}`);
            setData(result.data);
        };
        fetchData();
    }, [idInUrl]);

    return (
        <>
            <Navbar />
            <div className="flex w-5/6 mx-auto h-12 items-center justify-between p-5 my-5">
                <Link
                    to={"/list-product/all"}
                    onMouseEnter={() => setIsBackLinkHovered(true)}
                    onMouseLeave={() => setIsBackLinkHovered(false)}
                    className={`${isBackLinkHovered ? "underline" : ""} p-3 flex justify-center items-center gap-4 text-xl hover:cursor-pointer`}
                >
                    <BsArrowLeft className={`${isBackLinkHovered ? "right-3" : "right-0"} transition-all relative text-2xl`} />
                    <h1>{language === "ID" ? "Kembali ke list produk" : "Back to product list"}</h1>
                </Link>
                <div className="wishlist relative flex justify-between gap-2 items-center">
                    <h1 className={`text-lg font-semibold relative transition-all  ${isWishlistHovered ? "opacity-100 right-5" : "md:opacity-0 right-0 block"}`}>{isWishlisted ? "Remove from wishlist" : "Add to wishlist !"}</h1>
                    <button
                        onClick={() => {
                            setIsWishlisted(!isWishlisted);
                        }}
                        onMouseEnter={() => {
                            setIsWishlistHovered(true);
                        }}
                        onMouseLeave={() => {
                            setIsWishlistHovered(false);
                        }}
                        className="icon z-50 bg-white hover:bg-slate-200 rounded-full p-3"
                    >
                        {isWishlisted ? <AiFillHeart size={"34px"} color={"red"} /> : <AiOutlineHeart size={"34px"} color={"red"} />}
                    </button>
                </div>
            </div>
            <div className="flex justify-between md:flex-row flex-col md:gap-5 px-12 w-full">
                <div className="flex md:basis-5/12 justify-center">
                    <img className="md:w-4/6 w-2/3 bg-cover object-cover" src={data?.img} alt="" />
                </div>
                <div className="flex flex-col md:basis-7/12 lg:pr-32 md:w-40 w-full md:py-0 py-9 gap-7 items-start">
                    <h1 className="text-4xl text-start">{data?.name}</h1>
                    <p className="text-lg text-start">{data?.description}</p>
                    <h1 className="text-6xl font-thin">$ {data?.price}</h1>
                    <div className="flex justify-between xl:w-2/3 gap-4 w-full items-center">
                        <div className="color justify-center items-center flex md:gap-3 gap-1">
                            <h1 className=" text-xl font-bold">Color:</h1>
                            <div className="grid md:grid-cols-5 grid-cols-3 gap-3 p-1 justify-end items-end">
                                {data?.color?.map((color) => (
                                    <>
                                        <div
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-5 h-5 rounded-full border-2 border-black hover:ring-4 hover:ring-slate-300 ${color === selectedColor ? "ring-4 ring-slate-400" : ""}`}
                                            key={color}
                                            style={{ backgroundColor: color }}
                                        ></div>
                                    </>
                                ))}
                            </div>
                        </div>
                        <div className="size justify-center items-center flex gap-3">
                            <h1 className=" text-xl font-bold">Size:</h1>
                            <Select onChange={(e) => setSelectedSize(e.value)} options={data?.size?.map((size) => ({ value: size, label: size }))} />
                        </div>
                    </div>
                    <div className="flex justify-between xl:w-2/3 w-full items-center">
                        <div className="color justify-center items-center flex gap-3">
                            <button
                                onClick={() => {
                                    setCount(count - 1);
                                }}
                                className={`${count === 1 ? "pointer-events-none" : ""} transition-all hover:bg-slate-200 p-2 hover:rounded-full`}
                            >
                                <BiMinus size={"32px"} color={`${count === 1 ? "darkgray" : ""}`} />
                            </button>
                            <h1 className="text-3xl">{count}</h1>
                            <button
                                onClick={() => {
                                    setCount(count + 1);
                                }}
                                // className={`${count === data.stock ? "pointer-events-none" : ""}`}
                                className={` transition-all hover:bg-slate-200 p-2 hover:rounded-full`}
                            >
                                <BiPlus size={"32px"} />
                            </button>
                        </div>
                        <div className="justify-center items-center flex gap-3">
                            {data?.inStock ? (
                                <button onClick={() => handleAddToCart()} className=" bg-transparent md:text-base text-xs border-2 border-black hover:text-white hover:bg-black p-3">
                                    {language === "ID" ? "TAMBAH KE KERANJANG" : "ADD TO CART"}
                                </button>
                            ) : (
                                <button onClick={() => handleAddToCart()} className=" bg-transparent md:text-base text-xs border-2 border-black hover:text-white hover:bg-black p-3">
                                    {language === "ID" ? "TAMBAH KE KERANJANG" : "ADD TO CART"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Product;
