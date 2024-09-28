import { NavLink, useNavigate } from "react-router-dom";
import Dropdown from "./ui/Dropdown";
import { faCog, faShieldAlt, faDashboard,faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import axiosInstance from "../config/axios.config";
import { ISearchValue } from "../interface";
import { useDispatch } from "react-redux";
import { setSearchSlice } from "../App/features/Search";


const storageKey = "loginData";

const NavPar = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  
  

  const checkAuthToken = () => {
    const userDataString = localStorage.getItem(storageKey);
    if (userDataString) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };


  useEffect(() => {
    checkAuthToken();

    const handleStorageChange = () => {
      checkAuthToken();
    };

  
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  const options = [
    { label: 'Account Settings', icon: faCog, path: "#" },
    { label: 'Admin Page', icon: faShieldAlt, path: "/Admin" },
    { label: 'Dashboard', icon: faDashboard, path: "#" },
    { label: 'log out', icon:faLongArrowLeft , path: "/Login" },
  ];


  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res: ISearchValue[] = await axiosInstance.get("/api/Home/search", {
        params: {
          searchTerm: searchText,
        },
      }).then((response) => response.data);
      navigate("/home/search");
      dispatch(setSearchSlice(res));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="block pt-8 p-6 border-b-2">
      <div className="flex flex-row justify-around header">
        <NavLink to={"/"}>
          <h1 className="text-2xl font-bold">Exclusive</h1>
        </NavLink>
        <div className="flex flex-row">
          <div className="text-xl mr-10">
            <NavLink to={"/Home"}>Home</NavLink>
          </div>
          <div className="text-xl mr-10">
            <NavLink to={"/contact"}>Contact</NavLink>
          </div>
          <div className="text-xl mr-10">
            <NavLink to={"/About"}>About</NavLink>
          </div>
          {!isLoggedIn ? (
            <div className="text-xl mr-10">
              <NavLink to={"/login"}>Login</NavLink>
            </div>
          ) : null}
        </div>
        <div className="flex justify-center items-center space-x-5">
          <form onSubmit={onSubmit}>
            <div className="relative bg-gray-200">
              <input
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                id="default-search"
                className="block p-2 ps-10 text-md w-60 bg-gray-200"
                placeholder="What are you looking for?"
              />
              <button
                onClick={() => console.log(searchText)}
                className="absolute cursor-pointer inset-y-0 start-0 flex items-center content-center ps-3"
              >
                <svg
                  className="w-5 h-5 cursor-pointer transition-all text-gray-400 hover:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className="flex space-x-5">
            <svg
              onClick={()=> navigate('/Wishlist')}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <svg
              onClick={() => navigate('/cart')}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            {isLoggedIn ? <Dropdown options={options} /> : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavPar;
