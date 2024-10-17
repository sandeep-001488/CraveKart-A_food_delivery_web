"use client";
import React, { useState, useEffect } from "react";
import DeliveryHeader from "../_components/deliveryHeader";
import { useRouter } from "next/navigation";
import Footer from "../_components/Footer";

const DeliveryDashboard = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyOrders = async () => {
      const delivery = localStorage.getItem("delivery");
      if (!delivery) {
        router.push("/deliveryPartner");
        return;
      }

      const deliveryBoy_id = JSON.parse(delivery)._id;
    //   console.log(deliveryBoy_id);
      

      if (!deliveryBoy_id) {
        setLoading(false);
        return; // Prevent further execution if the ID is invalid
      }

      try {
        let response = await fetch(
          "http://localhost:3000/api/deliveryPartners/orders/" + deliveryBoy_id
        );
        response = await response.json();
        if (response.success) {
          setOrders(response.result);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    getMyOrders();
  }, [router]);
//   console.log(orders);
  

  return (
    <>
      <DeliveryHeader /> 
      <div>Delivery Dashboard</div>
      {loading ? (
        <div>Loading...</div> // Show loading state while fetching
      ) : orders && orders.length > 0 ? (
        orders.map((item, index) => (
          <div
            className="restaurant-wrapper"
            style={{ marginLeft: "auto" }}
            key={index}
          >
            <h4>
              Name:
              {item.data.name.charAt(0).toUpperCase() + item.data.name.slice(1)}
            </h4>
            <div>Amount: {item.amount}</div>
            <div>Address: {item.data.address}</div>
            <div>City: {item.data.city}</div>
            <div>Status: {item.status}</div>
            <div>
              Update Status:
              <select name="" id="">
                <option value="">Confirm</option>
                <option value="">On the way</option>
                <option value="">Delivered</option>
                <option value="">Failed to Deliver</option>
              </select>
            </div>
          </div>
        ))
      ) : (
        <h1>You haven't get any orders yet  from any customer</h1>
      )}
      <Footer />
    </>
  );
};

export default DeliveryDashboard;
