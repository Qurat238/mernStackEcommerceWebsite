import React, {Fragment, useEffect} from "react";
import "./OrderList.css";
import {useSelector, useDispatch} from "react-redux";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar.js";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteOrder, getAllOrders, clearErrors } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import Loader from "../layout/Loader/Loader";
import Swal from 'sweetalert2';

const OrderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error, orders, loading} = useSelector((state) => state.allOrders);
    const {error:deleteError, isDeleted} = useSelector((state) => state.order);

    const rows = [];
    orders && orders.forEach((item) => {
        rows.push({
            id:item._id,
            itemsQty:item.orderItems.length,
            amount:item.totalPrice,
            status:item.orderStatus,
        });
    });

    useEffect(() => {
        if(error){
            Swal.fire({
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            dispatch(clearErrors());
        }
        dispatch(getAllOrders());
        if(deleteError){
            Swal.fire({
                text: deleteError,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            dispatch(clearErrors());
        }
        if(isDeleted){
            Swal.fire({
                text: 'Order Deleted Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            navigate("/admin/orders");
            dispatch({type:DELETE_ORDER_RESET});
        }
    },[dispatch,Swal,error,deleteError,isDeleted,navigate]);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    }

return(
    <Fragment>
        <MetaData title={`All Orders -- Admin`}/>
        <div className="dashboard">
            <Sidebar/>
            <div className="orderListContainer">
                {loading ? ( 
                    <Loader/> 
                ) : 
                    orders.length === 0 ? (
                        <div className="noOrdersAdmin">
                            <p>No Any Order Yet.</p>
                        </div>
                    ) : (
                    <div>
            <table>
                <thead>
                    <tr>
                        <th style={{width:"150rem"}}>ID</th>
                        <th style={{width:"80rem"}}>Status</th>
                        <th>Items Qty</th>
                        <th>Amount</th>
                        <th style={{width:"120rem"}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((val,i)=>
                        <tr key={i}>
                        <th style={{width:"150rem"}} className="id">{val.id}</th>
                        <th style={{width:"80rem"}} className={ (val.status === "Delivered") ? "greenColor" : "redColor"}>{val.status}</th>
                        <th>{val.itemsQty}</th>
                        <th>{val.amount}</th>
                        <th style={{width:"120rem"}}>
                            <a href={`/admin/order/${val.id}`}><EditIcon/></a>
                            <Button onClick={() => deleteOrderHandler(val.id)}><DeleteIcon/></Button>
                        </th>
                    </tr>
                    )}
                </tbody>
            </table>
                </div> )
                }
            </div>
        </div>
    </Fragment>
);
};

export default OrderList;