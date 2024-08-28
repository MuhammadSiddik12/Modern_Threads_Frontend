// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList.js";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<ProductList />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
