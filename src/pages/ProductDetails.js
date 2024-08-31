import React, { useState } from "react";
import "../assets/styles/ProductDetails.css";

const ProductDetails = () => {
	// Sample product data
	const product = {
		id: 1,
		name: "Wireless Earbuds",
		description:
			"These wireless earbuds provide high-quality sound and a comfortable fit. Perfect for on-the-go listening with a long-lasting battery.",
		price: 2999,
		images: [
			"https://www.gonoise.com/cdn/shop/files/3_copy_e16721a2-098d-49ff-a72f-580f05a928cb.webp?v=1720443494",
			"https://www.gonoise.com/cdn/shop/files/5_copy_81ee3c14-ce3a-4379-bb68-8485d61b91f2.webp?v=1720443495",
		],
	};

	const [selectedImage, setSelectedImage] = useState(product.images[0]);
	console.log("🚀 ~ ProductDetails ~ selectedImage:", selectedImage);

	const handleAddToCart = () => {
		// Logic to add product to cart
		console.log(`Added ${product.name} to cart`);
	};

	return (
		<div className="product-details-page">
			<div className="product-images">
				<img src={selectedImage} alt={product.name} className="main-image" />
				<div className="thumbnail-images">
					{product.images.map((image, index) => (
						<img
							key={index}
							src={image}
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
				<button className="add-to-cart-button" onClick={handleAddToCart}>
					Add to Cart
				</button>
			</div>
		</div>
	);
};

export default ProductDetails;
