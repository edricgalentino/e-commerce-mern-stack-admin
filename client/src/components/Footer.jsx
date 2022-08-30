import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaMapMarkerAlt } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
    const language = useSelector((state) => state.language.language);

    return (
        <>
            <footer>
                <div className=" items-start w-full grid md:grid-cols-3 grid-cols-1 justify-around gap-10 p-5 mt-8">
                    <div className="flex flex-col gap-7 items-center md:items-start">
                        <h1 className="text-start text-black font-bold text-4xl">SHOPPIE</h1>
                        <p className=" text-start text-md">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio earum nulla ullam mollitia doloribus accusamus quas, sunt veniam labore qui illum soluta consequatur nemo repudiandae non asperiores, doloremque
                            maiores. Nobis aliquam dolores illum assumenda. Vitae aspernatur id quis consequuntur ipsa.
                        </p>
                        <div className="flex gap-5">
                            <Link to={"/"} className="icon bg-blue-800 rounded-full hover:ring-8 hover:ring-slate-200 hover:bg-blue-900 p-3">
                                <FaFacebookF size={"22px"} color={"white"} />
                            </Link>
                            <Link to={"/"} className="icon bg-sky-500 rounded-full hover:ring-8 hover:ring-slate-200 hover:bg-sky-600 p-3">
                                <FaTwitter size={"22px"} color={"white"} />
                            </Link>
                            <Link to={"/"} className="icon bg-pink-500 rounded-full hover:ring-8 hover:ring-slate-200 hover:bg-pink-900 p-3">
                                <FaInstagram size={"22px"} color={"white"} />
                            </Link>
                            <Link to={"/"} className="icon bg-red-700 rounded-full hover:ring-8 hover:ring-slate-200 hover:bg-red-900 p-3">
                                <FaPinterest size={"22px"} color={"white"} />
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col text-start">
                        <h1 className=" text-xl mb-10 font-bold">{language === "ID" ? "Link Navigasi" : "Navigation Links"}</h1>
                        <div className="links grid grid-flow-row grid-cols-2 gap-2">
                            <Link to={"/"} className="hover:underline">
                                {language === "ID" ? "Home" : "Home"}
                            </Link>
                            <Link to={"/cart"} className="hover:underline">
                                {language === "ID" ? "Keranjang" : "Cart"}
                            </Link>
                            <Link to={"/list-product/man"} className="hover:underline">
                                {language === "ID" ? "Fashion Pria" : "Man Fashion"}
                            </Link>
                            <Link to={"/list-product/woman"} className="hover:underline">
                                {language === "ID" ? "Fashion Wanita" : "Woman Fashion"}
                            </Link>
                            <Link to={"/list-product/accessories"} className="hover:underline">
                                {language === "ID" ? "Aksesoris" : "Accessories"}
                            </Link>
                            <Link to={"/list-product/suit"} className="hover:underline">
                                {language === "ID" ? "Jas" : "Suit"}
                            </Link>
                            <Link to={"/"} className="hover:underline">
                                {language === "ID" ? "Akun Saya" : "My Account"}
                            </Link>
                            <Link to={"/"} className="hover:underline">
                                {language === "ID" ? "Lacak Pesanan" : "Order Tracking"}
                            </Link>
                            <Link to={"/"} className="hover:underline">
                                {language === "ID" ? "Wishlist" : "Wishlist"}
                            </Link>
                            <Link to={"/"} className="hover:underline">
                                {language === "ID" ? "Ketentuan" : "Terms"}
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col text-start">
                        <h1 className=" text-xl mb-10 font-bold">{language === "ID" ? "Kontak" : "Contact"}</h1>
                        <div className="contact flex flex-col gap-6">
                            <div className=" flex gap-3 items-center ">
                                <FaMapMarkerAlt size={"22px"} />
                                <Link to={"/"} className="hover:underline">
                                    622 Dixie Path, South Tabinchester 98336
                                </Link>
                            </div>
                            <div className=" flex gap-3 items-center ">
                                <BsTelephoneFill size={"22px"} />
                                <Link to={"/"} className="hover:underline">
                                    +1 234 56 789
                                </Link>
                            </div>
                            <div className=" flex gap-3 items-center ">
                                <GrMail size={"22px"} />
                                <Link to={"/"} className="hover:underline">
                                    contact@shoppie.com
                                </Link>
                            </div>
                            <div className=" flex w-max cursor-pointer">
                                <img src="https://i.ibb.co/Qfvn4z6/payment.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center my-8 mt-10">
                    <h1 className=" text-center text-lg">© 2021 Shoppie. All rights reserved</h1>
                </div>
            </footer>
        </>
    );
};

export default Footer;
