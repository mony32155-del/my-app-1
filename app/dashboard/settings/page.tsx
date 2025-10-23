"use client";

import React, { useState } from "react";
import { Bell, Monitor, Moon, Sun } from "lucide-react";

const SettingsPage = () => {
  // Mock state for settings - you can replace this with your actual state management
  const [siteTitle, setSiteTitle] = useState("My Awesome Site");
  const [theme, setTheme] = useState("system");
  const [emailNotifications, setEmailNotifications] = useState(true);

  const inputStyles =
    "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your save logic here
    console.log("Saving settings:", { siteTitle, theme, emailNotifications });
    alert("Settings saved!");
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Site Settings</h1>

      <form onSubmit={handleSave} className="space-y-12 max-w-3xl">
        {/* General Settings */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">
            General
          </h2>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="site-title"
                className="block text-sm font-medium text-gray-700"
              >
                Site Title
              </label>
              <input
                type="text"
                id="site-title"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className={inputStyles}
              />
            </div>
          </div>
        </section>

        {/* Appearance Settings */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-4 mb-6">
            Appearance
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 rounded-lg bg-gray-100 p-1">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`w-full flex justify-center items-center gap-2 rounded-md py-2 text-sm font-medium transition-colors ${
                    theme === "light"
                      ? "bg-white text-gray-900 shadow"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Sun className="h-5 w-5" /> Light
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`w-full flex justify-center items-center gap-2 rounded-md py-2 text-sm font-medium transition-colors ${
                    theme === "dark"
                      ? "bg-gray-700 text-white shadow"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Moon className="h-5 w-5" /> Dark
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("system")}
                  className={`w-full flex justify-center items-center gap-2 rounded-md py-2 text-sm font-medium transition-colors ${
                    theme === "system"
                      ? "bg-white text-gray-900 shadow"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Monitor className="h-5 w-5" /> System
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Notifications Settings */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="flex items-center justify-between text-xl font-semibold text-gray-800 border-b pb-4 mb-6">
            <span>Notifications</span>
            <Bell className="h-5 w-5 text-gray-500" />
          </h2>

          <div className="flex items-center justify-between">
            <span className="flex flex-grow flex-col">
              <span className="text-sm font-medium text-gray-900">
                Email Notifications
              </span>

              <span className="text-sm text-gray-500">
                Receive updates and alerts via email.
              </span>
            </span>
            <button
              type="button"
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`${
                emailNotifications ? "bg-indigo-600" : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  emailNotifications ? "translate-x-5" : "translate-x-0"
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
