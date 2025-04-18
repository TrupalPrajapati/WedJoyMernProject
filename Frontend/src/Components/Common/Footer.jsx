import React from "react";
import { FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaTwitter, FaWhatsapp } from "react-icons/fa";
import "../Styles/footer.css"

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Company Info */}
        <div className="footer-section">
          <h2 className="footer-title">WedJoy</h2>
          <p className="footer-text">
          WedJoy is your all-in-one platform to connect with local communities, explore nearby events, discover businesses, and engage in meaningful activities right at your doorstep.
          </p>
        </div>

        {/* Usefull Links */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/evets">Events</a></li>
            <li><a href="/businesses">Businesses</a></li>
            <li><a href="/news">Community Feed</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Contact</h3>
          <ul className="footer-links">
            <p><FaMapMarkerAlt className="icon" /> Ahmedabad, Gujarat, India</p>
            <p><FaPhoneAlt className="icon" /> +91 98765 43210</p>
            <p><FaEnvelope className="icon" /> support@wedjoy.com</p>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Follow Us</h3>
          <div className="footer-socials">
            <a href="#" className="social-icon"><FaFacebookF /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaWhatsapp /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-copyright">
        <p>© {new Date().getFullYear()} WedJoy. All Rights Reserved.</p>
      </div>
    </footer>
  );
};