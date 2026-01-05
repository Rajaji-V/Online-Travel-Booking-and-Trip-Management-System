import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { User, Mail, Shield, Trash2, Calendar, AlertCircle } from 'lucide-react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get('/users');
        setUsers(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;
    // Note: We'd need a delete route in backend too
    alert("Delete functionality would go here!");
  };

  if (loading) return <div className="container section">Loading users...</div>;
  if (error) return <div className="container section text-danger">{error}</div>;

  return (
    <div className="container section">
      <h2 className="section-title">Manage Users</h2>

      {!users.length ? (
        <div className="empty-state">
          <AlertCircle size={48} />
          <p>No users found.</p>
        </div>
      ) : (
        <div className="admin-table-container glass-panel fade-in">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div className="table-cell-user">
                      <span><User size={14} /> {u.name}</span>
                      <span className="text-muted"><Mail size={14} /> {u.email}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge ${u.role}`}>
                      <Shield size={12} /> {u.role}
                    </span>
                  </td>
                  <td><Calendar size={14} /> {new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn-icon text-danger"
                      onClick={() => deleteUser(u._id)}
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
