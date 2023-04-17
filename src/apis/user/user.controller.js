const UserService = require('./user.service');
class UserController {
   constructor() {
      this.userService = new UserService();
      this.getUser = this.getUser.bind(this);
      this.createUser = this.createUser.bind(this);
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
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

   /**
    * @param {import('express').Request} req 
    * @param {import('express').Response} res 
    */
   async createUser(req, res) {
      try {
         const user = req.body;
         const userCreated = await this.userService.createUser(user);
         res.json(userCreated);
      } catch (error) {
         res.json(error);
      }
   }

   /**
    * @param {import('express').Request} req 
    * @param {import('express').Response} res 
    */
   async login(req, res) {
      try {
         const userAccount = req.body;
         const loginResponseData = await this.userService.login(userAccount);
         res.json(loginResponseData);
      } catch (error) {
         res.json(error);
      }
   }
   async logout(req, res) {
      try {
         const userAccount = req.body;
         const logoutResponseData = await this.userService.logout(userAccount);
         res.json(logoutResponseData);
      } catch (error) {
         res.json(error);
      }
   }
}

module.exports = new UserController();