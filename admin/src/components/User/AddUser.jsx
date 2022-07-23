import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API, configJSON } from "../../config/api";

const AddUser = () => {
    const [form, setForm] = useState({
        fullname: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        address: "",
        img: "https://placeimg.com/192/192/people",
        isAdmin: true,
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (form.fullname === "") {
            return setError("Fullname is required");
        } else if (form.username === "") {
            return setError("Username is required");
        } else if (form.password === "") {
            return setError("Password is required");
        } else if (form.email === "") {
            return setError("Email is required");
        }
        setError("");
        API.post(
            "/auth/register",
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
                navigate("/user-list");
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
                    <h1 className=" text-start text-3xl font-semibold text-slate-800">Add New User</h1>
                    <div className="createButton">
                        <Link to={"/user-list"} className="btn btn-active bg-indigo-800 text-white">
                            See user list
                        </Link>
                    </div>
                </div>

                <form className="form-add flex gap-5">
                    <div className="form flex flex-col gap-3 w-full basis-1/2 bg-white rounded-lg p-6  border-2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Full Name</span>
                            </label>
                            <input type="text" placeholder="Zellyn Akasha" value={form.fullname} onChange={(e) => setForm({ ...form, fullname: e.target.value })} maxLength={20} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Username</span>
                            </label>
                            <input type="text" placeholder="Zellyn" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} maxLength={20} className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                maxLength={20}
                                minLength={8}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Email</span>
                            </label>
                            <input type="email" placeholder="zellyn@gmail.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={20} className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Phone</span>
                            </label>
                            <input type="tel" placeholder="+1 123123" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={14} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Address</span>
                            </label>
                            <input type="text" placeholder="City, Country.." value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} maxLength={60} className="input input-bordered w-full" />
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
                        <div className="form-control w-full max-w-xs mt-4">
                            <label className="label cursor-not-allowed">
                                <span className="label-text text-lg font-semibold">Admin</span>
                                <input type="checkbox" className="toggle toggle-secondary pointer-events-none " checked />
                            </label>
                        </div>
                    </div>
                    <div className="image-input bg-white border-2 rounded-lg basis-1/2 flex p-5 w-full h-40 justify-around items-center gap-5">
                        <h1 className=" font-semibold text-xl">Upload your image :</h1>
                        <div className="container-input">
                            <div className="flex justify-center items-center w-full my-3">
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
                    Create user
                </button>
            </div>
        </>
    );
};

export default AddUser;
