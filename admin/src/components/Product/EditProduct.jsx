import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "./../../config/api";
import { BiPencil, BiDollar, BiCategory } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import { IoMdColorPalette } from "react-icons/io";
import { TbArrowBigUpLine } from "react-icons/tb";
import Creatable from "react-select/creatable";

const EditProduct = () => {
    const id = window.location.pathname.split("/")[2];
    const [product, setProduct] = useState([]);
    const [form, setForm] = useState({
        name: "",
        price: 0,
        stock: 0,
        description: "",
        img: "",
        category: [],
        size: [],
        color: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await API.get(`/product/find/${id}`);
            setProduct(res.data);
            setForm(res.data);
        };
        fetchData();
    }, [id]);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const res = await API.put(`/product/${id}`, form, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                console.log(res, "success");
                navigate("/product-list");
            })
            .catch((err) => {
                console.log(err, "error");
            });
    };

    return (
        <>
            <div className="flex flex-col w-full h-full gap-7 p-8 pb-16 bg-white">
                <div className="flex justify-between">
                    <h1 className=" text-start text-3xl font-semibold text-slate-800">Edit Product</h1>
                    <div className="createButton">
                        <Link to="/product-list" className="btn btn-active bg-indigo-800 text-white">
                            See Product List
                        </Link>
                    </div>
                </div>
                <form className="form-add flex gap-5">
                    <div className="form flex flex-col gap-3 w-full basis-1/2 bg-white rounded-lg p-6  border-2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Title / Name</span>
                            </label>
                            <input type="text" placeholder={product?.name} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={60} className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Stock</span>
                            </label>
                            <input type="tel" placeholder={product?.stock} value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} maxLength={5} className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Price (in USD)</span>
                            </label>
                            <input type="tel" placeholder={product?.price} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} maxLength={12} className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">
                                    Category <span className=" text-xs ml-1 font-thin">(Choose or create a new one)</span>
                                </span>
                            </label>
                            <Creatable
                                options={product?.category?.map((item) => {
                                    return { value: item, label: item };
                                })}
                                isMulti
                                value={
                                    (form.category &&
                                        form.category?.map((item) => {
                                            return { value: item, label: item };
                                        })) ||
                                    []
                                }
                                placeholder={`Select category or write new category`}
                                onChange={(e) => setForm({ ...form, category: e.length > 0 ? e.map((item) => item.value) : [] })}
                            />
                        </div>{" "}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">
                                    Color <span className=" text-xs ml-1 font-thin">(Choose or create a new one)</span>
                                </span>
                            </label>
                            <Creatable
                                options={product?.color?.map((item) => {
                                    return { value: item, label: item };
                                })}
                                isMulti
                                value={
                                    (form.color &&
                                        form.color?.map((item) => {
                                            return { value: item, label: item };
                                        })) ||
                                    []
                                }
                                placeholder={`Select color or write new color`}
                                onChange={(e) => setForm({ ...form, color: e.length > 0 ? e.map((item) => item.value) : [] })}
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">
                                    Size <span className=" text-xs ml-1 font-thin">(Choose or create a new one)</span>
                                </span>
                            </label>
                            <Creatable
                                options={product?.size?.map((item) => {
                                    return { value: item, label: item };
                                })}
                                isMulti
                                value={
                                    (form.size &&
                                        form.size?.map((item) => {
                                            return { value: item, label: item };
                                        })) ||
                                    []
                                }
                                placeholder={`Select size or write new size`}
                                onChange={(e) => setForm({ ...form, size: e.length > 0 ? e.map((item) => item.value) : [] })}
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Active</span>
                            </label>
                            <select className="select select-bordered">
                                <option disabled selected>
                                    Active
                                </option>
                                <option>Inactive</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Description</span>
                            </label>
                            <textarea className="textarea textarea-bordered h-24" placeholder={product?.description} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required></textarea>
                        </div>
                    </div>
                    <div className="right-side flex w-full basis-1/2 flex-col gap-5">
                        <div className="detail-Product border-2 rounded-lg flex flex-col p-5 w-full justify-start items-start gap-5">
                            <h1 className=" font-semibold text-xl">Product Detail</h1>
                            <div className="grid grid-cols-2 w-full">
                                <div className="w-full flex flex-col justify-start items-start p-3 gap-4">
                                    <div className=" flex gap-2 justify-center items-center">
                                        <BiPencil />
                                        <h1 className="font-semibold text-lg">: {product?.name}</h1>
                                    </div>
                                    <div className=" flex gap-2 justify-center items-center">
                                        <BsBoxSeam />
                                        <h1 className="font-semibold text-lg">: {product?.stock || 50}</h1>
                                    </div>
                                    <div className=" flex gap-2 justify-center items-center">
                                        <BiDollar />
                                        <h1 className="font-semibold text-lg">: {product?.price}</h1>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col justify-start items-start p-3 gap-4">
                                    <div className=" flex gap-2 justify-center items-center">
                                        <BiCategory />
                                        <h1 className="font-semibold text-lg">
                                            :{" "}
                                            {product?.category?.map((item) => {
                                                if (item === product?.category[product?.category?.length - 1]) {
                                                    return item;
                                                }
                                                return item + ", ";
                                            })}
                                        </h1>
                                    </div>
                                    <div className=" flex gap-2 justify-center items-center">
                                        <IoMdColorPalette />
                                        <h1 className="font-semibold text-lg">
                                            :{" "}
                                            {product?.color?.map((item) => {
                                                if (item === product?.color[product?.color?.length - 1]) {
                                                    return item;
                                                }
                                                return item + ", ";
                                            })}
                                        </h1>
                                    </div>
                                    <div className=" flex gap-2 justify-center items-center">
                                        <TbArrowBigUpLine />
                                        <h1 className="font-semibold text-lg">
                                            :{" "}
                                            {product?.size?.map((item) => {
                                                if (item === product?.size[product?.size?.length - 1]) {
                                                    return item;
                                                }
                                                return item + ", ";
                                            })}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="image-input bg-white border-2 rounded-lg flex w-full h-40 justify-around items-center gap-5">
                            <div className="info flex flex-col">
                                <h1 className=" font-semibold text-xl">Upload your new images :</h1>
                                <h1 className=" font-semibold text-slate-400 text-sm mx-4">If you don't have it, relax, we keep your previous images.</h1>
                            </div>
                            <div className="container-input">
                                <div className="flex justify-center items-center w-full">
                                    <label for="dropzone-file" className="flex flex-col justify-center items-center w-full bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100">
                                        <div className="flex flex-col justify-center items-center pt-5 pb-6 w-full px-12">
                                            <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span>
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 2 mb)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <button
                    type="button"
                    onClick={() => {
                        handleSubmit();
                    }}
                    className="btn bg-indigo-800 hover:bg-indigo-900 text-white -mt-3"
                >
                    Update product
                </button>
            </div>
        </>
    );
};

export default EditProduct;
