import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Building,
  Users,
  UserCircle,
  LogOut,
  Folder,
  Beaker,
  ClipboardList,
  ShoppingCart,
  History,
} from "lucide-react";

const menuItems = [
  { name: "POS", path: "/dashboard/pos", icon: ShoppingCart },
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Ürünler", path: "/dashboard/products", icon: Package },
  { name: "Malzemeler", path: "/dashboard/ingredients", icon: Beaker },
  { name: "Birimler", path: "/dashboard/units", icon: ClipboardList },
  { name: "Kategoriler", path: "/dashboard/categories", icon: Folder },
  { name: "Şubeler", path: "/dashboard/branches", icon: Building },
  { name: "Satışlar", path: "/dashboard/sales", icon: History },
  { name: "Kullanıcılar", path: "/dashboard/users", icon: Users },
  { name: "Hesabım", path: "/dashboard/my-account", icon: UserCircle },
];

const Sidebar = ({ isSidebarOpen, closeSidebar, handleLogout }) => {
  return (
    <aside
      className={`
            bg-gray-800 text-white 
            fixed inset-y-0 left-0 z-50 w-64 flex flex-col
            transform transition-transform duration-300 ease-in-out
            lg:relative lg:translate-x-0
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
    >
      <div className="p-4 border-b border-gray-700">
        <Link to="/dashboard" className="flex items-center gap-2 text-white">
          <img
            src="/doner-crm-icon.png"
            alt="DönerCRM Logo"
            className="size-8"
          />

          <span className="text-xl font-bold">
            Döner<span className="text-red-400">CRM</span>
          </span>
        </Link>
      </div>

      <nav className="flex-grow p-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                end
                onClick={closeSidebar}
                className={({ isActive }) => `
                                    flex items-center p-2 rounded-lg transition-colors
                                    hover:bg-gray-700
                                    ${isActive ? "bg-red-600" : ""}
                                `}
              >
                <item.icon className="mr-3 size-5" />

                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-2 rounded-lg transition-colors text-red-400 hover:bg-red-800 hover:text-white"
        >
          <LogOut className="mr-3 size-5" />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
