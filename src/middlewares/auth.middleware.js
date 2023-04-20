const Logger = require("../libs/common/logger.service");
const JwtLib = require('@/libs/auth/jwt');
const { RedisLib } = require('@/libs/database');
const { AppConsts, AppKeys } = require('@/common/const');
const { BadRequest, NotFoundException, ServerError } = require('@/libs/errors');

// eslint-disable-next-line no-unused-vars
const { Request, Response, NextFunction } = require('express');

const listRefreshToken = [
    '/api/v1/auth/token',
    '/api/v1/auth/logout',
];
const whitelist = [
    '/api/v1/user/create',
    '/api/v1/auth/login',
];

function getTokenFromHeader(authHeader) {
    if (authHeader && authHeader.split(' ')[0] === AppConsts.HEADER_AUTHORIZATION_PREFIX) {
        return authHeader.split(' ')[1];
    }
    return null;
}

module.exports = {
    /**
     * 
     * @param {Request} req  Request
     * @param {Response} res Response
     * @param {NextFunction} next NextFunction
     */
    authMiddleware: async (req, res, next) => {
        try {
            console.log("authMiddleware", req.path);
            if (!req.body) {
                req.body = {};
            }
            if (whitelist.includes(req.path)) {
                console.log("1")

            } else if (listRefreshToken.includes(req.path)) {
                // check refreshToken
                const authHeader = req.header('refreshToken');
                let refreshToken = getTokenFromHeader(authHeader);
                if (!refreshToken) {
                    throw new BadRequest('Access denied. No token provided.');
                }
                const verifyToken = JwtLib.verifyToken(AppKeys.TOKEN_TYPE.REFRESH_TOKEN, refreshToken);
                if (verifyToken && verifyToken.email) {
                    req.body['userEmail'] = verifyToken.email;
                } else {
                    throw new BadRequest('Access denied. Token invalid.');
                }

            } else {
                // check accessToken
                const authHeader = req.header('accessToken');
                let accessToken = getTokenFromHeader(authHeader);
                if (!accessToken) {
                    throw new BadRequest('Access denied. No token provided.');
                }
                const verifyToken = JwtLib.verifyToken(AppKeys.TOKEN_TYPE.ACCESS_TOKEN, accessToken);
                if (verifyToken && verifyToken.email) {
                    req.body['userEmail'] = verifyToken.email;
                } else {
                    throw new BadRequest('Access denied. Token invalid.');
                }

            }
            next();
        } catch (error) {
            res.status(error.status).json({ status: error.status, message: error.message });
        }

    }
};