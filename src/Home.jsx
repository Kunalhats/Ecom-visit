import React, {useEffect, useState } from 'react';
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';
import axios from './utils/Axios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from './utils/Context';

const Home = () => {
  const [product] = useContext(ProductContext)
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(null);

  const { search, pathname } = useLocation();
  
  // Extract category from URL search params
  const category = new URLSearchParams(search).get('category');

  const getProducts = async () => {
    setLoading(true);
    try {
      const url = category ? `/products/category/${category}` : '/products';
      const { data } = await axios.get(url);
      setFiltered(data);
    } catch (error) {
      setError('Error fetching products.');
      
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if(!category||category==='undefined'){
      setFiltered(product)
    }else {
      getProducts();
      setFiltered(product.filter((p)=>p.category==category))
    }
    
  }, [category,product]);


  return (
    <div className="flex">
      <NavBar />
      <div className="ml-[15%] w-[90%]">
        {error && <p>{error}</p>}
        {(pathname!='/' || search.length>0)&&(
        <div className='flex ml-5 border w-[5%] p-2 bg-red-200 text-center'>
        <Link to={'/'} className='text-red-600'> Home </Link>
        </div>
       )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <Link
                key={p.id}
                to={`/details/${p.id}`}
                className="border p-3 shadow rounded h-[40vh] transition transform hover:scale-105">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-[70%] object-contain mb-3"
                />
                <h1 className="text-center text-sm font-semibold">{p.title}</h1>
              </Link>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
