"use client"
import RestaurantHeader from '@/app/_components/RestaurantHeader';
import React, { useState } from 'react'
import '../../restaurant/style.css'
import AddFoodItem from '@/app/_components/AddFoodItem';
import FoodItemList from '@/app/_components/FoodItemList';

const Dashbard = () => {
    const [addItem,setAddItem]=useState(false)
  return (
    <>
    <RestaurantHeader/>
      <button onClick={()=>setAddItem(true)}>Add Food Item</button>
      <button onClick={()=>setAddItem(false)}>DashBoard</button>
      {addItem?<AddFoodItem setAddItem={setAddItem}/>:<FoodItemList/>}
    </>
  );
}

export default Dashbard
