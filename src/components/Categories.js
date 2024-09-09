import React, { useEffect, useState } from "react";
import "../assets/styles/Categories.css";
import { getAllCategories, IMAGE_URL } from "../services/ApiService";
import menu from "../assets/images/menu.svg";
import { Link } from "react-router-dom";

const Categories = () => {
	const [categoryList, setCategoryList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const loadCategories = async () => {
			try {
				const response = await getAllCategories();
				const categories = [
					{ category_id: "All", category_name: "All", category_image: menu },
					...response.data,
				];
				setCategoryList(categories);
			} catch {
				setError("Failed to load categories");
			} finally {
				setLoading(false);
			}
		};

		loadCategories();
	}, []);

	if (loading) return <h2>Loading...</h2>;
	if (error) return <div>{error}</div>;

	return (
		<div className="categories-container">
			<div className="categories">
				{categoryList.map((category) => (
					<Link
						key={category.category_id}
						to={`/shopbycategory/${category.category_id}`}
						className="edit-link"
					>
						<div className="category">
							<img
								src={
									category.category_id !== "All"
										? `${IMAGE_URL}${category.category_image}`
										: category.category_image
								}
								alt={category.category_name}
								className="category-image"
							/>
							<span className="category-name">{category.category_name}</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Categories;
