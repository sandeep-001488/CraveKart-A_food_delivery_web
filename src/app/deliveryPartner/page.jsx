"use client";
import React, { useEffect, useState } from "react";
import DeliveryHeader from "../_components/deliveryHeader";
import { useRouter } from "next/navigation";
import "./delivery-partner.css";

const Page = () => {
  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showBg, setShowBg] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const router = useRouter();

  // Signup handler
  const handleSignup = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/deliveryPartners/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, mobile, password, city, address }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const { result } = data;
        const userWithoutPassword = { ...result };
        delete userWithoutPassword.password;

        localStorage.setItem("delivery", JSON.stringify(userWithoutPassword));
        router.push("/deliveryDashboard");
        showBg(false);

        // Reset form fields
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

  // Login handler
  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/api/deliveryPartners/login",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ loginMobile, loginPassword }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();

  //     if (data.success) {
  //       const { result } = data;
  //       const userWithoutPassword = { ...result };
  //       delete userWithoutPassword.loginPassword;

  //       localStorage.setItem("delivery", JSON.stringify(userWithoutPassword));
  //       router.push("/deliveryDashboard");

  //       // Reset login fields
  //       setLoginMobile("");
  //       setLoginPassword("");
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     alert("Login failed. Please try again.");
  //     setLoginMobile("");
  //     setLoginPassword("");
  //   }
  // };
  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/deliveryPartners/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loginMobile, loginPassword }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const { result } = data;
        const userWithoutPassword = { ...result };
        delete userWithoutPassword.loginPassword;

        localStorage.setItem("delivery", JSON.stringify(userWithoutPassword));
        localStorage.setItem("deliverypartnerlogin", true); // Set login status
        router.push("/deliveryDashboard");
        showBg(false);

        setLoginMobile("");
        setLoginPassword("");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
      setLoginMobile("");
      setLoginPassword("");
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem("delivery"));
    if (delivery) {
      router.push("/deliveryDashboard");
    }
  }, []);

  const [login, setLogin] = useState(false);

  useEffect(() => {
    const isLogin = localStorage.getItem("deliverypartnerlogin");
    if (isLogin) {
      setLogin(true);
      setShowBg(true);
    }
  }, []);
  useEffect(() => {
    if (showBg) {
      document.body.classList.add("with-bg");
    } else {
      document.body.classList.remove("with-bg");
    }
  }, [showBg]);

  return (
    <>
      <DeliveryHeader />
      <p className="login-signup">{login ? "Login" : "Signup"} here !!</p>

      {login ? (
        // <div className="auth-container">
        <>
          <div className="login-wrapper-delivery-partner">
            <div className="input-wrapper">
              <input
                type="text"
                className="input-field"
                placeholder="Enter mobile no."
                value={loginMobile}
                onChange={(e) => setLoginMobile(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                className="input-field"
                placeholder="Enter password"
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
          <h4 style={{ cursor: "pointer" }} onClick={() => setLogin(false)}>
            Don't have account ? Sign Up
          </h4>
        </>
      ) : (
        // </div>
        <>
          <div className="login-wrapper-delivery-partner">
            <div className="input-wrapper">
              <input
                type="text"
                className="input-field"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                className="input-field"
                placeholder="Enter mobile no."
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                className="input-field"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                className="input-field"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                className="input-field"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                className="input-field"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <button
                className="button"
                onClick={handleSignup}
                style={{ cursor: "pointer" }}
              >
                SignUp
              </button>
            </div>
          </div>
          <h4 onClick={() => setLogin(true)} style={{ cursor: "pointer" }}>
            Already have account ? Login
          </h4>
        </>
      )}
    </>
  );
};

export default Page;
