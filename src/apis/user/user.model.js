const { AppKeys } = require('@/common/const');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelName = 'User';

const userSchema = new Schema({
   username: {
      type: String,
      unique: true,
      required: true
   }
}, {
   ...AppKeys
});

const User = mongoose.model(modelName, userSchema, modelName);

module.exports = User;