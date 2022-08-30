import React, { useEffect, useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../config/api";
import Swal from "sweetalert2";
import { addOneProduct, removeOneProduct, removeProduct } from "./../redux/cartRedux";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const language = useSelector((state) => state.language.language);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const removeaProduct = (id, price) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "rgb(13 148 136)",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
                dispatch(
                    removeProduct({
                        id: id,
                        price: price,
                    })
                );
            }
        });
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        if (user.user?.id || user.user?._id) {
            API.post(
                `/payment/create-checkout-session`
                // {
                //     userId: user.user?.id || user.user?._id,
                //     products: cart.products,
                //     total: cart.total,
                // },
                // {
                //     headers: {
                //         "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
                //         // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                //         "Access-Control-Allow-Origin": "http://localhost:5000",
                //     },
                //     contentType: "application/json",
                //     // access control allow origin
                //     crossDomain: true,
                //     // access control allow methods
                //     // withCredentials: true,
                //     // access control allow headers
                // }
            )
                .then((res) => {
                    // redirect to res.request.responseURL page
                    window.location.href = res.request.responseURL;
                    // navigate(res.request.responseURL);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            Swal.fire({
                title: "Please login first",
                text: "You need to login first to checkout",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "rgb(13 148 136)",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login",
            }).then((result) => {
                if (result.value) {
                    navigate("/login");
                }
            });
        }
    };

    const handleProductCount = (e, method) => {
        if (method === "p") {
            // increase amount of product
        } else {
            if (e === 1) {
                // remove product with API.delete
            } else {
                // decrease amount of product
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex items-center px-5 py-10 flex-col w-full">
                <h1 className="text-center text-4xl ">{language === "ID" ? "KERANJANG KU" : "MY CART"} edit with data, increasing, decreasing, remove</h1>
                <div className="info flex justify-between w-full items-center pt-4">
                    <div className="continue-shop-button">
                        <Link to={"/list-product/all"} className=" border-2 border-black p-2 bg-white text-black hover:bg-black hover:text-white uppercase">
                            {cart.products.length === 0 ? (language === "ID" ? "Mulai Belanja" : "Start Shopping") : language === "ID" ? "Lanjut Belanja" : "Continue Shopping"}
                        </Link>
                    </div>
                    <div className="info md:flex hidden justify-center w-64">
                        <Link to={"/"} className="underline">
                            {language === "ID" ? "Wishlist ku" : "My Wishlist"} (0)
                        </Link>
                    </div>
                    <form action="http://localhost:5000/payment/create-checkout-session" method="POST">
                        <button className=" border-2 border-black p-2 bg-black text-white uppercase">{language === "ID" ? "Pesan sekarang" : "Checkout now"}</button>
                    </form>
                </div>
                <div className="flex w-full my-10 lg:flex-row flex-col gap-3">
                    <div className="lg:w-3/4 w-full p-3 mx-auto">
                        {cart.products.length !== 0 ? (
                            cart.products.map((product) => (
                                <div key={product.productId} className={` product flex md:flex-row flex-col md:justify-evenly border-y-2 md:gap-0 gap-5 md:items-center items-start p-5`}>
                                    <Link to={`/detail-product/${product.productId}`} className="img basis-1/6 mx-auto md:mx-0">
                                        <img src={product.img} className="md:h-[250px] h-[250px] w-[200px] object-cover rounded-md hover:ring-8 hover:ring-slate-200" alt="" />
                                    </Link>
                                    <div className="flex basis-4/6 flex-col justify-between items-start gap-4 md:px-12">
                                        <h1 className=" text-xl">
                                            <strong>Product: </strong>
                                            {product.name}
                                        </h1>
                                        <h1 className=" text-xl">
                                            <strong>ID: </strong>
                                            {product.productId}
                                        </h1>
                                        <div className="color justify-center items-center flex gap-3">
                                            <h1 className=" text-xl font-bold">Color:</h1>
                                            <div className={`w-5 h-5 rounded-full border-2 border-black ring-4 ring-slate-400`} style={{ backgroundColor: product.color }}></div>
                                        </div>
                                        <h1 className=" text-xl">
                                            <strong>Size: </strong>
                                            {product.size}
                                        </h1>
                                    </div>
                                    <div className="flex basis-1/6 w-full md:flex-col flex-row md:justify-around justify-between gap-5">
                                        <div className="count flex gap-4 justify-center">
                                            <button
                                                onClick={() => {
                                                    if (product.quantity === 1) {
                                                        // removeaProduct(product.productId, product.price);
                                                        console.log("remove");
                                                    } else {
                                                        // dispatch(
                                                        //     removeOneProduct({
                                                        //         id: product.productId,
                                                        //         price: product.price,
                                                        //     })
                                                        // );
                                                        console.log("-1");
                                                    }
                                                }}
                                                className={`${product.quantity < 1 ? " pointer-events-none" : ""}`}
                                            >
                                                <BiMinus size={"32px"} color={`${product.quantity <= 1 ? "darkgray" : ""}`} />
                                            </button>
                                            <h1 className="text-3xl">{product.quantity}</h1>
                                            <button
                                                onClick={() => {
                                                    // dispatch(
                                                    //     addOneProduct({
                                                    //         id: product.productId,
                                                    //         price: product.price,
                                                    //     })
                                                    // );
                                                    console.log("+1");
                                                }}
                                            >
                                                <BiPlus size={"32px"} />
                                            </button>
                                        </div>
                                        <div className="price-per-stuff flex justify-center">
                                            <h1 className=" text-3xl">$ {product.price * product.quantity}</h1>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center h-full justify-center items-center flex">
                                <h1 className="text-center text-2xl ">{language === "ID" ? "Tidak ada produk apapun di keranjang" : "No product in cart"}</h1>
                            </div>
                        )}
                    </div>
                    <div className=" lg:w-1/4 md:w-1/2 md:mx-auto w-full h-min p-5 bg-white border-2  flex flex-col items-start justify-between">
                        <h1 className="text-start text-4xl font-thin uppercase">{language === "ID" ? "Ringkasan Pesanan" : "Order SUMMARY"}</h1>
                        <div className="all-price py-5 gap-2 flex flex-col justify-between items-center w-full">
                            {cart.products.length !== 0 ? (
                                cart.products.map((product) => (
                                    <div key={product.productId} className="price flex justify-between items-center w-full">
                                        <h1 className="text-start text-2xl">{product.name}</h1>
                                        <h1 className="text-start text-2xl">$ {product.price * product.quantity}</h1>
                                    </div>
                                ))
                            ) : (
                                <div className="price flex justify-between items-center w-full">
                                    <h1 className="text-start text-2xl">{language === "ID" ? "Tidak ada produk apapun di keranjang" : "No product in cart"}</h1>
                                </div>
                            )}
                        </div>
                        <div className="total py-5 border-t-2 border-black flex justify-between items-center w-full">
                            <h1 className="text-start text-3xl font-semibold ">Total</h1>
                            <h1 className="text-start text-2xl font-semibold ">$ {cart.products.length !== 0 ? cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0) : 0}</h1>
                        </div>
                        <form onSubmit={(e) => handleCheckout(e)}>
                            <button type="submit" className=" w-full p-2 mx-auto uppercase bg-black text-white">
                                {language === "ID" ? "Pesan sekarang" : "Checkout now"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Cart;

// import React, { useEffect, useState } from "react";
// import { BiPlus, BiMinus } from "react-icons/bi";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { useDispatch, useSelector } from "react-redux";
// import { API } from "../config/api";
// import Swal from "sweetalert2";
// import { addOneProduct, removeOneProduct, removeProduct } from "./../redux/cartRedux";

// const Cart = () => {
//     const cart = useSelector((state) => state.cart);
//     const user = useSelector((state) => state.user);
//     const [dataCart, setDataCart] = useState([]);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const removeaProduct = (id) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "rgb(13 148 136)",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Delete",
//         }).then((result) => {
//             if (result.value) {
//                 dispatch(
//                     removeProduct({
//                         id: id,
//                         price: dataCart[id].price,
//                     })
//                 );
//             }
//         });
//     };

//     const handleCheckout = () => {
//         if (user.user?.id || user.user?._id) {
//             API.post(
//                 `/payment/create-checkout-session`,
//                 {
//                     userId: user.user?.id || user.user?._id,
//                     products: cart.products,
//                     total: cart.total,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 }
//             )
//                 .then((res) => {
//                     navigate(res.data.url);
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         } else {
//             Swal.fire({
//                 title: "Please login first",
//                 text: "You need to login first to checkout",
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "rgb(13 148 136)",
//                 cancelButtonColor: "#d33",
//                 confirmButtonText: "Login",
//             }).then((result) => {
//                 if (result.value) {
//                     navigate("/login");
//                 }
//             });
//         }
//     };

//     useEffect(() => {
//         if (localStorage.getItem("token")) {
//             API.get(`/cart/find/${user.user?._id || user.user?.id}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             })
//                 .then((res) => {
//                     setDataCart(res.data);
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                 });
//         } else {
//             Swal.fire({
//                 icon: "warning",
//                 title: "Error",
//                 text: "You must login first",
//                 confirmButtonText: "OK",
//             }).then(() => {
//                 navigate("/login");
//             });
//         }
//     }, [navigate, user.user?._id, user.user?.id]);

//     return (
//         <>
//             <Navbar />
//             <div className="flex items-center px-5 py-10 flex-col w-full">
//                 <h1 className="text-center text-4xl ">YOUR BAG</h1>
//                 <div className="info flex justify-between w-full items-center pt-4">
//                     <div className="continue-shop-button">
//                         <Link to={"/list-product/all"} className=" border-2 border-black p-2 bg-white text-black hover:bg-black hover:text-white uppercase">
//                             CONTINUE SHOPPING
//                         </Link>
//                     </div>
//                     <div className="info md:flex hidden justify-between w-64">
//                         <Link to={"/"} className="underline">
//                             Shopping Bag ({dataCart?.length || cart.products.length})
//                         </Link>
//                         <Link to={"/"} className="underline">
//                             Your Wishlist (0)
//                         </Link>
//                     </div>
//                     <button onClick={() => handleCheckout()} className=" border-2 border-black p-2 bg-black text-white uppercase">
//                         CHECKOUT NOW
//                     </button>
//                 </div>
//                 <div className="flex w-full my-10 lg:flex-row flex-col gap-3">
//                     <div className="lg:w-3/4 w-full p-3 mx-auto">
//                         {cart.products.length !== 0 ? (
//                             cart.products?.map((product) => (
//                                 <div key={product.productId} className={` ${product.productId === undefined ? "hidden" : "flex"} product flex md:flex-row flex-col md:justify-evenly border-y-2 md:gap-0 gap-5 md:items-center items-start p-5`}>
//                                     <Link to={`/detail-product/${product.productId}`} className="img basis-1/6 mx-auto md:mx-0">
//                                         <img src={product.img} className="md:h-[250px] h-[250px] w-[200px] object-cover rounded-md hover:ring-8 hover:ring-slate-200" alt="" />
//                                     </Link>
//                                     <div className="flex basis-4/6 flex-col justify-between items-start gap-4 md:px-12">
//                                         <h1 className=" text-xl">
//                                             <strong>Product: </strong>
//                                             {product.name}
//                                         </h1>
//                                         <h1 className=" text-xl">
//                                             <strong>ID: </strong>
//                                             {product.productId}
//                                         </h1>
//                                         <div className="color justify-center items-center flex gap-3">
//                                             <h1 className=" text-xl font-bold">Color:</h1>
//                                             <div className={`w-5 h-5 rounded-full border-2 border-black ring-4 ring-slate-400`} style={{ backgroundColor: product.color }}></div>
//                                         </div>
//                                         <h1 className=" text-xl">
//                                             <strong>Size: </strong>
//                                             {product.size}
//                                         </h1>
//                                     </div>
//                                     <div className="flex basis-1/6 w-full md:flex-col flex-row md:justify-around justify-between gap-5">
//                                         <div className="count flex gap-4 justify-center">
//                                             <button
//                                                 onClick={() => {
//                                                     if (product.quantity === 1) {
//                                                         removeaProduct(product.productId);
//                                                     } else {
//                                                         dispatch(
//                                                             removeOneProduct({
//                                                                 id: product.productId,
//                                                                 price: product.price,
//                                                             })
//                                                         );
//                                                     }
//                                                 }}
//                                             >
//                                                 <BiMinus size={"32px"} color={`${product.quantity === 1 ? "darkgray" : ""}`} />
//                                             </button>
//                                             <h1 className="text-3xl">{product.quantity}</h1>
//                                             <button
//                                                 onClick={() => {
//                                                     dispatch(
//                                                         addOneProduct({
//                                                             id: product.productId,
//                                                             price: product.price,
//                                                         })
//                                                     );
//                                                 }}
//                                             >
//                                                 <BiPlus size={"32px"} />
//                                             </button>
//                                         </div>
//                                         <div className="price-per-stuff flex justify-center">
//                                             <h1 className=" text-3xl">$ {product.price * product.quantity}</h1>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <div className="text-center h-full justify-center items-center flex">
//                                 <h1 className="text-center text-2xl ">No products in cart</h1>
//                             </div>
//                         )}
//                     </div>
//                     <div className=" lg:w-1/4 md:w-1/2 md:mx-auto w-full h-min p-5 bg-white border-2  flex flex-col items-start justify-between">
//                         <h1 className="text-start text-4xl font-thin ">ORDER SUMMARY</h1>
//                         <div className="all-price py-5 gap-2 flex flex-col justify-between items-center w-full">
//                             {cart.products.length !== 0 ? (
//                                 cart.products.map((product) => (
//                                     <div key={product.productId} className="price flex justify-between items-center w-full">
//                                         <h1 className="text-start text-2xl">{product.name}</h1>
//                                         <h1 className="text-start text-2xl">$ {product.price * product.quantity}</h1>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div className="price flex justify-between items-center w-full">
//                                     <h1 className="text-start text-2xl">No products in cart</h1>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="total py-5 border-t-2 border-black flex justify-between items-center w-full">
//                             <h1 className="text-start text-3xl font-semibold ">Total</h1>
//                             <h1 className="text-start text-2xl font-semibold ">$ {cart.products.length !== 0 ? cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0) : 0}</h1>
//                         </div>
//                         <button onClick={() => handleCheckout()} className=" w-full p-2 mx-auto bg-black text-white">
//                             CHECKOUT NOW
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// };

// export default Cart;
