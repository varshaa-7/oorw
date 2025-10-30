import Registration from '../models/Registration.js';
import Yatra from '../models/Yatra.js';

export const createRegistration = async (req, res) => {
  try {
    const {
      name,
      age,
      mobile,
      email,
      address,
      idProof,
      idProofNumber,
      emergencyContact,
      healthDeclaration,
      selectedYatra,
      yatraTitle
    } = req.body;

    if (!name || !age || !mobile || !email || !address || !idProof || !idProofNumber || !selectedYatra) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const yatra = await Yatra.findById(selectedYatra);

    if (!yatra) {
      return res.status(404).json({
        success: false,
        message: 'Selected yatra not found'
      });
    }

    if (yatra.availableSeats <= 0) {
      return res.status(400).json({
        success: false,
        message: 'No seats available for this yatra'
      });
    }

    const registration = await Registration.create({
      name,
      age,
      mobile,
      email,
      address,
      idProof,
      idProofNumber,
      emergencyContact,
      healthDeclaration,
      selectedYatra,
      yatraTitle: yatraTitle || yatra.title
    });

    yatra.availableSeats -= 1;
    await yatra.save();

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully',
      data: registration
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting registration'
    });
  }
};

export const getAllRegistrations = async (req, res) => {
  try {
    const { status, yatraId } = req.query;
    const filter = {};

    if (status) {
      filter.registrationStatus = status;
    }

    if (yatraId) {
      filter.selectedYatra = yatraId;
    }

    const registrations = await Registration.find(filter)
      .populate('selectedYatra', 'title date price')
      .sort({ registrationDate: -1 });

    res.json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching registrations'
    });
  }
};

export const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('selectedYatra');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.json({
      success: true,
      data: registration
    });
  } catch (error) {
    console.error('Get registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching registration'
    });
  }
};

export const updateRegistrationStatus = async (req, res) => {
  try {
    const { registrationStatus, paymentStatus, notes } = req.body;

    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { registrationStatus, paymentStatus, notes },
      { new: true, runValidators: true }
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.json({
      success: true,
      message: 'Registration updated successfully',
      data: registration
    });
  } catch (error) {
    console.error('Update registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating registration'
    });
  }
};

export const deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.json({
      success: true,
      message: 'Registration deleted successfully'
    });
  } catch (error) {
    console.error('Delete registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting registration'
    });
  }
};
