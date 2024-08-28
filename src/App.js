// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Shop from "./pages/Shop.js";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<ProductList />} />
				<Route path="/shop" element={<Shop />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
