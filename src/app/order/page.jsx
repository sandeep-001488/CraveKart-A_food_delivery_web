"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGE, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
  const [userStorage, setUserStorage] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const [cartStorage, setCartStorage] = useState(() => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  });

  const [total, setTotal] = useState(() =>
    cartStorage.reduce((accumulator, item) => accumulator + item.price, 0)
  );

  useEffect(() => {
  console.log(total);
  
  }, [total]);
  

  const [removeCartData, setRemoveCartData] = useState(false);
  const router = useRouter();

  const handleOrderNow = async () => {
    if (cartStorage.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const user_id = userStorage._id;
    const city = userStorage.city;

    const resto_id = cartStorage[0]?.resto_id;
    const foodItemIds = cartStorage.map((item) => item._id).toString();

    const deliveryBoyResponse = await fetch(
      `http://localhost:3000/api/deliveryPartners/${city}`
    );
    const deliveryBoyData = await deliveryBoyResponse.json();
    const deliveryBoyIds = deliveryBoyData.result.map((item) => item._id);
    const deliveryBoy_id =
      deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)];

    if (!deliveryBoy_id) {
      alert(
        "OOps! Delivery partner for this location not available, Sorry for inconvenience "
      );
      return;
    }

    const orderData = {
      user_id,
      resto_id,
      foodItemIds,
      deliveryBoy_id,
      status: "confirm",
      amount: total + DELIVERY_CHARGE + (total * TAX) / 100,
    };

    const response = await fetch("http://localhost:3000/api/order", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();
    if (result.success) {
      localStorage.removeItem("cart");
      setRemoveCartData(true);
      router.push("/my-profile");
    } else {
      setRemoveCartData(false);
      alert("Order failed");
    }
  };

  useEffect(() => {
    // If total is 0 and cartStorage is empty, redirect to home
    if (total === 0 && cartStorage.length === 0) {
      router.push("/");
    }
  }, [total, cartStorage, router]);

  return (
    <div>
      <CustomerHeader removeCartDataAfterOrder={removeCartData} />

      <div className="total-wrapper">
        <div className="block-1">
          <h2>Customer Details</h2>
          <div className="row">
            <span>Name: </span>
            <span>{userStorage?.name} </span>
          </div>
          <div className="row">
            <span>Address: </span>
            <span>{userStorage?.address} </span>
          </div>
          <div className="row">
            <span>City: </span>
            <span>{userStorage?.city} </span>
          </div>
          <div className="row">
            <span>Contact: </span>
            <span>{userStorage?.mobile} </span>
          </div>
          <h2>Amount Details</h2>
          <div className="row">
            <span>Food Charges: </span>
            <span>{total} </span>
          </div>
          <div className="row">
            <span>Tax: </span>
            <span>{(total * TAX) / 100}</span>
          </div>
          <div className="row">
            <span>Delivery Charges: </span>
            <span>{DELIVERY_CHARGE}</span>
          </div>
          <div className="row">
            <span>Total Amount: </span>
            <span>{total + DELIVERY_CHARGE + (total * TAX) / 100}</span>
          </div>
          <h2>Payment Methods</h2>
          <div className="row">
            <span>Cash On Delivery: </span>
            <span>{total + DELIVERY_CHARGE + (total * TAX) / 100}</span>
          </div>
        </div>
        <div className="block-2">
          <button onClick={handleOrderNow}>Order Now</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
