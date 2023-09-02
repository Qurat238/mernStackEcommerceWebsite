import React, {Fragment, useEffect, useState} from "react";
import "./ReviewList.css";
import {useSelector, useDispatch} from "react-redux";
import {clearErrors, getAllReviews, deleteReviews} from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar.js";
import { Button } from "@mui/material";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import Swal from 'sweetalert2';

const ReviewList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error:deleteError, isDeleted} = useSelector((state) => state.review);
    const {error, reviews, loading} = useSelector((state) => state.productReviews);

    const [productId, setProductId] = useState("");

    const rows = [];
    reviews && reviews.forEach((item) => {
        rows.push({
            id:item._id,
            user:item.name,
            comment:item.comment,
            rating:item.rating,
        });
    });

    useEffect(() => {
        if(productId.length === 24){
            dispatch(getAllReviews(productId));
        }
        if(error){
            Swal.fire({
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            dispatch(clearErrors());
        }
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
                text: 'Review Deleted Successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            navigate("/admin/reviews");
            dispatch({type:DELETE_REVIEW_RESET});
        }
    },[dispatch,Swal,error,deleteError,isDeleted,navigate,productId]);

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId,productId));
    }
    const productReivewSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    }

return(
    <Fragment>
        <MetaData title={`All Reviews -- Admin`}/>
        <div className="dashboard">
            <Sidebar/>
            <div className="productReviewsContainer">
            <form
                className='productReviewsForm'
                onSubmit={productReivewSubmitHandler}
            >
                        <h1 className="productReviewsFormHeading">All Reviews</h1>
                        <div>
                            <StarIcon/>
                            <input
                                type='text'
                                placeholder='Product Id'
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>
                        <Button
                            id='productReviewsBtn'
                            type='submit'
                            disabled={loading ? true : false || productId === "" ? true : false}
                        >
                            Search
                        </Button>
                    </form>
                    {reviews && reviews.length > 0 ? 
                        (<table>
                        <thead>
                            <tr>
                                <th style={{width:"450rem"}}>Review ID</th>
                                <th style={{width:"200rem"}}>User</th>
                                <th style={{width:"500rem"}}>Comment</th>
                                <th style={{width:"200rem"}}>Rating</th>
                                <th style={{width:"200rem"}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((val,i)=>
                            <tr key={i}>
                                <th style={{width:"450rem"}} className="id">{val.id}</th>
                                <th style={{width:"200rem"}} className="id">{val.user}</th>
                                <th style={{width:"500rem"}}>{val.comment}</th>
                                <th style={{width:"200rem"}} className={ (val.rating >= 3) ? "greenColor" : "redColor"}>{val.rating}</th>
                                <th style={{width:"200rem"}}>
                                    <Button onClick={() => deleteReviewHandler(val.id)}><DeleteIcon/></Button>
                                </th>
                            </tr>
                            )}
                        </tbody>
                    </table>) : (
                        <h1 className="productReviewsFormHeading2">No Reviews Found</h1>
                    )
                    }
            </div>
        </div>
    </Fragment> 
);
};

export default ReviewList;