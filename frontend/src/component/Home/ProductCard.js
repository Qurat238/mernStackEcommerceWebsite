import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";


const ProductCard = ({product}) => {
    const options = {
        size:"large",
        value:product.ratings,
        readOnly: true,
        precision:0.5
    }
    return(
        <Link to={{pathname:`/product/${product._id}`}} style={{textDecoration:'none'}}>
            <div className="productCard">
                <img src={product.images[0].url} alt={product.name}/>
                <div className="productInfo">
                    <p>{product.name}</p>
                    <div>
                        <Rating {...options}/> <span>({product.noOfReviews} {product.noOfReviews===1 ? "Review" : "Reviews"})</span>
                    </div>
                    <span>{`₹${product.price}`}</span>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
