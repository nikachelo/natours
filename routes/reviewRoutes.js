const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(authController.protect, reviewController.getAllReviews)
  .post(authController.protect, reviewController.addReview);

router
  .route('/:id')
  .get(reviewController.getReview)
  .delete(authController.protect, reviewController.deleteReview)
  .patch(reviewController.editReview);

module.exports = router;
