import React, { useEffect, useState } from "react"; // Import React and hooks
import "../assets/styles/Categories.css"; // Import CSS for styling
import { getAllCategories, IMAGE_URL } from "../services/ApiService"; // Import API service functions and constants
import menu from "../assets/images/menu.svg"; // Import image for 'All' category
import { Link } from "react-router-dom"; // Import Link for routing

const Categories = () => {
	const [categoryList, setCategoryList] = useState([]); // State to store categories
	const [loading, setLoading] = useState(true); // State to manage loading status
	const [error, setError] = useState(null); // State to manage error messages

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const response = await getAllCategories(); // Fetch categories from API
				// Add 'All' category at the beginning of the list
				const categories = [
					{ category_id: "All", category_name: "All", category_image: menu },
					...response.data,
				];
				setCategoryList(categories); // Update state with categories
			} catch {
				setError("Failed to load categories"); // Set error if API call fails
			} finally {
				setLoading(false); // Set loading to false after API call
			}
		};

		loadCategories(); // Call function to load categories
	}, []); // Empty dependency array means this runs once on component mount

	if (loading) return <h2>Loading...</h2>; // Show loading message while fetching data
	if (error) return <div>{error}</div>; // Show error message if API call fails

	return (
		<div className="categories-container">
			<div className="categories">
				{categoryList.map((category) => (
					<Link
						key={category.category_id}
						to={`/shopbycategory/${category.category_id}`} // Navigate to category page
						className="edit-link"
					>
						<div className="category">
							<img
								src={
									category.category_id !== "All"
										? `${IMAGE_URL}${category.category_image}` // Add base URL if not 'All' category
										: category.category_image // Use local image for 'All' category
								}
								alt={category.category_name} // Alt text for accessibility
								className="category-image" // Apply styling
							/>
							<span className="category-name">{category.category_name}</span>{" "}
							{/* Display category name */}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Categories; // Export the Categories component
