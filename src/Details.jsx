import React, { useContext, useEffect, useState } from 'react';
import axios from './utils/Axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from './utils/Context';

const Details = () => {

  const {id}= useParams()
  const navigate=useNavigate();
  
  

  const [product, setProduct] = useContext(ProductContext);
  const[products,setProducts]=useState(null);

  const deleteHandleChange=(id)=>{
    const productDelete=product.filter((p)=>p.id!==id)
    setProduct(productDelete);
    
    localStorage.setItem("product",JSON.stringify(productDelete))
    navigate("/")
  }
 
  useEffect(()=>{if(!products){
    setProducts(product.filter((p)=>p.id==id)[0])
  }
},[])

  return products ? (

    <div className="w-[70%] m-auto flex justify-center items-center h-screen ">
      <div className="flex items-center gap-4 p-4">
        <img 
          src={`${products.image}`}
          className="w-[30%] rounded" 
          alt="Product1" 
        />
        <div className="info space-y-2 p-[10%]">
          <h1 className="text-4xl font-bold">{`${products.title}`}</h1>
          <h6 className="text-2xl text-gray-500">{`${products.category}`}</h6>
          <h6 className="text-2xl font-semibold text-green-600">${`${products.price}`}</h6>
          <h6 className="text-gray-700 text-lg ">{`${products.description}`}</h6>
          <button className='text-blue-600 mr-5  px-2 py-1 border border-blue-600 text-center rounded'>Edit</button>  
          <button onClick={()=> deleteHandleChange(products.id)} className='text-red-600 px-2 py-1 border border-red-600 text-center rounded'>Delete</button>  
        </div>
      </div>
    </div>
  ):<h1>Loading</h1>
};

export default Details;
