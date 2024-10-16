/* eslint-disable react-hooks/rules-of-hooks */
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
import Category from "../Dashboard/Category";
import {SearchProduct} from "../components/SearchProduct";
import Discount from "@/Dashboard/Discount";
import { FilterProduct } from "@/components/FilterProduct";
import Cart from "@/pages/Cart";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import Wishlist from "@/pages/WishlistPage";
import ErrorPage from "@/pages/ErrorPage";
import { useSelector } from "react-redux";
import { RootState } from "../App/Store";
import AccountSettingLayout from "@/AccountSetting/AccountSettingLayout";
import UserProfile from "@/AccountSetting/userProfile";



const storageKey = "loginData"
const userDataString = localStorage.getItem(storageKey)
const userData =userDataString ? JSON.parse(userDataString) : null;
const searchProduct = ()=>{
  const searchValue = useSelector((state:RootState) => state.Search)
  return searchValue
}

const router = createBrowserRouter(createRoutesFromElements(
    
  <>

    {/* home route */}
    <Route path={"/home"} element={<HomeLayout/>} errorElement={<ErrorPage msg="page not fount" statusCode="500"/>}>
       <Route index element={<Home/>}/>
       <Route path="/home/productPage" element={<ProductPage/>}/>
       <Route path="/home/search" element={<ProtectedRoute isAllowed={!searchProduct.length} redirectPath="/home">
          <SearchProduct/>
      </ProtectedRoute>} />
       <Route path={"/home/filter"} element={<FilterProduct/>}/>

    </Route>
    {/* root route */}
    <Route path="/" element={<RootLayout/>} errorElement={<ErrorPage msg="page not fount" statusCode="500"/>}>
       <Route path="contact" element={<ContactPage/>}/>
       <Route path="About" element={<h3>About page</h3>}/>
       
          <Route path="Wishlist" element={<ProtectedRoute isAllowed={userData?.token} redirectPath="/Login">
          <Wishlist/>
          </ProtectedRoute>
          }/>
       
       
         <Route path="cart" element={<ProtectedRoute isAllowed={userData?.token} redirectPath="/Login">
         <Cart/>
         </ProtectedRoute>}
         />
       <Route path="Register" element={<Register/>}/>
       <Route path="VerificationCode" element={<VerificationCode/>}/>
       <Route path="Login" element={<Login/>}/>
    </Route>
    {/* admin route*/}
    <Route path="/Admin" element={<AdminLayout/>} errorElement={<ErrorPage msg="500 page not fount" statusCode="500"/>}>

      <Route path="/Admin/Discount" element={
        <ProtectedRoute isAllowed={userData?.token} redirectPath="/Login">
          <Discount/>
        </ProtectedRoute>
        }/>

      <Route path="/Admin/category" element={
        <ProtectedRoute isAllowed={userData?.token} redirectPath="/Login">
          <Category/>
        </ProtectedRoute>
        }/>
      <Route path="/Admin/AddProduct" element={
        <ProtectedRoute isAllowed={userData?.token} redirectPath="/Login">
          <AddProduct/>
        </ProtectedRoute>
        }/>
      <Route path="/Admin/products" element={
        <ProtectedRoute isAllowed={userData?.token} redirectPath="/Login">
          <ProductsPage/>
        </ProtectedRoute>
        }/>
    </Route>

    {/* Account Setting route */}

    <Route path="/AccountSetting" element={<AccountSettingLayout/>}>

      <Route index path="/AccountSetting/userProfile" element={
        <ProtectedRoute isAllowed={userData?.token} redirectPath="/Login">
        <UserProfile/>
        </ProtectedRoute>
        }/>

      <Route index path="/AccountSetting/Security" element={
        <ProtectedRoute isAllowed={userData?.token} redirectPath="/Login">
          <p>Security page</p>
        </ProtectedRoute>}/>

        <Route index path="/AccountSetting/myOrder" element={
          <ProtectedRoute isAllowed={userData?.token} redirectPath="/Login">
          <p>My Order page</p>
        </ProtectedRoute>}/>
        
        <Route index path="/AccountSetting/orderStatus" element={
          <ProtectedRoute isAllowed={userData?.token} redirectPath="/Login">
          <p>order status page</p>
        </ProtectedRoute>}/>

    </Route>
    
    </>
));

  export default router