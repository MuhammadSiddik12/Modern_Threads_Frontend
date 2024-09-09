import React from "react"; // Import React
import "../assets/styles/Footer.css"; // Import CSS for footer styling
import footerLogo from "../assets/images/footer_logo.svg"; // Import footer logo image

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-content">
				{/* About Section */}
				<div className="footer-section about">
					<img
						src={footerLogo}
						alt="Modern Threads Logo" // Alt text for accessibility
						className="footer-logo" // Apply styling
						style={{ height: "140px" }} // Inline styling for height
					/>
					<h2>Modern Threads</h2>
					<p>
						Modern Threads is a leading online retailer, your go-to destination
						for premium men's fashion. We are passionate about providing the
						latest trends and classic styles tailored to meet the needs of the
						modern man.
					</p>
				</div>

				{/* Quick Links Section */}
				<div className="footer-section links">
					<h3>Quick Links</h3>
					<ul>
						<li>
							<a href="/about">About Us</a> {/* Link to About Us page */}
						</li>
						<li>
							<a href="/privacy">Privacy Policy</a>{" "}
							{/* Link to Privacy Policy page */}
						</li>
						<li>
							<a href="/terms">Terms & Conditions</a>{" "}
							{/* Link to Terms & Conditions page */}
						</li>
					</ul>
				</div>

				{/* Contact Information Section */}
				<div className="footer-section contact">
					<h3>Contact Us</h3>
					<p>
						<i className="fas fa-map-marker-alt"></i> Sector 62, Noida, UP -
						201309
					</p>
					<p>
						<i className="fas fa-phone"></i> +919811073783
					</p>
					<p>
						<i className="fas fa-envelope"></i> support@modernthreads.com
					</p>
				</div>

				{/* Social Media Section */}
				<div className="footer-section social">
					<h3>Follow Us</h3>
					<p>
						Stay connected with us on social media for the latest updates,
						fashion tips, and exclusive deals!
					</p>
					<div className="social-icons">
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

				{/* Newsletter Section */}
				<div className="footer-section newsletter">
					<h3>Newsletter</h3>
					<p>
						Subscribe to our newsletter for the latest updates on fashion
						trends.
					</p>
					<form className="newsletter-form">
						<input type="email" placeholder="Enter your email" required />{" "}
						{/* Input for email */}
						<button type="submit">Subscribe</button> {/* Subscribe button */}
					</form>
				</div>
			</div>

			{/* Footer Bottom */}
			<div className="footer-bottom">
				<p>© 2024 Modern Threads. All rights reserved.</p>{" "}
				{/* Footer copyright */}
			</div>
		</footer>
	);
};

export default Footer; // Export the Footer component
