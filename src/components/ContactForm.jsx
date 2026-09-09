import React from 'react';

function ContactForm() {
  return (
    <div className="contact-container">
      <form action="https://formspree.io/f/xlgoajez" method="POST">
        <div className="form-group">
          <h2>Get In Contact</h2>
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            placeholder="your@email.com" 
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea 
            id="message" 
            name="message" 
            rows="4" 
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </div>
  );
}

export default ContactForm;
