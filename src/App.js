import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./services/PrivateRoute";
import { AuthProvider } from "./services/AuthContext.js";
import { ToastContainer } from "react-toastify";
import ProductList from "./pages/Products/ProductList.js";
import ProductDetails from "./pages/Products/ProductDetails.js";
import Shop from "./pages/Products/Shop.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/User/Login.js";
import Signup from "./pages/User/Signup.js";
import Profile from "./pages/User/Profile.js";
import Cart from "./pages/Products/Cart.js";
import Orders from "./pages/Orders/Order.js";
import OrderDetails from "./pages/Orders/OrderDetails.js";
import EditProfile from "./pages/User/EditProfile.js";
import Categories from "./components/Categories.js";
import Payment from "./pages/Payments/Payments.js";
import PaymentDetails from "./pages/Payments/PaymentDetails.js";
import AboutUs from "./components/AboutUs.js";
import PrivacyPolicy from "./components/PrivacyPolicy.js";
import TermsAndConditions from "./components/TermsAndConditions.js";

function App() {
	return (
		<AuthProvider>
			{/* Provides authentication context */}
			<Router>
				{/* Router for handling routes */}
				<Header /> {/* Header component */}
				<Routes>
					{/* Define routes */}
					<Route path="/" element={<ProductList />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/shopbycategory/:categoryId" element={<Shop />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/category" element={<Categories />} />
					<Route path="/about" element={<AboutUs />} />
					<Route path="/privacy" element={<PrivacyPolicy />} />
					<Route path="/terms" element={<TermsAndConditions />} />
					<Route
						path="/profile"
						element={
							<PrivateRoute>
								{/* Protects the Profile route */}
								<Profile />
							</PrivateRoute>
						}
					/>
					<Route
						path="/product/productDetails/:productId"
						element={<ProductDetails />}
					/>
					<Route
						path="/cart"
						element={
							<PrivateRoute>
								{/* Protects the Cart route */}
								<Cart />
							</PrivateRoute>
						}
					/>
					<Route
						path="/orders"
						element={
							<PrivateRoute>
								{/* Protects the Orders route */}
								<Orders />
							</PrivateRoute>
						}
					/>
					<Route
						path="/orders/orderDetails/:orderId"
						element={
							<PrivateRoute>
								{/* Protects the OrderDetails route */}
								<OrderDetails />
							</PrivateRoute>
						}
					/>
					<Route
						path="/editProfile"
						element={
							<PrivateRoute>
								{/* Protects the EditProfile route */}
								<EditProfile />
							</PrivateRoute>
						}
					/>
					<Route
						path="/payments"
						element={
							<PrivateRoute>
								{/* Protects the Payments route */}
								<Payment />
							</PrivateRoute>
						}
					/>
					<Route
						path="/payments/:paymentId"
						element={
							<PrivateRoute>
								{/* Protects the PaymentDetails route */}
								<PaymentDetails />
							</PrivateRoute>
						}
					/>
				</Routes>
				<Footer /> {/* Footer component */}
				<ToastContainer /> {/* Container for toast notifications */}
			</Router>
		</AuthProvider>
	);
}

export default App;
