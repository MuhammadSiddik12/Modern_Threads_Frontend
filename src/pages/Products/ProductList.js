import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import "../../assets/styles/Products/ProductList.css";
import Categories from "../../components/Categories";
import Banner from "../../components/Banner";
import banner0 from "../../assets/images/banner.png";
import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";
import { getAllProducts } from "../../services/ApiService";

function ProductList() {
	const [firstSetProducts, setFirstSetProducts] = useState([]); // Products for the first section
	const [secondSetProducts, setSecondSetProducts] = useState([]); // Products for the second section
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadProducts = async () => {
			try {
				const user = localStorage.getItem("user");
				let user_id = "";

				if (user) {
					const data = JSON.parse(user);
					user_id = data ? data.user_id : "";
				}

				const firstPageProducts = await getAllProducts(1, 12, "", user_id);
				const secondPageProducts = await getAllProducts(2, 12, "", user_id);

				setFirstSetProducts(firstPageProducts.data);
				setSecondSetProducts(secondPageProducts.data);
			} catch (err) {
				setError("Failed to load products. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		loadProducts();
	}, []);

	if (loading) {
		return (
			<div className="loading-container">
				<h2>Loading...</h2>
			</div>
		);
	}

	if (error) {
		return (
			<div className="error-container">
				<h2>{error}</h2>
			</div>
		);
	}

	return (
		<>
			<Categories />

			<Banner bannerImg={banner0} />

			<div className="product-grid">
				{firstSetProducts.length > 0 ? (
					firstSetProducts.map((product) => (
						<ProductCard key={product.product_id} product={product} />
					))
				) : (
					<p>No products available</p>
				)}
			</div>

			<Banner bannerImg={banner2} />

			<div className="product-grid">
				{secondSetProducts.length > 0
					? secondSetProducts.map((product) =>
							product.product_images.length ? (
								<ProductCard key={product.product_id} product={product} />
							) : (
								<p key={product.product_id}>No images available</p>
							)
					  )
					: ""}
			</div>

			<Banner bannerImg={banner1} />
		</>
	);
}

export default ProductList;
