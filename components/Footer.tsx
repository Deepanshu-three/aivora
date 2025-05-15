import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 px-6 py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Book Appointment */}
        <div>
          <h3 className="text-xl font-semibold text-[#0C6170]">Book Appointment</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/appointment" className="hover:underline">Book appointment online</Link>
            </li>
          </ul>
        </div>

        {/* Online Consultation */}
        <div>
          <h3 className="text-xl font-semibold text-[#0C6170]">Online Consultation</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/appointment" className="hover:underline">Consult Now</Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:underline">FAQs</Link>
            </li>
          </ul>
        </div>

        {/* Instant Call Back */}
        <div>
          <h3 className="text-xl font-semibold text-[#0C6170]">Instant Call Back</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/contact" className="hover:underline">Request a Call</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-[#0C6170]">Contact Us</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-2"><FaPhoneAlt /> +91 94688 11004</li>
            <li className="flex items-center gap-2"><MdEmail /> upasnahomeo@gmail.com</li>
            <li className="flex items-center gap-2"><IoLocationSharp /> Bihari Ganj, Ajmer, Rajasthan 305001
            </li>
          </ul>
        </div>
      </div>

      {/* Social and Quick Links */}
      <div className="max-w-7xl mx-auto mt-12 border-t border-gray-200 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Follow Us */}
        <div>
          <h3 className="text-xl font-semibold text-[#0C6170]">Follow Us</h3>
          <div className="flex items-center mt-4 space-x-4 text-xl text-[#0C6170]">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-[#0C6170]">Quick Links</h3>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <li><Link href="/policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/termsAndCondition" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link href="/cancillationAndRefund" className="hover:underline">Cancellation Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="max-w-7xl mx-auto mt-12 text-center text-sm text-gray-500">
        <p>&copy; 2025 <span className="text-[#0C6170] font-medium">Upasana Homoeo</span>. All rights reserved.</p>
        <p className="mt-2">Developed with ❤️ by Upasana Homoeo Team</p>
      </div>
    </footer>
  );
}
