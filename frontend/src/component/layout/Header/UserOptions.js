import React, { Fragment, useState } from "react";
import "./UserOptions.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../actions/userAction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Backdrop from "@mui/material/Backdrop";
import Swal from 'sweetalert2';

const UserOptions = ({user}) => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {cartItems} = useSelector((state) => state.cart);

    const [open, setOpen] = useState(false);

    const options = [
        {icon:<ListAltIcon  className="icon"/>, name:"Orders", func:orders},
        {icon:<PersonIcon className="icon"/>, name:"Profile", func:account},
        {icon:<ShoppingCartIcon className="icon" style={{color: cartItems.length > 0 ? "tomato" : "unset"}}/>, name:`Cart (${cartItems.length})`, func:cart},
        {icon:<ExitToAppIcon className="icon"/>, name:"Logout", func:logoutUser}
    ];

    if(user.role==="admin"){
        options.unshift({icon:<DashboardIcon className="icon"/>, name:"Dashboard", func:dashboard});
    }

    function dashboard(){
        navigate("/admin/dashboard");
    }
    function orders(){
        navigate("/orders");
    }
    function account(){
        navigate("/account");
    }
    function cart(){
        navigate("/cart");
    }
    function logoutUser(){
        dispatch(logout());
        Swal.fire({
            text: 'Logged Out Successfully',
            icon: 'success',
            confirmButtonText: 'Ok',
            customClass: 'swal-wide'
        });
    }

    const getTooltipStyle = () => {
        const laptopStyle = {fontSize:'2rem'};
        const mobileStyle = {fontSize:'4rem'};
        return window.innerWidth <= 568 ? {...laptopStyle, ...mobileStyle} : laptopStyle;
    }


    return(
        <Fragment>
            <Backdrop open={open} style={{zIndex: "10"}}/>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                style={{zIndex: "11" }}
                direction="down"
                className="speedDial"
                icon={<img
                        className="speedDialIcon"
                        src={user.avatar.url ? user.avatar.url : "/profile.png"}
                     alt="Profile"
                      />}
            >
                {options.map((item) => (
                    <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={<span style={getTooltipStyle()}>{item.name}</span>} onClick={item.func}/>
                ))}
            </SpeedDial>
        </Fragment>
    ); 
}

export default UserOptions;