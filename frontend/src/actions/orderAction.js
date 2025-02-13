import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, MY_ORDERS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, ALL_ORDERS_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAIL, CLEAR_ERRORS } from "../constants/orderConstants";
import axios from "axios";

const serverUrl = "https://mern-stack-ecommerce-website-orpin.vercel.app";

// CREATE ORDER
export const createOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({ type:CREATE_ORDER_REQUEST });
        
        const config = {
            headers: {
                "Content-Type":"application/json",
            },
        };

        const {data} = await axios.post(`${serverUrl}/api/v1/order/new`,order,config);

        dispatch({ type:CREATE_ORDER_SUCCESS, payload:data});

    } catch (error) {
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:error.response.data.message,
        });
    }
}

// My ORDERS
export const myOrders = () => async(dispatch, getState) => {
    try {
        dispatch({ type:MY_ORDERS_REQUEST });
        
        const {data} = await axios.get(`${serverUrl}/api/v1/orders/me`);

        dispatch({ type:MY_ORDERS_SUCCESS, payload:data.orders});

    } catch (error) {
        dispatch({
            type:MY_ORDERS_FAIL,
            payload:error.response.data.message,
        });
    }
}

// Get All Orders(Admin)
export const getAllOrders = () => async(dispatch, getState) => {
    try {
        dispatch({ type:ALL_ORDERS_REQUEST });
        
        const {data} = await axios.get(`${serverUrl}/api/v1/admin/orders`);

        dispatch({ type:ALL_ORDERS_SUCCESS, payload:data.orders});

    } catch (error) {
        dispatch({
            type:ALL_ORDERS_FAIL,
            payload:error.response.data.message,
        });
    }
}

// UPDATE ORDER
export const updateOrder = (id,order) => async(dispatch, getState) => {
    try {
        dispatch({ type:UPDATE_ORDER_REQUEST });
        
        const config = {
            headers: {
                "Content-Type":"application/json",
            },
        };

        const {data} = await axios.put(`${serverUrl}/api/v1/admin/order/${id}`,order,config);

        dispatch({ type:UPDATE_ORDER_SUCCESS, payload:data.success});

    } catch (error) {
        dispatch({
            type:UPDATE_ORDER_FAIL,
            payload:error.response.data.message,
        });
    }
}

// DELETE ORDER
export const deleteOrder = (id) => async(dispatch, getState) => {
    try {
        dispatch({ type:DELETE_ORDER_REQUEST });

        const {data} = await axios.delete(`${serverUrl}/api/v1/admin/order/${id}`);

        dispatch({ type:DELETE_ORDER_SUCCESS, payload:data.success});

    } catch (error) {
        dispatch({
            type:DELETE_ORDER_FAIL,
            payload:error.response.data.message,
        });
    }
}

// GET ORDER DETAILS
export const getOrderDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type:ORDER_DETAILS_REQUEST });
        
        const {data} = await axios.get(`${serverUrl}/api/v1/order/${id}`);

        dispatch({ 
            type:ORDER_DETAILS_SUCCESS, 
            payload:data.order
        });

    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response.data.message,
        });
    }
}

// CLEARING ERRORS
export const clearErrors = () => async(dispatch) => {
    dispatch({ type:CLEAR_ERRORS });
};
