const { AppKeys } = require('@/common/const');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BcryptLib = require('@/libs/hash/bcrypt');

const modelName = 'User';

const userSchema = new Schema({
   email: {
      type: String,
      unique: true,
      required: true
   },
   password: {
      type: String,
      required: true,
   },
   first_name: {
      type: String
   },
   last_name: {
      type: String
   },
   roles: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Role",
      }
   ]
}, {
   toJSON: {
      aliases: true,
      virtuals: true
   },
   toObject: {
      virtuals: true,
      aliases: true,
   },
   timestamps: true,
   versionKey: false
});

const fullNameVirtual = userSchema.virtual('fullname');
fullNameVirtual.get(function (value, virtual, doc) {
   return this.first_name + ' ' + this.last_name;
});

fullNameVirtual.set(function (value, virtual, doc) {
   const parts = value.split(' ');
   this.first_name = parts[0];
   this.last_name = parts[1];
});

//Hash password previous save
userSchema.pre('save', async function (next) {
   try {
      if (this.password) {
         this.password = await BcryptLib.hash(this.password);
      } else throw new Error('Password invalid');
      next();
   } catch (error) {
      throw error;
   }
});

userSchema.pre('updateOne', async function (next) {
   try {
      const password = this?._update?.password;
      if (password) this._update.password = await hashData(password);
      next();
   } catch (error) {
      throw error;
   }
});

const User = mongoose.model(modelName, userSchema, modelName);

module.exports = User;