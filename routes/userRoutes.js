const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protected for authorised users

router.use(authController.protect);
router.patch('/changePassword', authController.changePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateme',
  userController.uploadUserPhoto,
  userController.processUserPhoto,
  userController.updateMe,
);

// Restricted to admins

router.use(authController.restrictTo('admin'));
router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.editUser)
  .delete(userController.deleteUser);

module.exports = router;
