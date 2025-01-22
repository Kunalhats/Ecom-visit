import React, { useContext } from 'react'
import {nanoid} from 'nanoid'

import { useState } from 'react';
import { ProductContext } from './utils/Context';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => 
    
    {   
        const navigate=useNavigate()
        const [product, setProduct] = useContext(ProductContext);
        const [image, setImage]=useState("");
        const [title, setTitle]=useState("")
        const [category, setCategory]=useState("")
        const [price, setPrice]=useState("")
        const [description, setDescription]=useState("")
        
        const AddProductHandler = (e) => {
            e.preventDefault();

            if(image.trim().length<5||
               title.trim().length<3 ||
               category.trim().length<3 ||
               price.trim().length<1 ||
               description.trim().length<3)
         {
            alert("Write upto 4 char or words");
            return;
        }
            const Newproducts = {
              id: nanoid(),
              image,
              title,
              category,
              price,
              description,
            };
          
            setProduct([...product, Newproducts]);
            localStorage.setItem("product",JSON.stringify([...product, Newproducts]))
            navigate("/")
            
          };
          

  return (
        <form onSubmit={AddProductHandler} className='p-[1%] w-screen h-screen flex flex-col items-center gap-2'>
        <h1 className='text-3xl w-1/2 mb-2'>Add New Product</h1>
            <input type="URL" placeholder='image link' className='text-2xl bg-zinc-100 rounded p-2 w-1/2' onChange={(e)=>setImage(e.target.value)} value={image} />
            <input type="text" placeholder='title' className='text-2xl bg-zinc-100 rounded p-2 w-1/2' onChange={(e)=>setTitle(e.target.value)} value={title}/>
            <div className='flex w-[50%] justify-between'>
            <input type="text" placeholder='category' className='text-2xl bg-zinc-100 rounded p-2 w-[48%] 'onChange={(e)=>setCategory(e.target.value)} value={category} />
            <input type="number" placeholder='price' className='text-2xl bg-zinc-100 rounded p-2 w-[48%]' onChange={(e)=>setPrice(e.target.value)} value={price} />
            </div>
            <textarea className='text-2xl bg-zinc-100 rounded p-2 w-1/2' placeholder='enter product description here' onChange={(e)=>setDescription(e.target.value)} value={description} rows='8'></textarea>
            <div className='w-1/2'>
            <button className='rounded p-2 flex border border-blue-600 text-blue-600'>Add New Product</button>
            </div>
            
        </form>
  )
}

export default NewProduct