"use client";
import React, { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";

const Page = () => {
  const [orders, setOrders] = useState([]);
  const userId=JSON.parse(localStorage.getItem("user"))._id
  useEffect(() => {
    const getMyOrders = async () => {
      let response = await fetch(
        "http://localhost:3000/api/order?id="+userId
      );
      response = await response.json();
      if (response.success) {
        setOrders(response.result);
      }
    };
    getMyOrders();
  }, []);
 

  return (
    <div>
      <CustomerHeader />
      {orders && orders.length > 0 ? (
        orders.map((item) => (
          <div
            className="restaurant-wrapper"
            style={{ marginLeft: "auto" }}
            key={item.id}
          >
            <h4>
              Name:
              {item.data.name.charAt(0).toUpperCase() + item.data.name.slice(1)}
            </h4>
            <div>Amount: {item.amount}</div>
            <div>Address: {item.data.address}</div>
            <div>City: {item.data.city}</div>
            <div>Status: {item.status}</div>
          </div>
        ))
      ) : (
        <h1>You haven't made any orders yet</h1>
      )}
      <Footer />
    </div>
  );
};

export default Page;
