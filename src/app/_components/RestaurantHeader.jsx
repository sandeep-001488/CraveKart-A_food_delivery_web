"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./RestaurantHeader.css";

const RestaurantHeader = () => {
  const [details, setDetaills] = useState();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const data = localStorage.getItem("restaurantUser");
    if (!data && pathname == "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathname == "restaurant") {
      router.push("/restaurant/dashbaord");
    } else {
      setDetaills(JSON.parse(data));
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
  };
  return (
    <div className="header-wrapper-restaurant-header">
      <div className="logo">
        <Link href="/">
          <img src="/main.png" alt="" style={{ width: 100 }} />
        </Link>
      </div>
      {details && details.name ? (
        <>
          <div className="restro-name">
            <p>{details.name}</p>
          </div>
          <div>
            <button className="button-restro" onClick={() => handleLogout()}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="login-restro">Login or SignUp to proceed..</div>
      )}
    </div>
  );
};

export default RestaurantHeader;
