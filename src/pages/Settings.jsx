// Settings.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-24 p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-white border rounded shadow p-6 flex flex-col gap-4">
        <button
          onClick={() => navigate("/profile")}
          className="text-left px-4 py-2 text-lg hover:bg-gray-100 rounded"
        >
          Update Profile
        </button>

        <button
          onClick={() => alert("Change Password clicked")}
          className="text-left px-4 py-2 text-lg hover:bg-gray-100 rounded"
        >
          Change Password
        </button>

        <button
          onClick={() => alert("Update Email clicked")}
          className="text-left px-4 py-2 text-lg hover:bg-gray-100 rounded"
        >
          Update Email
        </button>

        <button
          onClick={() => alert("Notification Settings clicked")}
          className="text-left px-4 py-2 text-lg hover:bg-gray-100 rounded"
        >
          Notification Settings
        </button>

        <button
          onClick={() => alert("Privacy Settings clicked")}
          className="text-left px-4 py-2 text-lg hover:bg-gray-100 rounded"
        >
          Privacy Settings
        </button>

        <button
          onClick={() => {
            alert("Logged out!");
            navigate("/login");
          }}
          className="text-left px-4 py-2 text-lg text-red-600 hover:bg-gray-100 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
