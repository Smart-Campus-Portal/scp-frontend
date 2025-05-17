import React from 'react';
import '../../styles/admin/footer.css'; // Updated path

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Admin Panel. Developed with ❤️ by YourName.</p>
        <div className="footer-links">
          <a href="/help-center" className="footer-link">Help Center</a>
          <a href="/terms" className="footer-link">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
