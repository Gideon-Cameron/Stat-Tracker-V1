import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a192f] border-t border-[#233554] py-6 mt-12">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#8892b0]">
        
        {/* Left Section: Links */}
        <nav className="flex flex-wrap justify-center gap-6">
          <Link
            to="/terms"
            className="hover:text-[#64ffda] transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to="/privacy"
            className="hover:text-[#64ffda] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/refunds"
            className="hover:text-[#64ffda] transition-colors"
          >
            Refund Policy
          </Link>
        </nav>

        {/* Right Section: Contact + Copyright */}
        <div className="text-center md:text-right space-y-1">
          <p>
            Contact:{" "}
            <a
              href="mailto:stat.trackersuppo@gmail.com"
              className="text-[#64ffda] hover:underline"
            >
              stat.trackersuppo@gmail.com
            </a>
          </p>
          <p className="text-gray-500">
            © {currentYear} Stat Tracker · Gideon Cameron Germond
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
