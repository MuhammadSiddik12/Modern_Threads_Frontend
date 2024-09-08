// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./pages/Products/ProductList.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Shop from "./pages/Products/Shop.js";
import Login from "./pages/User/Login.js";
import Signup from "./pages/User/Signup.js";
import PrivateRoute from "./services/PrivateRoute";
import ProfilePage from "./pages/User/Profile.js";
import { AuthProvider } from "./services/AuthContext.js";
import CartPage from "./pages/Products/Cart.js";
import ProductDetails from "./pages/Products/ProductDetails.js";
import MyOrders from "./pages/Orders/MyOrder.js";
import OrderDetails from "./pages/Orders/OrderDetails.js";
import EditProfile from "./pages/User/EditProfile.js";
import Categories from "./components/Categories.js";
import { ToastContainer } from "react-toastify";
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
								<ProfilePage />
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
								<CartPage />
							</PrivateRoute>
						}
					/>
					<Route
						path="/orders"
						element={
							<PrivateRoute>
								<MyOrders />
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
						path="/payments/:transactionId"
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
