import React from 'react';
import "./About.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Button, Typography } from '@mui/material';

const About = () => {
    const visitUpwork = () => {
        window.location = "https://www.upwork.com/freelancers/~01a84faf07c15d6b11";
    }
    return(
        <div>
        <div className='aboutPage'>
            <div></div>
            <div className='aboutPageGradient'></div>
            <div className='aboutPageContainer'>
                <Typography component="h1">About Us</Typography>
                <div>
                    <div>
                        {/* <Avatar
                            style={{ width: "15rem", height: "15rem", margin: "3rem 0", marginBottom: "1.5rem" }} 
                            src={} 
                            alt=''
                        /> */}
                            <p className='name'>Qurat Ul Ain</p>
                            <p className='email'>q5500407@gmail.com</p>
                        <Button onClick={visitUpwork}>Visit Upwork Profile</Button>
                        
                    </div>
                    <div className='aboutPageContainer2'>
                        <Typography component="h2">Contact Links</Typography>
                        <a href='https://www.linkedin.com/in/qurat-ul-ain-228609213/' target='blank'><LinkedInIcon /></a>
                        <a href='https://www.upwork.com/freelancers/~01a84faf07c15d6b11' target='blank'><PersonIcon/></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default About;