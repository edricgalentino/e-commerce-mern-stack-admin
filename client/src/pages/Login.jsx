import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API, configJSON, setAuthToken } from "../config/api";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userRedux";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = () => {
        const data = {
            username,
            password,
        };

        if (username === "") {
            return Swal.fire({
                title: "Oops..!",
                text: "Username is required",
                icon: "error",
                confirmButtonText: "OK",
                showConfirmButton: true,
            });
        } else if (password === "") {
            return Swal.fire({
                title: "Oops..!",
                text: "Password is required",
                icon: "error",
                confirmButtonText: "OK",
                showConfirmButton: true,
            });
        } else if (username.length > 50) {
            return Swal.fire({
                title: "Oops..!",
                text: "Username is too long",
                icon: "error",
                confirmButtonText: "OK",
                showConfirmButton: true,
            });
        } else if (password.length < 8) {
            return Swal.fire({
                title: "Oops..!",
                text: "Password must be at least 8 characters",
                icon: "error",
                confirmButtonText: "OK",
                showConfirmButton: true,
            });
        }

        API.post("/auth/login", data, configJSON)
            .then((res) => {
                localStorage.setItem("token", res.data.accessToken);
                setAuthToken(res.data.accessToken);
                dispatch(setUser({ username: res.data.username, isAdmin: res.data.isAdmin, id: res.data._id, email: res.data.email }));
                Swal.fire({
                    title: "Success!",
                    text: "Redirecting to home page...",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                }).then(() => {
                    navigate("/");
                });
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Authentication Failed",
                    text: `${err.response.data.message}`,
                });
            });
    };
    return (
        <>
            <div
                className="flex w-full h-screen lg:p-0 p-5 justify-center items-center opacity-80 bg-cover bg-center"
                style={{ backgroundImage: `url(https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)` }}
            >
                <form action="post" method="POST" className="flex w-96 bg-white lg:gap-4 gap-6 lg:p-5 p-7 justify-start items-start flex-col">
                    <h1 className="title text-3xl uppercase text-start">SIGN IN</h1>
                    <label htmlFor="username" className=" w-full">
                        <input
                            type="text"
                            id="username"
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            value={username}
                            className=" border-2 border-slate-500 w-full p-3"
                            placeholder="username"
                        />
                    </label>
                    <label htmlFor="password" className=" w-full">
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                            className=" border-2 border-slate-500 w-full p-3"
                            placeholder="password"
                        />
                    </label>
                    <button type="button" onClick={() => handleLogin()} className=" w-2/5 bg-teal-700 hover:bg-teal-800 text-white uppercase text-lg p-2 px-4">
                        Login
                    </button>
                    <div className="info flex flex-col gap-2">
                        <Link to={"/"} className="text-sm uppercase underline text-start">
                            Forgot your password?
                        </Link>
                        <Link to={"/register"} className="text-sm uppercase underline text-start">
                            Create a new account
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
