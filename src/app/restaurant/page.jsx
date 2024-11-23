"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";

import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignup from "../_components/RestaurantSignup";
import RestaurantHeader from "../_components/RestaurantHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const Restaurant = () => {
  const [loginFrom, setLoginFrom] = useState(true);
  // const isRestaurantLogin = localStorage.getItem("restaurantUser");
  const [isRestaurantLoggedIn, setIsRestaurantLoggedIn] = useState(
    typeof window !== "undefined" && localStorage.getItem("restaurantUser")
      ? true
      : false
  );

  const router = useRouter();
  const pathname=usePathname()

  useEffect(() => {
    isRestaurantLoggedIn && router.push("/restaurant/dashboard");
  }, [isRestaurantLoggedIn]);

  const [showBg, setShowBg] = useState(false);
  useEffect(() => {
    if (showBg && pathname=='/restaurant') {
      document.body.classList.add("with-bg");
    } else {
      document.body.classList.remove("with-bg");
    }
    return ()=>{
      document.body.classList.remove("with-bg");
    }
  }, [showBg]);

  return (
    <>
      <RestaurantHeader />
      <div className="container">
        <h1>Restaurant {loginFrom ? "Login" : "SignUp"}</h1>
        {loginFrom ? <RestaurantLogin /> : <RestaurantSignup />}

        <div>
          <button
            className="button-link-restro"
            onClick={() => setLoginFrom(!loginFrom)}
          >
            {loginFrom
              ? "Don't have an account?SignUp"
              : "Already have account?Login"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Restaurant;
