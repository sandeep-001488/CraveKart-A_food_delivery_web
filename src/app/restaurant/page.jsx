"use client";
import React from "react";
import { useState } from "react";
import "./style.css";

import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignup from "../_components/RestaurantSignup";
import RestaurantHeader from "../_components/RestaurantHeader";
import Footer from "../_components/Footer";

const Restaurant = () => {
  const [login, setLogin] = useState(true);
  return (
    <>
      <RestaurantHeader />
      <div className="container">
        <h1>retaurant login</h1>
        {login ? <RestaurantLogin /> : <RestaurantSignup />}

        <div>
          <button className="button-link" onClick={() => setLogin(!login)}>
            {login
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
