import { NavLink } from "react-router-dom";




const AsideAccountSetting = ()=>{


    return (
        <aside className="space-y-8 px-3 py-3 w-48 text-lg text-gray-600 font-bold tracking-wide mt-11 !no-underline ">
          <div><NavLink style={{
            borderRadius:"10px"
          }} className={({ isActive }) =>
            `py-3 px-5 flex items-center rounded-lg cursor-pointer  ${isActive ? 'bg-blue-100 text-blue-700' : ''}`
          } to={"/AccountSetting/userProfile"}>User Profile</NavLink></div>

          <div><NavLink style={{
            borderRadius:"10px"
          }} className={({ isActive }) =>
            `py-3 px-5 flex items-center rounded-lg cursor-pointer  ${isActive ? 'bg-blue-100 text-blue-700' : ''}`
          } to={"/AccountSetting/Security"}>Security</NavLink></div>

          <div><NavLink style={{
            borderRadius:"10px"
          }} className={({ isActive }) =>
            `py-3 px-5 flex items-center rounded-lg cursor-pointer  ${isActive ? 'bg-blue-100 text-blue-700' : ''}`
          } to={"/AccountSetting/MyOrder"}>My Order</NavLink></div>

          <div><NavLink style={{
            borderRadius:"10px"
          }} className={({ isActive }) =>
            `py-3 px-5 flex items-center rounded-lg cursor-pointer  ${isActive ? 'bg-blue-100 text-blue-700' : ''}`
          } to={"/AccountSetting/OrderStatus"}>Order status</NavLink></div>
        </aside>
    )
}

export default AsideAccountSetting;