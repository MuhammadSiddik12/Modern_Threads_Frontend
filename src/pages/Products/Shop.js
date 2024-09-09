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
	const { categoryId } = useParams(); // Get category ID from URL parameters
	const navigate = useNavigate(); // Hook for programmatic navigation
	const location = useLocation(); // Hook for accessing location object

	const [products, setProducts] = useState([]); // State for storing products
	const [category, setCategory] = useState("All"); // State for selected category
	const [search, setSearch] = useState(""); // State for search query
	const [categories, setCategories] = useState([]); // State for storing categories
	const [sort, setSort] = useState("none"); // State for sorting preference
	const [currentPage, setCurrentPage] = useState(0); // State for current page
	const [totalCount, setTotalCount] = useState(0); // State for total count of products
	const [loading, setLoading] = useState(true); // State for loading indicator
	const [error, setError] = useState(null); // State for error handling
	const itemsPerPage = 9; // Number of items per page

	useEffect(() => {
		// Function to fetch categories and products
		const fetchCategoriesAndProducts = async () => {
			try {
				let user_id = "";
				const user = localStorage.getItem("user");

				if (user) {
					const data = JSON.parse(user);
					user_id = data ? data.user_id : "";
				}

				// Fetch all categories
				const categoriesData = await getAllCategories();
				const allCategories = [
					{ category_name: "All", category_id: "All" },
					...categoriesData.data,
				];
				setCategories(allCategories);

				// Set selected category based on URL parameter
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
					// Use search results from location state
					productsData = {
						data: location.state.searchResults,
						total_count: location.state.total_count,
					};
					setSearch(location.state.searchQuery);
				} else if (categoryId && categoryId !== "All") {
					// Fetch products by selected category
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
					// Fetch all products
					productsData = await getAllProducts(
						currentPage + 1,
						itemsPerPage,
						search,
						user_id
					);
				}

				setProducts(productsData.data); // Set fetched products
				setTotalCount(productsData.total_count); // Set total count of products
			} catch (error) {
				setError(error.message); // Handle errors
			} finally {
				setLoading(false); // Reset loading state
			}
		};

		setLoading(true);
		fetchCategoriesAndProducts(); // Call fetch function
	}, [currentPage, category, categoryId, location.state?.searchResults]);

	// Handle category change
	const handleCategoryChange = (e) => {
		const selectedCategoryId = e.target.value;

		const selectedCategory = categories.find(
			(cat) => cat.category_id === selectedCategoryId
		);

		if (selectedCategory) {
			setCategory(selectedCategory.category_name);
			navigate(`/shopbycategory/${selectedCategoryId}`); // Navigate to selected category
		}
		setCurrentPage(0); // Reset current page on category change
	};

	// Handle sort change
	const handleSortChange = (e) => {
		setSort(e.target.value);
		setCurrentPage(0); // Reset current page on sort change
	};

	// Sort products based on selected sort option
	const sortedProducts = [...products].sort((a, b) => {
		if (sort === "asc") return a.price - b.price;
		if (sort === "desc") return b.price - a.price;
		return 0;
	});

	// Handle page change for pagination
	const handlePageChange = (selectedPage) => {
		setCurrentPage(selectedPage.selected);
	};

	// Display loading message while data is being fetched
	if (loading) {
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
	}

	// Display error message if there is an error
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
				pageCount={totalCount} // Calculate total pages
				onPageChange={handlePageChange} // Handle page change
				containerClassName={"pagination"}
				activeClassName={"active"}
			/>
		</div>
	);
}

export default Shop;
