"use client";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import { useEffect, useState } from "react";
import "../../style.css";
import { useParams, useRouter } from "next/navigation";

const EditFoodItems = ({ setAddItem }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
  //   console.log(params.id);
  const router = useRouter();
 useEffect(() => {
   const getItemDetails = async () => {
     try {
       let response = await fetch(
         "http://localhost:3000/api/restaurant/foods/edit/" + params.id
       );
       response = await response.json();

       if (response.success) {
       
         setName(response.result.name);
         setPrice(response.result.price);
         setPath(response.result.img_path);
         setDescription(response.result.description);
       } else {
         console.log("Error in getting data");
       }
     } catch (error) {
       console.log("Error fetching item", error);
     }
   };

   getItemDetails();
 }, []);


 const handleEditFoodItemDetail = async () => {
   if (!name || !path || !price || !description) {
     setError(true);
     return false;
   } else {
     setError(false);
   }

   try {
     let response = await fetch(
       "http://localhost:3000/api/restaurant/foods/edit/" + params.id,
       {
         method: "PUT", // Specify PUT method
         headers: {
           "Content-Type": "application/json", // Set content type
         },
         body: JSON.stringify({
           name: name,
           price: price,
           img_path: path,
           description: description,
         }),
       }
     );

     response = await response.json();

     if (response.success) {
     
       router.push("../dashboard");
     } else {
       console.log("Error in updating data ");
     }
   } catch (error) {
     console.log("Error updating details ", error);
   }
 };

  return (
    <>
      <RestaurantHeader />
      <div className="container">
        <h1>Update Food Item</h1>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Enter food name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && !name && (
            <span className="input-error">Please enter valid name</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {error && !price && (
            <span className="input-error">Please enter valid price</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Enter image path"
            value={path}
            onChange={(e) => setPath(e.target.value)}
          />
          {error && !path && (
            <span className="input-error">Please enter valid path</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && !description && (
            <span className="input-error">Please enter valid description</span>
          )}
        </div>
        <div className="input-wrapper">
          <button
            className="button"
            style={{ cursor: "pointer" }}
            onClick={handleEditFoodItemDetail}
          >
            Update Food Item
          </button>
        </div>
        <div className="input-wrapper">
          <button
            className="button"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("../dashboard")}
          >
            Back to item's list
          </button>
        </div>
      </div>
    </>
  );
};

export default EditFoodItems;
