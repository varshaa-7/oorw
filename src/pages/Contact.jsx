// import React, { useState } from 'react';
// // Optional: If react-icons installed
// // import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// function Contact() {
//   const [formData, setFormData] = useState({
//     name: '', numPersons: '', mobile: '', email: '', city: '', travelMode: '', message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' }); // Track success/error

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus({ success: false, message: '' }); // Clear previous message
//     console.log("Form Data Submitted:", formData);

//     // --- Replace with actual API call ---
//     try {
//       // Simulate API delay
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       // Assume success
//       setSubmitStatus({ success: true, message: "Thank you! Your message has been sent successfully." });
//       setFormData({ name: '', numPersons: '', mobile: '', email: '', city: '', travelMode: '', message: '' }); // Reset form
//     } catch (error) {
//        console.error("Form submission error:", error);
//        setSubmitStatus({ success: false, message: "Submission failed. Please try again later." });
//     } finally {
//        setIsSubmitting(false);
//     }
//     // --- End replacement section ---
//   };

//   return (
//     <div className="container mx-auto px-4 py-12 max-w-6xl">
//       <div className="bg-white rounded-xl shadow-xl p-8 sm:p-12 border border-gray-100">
//         <h1 className="text-4xl font-extrabold text-orange-800 text-center mb-12">
//           Contact Oorzaa Yatraas
//         </h1>

//         {/* --- Contact Info Cards --- */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
//           {/* Phone Card */}
//           <div className="rounded-lg p-6 bg-gradient-to-br from-green-50 to-emerald-100 shadow-md border border-green-200 transform transition duration-300 hover:scale-105 hover:shadow-lg">
//              <span role="img" aria-label="phone" className="text-4xl block mb-3 text-green-700">📞</span>
//             {/* <FaPhoneAlt className="text-4xl text-green-700 mx-auto mb-3" /> */}
//             <h3 className="text-lg font-bold text-green-800 mb-1">Call Us</h3>
//             <a href="tel:+919129606151" className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium">+91-9129606151</a>
//           </div>
//           {/* Email Card */}
//           <div className="rounded-lg p-6 bg-gradient-to-br from-green-50 to-emerald-100 shadow-md border border-green-200 transform transition duration-300 hover:scale-105 hover:shadow-lg">
//             <span role="img" aria-label="email" className="text-4xl block mb-3 text-green-700">📧</span>
//             {/* <FaEnvelope className="text-4xl text-green-700 mx-auto mb-3" /> */}
//             <h3 className="text-lg font-bold text-green-800 mb-1">Email Us</h3>
//             <a href="mailto:priyanshusanti00@gmail.com" className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium break-all">priyanshusanti00@gmail.com</a>
//           </div>
//           {/* Address Card */}
//           <div className="rounded-lg p-6 bg-gradient-to-br from-green-50 to-emerald-100 shadow-md border border-green-200 transform transition duration-300 hover:scale-105 hover:shadow-lg">
//              <span role="img" aria-label="location pin" className="text-4xl block mb-3 text-green-700">📍</span>
//             {/* <FaMapMarkerAlt className="text-4xl text-green-700 mx-auto mb-3" /> */}
//             <h3 className="text-lg font-bold text-green-800 mb-1">Our Address</h3>
//             <p className="text-gray-700 text-sm leading-relaxed">B-1407, Beverly Park-2, Gurugram, Haryana - 122002</p>
//           </div>
//         </div>

//         {/* --- Contact Form --- */}
//         <div className="mb-16 border-t border-gray-200 pt-12">
//           <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Send Us Your Query</h2>
//           <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 shadow-sm"/>
//               <input type="text" name="numPersons" placeholder="Number of Persons" value={formData.numPersons} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 shadow-sm"/>
//               <input type="tel" name="mobile" placeholder="Mobile No. *" value={formData.mobile} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 shadow-sm"/>
//               <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 shadow-sm"/>
//               <input type="text" name="city" placeholder="Your City" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 shadow-sm"/>
//               <select name="travelMode" value={formData.travelMode} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white transition duration-200 shadow-sm">
//                 <option value="">Preferred Travel Mode</option>
//                 <option value="bus">Bus</option> <option value="train">Train</option> <option value="flight">Flight</option> <option value="other">Other</option>
//               </select>
//             </div>
//             <textarea name="message" placeholder="Your Message / Query *" rows="5" value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 shadow-sm"></textarea>

//             <div className="text-center">
//                <button
//                  type="submit"
//                  disabled={isSubmitting}
//                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-12 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
//                >
//                  {isSubmitting ? 'Sending...' : 'Send Message'}
//                </button>
//             </div>
//              {/* Submission Status Message */}
//              {submitStatus.message && (
//                 <p className={`mt-4 text-center font-semibold ${submitStatus.success ? 'text-green-700' : 'text-red-600'}`}>
//                   {submitStatus.message}
//                 </p>
//              )}
//           </form>
//         </div>

//         {/* --- Map Section --- */}
//         <div className="border-t border-gray-200 pt-12">
//           <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Find Us Here</h2>
//           <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl border border-gray-200">
//             <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1753.5027924829842!2d77.07810403857421!3d28.47937845157084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19225c710071%3A0xab6451bc5348dd13!2sBeverly%20Park%202!5e0!3m2!1sen!2sus!4v1761422010515!5m2!1sen!2sus" // Replace with your embed URL
//               className="w-full h-full border-0"
//               allowFullScreen=""
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               title="Our Location"
//             ></iframe>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Contact;


