import React from "react";
import "../assets/styles/Footer.css";
import footerLogo from "../assets/images/footer_logo.svg";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-content">
				<div className="footer-section about">
					<img
						src={footerLogo}
						alt="Modern Threads Logo"
						className="footer-logo"
						style={{ height: "140px" }}
					/>
					<h2>Modern Threads</h2>
					<p>
						Modern Threads is a leading online retailer, your go-to destination
						for premium men's fashion. We are passionate about providing the
						latest trends and classic styles tailored to meet the needs of the
						modern man.
					</p>
				</div>
				<div className="footer-section links">
					<h3>Quick Links</h3>
					<ul>
						<li>
							<a href="/about">About Us</a>
						</li>
						<li>
							<a href="/contact">Contact Us</a>
						</li>
						<li>
							<a href="/privacy">Privacy Policy</a>
						</li>
						<li>
							<a href="/terms">Terms & Conditions</a>
						</li>
					</ul>
				</div>
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
							<i className="fab fa-facebook-f"></i> Facebook
						</a>
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-instagram"></i> Instagram
						</a>
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-linkedin"></i> LinkedIn
						</a>
						<a
							href="https://youtube.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<i className="fab fa-youtube"></i> YouTube
						</a>
					</div>
					<p>
						Join our community and get fashion inspiration delivered straight to
						your feed!
					</p>
				</div>
				<div className="footer-section newsletter">
					<h3>Newsletter</h3>
					<p>
						Subscribe to our newsletter for the latest updates on fashion
						trends.
					</p>
					<form className="newsletter-form">
						<input type="email" placeholder="Enter your email" required />
						<button type="submit">Subscribe</button>
					</form>
				</div>
			</div>
			<div className="footer-bottom">
				<p>© 2024 Modern Threads. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
