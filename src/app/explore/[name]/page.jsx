"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import { useEffect, useState } from "react";

const Page = (props) => {
  const name = props.params.name;
  const [restroDetails, setRestroDetails] = useState();
  const [foodItems, setFoodItems] = useState();
  const [cartData, setCartData] = useState();
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const [cartIds, setCartIds] = useState(
    cartStorage
      ? () =>
          cartStorage.map((item) => {
            return item._id;
          })
      : []
  );
  const [removeCartData, setRemoveCartData] = useState();

  useEffect(() => {
    getRestroDetails();
  }, []);

  const getRestroDetails = async () => {
    const id = props.searchParams.id;
    let response = await fetch("http://localhost:3000/api/customer/" + id);
    response = await response.json();
    if (response.success) {
      setRestroDetails(response.restaurantDetails);
      setFoodItems(response.foodItemsFromRestaurant);
    }
  };

  const addToCart = (item) => {
    setCartData(item);
    let localCartIds = cartIds;
    localCartIds.push(item._id);
    setCartIds(localCartIds);
    setRemoveCartData()
  };

  const removeFromCart = (id) => {
    setRemoveCartData(id);
    const localIds = cartIds.filter((item) => item !== id);
    setCartIds(localIds);
    setCartData()
  };

  return (
    <div>
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className="restaurant-page-banner">
        <h1>
          {decodeURI(name).charAt(0).toUpperCase() + decodeURI(name).slice(1)}
        </h1>
      </div>
      <div className="details-wrapper">
        <h4>Contact : {restroDetails?.contact}</h4>
        <h4>City: {restroDetails?.city}</h4>
        <h4>Address: {restroDetails?.address}</h4>
        <h4>Email: {restroDetails?.email}</h4>
      </div>
      <div className="food-list-wrapper">
        {foodItems && foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div className="list-item">
              <div>
                <img style={{ width: 100 }} src={item.img_path} />
              </div>

              <div>
                <div>{item.name}</div>
                <div>{item.price}</div>
                <div className="description">{item.description}</div>
                {cartIds.includes(item._id) ? (
                  <button onClick={() => removeFromCart(item._id)}>
                    Remove From Cart
                  </button>
                ) : (
                  <button onClick={() => addToCart(item)}>Add to Cart</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1>No Food Items for this Restaurant</h1>
        )}
      </div>
    </div>
  );
};

export default Page;
