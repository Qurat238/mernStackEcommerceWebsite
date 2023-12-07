import React, { Fragment , useState, useEffect} from "react";
import "./ForgotPassword.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {useDispatch , useSelector} from "react-redux";
import Swal from 'sweetalert2';
import {clearErrors, forgotPassword} from "../../actions/userAction";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";

const ForgotPassword = () => {

    const dispatch = useDispatch();

    const {error, loading, message} = useSelector((state) => state.forgotPassword);

    const [email, setEmail] = useState("");

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgotPassword(myForm));
    } 

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
        if(message){
            Swal.fire({
                text: message,
                icon: 'success',
                confirmButtonText: 'Ok',
                customClass: 'swal-wide'
            });;
        }
    },[dispatch,error,message, Swal]);

    return(
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Forgot Password"/>
                    <div className="forgotPasswordContainer">
                            <div className="forgotPasswordBox">
                                <h1>Forgot Password</h1>
                                <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit} >
                                        <div className="forgotPasswordEmail">
                                            <MailOutlineIcon />
                                            <input 
                                                type="email"
                                                placeholder="Email"
                                                required
                                                name="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <input 
                                            type="submit"
                                            value="Send"
                                            className="forgotPasswordBtn"
                                        />
                                    </form>
                            </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default ForgotPassword;