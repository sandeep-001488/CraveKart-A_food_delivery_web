"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import UserSignUp from "../_components/UserSignUp";
import UserLogin from "../_components/UserLogin";
import { useRouter } from "next/navigation";

const UserAuth = (props) => {
  const [login, setLogin] = useState(true);
  const router=useRouter()
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
         router.push("/")
    }
  },[])

  return (
    <div>
      <CustomerHeader />
      <div className="container">
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
      </div>
      <Footer />
    </div>
  );
};

export default UserAuth;
