const stripe = require('stripe')(
  'sk_test_51OuRDPD4HqN3vc2S40QQyA6oUHEsyp1KJPZqhb9pHevIedgzcFkaJbEPhbmHwZQynO322HWD0t4MQMjhytny6CRc00tbN3vvOn',
);
const Tour = require('../models/tourModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1. Get the currently booked tour

  const tour = await Tour.findById(req.params.tourId);

  // 2. Create checkout session based on it

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              'https://hips.hearstapps.com/hmg-prod/images/woman-hiking-at-red-rock-canyon-during-sunset-with-royalty-free-image-1601478369.jpg',
            ],
          },
          currency: 'usd',
        },
        quantity: 1,
      },
    ],
  });

  // 3. Create session as a response

  res.status(200).json({
    status: 'success',
    session,
  });

  return next();
});
