// frontend/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Blog Name/Branding */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Blog Application</h2>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Blog Application. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;