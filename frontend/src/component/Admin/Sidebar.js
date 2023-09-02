import React, { useState } from 'react';
import "./Sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";


const Sidebar = () => {


    const [showLinks, setShowLinks] = useState(false);

    const handleProductsClick = () => {
        setShowLinks(!showLinks);
    };
    
    return(
        <div className='sidebar'>
            <Link to="/">
                <img src={logo} alt='Ecommerce'/>
            </Link>
            <Link to="/admin/dashboard">
                <p>
                    <DashboardIcon/> Dashboard
                </p>
            </Link>
            <Link>
                <div onClick={handleProductsClick}>
                    <span><ImportExportIcon/> Products</span>
                </div>
                {showLinks && (
                    <ul className='innerLinks'>
                        <li>
                            <Link to="/admin/products">
                                <span><PostAddIcon /> All</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/admin/product">
                                <span><AddIcon /> Create</span>
                            </Link>
                        </li>
                    </ul>
                )}
            </Link>
            <Link to="/admin/orders">
                <p>
                    <ListAltIcon/> Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p>
                    <PeopleIcon/> Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p>
                    <RateReviewIcon/> Reviews
                </p>
            </Link>
        </div>
    );
}

export default Sidebar;