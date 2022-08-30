import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        setCart: (state, action) => {
            state.products = action.payload.products;
            state.quantity = action.payload.quantity;
            state.total = action.payload.total;
        },
        addProduct: (state, action) => {
            const product = action.payload;
            state.quantity += 1;
            state.total += product.total;
            state.products.push(product.product);
        },
        removeProduct: (state, action) => {
            const product = action.payload;
            state.quantity -= 1;
            state.total -= product.price;
            state.products = state.products.filter((p) => p.id !== product.id);
        },
        addOneProduct: (state, action) => {
            const product = action.payload;
            state.products = state.products.map((item) => {
                if (item.id === product.id) {
                    item.quantity += 1;
                    item.total += product.price;
                }
                return item;
            });
            state.total += product.price;
        },
        removeOneProduct: (state, action) => {
            const product = action.payload;
            state.products = state.products.map((item) => {
                if (item.id === product.id) {
                    item.quantity -= 1;
                    item.total -= product.price;
                }
                return item;
            });
            state.total -= product.price;
        },
    },
});

export const { setCart, addProduct, removeProduct, addOneProduct, removeOneProduct } = cartSlice.actions;
export default cartSlice.reducer;
