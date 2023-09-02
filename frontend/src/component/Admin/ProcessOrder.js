import React, { Fragment, useEffect, useState } from "react";
import "./ProcessOrder.css";
import MetaData from "../layout/MetaData";
import {Link} from "react-router-dom";
import { Typography, Button } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Sidebar from "./Sidebar.js";
import { useParams } from 'react-router-dom';
import { getOrderDetails, clearErrors, updateOrder } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import Swal from 'sweetalert2';

const ProcessOrder = () => {

    const dispatch = useDispatch();
    const params = useParams();

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error:updateError, isUpdated } = useSelector((state) => state.order);

    const [status, setStatus] = useState("");

    const processOrderSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status", status);
        dispatch(updateOrder(params.id, myForm));
    }

    useEffect(() => {
        if(error){
            Swal.fire({
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            dispatch(clearErrors());
        }
        if(updateError){
            Swal.fire({
                text: updateError,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            dispatch(clearErrors());
        }
        if(isUpdated){
            Swal.fire({
                text: 'Order Updated Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            dispatch({type: UPDATE_ORDER_RESET});
        }
        dispatch(getOrderDetails(params.id));
    },[dispatch,alert,error,params.id,isUpdated,updateError]);

    return(
        <Fragment>
            <MetaData title="Process Order"/>
            <div className="dashboard">
                <Sidebar/>
                <div className="processOrderContainer">
                    {loading ? <Loader /> : 
                        <div 
                            className="processOrderPage"
                            style={{
                                display: order && order.orderStatus === "Delivered" ? "block" : "grid",
                            }}
                        >
                        <div>
                            <div className="processShippingArea">
                                <Typography>Shipping Info</Typography>
                                <div className='orderDetailsContainerBox'>
                                    <div>
                                        <p>Name:</p>
                                        <span>{order && order.user && order.user.name }</span>
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <span>{order && order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <span>{order && order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}</span>
                                    </div>
                                </div>
                                <Typography>Payment</Typography>
                                <div className='orderDetailsContainerBox'>
                                    <div>
                                        <p className={order && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>
                                            {order && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                                        </p>
                                    </div>
                                    <div>
                                        <p>Amount:</p>
                                        <span>{order && order.totalPrice}</span>
                                    </div>
                                </div>
                                <Typography>Order Status</Typography>
                                <div className='orderDetailsContainerBox'>
                                    <div>
                                        <p className={order && order.orderStatus === "Delivered" ? "greenColor" : "redColor"}>
                                            {order && order.orderStatus}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="processCartItems">
                                <Typography>Your Cart Items:</Typography>
                                <div className="processCartItemsContainer">
                                    {order && order.orderItems.map((item) => (
                                        <div key={item.product}>
                                            <img  src={item.image} alt="Product"/>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            <span>
                                                {item.quantity} X ₹{item.price} = <b>₹{item.price*item.quantity}</b>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: order && order.orderStatus === "Delivered" ? "none" : "block",
                            }}
                        >
                        <form
                         className='processOrderForm'
                         onSubmit={processOrderSubmitHandler}
                        >
                         <h1>Process Order</h1>
                         <div> 
                             <AccountTreeIcon/>
                             <select onChange={(e) => setStatus(e.target.value)}>
                                 <option value="">Choose Category</option>
                                 {order && order.orderStatus === "Processing" && (
                                    <option value="Shipped">Shipped</option>
                                 )}
                                 {order && order.orderStatus === "Shipped" && (
                                    <option value="Delivered">Delivered</option>
                                 )}
                            </select>
                         </div> 
                         <Button
                             id='processOrderBtn'
                             type='submit'
                             disabled={loading ? true : false || status === "" ? true : false}
                         >
                            Process
                         </Button>
                     </form>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default ProcessOrder;