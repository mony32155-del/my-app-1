"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Pencil, Plus, Trash2 } from "lucide-react";

type UserRole = "User" | "Admin" | "Super Admin";

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  status: "Active" | "Inactive";
  avatar: string;
}

const defaultUsers: User[] = [];

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    // On component mount, check localStorage for users.
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // If no users in localStorage, initialize it with the default list.
      localStorage.setItem("users", JSON.stringify(defaultUsers));
      setUsers(defaultUsers);
    }

    // Get the current user's role
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    if (currentUser.role) {
      setCurrentUserRole(currentUser.role);
    }
  }, []);

  const handleDelete = (userId: number) => {
    // Prevent the super admin from deleting themselves
    if (users.find((u) => u.id === userId)?.role === "Super Admin") {
      alert("The Super Admin cannot be deleted.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const handleRoleChange = (userId: number, newRole: UserRole) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleOpenEditModal = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSaveUser = (updatedUser: User) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    handleCloseModal();
  };

  const canEdit =
    currentUserRole === "Admin" || currentUserRole === "Super Admin";
  const canDelete = currentUserRole === "Super Admin";

  return (
    <div className="p-4 md:p-6 bg-gray-100">
      {isModalOpen && editingUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveUser(editingUser);
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
        <button className="flex items-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus size={20} />
          Add User
        </button>
      </div>

      {/* User list: Table on md+ screens, cards on smaller screens */}
      <div className="space-y-4 md:hidden">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  className="h-10 w-10 rounded-full"
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  width={40}
                  height={40}
                />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
              {canEdit && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(user)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Pencil size={18} />
                  </button>
                  {canDelete && (
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-between text-sm">
              <div className="text-gray-600">
                <span className="font-medium">Role:</span>{" "}
                {canDelete ? (
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value as UserRole)
                    }
                    className="ml-1 rounded border-gray-300 text-sm"
                    disabled={user.role === "Super Admin"}
                  >
                    <option>User</option>
                    <option>Admin</option>
                    <option>Super Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </div>
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Users Table for larger screens */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={user.avatar}
                      alt={`${user.name}'s avatar`}
                      width={40}
                      height={40}
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {canDelete ? (
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value as UserRole)
                      }
                      className="rounded border-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                      // Prevent a super admin from demoting themselves
                      disabled={user.role === "Super Admin"}
                    >
                      <option>User</option>
                      <option>Admin</option>
                      <option>Super Admin</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {canEdit && (
                    <>
                      <button
                        onClick={() => handleOpenEditModal(user)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Pencil size={18} />
                      </button>
                      {canDelete && (
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
