"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const DeliveryHeader = () => {
  const [login, setLogin] = useState(false);
  const router=useRouter()

  useEffect(() => {
    const deliveryBoyData = localStorage.getItem("delivery")
      ? JSON.parse(localStorage.getItem("delivery"))
      : null;
    if (deliveryBoyData !== null) {
      setLogin(true);
    }
  }, []);

  const handleLogout=()=>{
    localStorage.removeItem("delivery")
    setLogin(false);
    router.push("/deliveryPartner")
  }
  return (
    <div className="header-wrapper">
      <div className="logo">
        <img
          style={{ width: 100 }}
          src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png"
          alt="Logo"
        />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {login ? (
          <li>
          <button className="button" onClick={handleLogout}>Logout</button>
          </li>
        ):
        (
          <li>
           <Link href="/deliveryPartner">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default DeliveryHeader;
