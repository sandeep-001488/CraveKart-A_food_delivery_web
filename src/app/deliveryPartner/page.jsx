"use client";
import React, { useEffect, useState } from "react";
import DeliveryHeader from "../_components/deliveryHeader";
import { useRouter } from "next/navigation";

const Page = () => {
  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const router = useRouter();

  const handleSignup = async (props) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/deliveryPartners/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            mobile,
            password,
            city,
            address,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        router.push("/deliveryDashboard");
        const { result } = data;
        const userWithoutPassword = { ...result };
        delete userWithoutPassword.password;

        localStorage.setItem("delivery", JSON.stringify(userWithoutPassword));
        setName("");
        setPassword("");
        setConfirmPassword("");
        setAddress("");
        setCity("");
        setMobile("");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
      setName("");
      setPassword("");
      setConfirmPassword("");
      setAddress("");
      setCity("");
      setMobile("");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/deliveryPartners/login",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loginMobile,
            loginPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        router.push("/deliveryDashboard");
        const { result } = data;
        const userWithoutPassword = { ...result };
        delete userWithoutPassword.loginPassword;
        localStorage.setItem("delivery", JSON.stringify(userWithoutPassword));
        setLoginMobile("");
        setLoginPassword("");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("login failed. Please try again.");
      setLoginMobile("");
      setLoginPassword("");
    }
  };

  useEffect(()=>{
 const delivery=JSON.parse(localStorage.getItem("delivery"))
 if(delivery){
  router.push("/deliveryDashboard")
 }
  },[])

  return (
    <>
      <DeliveryHeader />
      <div>
        <h1>Delivery Partner Panel</h1>
        <div className="auth-container">
          <div className="login-wrapper">
            <h3>Login</h3>

            <div className="input-wrapper">
              <input
                type="text"
                className="input-field"
                placeholder="enter mobile no."
                value={loginMobile}
                onChange={(e) => setLoginMobile(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                className="input-field"
                placeholder="enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <button
                className="button"
                onClick={handleLogin}
                style={{ cursor: "pointer" }}
              >
                Login
              </button>
            </div>
          </div>
          <div className="signup-wrapper">
            <h3>SignUp</h3>
            <div className="input-wrapper">
              <input
                type="text"
                className="input-field"
                placeholder="enter name "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                className="input-field"
                value={mobile}
                placeholder="enter mobile no."
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <div className="input-wrapper">
              <input
                type="password"
                className="input-field"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                className="input-field"
                value={confirmPassword}
                placeholder="confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                className="input-field"
                placeholder="enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                className="input-field"
                value={city}
                placeholder="enter city"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="input-wrapper">
              <button className="button" style={{cursor:"pointer"}} onClick={handleSignup}>
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
