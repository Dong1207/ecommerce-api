const express = require('express');
const userController = require('./user.controller');

const userRouter = express.Router();

userRouter.get('/user', userController.getUser);
userRouter.post('/user/create', userController.createUser);
userRouter.post('/auth/login', userController.login);
userRouter.post('/auth/logout', userController.logout);

module.exports = userRouter;