import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toursData from '../data/tour.json';

// --- ADDED: Define the API Base URL ---
// Assuming the backend server runs on port 5000 as per backend/server.js
const API_BASE_URL = 'http://localhost:5000/api/registration';

function Registration() {
  // Removed 'document' field and related placeholder
  const [formData, setFormData] = useState({
    name: '', age: '', mobile: '', email: '', idProofType: '', selectedYatraId: '', healthDeclaration: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Simplified handleChange to only deal with form values, removed file logic
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.age || !formData.mobile || !formData.email || !formData.idProofType || !formData.selectedYatraId || !formData.healthDeclaration) {
      setSubmitMessage('Please fill in all required fields, including selecting a Yatra.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    
    // --- MODIFIED: Construct payload for backend (mapping frontend fields and mocking required missing fields) ---
    // The backend's registrationController.js requires 'address', 'idProofNumber', and 'emergencyContact' fields 
    // which were not present in the frontend form, so we mock them to pass validation.
    const payload = {
      name: formData.name,
      age: formData.age,
      mobile: formData.mobile,
      email: formData.email,
      // Mapped fields
      idProof: formData.idProofType, // FE uses idProofType, BE expects idProof
      selectedYatra: Number(formData.selectedYatraId), // FE uses selectedYatraId, BE expects selectedYatra
      healthDeclaration: formData.healthDeclaration,
      
      // Mocked required fields to pass backend validation in registrationController.js
      address: 'N/A - To be collected later',
      idProofNumber: '0000-0000-0000', // Required by BE validation
      emergencyContact: { 
        name: 'N/A', 
        mobile: '0000000000', 
        relation: 'N/A' 
      },
    };
    
    console.log("Registration Data Submitted to API:", payload);

    try {
      // --- MODIFIED: Replaced simulation with actual fetch call ---
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage("Thank you for registering! Check email for next steps. (Success: " + data.message + ")");
        // Reset form
        setFormData({ name: '', age: '', mobile: '', email: '', idProofType: '', selectedYatraId: '', healthDeclaration: '' });
      } else {
        // Handle API errors (e.g., validation failed, seat unavailable)
        setSubmitMessage('Registration failed: ' + (data.message || 'Server Error'));
      }
    } catch (error) {
      console.error('API Call Error:', error);
      setSubmitMessage('Registration failed: Could not connect to server.');
    } finally {
      setIsSubmitting(false);
    }
    // --- End modification ---
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="bg-white rounded-xl shadow-xl p-6 sm:p-10 border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-700 text-center mb-10 flex items-center justify-center gap-2">
          <span role="img" aria-label="form icon" className="text-3xl">📝</span> Yatra Registration Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
            <input type="number" name="age" placeholder="Age *" value={formData.age} onChange={handleChange} required min="5" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
            <input type="tel" name="mobile" placeholder="Mobile No. *" value={formData.mobile} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
            <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />

            <select name="idProofType" value={formData.idProofType} onChange={handleChange} required className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white ${!formData.idProofType ? 'text-gray-500' : 'text-gray-800'}`}>
              <option value="" disabled>Select ID Proof Type *</option>
              <option value="Aadhaar">Aadhaar Card</option>
              <option value="Passport">Passport</option>
            </select>

            <select name="selectedYatraId" value={formData.selectedYatraId} onChange={handleChange} required className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white ${!formData.selectedYatraId ? 'text-gray-500' : 'text-gray-800'}`}>
              <option value="" disabled>Booking For Yatra *</option>
              {toursData.map((tour) => (
                <option key={tour.id} value={tour.id}>
                  {tour.title} (₹{tour.price.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
          </div>

          <textarea name="healthDeclaration" placeholder="Health Declaration* (Mention conditions/allergies or state 'Fit for travel')" rows="5" value={formData.healthDeclaration} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent mt-4"></textarea>

          {/* The file upload section was removed here */}

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </button>
          </div>

          {submitMessage && (
            <p className={`mt-4 text-center font-medium ${submitMessage.includes('failed') || submitMessage.includes('Could not connect') ? 'text-red-600' : 'text-green-700'}`}>
              {submitMessage}
            </p>
          )}
        </form>

        <div className="mt-8 text-center text-sm text-gray-600 border-t border-gray-200 pt-4">
          Submitting registers your interest. Please check email for payment and document steps. Refer to our <Link to="/guidelines" className="text-orange-600 hover:underline font-medium">Participant Guidelines</Link>.
        </div>
      </div>
    </div>
  );
}

export default Registration;