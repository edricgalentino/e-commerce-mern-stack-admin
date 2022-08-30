import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "./../../config/api";

const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await API.get("/product");
            setProducts(res.data);
        };
        fetchData();
    }, []);
    const handleDelete = (id) => {
        API.delete(`/product/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                console.log(res);
                setProducts(products.filter((product) => (product.id || product._id) !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div className="flex flex-col w-full h-full gap-7 p-8 pb-16 bg-white">
                <div className="flex justify-between">
                    <h1 className=" text-start text-3xl font-semibold text-slate-800">Product List</h1>
                    <div className="createButton">
                        <Link to="/add-product" className="btn btn-active bg-indigo-800 text-white">
                            Add a New Product
                        </Link>
                    </div>
                </div>
                <div className="search flex justify-end">
                    <div className="form-control">
                        <div className="input-group">
                            <input type="text" placeholder="Jeans, Shirt, Denim..." className="input input-bordered" />
                            <button className="btn btn-square bg-indigo-800">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="list flex  w-full bg-white">
                    <div className="overflow-x-auto w-full font-main">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((product, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={product.img} alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{product.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{product.stock || 50}</td>
                                                <td>{product.status || "Active"}</td>
                                                <td>$ {product.price},00</td>
                                                <th>
                                                    <div className="flex gap-3">
                                                        <Link to={`/edit-product/${product?._id || product?.id}`} className="btn btn-outline btn-success btn-xs">
                                                            edit
                                                        </Link>
                                                        <label
                                                            onClick={() => {
                                                                setSelectedId(product?._id || product?.id);
                                                            }}
                                                            for="my-modal-4"
                                                            className="btn btn-outline modal-button btn-error btn-xs"
                                                        >
                                                            delete
                                                        </label>
                                                    </div>
                                                </th>
                                                {/* modal */}
                                                <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                                                <label for="my-modal-4" className="modal cursor-pointer">
                                                    <label className="modal-box relative" for="">
                                                        <h3 className="font-bold text-xl">Are you sure want to delete this product?</h3>
                                                        <p className="py-2">You won't be able to revert this!</p>
                                                        <div className="modal-action">
                                                            <label for="my-modal-4" className="btn btn-error hover:bg-red-400">
                                                                Nay!
                                                            </label>
                                                            <label
                                                                onClick={() => {
                                                                    handleDelete(selectedId);
                                                                }}
                                                                for="my-modal-4"
                                                                className="btn bg-emerald-400 border-0 text-black hover:bg-emerald-500"
                                                            >
                                                                Yay!
                                                            </label>
                                                        </div>
                                                    </label>
                                                </label>
                                            </tr>
                                        </>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListProduct;
