import React, { Fragment , useState, useEffect} from "react";
import "./UpdateProfile.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import {useDispatch , useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {updateProfile, clearErrors, loadUser} from "../../actions/userAction";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import Swal from 'sweetalert2';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const {user} = useSelector((state) => state.user);
    const {error, loading , isUpdated} = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/profile.png");

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name" , name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    }
    const updateProfileDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if(error){
            Swal.fire({
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            dispatch(clearErrors());
        } 
        if(isUpdated){
            Swal.fire({
                text: 'Profile Updated Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            dispatch(loadUser());
            navigate("/account");
            dispatch({
                type:UPDATE_PROFILE_RESET,
            });
        }
    },[dispatch, error, isUpdated, Swal, navigate,user]);

    return(
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
            <MetaData title="Update Profile"/>
            <div className="updateProfileContainer">
                    <div className="updateProfileBox">
                        <h1>Update Profile</h1>
                        <form className="updateProfileForm" encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                                <div className="updateProfileName">
                                    <FaceIcon />
                                    <input 
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="updateProfileEmail">
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
                                <div id="updateProfileImage">
                                    <img src={avatarPreview} alt="Avatar Preview"/>
                                    <input 
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={updateProfileDataChange}
                                    />
                                </div>
                                <input 
                                    type="submit"
                                    value="Update"
                                    className="updateProfileBtn"
                                />
                            </form>
                    </div>
            </div>
        </Fragment>
            )}
        </Fragment>
    );
}

export default UpdateProfile;