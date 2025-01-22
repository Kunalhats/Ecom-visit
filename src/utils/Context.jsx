import axios from './Axios';  // Axios instance setup
import { useEffect, useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const ProductContext = createContext();  // Rename for clarity

const Context = (props) => {
    const [product, setProduct] = useState(() => {
        // Try to get data from localStorage, fallback to empty array
        return JSON.parse(localStorage.getItem('product')) || [];  
    });

    // Sync product state with localStorage
    useEffect(() => {
        if (product && Array.isArray(product)) {  // Only sync valid arrays
            localStorage.setItem('product', JSON.stringify(product)); // Sync state with localStorage
        }
    }, [product]);

    // Fetch product data from API only if there is no data in localStorage
    useEffect(() => {
        if (product.length === 0) {  // Only fetch if no products in localStorage
            const getProduct = async () => {
                try {
                    const { data } = await axios.get('/products');
                    if (Array.isArray(data)) {
                        setProduct(data);  // Set fetched data
                    } else {
                        console.error('Unexpected API response format:', data);
                    }
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            };

            getProduct();  // Fetch the products from the API
        }
    }, [product.length]); // Dependency array to run only when product is empty

    return (
        <ProductContext.Provider value={[product, setProduct]}>
            {props.children}  {/* Provide product data to child components */}
        </ProductContext.Provider>
    );
};

Context.propTypes = {
    children: PropTypes.node.isRequired,  // Validate that children are provided
};

Context.defaultProps = {
    children: null,  // Default to null if no children are passed
};

export default Context;
