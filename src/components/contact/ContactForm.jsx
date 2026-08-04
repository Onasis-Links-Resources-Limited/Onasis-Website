/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { ContactInfo } from './ContactInfo';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic
  };
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold">Get In Touch</h2>
            <p className="text-gray-600 mt-2">
              We'd love to hear from you. Send us a message and we'll respond
              within 24 hours.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" className="..."/>
                <input type="email" placeholder="Email Address" className="..."/>
              </div>
              <input type="tel" placeholder="Phone Number" className="..."/>
              <input type="text" placeholder="Subject" className="..."/>
              <textarea rows="5" placeholder="Message" className="..."></textarea>
              <button type="submit" className="w-full bg-[#C3110C] hover:bg-[#E6501B] text-white py-3 rounded-lg transition-colors">
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <ContactInfo />
        </div>
      </div>
    </section>
  );
};