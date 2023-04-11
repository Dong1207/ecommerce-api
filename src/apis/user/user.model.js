const { AppKeys } = require('@/common/const');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelName = 'User';

const userSchema = new Schema({
   email: {
      type: String,
      unique: true,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   first_name: {
      type: String
   },
   last_name: {
      type: String
   },
   roles: {
      type: String
   }
}, {
   ...AppKeys
});

const fullNameVirtual = userSchema.virtual('fullname');
fullNameVirtual.get(function(value, virtual, doc) {
  return this.name.first_name + ' ' + this.name.last_name;
});

fullNameVirtual.set(function(value, virtual, doc) {
   const parts = value.split(' ');
   this.name.first_name = parts[0];
   this.name.last_name = parts[1];
});

const User = mongoose.model(modelName, userSchema, modelName);

module.exports = User;