import React from "react";
import "../assets/styles/Header.css";
import cart from "../assets/images/shopping-cart.png";
import user from "../assets/images/user.png";
import header_logo from "../assets/images/header_logo.svg";

const Header = () => {
	return (
		<header className="header">
			<img
				src={header_logo}
				alt="logo"
				style={{ width: "270px", height: "auto" }}
			/>
			<nav className="header-nav">
				<a href="/">Home</a>
				<a href="/shop">Shop</a>
				<a href="/deals">Deals</a>
				<a href="/contact">Contact Us</a>
			</nav>
			<div className="header-search">
				<input type="text" placeholder="Search for products, brands and more" />
				<button>Search</button>
			</div>
			<div className="header-icons">
				<div className="icon-container">
					<img src={cart} alt="Cart" />
					<a className="icon" href="" title="Cart">
						Cart
					</a>
				</div>
				<div className="icon-container">
					<img src={user} alt="User Profile" />
					<a className="icon" href="" title="Login">
						Login
					</a>
				</div>
			</div>
		</header>
	);
};

export default Header;
