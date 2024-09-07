import React, { useState, useEffect } from "react";
import "../assets/styles/Shop.css";
import ReactPaginate from "react-paginate";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../services/ApiService";

const categories = [
	"All",
	"Electronics",
	"Books",
	"Clothing",
	"Footwear",
	"Accessories",
];

function Shop() {
	const [products, setProducts] = useState([]);
	const [category, setCategory] = useState("All");
	const [sort, setSort] = useState("none");
	const [currentPage, setCurrentPage] = useState(0);
	const [totalCount, setTotalCount] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const data = await getAllProducts(currentPage + 1, 9, "");
				setProducts(data.data);
				setTotalCount(data.total_count);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [currentPage, category]);

	// Handle category change
	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
		setCurrentPage(0);
	};

	// Handle sort change
	const handleSortChange = (e) => {
		setSort(e.target.value);
		setCurrentPage(0);
	};

	const sortedProducts = products.sort((a, b) => {
		if (sort === "asc") return a.price - b.price;
		if (sort === "desc") return b.price - a.price;
		return 0;
	});

	// Handle page change
	const handlePageChange = (selectedPage) => {
		setCurrentPage(selectedPage.selected);
	};

	if (loading) {
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="Shop">
			<h1>Product List</h1>
			<div className="filters">
				<label>
					Category:
					<select value={category} onChange={handleCategoryChange}>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
				</label>
				<label>
					Sort by Price:
					<select value={sort} onChange={handleSortChange}>
						<option value="none">None</option>
						<option value="asc">Low to High</option>
						<option value="desc">High to Low</option>
					</select>
				</label>
			</div>
			<div className="product-grid">
				{products.map((product) => (
					<ProductCard key={product.product_id} product={product} />
				))}
			</div>
			<ReactPaginate
				pageCount={totalCount}
				onPageChange={handlePageChange}
				containerClassName={"pagination"}
				activeClassName={"active"}
			/>
		</div>
	);
}

export default Shop;
