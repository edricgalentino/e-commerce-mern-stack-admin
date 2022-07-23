import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useEffect } from "react";
import { API } from "./config/api";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userRedux";

function App() {
    const dispatch = useDispatch();
    // redirect to login page if token is not available
    const pathname = window.location.pathname;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // get user by token
            API.get(`/user/find/${token}`)
                .then((res) => {
                    if (res.data) {
                        dispatch(setUser(res.data));
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [dispatch]);

    useEffect(() => {
        if ((pathname !== "/login" || pathname === "/") && !localStorage.getItem("token")) {
            // redirect to login page
            window.location.pathname = "/login";
        }
        // redirect to home page if token is available
        if (pathname === "/login" && localStorage.getItem("token")) {
            // redirect to login page
            window.location.pathname = "/";
        }
    }, [pathname]);

    return (
        <div className="App font-main min-h-screen">
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<Home />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
