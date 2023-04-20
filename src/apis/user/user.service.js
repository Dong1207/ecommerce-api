const UserRepository = require('./user.repository');
const User = require('./user.model');
const JwtLib = require('@/libs/auth/jwt');
const { RedisLib } = require('@/libs/database');
const Bcrypt = require('@/libs/hash/bcrypt');
const { AppKeys } = require('@/common/const');
const { BadRequest, NotFoundException, ServerError } = require('@/libs/errors');

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

   async createUser(user) {
      const newUser = new User(user);
      const createdUser = await newUser.save();
      return createdUser;
   }

   async login(userAccount) {
      const { email, password } = userAccount;
      const realUser = await User.findOne({ email: email }).populate({ path: 'roles', select: 'name' });
      if (!realUser) {
         throw new BadRequest('Email or password incorrect!');
      }

      const { password: realPasswordEncoded, id: userId, roles, first_name, last_name } = realUser;
      let authorities = this.userRepository.convertRoleName(roles);

      const isCorrectPassword = await Bcrypt.compare(realPasswordEncoded, password);
      if (!isCorrectPassword) {
         throw new BadRequest('Email or password incorrect!');
      }

      const userPayload = { email: email, roles: authorities };
      let refreshToken = await this.userRepository.getRefreshTokenAvalid(userId);

      if (!refreshToken) {
         refreshToken = JwtLib.signToken(AppKeys.TOKEN_TYPE.REFRESH_TOKEN, userPayload);
         await RedisLib.setUserSection(userId, refreshToken, parseInt(process.env.REFRESH_TOKEN_EXPIRE_TIME));
      }

      const accessToken = JwtLib.signToken(AppKeys.TOKEN_TYPE.ACCESS_TOKEN, userPayload);
      const userInfo = {
         email,
         roles: authorities,
         firstName: first_name,
         lastName: last_name
      };
      const loginResponseData = {
         user: userInfo,
         accessToken,
         refreshToken
      };

      return loginResponseData;
   }
   async logout(userAccount) {
      const { email, refreshToken } = userAccount;
      const realUser = await User.findOne({ email: email }).populate({ path: 'roles', select: 'name' });
      if (!realUser) {
         throw new BadRequest('Email incorrect!');
      }

      const { id: userId, roles, first_name, last_name } = realUser;
      let authorities = this.userRepository.convertRoleName(roles);

      await RedisLib.removeUserSection(userId, refreshToken);

      const userInfo = {
         email,
         roles: authorities,
         firstName: first_name,
         lastName: last_name
      };
      const logoutResponseData = {
         user: userInfo,
         message: "user logout success"
      };

      return logoutResponseData;
   }
   async getCurrentUser(email) {

      const realUser = await User.findOne({ email: email }).populate({ path: 'roles', select: 'name' });
      if (!realUser) {
         throw new BadRequest('Access denied. Token invalid.');
      }

      const { roles, first_name, last_name } = realUser;
      let authorities = this.userRepository.convertRoleName(roles);

      const userInfo = {
         email,
         roles: authorities,
         firstName: first_name,
         lastName: last_name
      };
      const loginResponseData = {
         user: userInfo
      };
      return loginResponseData;



   }
   async getAccessToken(email) {

      const realUser = await User.findOne({ email: email }).populate({ path: 'roles', select: 'name' });
      if (!realUser) {
         throw new BadRequest('Access denied. Token invalid.');
      }

      const { id: userId, roles } = realUser;
      let authorities = this.userRepository.convertRoleName(roles);

      let serverRefreshToken = await RedisLib.getUserSection(userId);

      // if (!serverRefreshToken || serverRefreshToken !== refreshToken) {
      //    throw new BadRequest('Access denied. Token invalid.');
      // }
      const userPayload = { email: email, roles: authorities };
      const accessToken = JwtLib.signToken(AppKeys.TOKEN_TYPE.ACCESS_TOKEN, userPayload);

      const accessTokenResponseData = {
         accessToken
      };

      return accessTokenResponseData;
   }

}

module.exports = UserService;