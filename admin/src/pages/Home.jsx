import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom";
import ListProduct from "../components/Product/ListProduct";
import AddProduct from "../components/Product/AddProduct";
import EditProduct from "../components/Product/EditProduct";
import UserList from "../components/User/UserList";
import AddUser from "../components/User/AddUser";
import EditUser from "../components/User/EditUser";
import Main from "../components/Main";

const Home = () => {
    return (
        <>
            <Topbar />
            <div className=" bg-lime-100 h-full fixed z-10">
                <Sidebar />
            </div>
            <div className="flex w-full h-full pt-[56px] justify-end">
                <div className="w-4/5 min-h-screen items-center relative flex justify-center">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/product-list" element={<ListProduct />} />
                        <Route path="/add-product/" element={<AddProduct />} />
                        <Route path="/edit-product/:id" element={<EditProduct />} />
                        <Route path="/user-list" element={<UserList />} />
                        <Route path="/add-user/" element={<AddUser />} />
                        <Route path="/edit-user/:id" element={<EditUser />} />
                    </Routes>
                </div>
            </div>
        </>
    );
};

export default Home;
