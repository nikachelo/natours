const Review = require('../models/reviewModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const reviews = await Review.find(filter);
  res.status(200).json({
    status: 'success',
    reviews: reviews,
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'user tour',
  });

  if (!review) {
    return next(new AppError('No review found with this ID', 404));
  }

  res.status(200).json({
    status: 'success',
    review: {
      review,
    },
  });
});

exports.addReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    review: {
      newReview,
    },
  });
});

exports.editReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);
