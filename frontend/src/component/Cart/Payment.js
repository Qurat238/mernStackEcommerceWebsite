import { Typography } from "@mui/material";
import React, { Fragment, useEffect, useRef } from "react";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./Payment.css";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {clearErrors, createOrder} from "../../actions/orderAction";
import Swal from 'sweetalert2';

const Payment = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    const {shippingInfo, cartItems} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.user);
    const {error} = useSelector((state) => state.newOrder);

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const payBtn = useRef(null);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        try {
            const config = {
                headers: {
                    "Content-Type":"application/json",
                },
            }
            console.log(paymentData);
            const { data }  = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );
            console.log(data.client_secret);
            console.log(data.client_secret);
            const client_secret = data.client_secret;
            if (!stripe || !elements ) return;
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        }
                    }
                },
            });
            if(result.error){
                payBtn.current.disabled = false;
                Swal.fire({
                    text: result.error.message,
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    customClass: 'swal-wide'
                });
            }else{
                if(result.paymentIntent.status === "succeeded"){
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
                    dispatch(createOrder(order));
                    navigate("/success");
                }else{
                    alert.error("There's some problem while processing the payment");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            Swal.fire({
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Ok',
                customClass: 'swal-wide'
            });
            console.log(error.message);
        }
    }

    useEffect(()=>{
        if(error){
            Swal.fire({
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok',
                customClass: 'swal-wide'
            });
            dispatch(clearErrors());
        }
    },[dispatch, error, Swal])

    return(
        <Fragment>
            <MetaData title="Payment"/>
            <CheckoutSteps activeStep={2}/>
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon/>
                        <CardNumberElement className="paymentInput"/>
                    </div>
                    <div>
                        <EventIcon/>
                        <CardExpiryElement className="paymentInput"/>
                    </div>
                    <div>
                        <VpnKeyIcon/>
                        <CardCvcElement className="paymentInput"/>
                    </div>
                    <input
                        type="submit"
                        className="paymentFormBtn"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                    />
                </form>
            </div>
        </Fragment>
    );
}



export default Payment;



