import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Target,
  FileText,
  Timer,
  Wallet,
  Settings,
  Sparkles,
  GraduationCap,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const mainItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Courses", icon: BookOpen, path: "/courses" },
  { name: "Planner", icon: CalendarDays, path: "/planner" },
  { name: "Goals", icon: Target, path: "/goals" },
  { name: "Exams", icon: FileText, path: "/exams" },
  { name: "Focus", icon: Timer, path: "/focus" },
  { name: "Budget", icon: Wallet, path: "/budget" },
];

const secondaryItems = [
  { name: "AI Assistant", icon: Sparkles, path: "/course-ai" },
  { name: "Resources", icon: GraduationCap, path: "/courses" },
  { name: "Messages", icon: MessageSquare, path: "/messages" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

function Sidebar() {
  const [user, setUser] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    loadUser();
  }, []);

  const fullName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Student";

  const department =
    user?.user_metadata?.department ||
    "Software Engineering";

  const initial = fullName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* ================= MOBILE HAMBURGER ================= */}

      <button
        className="mobile-menu-button"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>


      {/* ================= MOBILE OVERLAY ================= */}

      {isMobileOpen && (
        <div
          className="sidebar-mobile-overlay"
          onClick={closeMobileSidebar}
        />
      )}


      {/* ================= SIDEBAR ================= */}

      <aside
        className={`uni-sidebar ${
          isMobileOpen ? "mobile-open" : ""
        }`}
      >

        {/* MOBILE CLOSE */}

        <button
          className="mobile-sidebar-close"
          onClick={closeMobileSidebar}
          aria-label="Close menu"
        >
          <X size={21} />
        </button>


        {/* BRAND */}

        <div className="sidebar-brand">

          <div className="sidebar-brand-icon">
            <GraduationCap size={22} />
          </div>

          <span className="sidebar-brand-text">
            UniMate
          </span>

        </div>


        {/* NAVIGATION */}

        <div className="sidebar-section">

          <span className="sidebar-section-title">
            STUDENT SPACE
          </span>

          <span className="sidebar-menu-title">
            MAIN MENU
          </span>

          <nav className="sidebar-nav">

            {mainItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={closeMobileSidebar}
                  className={({ isActive }) =>
                    `sidebar-link ${
                      isActive ? "active" : ""
                    }`
                  }
                >
                  <Icon
                    size={19}
                    strokeWidth={1.9}
                  />

                  <span>{item.name}</span>
                </NavLink>
              );
            })}

          </nav>

        </div>


        {/* SECONDARY */}

        <div className="sidebar-secondary">

          {secondaryItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMobileSidebar}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <Icon
                  size={19}
                  strokeWidth={1.9}
                />

                <span>{item.name}</span>
              </NavLink>
            );
          })}

        </div>


        {/* USER */}

        <div className="sidebar-bottom">

          <div className="sidebar-user">

            <div className="sidebar-avatar">
              {initial}
            </div>

            <div className="sidebar-user-info">
              <strong>{fullName}</strong>
              <span>{department}</span>
            </div>

          </div>

          <button
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            <span>Logout</span>
          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;