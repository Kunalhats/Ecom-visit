
import './App.css'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Home from './Home'
import Details from './Details'
import NewProduct from './NewProduct'

function App() {


  return (
    <> 

        <div className='flex'>
        <Link to={'/'} className='flex ml-5 mt-5 border w-[4%] p-2 bg-red-200 text-center text-red-600'> Home </Link>
        </div>
         <Routes>
       <Route path='/' element={<Home/>}></Route>
       <Route path='/Create' element={<NewProduct/>}> </Route>
       <Route path='/details/:id' element={<Details/>}></Route>
     </Routes>
    </>
  )
}

export default App
