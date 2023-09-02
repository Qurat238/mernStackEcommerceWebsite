import React from "react";
import "./Footer.css";
import profile from "../../../images/profile.png";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PersonIcon from "@mui/icons-material/Person";

const Footer = () => {
    return (
        <div id="footer">
            <div className="leftFooter">
                <h1>ECOMMERCE.</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2021 &copy; Qurat Ul Ain</p>
            </div>
            <div className="rightFooter">
                <h4>Contact Links</h4>
                <a href="https://www.upwork.com/freelancers/~01a84faf07c15d6b11"><LinkedInIcon />LinkedIn</a>
                <a href="https://www.linkedin.com/in/qurat-ul-ain-228609213/"><PersonIcon/>Upwork</a>
            </div>
        </div>
    );
};

export default Footer;