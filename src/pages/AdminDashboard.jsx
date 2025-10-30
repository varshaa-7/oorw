import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';

const BASE_URL = 'http://localhost:5000/api';

// Helper function to fetch data from protected admin endpoints
const fetchAdminData = async (endpoint) => {
    const token = localStorage.getItem('adminToken');
    if (!token) throw new Error("No token found");

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 401) {
      throw new Error("Unauthorized. Token expired.");
    }
    if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
    }
    const data = await response.json();
    return data.data;
};

// Helper function to convert comma-separated string to array
const csvToArray = (csv) => {
    if (typeof csv !== 'string') return [];
    return csv.split(',').map(item => item.trim()).filter(item => item.length > 0);
};


function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('yatras');
  const [yatras, setYatras] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Authentication check and data fetching
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login'); // Redirect if no token
      return;
    }
    
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [yatraData, videoData] = await Promise.all([
          fetchAdminData('yatra'),
          fetchAdminData('videos')
        ]);
        setYatras(yatraData);
        setVideos(videoData);
      } catch (err) {
        // Handle token expiration/unauthorized errors
        setError(err.message === "Unauthorized. Token expired." ? "Session expired. Please log in again." : err.message);
        if (err.message === "Unauthorized. Token expired.") {
             localStorage.removeItem('adminToken');
             navigate('/admin/login');
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type} with ID ${id}?`)) return;

    const token = localStorage.getItem('adminToken');
    // Note: The backend uses the singular 'yatra' route
    const endpoint = type === 'yatras' ? `yatra/${id}` : `videos/${id}`; 
    
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Deletion failed');
      
      // Update state
      if (type === 'yatras') {
        setYatras(prev => prev.filter(y => y._id !== id));
      } else {
        setVideos(prev => prev.filter(v => v._id !== id));
      }
    } catch (err) {
      setError(`Failed to delete ${type}: ${err.message}`);
    }
  };

  // --- Form/Modal Logic ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [currentType, setCurrentType] = useState(null);
  
  const openForm = (type, item = null) => {
    setCurrentType(type); // This sets type to 'yatras' or 'videos'
    // When opening the form for edit, convert arrays back to CSV strings for display
    if (item && type === 'yatras') {
        item.highlights = Array.isArray(item.highlights) ? item.highlights.join(', ') : '';
        item.included = Array.isArray(item.included) ? item.included.join(', ') : '';
        item.excluded = Array.isArray(item.excluded) ? item.excluded.join(', ') : '';
    }
    setCurrentEdit(item);
    setIsFormOpen(true);
  };
  
  // --- FormModal Component (Complete and Corrected with Grid UI) ---
  const FormModal = ({ type, item, onClose }) => {
    // Initialize required array fields for "Add New" operation
    const initialFormData = item || { 
        category: 'yatra',
        highlights: '', // Initialize as string for form binding
        included: '',
        excluded: '',
        itinerary: []
    };
    
    const [formData, setFormData] = useState(initialFormData); 
    const [isSaving, setIsSaving] = useState(false);
    const [submitError, setSubmitError] = useState(null); // NEW STATE for error display

    const formGroupClass = "flex flex-col space-y-1";
    const inputClass = "w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-900 placeholder:text-gray-400";
    const labelClass = "text-sm font-medium text-gray-700";

    
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      setIsSaving(true);
      setSubmitError(null); // Clear previous error
      
      const token = localStorage.getItem('adminToken');
      const method = item ? 'PUT' : 'POST';
      // Use singular 'yatra' in the endpoint path for the API
      const endpoint = type === 'yatras' ? `yatra/${item ? item._id : ''}` : `videos/${item ? item._id : ''}`; 
      
      // --- CLIENT-SIDE VALIDATION CHECK FOR YATRAS ---
      if (type === 'yatras') {
          if (isNaN(Number(formData.price)) || Number(formData.price) <= 0 || !formData.date || !formData.destination) {
              setSubmitError("Please ensure Price, Destination, and Start Date are valid.");
              setIsSaving(false);
              return;
          }
      }
      // --- END CLIENT-SIDE VALIDATION ---

      try {
          // Prepare the final payload, converting CSV strings back to arrays for yatra
          const payload = { ...formData };
          if (type === 'yatras') { 
              // Convert the CSV strings back into arrays before sending to the backend
              payload.highlights = csvToArray(payload.highlights);
              payload.included = csvToArray(payload.included);
              payload.excluded = csvToArray(payload.excluded);
              // Ensure numerical types are cast for safety
              payload.price = Number(payload.price);
              payload.maxParticipants = Number(payload.maxParticipants);
              payload.availableSeats = Number(payload.availableSeats);
          }


          const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
              method: method,
              headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
          });
          
          if (!response.ok) {
            
            // --- ENHANCED ERROR HANDLING STARTS HERE ---
            const responseText = await response.text();
            let errorData;
            
            try {
                errorData = JSON.parse(responseText);
            } catch (jsonErr) {
                setSubmitError(`Server Error: Could not parse response. Raw Message: ${responseText.substring(0, 100)}...`);
                throw new Error(responseText);
            }

            let errorMessage = errorData.message || 'Failed to save data. Unknown API error.';
            if (errorData.code === 11000) { 
                errorMessage = "Error: This Yatra ID already exists. Please choose a unique ID.";
            }

            setSubmitError(errorMessage); 
            throw new Error(errorMessage);
          }
          
          // Successful save
          window.location.reload(); 
          onClose();
      } catch (err) {
          if (!submitError) { 
               setSubmitError(`Network Error: ${err.message}. Check if backend is running.`);
          }
      } finally {
          setIsSaving(false);
      }
    };
    
    const handleChange = (e) => {
        const { name, value, type: inputType, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: inputType === 'checkbox' ? checked : value 
        }));
    };
    
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100] p-8 overflow-y-auto">
            <div className="bg-white rounded-xl w-full max-w-4xl my-10 overflow-hidden">
                
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">
                       {item ? 'Edit Existing Yatra' : 'Add New Yatras'}
                    </h2>
                     <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        &times;
                    </button>
                </div>

                <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
                    
                    {/* Yatra-specific Form Structure (Grid) */}
                    {type === 'yatras' && (
                        <div className="space-y-6">
                            
                            {/* Row 1: Title and Destination (2-Column Grid) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                <div className={formGroupClass}>
                                    <label className={labelClass} htmlFor="title">Title *</label>
                                    <input type="text" id="title" name="title" placeholder="e.g., Kashi Vishwanath Yatra" value={formData.title || ''} onChange={handleChange} required className={inputClass} />
                                </div>
                                
                                <div className={formGroupClass}>
                                    <label className={labelClass} htmlFor="destination">Destination *</label>
                                    <input type="text" id="destination" name="destination" placeholder="e.g., Varanasi" value={formData.destination || ''} onChange={handleChange} required className={inputClass} />
                                </div>
                            </div>
                            
                            {/* Row 2: Duration and Price (2-Column Grid) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                <div className={formGroupClass}>
                                    <label className={labelClass} htmlFor="duration">Duration *</label>
                                    <input type="text" id="duration" name="duration" placeholder="e.g., 5 Days / 4 Nights" value={formData.duration || ''} onChange={handleChange} required className={inputClass} />
                                </div>
                                
                                <div className={formGroupClass}>
                                    <label className={labelClass} htmlFor="price">Price (₹) *</label>
                                    <input type="number" id="price" name="price" placeholder="e.g., 15000" value={formData.price || ''} onChange={handleChange} required className={inputClass} />
                                </div>
                            </div>
                            
                            {/* Row 3: Image URL (Full Width) */}
                            <div className={formGroupClass}>
                                <label className={labelClass} htmlFor="image">Image"Image URL *</label>
                                <input type="text" id="image" name="image" placeholder="/images/your-image.jpg" value={formData.image || ''} onChange={handleChange} required className={inputClass} />
                                <p className="text-xs text-gray-500">Place image in frontend's public/images folder and use path like /images/imagename.jpg</p>
                            </div>
                            
                            {/* Row 4: Description (Full Width) */}
                            <div className={formGroupClass}>
                                <label className={labelClass} htmlFor="description">Description *</label>
                                <textarea id="description" name="description" placeholder="Detailed description of the Yatra" rows="3" value={formData.description || ''} onChange={handleChange} required className={inputClass}></textarea>
                            </div>

                            {/* Additional Required Fields (Hidden for the requested UI style, but still necessary for DB) */}
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-gray-100">
                                
                                {/* Yatra ID */}
                                <div className={formGroupClass}>
                                    <label className={labelClass} htmlFor="_id">Yatra ID (Unique Number) *</label>
                                    <input type="number" id="_id" name="_id" placeholder="ID (e.g., 4)" value={formData._id || ''} onChange={handleChange} required disabled={item} className={inputClass} />
                                </div>
                                
                                {/* Date */}
                                <div className={formGroupClass}>
                                    <label className={labelClass} htmlFor="date">Start Date *</label>
                                    <input type="date" id="date" name="date" 
                                        value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''} 
                                        onChange={handleChange} 
                                        required 
                                        className={inputClass} 
                                    />
                                </div>
                                
                                {/* Max Participants */}
                                <div className={formGroupClass}>
                                    <label className={labelClass} htmlFor="maxParticipants">Max Participants *</label>
                                    <input type="number" id="maxParticipants" name="maxParticipants" placeholder="e.g., 50" value={formData.maxParticipants || 50} onChange={handleChange} required className={inputClass} />
                                </div>
                                
                                {/* Available Seats */}
                                <div className={formGroupClass}>
                                    <label className={labelClass} htmlFor="availableSeats">Available Seats *</label>
                                    <input type="number" id="availableSeats" name="availableSeats" placeholder="e.g., 50" value={formData.availableSeats || 50} onChange={handleChange} required className={inputClass} />
                                </div>
                            </div>
                            
                            {/* Array/CSV Fields (Using grid for organization) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 pt-4 border-t border-gray-100">
                                
                                {/* Highlights */}
                                <div className={formGroupClass}>
                                    <label className={labelClass} htmlFor="highlights">Highlights (CSV) *</label>
                                    <textarea id="highlights" name="highlights" placeholder="Ganga Aarti, Boat Ride, Temple Darshan" rows="3" value={Array.isArray(formData.highlights) ? formData.highlights.join(', ') : formData.highlights || ''} onChange={handleChange} required className={inputClass} />
                                </div>
                                
                                {/* Included */}
                                <div className={formGroupClass}>
                                    <label className={labelClass} htmlFor="included">Included (CSV) *</label>
                                    <textarea id="included" name="included" placeholder="Accommodation, Meals, Transport" rows="3" value={Array.isArray(formData.included) ? formData.included.join(', ') : formData.included || ''} onChange={handleChange} required className={inputClass} />
                                </div>
                                
                                {/* Excluded */}
                                <div className={formGroupClass}>
                                    <label className={labelClass} htmlFor="excluded">Excluded (CSV) *</label>
                                    <textarea id="excluded" name="excluded" placeholder="Airfare, Personal Expenses, Insurance" rows="3" value={Array.isArray(formData.excluded) ? formData.excluded.join(', ') : formData.excluded || ''} onChange={handleChange} required className={inputClass} />
                                </div>
                            </div>

                        </div>
                    )}

                    {/* Video-specific Fields */}
                    {type === 'videos' && (
                       <div className="space-y-4">
                           <p className="text-sm font-semibold pt-2 text-orange-700">Video-specific details:</p>
                           <label className="block text-sm font-medium text-gray-700 mt-2">Video URL *</label>
                           <input type="text" name="videoUrl" placeholder="Video URL *" value={formData.videoUrl || ''} onChange={handleChange} required className={inputClass} />
                           
                           <label className="block text-sm font-medium text-gray-700 mt-2">Thumbnail URL *</label>
                           <input type="text" name="thumbnailUrl" placeholder="Thumbnail URL *" value={formData.thumbnailUrl || ''} onChange={handleChange} required className={inputClass} />
                           
                           <label className="block text-sm font-medium text-gray-700 mt-2">Category *</label>
                           <select name="category" value={formData.category || ''} onChange={handleChange} required className={inputClass}>
                             <option value="yatra">Yatra</option>
                             <option value="testimonial">Testimonial</option>
                             <option value="guide">Guide</option>
                             <option value="highlight">Highlight</option>
                             <option value="other">Other</option>
                           </select>
                           
                           <label className="block text-sm font-medium text-gray-700 mt-2">Duration (e.g., 5:30)</label>
                           <input type="text" name="duration" placeholder="Duration (e.g., 5:30)" value={formData.duration || ''} onChange={handleChange} className={inputClass} />
                           
                           <div className="flex items-center space-x-2 pt-2">
                                <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive !== undefined ? formData.isActive : true} onChange={handleChange} className="rounded text-orange-600 focus:ring-orange-500" />
                                <label htmlFor="isActive" className="text-sm text-gray-700">Is Active (Show on frontend)</label>
                           </div>
                       </div>
                   )}

                    {/* Error Display */}
                    {submitError && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm font-medium">
                            **Error:** {submitError}
                        </div>
                    )}

                    {/* Action Buttons (Footer - Matching Image Style) */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg font-bold bg-gray-300 hover:bg-gray-400 text-gray-800 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSaving} className="py-2 px-4 rounded-lg font-bold bg-green-600 hover:bg-green-700 text-white transition-colors disabled:opacity-60">
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
  };
  
  // --- Render logic for table ---
  const renderTable = (data, type) => (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID / Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{type === 'yatras' ? 'Price / Seats' : 'Category / Views'}</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                 **ID {item._id}**: {item.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {type === 'yatras' 
                  ? `₹${item.price ? item.price.toLocaleString('en-IN') : 'N/A'} / ${item.availableSeats} Seats` 
                  : `${item.category} / ${item.views || 0} Views`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onClick={() => openForm(type, item)} className="text-blue-600 hover:text-blue-900 mr-3 p-1"><FaEdit /></button>
                <button onClick={() => handleDelete(item._id, type)} className="text-red-600 hover:text-red-900 p-1"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (isLoading) {
    return <div className="text-center py-20 text-xl font-medium">Loading Dashboard Data...</div>;
  }
  
  if (error && error !== "No token found") { // Don't show error if it's just redirecting
    return <div className="text-center py-20 text-xl font-medium text-red-600">{error}</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
        <button 
          onClick={handleLogout} 
          className="flex items-center text-red-600 hover:text-red-800 font-medium transition-colors"
        >
           <FaSignOutAlt className="mr-2" />
           Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('yatras')}
            className={`
              ${activeTab === 'yatras'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200
            `}
          >
            Yatra Management ({yatras.length})
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`
              ${activeTab === 'videos'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200
            `}
          >
            Video Management ({videos.length})
          </button>
          
          {/* --- NEW REGISTRATIONS TAB --- */}
          <button
            onClick={() => navigate('/admin/registrations')} // Direct navigation on click
            className={`
              ${'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200
            `}
          >
            Registrations 
          </button>
        </nav>
      </div>

      {/* Content and Add Button (for Yatras/Videos only) */}
      <div className="flex justify-end mb-4">
        {activeTab !== 'registrations' && ( // Hide Add button for Registrations tab
            <button 
              onClick={() => openForm(activeTab)} 
              className="flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
            >
              <FaPlus className="mr-2" />
              Add New {activeTab === 'yatras' ? 'Yatra' : 'Video'}
            </button>
        )}
      </div>
      
      {/* Tables */}
      <div className="py-4">
        {activeTab === 'yatras' && renderTable(yatras, 'yatras')}
        {activeTab === 'videos' && renderTable(videos, 'videos')}
        {/* Registration table is now a separate page */}
      </div>
      
      {/* Form Modal */}
      {isFormOpen && <FormModal type={currentType} item={currentEdit} onClose={() => setIsFormOpen(false)} />}
    </div>
  );
}

export default AdminDashboard;