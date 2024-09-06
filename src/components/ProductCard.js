import React from "react";
import "../assets/styles/ProductCard.css";
import { Link } from "react-router-dom";
import { IMAGE_URL } from "../services/ApiService";

function ProductCard({ product }) {
	return (
		<Link
			to={`/product/productDetails/${product.product_id}`}
			className="product-card"
		>
			<img
				src={`${IMAGE_URL}${product.product_images[0]}`} /* Product image source */
				alt={product.product_name} /* Alt text for accessibility */
				loading="lazy" /* Lazy load image for performance */
				decoding="async" /* Asynchronously decode image */
				className="product-image" /* Apply styling */
			/>
			<h2 className="product-name">{product.product_name}</h2>{" "}
			{/* Display product name */}
			<p className="product-price">₹{product.price}</p>{" "}
			{/* Display product price */}
			<button className="product-button">Add to Cart</button>{" "}
			{/* Button to add product to cart */}
		</Link>
	);
}

export default ProductCard;
