import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Creatable from "react-select/creatable";
import { API, configJSON } from "../../config/api";

const AddProduct = () => {
    const colorOptions = [
        { value: "white", label: "White" },
        { value: "black", label: "Black" },
        { value: "green", label: "Green" },
        { value: "red", label: "Red" },
        { value: "blue", label: "Blue" },
        { value: "yellow", label: "Yellow" },
    ];
    const sizeOptions = [
        { value: "XS", label: "XS" },
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
        { value: "XL", label: "XL" },
        { value: "XXL", label: "XXL" },
    ];
    const categoryOptions = [
        { value: "men", label: "men" },
        { value: "women", label: "women" },
        { value: "bag", label: "bag" },
        { value: "shoes", label: "shoes" },
        { value: "casual", label: "casual" },
        { value: "formal", label: "formal" },
    ];

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
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (form.name === "") {
            return setError("Name is required");
        } else if (form.stock === 0) {
            return setError("Stock must be greater than 0");
        } else if (!+form.stock) {
            return setError("Stock must be a number");
        } else if (form.price === 0) {
            return setError("Price must be greater than 0");
        } else if (!+form.price) {
            return setError("Price must be a number");
        } else if (form.description === "") {
            return setError("Description is required");
        }
        setError("");
        API.post(
            "/product",
            form,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            },
            configJSON
        )
            .then((res) => {
                console.log("success");
                navigate("/product-list");
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data.message);
            });
    };

    return (
        <>
            <div className="flex flex-col w-full h-full gap-7 p-8 pb-16 bg-white">
                <div className="flex justify-between">
                    <h1 className=" text-start text-3xl font-semibold text-slate-800">Add a New Product</h1>
                    <div className="createButton">
                        <Link to={"/product-list"} className="btn btn-active bg-indigo-800 text-white">
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
                            <input type="text" placeholder="Airpods Pro v2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={60} className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Stock</span>
                            </label>
                            <input type="tel" placeholder="50" maxLength={5} value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Price (in USD)</span>
                            </label>
                            <input type="tel" placeholder="200" maxLength={12} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">
                                    Category <span className=" text-xs ml-1 font-thin">(Choose or create a new one)</span>
                                </span>
                            </label>
                            <Creatable
                                isMulti
                                options={categoryOptions.map((option) => {
                                    return {
                                        value: option.value,
                                        label: option.label,
                                    };
                                })}
                                placeholder={`Select or write new category`}
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
                                isMulti
                                options={colorOptions.map((option) => {
                                    return {
                                        value: option.value,
                                        label: option.label,
                                    };
                                })}
                                placeholder={`Select or write new color`}
                                onChange={(e) => setForm({ ...form, color: e.length > 0 ? e.map((item) => item.value) : [] })}
                            />
                        </div>{" "}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">
                                    Size <span className=" text-xs ml-1 font-thin">(Choose or create a new one)</span>
                                </span>
                            </label>
                            <Creatable
                                isMulti
                                options={sizeOptions.map((option) => {
                                    return {
                                        value: option.value,
                                        label: option.label,
                                    };
                                })}
                                placeholder={`Select or write new size`}
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
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                className="textarea textarea-bordered h-24"
                                placeholder="The description of the product..."
                                required
                            ></textarea>
                        </div>
                    </div>
                    <div className="image-input bg-white border-2 rounded-lg basis-1/2 flex p-5 w-full h-40 justify-around items-center gap-5">
                        <h1 className=" font-semibold text-xl">Upload your images :</h1>
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
                </form>
                {error && (
                    <div className="alert alert-error shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    </div>
                )}
                <button
                    type="button"
                    onClick={() => {
                        handleSubmit();
                    }}
                    className="btn bg-indigo-800 hover:bg-indigo-900 text-white -mt-3"
                >
                    Create product
                </button>
            </div>
        </>
    );
};

export default AddProduct;
