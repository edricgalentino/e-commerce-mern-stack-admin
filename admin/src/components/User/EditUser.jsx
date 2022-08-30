import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { GrHomeRounded } from "react-icons/gr";
import { FiMail } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa";
import { API } from "./../../config/api";

const EditUser = () => {
    const idUser = window.location.pathname.split("/")[2];
    const [user, setUser] = useState([]);
    const [form, setForm] = useState({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await API.get(`/user/find-user/${idUser}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setUser(res.data);
            setForm(res.data);
        };
        fetchData();
    }, [idUser]);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const res = await API.put(`/user/${idUser}`, form, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                console.log(res, "success");
                navigate("/user-list");
            })
            .catch((err) => {
                console.log(err, "error");
            });
    };
    return (
        <>
            <div className="flex flex-col w-full h-full gap-7 p-8 pb-16 bg-white">
                <div className="flex justify-between">
                    <h1 className=" text-start text-3xl font-semibold text-slate-800">Edit User</h1>
                    <div className="createButton">
                        <Link to="/user-list" className="btn btn-active bg-indigo-800 text-white">
                            See User List
                        </Link>
                    </div>
                </div>
                <form className="form-add flex gap-5">
                    <div className="form flex flex-col gap-3 w-full basis-1/2 bg-white rounded-lg p-6  border-2">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Full Name</span>
                            </label>
                            <input type="text" placeholder={user?.fullname || "Harry Maguire"} value={form.fullname} onChange={(e) => setForm({ ...form, fullname: e.target.value })} maxLength={60} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Username</span>
                            </label>
                            <input type="text" placeholder={user?.username} value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} maxLength={20} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Email</span>
                            </label>
                            <input type="email" placeholder={user?.email} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={20} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Phone</span>
                            </label>
                            <input type="tel" placeholder={user?.phone || "+12 637287315"} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={14} className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Address</span>
                            </label>
                            <input type="text" placeholder={user?.address || "Roma, Italy."} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} maxLength={60} className="input input-bordered w-full" />
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
                                <input type="checkbox" className="toggle toggle-secondary pointer-events-none " checked={user?.isAdmin || false} />
                            </label>
                        </div>
                    </div>

                    <div className="right-side flex w-full basis-1/2 flex-col gap-5">
                        <div className="detail-user border-2 rounded-lg flex flex-col p-5 w-full justify-start items-start gap-5">
                            <h1 className=" font-semibold text-xl">User Detail</h1>
                            <div className="grid grid-cols-2 w-full">
                                <div className="w-full flex flex-col justify-start items-start p-3 gap-4">
                                    <div className=" flex gap-2 justify-center items-center">
                                        <BiPencil />
                                        <h1 className="font-semibold text-lg">: {user.fullName || "User's Fullname"}</h1>
                                    </div>
                                    <div className=" flex gap-2 justify-center items-center">
                                        <AiOutlineUser />
                                        <h1 className="font-semibold text-lg">: {user.username}</h1>
                                    </div>
                                    <div className=" flex gap-2 justify-center items-center">
                                        <FiMail />
                                        <h1 className="font-semibold text-lg">: {user.email}</h1>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col justify-start items-start p-3 gap-4">
                                    <div className=" flex gap-2 justify-center items-center">
                                        <IoPhonePortraitOutline />
                                        <h1 className="font-semibold text-lg">: {user?.phone || "User's Phone"}</h1>
                                    </div>
                                    <div className=" flex gap-2 justify-center items-center">
                                        <GrHomeRounded />
                                        <h1 className="font-semibold text-lg">: {user?.address || "User's Address"}</h1>
                                    </div>{" "}
                                    <div className=" flex gap-2 justify-center items-center">
                                        <FaUserCheck />
                                        <h1 className="font-semibold text-lg">: {`${user?.isAdmin ? "Admin" : "User"}` || "User Role"}</h1>
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
                    </div>
                </form>
                <button
                    type="button"
                    onClick={() => {
                        handleSubmit();
                    }}
                    className="btn bg-indigo-800 hover:bg-indigo-900 text-white -mt-3"
                >
                    Update user
                </button>
            </div>
        </>
    );
};

export default EditUser;
