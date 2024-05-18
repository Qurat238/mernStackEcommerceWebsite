import './App.css';
import {useState, useEffect} from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home";
import React from "react";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import About from './component/layout/About/About';
import Search from "./component/Product/Search.js";
import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginSignup from './component/User/LoginSignup';
import {useDispatch, useSelector} from "react-redux";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import Payment from "./component/Cart/Payment.js";
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from './component/Admin/NewProduct.js';
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UserList from "./component/Admin/UserList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ReviewList from "./component/Admin/ReviewList.js";
import NotFound from "./component/layout/NotFound/NotFound.js";

function App() {
  const dispatch = useDispatch();

  const {loading, user, isAuthenticated} = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    dispatch(loadUser());
    const getStripeApiKey = async () => {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    };
    getStripeApiKey();
  }, [dispatch]);

  const isAdmin=true;

  function UserElement({children}){
    if(isAuthenticated){
      return <>{children}</>
    } else {
      return <Navigate to="/login"/>
    } 
  }

  function UserStripeElement({children}){
    if (!loading && stripeApiKey) {
      if (isAuthenticated) {
        return <>{children}</>;
      } else {
        return <Navigate to="/login" />;
      }
    } else {
      return <Navigate to="/login" />;
    }
  }


  function AdminElement({children}){
    if (isAuthenticated) {
      if (isAdmin && user.role === "admin") {
        return <>{children}</>;
      } else {
        return <Navigate to="/login" />;
      }
    } else {
      return <Navigate to="/login" />;
    }
  }

  // window.addEventListener("contextmenu", (e)=> e.preventDefault());

  return ( 
      <Router basename="/">
        <Header/>
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/account' element={loading===false && (<UserElement><Profile /></UserElement>)}/>
          <Route path="/me/update" element={loading===false && (<UserElement><UpdateProfile /></UserElement>)}/> 
          <Route path="/password/update" element={loading===false && (<UserElement><UpdatePassword /></UserElement>)} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/login/shipping" element={loading===false && (<UserElement><Shipping /></UserElement>)} />
          <Route path="/order/confirm" element={loading===false && (<UserElement><ConfirmOrder /></UserElement>)}/>
          <Route path="/payment/process" element={<UserStripeElement><Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements></UserStripeElement>}/>
          <Route path="/success" element={loading===false && (<UserElement><OrderSuccess /></UserElement>)}/>
          <Route path="/orders" element={loading===false && (<UserElement><MyOrders/></UserElement>)}/>
          <Route path="/order/:id" element={loading===false && (<UserElement><OrderDetails /></UserElement>)}/>
          <Route path="/admin/dashboard" element={loading===false && (<AdminElement><Dashboard /></AdminElement>)}/>
          <Route path="/admin/products" element={loading===false && (<AdminElement><ProductList /></AdminElement>)}/>
          <Route path="/admin/product" element={loading===false && (<AdminElement><NewProduct /></AdminElement>)}/>
          <Route path="/admin/product/:id" element={loading === false && (<AdminElement><UpdateProduct /></AdminElement>)}/>
          <Route path="/admin/orders" element={loading===false && (<AdminElement><OrderList /></AdminElement>)}/>
          <Route path="/admin/order/:id" element={loading === false && (<AdminElement><ProcessOrder /></AdminElement>)}/>
          <Route path="/admin/users" element={loading===false && (<AdminElement><UserList /></AdminElement>)}/>
          <Route path="/admin/user/:id" element={loading === false && (<AdminElement><UpdateUser /></AdminElement>)}/>
          <Route path="/admin/reviews" element={loading===false && (<AdminElement><ReviewList /></AdminElement>)}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer />
      </Router>
  );
} 

export default App;
