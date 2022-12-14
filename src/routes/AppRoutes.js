// import libraries
import React from "react";
import { Route,Routes } from "react-router-dom";
// import files links for routes
import Home from '../components/Home/Home';
import ProductList from '../components/ProductList/ProductList';
import AddressCheckout from "../containers/AddressCheckout/AddressCheckout";
import FinalCheckout from "../containers/FinalCheckout/FinalCheckout";
import Payment from '../containers/Payment/PaymentCheckout'
import Shipping from "../containers/Shipping/ShippingProducts";
import OrderConfirm from '../components/Orderconfirm/Orderconfirm'
import ProductDetails from '../components/ProductDetails/ProductDetail';
import FullCart from '../components/FullCart/FullCart';

export const routes=(
    <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/products' element={<ProductList />} ></Route>
              {/* your routes come here */}
              <Route path="/checkout/addresscheckout" element={<AddressCheckout />}/>
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cartItems" element={<FullCart />} />
              <Route path="/checkout/shipping/orderID=:id" element={<Shipping />} />
              <Route path="/checkout/payment/orderID=:id" element={<Payment />} />
              <Route path="/checkout/finalcheckout/orderID=:id" element={<FinalCheckout />} />
              <Route path="/checkout/orderconfirm/orderID=:id" element={<OrderConfirm />} />
            </Routes>
)
