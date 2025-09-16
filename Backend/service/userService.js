const JWT = require('jsonwebtoken');
const hash = require('../utils/hash');
const AppError = require('../errors/index');
const crypto = require('crypto');
const User = require('../models/userModel');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '$a!yam@2024';

if (!JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is missing');
}

class AuthService {
  static generateUserToken(payload) {
    return JWT.sign(payload, JWT_SECRET_KEY, { expiresIn: '1d' });
  }

  static async signupWithEmailAndPassword(data) {
    const { Name, Email, Password, Address, PinCode, ContactNo, Role } = data;
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = hash(Password, salt);

    try {
      const user = await User.create({
        Name,
        Email,
        Password: hashedPassword,
        salt,
        Address,
        PinCode,
        ContactNo,
        Role
      });

      return AuthService.generateUserToken({ _id: user._id, role: user.Role });
    } catch (err) {
      if (err.code === 11000) {
        throw new AppError('Email already exists', 400);
      }
      throw new AppError('Internal Server Error', 500);
    }
  }

  static async signinWithEmailAndPassword(data) {
    const { Email, Password } = data;
    const userInDB = await User.findOne({ Email });
    if (!userInDB) throw new AppError(`User with email ${Email} does not exist`, 404);

    const hashPassword = hash(Password, userInDB.salt);
    if (hashPassword !== userInDB.Password) {
      throw new AppError('Invalid email or password', 401);
    }

    return AuthService.generateUserToken({ _id: userInDB._id, role: userInDB.Role });
  }

  static async decodeUserToken(token) {
    try {
      return JWT.verify(token, JWT_SECRET_KEY);
    } catch {
      return false;
    }
  }
}

module.exports = AuthService;