import React, { useState } from 'react';
// Optional: If react-icons installed and working
// import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '', numPersons: '', mobile: '', email: '', city: '', travelMode: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Apply placeholder styling logic for selects
    if (e.target.tagName === 'SELECT' && value !== '') {
        e.target.classList.remove('text-gray-500');
        e.target.classList.add('text-gray-900');
    } else if (e.target.tagName === 'SELECT' && value === '') {
        e.target.classList.add('text-gray-500');
        e.target.classList.remove('text-gray-900');
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });
    console.log("Form Data Submitted:", formData);

    // --- Replace with actual API call/submission logic ---
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
      setSubmitStatus({ success: true, message: "Thank you! Your message has been sent successfully. We'll be in touch soon." });
      setFormData({ name: '', numPersons: '', mobile: '', email: '', city: '', travelMode: '', message: '' });
       // Reset select styles
       document.querySelectorAll('.contact-form select').forEach(select => {
            select.classList.add('text-gray-500');
            select.classList.remove('text-gray-900');
       });
    } catch (error) {
       console.error("Form submission error:", error);
       setSubmitStatus({ success: false, message: "Sorry, something went wrong. Please try again later." });
    } finally {
       setIsSubmitting(false);
    }
    // --- End replacement section ---
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="bg-white rounded-xl shadow-xl p-8 sm:p-12 border border-gray-100">
        <h1 className="text-4xl font-extrabold text-orange-800 text-center mb-12">
          Contact Oorzaa Yatraas
        </h1>

        {/* --- Contact Info Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          {/* Phone Card */}
          <div className="rounded-xl p-6 bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg border border-green-200 transform transition duration-300 hover:scale-[1.03] hover:shadow-xl">
             <span role="img" aria-label="phone" className="text-5xl block mb-3 text-green-700">📞</span>
            <h3 className="text-lg font-bold text-green-900 mb-1">Call Us</h3> {/* Darker text */}
            <a href="tel:+919129606151" className="text-gray-900 hover:text-orange-600 transition-colors duration-200 font-semibold block"> {/* Darker text */}
              +91-9129606151
            </a>
             <p className="text-xs text-gray-600 mt-1">(10 AM - 6 PM IST)</p>
          </div>
          {/* Email Card */}
          <div className="rounded-xl p-6 bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg border border-green-200 transform transition duration-300 hover:scale-[1.03] hover:shadow-xl">
            <span role="img" aria-label="email" className="text-5xl block mb-3 text-green-700">📧</span>
            <h3 className="text-lg font-bold text-green-900 mb-1">Email Us</h3> {/* Darker text */}
            <a href="mailto:priyanshusanti00@gmail.com" className="text-gray-900 hover:text-orange-600 transition-colors duration-200 font-semibold break-words block"> {/* Darker text */}
              priyanshusanti00@gmail.com
            </a>
             <p className="text-xs text-gray-600 mt-1">(We reply within 24 hours)</p>
          </div>
          {/* Address Card */}
          <div className="rounded-xl p-6 bg-gradient-to-br from-green-50 to-emerald-100 shadow-lg border border-green-200 transform transition duration-300 hover:scale-[1.03] hover:shadow-xl">
             <span role="img" aria-label="location pin" className="text-5xl block mb-3 text-green-700">📍</span>
            <h3 className="text-lg font-bold text-green-900 mb-1">Our Address</h3> {/* Darker text */}
            <p className="text-gray-800 text-sm leading-relaxed">B-1407, Beverly Park-2, Gurugram, Haryana - 122002</p> {/* Darker text */}
             <p className="text-xs text-gray-600 mt-1">(Visits by appointment only)</p>
          </div>
        </div>

        {/* --- Contact Form --- */}
        <div className="mb-16 border-t border-orange-100 pt-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Send Us Your Query</h2> {/* Darker text */}
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6 contact-form"> {/* Added contact-form class */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 shadow-sm"/>
              <input type="text" name="numPersons" placeholder="Number of Persons" value={formData.numPersons} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 shadow-sm"/>
              <input type="tel" name="mobile" placeholder="Mobile No. *" value={formData.mobile} onChange={handleChange} required pattern="[6-9][0-9]{9}" title="Please enter a valid 10-digit Indian mobile number" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 shadow-sm"/>
              <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 shadow-sm"/>
              <input type="text" name="city" placeholder="Your City" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 shadow-sm"/>
               <select name="travelMode" value={formData.travelMode} onChange={handleChange} required className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white transition duration-200 shadow-sm ${!formData.travelMode ? 'text-gray-500' : 'text-gray-900'}`}>
                <option value="" disabled>Preferred Travel Mode *</option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
                <option value="Own Vehicle">Own Vehicle</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <textarea name="message" placeholder="Your Message / Query *" rows="5" value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 shadow-sm"></textarea>

            <div className="text-center pt-2">
               <button
                 type="submit"
                 disabled={isSubmitting}
                 className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-12 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
               >
                 {isSubmitting ? 'Sending...' : 'Send Message'}
               </button>
            </div>
             {/* Submission Status Message */}
             {submitStatus.message && (
                <p className={`mt-4 text-center font-semibold ${submitStatus.success ? 'text-green-700' : 'text-red-600'}`}>
                  {submitStatus.message}
                </p>
             )}
          </form>
        </div>

        {/* --- Map Section --- */}
        <div className="border-t border-orange-100 pt-12 mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Find Us Here</h2> {/* Darker text */}
          {/* --- MODIFIED CONTAINER --- */}
          {/* Removed aspect ratio, added fixed height */}
          <div className="h-[500px] rounded-xl overflow-hidden shadow-xl border border-gray-200"> 
            <iframe
              src="https://www.google.com/maps/" // Replace with your Google Maps embed URL
              className="w-full h-full border-0" // Ensure iframe fills container
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Oorzaa Yatraas Location"
            ></iframe>
          </div>
          {/* --- END OF MODIFICATION --- */}
        </div>
      </div>
    </div>
  );
}

export default Contact;