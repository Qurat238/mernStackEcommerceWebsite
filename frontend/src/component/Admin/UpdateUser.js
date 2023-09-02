import React, {Fragment, useEffect, useState} from 'react';
import "./UpdateUser.css";
import {useSelector, useDispatch} from "react-redux";
import {clearErrors, updateUser, getUserDetails} from "../../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Sidebar from "./Sidebar.js";
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import Loader from "../../component/layout/Loader/Loader";
import Swal from 'sweetalert2';

const UpdateUser = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading:updateLoading, error:updateError, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState(0);
    const [role, setRole] = useState("");

    const userId = params.id;

    useEffect(() => {
        if(user && user._id !== userId){
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if(error){
            Swal.fire({
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            dispatch(clearErrors());
        }
        if(updateError){
            Swal.fire({
                text: updateError,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            dispatch(clearErrors());
        }
        if(isUpdated){
            Swal.fire({
                text: 'User Updated Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            navigate("/admin/users");
            dispatch({type: UPDATE_USER_RESET});
        }

    },[dispatch, Swal, error, navigate, updateError, isUpdated, user, userId])

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
        dispatch(updateUser(userId,myForm));
    }

    return(
        <Fragment>
            <MetaData title="Update User"/>
            <div className='dashboard'>
                <Sidebar/>
                <div className='updateUserContainer'>
                    {loading ? <Loader/> : 
                        <form
                        className='updateUserForm'
                        onSubmit={updateUserSubmitHandler}
                    >
                        <h1>Update User</h1>
                        <div>
                            <PersonIcon/>
                            <input
                                type='text'
                                placeholder='Name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <MailOutlineIcon/>
                            <input
                                type='email'
                                placeholder='Email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div> 
                            <VerifiedUserIcon/>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Choose Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <Button
                            id='updateUserBtn'
                            type='submit'
                            disabled={updateLoading ? true : false || role === "" ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                    }
                </div>
            </div>
        </Fragment>
    );
}

export default UpdateUser;