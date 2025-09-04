import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isAppView = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      setCurrentUser(null);
    }
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");

    setCurrentUser(null);

    toggleMenu();

    navigate("/signin");
  };

  return (
    <header className="shadow-md bg-white sticky top-0">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/doner-crm-icon.png"
            alt="DönerCRM Logo"
            className="text-red-600 size-8"
          />

          <span className="font-bold text-xl text-gray-800">DönerCRM</span>
        </Link>

        {!isAppView && (
          <nav className="hidden md:flex">
            <ul className="flex gap-8 text-gray-800">
              <li>
                <a
                  href="#support"
                  className="text-md font-semibold hover:text-red-600 transition-colors"
                >
                  Destek
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="text-md font-semibold hover:text-red-600 transition-colors"
                >
                  İletişim
                </a>
              </li>
            </ul>
          </nav>
        )}

        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <>
              {isAppView ? (
                <button
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-red-600 transition-all duration-300"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  Çıkış Yap
                </button>
              ) : (
                <>
                  <span className="font-semibold text-gray-700">
                    Merhaba, {currentUser.user_name}
                  </span>

                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 border border-gray-300 px-4 py-1.5 text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="border border-red-600 px-4 py-1.5 text-gray-800 rounded-lg font-medium hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Giriş Yap
              </Link>

              <Link
                to="/signup"
                className="border border-red-600 px-4 py-1.5 rounded-lg font-medium bg-red-500 text-white hover:bg-white hover:text-gray-800 transition-all"
              >
                Kayıt Ol
              </Link>
            </>
          )}
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
            {currentUser ? (
              <>
                {isAppView && (
                  <>
                    <li className="w-full">
                      <Link
                        to="/dashboard"
                        className="block w-full text-center text-lg font-semibold"
                        onClick={toggleMenu}
                      >
                        Dashboard
                      </Link>
                    </li>
                  </>
                )}

                <li className="w-full pt-4">
                  <button
                    onClick={handleLogout}
                    className="w-full text-center bg-red-500 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Çıkış Yap
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="#support"
                    className="text-md font-semibold hover:text-red-600 transition-colors"
                    onClick={toggleMenu}
                  >
                    Destek
                  </a>
                </li>

                <li>
                  <a
                    href="#contact"
                    className="text-md font-semibold hover:text-red-600 transition-colors"
                    onClick={toggleMenu}
                  >
                    İletişim
                  </a>
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
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
