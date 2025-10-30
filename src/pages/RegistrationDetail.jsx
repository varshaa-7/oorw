import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHeartbeat, FaCheckCircle, FaSpinner } from 'react-icons/fa';

const API_REGISTRATION_URL = 'http://localhost:5000/api/registration';
const API_YATRA_URL = 'http://localhost:5000/api/yatra'; // To fetch Yatra details

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

// Component to render status tag
const StatusTag = ({ status, isPayment = false }) => {
    let color, icon;
    switch (status) {
        case 'approved':
        case 'completed':
            color = 'green';
            icon = <FaCheckCircle />;
            break;
        case 'rejected':
        case 'cancelled':
        case 'refunded':
            color = 'red';
            icon = <FaTimesCircle />;
            break;
        case 'submitted':
        case 'pending':
        case 'partial':
        default:
            color = 'yellow';
            icon = <FaClock />;
    }

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-${color}-100 text-${color}-800 capitalize`}>
            {icon}
            <span className="ml-2">{isPayment ? `Payment: ${status}` : `Reg: ${status}`}</span>
        </span>
    );
};


function RegistrationDetail() {
    const { id } = useParams();
    const [registration, setRegistration] = useState(null);
    const [yatraDetails, setYatraDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) {
            navigate('/admin/login');
            return;
        }

        const loadDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // 1. Fetch Registration Details
                const regData = await fetchAuthenticatedData(`${API_REGISTRATION_URL}/${id}`, token);
                setRegistration(regData);

                // 2. Fetch Associated Yatra Details (Requires yatra ID from registration)
                if (regData.selectedYatra) {
                    const yatraData = await fetchAuthenticatedData(`${API_YATRA_URL}/${regData.selectedYatra}`, token);
                    setYatraDetails(yatraData);
                }

            } catch (err) {
                setError(err.message);
                if (err.message.includes("Session expired")) navigate('/admin/login');
            } finally {
                setIsLoading(false);
            }
        };
        loadDetails();
    }, [id, token, navigate]);


    if (isLoading) return <div className="text-center py-20 text-xl font-medium flex items-center justify-center"><FaSpinner className="animate-spin mr-2" /> Loading Registration...</div>;
    if (error) return <div className="text-center py-20 text-xl font-medium text-red-600">{error}</div>;
    if (!registration) return <div className="text-center py-20 text-xl font-medium">Registration not found.</div>;

    // Destructure nested objects for easier access
    const { emergencyContact, healthDeclaration } = registration;

    return (
        <div className="container mx-auto px-4 py-10 max-w-5xl">
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                <h1 className="text-3xl font-extrabold text-gray-900">Registration Details</h1>
                <button 
                    onClick={() => navigate('/admin/registrations')} 
                    className="flex items-center text-orange-600 hover:text-orange-800 font-medium transition-colors"
                >
                    &larr; Back to List
                </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100 space-y-8">
                
                {/* Header Section */}
                <div className="border-b pb-6 border-orange-100">
                    <h2 className="text-2xl font-bold text-orange-800 flex items-center mb-2">
                        <FaUserCircle className="mr-3 text-3xl" />
                        {registration.name} ({registration.age} yrs)
                    </h2>
                    <div className="flex space-x-4 mt-2">
                        <StatusTag status={registration.registrationStatus} />
                        <StatusTag status={registration.paymentStatus} isPayment={true} />
                    </div>
                </div>

                {/* Yatra Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 border-b pb-6 border-gray-100">
                    <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase">Booking For Yatra:</p>
                        <p className="text-lg font-medium text-gray-900">{registration.yatraTitle || yatraDetails?.title}</p>
                    </div>
                    <div>
                         <p className="text-sm font-semibold text-gray-500 uppercase">Yatra Date / Price:</p>
                         <p className="text-lg font-medium text-gray-900">
                             {yatraDetails?.date || 'N/A'} / 
                             ₹{yatraDetails?.price ? yatraDetails.price.toLocaleString('en-IN') : 'N/A'}
                        </p>
                    </div>
                </div>

                {/* Contact and ID Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 border-b pb-6 border-gray-100">
                    <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase flex items-center"><FaEnvelope className="mr-2" /> Email:</p>
                        <p className="text-gray-800">{registration.email}</p>
                        <p className="text-sm font-semibold text-gray-500 uppercase flex items-center mt-3"><FaPhone className="mr-2" /> Mobile:</p>
                        <p className="text-gray-800">{registration.mobile}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-500 uppercase">ID Proof:</p>
                        <p className="text-gray-800">{registration.idProof} ({registration.idProofNumber})</p>
                        <p className="text-sm font-semibold text-gray-500 uppercase flex items-center mt-3"><FaMapMarkerAlt className="mr-2" /> Address:</p>
                        <p className="text-gray-800 whitespace-pre-wrap">{registration.address}</p>
                    </div>
                </div>

                {/* Health and Emergency Contact */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center"><FaHeartbeat className="mr-2 text-red-500" /> Health & Emergency</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase">Health Declaration:</p>
                            <p className="text-gray-800">{healthDeclaration.conditions || 'Fit for travel / No conditions mentioned'}</p>
                            <p className="text-sm font-semibold text-gray-500 uppercase mt-3">Medications:</p>
                            <p className="text-gray-800">{healthDeclaration.medications || 'None'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-500 uppercase">Emergency Contact:</p>
                            <p className="text-gray-800">{emergencyContact.name} ({emergencyContact.relation})</p>
                            <p className="text-gray-800">{emergencyContact.mobile}</p>
                        </div>
                    </div>
                </div>
                
                {/* Admin Notes */}
                <div className="pt-6 border-t border-gray-100">
                    <p className="text-sm font-semibold text-gray-500 uppercase">Admin Notes:</p>
                    <textarea 
                        className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-50"
                        rows="3"
                        readOnly
                        value={registration.notes || 'No notes added by admin.'}
                    ></textarea>
                </div>

            </div>
        </div>
    );
}

export default RegistrationDetail;