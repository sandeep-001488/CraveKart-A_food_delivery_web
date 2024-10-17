"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGE, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
  const [userStorage, setUserStorage] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const [cartStorage, setCartStorage] = useState(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null
  );
  const [total, setTotal] = useState(() =>
    cartStorage?.length == 1
      ? cartStorage[0].price
      : cartStorage?.reduce((a, b) => {
          return a.price + b.price;
        })
  );

  const [removeCartData, setRemoveCartData] = useState(false);
  const router = useRouter();

  const handleOrderNow = async () => {
    let user_id = JSON.parse(localStorage.getItem("user"))._id;
    let city = JSON.parse(localStorage.getItem("user")).city;

    let cart = JSON.parse(localStorage.getItem("cart"));
    let resto_id = cart[0]?.resto_id;
    let foodItemIds = cart.map((item) => item._id).toString();
    // let deliveryBoy_id = "670f69dfd10b6631c60557d1";

    let deliveryBoyResponse = await fetch(
      "http://localhost:3000/api/deliveryPartners/" + city
    );
    deliveryBoyResponse = await deliveryBoyResponse.json();
    let deliveryBoyIds = deliveryBoyResponse.result.map((item) => item._id);
    let deliveryBoy_id=deliveryBoyIds[Math.floor(Math.random()*deliveryBoyIds.length)]
    // console.log(deliveryBoy_id);
    
    if(!deliveryBoy_id){
        alert("OOps! Delivery partner for this location not available, Sorry for inconvenience ")
        return false
    }
    let collection = {
      user_id,
      resto_id,
      foodItemIds,
      deliveryBoy_id,
      status: "confirm",
      amount: total + DELIVERY_CHARGE + (total * TAX) / 100,
    };
    let response = await fetch("http://localhost:3000/api/order", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(collection),
    });
    response = await response.json();
    if (response.success) {
      setRemoveCartData(true);
      router.push("/my-profile");
    } else {
      setRemoveCartData(false);

      alert("order failed");
    }
  };

  useEffect(() => {
    if (!total) {
      router.push("/");
    }
  }, [total]);

  return (
    <>
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
          </div>
          <h2>Payment Methods</h2>
          <div className="row">
            <span>Cash On Delivery: </span>
            <span>{total + DELIVERY_CHARGE + (total * TAX) / 100}</span>
          </div>
          <div className="block-2">
            <button onClick={handleOrderNow}>Order Now</button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
