import React from "react";
import "./OrderConfirm.scss";

const OrderConfirm = () => {
  return (
    <main>
      <section className="orderComplete">
        <h1>Your Order Complete!</h1>
        <p id="order">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam
          ratione, consequuntur soluta perferendis aspernatur modi ducimus.
          Impedit minima alias enim maxime molestias doloremque dolorum non
          esse. Corrupti, temporibus? Officiis, quidem! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Porro deserunt aspernatur quasi,
          explicabo voluptatum adipisci. Architecto sed nobis at quasi? Nostrum
          commodi rem architecto culpa quis illum id molestiae veniam.
        </p>
        <div id="orderDelivery">
          <p>Order ID: {window.location.href.split("=")[1]}</p>
          <p>Order Date: {new Date().toDateString()}</p>
          <a href="#">Contact Support</a>
        </div>
      </section>
    </main>
  );
};

export default OrderConfirm;
