import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  Clock,
  Layers,
  Settings,
  Menu,
  UserCircle,
  BookOpen,
  Play,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Rooms", path: "/rooms", icon: Building2 },
  { name: "Instructors", path: "/instructors", icon: Users },
  { name: "Slots", path: "/slots", icon: Clock },
  { name: "Batches", path: "/batches", icon: Layers },
  { name: "Courses", path: "/courses", icon: BookOpen },
  { name: "Solver", path: "/solve", icon: Play },
  { name: "Settings", path: "/settings", icon: Settings },
];

const Sidebar = ({ collapsed, setCollapsed, isMobile }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    if (isMobile) setMobileOpen(false);
  }, [location.pathname, isMobile]);

  // Sidebar toggle handler
  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const sidebarWidth = collapsed ? "w-20" : "w-64";
  const isVisible = !isMobile || mobileOpen;

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 bg-white shadow-md sticky top-0 z-50">
        <button onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${isVisible ? "flex" : "hidden"} ${sidebarWidth} h-screen bg-gradient-to-b from-blue-50 to-blue-100 border-r border-gray-200 shadow-lg fixed top-0 left-0 z-40 flex-col transition-all duration-300`}
      >
        {/* Logo & Collapse Button */}
        <div className="flex items-center justify-between px-4 py-5">
          <h1 className="text-xl font-bold text-blue-800 whitespace-nowrap">
            {collapsed ? "📅" : "📅 SmartScheduler"}
          </h1>
          {!isMobile && (
            <button onClick={toggleSidebar}>
              <Menu size={20} />
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-2 space-y-1 overflow-y-auto custom-scrollbar pb-4">
          {navItems.map(({ name, path, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
                className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 relative ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <Icon size={20} />
                {!collapsed && <span className="text-sm">{name}</span>}
                {isActive && !collapsed && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-tr-md rounded-br-md"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Profile Footer */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <UserCircle size={32} className="text-gray-500" />
            {!collapsed && (
              <div>
                <p className="text-sm font-semibold text-gray-800">Hamza Ali</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
