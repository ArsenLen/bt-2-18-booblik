import ProductPage from "./pages/ProductPage";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {Routes, Route, useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/product/:id' element={<ProductPage/>} />
      <Route path='/products/:category' element={<ProductList/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/cart' element={<Cart/>} />
    </Routes>
  );
};

export default App;