import React, { useState, useEffect } from "react";
import "../../assets/styles/Products/ProductDetails.css";
import {
	addToCart,
	getProductDetailsById,
	IMAGE_URL,
} from "../../services/ApiService";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
	const { productId } = useParams(); // Retrieve productId from URL parameters
	const [product, setProduct] = useState(null); // State to store product details
	const [selectedImage, setSelectedImage] = useState(""); // State to store selected image
	const [loading, setLoading] = useState(true); // State to manage loading status
	const [buttonText, setButtonText] = useState("Add to Cart"); // State to manage button text
	const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to manage button disabled status

	useEffect(() => {
		// Fetch product details from API
		const fetchProductDetails = async () => {
			let user_id = "";
			const user = localStorage.getItem("user");

			if (user) {
				const data = JSON.parse(user);
				user_id = data ? data.user_id : "";
			}

			try {
				// Fetch product details by ID
				const response = await getProductDetailsById(productId, user_id);
				setProduct(response.data);
				setSelectedImage(response.data.product_images[0]); // Set the first image as selected
				if (response.data.is_added) {
					setButtonText("Added to Cart"); // Update button text if product is already added
					setIsButtonDisabled(true); // Disable the button if the product is already in the cart
				}
			} catch (error) {
				toast.error("Failed to load product details. Please try again."); // Display error message
			} finally {
				setLoading(false); // Set loading to false after data is fetched
			}
		};

		fetchProductDetails();
	}, [productId]); // Run effect when productId changes

	const handleAddToCart = async () => {
		setButtonText("Adding to Cart..."); // Update button text while adding
		setIsButtonDisabled(true); // Disable the button while adding

		try {
			// Add product to cart
			await addToCart({
				product_id: productId,
				quantity: 1,
			});
			toast.success("Added to cart"); // Display success message
			setButtonText("Added to Cart"); // Update button text
		} catch (error) {
			setButtonText("Add to Cart"); // Reset button text on error
			setIsButtonDisabled(false); // Enable button on error
			toast.error("Failed to add to cart. Please try again."); // Display error message
		}
	};

	if (loading) {
		return (
			<div className="loading-container">
				<h2>Loading product details...</h2> {/* Display loading state */}
			</div>
		);
	}

	if (!product) {
		return (
			<div className="error-container">
				<h2>Product not found</h2>{" "}
				{/* Display error state if product is not found */}
			</div>
		);
	}

	return (
		<div className="product-details-page">
			<div className="product-images">
				<img
					src={`${IMAGE_URL}${selectedImage}`}
					alt={product.name}
					className="main-image" // Main product image
				/>
				<div className="thumbnail-images">
					{product.product_images.map((image, index) => (
						<img
							key={index}
							src={`${IMAGE_URL}${image}`}
							alt={`Thumbnail ${index}`}
							className={`thumbnail ${selectedImage === image ? "active" : ""}`}
							onClick={() => setSelectedImage(image)} // Update selected image on click
						/>
					))}
				</div>
			</div>
			<div className="product-info">
				<h2>{product.name}</h2> {/* Product name */}
				<p className="product-description">{product.description}</p>{" "}
				{/* Product description */}
				<p className="product-price">Price: ₹{product.price}</p>{" "}
				{/* Product price */}
				<button
					className="add-to-cart-button"
					onClick={handleAddToCart}
					disabled={isButtonDisabled} // Disable button if necessary
				>
					{buttonText}
				</button>
			</div>
		</div>
	);
};

export default ProductDetails;
