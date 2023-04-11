const UserRepository = require('./user.repository');
const User = require('./user.model');
// const { BadRequest } = require('@/libs/errors');

class UserService {
   constructor() {
      this.userRepository = new UserRepository();
   }

   async getUser(userId) {
      this.userRepository.getUserByAnyField();
      return {
         userId,
         name: 'Trung Dong'
      };
   }

   async createUser(user){
      const newUser = new User(user);
      const createdUser = await newUser.save();
      return createdUser;
   }
}

module.exports = UserService;