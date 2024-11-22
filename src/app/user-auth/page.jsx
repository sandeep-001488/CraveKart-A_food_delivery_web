"use client";
import React, { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import UserSignUp from "../_components/UserSignUp";
import UserLogin from "../_components/UserLogin";
import "./user_auth.css";
import Image from "next/image";

const UserAuth = (props) => {
  const [login, setLogin] = useState(true);

  return (
    // <div>
    <>
      <CustomerHeader />

      <div className="auth">
        <div className="left">
          {/* <h1>Zomato User DashBoard</h1> */}
          <p>° 🎀 𝒟𝑒𝓁𝒾𝒸𝒾♡𝓊𝓈𝓃𝑒𝓈𝓈 𝒾𝓈 𝒶 𝓉𝒶𝓅 𝒶𝓌𝒶𝓎. 𝑅𝑒𝑔𝒾𝓈𝓉𝑒𝓇 𝓃🏵𝓌❢ 🎀 °</p>
          <h1></h1>
          <Image src="/thali_auth_user.png" height={300} width={900} />
        </div>
        <div className="right">
          <h1>{login ? "User Login" : "User Signup"}</h1>
          {login ? (
            <UserLogin redirect={props.searchParams} />
          ) : (
            <UserSignUp redirect={props.searchParams} />
          )}
          <button
            className="button-link-user-auth"
            onClick={() => setLogin(!login)}
          >
            {login
              ? "Don't have account? Signup"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
      {/* <div className="container">
        <h1>{login ? "User Login" : "User Signup"}</h1>
        {login ? (
          <UserLogin redirect={props.searchParams} />
        ) : (
          <UserSignUp redirect={props.searchParams} />
        )}
        <button className="button-link" onClick={() => setLogin(!login)}>
          {login
            ? "Don't have account? Signup"
            : "Already have an account? Login"}
        </button>
      </div> */}
      <Footer />
      {/* </div> */}
    </>
  );
};

export default UserAuth;
