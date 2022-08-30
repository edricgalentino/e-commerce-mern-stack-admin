import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Pay from "./pages/Pay";
import PaymentSuccess from "./pages/PaymentSuccess";
import { useEffect } from "react";
import { API } from "./config/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/userRedux";
import { setCart } from "./redux/cartRedux";

function App() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
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
        API.get(`/cart/find/${user.user?.id || user.user?._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                if (res.data) {
                    dispatch(setCart(res.data));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [dispatch, user.user?._id, user.user?.id]);

    return (
        <div className="App overflow-hidden transition-all font-main">
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/list-product/:category" element={<ProductList />} />
                    <Route path="/detail-product/:id" element={<ProductDetail />} />
                    <Route path="/payment/checkout" element={<Pay />} />
                    <Route path="/payment/success" element={<PaymentSuccess />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
