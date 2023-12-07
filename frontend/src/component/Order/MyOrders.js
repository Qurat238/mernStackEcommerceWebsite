import React, {Fragment, useEffect} from "react";
import "./MyOrders.css";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import {useSelector, useDispatch} from "react-redux";
import {clearErrors, myOrders} from "../../actions/orderAction";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const MyOrders = () => {
    const dispatch = useDispatch();

    const {loading, error, orders} = useSelector((state) => state.myOrders);
    const {user} = useSelector((state) => state.user);


    const rows = [];

    orders && orders.forEach((item,index) => {
        rows.push({
            id:item._id,
            status:item.orderStatus,
            itemsQty:item.orderItems.length,
            amount:item.totalPrice
        });
    });

    useEffect(() => {
        if(error){
            Swal.fire({
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok',
                customClass: 'swal-wide'
            });
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    },[dispatch,Swal,error]);

    return(
        <Fragment>
            <MetaData  title={`${user.name} - Orders`} />
            {loading ? (
                <Loader/>
            ):
                orders.length === 0 ? (
                    <div className="noOrders">
                        <ListAltIcon />
                        <p>You have ordered nothing yet.</p>
                        <Link to="/products">View Products</Link>
                    </div>
                ) : (
            <div className="component">
            <div>
                <table>
                    <thead>
                        <tr>
                            <th style={{width:"150rem"}}>ID</th>
                            <th style={{width:"100rem"}}>Status</th>
                            <th style={{width:"100rem"}}>Items Qty</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((val,i)=>
                        <tr key={i}>
                            <th className="font" style={{width:"150rem"}}>{val.id}</th>
                            <th  style={{width:"100rem"}} className={ (val.status === "Delivered") ? "greenColor" : "redColor"}>{val.status}</th>
                            <th style={{width:"100rem"}}>{val.itemsQty}</th>
                            <th>{val.amount}</th>
                            <th><a href={`/order/${val.id}`}><LaunchIcon/></a></th>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
            </div>
            )}
        </Fragment>
    );
}


export default MyOrders;