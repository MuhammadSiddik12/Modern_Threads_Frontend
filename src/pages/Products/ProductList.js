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
	const [products, setProduct] = useState([]);
	const [products2, setProduct2] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadCategories = async () => {
			try {
				let user_id = "";
				const user = localStorage.getItem("user");

				if (user) {
					console.log("🚀 ~ loadCategories ~ user:", user);
					const data = JSON.parse(user);
					user_id = data ? data.user_id : "";
				}
				const data = await getAllProducts(1, 12, "", user_id);
				const data2 = await getAllProducts(2, 12, "", user_id);
				setProduct(data.data); // Set the fetched categories
				setProduct2(data2.data);
			} catch (err) {
				console.log("🚀 ~ loadCategories ~ err:", err);
				setError("Failed to load products");
			} finally {
				setLoading(false);
			}
		};

		loadCategories(); // Fetch categories on component mount
	}, []); // Empty dependency array means this runs once on mount

	if (loading)
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
	if (error) return <div>{error}</div>;

	return (
		<>
			{/* Display the categories component */}
			<Categories />

			{/* Display the first banner */}
			<Banner bannerImg={banner0} />

			{/* Display the first set of products in a grid */}
			<div className="product-grid">
				{products.map((product) => (
					<ProductCard key={product.product_id} product={product} />
				))}
			</div>

			{/* Display the second banner */}
			<Banner bannerImg={banner2} />

			{/* Display the second set of products in a grid */}
			<div className="product-grid">
				{products2.map((product) =>
					product.product_images.length ? (
						<ProductCard key={product.product_id} product={product} />
					) : (
						""
					)
				)}
			</div>

			{/* Display the third banner */}
			<Banner bannerImg={banner1} />
		</>
	);
}

export default ProductList;
