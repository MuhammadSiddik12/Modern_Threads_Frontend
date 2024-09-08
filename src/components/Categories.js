import React, { useEffect, useState } from "react";
import "../assets/styles/Categories.css"; // Import the CSS styles
import { getAllCategories, IMAGE_URL } from "../services/ApiService"; // Import the API service
import menu from "../assets/images/menu.svg";
import { Link } from "react-router-dom";

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const data = await getAllCategories();
				data.data.unshift({
					category_id: "All",
					category_name: "All",
					category_image: menu,
				});
				setCategories(data.data); // Set the fetched categories
			} catch (err) {
				setError("Failed to load categories");
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
		<div className="categories-container">
			{/* Container for categories */}
			<div className="categories">
				{/* Flex container for category items */}
				{categories.map((category, index) => (
					<Link
						to={`/shopbycategory/${category.category_id}`}
						className="edit-link"
					>
						<div key={index} className="category">
							{/* Individual category item */}
							<img
								src={
									index != 0
										? category.category_image
											? `${IMAGE_URL}${category.category_image}`
											: ""
										: category.category_image
								}
								alt={category.category_name} // Alt text for the image
								className="category-image" // Styling for the category image
							/>
							<span className="category-name">{category.category_name}</span>{" "}
							{/* Category name */}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Categories; // Export the Categories component
