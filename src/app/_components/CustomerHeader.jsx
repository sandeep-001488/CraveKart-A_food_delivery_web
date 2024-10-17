"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHeader = ({
  cartData,
  removeCartData,
  removeCartDataAfterOrder,
  isCartLengthReduced,
  setIsCartLengthReduced,
}) => {
  const [cartLength, setCartLength] = useState(0);
  const [cartItem, setCartItem] = useState([]);
  const userStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [user, setUser] = useState(userStorage ? userStorage : null);
  const router = useRouter();

  useEffect(() => {
    const cartStorage = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;

    if (cartStorage) {
      setCartLength(cartStorage.length);
      setCartItem(cartStorage);
    }
  }, []);

  useEffect(() => {
    if (removeCartDataAfterOrder) {
      setCartItem([]);
      setCartLength(0);
      localStorage.removeItem("cart");
    }
  }, [removeCartDataAfterOrder]);

  useEffect(() => {
    if (cartData) {
      if (cartLength) {
        if (cartItem[0]?.resto_id != cartData.resto_id) {
          localStorage.removeItem("cart");
          setCartLength(1);
          setCartItem([cartData]);
          localStorage.setItem("cart", JSON.stringify([cartData]));
        } else {
          let localCartItem = cartItem;
          localCartItem.push(JSON.parse(JSON.stringify(cartData)));
          setCartItem(localCartItem);
          setCartLength(cartLength + 1);
          localStorage.setItem("cart", JSON.stringify(localCartItem));
        }
      } else {
        setCartLength(1);
        setCartItem([cartData]);
        localStorage.setItem("cart", JSON.stringify([cartData]));
      }
    }
  }, [cartData]);

  useEffect(() => {
    if (isCartLengthReduced) {
      const updatedCart = JSON.parse(localStorage.getItem("cart"));
      setCartLength(updatedCart ? updatedCart.length : 0);
      setIsCartLengthReduced(false); // Reset after handling
    }
  }, [isCartLengthReduced]);

  useEffect(() => {
    if (removeCartData) {
      const filteredLocalCartItem = cartItem.filter(
        (item) => item._id != removeCartData
      );
      setCartItem(filteredLocalCartItem);
      setCartLength(cartLength - 1);
      localStorage.setItem("cart", JSON.stringify(filteredLocalCartItem));
      if (filteredLocalCartItem.length == 0) {
        localStorage.removeItem("cart");
      }
    }
  }, [removeCartData]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/user-auth");
  };

  return (
    <div className="header-wrapper">
      <div className="logo">
        <img
          style={{ width: 100 }}
          src="https://s.tmimgcdn.com/scr/1200x627/242400/food-delivery-custom-design-logo-template_242462-original.png"
        />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/my-profile">
                {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/user-auth">Login</Link>
            </li>
            {/* <li>
              <Link href="/user-auth">SignUp</Link>
            </li> */}
          </>
        )}
        {/* {user && ( */}
        <li>
          {cartLength ? (
            <Link href="/cart">Cart({cartLength})</Link>
          ) : (
            <span style={{ color: "gray", cursor: "not-allowed" }}>
              Cart(0)
            </span>
          )}
        </li>
        {/* )} */}

        <li>
          <Link href="/">Add Restaurant</Link>
        </li>
        <li>
          <Link href="/deliveryPartner">Delivery Partner</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerHeader;
