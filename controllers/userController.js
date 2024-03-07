const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      results: users.length,
      tours: users,
    },
  });
});

exports.addUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'Route is not defined yet' });
};

exports.getUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'Route is not defined yet' });
};

exports.editUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'Route is not defined yet' });
};

exports.deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'Route is not defined yet' });
};
