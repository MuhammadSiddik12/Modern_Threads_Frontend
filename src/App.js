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
import EditProfile from "./pages/EditProfile.js";
import Categories from "./components/Categories.js";
import { ToastContainer } from "react-toastify";

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
				</Routes>
				<Footer />
				<ToastContainer />
			</Router>{" "}
		</AuthProvider>
	);
}

export default App;
