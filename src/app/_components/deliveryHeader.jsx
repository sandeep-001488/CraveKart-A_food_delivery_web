"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "./deliveryHeader.css";

const DeliveryHeader = () => {
  const [login, setLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const deliveryBoyData = localStorage.getItem("delivery")
      ? JSON.parse(localStorage.getItem("delivery"))
      : null;
    if (deliveryBoyData !== null) {
      setLogin(true);
      localStorage.setItem("deliverypartnerlogin", login);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("delivery");
    setLogin(false);
    router.push("/deliveryPartner");
  };
  return (
    <div className="header-wrapper-delievry">
      <div className="logo">
        <Link href="/">
          <img style={{ width: 100 }} src="/main.jpeg" alt="Logo" />
        </Link>
      </div>

      <div className="center">
        <h1>DELIVERY DASHBOARD</h1>
        <p className="header-below">Courier Associate Agent</p>
      </div>

      {login ? (
        <button
          className="delivery-header-btn"
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        >
          LogOut
        </button>
      ) : (
        <Link href="/deliveryPartner">
          <button className="delivery-header-btn">Login</button>
        </Link>
      )}
    </div>
  );
};

export default DeliveryHeader;
