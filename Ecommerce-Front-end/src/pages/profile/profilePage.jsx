import api from '../../utils/api'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { showToast } from '../../utils/showToast';
import './profilePage.css';

export function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/api/v1/users/showMe', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
      } catch (error) {
        showToast("Error fetching profile", "error");
        console.error(error)
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div className="loading">Loading Profile...</div>;
  if (!user) return <div className="loading">User not found</div>;

  const firstLetter = user.firstName ? user.firstName.charAt(0).toUpperCase() : '?';

  return (
    <main className="profile-page-wrapper">
      <div className="profile-container">
        <div className="profile-header-card">
          <div className="profile-avatar">{firstLetter}</div>
          <h1>{user.firstName} {user.lastName}</h1>
          <p>{user.email}</p>
        </div>

        <div className="profile-details-list">
          <div className="detail-item">
            <label>First Name</label>
            <div className="value-box">{user.firstName}</div>
          </div>
          <div className="detail-item">
            <label>Last Name</label>
            <div className="value-box">{user.lastName}</div>
          </div>
          <div className="detail-item">
            <label>Email Address</label>
            <div className="value-box">{user.email}</div>
          </div>
        </div>

        <Link to="/orders" className="profile-orders-btn">
          <i className="fa-solid fa-box"></i>
          View My Orders
        </Link>
      </div>
    </main>
  );
}