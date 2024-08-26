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
import ProductsPage from "../Dashboard/Product";
import AddProduct from "../Dashboard/AddProductPage";
import VerificationCode from "../pages/VerifcationCode";
import HomeLayout from "../pages/HomeLayout";
import ProductPage from "../pages/ProductPage";

const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path={"/home"} element={<HomeLayout/>}>
    <Route index element={<Home/>}/>
    </Route>
    <Route path="/" element={<RootLayout/>}>
       <Route path="/home/productPage" element={<ProductPage/>}/>
       <Route path="contact" element={<ContactPage/>}/>
       <Route path="About" element={<h3>About page</h3>}/>
       <Route path="Register" element={<Register/>}/>
       <Route path="VerificationCode" element={<VerificationCode/>}/>
       <Route path="Login" element={<Login/>}/>
       
    </Route>
    {/* admin route*/}
    <Route path="/Admin" element={<AdminLayout/>}>
      <Route path="/Admin/AddProduct" element={<AddProduct/>}/>
      <Route path="/Admin/products" element={<ProductsPage/>}/>
    </Route>
    
    
    </>
));

  export default router