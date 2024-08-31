// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Shop from "./pages/Shop.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import PrivateRoute from "./services/PrivateRoute";
import ProfilePage from "./pages/Profile.js";
import { AuthProvider } from "./services/AuthContext.js";
import CartPage from "./pages/Cart.js";
import ProductDetails from "./pages/ProductDetails.js";
import MyOrders from "./pages/MyOrder.js";
import OrderDetails from "./pages/OrderDetails.js";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<ProductList />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route
						path="/profile"
						element={
							<PrivateRoute>
								<ProfilePage />
							</PrivateRoute>
						}
					/>
					<Route path="/cart" element={<CartPage />} />
					<Route
						path="/product/productDetails/:productId"
						element={<ProductDetails />}
					/>
					<Route path="/orders" element={<MyOrders />} />
					<Route
						path="/orders/orderDetails/:orderId"
						element={<OrderDetails />}
					/>
				</Routes>
				<Footer />
			</Router>{" "}
		</AuthProvider>
	);
}

export default App;
