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
        <img
          src="https://www.eatingwell.com/thmb/088YHsNmHkUQ7iNGP4375MiAXOY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_7866255_foods-you-should-eat-every-week-to-lose-weight_-04-d58e9c481bce4a29b47295baade4072d.jpg"
          alt=""
          style={{ width: 100 }}
        />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
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
