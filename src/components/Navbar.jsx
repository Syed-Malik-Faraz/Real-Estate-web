import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const settingsRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-white/90 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-4">
          <img
            src="/resources/logo.png"
            alt="PropertyVision"
            className="h-8 sm:h-10"
          />
          <h1
            className="text-lg sm:text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            PropertyVision
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-4 sm:gap-6">
          <button className="text-base sm:text-lg" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="text-base sm:text-lg" onClick={() => navigate("/properties")}>
            Properties
          </button>
          <button className="text-base sm:text-lg" onClick={() => navigate("/finances")}>
            Finances
          </button>
          <button className="text-base sm:text-lg" onClick={() => navigate("/tenants")}>
            Tenants
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-md border hover:bg-gray-100"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative ml-2" ref={dropdownRef}>
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-700 rounded-full flex items-center justify-center text-white cursor-pointer select-none text-sm sm:text-base"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            SS
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg py-2 z-50">
              <p className="px-4 py-2 text-sm text-gray-700 font-medium">
                ss@example.com
              </p>
              <hr />

              <div className="relative" ref={settingsRef}>
                <button
                  onClick={() => setSettingsOpen((prev) => !prev)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded flex justify-between items-center"
                >
                  Settings
                  <span className="ml-2">{settingsOpen ? "▲" : "▼"}</span>
                </button>

                {settingsOpen && (
                  <div className="absolute right-full top-0 mr-2 w-56 bg-white border rounded shadow-lg py-2 z-50">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => { alert("Update Profile clicked"); setDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded"
                    >
                      Update Profile
                    </button>
                    <button
                      onClick={() => { alert("Change Password clicked"); setDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => { alert("Update Email clicked"); setDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded"
                    >
                      Update Email
                    </button>
                    <button
                      onClick={() => { alert("Notification Settings clicked"); setDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded"
                    >
                      Notification Settings
                    </button>
                    <button
                      onClick={() => { alert("Privacy Settings clicked"); setDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded"
                    >
                      Privacy Settings
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => { alert("Logged out!"); navigate("/login"); }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Links */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t shadow-md w-full px-4 py-2 flex flex-col gap-2">
          <button className="w-full text-left py-2" onClick={() => { navigate("/"); setMobileMenuOpen(false); }}>
            Home
          </button>
          <button className="w-full text-left py-2" onClick={() => { navigate("/properties"); setMobileMenuOpen(false); }}>
            Properties
          </button>
          <button className="w-full text-left py-2" onClick={() => { navigate("/finances"); setMobileMenuOpen(false); }}>
            Finances
          </button>
          <button className="w-full text-left py-2" onClick={() => { navigate("/tenants"); setMobileMenuOpen(false); }}>
            Tenants
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
