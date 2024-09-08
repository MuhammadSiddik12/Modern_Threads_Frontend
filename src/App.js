// App.js
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

function App() {
	return (
		<AuthProvider>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<ProductList />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/shopbycategory/:categoryId" element={<Shop />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/category" element={<Categories />} />
					<Route
						path="/profile"
						element={
							<PrivateRoute>
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
								<Cart />
							</PrivateRoute>
						}
					/>
					<Route
						path="/orders"
						element={
							<PrivateRoute>
								<Orders />
							</PrivateRoute>
						}
					/>
					<Route
						path="/orders/orderDetails/:orderId"
						element={
							<PrivateRoute>
								<OrderDetails />
							</PrivateRoute>
						}
					/>
					<Route
						path="/editProfile"
						element={
							<PrivateRoute>
								<EditProfile />
							</PrivateRoute>
						}
					/>

					<Route
						path="/payments"
						element={
							<PrivateRoute>
								<Payment />
							</PrivateRoute>
						}
					/>
					<Route
						path="/payments/:paymentId"
						element={
							<PrivateRoute>
								<PaymentDetails />
							</PrivateRoute>
						}
					/>
				</Routes>
				<Footer />
				<ToastContainer />
			</Router>{" "}
		</AuthProvider>
	);
}

export default App;
