import React, { useEffect, useState } from "react"; // Import React and hooks
import "../assets/styles/Products/ProductCard.css"; // Import CSS for styling
import { Link } from "react-router-dom"; // Import Link for navigation
import { addToCart, IMAGE_URL } from "../services/ApiService"; // Import API service functions and image URL constant
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS

function ProductCard({ product }) {
	// Destructure necessary fields from product
	const { product_id, product_name, price, product_images, is_added } = product;

	// State to manage button text and disabled status
	const [buttonText, setButtonText] = useState("Add to Cart");
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	useEffect(() => {
		// Update button text and disabled status based on is_added prop
		if (is_added) {
			setButtonText("Added to Cart");
			setIsButtonDisabled(true);
		}
	}, [is_added]); // Re-run effect when is_added changes

	const handleAddToCart = async () => {
		try {
			// Update button text and disabled status while adding to cart
			setButtonText("Adding to Cart...");
			setIsButtonDisabled(true);

			const response = await addToCart({
				product_id,
				quantity: 1,
			});
			console.log(`Added ${product_name} to cart`, response.data);
			toast.success("Added to cart"); // Notify success
			setButtonText("Added to Cart");
			setIsButtonDisabled(true);
		} catch (error) {
			// Reset button text and enable button if there's an error
			setButtonText("Add to Cart");
			setIsButtonDisabled(false);
			toast.error(error || "Failed to add to cart"); // Notify error
		}
	};

	return (
		<div className="product-card">
			<Link to={`/product/productDetails/${product_id}`} className="edit-link">
				<img
					src={`${IMAGE_URL}${product_images[0]}`} // Product image source
					alt={product_name} // Alt text for accessibility
					loading="lazy" // Lazy load image for performance
					decoding="async" // Asynchronously decode image
					className="product-image" // Apply styling
				/>
				<h2 className="product-name">{product_name}</h2>{" "}
				{/* Display product name */}
				<p className="product-price">₹{price}</p> {/* Display product price */}
			</Link>
			<button
				className="product-button"
				disabled={isButtonDisabled} // Disable button if product is already added
				onClick={handleAddToCart} // Handle button click
			>
				{buttonText} {/* Display button text */}
			</button>
		</div>
	);
}

export default ProductCard; // Export the ProductCard component
