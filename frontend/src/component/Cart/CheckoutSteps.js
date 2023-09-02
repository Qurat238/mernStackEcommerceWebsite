import React, { Fragment } from "react";
import "./CheckoutSteps.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import {Step, StepLabel, Stepper, Typography } from "@mui/material";

const CheckoutSteps = ({activeStep}) => {
    const steps = [
        {
            label:<Typography className="text">Shipping Details</Typography>,
            icon:<LocalShippingIcon className="icon"/>
        },
        {
            label:<Typography className="text">Confirm Order</Typography>,
            icon:<LibraryAddCheckIcon className="icon"/>
        },
        {
            label:<Typography className="text">Payment</Typography>,
            icon:<AccountBalanceIcon className="icon"/>
        }
    ];
    const stepStyles = {
        boxSizing: "border-box"
    }
    return(
        <Fragment>
            <div className="stepper">
                <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                    {steps.map((item,index) => (
                        <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true :false}>
                            <StepLabel icon={item.icon} style={{ color:activeStep >= index ? "tomato" : "rgba(0,0,0,0.649)" }}>{item.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </Fragment>
    );
}

export default CheckoutSteps;