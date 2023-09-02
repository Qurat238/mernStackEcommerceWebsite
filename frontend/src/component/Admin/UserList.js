import React, {Fragment, useEffect} from "react";
import "./UserList.css";
import {useSelector, useDispatch} from "react-redux";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "./Sidebar.js";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllUsers , clearErrors, deleteUser} from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import Loader from "../layout/Loader/Loader";
import Swal from 'sweetalert2';

const UserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error, users, loading} = useSelector((state) => state.allUsers);
    const {error:deleteError, isDeleted, message} = useSelector((state) => state.profile);

    const rows = [];
    users && users.forEach((item) => {
        rows.push({
            id:item._id,
            role:item.role,
            email:item.email,
            name:item.name,
        });
    });

    useEffect(() => {
        if(error){
            Swal.fire({
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            dispatch(clearErrors());
        }
        dispatch(getAllUsers());
        if(deleteError){
            Swal.fire({
                text: deleteError,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            dispatch(clearErrors());
        }
        if(isDeleted){
            Swal.fire({
                text: message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            navigate("/admin/users");
            dispatch({type:DELETE_USER_RESET});
        }
    },[dispatch,Swal,error,deleteError,isDeleted,navigate, message]);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    }

return(
    <Fragment>
        <MetaData title={`All Users -- Admin`}/>
        <div className="dashboard">
        <Sidebar/>
        <div className="userListContainer">
            {loading ? <Loader/> : 
            <table>
            <thead>
                <tr>
                    <th style={{width:"140rem"}}>User ID</th>
                    <th style={{width:"105rem"}}>Email</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th style={{width:"120rem"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((val,i)=>
                <tr key={i}>
                    <th style={{width:"140rem"}} className="id">{val.id}</th>
                    <th style={{width:"105rem"}} className="id">{val.email}</th>
                    <th className="id">{val.name}</th>
                    <th className={ (val.role === "admin") ? "greenColor" : "redColor"}>{val.role}</th>
                    <th style={{width:"120rem"}}>
                        <a href={`/admin/user/${val.id}`}><EditIcon/></a>
                        <Button onClick={() => deleteUserHandler(val.id)}><DeleteIcon/></Button>
                    </th>
                </tr>
                )}
            </tbody>
        </table>}
        </div>
    </div>
    </Fragment>
);
};

export default UserList;