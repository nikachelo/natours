const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.route('/').get(tourController.getAllTours).post(tourController.addTour);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/');
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.editTour)
  .delete(tourController.deleteTour);

module.exports = router;
