import { useState } from "react";
import { Link } from "react-router-dom";
import { Beef, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="shadow-md bg-white relative">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/doner-crm-icon.png"
            alt="DönerCRM Logo"
            className="text-red-600 size-8"
          />

          <span className="font-bold text-xl text-gray-800">DönerCRM</span>
        </Link>

        <nav className="hidden md:flex">
          <ul className="flex gap-8 text-gray-800">
            <li>
              <a
                href="#"
                className="text-md font-semibold hover:text-red-600 transition-colors"
              >
                Destek
              </a>
            </li>

            <li>
              <a
                href="#"
                className="text-md font-semibold hover:text-red-600 transition-colors"
              >
                İletişim
              </a>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/signin"
            className="border border-red-600 px-4 py-1.5 text-gray-800 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out shadow-sm"
          >
            Giriş Yap
          </Link>
          <Link
            to="/signup"
            className="border border-red-600 px-4 py-1.5 rounded-lg font-medium bg-red-500 text-white hover:bg-white hover:text-gray-800 transition-all duration-300 ease-in-out shadow-sm"
          >
            Kayıt Ol
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {isMenuOpen ? (
              <X className="text-gray-800 size-8" />
            ) : (
              <Menu className="text-gray-800 size-8" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
          <ul className="flex flex-col items-center gap-4 p-6">
            <li>
              <Link
                to="#support"
                className="text-lg font-semibold hover:text-red-600"
                onClick={toggleMenu}
              >
                Destek
              </Link>
            </li>
            <li>
              <Link
                to="#contact"
                className="text-lg font-semibold hover:text-red-600"
                onClick={toggleMenu}
              >
                İletişim
              </Link>
            </li>

            <li className="w-full pt-4">
              <Link
                to="/signin"
                className="block w-full text-center border border-red-600 px-4 py-2 text-gray-800 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-all duration-300"
                onClick={toggleMenu}
              >
                Giriş Yap
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/signup"
                className="block w-full text-center border border-red-600 px-4 py-2 rounded-lg font-medium bg-red-500 text-white hover:bg-white hover:text-gray-800 transition-all"
                onClick={toggleMenu}
              >
                Kayıt Ol
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
