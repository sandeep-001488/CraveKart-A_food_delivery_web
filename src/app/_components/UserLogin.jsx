"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

const UserLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
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
      alert("login failed. Please try again.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
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
        <button className="button" onClick={handleLogin} style={{cursor:"pointer"}}>
          Login
        </button>
      </div>
    </div>
  );
};

export default UserLogin;
