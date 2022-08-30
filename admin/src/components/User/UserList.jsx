import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "./../../config/api";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await API.get("/user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setUsers(res.data);
        };
        fetchData();
    }, []);

    const handleDelete = (id) => {
        API.delete(`/user/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                console.log(res);
                setUsers(users.filter((user) => (user.id || user._id) !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div className="flex flex-col w-full h-full gap-7 p-8 pb-16 bg-white">
                <div className="flex justify-between">
                    <h1 className=" text-start text-3xl font-semibold text-slate-800">User List</h1>
                    <div className="createButton">
                        <Link to={"/add-user"} className="btn btn-active bg-indigo-800 text-white">
                            Add a New User
                        </Link>
                    </div>
                </div>
                <div className="search flex justify-end">
                    <div className="form-control">
                        <div className="input-group">
                            <input type="text" placeholder="Anthony, James, John..." className="input input-bordered" />
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
                                    <th>Profile</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user) => {
                                    return (
                                        <tr>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img
                                                                src={
                                                                    user.img || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                                                                }
                                                                alt="Avatar Tailwind CSS Component"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{user.fullname || "User Fullname"}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.isAdmin ? "Admin" : "User"}</td>
                                            <td>Active</td>
                                            <th>
                                                <div className="flex gap-3">
                                                    <Link to={`/edit-user/${user._id || user.id}`} className="btn btn-outline btn-success btn-xs">
                                                        edit
                                                    </Link>
                                                    <label
                                                        for="my-modal-4"
                                                        onClick={() => {
                                                            setSelectedId(user._id || user.id);
                                                        }}
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
                                                    <h3 className="font-bold text-xl">Are you sure want to delete this user?</h3>
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

export default UserList;
