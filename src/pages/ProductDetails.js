import React, { useState, useEffect } from "react";
import "../assets/styles/ProductDetails.css";
import {
	addToCart,
	getProductDetailsById,
	IMAGE_URL,
} from "../services/ApiService";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
	const { productId } = useParams();

	const [product, setProduct] = useState(null); // State to store product details
	const [selectedImage, setSelectedImage] = useState(""); // State to store selected image
	const [loading, setLoading] = useState(true);
	const [buttonText, setButtonText] = useState("Add to Cart"); // State to manage button text
	const [isButtonDisabled, setIsButtonDisabled] = useState(false); // State to manage button disabled status

	useEffect(() => {
		const getProductDetails = async () => {
			try {
				const response = await getProductDetailsById(productId);
				setLoading(false);
				setProduct(response.data);
				if (response.data.is_added) {
					setButtonText("Added to Cart");
					setIsButtonDisabled(true);
				}
				setSelectedImage(response.data.product_images[0]);
			} catch (error) {
				console.error("Error fetching product details:", error);
				toast.error(error);
			}
		};

		getProductDetails();
	}, []);

	const handleAddToCart = async () => {
		try {
			const response = await addToCart({
				product_id: productId,
				quantity: 1,
			});
			console.log(`Added ${product.product_name} to cart`, response.data);
			toast.success(`Added to cart`);
			setButtonText("Added to Cart");
			setIsButtonDisabled(true);
		} catch (error) {
			toast.error(error);
			console.error("Error adding product to cart:", error);
		}
	};

	if (loading || !product) {
		return (
			<div>
				<h2>Loading product details...</h2>
			</div>
		);
	}

	return (
		<div className="product-details-page">
			<div className="product-images">
				<img
					src={`${IMAGE_URL}${selectedImage}`}
					alt={product.product_name}
					className="main-image"
				/>
				<div className="thumbnail-images">
					{product.product_images.map((image, index) => (
						<img
							key={index}
							src={`${IMAGE_URL}${image}`}
							alt={`Thumbnail ${index}`}
							className={`thumbnail ${selectedImage === image ? "active" : ""}`}
							onClick={() => setSelectedImage(image)}
						/>
					))}
				</div>
			</div>
			<div className="product-info">
				<h2>{product.name}</h2>
				<p className="product-description">{product.description}</p>
				<p className="product-price">Price: ₹{product.price}</p>
				<button
					className="add-to-cart-button"
					id="addtocart"
					onClick={handleAddToCart}
					disabled={isButtonDisabled}
				>
					{buttonText}{" "}
				</button>
			</div>
		</div>
	);
};

export default ProductDetails;
