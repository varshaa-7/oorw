// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import toursData from '../data/tour.json';

// function Registration() {
//   const [formData, setFormData] = useState({
//     name: '', age: '', mobile: '', email: '', idProofType: '', selectedYatraId: '', healthDeclaration: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitMessage, setSubmitMessage] = useState('');


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//      // Basic validation
//     if (!formData.name || !formData.age || !formData.mobile || !formData.email || !formData.idProofType || !formData.selectedYatraId || !formData.healthDeclaration) {
//         setSubmitMessage('Please fill in all required fields, including selecting a Yatra.');
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitMessage('');
//     console.log("Registration Data Submitted:", formData);
//     // --- Simulate API call ---
//     await new Promise(resolve => setTimeout(resolve, 1500));
//     // --- End simulation ---
//     setSubmitMessage("Thank you for registering! Check email for next steps.");
//     setFormData({ name: '', age: '', mobile: '', email: '', idProofType: '', selectedYatraId: '', healthDeclaration: '' });
//     setIsSubmitting(false);
//   };

//   return (
//     // Container for the page
//     <div className="container mx-auto px-4 py-12 max-w-3xl">
//        <div className="bg-white rounded-xl shadow-xl p-6 sm:p-10 border border-gray-200">
//         <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-700 text-center mb-10 flex items-center justify-center gap-2">
//           <span role="img" aria-label="form icon" className="text-3xl">📝</span> Yatra Registration Form
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Use a grid for layout */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

//             {/* Form Fields with Placeholders */}
//             <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
//             <input type="number" name="age" placeholder="Age *" value={formData.age} onChange={handleChange} required min="5" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
//             <input type="tel" name="mobile" placeholder="Mobile No. *" value={formData.mobile} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
//             <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>

//             <select name="idProofType" value={formData.idProofType} onChange={handleChange} required className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white ${!formData.idProofType ? 'text-gray-500' : 'text-gray-800'}`}>
//               <option value="" disabled>Select ID Proof Type *</option>
//               <option value="Aadhaar">Aadhaar Card</option>
//               <option value="Passport">Passport</option>
//             </select>

//             <select name="selectedYatraId" value={formData.selectedYatraId} onChange={handleChange} required className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white ${!formData.selectedYatraId ? 'text-gray-500' : 'text-gray-800'}`}>
//               <option value="" disabled>Booking For Yatra *</option>
//               {toursData.map((tour) => (
//                 <option key={tour.id} value={tour.id}>
//                   {tour.title} (₹{tour.price.toLocaleString('en-IN')})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Health Declaration - Spans full width */}
//           <textarea name="healthDeclaration" placeholder="Health Declaration* (Mention conditions/allergies or state 'Fit for travel')" rows="5" value={formData.healthDeclaration} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent mt-4"></textarea>

//           {/* Submit Button */}
//           <div className="text-center pt-4">
//              <button
//                type="submit"
//                disabled={isSubmitting}
//                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
//              >
//                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
//              </button>
//           </div>

//           {/* Submission Message */}
//           {submitMessage && (
//             <p className={`mt-4 text-center font-medium ${submitMessage.includes('failed') || submitMessage.includes('Please fill') ? 'text-red-600' : 'text-green-700'}`}>
//               {submitMessage}
//             </p>
//           )}

//         </form>

//         {/* Note linking to Guidelines */}
//         <div className="mt-8 text-center text-sm text-gray-600 border-t border-gray-200 pt-4">
//            Submitting registers your interest. Please check email for payment and document steps. Refer to our <Link to="/guidelines" className="text-orange-600 hover:underline font-medium">Participant Guidelines</Link>.
//          </div>
//       </div>
//     </div>
//   );
// }

// export default Registration;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toursData from '../data/tour.json';

function Registration() {
  const [formData, setFormData] = useState({
    name: '', age: '', mobile: '', email: '', idProofType: '', selectedYatraId: '', healthDeclaration: '', document: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'document') {
      const file = files[0];
      if (file && file.size > 5 * 1024 * 1024) { // 5 MB limit
        alert('File size must be less than 5 MB');
        return;
      }
      setFormData(prev => ({ ...prev, document: file }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
    console.log("Registration Data Submitted:", formData);
    // --- Simulate API call ---
    await new Promise(resolve => setTimeout(resolve, 1500));
    // --- End simulation ---
    setSubmitMessage("Thank you for registering! Check email for next steps.");
    setFormData({ name: '', age: '', mobile: '', email: '', idProofType: '', selectedYatraId: '', healthDeclaration: '', document: null });
    setIsSubmitting(false);
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

          {/* 📁 Upload Document Section */}
          <div className="mt-6">
            <label className="block text-gray-700 font-semibold mb-2">Upload ID Proof / Health Certificate (PDF, JPG, PNG – Max 5 MB)*</label>
            <input
              type="file"
              name="document"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            />
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

          {submitMessage && (
            <p className={`mt-4 text-center font-medium ${submitMessage.includes('failed') || submitMessage.includes('Please fill') ? 'text-red-600' : 'text-green-700'}`}>
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
