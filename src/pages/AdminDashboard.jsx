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
  
//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     navigate('/admin/login');
//   };

  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type} with ID ${id}?`)) return;

    const token = localStorage.getItem('adminToken');
    const endpoint = type === 'yatra' ? `yatra/${id}` : `videos/${id}`;
    
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error('Deletion failed');
      
      // Update state
      if (type === 'yatra') {
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
    setCurrentType(type);
    setCurrentEdit(item);
    setIsFormOpen(true);
  };
  
  const FormModal = ({ type, item, onClose }) => {
    const [formData, setFormData] = useState(item || { category: 'yatra' }); // Default category for videos
    const [isSaving, setIsSaving] = useState(false);
    
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      setIsSaving(true);
      
      const token = localStorage.getItem('adminToken');
      const method = item ? 'PUT' : 'POST';
      const endpoint = type === 'yatra' ? `yatra/${item ? item._id : ''}` : `videos/${item ? item._id : ''}`;
      
      try {
          const response = await fetch(`${BASE_URL}/${endpoint}`, {
              method: method,
              headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to save data');
          }
          
          // Simple refresh/state update to reflect changes
          window.location.reload(); 
          onClose();
      } catch (err) {
          alert(`Error saving ${type}: ${err.message}`);
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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-[100] p-4 overflow-y-auto">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg my-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{item ? 'Edit' : 'Add New'} {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                   <input type="text" name="title" placeholder="Title *" value={formData.title || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
                   <textarea name="description" placeholder="Description *" rows="3" value={formData.description || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
                   
                   {type === 'yatra' && (
                       <>
                            <p className="text-sm text-gray-600">Yatra-specific details:</p>
                           <input type="number" name="_id" placeholder="ID (must be unique number) *" value={formData._id || ''} onChange={handleChange} required disabled={item} className="w-full border p-2 rounded" />
                           <input type="date" name="date" placeholder="Date *" value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''} onChange={handleChange} required className="w-full border p-2 rounded" />
                           <input type="text" name="duration" placeholder="Duration (e.g., 5 Days / 4 Nights) *" value={formData.duration || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
                           <input type="number" name="price" placeholder="Price (₹) *" value={formData.price || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
                           <input type="text" name="image" placeholder="Image URL *" value={formData.image || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
                           <input type="number" name="maxParticipants" placeholder="Max Participants *" value={formData.maxParticipants || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
                           <input type="number" name="availableSeats" placeholder="Available Seats *" value={formData.availableSeats || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
                            {/* Simple text input for highlights/included/excluded arrays for demo */}
                            <textarea name="highlights" placeholder="Highlights (comma separated)" value={Array.isArray(formData.highlights) ? formData.highlights.join(', ') : formData.highlights || ''} onChange={handleChange} className="w-full border p-2 rounded" />
                       </>
                   )}
                   {type === 'video' && (
                       <>
                           <p className="text-sm text-gray-600">Video-specific details:</p>
                           <input type="text" name="videoUrl" placeholder="Video URL *" value={formData.videoUrl || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
                           <input type="text" name="thumbnailUrl" placeholder="Thumbnail URL *" value={formData.thumbnailUrl || ''} onChange={handleChange} required className="w-full border p-2 rounded" />
                           <select name="category" value={formData.category || ''} onChange={handleChange} required className="w-full border p-2 rounded">
                             <option value="yatra">Yatra</option>
                             <option value="testimonial">Testimonial</option>
                             <option value="guide">Guide</option>
                             <option value="highlight">Highlight</option>
                             <option value="other">Other</option>
                           </select>
                           <input type="text" name="duration" placeholder="Duration (e.g., 5:30)" value={formData.duration || ''} onChange={handleChange} className="w-full border p-2 rounded" />
                           <div className="flex items-center space-x-2">
                                <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive !== undefined ? formData.isActive : true} onChange={handleChange} className="rounded text-orange-600 focus:ring-orange-500" />
                                <label htmlFor="isActive" className="text-sm text-gray-700">Is Active (Show on frontend)</label>
                           </div>
                       </>
                   )}
                   <div className="flex justify-end space-x-3 pt-4">
                       <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors">Cancel</button>
                       <button type="submit" disabled={isSaving} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-60">
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
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{type === 'yatra' ? 'Price / Seats' : 'Category / Views'}</th>
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
                {type === 'yatra' 
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
      {/* ... (Header and Logout Button) */}

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
        {activeTab === 'yatras' && renderTable(yatras, 'yatra')}
        {activeTab === 'videos' && renderTable(videos, 'video')}
        {/* Registration table is now a separate page */}
      </div>
      
      {/* Form Modal */}
      {isFormOpen && <FormModal type={currentType} item={currentEdit} onClose={() => setIsFormOpen(false)} />}
    </div>
  );
}

export default AdminDashboard;