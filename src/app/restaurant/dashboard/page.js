"use client";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import React, { useState } from "react";
import "../../restaurant/style.css";
import AddFoodItem from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemList";
import { FaArrowCircleLeft } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";

const Dashbard = () => {
  const [addItem, setAddItem] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);

  const handleAddBtn = () => {
    setAddItem(true);
    setShowDashboard(!showDashboard);
  };
  const handleDashBoardBtn = () => {
    setAddItem(false);
    setShowDashboard(!showDashboard);
  };
  return (
    <>
      <RestaurantHeader />
      <div className="options">
        {showDashboard ? (
          <button
            className="add-food-item-btn"
            // onClick={() => setAddItem(true)}
            onClick={handleAddBtn}
          >
            Add Food Item
            <span className="add-icon"><MdAddCircle/></span>
          </button>
        ) : (
          <button className="dashboard" onClick={handleDashBoardBtn}>
            <FaArrowCircleLeft className="arrow-icon" />
             to DashBoard
          </button>
        )}
      </div>
      {addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItemList />}
    </>
  );
};

export default Dashbard;
