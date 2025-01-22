import { useContext } from "react";
import { ProductContext } from "./utils/Context";
import { Link } from "react-router-dom";

function NavBar()

{

  const [product] = useContext(ProductContext);

  let category=product && product.reduce((acc,cl)=>[...acc, cl.category],[])

  category=[...new Set(category)]

  const color=()=>{
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.5)`
  }


  return(
    

    <div className="fixed top-0 left-0 w-[15%] h-screen bg-gray-200 flex flex-col">
      <a className="mt-4 mx-4 py-2 w-[80%] border border-blue-500 text-blue-500 text-center" href="/Create">Add New Product</a>
      <hr className="border-t border-red-500 my-4 mx-2 bg-red-500" />
      <h1 className="text-2xl text-red-400 mt-4 mx-2">Category Filter</h1>
      <ul className="w-[80%] mt-2">
        {category.map((c,k)=><Link to={`/?category=${c}`} key={k} className="mt-2 mx-2 flex items-center">
          <span style={{backgroundColor:color()}} className="block w-[15px] h-[15px] mx-2 rounded-full"></span>
          {c}
        </Link>)}
      </ul>
    </div>
  );
}

export default NavBar;
