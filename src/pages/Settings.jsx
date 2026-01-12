// Settings.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold mb-6 text-center sm:text-left">
        Settings
      </h1>

      <div className="bg-white border rounded shadow p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
        <button
          onClick={() => navigate("/profile")}
          className="text-left px-3 sm:px-4 py-2 text-base sm:text-lg hover:bg-gray-100 rounded w-full "
        >
          Update Profile
        </button>

        <button
          onClick={() => alert("Change Password clicked")}
          className="text-left px-3 sm:px-4 py-2 text-base sm:text-lg hover:bg-gray-100 rounded w-full"
        >
          Change Password
        </button>

        <button
          onClick={() => alert("Update Email clicked")}
          className="text-left px-3 sm:px-4 py-2 text-base sm:text-lg hover:bg-gray-100 rounded w-full"
        >
          Update Email
        </button>

        <button
          onClick={() => alert("Notification Settings clicked")}
          className="text-left px-3 sm:px-4 py-2 text-base sm:text-lg hover:bg-gray-100 rounded w-full"
        >
          Notification Settings
        </button>

        <button
          onClick={() => alert("Privacy Settings clicked")}
          className="text-left px-3 sm:px-4 py-2 text-base sm:text-lg hover:bg-gray-100 rounded w-full"
        >
          Privacy Settings
        </button>

        <button
          onClick={() => {
            alert("Logged out!");
            navigate("/login");
          }}
          className="text-left px-3 sm:px-4 py-2 text-base sm:text-lg text-red-600 hover:bg-gray-100 rounded w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
