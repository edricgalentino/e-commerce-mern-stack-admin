import React, { useEffect, useState } from "react";
import Select from "react-select";
import Creatable from "react-select/creatable";
import Product from "../components/Home/Product";
// import { popularProducts } from "../data";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import axios from "axios";
import { API } from "./../config/api";

const ProductList = () => {
    const colorOptions = [
        { value: "all", label: "All" },
        { value: "white", label: "White" },
        { value: "black", label: "Black" },
        { value: "green", label: "Green" },
        { value: "red", label: "Red" },
        { value: "blue", label: "Blue" },
        { value: "yellow", label: "Yellow" },
    ];
    const sizeOptions = [
        { value: "all", label: "All" },
        { value: "XS", label: "XS" },
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
        { value: "XL", label: "XL" },
        { value: "XXL", label: "XXL" },
    ];
    const sortOptions = [
        { value: "newest", label: "Newest" },
        { value: "high", label: "Price (Highest)" },
        { value: "low", label: "Price (Lowest)" },
    ];

    const [selectedColor, setSelectedColor] = useState("all");
    const [selectedSize, setSelectedSize] = useState("all");
    const [selectedSort, setSelectedSort] = useState("");
    const [category, setCategory] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const url = window.location.href;
        const urlArray = url.split("/");
        const categoryUnUpper = urlArray[urlArray.length - 1];
        // make first letter uppercase
        const categoryUpper = categoryUnUpper.charAt(0).toUpperCase() + categoryUnUpper.slice(1);
        // remove "-" from category
        const category = categoryUpper.replace(/%20/g, " ");
        setCategory(category);
        const fetchData = async () => {
            // const result = await API.get(`/product?category=${category}`);
            const result = await API.get(`/product`);
            setProducts(result.data.reverse());
        };
        fetchData();
    }, [category]);

    useEffect(() => {
        let newFilteredProducts = products.filter((product) => {
            let isIncluded = true;

            if (selectedColor !== "all") {
                let isColorMatch = false;
                for (let i = 0; i < product.color.length; i++) {
                    if (product.color[i] === selectedColor) {
                        isColorMatch = true;
                        break;
                    }
                }
                if (!isColorMatch) {
                    isIncluded = false;
                }
            }

            if (selectedSize !== "all") {
                let isSizeMatch = false;
                for (let i = 0; i < product.size.length; i++) {
                    if (product.size[i] === selectedSize) {
                        isSizeMatch = true;
                        break;
                    }
                }
                if (!isSizeMatch) {
                    isIncluded = false;
                }
            }

            return isIncluded;
        });

        if (selectedSort !== "newest") {
            if (selectedSort === "high") {
                // sort product by highest price
                newFilteredProducts = newFilteredProducts.sort((a, b) => a.price - b.price).reverse();
            }
            if (selectedSort === "low") {
                // sort product by highest price
                newFilteredProducts = newFilteredProducts.sort((a, b) => a.price - b.price);
            }
        }

        setFilteredProducts(newFilteredProducts);
    }, [selectedColor, products, selectedSize, selectedSort]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col bg-white gap-5 p-5">
                <div className="title flex md:justify-start justify-center items-center px-5 md:pt-5">
                    <h1 className=" text-3xl font-semibold">{category}</h1>
                </div>
                <div className="filter flex md:flex-row flex-col justify-between z-20 items-start w-full px-5">
                    <div className="filter flex md:flex-row flex-col mt-5 justify-between items-center md:w-auto w-full gap-3">
                        <h1 className=" md:text-2xl text-xl font-semibold">Filter products:</h1>
                        <div className="flex gap-3">
                            <Creatable options={colorOptions} onChange={(e) => setSelectedColor(e.value.toLowerCase())} />
                            <Creatable options={sizeOptions} onChange={(e) => setSelectedSize(e.value)} />
                        </div>
                    </div>
                    <div className="filter flex md:flex-row flex-col mt-5 justify-between items-center md:w-auto w-full gap-3">
                        <h1 className=" md:text-2xl text-xl font-semibold">Sort products:</h1>
                        <div className="flex gap-3">
                            <Select options={sortOptions} onChange={(e) => setSelectedSort(e.value.toLowerCase())} />
                        </div>
                    </div>
                </div>
                <div className={`gap-5 grid md:grid-cols-6 sm:grid-cols-3 items-start grid-cols-2 m-5`}>
                    {filteredProducts.length !== 0 ? (
                        filteredProducts.map((product, index) => {
                            return <Product key={index} product={product} />;
                        })
                    ) : selectedColor === "" && selectedSize === "" && selectedSort === "" ? (
                        products.map((product, index) => {
                            return <Product key={index} product={product} />;
                        })
                    ) : (
                        <h1 className="text-center col-span-6 text-3xl font-semibold">No products found</h1>
                    )}
                    {filteredProducts.length !== 0 ? (
                        filteredProducts.map((product, index) => {
                            return <Product key={index} product={product} />;
                        })
                    ) : selectedColor === "" && selectedSize === "" && selectedSort === "" ? (
                        products.map((product, index) => {
                            return <Product key={index} product={product} />;
                        })
                    ) : (
                        <h1 className="text-center col-span-6 text-3xl font-semibold">No products found</h1>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductList;
