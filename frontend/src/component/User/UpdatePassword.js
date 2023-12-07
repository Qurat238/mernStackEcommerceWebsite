import React, { Fragment , useState, useEffect} from "react";
import "./UpdatePassword.css";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import {useDispatch , useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {updatePassword, clearErrors} from "../../actions/userAction";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import Swal from 'sweetalert2';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const {error, loading , isUpdated} = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword" , oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
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
        if(isUpdated){
            Swal.fire({
                text: 'Password Updated Successfully',
                icon: 'success',
                confirmButtonText: 'Ok',
                customClass: 'swal-wide'
            });
            navigate("/account");
            dispatch({
                type:UPDATE_PASSWORD_RESET,
            });
        }
    },[dispatch, error, isUpdated, Swal, navigate]);
    return(
            <Fragment>
                {loading ? (
                    <Loader />
                ) : (
                    <Fragment>
                        <MetaData title="Change Password"/>
                            <div className="updatePasswordContainer">
                                    <div className="updatePasswordBox">
                                        <h1>Update Password</h1>
                                        <form className="updatePasswordForm" onSubmit={updatePasswordSubmit}>
                                            <div className="signupPassword">
                                                <VpnKeyIcon />
                                                <input 
                                                    type="password"
                                                    placeholder="Old Password"
                                                    required
                                                    name="password"
                                                    value={oldPassword}
                                                    onChange={(e) => setOldPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="signupPassword">
                                                <LockOpenIcon />
                                                <input 
                                                    type="password"
                                                    placeholder="New Password"
                                                    required
                                                    name="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="signupPassword">
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
                                                value="Change"
                                                className="updatePasswordBtn"
                                            />
                                        </form>
                                    </div>
                            </div>
                    </Fragment>
                )}
            </Fragment>
        );
}

export default UpdatePassword;