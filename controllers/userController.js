const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = function (obj, ...fields) {
  //
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) {
      //
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      results: users.length,
      users: users,
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

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user POSTs password data

  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('You can not update password on this route', 400));
  }

  // 2. Update user document

  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.editUser = factory.updateOne(User);

exports.deleteUser = factory.deleteOne(User);
