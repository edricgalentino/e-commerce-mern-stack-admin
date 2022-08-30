import React from "react";
import Categories from "../components/Home/Categories";
import Products from "../components/Home/Products";
import Slider from "../components/Home/Slider";
import Newsletter from "../components/Home/Newsletter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <Navbar />
            <Slider />
            <Categories />
            <Products />
            <Newsletter />
            <Footer />
        </>
    );
};

export default Home;
