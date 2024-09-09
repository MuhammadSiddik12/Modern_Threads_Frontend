import React, { useEffect, useState } from "react";
import "../assets/styles/Products/ProductCard.css";
import { Link } from "react-router-dom";
import { addToCart, IMAGE_URL } from "../services/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductCard({ product }) {
	// Destructure necessary fields from product
	const { product_id, product_name, price, product_images, is_added } = product;

	const [buttonText, setButtonText] = useState("Add to Cart"); // State to manage button text
	const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to manage button disabled status

	useEffect(() => {
		if (is_added) {
			setButtonText("Added to Cart");
			setIsButtonDisabled(true);
		}
	}, [is_added]); // Add is_added as a dependency

	const handleAddToCart = async () => {
		try {
			setButtonText("Adding to Cart...");
			setIsButtonDisabled(true);
			const response = await addToCart({
				product_id,
				quantity: 1,
			});
			console.log(`Added ${product_name} to cart`, response.data);
			toast.success("Added to cart");
			setButtonText("Added to Cart");
			setIsButtonDisabled(true);
		} catch (error) {
			setButtonText("Add to Cart");
			setIsButtonDisabled(false);
			toast.error(error || "Failed to add to cart");
			console.error("Error adding product to cart:", error);
		}
	};

	return (
		<div className="product-card">
			<Link to={`/product/productDetails/${product_id}`} className="edit-link">
				<img
					src={`${IMAGE_URL}${product_images[0]}`} /* Product image source */
					alt={product_name} /* Alt text for accessibility */
					loading="lazy" /* Lazy load image for performance */
					decoding="async" /* Asynchronously decode image */
					className="product-image" /* Apply styling */
				/>
				<h2 className="product-name">{product_name}</h2>{" "}
				{/* Display product name */}
				<p className="product-price">₹{price}</p> {/* Display product price */}
			</Link>
			<button
				className="product-button"
				disabled={isButtonDisabled}
				onClick={handleAddToCart}
			>
				{buttonText}
			</button>
		</div>
	);
}

export default ProductCard;
