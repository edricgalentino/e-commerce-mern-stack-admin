import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API, configJSON, setAuthToken } from "../config/api";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userRedux";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        const data = {
            username,
            password,
        };

        if (username === "") {
            return setError("Username is required");
        } else if (password === "") {
            return setError("Password is required");
        } else if (username.length > 20) {
            return setError("Username is too long");
        } else if (password.length < 8) {
            return setError("Password must be at least 8 characters");
        }
        setError("");

        API.post("/auth/login", data, configJSON)
            .then((res) => {
                localStorage.setItem("token", res.data.accessToken);
                setAuthToken(res.data.accessToken);
                navigate("/");
                dispatch(setUser({ username: res.data.username, isAdmin: res.data.isAdmin, id: res.data._id, email: res.data.email }));
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data.message);
            });
    };

    return (
        <>
            <div className="flex w-full h-screen justify-center items-center bg-indigo-100">
                <div className="flex flex-col items-center gap-7 w-1/3 p-5 border-4 bg-white shadow-xl rounded-xl">
                    <h1 className="text-3xl font-semibold">Login</h1>
                    <form className="form flex flex-col gap-5 w-full">
                        <div className="form-control w-full">
                            <input
                                type="email"
                                placeholder="Username"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                value={username}
                                maxLength={20}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="form-control w-full">
                            <input
                                type="password"
                                minLength={8}
                                placeholder="Password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                value={password}
                                maxLength={20}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                handleLogin();
                            }}
                            className="btn bg-indigo-800 hover:bg-indigo-900 text-white"
                        >
                            Login
                        </button>
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
                        <div className="flex flex-col items-start gap-3">
                            <Link to="/" className="text-lg underline">
                                Forgot your password?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
