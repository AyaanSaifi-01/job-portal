import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteUser, getAllUsers } from "../services/adminService";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load users"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
        await deleteUser(userId);
        setUsers((prevUser) => prevUser.filter((user) => user.id !== userId))
        toast.success("User deleted successfully!")
    } catch(error) {
        toast.error(
            error.response?.data?.message || "Failed to delete the user!"
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900">
          Manage Users
        </h1>

        <p className="mt-2 text-gray-600">
          View all registered users.
        </p>

        {loading ? (
          <p className="mt-8 text-gray-600">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="mt-8 text-gray-600">No users found.</p>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-xl border bg-white">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t text-gray-700">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td>
                        <button className="bg-red-600 border rounded-lg outline-none text-[20px] py-2 px-4 cursor-pointer text-white" onClick={() => handleDelete(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
