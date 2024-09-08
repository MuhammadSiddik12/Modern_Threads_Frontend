import React, { useState, useEffect } from "react";
import "../../assets/styles/Products/Shop.css";
import ReactPaginate from "react-paginate";
import ProductCard from "../../components/ProductCard";
import {
	getAllCategories,
	getAllProducts,
	getAllProductsByCategory,
} from "../../services/ApiService";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Shop() {
	const { categoryId } = useParams();
	const navigate = useNavigate();
	const location = useLocation();

	const [products, setProducts] = useState([]);
	const [category, setCategory] = useState("All");
	const [search, setSearch] = useState("");
	const [categories, setCategories] = useState([]);
	const [sort, setSort] = useState("none");
	const [currentPage, setCurrentPage] = useState(0);
	const [totalCount, setTotalCount] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const itemsPerPage = 9;

	useEffect(() => {
		const fetchCategoriesAndProducts = async () => {
			try {
				let user_id = "";
				const user = localStorage.getItem("user");

				if (user) {
					const data = JSON.parse(user);
					user_id = data ? data.user_id : "";
				}

				const categoriesData = await getAllCategories();
				const allCategories = [
					{ category_name: "All", category_id: "All" },
					...categoriesData.data,
				];
				setCategories(allCategories);

				if (categoryId) {
					const selectedCategory = allCategories.find(
						(cat) => cat.category_id === categoryId
					);
					if (selectedCategory) {
						setCategory(selectedCategory.category_name);
					}
				}

				let productsData;
				if (location.state?.searchResults) {
					// Use search results from header
					productsData = {
						data: location.state.searchResults,
						total_count: location.state.total_count,
					};
					console.log(
						"🚀 ~ fetchCategoriesAndProducts ~ productsData:",
						productsData
					);
					setSearch(location.state.searchQuery);
				} else if (categoryId && categoryId !== "All") {
					productsData = await getAllProductsByCategory(
						categoryId,
						currentPage + 1,
						itemsPerPage,
						search
					);
				} else if (category !== "All") {
					const selectedCategory = allCategories.find(
						(cat) => cat.category_name === category
					);
					if (selectedCategory) {
						productsData = await getAllProductsByCategory(
							selectedCategory.category_id,
							currentPage + 1,
							itemsPerPage,
							search
						);
					}
				} else {
					productsData = await getAllProducts(
						currentPage + 1,
						itemsPerPage,
						search,
						user_id
					);
				}

				setProducts(productsData.data);
				setTotalCount(productsData.total_count);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		setLoading(true);
		fetchCategoriesAndProducts();
	}, [currentPage, category, categoryId, location.state?.searchResults]);

	// Handle category change
	const handleCategoryChange = (e) => {
		const selectedCategoryId = e.target.value;

		const selectedCategory = categories.find(
			(cat) => cat.category_id === selectedCategoryId
		);

		if (selectedCategory) {
			setCategory(selectedCategory.category_name);
			navigate(`/shopbycategory/${selectedCategoryId}`);
		}
		setCurrentPage(0);
	};

	// Handle sort change
	const handleSortChange = (e) => {
		setSort(e.target.value);
		setCurrentPage(0);
	};

	const sortedProducts = [...products].sort((a, b) => {
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
					<select
						value={
							categories.find((cat) => cat.category_name === category)
								?.category_id
						}
						onChange={handleCategoryChange}
					>
						{categories.map((cat) => (
							<option key={cat.category_id} value={cat.category_id}>
								{cat.category_name}
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
			{products.length === 0 ? (
				<div>
					<h3>No product found</h3>
				</div>
			) : (
				<div className="product-grid">
					{sortedProducts.map((product) => (
						<ProductCard key={product.product_id} product={product} />
					))}
				</div>
			)}
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
