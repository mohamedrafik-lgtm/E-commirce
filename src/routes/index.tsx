import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
  } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import { Home } from "../pages/Home";
import ContactPage from "../pages/ContactPage";
import Login from "../pages/Login";
import AdminLayout from "../pages/AdminLayout";
import Register from "../pages/Register";
import ProductPage from "../pages/Product";
import AddProduct from "../Dashboard/AddProductPage";
// import Register from "../pages/Register";

const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path="/" element={<RootLayout/>}>
       <Route index element={<Home/>}/>
       <Route path="contact" element={<ContactPage/>}/>
       <Route path="About" element={<h3>About page</h3>}/>
       <Route path="Register" element={<Register/>}/>
       <Route path="Login" element={<Login/>}/>
       
    </Route>
    {/* admin route*/}
    <Route path="/Admin" element={<AdminLayout/>}>
      <Route path="/Admin/AddProduct" element={<AddProduct/>}/>
      <Route path="/Admin/products" element={<ProductPage/>}/>
    </Route>
    
    
    </>
));

  export default router