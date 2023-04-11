const express = require('express');
const userController = require('./user.controller');

const userRouter = express.Router();

userRouter.get('/user', userController.getUser);
userRouter.post('/user/create', userController.createUser);

module.exports = userRouter;