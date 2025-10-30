import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toursData from '../data/tour.json';

const API_BASE_URL = 'http://localhost:5000/api/registration';

function Registration() {
  const [formData, setFormData] = useState({
    name: '', numPersons: '', mobile: '', email: '', city: '', travelMode: '', message: '',
    age: '', idProofType: '', selectedYatraId: '', healthDeclaration: '',
    // --- FILE FIELD REMAINS ---
    idProofImage: null, 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    // Handle File Inputs
    if (files) {
        const file = files[0];
        if (file && file.size > 5 * 1024 * 1024) { // 5 MB limit
            alert('File size must be less than 5 MB');
            e.target.value = ''; // Clear the input
            return;
        }
        setFormData(prev => ({ ...prev, [name]: file }));
    } 
    // Handle Text/Select Inputs
    else {
        // Apply styling logic for selects (original functionality retained)
        if (e.target.tagName === 'SELECT' && value !== '') {
            e.target.classList.remove('text-gray-500');
            e.target.classList.add('text-gray-900');
        } else if (e.target.tagName === 'SELECT' && value === '') {
            e.target.classList.add('text-gray-500');
            e.target.classList.remove('text-gray-900');
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.age || !formData.mobile || !formData.email || !formData.idProofType || !formData.selectedYatraId || !formData.healthDeclaration) {
        setSubmitStatus({ success: false, message: 'Please fill in all required fields and select a Yatra.' });
        return;
    }
    
    if (!formData.idProofImage) {
         setSubmitStatus({ success: false, message: 'Please upload the required ID Proof Image/PDF.' });
         return;
    }


    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });
    
    // --- MOCK DOCUMENT URL FOR BACKEND ---
    const documentFileName = formData.idProofImage ? `${formData.idProofImage.name}` : 'document_missing.pdf';
    
    const payload = {
        name: formData.name,
        age: Number(formData.age), 
        mobile: formData.mobile,
        email: formData.email,
        
        address: formData.city || 'N/A - To be collected later', 
        idProof: formData.idProofType, 
        idProofNumber: '0000-0000-0000', 
        emergencyContact: { 
            name: 'N/A', 
            mobile: '0000000000', 
            relation: 'N/A' 
        },
        healthDeclaration: {
            hasConditions: formData.healthDeclaration !== 'Fit for travel',
            conditions: formData.healthDeclaration,
            medications: ""
        },
        
        selectedYatra: Number(formData.selectedYatraId),
        yatraTitle: toursData.find(t => t.id === Number(formData.selectedYatraId))?.title || 'Unknown Yatra',
        
        // --- NEW: Document URL added to payload ---
        documentUrl: `/uploads/${documentFileName}` 
    };
    
    console.log("Registration Payload to API:", payload);
    console.log("File to be sent (Reference Only):", formData.idProofImage ? formData.idProofImage.name : 'Missing');

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok) {
            setSubmitStatus({ success: true, message: `Success! Document reference (${payload.documentUrl}) saved to DB.` });
            
            setFormData({ 
                name: '', numPersons: '', mobile: '', email: '', city: '', travelMode: '', message: '', 
                age: '', idProofType: '', selectedYatraId: '', healthDeclaration: '', 
                idProofImage: null,
            });
            document.querySelectorAll('.contact-form select').forEach(select => {
                 select.classList.add('text-gray-500');
                 select.classList.remove('text-gray-900');
            });
        } else {
            setSubmitStatus({ success: false, message: 'Registration failed: ' + (data.message || 'Server Error') });
        }
    } catch (error) {
        console.error('API Call Error:', error);
        setSubmitStatus({ success: false, message: 'Submission failed. Could not connect to server.' });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="bg-white rounded-xl shadow-xl p-6 sm:p-10 border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-700 text-center mb-10 flex items-center justify-center gap-2">
          <span role="img" aria-label="form icon" className="text-3xl">📝</span> Yatra Registration Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5 contact-form">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
            <input type="number" name="age" placeholder="Age *" value={formData.age} onChange={handleChange} required min="5" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
            <input type="tel" name="mobile" placeholder="Mobile No. *" value={formData.mobile} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
            <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
            
            <input type="text" name="city" placeholder="Your City" value={formData.city} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
            
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
             {/* <select name="travelMode" value={formData.travelMode} onChange={handleChange} className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white ${!formData.travelMode ? 'text-gray-500' : 'text-gray-800'}`}>
                <option value="">Preferred Travel Mode</option>
                <option value="Bus">Bus</option> <option value="Train">Train</option> <option value="Flight">Flight</option> <option value="Own Vehicle">Own Vehicle</option> <option value="Other">Other</option>
              </select> */}
          </div>
          
          <textarea name="healthDeclaration" placeholder="Health Declaration* (Mention conditions/allergies or state 'Fit for travel')" rows="3" value={formData.healthDeclaration} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent mt-4"></textarea>

          <div className="grid grid-cols-1 gap-5 mt-6">
            
            {/* File Upload: ID Proof/PDF */}
            <div className="flex flex-col space-y-1">
                 <label className="block text-sm font-semibold text-gray-700">Upload ID Proof (Image/PDF – Max 5 MB)*</label>
                 <input
                     type="file"
                     name="idProofImage"
                     accept=".pdf,.jpg,.jpeg,.png"
                     onChange={handleChange}
                     required
                     className="w-full border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white text-sm file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                 />
                 <p className="text-xs text-gray-500">Note: The file reference is saved to the database for administrative purposes.</p>
             </div>
          </div>


          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </button>
          </div>

          {submitStatus.message && (
            <p className={`mt-4 text-center font-medium ${submitStatus.success ? 'text-green-700' : 'text-red-600'}`}>
              {submitStatus.message}
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