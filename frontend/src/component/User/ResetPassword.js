import React, { Fragment , useState, useEffect} from "react";
import "./ResetPassword.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import {useDispatch , useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';
import {resetPassword, clearErrors} from "../../actions/userAction";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
   
    const {error, loading , success} = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(params.token, myForm));
    }
    useEffect(()=>{
        if(error){
            Swal.fire({
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok',
                customClass: 'swal-wide'
            });
            dispatch(clearErrors());
        } 
        if(success){
            Swal.fire({
                text: 'Password Updated Successfully',
                icon: 'success',
                confirmButtonText: 'Ok',
                customClass: 'swal-wide'
            });
            navigate("/login");
        }
    },[dispatch, error, success, navigate, Swal]);
    return(
            <Fragment>
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <MetaData title="Change Password"/>
                            <div className="resetPasswordContainer">
                                    <div className="resetPasswordBox">
                                        <h1>Update Password</h1>
                                        <form className="resetPasswordForm" onSubmit={resetPasswordSubmit}>
                                            <div>
                                                <LockOpenIcon />
                                                <input 
                                                    type="password"
                                                    placeholder="New Password"
                                                    required
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <LockIcon />
                                                <input 
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    required
                                                    name="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                            </div>
                                            <input 
                                                type="submit"
                                                value="Update"
                                                className="resetPasswordBtn"
                                            />
                                        </form>
                                    </div>
                            </div>
                    </Fragment>
                )}
            </Fragment>
        );
}

export default ResetPassword;