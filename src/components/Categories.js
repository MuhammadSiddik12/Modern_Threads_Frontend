import React from "react";
import "../assets/styles/Categories.css"; // Import the CSS styles

// Import images for each category
import jeans from "../assets/images/jeans.png";
import shorts from "../assets/images/man-shorts.png";
import menu from "../assets/images/menu.svg";
import shirt from "../assets/images/shirt.png";
import tshirt from "../assets/images/t-shirt.png";
import black from "../assets/images/black-suit.png";
import blazer from "../assets/images/men-s-blazer.png";
import belt from "../assets/images/belt.png";
import watch from "../assets/images/watch.png";
import shoes from "../assets/images/sports-shoes.png";
import shoe from "../assets/images/mens-shoe.png";
import sunglassess from "../assets/images/sunglassess.png";

// Sample data with images for each category
const categories = [
	{ name: "All", image: menu },
	{ name: "T-shirts", image: tshirt },
	{ name: "Jeans", image: jeans },
	{ name: "Shorts", image: shorts },
	{ name: "Shirt", image: shirt },
	{ name: "Blazers", image: blazer },
	{ name: "Belts", image: belt },
	{ name: "Watches", image: watch },
	{ name: "Sneakers", image: shoes },
	{ name: "Boots", image: shoe },
	{ name: "Suits", image: black },
	{ name: "Sunglasses", image: sunglassess },
];

const Categories = () => {
	return (
		<div className="categories-container">
			{" "}
			{/* Container for categories */}
			<div className="categories">
				{" "}
				{/* Flex container for category items */}
				{categories.map((category, index) => (
					<div key={index} className="category">
						{" "}
						{/* Individual category item */}
						<img
							src={category.image}
							alt={category.name} // Alt text for the image
							className="category-image" // Styling for the category image
						/>
						<span className="category-name">{category.name}</span>{" "}
						{/* Category name */}
					</div>
				))}
			</div>
		</div>
	);
};

export default Categories; // Export the Categories component
