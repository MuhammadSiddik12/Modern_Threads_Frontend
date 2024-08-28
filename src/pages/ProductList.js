import React from "react";
import ProductCard from "../components/ProductCard";
import "../assets/styles/ProductList.css";
import Categories from "../components/Categories";
import Banner from "../components/Banner";
import banner0 from "../assets/images/banner.png";
import banner1 from "../assets/images/banner1.png";
import banner2 from "../assets/images/banner2.png";

const products = [
	{
		id: 1,
		name: "Men Flared Mid Rise Blue Jeans",
		price: 998,
		image:
			"https://rukminim2.flixcart.com/image/832/832/xif0q/jean/v/w/c/-original-imah3q63wyhyrugq.jpeg?q=70&crop=false",
	},
	{
		id: 2,
		name: "Men Regular Mid Rise Black Jeans",
		price: 1100,
		image:
			"https://rukminim2.flixcart.com/image/832/832/xif0q/jean/b/j/9/-original-imah3q63bb4s2g2x.jpeg?q=70&crop=false",
	},
	{
		id: 3,
		name: "Pack of 2 Solid Men Black, Dark Grey Regular Shorts, Sports Shorts, Beach Shorts",
		price: 299,
		image:
			"https://rukminim2.flixcart.com/image/832/832/ktizdzk0/short/i/e/q/l-pic-2046-indiclub-original-imag6uxwz7egtmrv.jpeg?q=70&crop=false",
	},
	{
		id: 4,
		name: "Men Regular Fit Solid Spread Collar Casual Shirt",
		price: 399,
		image:
			"https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/o/1/e/m-double-pocket-shirt-qlonz-store-original-imahf2hxmrrhs5hm.jpeg?q=70&crop=false",
	},
	{
		id: 5,
		name: "Men Self Design Single Breasted Formal Blazer  (Pink)",
		price: 4989,
		image:
			"https://rukminim2.flixcart.com/image/612/612/xif0q/blazer/f/k/d/40-pibzwnsft67040-peter-england-original-imagxmyqxjcg8dkf.jpeg?q=70",
	},
	{
		id: 6,
		name: "Men Casual Multicolor Genuine Leather Reversible Belt",
		price: 1299,
		image:
			"https://rukminim2.flixcart.com/image/832/832/k6fd47k0/belt/f/y/y/36-munich-th-munichrev0103m-belt-tommy-hilfiger-original-imafzw4jghejqcpc.jpeg?q=70&crop=false",
	},
	{
		id: 7,
		name: "Youth- Digital Watch - For Boys & Girls D228 (W-737H-1A2VDF)",
		price: 1599,
		image:
			"https://rukminim2.flixcart.com/image/832/832/krz97rk0/watch/2/q/z/d228-w-737h-1a2vdf-casio-original-imag5mpk9hhzu2zz.jpeg?q=70&crop=false",
	},
	{
		id: 8,
		name: "Sneaker Casual Shoes For Men | Soft Cushion Insole, Slip-Resistance Sneakers For Men  (Black, Red, Red , 6)",
		price: 1699,
		image:
			"https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/x/e/g/6-rsl002-6-red-tape-black-red-original-imah3t6rnk2kfefq.jpeg?q=70&crop=false",
	},
	{
		id: 9,
		name: "Royal Look Party Wear ll Casual ll Latest Patent Leather Boots for Men Boots For Men  (Multicolor , 6)",
		price: 1764,
		image:
			"https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/b/f/t/art-ca139-10-vellinto-red-original-imafz33qxuwrmffm-bb.jpeg?q=70&crop=false",
	},
];

const products2 = [
	{
		id: 1,
		name: "Men Flared Mid Rise Blue Jeans",
		price: 998,
		image:
			"https://rukminim2.flixcart.com/image/832/832/xif0q/jean/v/w/c/-original-imah3q63wyhyrugq.jpeg?q=70&crop=false",
	},
	{
		id: 2,
		name: "Men Regular Mid Rise Black Jeans",
		price: 1100,
		image:
			"https://rukminim2.flixcart.com/image/832/832/xif0q/jean/b/j/9/-original-imah3q63bb4s2g2x.jpeg?q=70&crop=false",
	},
	{
		id: 3,
		name: "Pack of 2 Solid Men Black, Dark Grey Regular Shorts, Sports Shorts, Beach Shorts",
		price: 299,
		image:
			"https://rukminim2.flixcart.com/image/832/832/ktizdzk0/short/i/e/q/l-pic-2046-indiclub-original-imag6uxwz7egtmrv.jpeg?q=70&crop=false",
	},
	{
		id: 4,
		name: "Men Regular Fit Solid Spread Collar Casual Shirt",
		price: 399,
		image:
			"https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/o/1/e/m-double-pocket-shirt-qlonz-store-original-imahf2hxmrrhs5hm.jpeg?q=70&crop=false",
	},
	{
		id: 5,
		name: "Men Self Design Single Breasted Formal Blazer  (Pink)",
		price: 4989,
		image:
			"https://rukminim2.flixcart.com/image/612/612/xif0q/blazer/f/k/d/40-pibzwnsft67040-peter-england-original-imagxmyqxjcg8dkf.jpeg?q=70",
	},
	{
		id: 6,
		name: "Men Casual Multicolor Genuine Leather Reversible Belt",
		price: 1299,
		image:
			"https://rukminim2.flixcart.com/image/832/832/k6fd47k0/belt/f/y/y/36-munich-th-munichrev0103m-belt-tommy-hilfiger-original-imafzw4jghejqcpc.jpeg?q=70&crop=false",
	},
	{
		id: 7,
		name: "Youth- Digital Watch - For Boys & Girls D228 (W-737H-1A2VDF)",
		price: 1599,
		image:
			"https://rukminim2.flixcart.com/image/832/832/krz97rk0/watch/2/q/z/d228-w-737h-1a2vdf-casio-original-imag5mpk9hhzu2zz.jpeg?q=70&crop=false",
	},
	{
		id: 8,
		name: "Sneaker Casual Shoes For Men | Soft Cushion Insole, Slip-Resistance Sneakers For Men  (Black, Red, Red , 6)",
		price: 1699,
		image:
			"https://rukminim2.flixcart.com/image/416/416/xif0q/shoe/x/e/g/6-rsl002-6-red-tape-black-red-original-imah3t6rnk2kfefq.jpeg?q=70&crop=false",
	},
	{
		id: 9,
		name: "Royal Look Party Wear ll Casual ll Latest Patent Leather Boots for Men Boots For Men  (Multicolor , 6)",
		price: 1764,
		image:
			"https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/b/f/t/art-ca139-10-vellinto-red-original-imafz33qxuwrmffm-bb.jpeg?q=70&crop=false",
	},
];

function ProductList() {
	return (
		<>
			{/* Display the categories component */}
			<Categories />

			{/* Display the first banner */}
			<Banner bannerImg={banner0} />

			{/* Display the first set of products in a grid */}
			<div className="product-grid">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			{/* Display the second banner */}
			<Banner bannerImg={banner2} />

			{/* Display the second set of products in a grid */}
			<div className="product-grid">
				{products2.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			{/* Display the third banner */}
			<Banner bannerImg={banner1} />
		</>
	);
}

export default ProductList;
