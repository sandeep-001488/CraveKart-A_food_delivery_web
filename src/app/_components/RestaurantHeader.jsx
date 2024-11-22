"use client";
import Link from "next/link";
import { useRouter,usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const RestaurantHeader = () => {
  const [details, setDetaills] = useState();
  const router = useRouter();
  const pathname=usePathname()
  useEffect(() => {
    const data = localStorage.getItem("restaurantUser");
    if (!data && pathname=="/restaurant/dashboard") {
      router.push("/restaurant");
    }else if(data && pathname=="restaurant"){
      router.push("/restaurant/dashbaord")
    } else {
      setDetaills(JSON.parse(data));
    }
  },[]);
  const handleLogout=()=>{
    localStorage.removeItem("restaurantUser")
    router.push("/restaurant")
  }
  return (
    <div className="header-wrapper">
      <div className="logo">
        <Link href="/">
          <img src="/main.jpeg" alt="" style={{ width: 100 }} />
        </Link>
      </div>
      <ul>
       
        {details && details.name ? (
          <>
            <li>
              <button className="button" onClick={() => handleLogout()}>
                Logout
              </button>
            </li>
            <li>
              <Link href="/">Profilee</Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login">Login/signup</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default RestaurantHeader;
