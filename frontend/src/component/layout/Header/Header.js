import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {

     const openHandler = (e) => {
        const sidePanel = document.getElementById('sidePanel');
        const overlay = document.getElementById('overlay');
        sidePanel.style.left='0';
        overlay.style.display = 'block';
    }

    const closeHandler = (e) => {
        const screenWidth = window.innerWidth;
        const sidePanel = document.getElementById('sidePanel');
        const overlay = document.getElementById('overlay');
        if (screenWidth > 568) {
            sidePanel.style.left = '-25vw';
        } else {
            sidePanel.style.left = '-50vw';
        }
        overlay.style.display = 'none';
    }

    return (
        <div>
             <div onClick={openHandler} className="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div id='sidePanel'>
                <button id='close' onClick={closeHandler}><CloseIcon/></button>
                <div className="links">
                    <div><HomeIcon/> <Link to="/">Home</Link></div>
                    <div><ShoppingBasketIcon/> <Link to="/products">Products</Link></div>
                    <div><InfoOutlinedIcon/> <Link to="/about"> About</Link></div>
                    <div><SearchIcon/> <Link to="/search"> Search</Link></div>
                    <div><ShoppingCartIcon/> <Link to="/cart"> Cart</Link></div>
                    <div><VerifiedUserIcon/> <Link to="/login">Login</Link></div>  
                </div>
                <ul id='searchResults'></ul>
            </div>
        <div id='overlay'></div>
        </div>
    );
};


export default Header;