const multer = require('multer');
const jimp = require('jimp');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.processUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await jimp
    .read(req.file.buffer)
    .then((image) => {
      image
        .resize(500, 500)
        .quality(60)
        .write(`public/img/users/${req.file.filename}`);
      next();
    })
    .catch((err) => {
      next(
        new AppError('We have encountered some errors, please try again', 500),
      );
    });
});

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

exports.getAllUsers = factory.getAll(User);

exports.editUser = factory.updateOne(User);

exports.getUser = factory.getOne(User);

exports.deleteUser = factory.deleteOne(User);

exports.addUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'Route is not defined yet' });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user POSTs password data

  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('You can not update password on this route', 400));
  }

  // 2. Update user document

  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;
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
