"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import './FoodItemList.css'

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const router=useRouter()

  useEffect(() => {
    const getFoodItemsFromRestro = async () => {
      // Parse restaurant data from localStorage
      const resto_data = JSON.parse(localStorage.getItem("restaurantUser"));

      if (resto_data && resto_data._id) {
        const resto_id = resto_data._id;

        try {
          // Fetch food items by restaurant ID
          let response = await fetch(
            "http://localhost:3000/api/restaurant/foods/" + resto_id
          );
          response = await response.json();
          // Check if the response is successful and set the food items
          if (response.success) {
            setFoodItems(response.result);
          }
        } catch (error) {
          console.error("Error fetching food items:", error);
        }
      } else {
        console.log("Local storage not set or invalid restaurant data");
      }
    };

    getFoodItemsFromRestro();
  }, []); // Ensure this only runs once on component mount

  // Move deleteFoodItem function outside the useEffect so it can be accessed globally
  const deleteFoodItem = async (id) => {
    try {
      let response = await fetch(
        "http://localhost:3000/api/restaurant/foods/" + id,
        {
          method: "delete",
        }
      );
      response = await response.json();
      if (response.success) {
        // Update state to remove deleted item from UI
        setFoodItems(foodItems.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log("Error deleting food item:", error);
    }
  };

  return (
    <div>
      <h1>Food Items</h1>
      <table>
        <thead>
          <tr>
            <td>S.No:</td>
            <td>Name</td>
            <td>Price</td>
            <td>Description</td>
            <td>Image</td>
            <td>Operation</td>
          </tr>
        </thead>
        <tbody>
          {foodItems && foodItems.length > 0 ? (
            foodItems
              .slice()
              .reverse()
              .map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>
                    <img
                      src={item.img_path}
                      alt="food_pic"
                      width="100"
                      height="100"
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => deleteFoodItem(item._id)}
                      style={{ cursor: "pointer" }}
                    >
                      Delete
                    </button>
                    <button
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        router.push("/restaurant/dashboard/" + item._id)
                      }
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="6">No food items found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FoodItemList;
