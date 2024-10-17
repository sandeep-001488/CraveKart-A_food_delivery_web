"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const router=useRouter()

  const handleSignup = async (props) => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          city,
          address,
          mobile,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const { result } = data;
        const userWithoutPassword = { ...result };
        delete userWithoutPassword.password;

        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        if (props?.redirect?.order) {
          router.push("/order");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed. Please try again.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAddress("");
      setCity("");
      setMobile("");
    }
  };

  return (
    <div>
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
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <input
          type="text"
          className="input-field"
          value={mobile}
          placeholder="enter mobile no."
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <button className="button" onClick={handleSignup} style={{cursor:"pointer"}}>
          SignUp
        </button>
      </div>
    </div>
  );
};

export default UserSignUp;
