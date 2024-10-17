"use client";
import React, { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGE, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [isCartLengthReduced,setIsCartLengthReduced]=useState(false)

  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const [total, setTotal] = useState(() =>
    cartStorage.length == 1
      ? cartStorage[0].price
      : cartStorage.reduce((a, b) => {
          return a.price + b.price;
        })
  );
  const handleOrder = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      router.push("/order");
    } else {
      router.push("/user-auth?order=true");
    }
  };
  const handleRemoveItemFromOrder = (item) => {
    const updatedCart = cartStorage.filter(
      (storedItem) => storedItem._id !== item._id
    );

    setCartStorage(updatedCart); 
    setTotal(
      updatedCart.length === 1
        ? updatedCart[0].price
        : updatedCart.reduce((a, b) => a.price + b.price, 0)
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart)); 

    setIsCartLengthReduced(true); 

    if (updatedCart.length === 0) {
      localStorage.removeItem("cart");
      router.push("/"); 
    }
  };


  return (
    <>
      <div>
        <CustomerHeader
          isCartLengthReduced={isCartLengthReduced}
          setIsCartLengthReduced={setIsCartLengthReduced}
        />

        <div className="food-list-wrapper">
          {cartStorage && cartStorage.length > 0 ? (
            cartStorage.map((item) => (
              <div key={item._id} className="list-item">
                <div className="list-item-block-1">
                  <img
                    style={{ width: 100 }}
                    src={item.img_path}
                    alt={item.name}
                  />
                </div>

                <div className="list-item-block-2">
                  <div>{item.name}</div>
                  <div className="description">{item.description}</div>
                  <button onClick={() => handleRemoveItemFromOrder(item)}>
                    Remove From Cart
                  </button>
                </div>
                <div className="list-item-block-3">Price: {item.price}</div>
              </div>
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
        </div>
        <div className="total-wrapper">
          <div className="block-1">
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
          <div className="block-2">
            <button onClick={handleOrder}>Order</button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
