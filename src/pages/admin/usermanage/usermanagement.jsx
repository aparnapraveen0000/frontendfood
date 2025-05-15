import React, { useState } from 'react';
import { axiosInstance } from '../../../config/axiosInstance.js';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get('/user/all');
      setUsers(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  // Delete a user
  const handleDelete = async (userId) => {
    try {
      await axiosInstance.delete(`/user/delete/${userId}`);
      setUsers(prev => prev.filter(user => user._id !== userId));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button 
          className="btn bg-orange-500 hover:bg-orange-600 text-white"
          onClick={fetchUsers}
        >
          Get all users
        </button>
      </div>

      {loading && <p className="text-info">Loading users...</p>}
      {error && <p className="text-error">Error: {error}</p>}

      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.address}</td>
                  <td>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-center text-gray-500">click at the button to get all users</p>
      )}
    </div>
  );
}

export default UserManagement;
