import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
  } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import { Home } from "../pages/Home";
import ContactPage from "../pages/ContactPage";
import AdminPage from "../Dashboard/AdminPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path="/" element={<RootLayout/>}>
       <Route index element={<Home/>}/>
       <Route path="contact" element={<ContactPage/>}/>
       <Route path="About" element={<h3>About page</h3>}/>
       <Route path="Login" element={<Register/>}/>
       <Route path="Admin" element={<AdminPage/>}/>
    </Route>
    
    </>
));

  export default router