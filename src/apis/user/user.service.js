const UserRepository = require('./user.repository');
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
}

module.exports = UserService;