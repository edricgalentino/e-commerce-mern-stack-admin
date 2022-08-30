import React, { useEffect, useState } from "react";
import Product from "./Product";
import { popularProducts } from "../../data";
import { API } from "../../config/api";

const Products = () => {
    const [products, setProducts] = useState([]);

    const fetchData = async () => {
        const result = await API.get(`/product?new=true`);
        setProducts(result.data);
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div className=" gap-5 grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 items-center m-5">
                {products &&
                    products.map((product, index) => {
                        return <Product key={index} product={product} />;
                    })}
            </div>
        </>
    );
};

export default Products;
