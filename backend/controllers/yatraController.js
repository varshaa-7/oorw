import Yatra from '../models/Yatra.js';

export const getAllYatras = async (req, res) => {
  try {
    const yatras = await Yatra.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: yatras.length,
      data: yatras
    });
  } catch (error) {
    console.error('Get yatras error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching yatras'
    });
  }
};

export const getYatraById = async (req, res) => {
  try {
    // 1. Cast the parameter to a Number and check for undefined/NaN
    const yatraId = Number(req.params.id);

    if (!req.params.id || isNaN(yatraId)) {
       // Gracefully handle invalid or missing parameters
      return res.status(404).json({
        success: false,
        message: 'Invalid or missing Yatra ID.'
      });
    }
    
    // 2. Use findOne with the explicit _id field (safer for non-ObjectId primary keys)
    const yatra = await Yatra.findOne({ _id: yatraId });

    if (!yatra) {
      return res.status(404).json({
        success: false,
        message: 'Yatra not found'
      });
    }

    res.json({
      success: true,
      data: yatra
    });
  } catch (error) {
    console.error('Get yatra error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching yatra'
    });
  }
};

export const createYatra = async (req, res) => {
  try {
    const yatra = await Yatra.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Yatra created successfully',
      data: yatra
    });
  } catch (error) {
    console.error('Create yatra error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating yatra'
    });
  }
};

export const updateYatra = async (req, res) => {
  try {
    const yatra = await Yatra.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!yatra) {
      return res.status(404).json({
        success: false,
        message: 'Yatra not found'
      });
    }

    res.json({
      success: true,
      message: 'Yatra updated successfully',
      data: yatra
    });
  } catch (error) {
    console.error('Update yatra error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating yatra'
    });
  }
};

export const deleteYatra = async (req, res) => {
  try {
    const yatra = await Yatra.findByIdAndDelete(req.params.id);

    if (!yatra) {
      return res.status(404).json({
        success: false,
        message: 'Yatra not found'
      });
    }

    res.json({
      success: true,
      message: 'Yatra deleted successfully'
    });
  } catch (error) {
    console.error('Delete yatra error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting yatra'
    });
  }
};
