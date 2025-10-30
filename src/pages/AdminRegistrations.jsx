import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaTrash, FaCheckCircle, FaTimesCircle, FaClock, FaFilter, FaSpinner } from 'react-icons/fa';

const API_REGISTRATION_URL = 'http://localhost:5000/api/registration';
const API_YATRAS_URL = 'http://localhost:5000/api/yatra';

// Helper function to fetch data with authentication
const fetchAuthenticatedData = async (url, token) => {
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 401) {
        localStorage.removeItem('adminToken');
        throw new Error("Unauthorized. Session expired.");
    }
    if (!response.ok) {
        // Attempt to read JSON error if available, otherwise use status text
        const errorText = await response.text();
        let errorMessage = `Failed to fetch data (${response.status}).`;
        try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.message || errorMessage;
        } catch (e) {
            errorMessage = `Failed to fetch data. Server responded with: ${response.statusText}`;
        }
        throw new Error(errorMessage);
    }
    return (await response.json()).data;
};

// Icon mapping for Statuses
const statusIcon = (status) => {
    switch (status) {
        case 'approved':
        case 'completed':
            return <FaCheckCircle className="text-green-500 mr-1" />;
        case 'rejected':
        case 'cancelled':
        case 'refunded':
            return <FaTimesCircle className="text-red-500 mr-1" />;
        case 'submitted':
        case 'pending':
        case 'partial':
        default:
            return <FaClock className="text-yellow-500 mr-1" />;
    }
};

const RegistrationPageContent = ({ yatras, onBackToDashboard }) => {
    const [registrations, setRegistrations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterYatra, setFilterYatra] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    const loadRegistrations = useCallback(async () => {
        if (!token) return;

        setIsLoading(true);
        setError(null);
        
        // Build query string based on filters
        const queryParams = new URLSearchParams();
        if (filterYatra) queryParams.append('yatraId', filterYatra);
        if (filterStatus) queryParams.append('status', filterStatus);

        try {
            const data = await fetchAuthenticatedData(`${API_REGISTRATION_URL}?${queryParams.toString()}`, token);
            setRegistrations(data);
        } catch (err) {
            setError(err.message);
            if (err.message.includes("Session expired")) {
                navigate('/admin/login');
            }
        } finally {
            setIsLoading(false);
        }
    }, [token, navigate, filterYatra, filterStatus]);

    useEffect(() => {
        loadRegistrations();
    }, [loadRegistrations]);


    const handleDelete = async (id) => {
        if (!window.confirm(`Are you sure you want to delete registration ID ${id}?`)) return;

        try {
            const response = await fetch(`${API_REGISTRATION_URL}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Deletion failed');

            // Update state
            setRegistrations(prev => prev.filter(reg => reg._id !== id));
        } catch (err) {
            setError(`Failed to delete registration: ${err.message}`);
        }
    };
    
    // Placeholder for View/Edit Registration Detail Page
    const handleViewDetails = (id) => {
       navigate(`/admin/registrations/${id}`);
    };
    
    // Map numerical yatra ID to title for display
    const getYatraTitle = (yatraId) => {
        const yatra = yatras.find(y => y._id === Number(yatraId)); // Ensure numerical comparison
        return yatra ? yatra.title : yatraId ;
    };


    if (!token) return null; // Already redirecting in useEffect, but safe check

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold text-gray-900">Yatra Registrations ({registrations.length})</h1>
                 <button 
                    onClick={onBackToDashboard} 
                    className="flex items-center text-orange-600 hover:text-orange-800 font-medium transition-colors"
                >
                    &larr; Back to Dashboard
                </button>
            </div>

            {/* Error Display */}
            {error && !error.includes("Session expired") && (
                 <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-lg font-medium">{error}</div>
            )}

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-wrap gap-4 items-center">
                <FaFilter className="text-gray-500" />
                
                {/* Yatra Filter */}
                <select 
                    value={filterYatra} 
                    onChange={(e) => setFilterYatra(e.target.value)} 
                    className="p-2 border rounded-lg text-sm"
                >
                    <option value="">All Yatras</option>
                    {yatras.map(y => (
                        <option key={y._id} value={y._id}>{y.title}</option>
                    ))}
                </select>

                {/* Status Filter */}
                <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)} 
                    className="p-2 border rounded-lg text-sm"
                >
                    <option value="">All Statuses</option>
                    <option value="submitted">Submitted</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                
                <button 
                    onClick={() => { setFilterYatra(''); setFilterStatus(''); }} 
                    className="text-sm text-gray-600 hover:text-gray-900"
                >
                    Clear Filters
                </button>
            </div>
            
            {isLoading ? (
                 <div className="text-center py-20 text-xl font-medium flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" /> Loading Registrations...
                 </div>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID & Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yatra</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered On</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {registrations.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-4 text-gray-500">No registrations found based on current filters.</td></tr>
                            ) : (
                                registrations.map((reg) => (
                                    <tr key={reg._id} className="hover:bg-orange-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{reg.name}</div>
                                            <div className="text-xs text-gray-500">ID: {reg._id.substring(0, 8)}...</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {getYatraTitle(reg.selectedYatra.title)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                                reg.registrationStatus === 'approved' ? 'bg-green-100 text-green-800' :
                                                reg.registrationStatus === 'rejected' || reg.registrationStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {statusIcon(reg.registrationStatus)} {reg.registrationStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {reg.mobile}<br /><span className="text-xs text-gray-500">{reg.email}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(reg.registrationDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            //commenting for now
                                            {/* <button onClick={() => handleViewDetails(reg._id)} title="View/Edit" className="text-blue-600 hover:text-blue-900 mr-3 p-1">
                                                <FaEye />
                                            </button> */}
                                            <button onClick={() => handleDelete(reg._id)} title="Delete" className="text-red-600 hover:text-red-900 p-1">
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

// Wrapper component to handle Yatra fetching and authentication redirect
export const AdminRegistrations = () => {
    const [yatras, setYatras] = useState([]);
    const [isLoadingYatras, setIsLoadingYatras] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    // Fetch Yatras list for filtering/display titles
    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        const loadYatras = async () => {
            try {
                const data = await fetchAuthenticatedData(API_YATRAS_URL, token);
                setYatras(data);
            } catch (err) {
                 setError(err.message);
                 if (err.message.includes("Session expired")) navigate('/admin/login');
            } finally {
                setIsLoadingYatras(false);
            }
        };
        loadYatras();
    }, [token, navigate]);
    
    // Placeholder function for going back
    const handleBackToDashboard = () => navigate('/admin/dashboard');

    if (isLoadingYatras) return <div className="text-center py-20 text-xl font-medium flex items-center justify-center"><FaSpinner className="animate-spin mr-2" /> Initializing Registrations...</div>;
    if (error && !error.includes("Session expired")) return <div className="text-center py-20 text-xl font-medium text-red-600">Error fetching yatra data: {error}</div>;


    return <RegistrationPageContent yatras={yatras} onBackToDashboard={handleBackToDashboard} />;
};