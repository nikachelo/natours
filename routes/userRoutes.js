const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/changePassword',
  authController.protect,
  authController.changePassword,
);

router.patch('/updateme', authController.protect, userController.updateMe);

router.route('/').get(userController.getAllUsers).post(userController.addUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.editUser)
  .delete(userController.deleteUser);

module.exports = router;
