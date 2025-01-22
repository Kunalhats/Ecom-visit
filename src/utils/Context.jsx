import { createContext, useState, useEffect } from "react";

// Create the ProductContext
export const ProductContext = createContext();

const Context = (props) => {
    // Initialize state with data from localStorage or fallback to an empty array
    const [product, setProduct] = useState(() => {
        const storedProducts = localStorage.getItem("product");
        return storedProducts ? JSON.parse(storedProducts) : [];
    });

    // Sync product state with localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("product", JSON.stringify(product));
    }, [product]);

    return (
        // Provide product data and the updater function to children components
        <ProductContext.Provider value={[product, setProduct]}>
            {props.children}
        </ProductContext.Provider>
    );
};

export default Context;
