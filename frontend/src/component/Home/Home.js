import React, { Fragment, useEffect } from "react";
import "./Home.css";
import MetaData from "../layout/MetaData";
import ProductCard from "./ProductCard.js";
import Loader from "../layout/Loader/Loader";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';

const Home = () => {  
    const dispatch = useDispatch();
    const { loading, error, products} = useSelector((state) => state.products);

    useEffect(()=>{
        if(error){
            Swal.fire({
                text: error,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    },[dispatch, error, Swal]);

   

    return(
        <Fragment>
            {loading ? (
                <Loader />
            ):(
                <Fragment>
            <MetaData title="ECOMMERCE"/>
            <div className="banner">
                <h1>Get Start</h1>
                <h1>Your Favorite Shopping</h1>
            </div>
            <div className="homeHeading">
                
                    {products.length === 0 ? (
                        <div className="noProductsContainer">
                        <p>No Any Product Yet.</p>
                    </div>
                    ) : (
                        <div>
                            <h2>Trending Items</h2>
                            <div className="container" id="container">
                                {products && products.map((product) => <ProductCard key={product.name} product={product}/>)}
                            </div>
                        </div>
                    )}
                
            </div>
        </Fragment>
            )}
        </Fragment>
    );
}

export default Home;





