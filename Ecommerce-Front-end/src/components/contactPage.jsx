import { useState } from 'react';
import './contactPage.css';
import { showToast } from '../utils/showToast';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    showToast("Message sent! We'll get back to you soon.", "success");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className="contact-page-wrapper">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in touch</h2>
          <p>Have a question or just want to say hi? We'd love to hear from you.</p>
          
          <div className="info-details">
            <div className="info-item">
              <i className="fa-solid fa-envelope"></i>
              <span>mehrachhoussam111@gmail.com</span>
            </div>
            <div className="info-item">
              <i className="fa-solid fa-location-dot"></i>
              <span>INPT, Madinat Al Irfane, Rabat</span>
            </div>
          </div>
        </div>

        <div className="contact-card">
          <form onSubmit={handleSubmit}>
            <div className="input-row">
              <div className="input-group">
                <label>Name</label>
                <input 
                  type="text" required placeholder="Your name"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input 
                  type="email" required placeholder="email@example.com"
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Subject</label>
              <input 
                type="text" required placeholder="How can we help?"
                value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>

            <div className="input-group">
              <label>Message</label>
              <textarea 
                required placeholder="Write your message here..." rows="5"
                value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <button type="submit" className="send-btn">Send Message</button>
          </form>
        </div>
      </div>
    </main>
  );
}