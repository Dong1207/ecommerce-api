const UserService = require('./user.service');
class UserController {
   constructor() {
      this.userService = new UserService();
      this.getUser = this.getUser.bind(this);
   }

   /**
    * @param {import('express').Request} req 
    * @param {import('express').Response} res 
    */
   async getUser(req, res) {
      try {
         const userId = req.params || '1';
         const user = await this.userService.getUser(userId);
         res.status(400).json(user);
      } catch (error) {
         res.json(error);
      }
   }
}

module.exports = new UserController();