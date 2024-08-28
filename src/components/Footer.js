import React from "react";
import "../assets/styles/Footer.css"; // Import CSS styles
import footer_logo from "../assets/images/footer_logo.svg"; // Import footer logo image

const Footer = () => {
	return (
		<footer className="footer">
			{" "}
			{/* Main footer container */}
			<div className="footer-content">
				{" "}
				{/* Container for footer sections */}
				<div className="footer-section about">
					{" "}
					{/* About section */}
					<img
						src={footer_logo}
						alt="Modern Threads Logo" // Alt text for the logo
						className="footer-logo"
						style={{ height: "140px" }} // Inline style for logo height
					/>
					<h2>Modern Threads</h2> {/* Footer heading */}
					<p>
						Modern Threads is a leading online retailer, offering the latest in
						fashion trends. We believe in quality, affordability, and customer
						satisfaction.
					</p>
				</div>
				<div className="footer-section links">
					{" "}
					{/* Quick links section */}
					<h3>Quick Links</h3> {/* Section heading */}
					<ul>
						{" "}
						{/* List of quick links */}
						<li>
							<a href="/about">About Us</a> {/* Link to About Us page */}
						</li>
						<li>
							<a href="/contact">Contact Us</a> {/* Link to Contact Us page */}
						</li>
						<li>
							<a href="/privacy">Privacy Policy</a>{" "}
							{/* Link to Privacy Policy */}
						</li>
						<li>
							<a href="/terms">Terms & Conditions</a>{" "}
							{/* Link to Terms & Conditions */}
						</li>
					</ul>
				</div>
				<div className="footer-section contact">
					{" "}
					{/* Contact information section */}
					<h3>Contact Us</h3> {/* Section heading */}
					<p>
						<i className="fas fa-map-marker-alt"></i> 123 Fashion Ave, New York,
						NY {/* Address with icon */}
					</p>
					<p>
						<i className="fas fa-phone"></i> +1 (123) 456-7890{" "}
						{/* Phone number with icon */}
					</p>
					<p>
						<i className="fas fa-envelope"></i> support@modernthreads.com{" "}
						{/* Email address with icon */}
					</p>
				</div>
				<div className="footer-section social">
					{" "}
					{/* Social media links section */}
					<h3>Follow Us</h3> {/* Section heading */}
					<p>
						Stay connected with us on social media for the latest updates,
						fashion tips, and exclusive deals!
					</p>
					<div className="social-icons">
						{" "}
						{/* Container for social media icons */}
						<a
							href="https://facebook.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-facebook-f"></i> Facebook{" "}
							{/* Facebook link */}
						</a>
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-instagram"></i> Instagram{" "}
							{/* Instagram link */}
						</a>
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-linkedin"></i> LinkedIn {/* LinkedIn link */}
						</a>
						<a
							href="https://youtube.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-youtube"></i> YouTube {/* YouTube link */}
						</a>
					</div>
					<p>
						Join our community and get fashion inspiration delivered straight to
						your feed!
					</p>
				</div>
				<div className="footer-section newsletter">
					{" "}
					{/* Newsletter subscription section */}
					<h3>Newsletter</h3> {/* Section heading */}
					<p>
						Subscribe to our newsletter for the latest updates on fashion
						trends.
					</p>
					<form className="newsletter-form">
						{" "}
						{/* Newsletter form */}
						<input type="email" placeholder="Enter your email" required />{" "}
						{/* Email input */}
						<button type="submit">Subscribe</button> {/* Submit button */}
					</form>
				</div>
			</div>
			<div className="footer-bottom">
				{" "}
				{/* Footer bottom section */}
				<p>© 2024 Modern Threads. All rights reserved.</p>{" "}
				{/* Copyright notice */}
			</div>
		</footer>
	);
};

export default Footer; // Export the Footer component
