import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dropdownRef = useRef();
  const settingsRef = useRef();

  // Close dropdowns when clicking outside
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
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo & Title */}
        <div className="flex items-center gap-4">
          <img src="/resources/logo.png" alt="PropertyVision" className="h-10" />
          <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>
            PropertyVision
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <button className="text-lg" onClick={() => navigate("/")}>Home</button>
          <button className="text-lg" onClick={() => navigate("/properties")}>Properties</button>
          <button className="text-lg" onClick={() => navigate("/finances")}>Finances</button>
          <button className="text-lg" onClick={() => navigate("/tenants")}>Tenants</button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white cursor-pointer select-none"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              SS
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg py-2 z-50">
                <p className="px-4 py-2 text-sm text-gray-700 font-medium">ss@example.com</p>
                <hr />

                {/* Profile button */}
                

                {/* Settings with nested popup */}
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
      </div>
    </nav>
  );
};

export default Navbar;
