import React from "react";
import "../assets/styles/ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
	return (
		<Link to={`/product/productDetails/${product.id}`} className="product-card">
			<img
				src={product.image} /* Product image source */
				alt={product.name} /* Alt text for accessibility */
				loading="lazy" /* Lazy load image for performance */
				decoding="async" /* Asynchronously decode image */
				className="product-image" /* Apply styling */
			/>
			<h2 className="product-name">{product.name}</h2>{" "}
			{/* Display product name */}
			<p className="product-price">₹{product.price.toFixed(2)}</p>{" "}
			{/* Display product price */}
			<button className="product-button">Add to Cart</button>{" "}
			{/* Button to add product to cart */}
		</Link>
	);
}

export default ProductCard;
