import React from "react";
import "../assets/styles/Cart.css";
import { Link } from "react-router-dom";

const CartPage = () => {
	// Sample cart data
	const cartItems = [
		{
			id: 1,
			name: "Wireless Earbuds",
			price: 2999,
			quantity: 2,
			imageUrl:
				"https://www.gonoise.com/cdn/shop/files/3_copy_e16721a2-098d-49ff-a72f-580f05a928cb.webp?v=1720443494",
		},
		{
			id: 2,
			name: "Smartphone",
			price: 19999,
			quantity: 1,
			imageUrl:
				"https://oasis.opstatics.com/content/dam/oasis/page/2023/in/oneplus-10t/specs/10r-blue.png",
		},
		{
			id: 3,
			name: "Laptop",
			price: 49999,
			quantity: 1,
			imageUrl:
				"https://static-ecapac.acer.com/media/catalog/product/1/_/1_75_nx.ks7si.001.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=500&width=500&canvas=500:500",
		},
		{
			id: 1,
			name: "Wireless Earbuds",
			price: 2999,
			quantity: 2,
			imageUrl:
				"https://www.gonoise.com/cdn/shop/files/3_copy_e16721a2-098d-49ff-a72f-580f05a928cb.webp?v=1720443494",
		},
		{
			id: 2,
			name: "Smartphone",
			price: 19999,
			quantity: 1,
			imageUrl:
				"https://oasis.opstatics.com/content/dam/oasis/page/2023/in/oneplus-10t/specs/10r-blue.png",
		},
		{
			id: 3,
			name: "Laptop",
			price: 49999,
			quantity: 1,
			imageUrl:
				"https://static-ecapac.acer.com/media/catalog/product/1/_/1_75_nx.ks7si.001.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=500&width=500&canvas=500:500",
		},
	];

	const getTotalPrice = () => {
		return cartItems.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
	};

	const handleRemoveItem = (id) => {
		// Logic to remove item from cart
		console.log(`Removing item with id: ${id}`);
	};

	const handleCheckout = () => {
		// Logic to proceed to checkout
		console.log("Proceeding to checkout");
	};

	return (
		<div className="cart-page">
			<h2>Your Cart</h2>
			<div className="cart-content">
				<div className="cart-items">
					{cartItems.map((item) => (
						<div key={item.id} className="cart-item">
							<Link
								to={`/product/productDetails/${item.id}`}
								className="cart-item-link"
							>
								<img
									src={item.imageUrl}
									alt={item.name}
									className="cart-item-image"
								/>
							</Link>
							<div className="cart-item-details">
								<Link
									to={`/product/productDetails/${item.id}`}
									className="cart-item-link"
								>
									<h3>{item.name}</h3>
									<p>Price: ₹{item.price}</p>
									<p>Quantity: {item.quantity}</p>
								</Link>
								<button
									className="remove-button"
									onClick={() => handleRemoveItem(item.id)}
								>
									Remove
								</button>
							</div>
						</div>
					))}
				</div>
				<div className="cart-summary">
					<h3>Order Summary</h3>
					<p>Total Price: ₹{getTotalPrice()}</p>
					<button className="checkout-button" onClick={handleCheckout}>
						Proceed to Checkout
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
